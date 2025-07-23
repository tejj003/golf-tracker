# 🚀 Deployment Guide - Golf Shot Tracker

This guide will help you deploy your golf shot tracking website to popular hosting platforms. Choose the option that works best for you!

## 📋 Prerequisites

1. **Git installed** on your computer
2. **GitHub account** (free)
3. **Project built successfully** locally

## 🔧 Setup Git Repository

### 1. Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit: Golf shot tracker with computer vision"
```

### 2. Create GitHub Repository
1. Go to [GitHub.com](https://github.com)
2. Click **"New repository"**
3. Name it `golf-shot-tracker`
4. Make it **Public** (required for free GitHub Pages)
5. **Don't** initialize with README (we already have one)
6. Click **"Create repository"**

### 3. Connect Local to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/golf-shot-tracker.git
git branch -M main
git push -u origin main
```

---

## 🌐 Hosting Options

### Option 1: GitHub Pages (FREE) ⭐ Recommended

**Automatic deployment with GitHub Actions**

1. **Push your code** to GitHub (steps above)
2. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll to "Pages" section
   - Source: "GitHub Actions"
3. **The workflow will automatically deploy** when you push to main
4. **Your site will be available** at: `https://YOUR_USERNAME.github.io/golf-shot-tracker/`

**Manual deployment:**
```bash
npm install -g gh-pages
npm run deploy:gh-pages
```

### Option 2: Netlify (FREE) 🚀

**Automatic deployment:**
1. Go to [Netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click "New site from Git"
4. Choose your `golf-shot-tracker` repository
5. Netlify will auto-detect the settings
6. Click "Deploy site"

**Manual deployment:**
```bash
npm install -g netlify-cli
netlify login
npm run build
netlify deploy --prod --dir=dist
```

### Option 3: Vercel (FREE) ⚡

**Automatic deployment:**
1. Go to [Vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your `golf-shot-tracker` repository
5. Vercel will auto-configure everything
6. Click "Deploy"

**Manual deployment:**
```bash
npm install -g vercel
vercel login
npm run build
vercel --prod
```

### Option 4: Firebase Hosting (FREE)

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Choose "dist" as public directory
# Configure as single-page app: Yes
npm run build
firebase deploy
```

---

## 🔧 Configuration Files Included

I've created configuration files for all major platforms:

- **`.github/workflows/deploy.yml`** - GitHub Actions for automatic deployment
- **`netlify.toml`** - Netlify configuration
- **`vercel.json`** - Vercel configuration
- **`.gitignore`** - Git ignore rules
- **Updated `package.json`** - Deployment scripts

---

## 📱 Important Notes

### Camera Permissions
Your website needs **HTTPS** to access the camera. All the hosting platforms above provide HTTPS automatically.

### MediaPipe Models
The app loads MediaPipe models from CDN, so internet connection is required for pose detection.

### Performance
For best performance, consider:
- Using Chrome browser
- Good lighting conditions
- Stable camera position

---

## 🚀 Quick Deployment Commands

Choose your preferred platform:

### GitHub Pages
```bash
git add .
git commit -m "Deploy golf tracker"
git push origin main
# Automatic deployment via GitHub Actions
```

### Netlify
```bash
npm run build
npx netlify deploy --prod --dir=dist
```

### Vercel
```bash
npm run build
npx vercel --prod
```

---

## 🔄 Updating Your Deployed Site

After making changes:

```bash
git add .
git commit -m "Update golf tracker features"
git push origin main
```

The site will automatically redeploy on:
- **GitHub Pages** (via GitHub Actions)
- **Netlify** (if connected to GitHub)
- **Vercel** (if connected to GitHub)

---

## 🎯 Custom Domain (Optional)

All platforms support custom domains:

1. **Buy a domain** (e.g., `mygolftracker.com`)
2. **Add custom domain** in your hosting platform settings
3. **Update DNS** records as instructed
4. **Enable HTTPS** (usually automatic)

---

## 🐛 Troubleshooting

### Build Fails
```bash
npm install
npm run build
# Fix any TypeScript errors before deploying
```

### Camera Not Working
- Ensure site is served over HTTPS
- Check browser permissions
- Try different browsers

### MediaPipe Loading Issues
- Check internet connection
- Verify CDN links are accessible
- Clear browser cache

---

## 📊 Analytics (Optional)

Add Google Analytics to track usage:

1. Create Google Analytics account
2. Add tracking code to `index.html`
3. Redeploy your site

---

**Your golf shot tracker will be live and accessible to anyone with the URL! 🏌️⚡**

Share it with fellow golfers and start analyzing swings with AI-powered computer vision!
