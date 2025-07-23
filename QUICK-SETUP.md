# Quick Setup Guide for Golf Shot Tracker

## Problem: Website Not Opening
The website isn't opening because Node.js and npm are not installed on your system.

## Solution: Install Node.js

### Step 1: Download Node.js
1. Go to https://nodejs.org/
2. Download the "LTS" version (recommended for most users)
3. Run the installer (.msi file)
4. Follow the installation wizard (keep all default settings)
5. **Important**: Restart your computer after installation

### Step 2: Verify Installation
Open a new PowerShell window and run:
```
node --version
npm --version
```
You should see version numbers for both.

### Step 3: Install Project Dependencies
Navigate to your project folder and run:
```
cd "c:\Users\rsrireddy\OneDrive - Microsoft\Desktop\golf tracker"
npm install
```

### Step 4: Start the Development Server
```
npm run dev
```

### Step 5: Open the Website
Open your browser and go to: http://localhost:5173

## Alternative: Use the Deployed Version
If you've already pushed to GitHub, you can access the deployed version at:
- GitHub Pages: https://yourusername.github.io/golf-tracker
- Or deploy to Netlify/Vercel for instant hosting

## Troubleshooting
- If npm commands don't work, restart PowerShell or your computer
- Make sure you're in the correct project directory
- Check that Node.js is properly added to your system PATH

## Features Available
✅ Real-time camera integration
✅ Golf swing pose detection
✅ Swing speed and path analysis
✅ Ball speed estimation
✅ Performance scoring
✅ Beautiful modern UI with glassmorphism design
✅ Mobile responsive design
✅ Demo mode for testing without camera
