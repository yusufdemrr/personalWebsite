# GitHub Pages Deployment Guide

## Setup Instructions

To deploy this Next.js website to GitHub Pages, follow these steps:

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select:
   - Source: **GitHub Actions**
   
   ![GitHub Pages Settings](https://docs.github.com/assets/cb-47267/mw-1440/images/help/pages/publishing-source-drop-down.webp)

### 2. Push Your Changes

The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically:
- Build your Next.js app
- Export it as static files
- Deploy to GitHub Pages

Every time you push to the `master` branch, your site will be automatically updated.

### 3. Access Your Site

After the first deployment, your site will be available at:
- `https://<username>.github.io/<repository-name>/`
- Or your custom domain if configured

### 4. Custom Domain (Optional)

To use a custom domain:

1. Go to **Settings** → **Pages**
2. Under **Custom domain**, enter your domain (e.g., `yusufdemir.com`)
3. Add a `CNAME` file to the `public/` directory with your domain name
4. Configure DNS settings with your domain provider:
   - Add a `CNAME` record pointing to `<username>.github.io`

## Troubleshooting

### Site shows README instead of the website

**Solution**: Make sure you selected **GitHub Actions** as the source, not **Deploy from a branch**.

### 404 errors on page refresh

This is expected with client-side routing. GitHub Pages doesn't support it natively. The current setup uses static export which should work correctly.

### Images not loading

Make sure `images.unoptimized: true` is set in `next.config.ts` for static export.

## Local Testing

To test the production build locally:

```bash
npm run build
npx serve out
```

Then visit `http://localhost:3000`
