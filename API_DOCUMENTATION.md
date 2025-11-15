# API Documentation for .NET Backend

This document outlines all the API endpoints required for the admin panel and public website functionality.

**Base URL:** `https://api.nikolozkuridze.com`

All authenticated endpoints require a JWT token in the `Authorization` header:
```
Authorization: Bearer <token>
```

---

## Table of Contents

1. [Authentication Endpoints](#authentication-endpoints)
2. [Blog Endpoints](#blog-endpoints)
3. [Project Endpoints](#project-endpoints)
4. [Common Response Formats](#common-response-formats)

---

## Authentication Endpoints

### 1. Admin Login

**Endpoint:** `POST /auth/login`

**Description:** Authenticate admin user and receive JWT token

**Request Body:**
```json
{
  "email": "admin@nikolozkuridze.com",
  "password": "your_password"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "1",
    "email": "admin@nikolozkuridze.com",
    "name": "Admin User"
  }
}
```

**Error Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### 2. Verify Token

**Endpoint:** `POST /auth/verify`

**Description:** Verify if JWT token is still valid

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:** `{}` (empty)

**Success Response (200 OK):**
```json
{
  "success": true,
  "admin": {
    "id": "1",
    "email": "admin@nikolozkuridze.com",
    "name": "Admin User"
  }
}
```

**Error Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

---

### 3. Change Password

**Endpoint:** `POST /auth/change-password`

**Description:** Change admin password

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "currentPassword": "old_password",
  "newPassword": "new_password"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Current password is incorrect"
}
```

---

## Blog Endpoints

### 1. Get All Blogs (Admin)

**Endpoint:** `GET /blogs/all`

**Description:** Get all blogs including unpublished (admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "blogs": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": {
        "en": "Getting Started with React",
        "ka": "React-ის დაწყება"
      },
      "slug": "getting-started-with-react",
      "description": {
        "en": "Learn the basics of React",
        "ka": "ისწავლეთ React-ის საფუძვლები"
      },
      "content": {
        "en": "<p>React is a JavaScript library...</p>",
        "ka": "<p>React არის JavaScript ბიბლიოთეკა...</p>"
      },
      "category": "tutorial",
      "tags": ["react", "javascript", "tutorial"],
      "thumbnail": "https://example.com/image.jpg",
      "author": "Nikoloz Kuridze",
      "published": true,
      "featured": true,
      "views": 523,
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

---

### 2. Get Published Blogs (Public)

**Endpoint:** `GET /blogs`

**Description:** Get all published blogs for public display

**Query Parameters:**
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Items per page (default: 10)
- `category` (optional): Filter by category
- `featured` (optional): Filter featured blogs (true/false)

**Success Response (200 OK):**
```json
{
  "success": true,
  "blogs": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": {
        "en": "Getting Started with React",
        "ka": "React-ის დაწყება"
      },
      "slug": "getting-started-with-react",
      "description": {
        "en": "Learn the basics of React",
        "ka": "ისწავლეთ React-ის საფუძვლები"
      },
      "thumbnail": "https://example.com/image.jpg",
      "author": "Nikoloz Kuridze",
      "category": "tutorial",
      "tags": ["react", "javascript"],
      "featured": true,
      "views": 523,
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 48,
    "itemsPerPage": 10
  }
}
```

---

### 3. Get Single Blog by Slug/ID

**Endpoint:** `GET /blogs/:slugOrId`

**Description:** Get a single blog post by slug or ID

**Parameters:**
- `slugOrId`: Blog slug (e.g., "getting-started-with-react") or MongoDB ObjectId

**Success Response (200 OK):**
```json
{
  "success": true,
  "blog": {
    "_id": "507f1f77bcf86cd799439011",
    "title": {
      "en": "Getting Started with React",
      "ka": "React-ის დაწყება"
    },
    "slug": "getting-started-with-react",
    "description": {
      "en": "Learn the basics of React",
      "ka": "ისწავლეთ React-ის საფუძვლები"
    },
    "content": {
      "en": "<p>Full blog content here...</p>",
      "ka": "<p>სრული შინაარსი აქ...</p>"
    },
    "category": "tutorial",
    "tags": ["react", "javascript", "tutorial"],
    "thumbnail": "https://example.com/image.jpg",
    "author": "Nikoloz Kuridze",
    "published": true,
    "featured": true,
    "views": 524,
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T10:00:00Z"
  }
}
```

**Note:** This endpoint should increment the `views` counter by 1.

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Blog not found"
}
```

---

### 4. Create Blog

**Endpoint:** `POST /blogs`

**Description:** Create a new blog post (admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": {
    "en": "New Blog Post",
    "ka": "ახალი ბლოგ პოსტი"
  },
  "slug": "new-blog-post",
  "description": {
    "en": "Short description",
    "ka": "მოკლე აღწერა"
  },
  "content": {
    "en": "<p>Full content...</p>",
    "ka": "<p>სრული შინაარსი...</p>"
  },
  "category": "article",
  "tags": ["tag1", "tag2"],
  "thumbnail": "https://example.com/image.jpg",
  "author": "Nikoloz Kuridze",
  "published": true,
  "featured": false
}
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "Blog created successfully",
  "blog": {
    "_id": "507f1f77bcf86cd799439012",
    "title": {
      "en": "New Blog Post",
      "ka": "ახალი ბლოგ პოსტი"
    },
    "slug": "new-blog-post",
    "views": 0,
    "createdAt": "2024-01-25T10:00:00Z",
    "updatedAt": "2024-01-25T10:00:00Z"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Slug already exists"
}
```

---

### 5. Update Blog

**Endpoint:** `PUT /blogs/:id`

**Description:** Update an existing blog post (admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**Parameters:**
- `id`: MongoDB ObjectId of the blog

**Request Body:** (same as Create Blog)

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Blog updated successfully",
  "blog": {
    "_id": "507f1f77bcf86cd799439012",
    "title": {
      "en": "Updated Blog Post",
      "ka": "განახლებული ბლოგ პოსტი"
    },
    "updatedAt": "2024-01-26T10:00:00Z"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Blog not found"
}
```

