# SPA Routing Configuration Guide

This guide explains how to fix the 404 error when accessing routes like `/admin/login` directly or refreshing the page.

## Problem

Single Page Applications (SPAs) like React use client-side routing. When you access `/admin/login` directly or refresh the page, the server tries to find a physical file at that path, resulting in a 404 error.

## Solution

Configure your server to redirect all requests to `index.html`, allowing React Router to handle the routing.

---

## Option 1: Using Express Backend (Recommended for your setup)

The `server/server.js` has been updated to serve static files and handle SPA routing in production.

### Deployment Steps:

1. **Build your frontend:**
   ```bash
   npm run build
   ```

2. **Set NODE_ENV to production:**
   ```bash
   export NODE_ENV=production
   ```

3. **Start the server:**
   ```bash
   cd server
   node server.js
   ```

4. **Access your app:**
   - Frontend: `http://your-server:5000`
   - Admin: `http://your-server:5000/admin/login`
   - API: `http://your-server:5000/api/*`

---

## Option 2: Using Nginx

If you're using Nginx, use the provided `nginx.conf` file:

1. **Copy the configuration:**
   ```bash
   sudo cp nginx.conf /etc/nginx/sites-available/your-site
   ```

2. **Update the configuration:**
   - Replace `your-domain.com` with your actual domain
   - Replace `/path/to/your/dist` with the actual path to your dist folder

3. **Enable the site:**
   ```bash
   sudo ln -s /etc/nginx/sites-available/your-site /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

### Key Configuration:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

---

## Option 3: Using Apache

If you're using Apache, the `.htaccess` file has been created in the `dist` folder.

1. **Ensure mod_rewrite is enabled:**
   ```bash
   sudo a2enmod rewrite
   sudo systemctl restart apache2
   ```

2. **The `.htaccess` file will be automatically copied to dist when you build**

3. **Ensure AllowOverride is set:**
   In your Apache config:
   ```apache
   <Directory /var/www/html>
       AllowOverride All
   </Directory>
   ```

---

## Option 4: Using Vercel

If deploying to Vercel, the `vercel.json` file has been created.

1. **Deploy to Vercel:**
   ```bash
   vercel deploy
   ```

The `vercel.json` configuration will automatically handle SPA routing.

---

## Option 5: Using the `serve` package

If you're using the `serve` package (as in package.json), the `-s` flag already handles SPA routing:

```bash
npm run start
```

This runs: `serve -s dist -l 2169`

The `-s` flag enables SPA mode, which serves `index.html` for all routes.

---

## Testing

After applying any of the above solutions, test the following:

1. **Direct access:** Navigate to `http://your-server/admin/login` directly
2. **Refresh:** Go to the admin page and refresh the browser
3. **API routes:** Ensure API calls to `/api/*` still work correctly

---

## Current Setup

Your project structure:
- **Backend:** Express server in `server/` folder (port 5000)
- **Frontend:** React app built to `dist/` folder (port 2169 in dev)

### Recommended Production Setup:

Use **Option 1** (Express serving both frontend and backend):
- Single server process
- Single port (5000)
- API routes at `/api/*`
- Frontend routes handled by React Router
- Simpler deployment

---

## Environment Variables

Make sure to set:
```bash
NODE_ENV=production
FRONTEND_URL=http://your-production-domain.com
```

---

## Additional Notes

- The Express server now serves static files only in production mode
- API routes always use the `/api/*` prefix
- All non-API routes return `index.html` in production
- In development, continue using `npm run dev` for the frontend
