# 🚀 Quick Deploy Guide - Tork Coach to GitHub Pages

## ⚡ Fast Track (3 Steps)

### Step 1: Build
```bash
npm run build
```
**Output**: `/dist` folder with all production files

### Step 2: Push
```bash
git add .
git commit -m "Production build for GitHub Pages"
git push origin main
```

### Step 3: Configure GitHub Pages
1. Go to: **Repository → Settings → Pages**
2. Set **Source** to: Deploy from a branch
3. Set **Branch** to: `main`
4. Set **Folder** to: `/dist` ⭐
5. Click **Save**

**Done!** Your site will be live in 2-3 minutes.

---

## 📋 What Gets Built

```
dist/
├── index.html                     # Entry point (relative paths ✅)
└── assets/
    ├── index-[hash].js           # Bundled app (~500KB gzipped)
    └── index-[hash].css          # Styles (~50KB gzipped)
```

---

## 🔥 Firebase Configuration Required

### Add to Firebase Console
1. Go to: [Firebase Console](https://console.firebase.google.com/)
2. Select: **tork-cafe5** project
3. Navigate to: **Authentication → Settings → Authorized domains**
4. Add your domain:
   - `[username].github.io` (for GitHub Pages)
   - `coach.tork.pro` (if using custom domain)

### GitHub Secrets (for automated deployment)
Add these in **Repository → Settings → Secrets**:

```
VITE_FIREBASE_API_KEY=AIzaSyBTPK8YHJSIx0PbsCNlguAcv5QVaIWo9uI
VITE_FIREBASE_AUTH_DOMAIN=tork-cafe5.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tork-cafe5
VITE_FIREBASE_STORAGE_BUCKET=tork-cafe5.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=533257019468
VITE_FIREBASE_APP_ID=1:533257019468:web:3c42217c9f11537d5714e9
VITE_FIREBASE_MEASUREMENT_ID=G-8FRRRH3MHC
```

---

## 🤖 Automated Deployment (Optional)

If you use the included GitHub Actions workflow:

1. **One-time setup**: Add Firebase secrets to GitHub (see above)
2. **Deploy**: Just push to `main` branch
3. **Automatic**: Builds and deploys automatically
4. **No manual build needed**: GitHub does it for you

---

## ✅ Verification Checklist

After deployment:

- [ ] Site loads at your GitHub Pages URL
- [ ] Login page appears first
- [ ] Firebase authentication works
- [ ] Dashboard loads after login
- [ ] Navigation menu works
- [ ] No console errors
- [ ] Mobile layout works

---

## 🎯 Quick Answers

**Q: Which folder for GitHub Pages?**  
A: **`/dist`**

**Q: What's the build command?**  
A: `npm run build`

**Q: How to test locally?**  
A: `npm run preview` (serves on port 4173)

**Q: How long until live?**  
A: 1-3 minutes after pushing

**Q: Need to rebuild after changes?**  
A: Yes, run `npm run build` again

**Q: What if CSS doesn't load?**  
A: Already fixed - using relative paths (`base: './'`)

---

## 🔗 Your URLs

**GitHub Pages**: `https://[username].github.io/[repo-name]/`  
**Custom Domain**: `https://coach.tork.pro` (if configured)

---

## 📞 Troubleshooting

### Blank page?
- Check browser console for errors
- Verify Firebase authorized domains
- Try `npm run preview` locally first

### Authentication not working?
- Add your domain to Firebase authorized domains
- Check Firebase secrets are set correctly

### 404 on refresh?
- Expected behavior on GitHub Pages with client-side routing
- Users should bookmark the root URL

---

## 🎉 You're Done!

Your Tork Coach platform is now live and accessible to anyone with the URL. No GitHub login required for users - they'll use Firebase authentication instead.

For detailed documentation, see:
- `GITHUB_PAGES_DEPLOYMENT.md` - Full deployment guide
- `BUILD_DOCUMENTATION.md` - Build process details
