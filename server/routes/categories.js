const express = require('express');
const { pool } = require('../config/database');
const { authenticateToken, requireRole } = require('../middleware/auth');

const router = express.Router();

// Get all categories
router.get('/', async (req, res) => {
  try {
    const [categories] = await pool.execute(
      'SELECT * FROM categories ORDER BY id ASC'
    );
    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get category by ID
router.get('/:id', async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);
    if (isNaN(categoryId)) {
      return res.status(400).json({ message: 'Invalid category ID' });
    }

    const [categories] = await pool.execute(
      'SELECT * FROM categories WHERE id = ?',
      [categoryId]
    );

    if (categories.length === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(categories[0]);
  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create new category (Admin only)
router.post('/', authenticateToken, requireRole(['admin']), async (req, res) => {
  try {
    const { name, description, icon, color } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: 'Name and description are required' });
    }

    const [result] = await pool.execute(
      'INSERT INTO categories (name, description, icon, color) VALUES (?, ?, ?, ?)',
      [name, description, icon || 'folder', color || '#3B82F6']
    );

    res.status(201).json({
      message: 'Category created successfully',
      categoryId: result.insertId
    });
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update category (Admin only)
router.put('/:id', authenticateToken, requireRole(['admin']), async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);
    const { name, description, icon, color } = req.body;

    if (isNaN(categoryId)) {
      return res.status(400).json({ message: 'Invalid category ID' });
    }

    if (!name || !description) {
      return res.status(400).json({ message: 'Name and description are required' });
    }

    const [result] = await pool.execute(
      'UPDATE categories SET name = ?, description = ?, icon = ?, color = ? WHERE id = ?',
      [name, description, icon, color, categoryId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ message: 'Category updated successfully' });
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete category (Admin only)
router.delete('/:id', authenticateToken, requireRole(['admin']), async (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);

    if (isNaN(categoryId)) {
      return res.status(400).json({ message: 'Invalid category ID' });
    }

    // Check if category has issues
    const [issues] = await pool.execute(
      'SELECT COUNT(*) as count FROM issues WHERE category_id = ?',
      [categoryId]
    );

    if (issues[0].count > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete category with existing issues' 
      });
    }

    const [result] = await pool.execute(
      'DELETE FROM categories WHERE id = ?',
      [categoryId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