---

### 6. Delete Blog

**Endpoint:** `DELETE /blogs/:id`

**Description:** Delete a blog post (admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**Parameters:**
- `id`: MongoDB ObjectId of the blog

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Blog deleted successfully"
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Blog not found"
}
```

---

## Project Endpoints

### 1. Get All Projects (Admin)

**Endpoint:** `GET /projects/all`

**Description:** Get all projects including unpublished (admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "projects": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "title": {
        "en": "E-Commerce Platform",
        "ka": "ელექტრონული კომერციის პლატფორმა"
      },
      "description": {
        "en": "A full-featured e-commerce solution",
        "ka": "სრულფუნქციური ელექტრონული კომერციის გადაწყვეტა"
      },
      "longDescription": {
        "en": "Detailed description...",
        "ka": "დეტალური აღწერა..."
      },
      "category": "Enterprise",
      "technologies": ["React", "Node.js", "MongoDB", "Stripe"],
      "image": "https://example.com/project.jpg",
      "demoUrl": "https://demo.example.com",
      "githubUrl": "https://github.com/example/project",
      "published": true,
      "featured": true,
      "order": 1,
      "createdAt": "2024-01-10T10:00:00Z",
      "updatedAt": "2024-01-10T10:00:00Z"
    }
  ]
}
```

---

### 2. Get Published Projects (Public)

**Endpoint:** `GET /projects`

**Description:** Get all published projects for public display

**Query Parameters:**
- `featured` (optional): Filter featured projects (true/false)
- `category` (optional): Filter by category

**Success Response (200 OK):**
```json
{
  "success": true,
  "projects": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "title": {
        "en": "E-Commerce Platform",
        "ka": "ელექტრონული კომერციის პლატფორმა"
      },
      "description": {
        "en": "A full-featured e-commerce solution",
        "ka": "სრულფუნქციური ელექტრონული კომერციის გადაწყვეტა"
      },
      "longDescription": {
        "en": "Detailed description...",
        "ka": "დეტალური აღწერა..."
      },
      "category": "Enterprise",
      "technologies": ["React", "Node.js", "MongoDB", "Stripe"],
      "image": "https://example.com/project.jpg",
      "demoUrl": "https://demo.example.com",
      "githubUrl": "https://github.com/example/project",
      "featured": true,
      "order": 1
    }
  ]
}
```

**Note:** Projects should be sorted by `order` field (ascending).

---

### 3. Get Single Project by ID

**Endpoint:** `GET /projects/:id`

**Description:** Get a single project by ID

**Parameters:**
- `id`: MongoDB ObjectId of the project

**Success Response (200 OK):**
```json
{
  "success": true,
  "project": {
    "_id": "507f1f77bcf86cd799439013",
    "title": {
      "en": "E-Commerce Platform",
      "ka": "ელექტრონული კომერციის პლატფორმა"
    },
    "description": {
      "en": "A full-featured e-commerce solution",
      "ka": "სრულფუნქციური ელექტრონული კომერციის გადაწყვეტა"
    },
    "longDescription": {
      "en": "Detailed description...",
      "ka": "დეტალური აღწერა..."
    },
    "category": "Enterprise",
    "technologies": ["React", "Node.js", "MongoDB", "Stripe"],
    "image": "https://example.com/project.jpg",
    "demoUrl": "https://demo.example.com",
    "githubUrl": "https://github.com/example/project",
    "published": true,
    "featured": true,
    "order": 1,
    "createdAt": "2024-01-10T10:00:00Z",
    "updatedAt": "2024-01-10T10:00:00Z"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Project not found"
}
```

---

### 4. Create Project

**Endpoint:** `POST /projects`

