# 🚀 External Access Fix - Complete Checklist

## Current Status: App Cannot Be Accessed Externally

This checklist will guide you through making your Tork Coach app accessible at **https://coach.tork.pro**

---

## ✅ Already Completed

The following are already configured in your project:

- ✅ Firebase configured with correct credentials
- ✅ `.env` file exists with all Firebase variables
- ✅ GitHub Actions workflow created (`.github/workflows/deploy.yml`)
- ✅ CNAME file exists (`coach.tork.pro`)
- ✅ Vite config updated to copy CNAME to dist folder
- ✅ Firebase library installed and initialized
- ✅ Authentication system implemented

---

## 🔧 What You Need to Fix

### Issue #1: GitHub Secrets Missing ⚠️ **MOST CRITICAL**

**Problem:** GitHub Actions cannot build your app because Firebase credentials are not available during deployment.

**Solution:** Add 7 GitHub Repository Secrets

**Steps:**
1. Read `GITHUB_SECRETS_SETUP.md` for detailed instructions
2. Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions**
3. Add these 7 secrets:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_FIREBASE_MEASUREMENT_ID`

**Time Required:** 5 minutes

**Verification:** All 7 secrets should appear in your repository's Actions secrets list

---

### Issue #2: Firebase Authorized Domains ⚠️ **CRITICAL**

**Problem:** Even if your site deploys, Firebase Authentication will fail with "unauthorized domain" error.

**Solution:** Add your domain to Firebase

**Steps:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: **tork-cafe5**
3. Click **Authentication** in left sidebar
4. Click **Settings** tab
5. Scroll to **Authorized domains**
6. Click **Add domain**
7. Add: `coach.tork.pro`
8. Also add (as backup): `[your-github-username].github.io`

**Time Required:** 2 minutes

**Verification:** Your domain should appear in the authorized domains list

---

### Issue #3: DNS Configuration ℹ️ **MAY ALREADY BE DONE**

**Problem:** Domain not pointing to GitHub Pages

**Check First:** Visit https://coach.tork.pro - if you see a GitHub 404 page, DNS is configured. If you see "site can't be reached", DNS needs setup.

**Solution:** Configure DNS at your domain registrar

**Steps:**
1. Log into your domain registrar (where you bought tork.pro)
2. Find DNS settings
3. Add/Update CNAME record:
   - **Name/Host:** `coach`
   - **Type:** CNAME
   - **Value/Target:** `[your-github-username].github.io`
   - **TTL:** 3600 (or Auto)
4. Save changes

**Time Required:** 5 minutes + 5-60 minutes for DNS propagation

**Verification:** Use https://dnschecker.org/ to check `coach.tork.pro` CNAME record

---

### Issue #4: GitHub Pages Configuration ℹ️ **PROBABLY ALREADY DONE**

**Problem:** GitHub Pages not enabled or custom domain not set

**Check First:** Go to your repo → Settings → Pages. Check if Pages is enabled.

**Solution:** Configure GitHub Pages

**Steps:**
1. Go to repository **Settings** → **Pages**
2. Under "Build and deployment":
   - **Source:** Should show "GitHub Actions" ✓
3. Under "Custom domain":
   - Enter: `coach.tork.pro`
   - Click **Save**
   - Wait for DNS check ✓
4. After DNS check passes:
   - Enable **Enforce HTTPS** checkbox

**Time Required:** 2 minutes (+ wait for DNS check)

**Verification:** You should see "Your site is live at https://coach.tork.pro"

---

## 📋 Complete Setup Checklist

Work through this checklist in order:

### Phase 1: Repository Configuration (Do Now)

- [ ] **1.1** Add all 7 GitHub Secrets (see `GITHUB_SECRETS_SETUP.md`)
- [ ] **1.2** Verify all secrets are listed in Settings → Secrets and variables → Actions
- [ ] **1.3** Commit and push latest code changes
  ```bash
  git add .
  git commit -m "Configure deployment for external access"
  git push origin main
  ```

### Phase 2: Firebase Configuration (Do Now)

- [ ] **2.1** Log into [Firebase Console](https://console.firebase.google.com/)
- [ ] **2.2** Select project: **tork-cafe5**
- [ ] **2.3** Add `coach.tork.pro` to Authorized domains
- [ ] **2.4** Add `[your-github-username].github.io` to Authorized domains (backup)
- [ ] **2.5** Verify both domains appear in the list

### Phase 3: DNS Configuration (Check/Do If Needed)

- [ ] **3.1** Check if DNS is configured: visit https://coach.tork.pro
  - If you see "Site can't be reached" → DNS needs configuration (do 3.2-3.4)
  - If you see GitHub 404 or any GitHub page → DNS is configured ✓ (skip to Phase 4)
- [ ] **3.2** Log into domain registrar
- [ ] **3.3** Add CNAME record: `coach` → `[your-github-username].github.io`
- [ ] **3.4** Wait 5-60 minutes for DNS propagation

### Phase 4: GitHub Pages Configuration (Check/Do If Needed)

- [ ] **4.1** Go to repository Settings → Pages
- [ ] **4.2** Verify "Source" is set to "GitHub Actions"
- [ ] **4.3** Set custom domain to `coach.tork.pro`
- [ ] **4.4** Wait for DNS check to pass (green checkmark)
- [ ] **4.5** Enable "Enforce HTTPS"

### Phase 5: Deployment (Automatic After Phase 1)

- [ ] **5.1** Check GitHub Actions tab for running deployment
- [ ] **5.2** Wait for deployment to complete (2-5 minutes)
- [ ] **5.3** Verify green checkmark ✓ on workflow run

### Phase 6: Verification (Final Check)

- [ ] **6.1** Visit https://coach.tork.pro
- [ ] **6.2** Site loads correctly (no errors)
- [ ] **6.3** Try to log in with Firebase
- [ ] **6.4** Check browser console (F12) - no Firebase errors
- [ ] **6.5** Test on mobile device
- [ ] **6.6** Verify HTTPS works (padlock icon)

---

## 🎯 Priority Order

If you want to fix this quickly, follow this order:

**CRITICAL (Do First):**
1. Add GitHub Secrets (5 min)
2. Configure Firebase Authorized Domains (2 min)
3. Push code to trigger deployment (1 min)

**IMPORTANT (Do Next):**
4. Verify DNS configuration (2 min to check, 5-60 min if needs setup)
5. Configure GitHub Pages custom domain (2 min)

**FINAL:**
6. Test the live site (2 min)

**Total Active Time:** ~15-20 minutes
**Total Wait Time:** ~5-60 minutes (DNS + deployment)

---

## 🐛 Troubleshooting Guide

### Problem: GitHub Actions build fails

**Symptoms:** Red X on Actions tab, build fails

**Cause:** Missing or incorrect GitHub Secrets

**Fix:**
1. Verify all 7 secrets are added
2. Check secret names match exactly (case-sensitive)
3. Re-run workflow: Actions → Deploy to GitHub Pages → Re-run jobs

---

### Problem: Site shows "404 - File not found"

**Symptoms:** GitHub 404 page at coach.tork.pro

**Cause:** Deployment hasn't completed or failed

**Fix:**
1. Check Actions tab - wait for green checkmark
2. If failed, check error logs
3. If successful, wait 2-3 more minutes for Pages to update

---

### Problem: "Firebase: Error (auth/unauthorized-domain)"

**Symptoms:** Cannot log in, error in browser console

**Cause:** Domain not authorized in Firebase

**Fix:**
1. Go to Firebase Console
2. Authentication → Settings → Authorized domains
3. Add `coach.tork.pro`
4. Refresh your site and try again

---

### Problem: "Site can't be reached" or DNS error

**Symptoms:** Browser says site doesn't exist

**Cause:** DNS not configured or not propagated

**Fix:**
1. Check DNS configuration at registrar
2. Wait 30-60 minutes for propagation
3. Use https://dnschecker.org/ to verify
4. Try visiting `https://[username].github.io/[repo]/` directly as fallback

