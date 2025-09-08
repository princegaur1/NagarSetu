<<<<<<< HEAD
# Nagar Setu Platform

A comprehensive crowdsourced civic issue reporting and resolution system built with Next.js, Node.js, and MySQL. This platform allows citizens to report Nagar Setu, track their resolution status, and engage with their local government.

## Features

### For Citizens
- **Issue Reporting**: Report Nagar Setu with photos, location data, and detailed descriptions
- **Issue Tracking**: Monitor the status and progress of reported issues
- **Categories**: Organize issues by type (Roads, Water, Electricity, etc.)
- **Priority Levels**: Set urgency levels for different issues
- **Comments**: Add comments and updates to issues
- **Notifications**: Receive updates on issue status changes
- **Dashboard**: Personal dashboard to manage your reported issues

### For Administrators
- **Issue Management**: View, assign, and update issue status
- **User Management**: Manage user accounts and permissions
- **Category Management**: Add and manage issue categories
- **Analytics**: Track issue resolution metrics
- **Notifications**: Send updates to citizens about issue progress

### Technical Features
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Updates**: Live notifications and status updates
- **File Upload**: Support for multiple image uploads
- **Location Services**: GPS integration for accurate issue location
- **Search & Filtering**: Advanced search and filter capabilities
- **Authentication**: Secure user authentication and authorization
- **API**: RESTful API for all platform functionality

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Context** - State management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MySQL** - Relational database
- **JWT** - Authentication tokens
- **Multer** - File upload handling
- **Bcrypt** - Password hashing

### Database
- **MySQL** - Primary database
- **Connection Pooling** - Efficient database connections

## Installation

### Prerequisites
- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd civic-issues-platform
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Database Setup
1. Create a MySQL database:
```sql
CREATE DATABASE civic_issues;
```

2. Import the database schema:
```bash
mysql -u your_username -p civic_issues < server/database/schema.sql
```

### 4. Environment Configuration
1. Copy the example environment file:
```bash
cp server/config.example.env server/.env
```

2. Update the environment variables in `server/.env`:
```env
# Database Configuration
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=civic_issues

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=5000
NODE_ENV=development

# Email Configuration (for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# File Upload Configuration
UPLOAD_DIR=uploads
MAX_FILE_SIZE=5242880

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### 5. Start the Application
```bash
# Start both frontend and backend
npm run dev

# Or start them separately:
# Backend only
npm run server

# Frontend only
npm run client
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Issues
- `GET /api/issues` - Get all issues (with filters)
- `GET /api/issues/:id` - Get single issue
- `POST /api/issues` - Create new issue
- `PATCH /api/issues/:id/status` - Update issue status
- `POST /api/issues/:id/comments` - Add comment to issue
- `GET /api/issues/:id/comments` - Get issue comments

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create category (Admin only)
- `PUT /api/categories/:id` - Update category (Admin only)
- `DELETE /api/categories/:id` - Delete category (Admin only)

### Notifications
- `GET /api/notifications` - Get user notifications
- `GET /api/notifications/unread-count` - Get unread count
- `PATCH /api/notifications/:id/read` - Mark notification as read
- `PATCH /api/notifications/mark-all-read` - Mark all as read
- `DELETE /api/notifications/:id` - Delete notification

## Database Schema

### Users Table
- User authentication and profile information
- Role-based access control (citizen, admin, moderator)

### Issues Table
- Issue details, status, priority, and location
- Foreign keys to categories and users

### Categories Table
- Issue categories with icons and colors
- Pre-populated with common civic issue types

### Comments Table
- Issue comments and internal notes
- User attribution and timestamps

### Notifications Table
- User notifications for issue updates
- Read/unread status tracking

### Issue Images Table
- File uploads and image metadata
- Support for multiple images per issue

## Development

### Project Structure
```
civic-issues-platform/
├── client/                 # Next.js frontend
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   ├── components/    # React components
│   │   ├── contexts/      # React contexts
│   │   └── lib/           # Utilities and API client
├── server/                # Node.js backend
│   ├── config/            # Database and app configuration
│   ├── middleware/        # Express middleware
│   ├── routes/            # API routes
│   ├── database/          # Database schema and migrations
│   └── uploads/           # File upload directory
└── package.json           # Root package.json
```

### Adding New Features
1. Create API endpoints in `server/routes/`
2. Add frontend components in `client/src/components/`
3. Update database schema if needed
4. Add tests for new functionality

### Code Style
- Use TypeScript for type safety
- Follow React best practices
- Use Tailwind CSS for styling
- Implement proper error handling
- Add JSDoc comments for complex functions

## Deployment

### Production Environment
1. Set `NODE_ENV=production`
2. Use a production MySQL database
3. Configure proper CORS settings
4. Set up file storage (AWS S3, etc.)
5. Use environment variables for secrets

### Docker Deployment
```dockerfile
# Example Dockerfile for server
FROM node:18-alpine
WORKDIR /app
COPY server/package*.json ./
RUN npm ci --only=production
COPY server/ .
EXPOSE 5000
CMD ["npm", "start"]
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## Roadmap

### Phase 1 (Current)
- ✅ Basic issue reporting and tracking
- ✅ User authentication and authorization
- ✅ File upload functionality
- ✅ Admin dashboard

### Phase 2 (Planned)
- [ ] Real-time notifications with WebSockets
- [ ] Mobile app (React Native)
- [ ] Advanced analytics and reporting
- [ ] Integration with government systems

### Phase 3 (Future)
- [ ] AI-powered issue categorization
- [ ] Automated resolution workflows
- [ ] Multi-language support
- [ ] Advanced mapping and GIS integration

---

**Note**: This is a demonstration project for SIH25031. In a production environment, additional security measures, performance optimizations, and scalability considerations would be implemented.
=======
# NagarSetu
NagarSetu
>>>>>>> 2b36a4e96b653ca12c4b5743e99f60db05d2e197