**Description:** Create a new project (admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": {
    "en": "New Project",
    "ka": "ახალი პროექტი"
  },
  "description": {
    "en": "Short description",
    "ka": "მოკლე აღწერა"
  },
  "longDescription": {
    "en": "Detailed description...",
    "ka": "დეტალური აღწერა..."
  },
  "category": "Web Development",
  "technologies": ["React", "TypeScript", "Node.js"],
  "image": "https://example.com/project.jpg",
  "demoUrl": "https://demo.example.com",
  "githubUrl": "https://github.com/example/project",
  "published": true,
  "featured": false,
  "order": 5
}
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "Project created successfully",
  "project": {
    "_id": "507f1f77bcf86cd799439014",
    "title": {
      "en": "New Project",
      "ka": "ახალი პროექტი"
    },
    "createdAt": "2024-01-25T10:00:00Z",
    "updatedAt": "2024-01-25T10:00:00Z"
  }
}
```

---

### 5. Update Project

**Endpoint:** `PUT /projects/:id`

**Description:** Update an existing project (admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**Parameters:**
- `id`: MongoDB ObjectId of the project

**Request Body:** (same as Create Project)

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Project updated successfully",
  "project": {
    "_id": "507f1f77bcf86cd799439014",
    "title": {
      "en": "Updated Project",
      "ka": "განახლებული პროექტი"
    },
    "updatedAt": "2024-01-26T10:00:00Z"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Project not found"
}
```

---

### 6. Delete Project

**Endpoint:** `DELETE /projects/:id`

**Description:** Delete a project (admin only)

**Headers:**
```
Authorization: Bearer <token>
```

**Parameters:**
- `id`: MongoDB ObjectId of the project

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Project not found"
}
```

---

## Common Response Formats

### Error Responses

**Validation Error (400 Bad Request):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    },
    {
      "field": "password",
      "message": "Password must be at least 6 characters"
    }
  ]
}
```

**Unauthorized (401):**
```json
{
  "success": false,
  "message": "Unauthorized - Invalid or missing token"
}
```

**Forbidden (403):**
```json
{
  "success": false,
  "message": "Forbidden - Insufficient permissions"
}
```

**Not Found (404):**
```json
{
  "success": false,
  "message": "Resource not found"
}
```

**Server Error (500):**
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Data Models

### Blog Schema
```typescript
{
  _id: string (MongoDB ObjectId)
  title: {
    en: string (required)
    ka: string (required)
  }
  slug: string (required, unique, lowercase)
  description: {
    en: string (required)
    ka: string (required)
  }
  content: {
    en: string (required, HTML)
    ka: string (required, HTML)
  }
  category: string (required) // "tutorial" | "tip" | "article" | "news"
  tags: string[] (array of strings)
  thumbnail: string (URL)
  author: string (default: "Nikoloz Kuridze")
  published: boolean (default: false)
  featured: boolean (default: false)
  views: number (default: 0)
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

### Project Schema
```typescript
{
  _id: string (MongoDB ObjectId)
  title: {
    en: string (required)
    ka: string (required)
  }
  description: {
    en: string (required)
    ka: string (required)
  }
  longDescription: {
    en: string
    ka: string
  }
  category: string (required)
  technologies: string[] (array of strings)
  image: string (required, URL)
  demoUrl: string (URL)
  githubUrl: string (URL)
  published: boolean (default: false)
  featured: boolean (default: false)
  order: number (default: 0, for sorting)
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

---

## Notes for .NET Implementation

1. **CORS**: Enable CORS for the frontend domain (https://nikolozkuridze.com)

2. **JWT Token**:
   - Use a secure secret key
   - Set expiration to 7 days
   - Include admin ID and email in the token payload

3. **Security**:
   - Implement rate limiting (especially for login endpoint)
   - Use HTTPS only
   - Hash passwords using bcrypt or similar
   - Validate all inputs
   - Sanitize HTML content to prevent XSS

4. **Database**:
   - You can use MongoDB, PostgreSQL, or SQL Server
   - Ensure proper indexing on slug, published, and featured fields
   - Create unique index on blog slug

5. **File Upload** (Optional for future):
   - If you want to support image uploads instead of URLs
   - Implement endpoints for file upload
   - Use cloud storage (Azure Blob Storage, AWS S3, etc.)

6. **Additional Features to Consider**:
   - Search functionality for blogs
   - Pagination for all list endpoints
   - Filtering and sorting options
   - Draft auto-save functionality
   - Image optimization
   - RSS feed generation

---

## Testing the API

Use the following curl commands to test your endpoints:

### Login
```bash
curl -X POST https://api.nikolozkuridze.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@nikolozkuridze.com","password":"your_password"}'
```

### Get All Blogs (Admin)
```bash
curl -X GET https://api.nikolozkuridze.com/blogs/all \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Create Blog
```bash
curl -X POST https://api.nikolozkuridze.com/blogs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": {"en": "Test Blog", "ka": "ტესტ ბლოგი"},
    "slug": "test-blog",
    "description": {"en": "Test", "ka": "ტესტი"},
    "content": {"en": "<p>Test content</p>", "ka": "<p>ტესტ შინაარსი</p>"},
    "category": "article",
    "tags": ["test"],
    "thumbnail": "https://via.placeholder.com/800x400",
    "author": "Nikoloz Kuridze",
    "published": true,
    "featured": false
  }'
```

---

## Contact

For questions or issues, please contact the development team.
