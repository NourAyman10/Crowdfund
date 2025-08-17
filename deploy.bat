@echo off
echo Building Angular project for production...
call npm run build

echo.
echo Build completed! The dist/crowdfund folder is ready for deployment.
echo.
echo Next steps:
echo 1. Push your code to GitHub/GitLab/Bitbucket
echo 2. Connect your repository to Netlify
echo 3. Deploy automatically or manually upload the dist/crowdfund folder
pause
