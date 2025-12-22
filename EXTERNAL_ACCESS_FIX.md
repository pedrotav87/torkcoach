# Fix External Access to Your App 🚀

## The Problem

Your app cannot be accessed externally because:
1. **GitHub Secrets are missing** - The GitHub Actions workflow needs Firebase credentials
2. **CNAME file location** - The custom domain file needs to be in the right place
3. **Firebase Authorized Domains** - Your domain needs to be whitelisted in Firebase

## Solution: 3 Steps to Fix

---

## Step 1: Add GitHub Repository Secrets

Your GitHub Actions workflow needs Firebase credentials to build properly. Add these secrets:

### How to Add Secrets:

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** for each of these:

| Secret Name | Value |
|------------|-------|
| `VITE_FIREBASE_API_KEY` | `AIzaSyBTPK8YHJSIx0PbsCNlguAcv5QVaIWo9uI` |
| `VITE_FIREBASE_AUTH_DOMAIN` | `tork-cafe5.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | `tork-cafe5` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `tork-cafe5.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `533257019468` |
| `VITE_FIREBASE_APP_ID` | `1:533257019468:web:3c42217c9f11537d5714e9` |
| `VITE_FIREBASE_MEASUREMENT_ID` | `G-8FRRRH3MHC` |

**Important:** These are PUBLIC API keys (safe to expose), but using secrets is best practice.

---

## Step 2: Configure CNAME for Custom Domain

Your custom domain `coach.tork.pro` needs a CNAME file in the build output.

### Option A: Copy CNAME to dist (Quick Fix)

The CNAME file already exists in your root directory. It needs to be copied to `/dist` during build.

Update your `vite.config.ts`:

```typescript
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, PluginOption } from "vite";
import sparkPlugin from "@github/spark/spark-vite-plugin";
import createIconImportProxy from "@github/spark/vitePhosphorIconProxyPlugin";
import { resolve } from 'path';
import { copyFileSync } from 'fs';

const projectRoot = process.env.PROJECT_ROOT || import.meta.dirname

export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    createIconImportProxy() as PluginOption,
    sparkPlugin() as PluginOption,
    {
      name: 'copy-cname',
      closeBundle() {
        try {
          copyFileSync('CNAME', 'dist/CNAME');
        } catch (error) {
          console.warn('CNAME copy skipped:', error);
        }
      }
    }
  ],
  resolve: {
    alias: {
      '@': resolve(projectRoot, 'src')
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      }
    }
  }
});
```

### Option B: Put CNAME in public/ folder (Recommended)

Create a `public` folder and move CNAME there. Vite automatically copies everything in `public/` to `dist/`.

```bash
mkdir -p public
cp CNAME public/CNAME
```

Then Vite will handle it automatically - **no config changes needed**.

---

## Step 3: Configure Firebase Authorized Domains

For Firebase Authentication to work on your custom domain:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: **tork-cafe5**
3. Navigate to: **Authentication** → **Settings** → **Authorized domains**
4. Click **Add domain** and add:
   - `coach.tork.pro`
   - `[your-github-username].github.io` (as backup)

---

## Step 4: Configure DNS (If Not Done Already)

Make sure your domain DNS is configured:

1. Go to your domain registrar (where you bought `tork.pro`)
2. Add a CNAME record:
   - **Name/Host**: `coach`
   - **Value/Points to**: `[your-github-username].github.io`
   - **TTL**: 3600 (or automatic)

---

## Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Build and deployment":
   - **Source**: GitHub Actions (should already be selected)
4. Under "Custom domain":
   - Enter: `coach.tork.pro`
   - Click **Save**
   - Wait for DNS check (green checkmark)
5. Enable **Enforce HTTPS** (after DNS propagates)

---

## Step 6: Trigger Deployment

After completing steps 1-5, trigger a new deployment:

### Option A: Commit and Push

```bash
git add .
git commit -m "Fix external access configuration"
git push origin main
```

### Option B: Manual Trigger

1. Go to your repository on GitHub
2. Click **Actions** tab
3. Select "Deploy to GitHub Pages" workflow
4. Click **Run workflow** → **Run workflow**

---

## Verification Checklist

After deployment completes (2-5 minutes):

- [ ] GitHub Actions workflow completed successfully (check Actions tab)
- [ ] Visit `https://coach.tork.pro` - site loads
- [ ] Firebase Authentication works (try logging in)
- [ ] No console errors in browser DevTools
- [ ] HTTPS enabled (padlock icon in browser)

---

## Troubleshooting

### "Site can't be reached" or DNS error

**Cause:** DNS not configured or not propagated yet

**Solution:** 
- Verify DNS CNAME record is correct
- Wait 5-60 minutes for DNS propagation
- Try visiting `https://[your-github-username].github.io/[repo-name]/` directly

### "Firebase: Error (auth/unauthorized-domain)"

**Cause:** Domain not authorized in Firebase

**Solution:**
- Go to Firebase Console → Authentication → Settings → Authorized domains
- Add `coach.tork.pro`

### GitHub Actions build fails

**Cause:** Missing repository secrets

**Solution:**
- Verify all 7 secrets are added to GitHub repository
- Check spelling of secret names (must be exact)
- Re-run workflow after adding secrets

### CNAME file not in deployment

**Cause:** CNAME not copied to dist folder

**Solution:**
- Use Option B (move CNAME to `public/` folder) - easiest
- Or use Option A (update vite.config.ts with copy plugin)

### 404 error on page refresh

**Cause:** GitHub Pages doesn't support client-side routing by default

**Solution:** This app uses hash routing or you need a 404.html fallback. Check if routes work with the `./` base path.

---

## Quick Fix Script

Run this to fix the most common issues:

```bash
# Create public folder and move CNAME
mkdir -p public
cp CNAME public/CNAME

# Commit and push
git add .
git commit -m "Move CNAME to public folder for deployment"
git push origin main
```

Then add the 7 GitHub Secrets (Step 1) and you're done!

---

## Expected Timeline

- **GitHub Secrets added:** Immediate
- **Code pushed:** Immediate
- **GitHub Actions build:** 2-5 minutes
- **DNS propagation:** 5-60 minutes (if new domain)
- **HTTPS certificate:** 15-30 minutes after DNS

**Total time to live site:** ~30-60 minutes (if DNS already configured)

---

## What URL Will Work?

After successful deployment, your app will be accessible at:

✅ **https://coach.tork.pro** (custom domain - preferred)
✅ **https://[your-github-username].github.io/[repo-name]/** (GitHub Pages default)

Both will work, but the custom domain is the canonical URL.

---

## Still Not Working?

If you've completed all steps and it's still not accessible:

1. **Check GitHub Actions logs:**
   - Go to Actions tab in your repo
   - Click the latest workflow run
   - Check for error messages

2. **Check browser console:**
   - Open site in browser
   - Press F12
   - Look for errors in Console tab

3. **Verify environment:**
   - Check that `.env` file exists locally (for local dev)
   - Check that GitHub Secrets are set (for production)
   - Check that Firebase project is active

4. **DNS verification:**
   - Use https://dnschecker.org/
   - Enter `coach.tork.pro`
   - Verify CNAME points to GitHub Pages

---

## Summary

**Most Common Issue:** Missing GitHub Secrets

**Quick Fix:**
1. Add 7 GitHub Secrets (Step 1)
2. Move CNAME to `public/` folder
3. Push to GitHub
4. Wait for deployment

Your app should be live at **https://coach.tork.pro** within 30-60 minutes!
