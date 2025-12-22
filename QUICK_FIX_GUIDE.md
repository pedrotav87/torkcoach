# 🚀 Quick Fix - Make Your App Accessible Externally

## The Problem
Your app isn't accessible at https://coach.tork.pro because GitHub Actions needs Firebase credentials to build it.

## The Solution (3 Steps - 10 Minutes)

---

## Step 1: Add GitHub Secrets (5 minutes)

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"** and add each of these **7 secrets**:

| Secret Name | Value |
|------------|-------|
| `VITE_FIREBASE_API_KEY` | `AIzaSyBTPK8YHJSIx0PbsCNlguAcv5QVaIWo9uI` |
| `VITE_FIREBASE_AUTH_DOMAIN` | `tork-cafe5.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | `tork-cafe5` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `tork-cafe5.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `533257019468` |
| `VITE_FIREBASE_APP_ID` | `1:533257019468:web:3c42217c9f11537d5714e9` |
| `VITE_FIREBASE_MEASUREMENT_ID` | `G-8FRRRH3MHC` |

**Important:** Names must match EXACTLY (case-sensitive, including `VITE_` prefix)

---

## Step 2: Configure Firebase (2 minutes)

1. Go to https://console.firebase.google.com/
2. Select project: **tork-cafe5**
3. Click **Authentication** → **Settings** → **Authorized domains**
4. Click **Add domain** and add: `coach.tork.pro`
5. Also add: `[your-github-username].github.io` (backup)

---

## Step 3: Deploy (3 minutes)

### Push to trigger deployment:
```bash
git add .
git commit -m "Configure external access"
git push origin main
```

### Wait for deployment:
1. Go to your repository's **Actions** tab
2. Watch the "Deploy to GitHub Pages" workflow
3. Wait for green checkmark ✓ (2-5 minutes)

### Test your site:
Visit https://coach.tork.pro - it should load!

---

## Verification Checklist

After deployment completes:

- [ ] Site loads at https://coach.tork.pro
- [ ] Firebase login works
- [ ] No errors in browser console (press F12)
- [ ] HTTPS is enabled (padlock icon)

---

## Still Not Working?

### If GitHub Actions build fails:
- Verify all 7 secrets are added correctly
- Check secret names match exactly
- Re-run the workflow

### If site shows "Firebase: Error (auth/unauthorized-domain)":
- Add `coach.tork.pro` to Firebase Authorized domains

### If site can't be reached:
- Check DNS configuration at your domain registrar
- CNAME record: `coach` → `[your-github-username].github.io`
- Wait 30-60 minutes for DNS propagation

### If site loads but login doesn't work:
- Ensure Firebase Authorized domains includes your domain
- Check browser console for specific Firebase errors

---

## Need More Help?

See these detailed guides:
- `COMPLETE_CHECKLIST.md` - Full step-by-step checklist
- `GITHUB_SECRETS_SETUP.md` - Detailed secrets guide
- `EXTERNAL_ACCESS_FIX.md` - Comprehensive troubleshooting

---

## What Happens Next?

Once working:
- ✅ Your app is live at https://coach.tork.pro
- ✅ Every push to `main` automatically deploys
- ✅ Changes go live in 2-5 minutes
- ✅ Accessible from anywhere

---

**Time to Complete:** 10 minutes of work + 5 minutes deployment wait

**Start with Step 1** → Add those 7 GitHub Secrets now! 🚀
