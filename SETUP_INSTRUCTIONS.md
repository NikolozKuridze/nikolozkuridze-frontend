# Setup Instructions

## Changes Made

This project has been refactored to use a .NET backend API instead of the built-in Node.js/Express server.

### What was removed:
- `/server` directory (Express.js backend)
- All server-side code and MongoDB dependencies

### What was updated:
- Environment variables now point to `https://api.nikolozkuridze.com`
- Admin authentication uses mock login for testing (any email/password will work)
- All API calls are commented out and replaced with mock data
- Build process updated and tested successfully

---

## Current Setup (Testing Mode)

### Admin Panel Access

1. **Navigate to:** `http://localhost:5173/admin/login` (or your production URL + `/admin/login`)

2. **Login with any credentials:**
   - Email: `test@test.com` (or any email)
   - Password: `password` (or any password)
   - **Note:** Mock authentication accepts any credentials for testing purposes

3. **Available Admin Pages:**
   - `/admin/dashboard` - View statistics (mock data)
   - `/admin/blogs` - Manage blog posts (mock data)
   - `/admin/blogs/new` - Create new blog
   - `/admin/blogs/edit/:id` - Edit existing blog
   - `/admin/projects` - Manage projects (mock data)
   - `/admin/projects/new` - Create new project
   - `/admin/projects/edit/:id` - Edit existing project

### Mock Data

The admin panel currently displays mock data to showcase the design:

**Dashboard Stats:**
- Total Blogs: 12
- Published Blogs: 8
- Total Projects: 15
- Total Views: 1234

**Sample Blogs:**
- Getting Started with React
- Advanced TypeScript Patterns
- Building REST APIs

**Sample Projects:**
- E-Commerce Platform
- AI Chat Application
- Portfolio Website

---

## Switching to Real .NET API

Once your .NET backend is ready, follow these steps:

### 1. Update Environment Variables

The `.env` file already points to the correct API:
```
VITE_API_URL=https://api.nikolozkuridze.com
```

Make sure your .NET API is deployed and accessible at this URL.

### 2. Enable Real API Calls

In each admin page file, uncomment the real API implementation and remove the mock code:

**Files to update:**
- `src/store/adminStore.ts` - Authentication logic
- `src/pages/admin/Dashboard.tsx` - Stats fetching
- `src/pages/admin/Blogs.tsx` - Blog list and delete
- `src/pages/admin/BlogEditor.tsx` - Create/edit blog
- `src/pages/admin/Projects.tsx` - Project list and delete
- `src/pages/admin/ProjectEditor.tsx` - Create/edit project

**Example in `src/store/adminStore.ts`:**

Find this section:
```typescript
login: async (email: string, _password: string) => {
  // MOCK LOGIN FOR TESTING - Remove when .NET API is ready
  await new Promise(resolve => setTimeout(resolve, 500));
  // ... mock code ...

  /* REAL API IMPLEMENTATION - Uncomment when .NET API is ready
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password
    });
    // ... real implementation ...
  }
  */
}
```

**Change to:**
```typescript
login: async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password
    });

    if (response.data.success) {
      set({
        admin: response.data.admin,
        token: response.data.token,
        isAuthenticated: true
      });
    }
  } catch {
    throw new Error('Invalid credentials');
  }
}
```

Repeat this process for all admin pages.

### 3. Uncomment adminApi Import

In admin pages where it's commented out, uncomment the import:

**Change from:**
```typescript
// import { adminApi } from '../../store/adminStore';
```

**To:**
```typescript
import { adminApi } from '../../store/adminStore';
```

### 4. Test the Integration

1. Ensure your .NET API is running and accessible
2. Try logging in with real credentials
3. Test all CRUD operations (Create, Read, Update, Delete)
4. Verify authentication and authorization
5. Check error handling

---

## Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

Access at: `http://localhost:5173`

### Build for Production
```bash
npm run build
```

Output will be in the `dist/` folder.

### Preview Production Build
```bash
npm run preview
```

---

## API Documentation

See `API_DOCUMENTATION.md` for complete API endpoint specifications, including:
- Request/Response formats
- Authentication requirements
- Data models
- Error handling
- Testing examples

---

## Admin Panel Features

### Bilingual Content
All content (blogs and projects) supports both English and Georgian languages.

### Blog Management
- Rich text editor with code highlighting
- Category selection (tutorial, tip, article, news)
- Tags management
- SEO-friendly slugs
- Featured blog selection
- Publish/Draft status
- View counter

### Project Management
- Bilingual titles and descriptions
- Technology stack tags
- Category organization
- Demo and GitHub links
- Featured project selection
- Custom ordering
- Image management

### Dashboard
- Total blogs count
- Published blogs count
- Total projects count
- Total blog views

---

## Security Notes

### Current Mock Setup (Testing Only)
- **DO NOT USE IN PRODUCTION**
- Any credentials will authenticate
- No real token validation
- Data is not persisted

### Production Setup with .NET API
- Implement proper JWT authentication
- Use HTTPS only
- Enable CORS for your domain
- Implement rate limiting
- Validate all inputs
- Sanitize HTML content
- Hash passwords securely
- Use environment variables for secrets

---

## Troubleshooting

### Build Errors
If you encounter build errors, try:
```bash
npm install
npm run build
```

### Admin Panel Not Loading
1. Check that you're accessing `/admin/login`
2. Clear browser localStorage
3. Check browser console for errors

### Mock Data Not Showing
The mock data is hardcoded in the component files. If you don't see it:
1. Check browser console for JavaScript errors
2. Verify the page route is correct
3. Ensure the build was successful

---

## Next Steps

1. **Develop .NET API**: Use the API documentation to build your backend
2. **Test API Endpoints**: Use the provided curl commands
3. **Switch to Real API**: Follow the instructions above
4. **Deploy**: Deploy both frontend and backend
5. **Configure CORS**: Allow your frontend domain in the API
6. **Test Production**: Verify everything works in production

---

## Support

For questions or issues:
1. Check the API documentation
2. Review the code comments
3. Check browser console for errors
4. Verify .NET API is running and accessible
