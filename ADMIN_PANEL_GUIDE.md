# Admin Panel & Backend Setup Guide

Complete guide for setting up and using the admin panel with backend API for nikolozkuridze.com

## Features Implemented

### Backend (Express + MongoDB)
- ✅ RESTful API with Express.js
- ✅ MongoDB database with Mongoose ODM
- ✅ JWT-based authentication
- ✅ Admin authentication system
- ✅ Blog/Tips management API
- ✅ Projects management API
- ✅ IP-based language detection API
- ✅ Security features (Helmet, Rate Limiting)
- ✅ CORS configuration

### Frontend (React Admin Panel)
- ✅ Admin login page
- ✅ Protected routes with authentication
- ✅ Dashboard with statistics
- ✅ Blog management (Create, Edit, Delete)
- ✅ Rich text editor with code syntax highlighting
- ✅ Project management (Create, Edit, Delete)
- ✅ Full bilingual support (English/Georgian)
- ✅ Responsive design
- ✅ Modern UI with Tailwind CSS

### Language Detection
- ✅ IP-based language detection (Georgia = Georgian, Others = English)
- ✅ localStorage fallback
- ✅ Manual language switcher
- ✅ Full translations for admin panel

## Installation & Setup

### Prerequisites
- Node.js 18+ installed
- MongoDB installed and running
- Git

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 2. Configure Environment Variables

Frontend `.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_SITE_URL=https://nikolozkuridze.com
```

Backend `server/.env`:
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb://localhost:27017/nikolozkuridze
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=admin@nikolozkuridze.com
ADMIN_PASSWORD=changeme123
FRONTEND_URL=https://nikolozkuridze.com
```

### 3. Start MongoDB

```bash
# Ubuntu/Debian
sudo systemctl start mongod

# macOS
brew services start mongodb-community

# Windows
net start MongoDB
```

### 4. Seed Admin User

```bash
cd server
npm run seed
```

This will create an admin user with:
- Email: `admin@nikolozkuridze.com`
- Password: `changeme123`

**⚠️ IMPORTANT: Change this password after first login!**

### 5. Start the Servers

**Terminal 1 - Backend:**
```bash
cd server
npm start
# or for development with auto-reload:
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`
The backend API will be available at `http://localhost:5000`

## API Routes

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/verify` - Verify JWT token
- `POST /api/auth/change-password` - Change admin password

### Blogs (Public)
- `GET /api/blogs` - Get published blogs
- `GET /api/blogs/:slug` - Get blog by slug

### Blogs (Admin - Requires Auth)
- `GET /api/blogs/all` - Get all blogs (including unpublished)
- `POST /api/blogs` - Create new blog
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog

### Projects (Public)
- `GET /api/projects` - Get published projects
- `GET /api/projects/:id` - Get project by ID

### Projects (Admin - Requires Auth)
- `GET /api/projects/all` - Get all projects (including unpublished)
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Language Detection
- `GET /api/language/detect` - Detect language based on IP address

## Frontend Routes

### Public Routes
- `/` - Homepage (portfolio)

### Admin Routes
- `/admin/login` - Admin login page
- `/admin/dashboard` - Admin dashboard
- `/admin/blogs` - Blog list
- `/admin/blogs/new` - Create new blog
- `/admin/blogs/edit/:id` - Edit blog
- `/admin/projects` - Project list
- `/admin/projects/new` - Create new project
- `/admin/projects/edit/:id` - Edit project

## Using the Admin Panel

### 1. Login
1. Navigate to `https://nikolozkuridze.com/admin/login`
2. Enter admin credentials
3. Click "Login"

### 2. Create a Blog Post
1. Go to "Blogs" in the sidebar
2. Click "Create Blog" button
3. Fill in both English and Georgian content using the language tabs
4. Use the rich text editor for content (supports code syntax highlighting)
5. Set category, tags, and thumbnail
6. Toggle "Published" to make it public
7. Click "Save"

### 3. Manage Projects
1. Go to "Projects" in the sidebar
2. Click "Create Project"
3. Fill in project details in both languages
4. Add technologies (comma-separated)
5. Add demo and GitHub URLs
6. Set display order
7. Toggle "Published" and "Featured"
8. Click "Save"

### 4. Rich Text Editor Features
- Headers (H1-H6)
- Text formatting (bold, italic, underline, strikethrough)
- Code blocks with syntax highlighting
- Lists (ordered and unordered)
- Links and images
- Blockquotes
- Text alignment
- Colors and backgrounds

## Blog Categories
- **Tutorial** - Step-by-step guides
- **Tip** - Quick tips and tricks
- **Article** - In-depth articles
- **News** - News and updates

## Database Models

### Admin
```javascript
{
  email: String (unique),
  password: String (hashed),
  name: String,
  createdAt: Date,
  lastLogin: Date
}
```

### Blog
```javascript
{
  title: { en: String, ka: String },
  slug: String (unique, auto-generated),
  description: { en: String, ka: String },
  content: { en: String, ka: String },
  category: String (tutorial|tip|article|news),
  tags: [String],
  thumbnail: String,
  published: Boolean,
  featured: Boolean,
  views: Number,
  author: String,
  createdAt: Date,
  updatedAt: Date,
  publishedAt: Date
}
```

### Project
```javascript
{
  title: { en: String, ka: String },
  description: { en: String, ka: String },
  longDescription: { en: String, ka: String },
  technologies: [String],
  category: String,
  image: String,
  demoUrl: String,
  githubUrl: String,
  featured: Boolean,
  order: Number,
  published: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Security Features

### Backend
- Helmet.js for security headers
- Rate limiting (100 requests per 15 minutes)
- CORS with whitelist
- JWT token authentication
- Bcrypt password hashing
- Input validation with express-validator

### Frontend
- Protected routes with authentication
- Token stored in Zustand with persistence
- Automatic token verification
- Secure logout

## Production Deployment

### Backend
1. Set `NODE_ENV=production`
2. Change `JWT_SECRET` to a secure random string
3. Update `MONGODB_URI` to production database
4. Update `FRONTEND_URL` to production URL
5. Change admin password

### Frontend
1. Update `VITE_API_URL` to production API URL
2. Build: `npm run build`
3. Deploy `dist` folder to web server

### MongoDB
- Enable authentication
- Create database user
- Set up regular backups
- Configure firewall rules

## Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify `.env` file exists with correct values
- Check if port 5000 is available

### Cannot login
- Verify admin user was seeded: `cd server && npm run seed`
- Check MongoDB connection
- Verify JWT_SECRET is set

### CORS errors
- Update `FRONTEND_URL` in backend `.env`
- Restart backend server

### Rich text editor not loading
- Clear browser cache
- Check console for errors
- Verify all dependencies installed

## Support

For issues or questions:
- Check logs: Backend logs in terminal, Frontend in browser console
- Verify environment variables are set correctly
- Ensure MongoDB is running and accessible

## License

Private project - All rights reserved © Nikoloz Kuridze
