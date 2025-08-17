# Netlify Deployment Guide for Crowdfund Angular App

## Prerequisites
- Node.js 18+ installed
- Git repository set up
- Netlify account

## Quick Deployment Steps

### 1. Build Your Project
```bash
npm run build
```
This creates the `dist/crowdfund/browser` folder with your production build.

### 2. Deploy to Netlify

#### Option A: Drag & Drop (Quick)
1. Go to [netlify.com](https://netlify.com) and sign in
2. Drag and drop the `dist/crowdfund/browser` folder to the Netlify dashboard
3. Your site will be deployed instantly with a random URL

#### Option B: Git Integration (Recommended)
1. Push your code to GitHub/GitLab/Bitbucket
2. In Netlify dashboard, click "New site from Git"
3. Connect your repository
4. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `dist/crowdfund/browser`
5. Deploy!

## Configuration Files

### netlify.toml
- Specifies build settings and redirects
- Handles Angular routing (SPA fallback)
- Sets security headers
- **Base directory**: `.` (root of repository)

### _redirects file
- Backup method for Angular routing support
- Automatically included in build output
- Ensures SPA routing works correctly

### Build Output
- **Publish directory**: `dist/crowdfund/browser`
- **Build command**: `npm run build`

## Important Notes

### Angular Routing
The `netlify.toml` includes a redirect rule that handles Angular's client-side routing:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Environment Variables
If you need environment-specific configuration, add them in Netlify's dashboard under:
Site settings → Environment variables

### Custom Domain
After deployment, you can add a custom domain in Netlify's dashboard.

## Troubleshooting

### Build Issues
- Ensure Node.js 18+ is installed
- Run `npm install` before building
- Check for any TypeScript compilation errors

### Routing Issues
- Verify the redirect rule in `netlify.toml` is correct
- Ensure all routes work in the built application

### Performance
- The build includes code splitting for better performance
- Assets are optimized and compressed

## Support
For Netlify-specific issues, check their [documentation](https://docs.netlify.com/) or [community forum](https://community.netlify.com/).