---

### Problem: Site loads but looks broken (no CSS/JS)

**Symptoms:** Plain HTML with no styling

**Cause:** Build issue or incorrect base path

**Fix:**
1. Verify `vite.config.ts` has `base: './'`
2. Check Actions build logs for errors
3. Rebuild: push new commit or manually trigger workflow

---

### Problem: Works on localhost but not on deployed site

**Symptoms:** Local dev works fine, production doesn't

**Causes & Fixes:**
- **Environment variables:** GitHub Secrets must be added
- **Firebase domain:** Must be in Authorized domains list
- **HTTPS required:** Firebase Auth requires HTTPS (GitHub Pages provides this)

---

## 📞 Quick Reference Links

- **Your Repository:** https://github.com/[your-username]/[your-repo-name]
- **GitHub Actions:** https://github.com/[your-username]/[your-repo-name]/actions
- **GitHub Pages Settings:** https://github.com/[your-username]/[your-repo-name]/settings/pages
- **GitHub Secrets:** https://github.com/[your-username]/[your-repo-name]/settings/secrets/actions
- **Firebase Console:** https://console.firebase.google.com/project/tork-cafe5
- **DNS Checker:** https://dnschecker.org/
- **Your Live Site (Goal):** https://coach.tork.pro

---

## 📚 Additional Documentation

- `GITHUB_SECRETS_SETUP.md` - Detailed guide for adding GitHub Secrets
- `EXTERNAL_ACCESS_FIX.md` - Comprehensive troubleshooting guide
- `GITHUB_PAGES_DEPLOYMENT.md` - GitHub Pages deployment overview
- `FIREBASE_SETUP.md` - Firebase configuration details

---

## ✅ Success Criteria

You'll know everything is working when:

1. ✅ You can visit https://coach.tork.pro
2. ✅ Site loads with full styling and functionality
3. ✅ Firebase authentication works (can log in)
4. ✅ No console errors in browser
5. ✅ HTTPS enabled (padlock icon)
6. ✅ Site accessible from any device/network

---

## 🎉 After Success

Once your site is live:

- GitHub Actions will automatically deploy on every push to `main`
- Changes typically go live 2-5 minutes after pushing
- Your site will be available 24/7 at https://coach.tork.pro
- Firebase data persists across deployments
- HTTPS is automatically maintained by GitHub Pages

---

## Timeline Estimate

**If everything is working:**
- GitHub Secrets: 5 minutes
- Firebase domains: 2 minutes  
- Push & deploy: 5 minutes
- **Total: ~12 minutes**

**If DNS needs configuration:**
- Above steps: 12 minutes
- DNS setup: 5 minutes
- DNS propagation: 30-60 minutes
- **Total: ~45-75 minutes**

**Most likely:** Your site will be live in **15-20 minutes** if you complete Phases 1 & 2 now!

---

## Ready to Start?

**Step 1:** Open `GITHUB_SECRETS_SETUP.md` and add the 7 GitHub Secrets

**Step 2:** Configure Firebase Authorized Domains

**Step 3:** Push your code and watch it deploy!

Good luck! 🚀
