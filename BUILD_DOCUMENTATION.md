# Production Build Documentation

## Build Configuration

### Vite Configuration (`vite.config.ts`)

```typescript
export default defineConfig({
  base: './',                    // ✅ Relative paths for GitHub Pages
  plugins: [
    react(),                     // React + SWC for fast builds
    tailwindcss(),               // Tailwind CSS processing
    createIconImportProxy(),     // Phosphor icons optimization
    sparkPlugin(),               // Spark runtime integration
  ],
  resolve: {
    alias: {
      '@': resolve(projectRoot, 'src')  // Path aliasing
    }
  },
  build: {
    outDir: 'dist',              // ✅ Output directory
    assetsDir: 'assets',         // ✅ Assets subdirectory
    emptyOutDir: true,           // Clean before build
    rollupOptions: {
      output: {
        manualChunks: undefined  // Single bundle for simplicity
      }
    }
  }
})
```

## Expected Output Structure

### Directory Tree

```
dist/
├── index.html                          # Entry point (relative paths)
├── assets/
│   ├── index-[hash].js                # Main JavaScript bundle
│   ├── index-[hash].css               # Compiled CSS (Tailwind + custom)
│   ├── [component-chunk]-[hash].js    # Code-split chunks (if any)
│   └── [images/fonts]-[hash].[ext]    # Optimized assets
└── .nojekyll (optional)               # Bypass Jekyll on GitHub Pages
```

### index.html Structure (Post-Build)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tork Coach - Bodybuilding CRM Platform</title>
    
    <!-- Preconnect to Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    
    <!-- ✅ Relative path to CSS -->
    <link rel="stylesheet" crossorigin href="./assets/index-[hash].css">
    
    <!-- Module preload for performance -->
    <link rel="modulepreload" crossorigin href="./assets/index-[hash].js">
</head>
<body>
    <div id="root"></div>
    
    <!-- ✅ Relative path to JavaScript -->
    <script type="module" crossorigin src="./assets/index-[hash].js"></script>
</body>
</html>
```

**Key Points:**
- All paths use `./` prefix (relative)
- Hash-based filenames for cache busting
- Crossorigin attributes for CORS
- Module preload for faster loading
- External fonts from Google CDN

## Build Process Steps

### 1. TypeScript Compilation
```
tsc -b --noCheck
```
- Compiles TypeScript to JavaScript
- `--noCheck` flag skips type checking (faster builds)
- Type checking done separately during development

### 2. Asset Processing
- **JavaScript**: Minification, tree-shaking, dead code elimination
- **CSS**: PostCSS processing, Tailwind optimization, minification
- **Images**: Compression and optimization
- **Fonts**: Subsetting and optimization (if local fonts used)

### 3. Bundle Generation
- Creates optimized production bundles
- Adds content hashes for cache invalidation
- Generates source maps (optional)

### 4. Asset Copying
- Copies static assets to `/dist/assets/`
- Maintains directory structure for imports

## Bundle Analysis

### Expected Bundle Sizes (Production)

| Asset Type | Size (Uncompressed) | Size (Gzipped) |
|------------|---------------------|----------------|
| JavaScript | 800KB - 2MB         | 250KB - 500KB  |
| CSS        | 100KB - 200KB       | 20KB - 50KB    |
| Images     | Varies              | N/A            |
| **Total**  | ~1MB - 2.5MB        | ~300KB - 600KB |

### Performance Optimizations Applied

✅ **Tree Shaking** - Remove unused code  
✅ **Minification** - Compress JavaScript and CSS  
✅ **Code Splitting** - Split large bundles (if needed)  
✅ **Asset Hashing** - Cache invalidation on updates  
✅ **Compression** - Gzip/Brotli for smaller transfers  
✅ **SWC Compiler** - Faster builds than Babel  

## Build Command Reference

### Standard Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```
Serves `/dist` on `http://localhost:4173`

### Clean Build (if needed)
```bash
rm -rf dist node_modules/.vite
npm run build
```

## Verification Checklist

Before deploying, verify:

- [ ] `dist/index.html` exists
- [ ] `dist/assets/` contains JS and CSS files
- [ ] All paths in `index.html` are relative (`./`)
- [ ] No console errors when running `npm run preview`
- [ ] Firebase authentication works locally
- [ ] Login page is the entry point
- [ ] All routes redirect to login if not authenticated

## Common Build Issues

### Issue: Build fails with TypeScript errors

**Solution:**
```bash
# Fix TypeScript errors first
npm run lint

# Or skip type checking (temporary)
# Already configured with --noCheck flag
```

### Issue: Large bundle size

**Solution:**
- Check for accidentally imported large libraries
- Use dynamic imports for heavy components
- Analyze bundle with: `npm run build -- --mode analyze`

### Issue: Missing assets in production

**Cause:** Assets referenced as strings instead of imports

**Fix:**
```typescript
// ❌ Wrong - won't be included in build
<img src="/assets/logo.png" />

// ✅ Correct - Vite will process and include
import logo from '@/assets/images/logo.png'
<img src={logo} />
```

### Issue: Firebase config missing in production

**Solution:** Add environment variables to GitHub Secrets or build environment

## GitHub Pages Specific Configuration

### Base Path
```typescript
base: './'  // ✅ Enables relative paths
```

Without this, assets would be requested from root (e.g., `/assets/...`) which fails on GitHub Pages subpaths.

### .nojekyll File (Optional)

If your build includes files starting with `_`, add `.nojekyll` to `/dist`:

```bash
echo "" > dist/.nojekyll
```

GitHub Pages uses Jekyll by default, which ignores underscore-prefixed files.

## Deployment Folder Answer

### 📂 **Use the `/dist` folder**

In GitHub Pages settings, select:
- **Source**: Deploy from a branch
- **Branch**: `main` (or your default branch)
- **Folder**: `/dist` ← **SELECT THIS**

## Automated vs Manual Deployment

### Manual Deployment (Simple)
1. Run `npm run build`
2. Commit `/dist` folder
3. Push to GitHub
4. Configure Pages to use `/dist`

### Automated Deployment (Recommended)
1. Use the provided GitHub Actions workflow
2. Set up Firebase secrets in repository settings
3. Push code (workflow auto-builds and deploys)
4. No need to commit `/dist` folder

## Production Environment Variables

Required Firebase secrets for GitHub Actions:

```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_MEASUREMENT_ID
```

Add these in: **Repository Settings** → **Secrets and variables** → **Actions**

## Post-Deployment Testing

After deployment:

1. ✅ Visit your GitHub Pages URL
2. ✅ Verify login page loads
3. ✅ Test Firebase authentication
4. ✅ Check all navigation links
5. ✅ Test on mobile devices
6. ✅ Verify no console errors
7. ✅ Test client dashboard features
8. ✅ Verify coach profile loads

## Performance Metrics to Check

Once deployed, verify performance:

- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.5s
- **Total Blocking Time (TBT)**: < 200ms

Use: [PageSpeed Insights](https://pagespeed.web.dev/) or [WebPageTest](https://www.webpagetest.org/)

---

## Summary

✅ **Build Output**: `/dist` folder  
✅ **Deployment Target**: GitHub Pages  
✅ **Configuration**: Relative paths enabled  
✅ **Entry Point**: `dist/index.html`  
✅ **Assets**: `dist/assets/` directory  
✅ **Automation**: GitHub Actions workflow provided  

Your Tork Coach platform is ready for production deployment! 🎉
