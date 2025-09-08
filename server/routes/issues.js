const express = require('express');
const { body, validationResult, query } = require('express-validator');
const { pool } = require('../config/database');
const { authenticateToken, requireRole, requireVerified } = require('../middleware/auth');
const { upload, handleUploadError } = require('../middleware/upload');
const { generateFormattedTicketId } = require('../utils/ticketGenerator');

const router = express.Router();

// Get all issues with filters and pagination (public access)
router.get('/', [
  query('page').optional({ checkFalsy: true }).isInt({ min: 1 }).toInt(),
  query('limit').optional({ checkFalsy: true }).isInt({ min: 1, max: 100 }).toInt(),
  query('status').optional({ checkFalsy: true }).isIn(['pending', 'in_progress', 'resolved', 'rejected']),
  query('category').optional({ checkFalsy: true }).isInt().toInt(),
  query('priority').optional({ checkFalsy: true }).isIn(['low', 'medium', 'high', 'urgent']),
  query('city').optional({ checkFalsy: true }).trim(),
  query('search').optional({ checkFalsy: true }).trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const limitNum = Math.max(1, Math.min(100, Number(limit)));
    const offsetNum = Math.max(0, Number(offset));

    let whereConditions = [];
    let queryParams = [];

    // Build WHERE clause based on filters
    if (req.query.status) {
      whereConditions.push('i.status = ?');
      queryParams.push(req.query.status);
    }

    if (req.query.category) {
      whereConditions.push('i.category_id = ?');
      queryParams.push(req.query.category);
    }

    if (req.query.priority) {
      whereConditions.push('i.priority = ?');
      queryParams.push(req.query.priority);
    }

    if (req.query.city) {
      whereConditions.push('i.city LIKE ?');
      queryParams.push(`%${req.query.city}%`);
    }

    if (req.query.search) {
      whereConditions.push('(i.title LIKE ? OR i.description LIKE ?)');
      queryParams.push(`%${req.query.search}%`, `%${req.query.search}%`);
    }

    // Simple approach - get all issues first, then filter in JavaScript
    // This is not ideal for large datasets but will work for now
    let issuesQuery = `
      SELECT 
        i.id,
        i.ticket_id,
        i.title,
        i.description,
        i.status,
        i.priority,
        i.location_address,
        i.latitude,
        i.longitude,
        i.city,
        i.state,
        i.pincode,
        i.street_name,
        i.nearby_landmark,
        i.created_at,
        i.updated_at,
        i.resolved_at,
        i.category_id,
        i.reporter_id,
        c.name as category_name,
        c.color as category_color,
        c.icon as category_icon,
        u.first_name as reporter_first_name,
        u.last_name as reporter_last_name,
        u.email as reporter_email,
        assigned.first_name as assigned_first_name,
        assigned.last_name as assigned_last_name
      FROM issues i
      LEFT JOIN categories c ON i.category_id = c.id
      LEFT JOIN users u ON i.reporter_id = u.id
      LEFT JOIN users assigned ON i.assigned_to = assigned.id
      ORDER BY i.created_at DESC
    `;

    const [allIssues] = await pool.execute(issuesQuery);

    // Apply filters in JavaScript
    let filteredIssues = allIssues;
    
    if (req.query.status) {
      filteredIssues = filteredIssues.filter(issue => issue.status === req.query.status);
    }
    if (req.query.category) {
      filteredIssues = filteredIssues.filter(issue => issue.category_id == req.query.category);
    }
    if (req.query.priority) {
      filteredIssues = filteredIssues.filter(issue => issue.priority === req.query.priority);
    }
    if (req.query.city) {
      filteredIssues = filteredIssues.filter(issue => 
        issue.city.toLowerCase().includes(req.query.city.toLowerCase())
      );
    }
    if (req.query.state) {
      filteredIssues = filteredIssues.filter(issue => 
        issue.state.toLowerCase().includes(req.query.state.toLowerCase())
      );
    }
    if (req.query.search) {
      const searchTerm = req.query.search.toLowerCase();
      filteredIssues = filteredIssues.filter(issue => 
        issue.title.toLowerCase().includes(searchTerm) || 
        issue.description.toLowerCase().includes(searchTerm)
      );
    }

    const total = filteredIssues.length;
    const issues = filteredIssues.slice(offsetNum, offsetNum + limitNum);

    // Get images for each issue
    for (let issue of issues) {
      const [images] = await pool.execute(
        'SELECT id, image_url, caption FROM issue_images WHERE issue_id = ? ORDER BY uploaded_at ASC',
        [issue.id]
      );
      issue.images = images;
    }

    res.json({
      issues,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get issues error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get single issue by ID
router.get('/:id', async (req, res) => {
  try {
    const issueId = parseInt(req.params.id);
    if (isNaN(issueId)) {
      return res.status(400).json({ message: 'Invalid issue ID' });
    }

    const [issues] = await pool.execute(`
      SELECT 
        i.*,
        c.name as category_name,
        c.color as category_color,
        c.icon as category_icon,
        u.first_name as reporter_first_name,
        u.last_name as reporter_last_name,
        u.email as reporter_email,
        assigned.first_name as assigned_first_name,
        assigned.last_name as assigned_last_name
      FROM issues i
      LEFT JOIN categories c ON i.category_id = c.id
      LEFT JOIN users u ON i.reporter_id = u.id
      LEFT JOIN users assigned ON i.assigned_to = assigned.id
      WHERE i.id = ?
    `, [issueId]);

    if (issues.length === 0) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    const issue = issues[0];

    // Get images
    const [images] = await pool.execute(
      'SELECT id, image_url, caption FROM issue_images WHERE issue_id = ? ORDER BY uploaded_at ASC',
      [issueId]
    );
    issue.images = images;

    // Get comments
    const [comments] = await pool.execute(`
      SELECT 
        c.id,
        c.comment,
        c.is_internal,
        c.created_at,
        u.first_name,
        u.last_name,
        u.role
      FROM comments c
      LEFT JOIN users u ON c.user_id = u.id
      WHERE c.issue_id = ? AND c.is_internal = FALSE
      ORDER BY c.created_at ASC
    `, [issueId]);
    issue.comments = comments;

    res.json(issue);
  } catch (error) {
    console.error('Get issue error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create new issue (multer must run before validators so req.body is populated)
router.post(
  '/',
  authenticateToken,
  requireVerified,
  upload.array('images', 5),
  handleUploadError,
  [
    body('title').trim().isLength({ min: 5, max: 255 }),
    body('description').trim().isLength({ min: 10 }),
    body('categoryId').toInt().isInt(),
    body('priority').isIn(['low', 'medium', 'high', 'urgent']),
    body('locationAddress').trim().isLength({ min: 1 }),
    body('latitude').toFloat().isFloat(),
    body('longitude').toFloat().isFloat(),
    body('city').trim().isLength({ min: 1 }),
    body('state').trim().isLength({ min: 1 }),
    body('pincode').trim().isLength({ min: 6, max: 6 }),
    body('streetName').trim().isLength({ min: 1, max: 255 }),
    body('nearbyLandmark').trim().isLength({ min: 1, max: 255 })
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      description,
      categoryId,
      priority,
      locationAddress,
      latitude,
      longitude,
      city,
      state,
      pincode,
      streetName,
      nearbyLandmark
    } = req.body;

    const categoryIdNum = Number(categoryId);
    const latitudeNum = Number(latitude);
    const longitudeNum = Number(longitude);

    // Generate unique ticket ID with retry logic
    let ticketId;
    let retries = 0;
    const maxRetries = 5;
    
    while (retries < maxRetries) {
      ticketId = generateFormattedTicketId();
      
      // Validate ticket ID is not empty
      if (!ticketId || ticketId.trim() === '') {
        retries++;
        continue;
      }
      
      // Check if ticket ID already exists
      try {
        const [existing] = await pool.execute('SELECT id FROM issues WHERE ticket_id = ?', [ticketId]);
        if (existing.length === 0) {
          break; // Unique ticket ID found
        }
        retries++;
      } catch (error) {
        console.error('Error checking ticket ID uniqueness:', error);
        retries++;
      }
    }
    
    if (retries >= maxRetries) {
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to generate unique ticket ID' 
      });
    }

    // Create issue
    let issueId;
    try {
      const [result] = await pool.execute(`
        INSERT INTO issues (
          ticket_id, title, description, category_id, reporter_id, priority,
          location_address, latitude, longitude, city, state, pincode, street_name, nearby_landmark
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        ticketId, title, description, categoryIdNum, req.user.id, priority,
        locationAddress, latitudeNum, longitudeNum, city, state, pincode, streetName, nearbyLandmark
      ]);

      issueId = result.insertId;
    } catch (error) {
      console.error('Create issue error:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to create issue. Please try again.' 
      });
    }

    // Handle uploaded images
    if (req.files && req.files.length > 0) {
      const placeholders = req.files.map(() => '(?, ?, ?)').join(', ');
      const values = req.files.flatMap(file => [
        issueId,
        `/uploads/${file.filename}`,
        file.originalname
      ]);

      const sql = `INSERT INTO issue_images (issue_id, image_url, caption) VALUES ${placeholders}`;
      await pool.execute(sql, values);
    }

    // Log status change
    await pool.execute(`
      INSERT INTO issue_status_history (issue_id, new_status, changed_by, reason)
      VALUES (?, 'pending', ?, 'Issue created')
    `, [issueId, req.user.id]);

    res.status(201).json({
      message: 'Issue created successfully',
      issueId,
      ticketId
    });
  } catch (error) {
    console.error('Create issue error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update issue status (Admin/Moderator only)
router.patch('/:id/status', authenticateToken, requireRole(['admin', 'moderator']), [
  body('status').isIn(['pending', 'in_progress', 'resolved', 'rejected']),
  body('assignedTo').optional().isInt(),
  body('resolutionNotes').optional().trim(),
  body('reason').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const issueId = parseInt(req.params.id);
    const { status, assignedTo, resolutionNotes, reason } = req.body;

    if (isNaN(issueId)) {
      return res.status(400).json({ message: 'Invalid issue ID' });
    }

    // Get current issue status
    const [issues] = await pool.execute(
      'SELECT status, reporter_id FROM issues WHERE id = ?',
      [issueId]
    );

    if (issues.length === 0) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    const currentStatus = issues[0].status;
    const reporterId = issues[0].reporter_id;

    // Update issue
    const updateFields = ['status = ?'];
    const updateValues = [status];

    if (assignedTo) {
      updateFields.push('assigned_to = ?');
      updateValues.push(assignedTo);
    }

    if (resolutionNotes) {
      updateFields.push('resolution_notes = ?');
      updateValues.push(resolutionNotes);
    }

    if (status === 'resolved') {
      updateFields.push('resolved_at = NOW()');
    }

    updateValues.push(issueId);

    await pool.execute(
      `UPDATE issues SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    // Log status change
    await pool.execute(`
      INSERT INTO issue_status_history (issue_id, old_status, new_status, changed_by, reason)
      VALUES (?, ?, ?, ?, ?)
    `, [issueId, currentStatus, status, req.user.id, reason || 'Status updated']);

    // Create notification for reporter (only if reporter exists and issue still exists)
    if (reporterId) {
      try {
        // Double-check that the issue still exists before creating notification
        const [issueCheck] = await pool.execute('SELECT id FROM issues WHERE id = ?', [issueId]);
        if (issueCheck.length > 0) {
          await pool.execute(`
            INSERT INTO notifications (user_id, issue_id, title, message, type)
            VALUES (?, ?, ?, ?, ?)
          `, [
            reporterId,
            issueId,
            'Issue Status Updated',
            `Your issue status has been changed to ${status}`,
            'status_change'
          ]);
        } else {
          console.log(`Issue ${issueId} no longer exists, skipping notification creation`);
        }
      } catch (notificationError) {
        console.error('Notification creation error:', notificationError);
        // Don't fail the entire operation if notification creation fails
      }
    }

    res.json({ message: 'Issue status updated successfully' });
  } catch (error) {
    console.error('Update issue status error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add comment to issue
router.post('/:id/comments', authenticateToken, [
  body('comment').trim().isLength({ min: 1 }),
  body('isInternal').optional().isBoolean()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const issueId = parseInt(req.params.id);
    const { comment, isInternal = false } = req.body;

    if (isNaN(issueId)) {
      return res.status(400).json({ message: 'Invalid issue ID' });
    }

    // Check if issue exists
    const [issues] = await pool.execute('SELECT id, reporter_id FROM issues WHERE id = ?', [issueId]);
    if (issues.length === 0) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    // Add comment
    await pool.execute(
      'INSERT INTO comments (issue_id, user_id, comment, is_internal) VALUES (?, ?, ?, ?)',
      [issueId, req.user.id, comment, isInternal]
    );

    // Create notification for reporter (if not internal comment and reporter exists)
    if (!isInternal && issues[0].reporter_id) {
      try {
        // Double-check that the issue still exists before creating notification
        const [issueCheck] = await pool.execute('SELECT id FROM issues WHERE id = ?', [issueId]);
        if (issueCheck.length > 0) {
          await pool.execute(`
            INSERT INTO notifications (user_id, issue_id, title, message, type)
            VALUES (?, ?, ?, ?, ?)
          `, [
            issues[0].reporter_id,
            issueId,
            'New Comment Added',
            'A new comment has been added to your issue',
            'comment'
          ]);
        } else {
          console.log(`Issue ${issueId} no longer exists, skipping comment notification creation`);
        }
      } catch (notificationError) {
        console.error('Comment notification creation error:', notificationError);
        // Don't fail the entire operation if notification creation fails
      }
    }

    res.status(201).json({ message: 'Comment added successfully' });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get issue comments
router.get('/:id/comments', async (req, res) => {
  try {
    const issueId = parseInt(req.params.id);
    if (isNaN(issueId)) {
      return res.status(400).json({ message: 'Invalid issue ID' });
    }

    const [comments] = await pool.execute(`
      SELECT 
        c.id,
        c.comment,
        c.is_internal,
        c.created_at,
        u.first_name,
        u.last_name,
        u.role
      FROM comments c
      LEFT JOIN users u ON c.user_id = u.id
      WHERE c.issue_id = ?
      ORDER BY c.created_at ASC
    `, [issueId]);

    res.json(comments);
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
