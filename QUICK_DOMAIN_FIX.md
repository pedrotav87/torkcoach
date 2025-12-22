# 🚀 Quick Fix: Authorize coach.tork.pro in Firebase

## The Problem
Your app can't authenticate users from `coach.tork.pro` because Firebase blocks unauthorized domains.

---

## ⚡ 3-Minute Fix

### Step 1: Open Firebase Console
Go to: https://console.firebase.google.com/project/tork-cafe5

### Step 2: Navigate to Auth Settings
```
Authentication → Settings → Authorized domains
```

### Step 3: Add Your Domain
1. Click **"Add domain"** button
2. Type: `coach.tork.pro`
3. Click **"Add"**

### Step 4: Test
- Clear browser cache
- Visit https://coach.tork.pro
- Try signing in

---

## ✅ Done!
Your domain is now authorized for Firebase Authentication.

---

## 🔗 Full Documentation
See `AUTHORIZE_DOMAIN.md` for detailed troubleshooting.

---

## 📋 Quick Checklist

After authorizing the domain, make sure:

- [ ] Domain added in Firebase Console
- [ ] Browser cache cleared
- [ ] App is deployed to hosting
- [ ] DNS points to hosting provider
- [ ] HTTPS/SSL is enabled
- [ ] Can sign in from external device

---

## 🆘 Still Having Issues?

### Check these common problems:

**1. DNS Not Configured**
```bash
nslookup coach.tork.pro
```
Should return your hosting provider's IP

**2. App Not Deployed**
- Make sure you ran `npm run build`
- Upload `dist` folder to hosting

**3. Wrong Firebase Project**
- Verify `.env` has correct project ID
- Check: `VITE_FIREBASE_PROJECT_ID=tork-cafe5`

**4. Firestore Rules Missing**
- See `FIREBASE_SETUP.md` for security rules

---

## 📞 Firebase Console Direct Links

- **Project Overview:** https://console.firebase.google.com/project/tork-cafe5
- **Authentication:** https://console.firebase.google.com/project/tork-cafe5/authentication/users
- **Settings:** https://console.firebase.google.com/project/tork-cafe5/authentication/settings
- **Firestore:** https://console.firebase.google.com/project/tork-cafe5/firestore

---

## Current Firebase Configuration

```env
Project ID: tork-cafe5
Auth Domain: tork-cafe5.firebaseapp.com
Custom Domain: coach.tork.pro (needs to be added)
```

---

## What to Add

| Type | Domain | Status |
|------|--------|--------|
| Default | `tork-cafe5.firebaseapp.com` | ✅ Already added |
| Local Dev | `localhost` | ✅ Already added |
| Production | `coach.tork.pro` | ⚠️ **ADD THIS NOW** |
| WWW | `www.coach.tork.pro` | Optional |

---

**⏰ Time Required:** 2-3 minutes
**🔧 Technical Skill:** No coding required
**🌐 Effect:** Immediate (no propagation delay)
