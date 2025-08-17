# Deployment Checklist ✅

## Before Deploying
- [ ] Code is committed and pushed to Git repository
- [ ] All tests pass (`npm test`)
- [ ] Build is successful (`npm run build`)
- [ ] `dist/crowdfund/browser` folder contains build files

## Netlify Deployment
- [ ] Go to [netlify.com](https://netlify.com)
- [ ] Sign in to your account
- [ ] Choose deployment method:
  - [ ] **Quick**: Drag & drop `dist/crowdfund/browser` folder
  - [ ] **Git**: Connect repository and set build settings

## Build Settings (if using Git integration)
- [ ] Build command: `npm run build`
- [ ] Publish directory: `dist/crowdfund/browser`
- [ ] Node version: 18 (auto-detected)

## Post-Deployment
- [ ] Test all routes work correctly
- [ ] Verify assets load properly
- [ ] Check mobile responsiveness
- [ ] Set up custom domain (optional)
- [ ] Configure environment variables (if needed)

## Files Created for Deployment
- `netlify.toml` - Netlify configuration
- `NETLIFY_DEPLOYMENT.md` - Detailed deployment guide
- `deploy.bat` - Windows deployment script
- `deploy.sh` - Linux/Mac deployment script

Your Angular app is now ready for Netlify deployment! 🚀
