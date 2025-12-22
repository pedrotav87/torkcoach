# 🚨 Can't Access App Externally? Here's the Fix!

## The Problem
Your app works locally but doesn't load when accessed from an external computer.

## The Solution (5 Steps)

### 1. Add GitHub Secrets 🔑
Your GitHub Actions workflow needs Firebase credentials to build properly.

**Go to:** GitHub Repo → Settings → Secrets and variables → Actions → New repository secret

**Add these 7 secrets:**
```
VITE_FIREBASE_API_KEY = AIzaSyBTPK8YHJSIx0PbsCNlguAcv5QVaIWo9uI
VITE_FIREBASE_AUTH_DOMAIN = tork-cafe5.firebaseapp.com
VITE_FIREBASE_PROJECT_ID = tork-cafe5
VITE_FIREBASE_STORAGE_BUCKET = tork-cafe5.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID = 533257019468
VITE_FIREBASE_APP_ID = 1:533257019468:web:3c42217c9f11537d5714e9
VITE_FIREBASE_MEASUREMENT_ID = G-8FRRRH3MHC
```

### 2. Authorize Your Domain 🔐
**Go to:** [Firebase Console](https://console.firebase.google.com/) → tork-cafe5 project → Authentication → Settings → Authorized domains

**Add:** `coach.tork.pro`

### 3. Check DNS Configuration 🌐
**At your domain registrar:**
- Type: CNAME
- Name: coach  
- Target: [your-github-username].github.io

**Verify:** https://dnschecker.org/ (search for `coach.tork.pro`)

### 4. Enable GitHub Pages 📄
**Go to:** GitHub Repo → Settings → Pages

- Source: GitHub Actions ✅
- Custom domain: `coach.tork.pro` ✅
- Enforce HTTPS: ✅ (after DNS propagates)

### 5. Deploy 🚀
```bash
git add .
git commit -m "Fix external access"
git push origin main
```

Wait 3-5 minutes, then visit: **https://coach.tork.pro**

---

## Still Not Working?

### Check #1: GitHub Actions Build Status
**Go to:** Actions tab in your repo
- Is the latest workflow green ✅?
- If red ❌, click it to see the error logs

### Check #2: DNS Propagation
DNS changes can take 5-60 minutes to propagate worldwide.
- Test at: https://dnschecker.org/
- Try the fallback URL: `https://[your-username].github.io/[repo-name]/`

### Check #3: Browser Console
- Open site in browser
- Press F12 → Console tab
- Look for red error messages
- Common errors:
  - `auth/unauthorized-domain` → Add domain to Firebase (Step 2)
  - Network errors → DNS not propagated yet (wait)
  - Blank screen → Check GitHub Actions logs

---

## Quick Commands

```bash
# Run setup script (automated)
chmod +x setup-external-access.sh
./setup-external-access.sh

# Manual build test
npm run build
npm run preview  # Test production build locally

# Check if site is live
curl -I https://coach.tork.pro
```

---

## Expected Timeline
- Add secrets: **Immediate**
- Authorize domain: **1-2 min**
- DNS propagation: **5-60 min** (if first time)
- GitHub build: **3-5 min**
- HTTPS enabled: **15-30 min**

**Total:** 30-90 minutes for first deployment

---

## Success Checklist ✅
- [ ] All 7 GitHub Secrets added
- [ ] Domain authorized in Firebase
- [ ] DNS CNAME configured
- [ ] GitHub Pages enabled
- [ ] Latest code pushed
- [ ] GitHub Actions build succeeded
- [ ] Site loads at https://coach.tork.pro
- [ ] Can log in with Firebase

---

## 🆘 Help!

If you've done all the steps and it's still not working after 60 minutes:

1. Share the **exact error message** you see
2. Share the **GitHub Actions logs** (Actions tab → failed run)
3. Share the **browser console errors** (F12 → Console)
4. Check if DNS is propagated: https://dnschecker.org/

**Most common issue:** Waiting for DNS propagation (can take up to 60 minutes for the first time)

---

## More Details
See **EXTERNAL_ACCESS_SOLUTION.md** for comprehensive troubleshooting and detailed explanations.
