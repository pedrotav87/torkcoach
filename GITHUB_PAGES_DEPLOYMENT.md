# GitHub Pages Deployment Guide for Tork Coach

## Build Configuration Summary

✅ **Vite Build Configured for GitHub Pages**

Your project has been configured with the following settings in `vite.config.ts`:

```typescript
{
  base: './',              // Relative paths for GitHub Pages
  build: {
    outDir: 'dist',        // Output directory
    assetsDir: 'assets',   // Assets subdirectory
    emptyOutDir: true      // Clean before build
  }
}
```

## How to Build for Production

### Step 1: Run the Build Command

```bash
npm run build
```

This command will:
1. Compile TypeScript (with `tsc -b --noCheck`)
2. Bundle all React components
3. Optimize and minify JavaScript
4. Process and bundle CSS (including Tailwind)
5. Copy and optimize assets
6. Generate source maps

### Step 2: Build Output Structure

After running `npm run build`, you'll get a `/dist` folder with this structure:

```
dist/
├── index.html                    # Main entry point (with relative paths)
├── assets/
│   ├── index-[hash].js          # Bundled JavaScript
│   ├── index-[hash].css         # Bundled CSS
│   └── [other-assets]-[hash]    # Images, fonts, etc.
└── [any other static files]
```

### Step 3: Verify the Build

Preview the production build locally:

```bash
npm run preview
```

This will serve the `/dist` folder on `http://localhost:4173` for testing.

## GitHub Pages Configuration

### Option 1: Deploy from Repository Root (Recommended)

1. **Push the `dist` folder to your repository:**
   ```bash
   git add dist
   git commit -m "Add production build for GitHub Pages"
   git push origin main
   ```

2. **Configure GitHub Pages:**
   - Go to your repository on GitHub
   - Navigate to: **Settings** → **Pages**
   - Under "Build and deployment":
     - **Source**: Deploy from a branch
     - **Branch**: `main`
     - **Folder**: `/dist` ← **SELECT THIS**
   - Click **Save**

3. **Wait for deployment** (usually 1-3 minutes)

4. **Access your site:**
   - URL will be: `https://[username].github.io/[repository-name]/`
   - Or your custom domain if configured

### Option 2: Using GitHub Actions (Advanced)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Node
      uses: actions/setup-node@v4
      with:
        node-version: '20'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v4
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## Important Notes for Firebase Authentication

### Environment Variables

Your Firebase config should be in environment variables for security. Create `.env.production`:

```env
VITE_FIREBASE_API_KEY=AIzaSyBTPK8YHJSIx0PbsCNlguAcv5QVaIWo9uI
VITE_FIREBASE_AUTH_DOMAIN=tork-cafe5.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tork-cafe5
VITE_FIREBASE_STORAGE_BUCKET=tork-cafe5.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=533257019468
VITE_FIREBASE_APP_ID=1:533257019468:web:3c42217c9f11537d5714e9
VITE_FIREBASE_MEASUREMENT_ID=G-8FRRRH3MHC
```

**⚠️ Important**: Add `.env.production` to `.gitignore` if it contains sensitive data!

### Firebase Authorized Domains

For Firebase Authentication to work on GitHub Pages:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **tork-cafe5**
3. Go to: **Authentication** → **Settings** → **Authorized domains**
4. Add your GitHub Pages domain:
   - `[username].github.io`
   - Or your custom domain (e.g., `coach.tork.pro`)

## Custom Domain Setup (coach.tork.pro)

If using a custom domain:

1. **Create a `CNAME` file** in `/dist` before building:
   ```
   coach.tork.pro
   ```

2. **Configure DNS:**
   - Add a CNAME record pointing to: `[username].github.io`

3. **Enable HTTPS** in GitHub Pages settings (automatic after DNS propagates)

## Troubleshooting

### Issue: Blank page or 404 errors

**Solution**: Ensure `base: './'` is in `vite.config.ts` (already configured)

### Issue: Firebase auth not working

**Solution**: Add your GitHub Pages domain to Firebase Authorized Domains

### Issue: CSS not loading

**Solution**: Check that all imports in `index.html` use relative paths (Vite handles this automatically)

### Issue: Assets not found

**Solution**: Ensure assets are imported in your code, not referenced as strings:

```typescript
// ✅ Correct
import myImage from '@/assets/images/logo.png'
<img src={myImage} />

// ❌ Wrong
<img src="/assets/images/logo.png" />
```

## Deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] Verify `/dist` folder contains `index.html` and `assets/`
- [ ] Test with `npm run preview`
- [ ] Firebase authorized domains configured
- [ ] Push `/dist` folder to GitHub
- [ ] Configure GitHub Pages to use `/dist` folder
- [ ] Wait for deployment (check Actions tab)
- [ ] Test the live site
- [ ] Verify Firebase authentication works

## Which Folder to Use?

**Answer: `/dist`**

Your Vite build outputs to the `/dist` folder, so select this in GitHub Pages settings.

## Build Performance

Typical build time: **10-30 seconds**

Expected bundle sizes:
- JavaScript: ~500KB - 1.5MB (gzipped)
- CSS: ~50KB - 150KB (gzipped)
- Total: ~600KB - 2MB (varies with images/assets)

## Continuous Deployment

For automatic deployments on every push:
1. Set up the GitHub Actions workflow (see Option 2 above)
2. Every push to `main` will automatically build and deploy
3. No manual `npm run build` needed

---

## Quick Start Commands

```bash
# Install dependencies (if not already installed)
npm install

# Build for production
npm run build

# Preview production build locally
npm run preview

# Deploy (after configuring GitHub Pages)
git add dist
git commit -m "Deploy to GitHub Pages"
git push origin main
```

Your site will be live at: **https://[username].github.io/[repo-name]/**

Or at your custom domain: **https://coach.tork.pro** (if configured)
