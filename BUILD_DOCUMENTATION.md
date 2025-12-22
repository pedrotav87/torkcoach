# Production Build Documentation

### Vite Configuration

  base: './',                    // ✅ Rel

    createIco
  ],
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

│   ├── index-[hash].css    

```

```
<html
    <meta charset="UTF-8" />
    <title>
    <!-- Preconnect to Google Fonts -->
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <link rel="stylesheet" crossorigin href="./assets/ind
    <!-- Module preload for performance -->
</h

    <!-- ✅ Relative path to JavaScrip

```
**Key Points:**
- Hash-based fil
- Modu


```
```
- `--noCheck` flag skips type checking 

- **JavaScript**: Minification, tree-shaking, dead code elimination
- **Images**: Compression and optimization

- Creates optimized production bund
- Generates source maps (optional)
### 
- Maintains directory structure for imports
## Bundle Analysis
### Exp
| Asse
| JavaScript | 800KB - 2M
| Im


✅ **Min
✅ **Ass
✅ *

### Standard Bu
npm run build

```bash
```


npm run build



- [ ] `dist/asse
- [
- [ ] Login page is the entry point



```bash
npm run lint
# Or skip type checking (temporary)
```
### Issue: Large bundle size

- Use dynamic imports fo




<img src="/assets/lo
// ✅ Correct - Vite will process and incl
<img src={logo} />





```
Without this, assets would be requested from root (e.
### .nojekyll File (Optional)
If your build includes files starting with `_`, add `
```bash
```

## Deployment Folder Answer

In GitHub Pages settings, select:
- **Branch**: `main` (or your default branch)


1. Run `npm run build`
3. Push to GitHub

1. Use the provided GitHub




VIT

VITE_FIREBASE_MESSAGING_SEND
VITE_FI




2. ✅ Verify login page load
4. ✅ Ch
6. ✅ Verify no console errors
8. ✅ Verify c
## 

- **First Contentful Pain





✅ **Deployment Target**: GitHub Pages  
✅ **Entry Point**: `dist/index.html`  
✅ **Automation**: GitHub Actions workflow p
Your Tork Coach platform is ready f






































































































































