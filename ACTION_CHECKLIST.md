# ✅ External Access Setup - Action Checklist

Copy this checklist and check off each item as you complete it.

---

## 🔑 Part 1: GitHub Secrets (15 minutes)

Go to: **Your GitHub Repo → Settings → Secrets and variables → Actions**

Add these 7 secrets by clicking "New repository secret" for each:

```
□ VITE_FIREBASE_API_KEY
   Value: AIzaSyBTPK8YHJSIx0PbsCNlguAcv5QVaIWo9uI

□ VITE_FIREBASE_AUTH_DOMAIN
   Value: tork-cafe5.firebaseapp.com

□ VITE_FIREBASE_PROJECT_ID
   Value: tork-cafe5

□ VITE_FIREBASE_STORAGE_BUCKET
   Value: tork-cafe5.firebasestorage.app

□ VITE_FIREBASE_MESSAGING_SENDER_ID
   Value: 533257019468

□ VITE_FIREBASE_APP_ID
   Value: 1:533257019468:web:3c42217c9f11537d5714e9

□ VITE_FIREBASE_MEASUREMENT_ID
   Value: G-8FRRRH3MHC
```

---

## 🔐 Part 2: Firebase Authorization (2 minutes)

Go to: **[Firebase Console](https://console.firebase.google.com/) → tork-cafe5 → Authentication → Settings**

```
□ Click "Authorized domains" section
□ Click "Add domain" button
□ Type: coach.tork.pro
□ Click "Add"
□ Verify it appears in the list
```

---

## 🌐 Part 3: DNS Configuration (5 minutes)

Go to: **Your domain registrar** (where you bought tork.pro)

```
□ Find DNS settings / DNS management
□ Add new CNAME record:
   • Type: CNAME
   • Name/Host: coach
   • Target/Value: [your-github-username].github.io
   • TTL: 3600 or Auto
□ Save the record
□ Verify at https://dnschecker.org/ (search: coach.tork.pro)
```

**Note:** DNS propagation can take 5-60 minutes

---

## 📄 Part 4: GitHub Pages Setup (3 minutes)

Go to: **Your GitHub Repo → Settings → Pages**

```
□ Under "Source": Select "GitHub Actions"
□ Under "Custom domain": 
   • Type: coach.tork.pro
   • Click "Save"
   • Wait for green checkmark (DNS check)
□ Check "Enforce HTTPS" (after DNS check passes)
```

---

## 🚀 Part 5: Deploy (5 minutes)

In your terminal or command line:

```bash
□ git add .
□ git commit -m "Configure for external access"
□ git push origin main
```

Then:
```
□ Go to GitHub repo → Actions tab
□ Watch the "Deploy to GitHub Pages" workflow
□ Wait for green checkmark (✓)
□ Note the time - add 3-5 minutes for completion
```

---

## 🧪 Part 6: Test Access (After 5-60 mins)

Wait for DNS propagation, then test:

```
□ Open browser (incognito/private mode recommended)
□ Visit: https://coach.tork.pro
□ Page loads successfully
□ Press F12 → Console tab → No red errors
□ Try logging in with Firebase
□ Login works successfully
□ Navigate through the app
□ All features work correctly
```

---

## ✅ Success Indicators

You've succeeded when:

- ✅ All 7 GitHub Secrets show in repo settings
- ✅ `coach.tork.pro` listed in Firebase Authorized domains
- ✅ DNS checker shows CNAME record for coach.tork.pro
- ✅ GitHub Pages shows custom domain with green checkmark
- ✅ Latest GitHub Actions workflow completed successfully
- ✅ https://coach.tork.pro loads your app
- ✅ HTTPS padlock shows (secure connection)
- ✅ Firebase login works
- ✅ No console errors

---

## ⏱️ Timeline Expectations

| Step | Expected Time |
|------|---------------|
| Add GitHub Secrets | 10-15 min |
| Authorize Firebase domain | 2 min |
| Configure DNS | 5 min |
| Enable GitHub Pages | 3 min |
| Commit & push code | 1 min |
| GitHub Actions build | 3-5 min |
| DNS propagation | 5-60 min (variable) |
| HTTPS certificate | 15-30 min (automatic) |
| **TOTAL** | **30-90 minutes** |

---

## 🐛 Quick Troubleshooting

**If GitHub Actions fails:**
- ✓ Check all 7 secrets are added
- ✓ Secret names match exactly (case-sensitive)
- ✓ Check Actions tab → failed run → logs for specific error

**If site doesn't load:**
- ✓ Wait 5-60 minutes for DNS propagation
- ✓ Try `https://[your-username].github.io/[repo-name]/`
- ✓ Check DNS at https://dnschecker.org/

**If Firebase login fails:**
- ✓ Verify `coach.tork.pro` in Firebase Authorized domains
- ✓ Wait 2-3 minutes after adding domain
- ✓ Check browser console for specific error

**If you see blank screen:**
- ✓ Check browser console (F12)
- ✓ Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- ✓ Clear browser cache
- ✓ Check GitHub Actions logs

---

## 📚 Need More Help?

Detailed guides in this repository:
- **Quick Fix:** `QUICK_FIX_EXTERNAL_ACCESS.md`
- **Root Cause:** `ROOT_CAUSE_ANALYSIS.md`
- **Full Solution:** `EXTERNAL_ACCESS_SOLUTION.md`
- **Setup Script:** `./setup-external-access.sh`

---

## 🎉 Celebration Time!

Once you check all boxes above and successfully access your app at **https://coach.tork.pro**, you're done! 

Your app is now:
- ✅ Live on the internet
- ✅ Accessible from any device
- ✅ Secured with HTTPS
- ✅ Using Firebase Authentication
- ✅ Automatically deploys on every push to main

**Congratulations!** 🚀🎊

---

**Pro Tip:** Bookmark this checklist. You'll need it again if you deploy to a new domain or repository.
