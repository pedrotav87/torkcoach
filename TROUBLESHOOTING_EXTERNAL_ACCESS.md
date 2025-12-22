# Troubleshooting External Access Issues

## Overview
This guide helps you diagnose and fix issues preventing external users from accessing your app at `coach.tork.pro`.

---

## Quick Diagnostic Checklist

Run through this checklist to identify your issue:

### 1. Can you access the app locally?
- [ ] Yes, `npm run dev` works → Continue to step 2
- [ ] No, local development fails → Fix local setup first (see [QUICKSTART.md](./QUICKSTART.md))

### 2. Is your app built and deployed?
- [ ] Yes, ran `npm run build` → Continue to step 3
- [ ] No, haven't built yet → Run `npm run build` and deploy `dist` folder

### 3. Does your domain resolve?
```bash
nslookup coach.tork.pro
```
- [ ] Yes, returns IP address → Continue to step 4
- [ ] No, returns error → Fix DNS configuration (see section below)

### 4. Can you access the app via IP or default domain?
- [ ] Yes, works on hosting provider's domain → Continue to step 5
- [ ] No, doesn't work anywhere → Check deployment (see section below)

### 5. Is Firebase domain authorized?
- [ ] Yes, added `coach.tork.pro` in Firebase Console → Continue to step 6
- [ ] No, haven't added yet → **THIS IS YOUR ISSUE** (see [QUICK_DOMAIN_FIX.md](./QUICK_DOMAIN_FIX.md))

### 6. Is HTTPS working?
- [ ] Yes, green padlock in browser → Continue to step 7
- [ ] No, certificate error → Fix SSL (see section below)

### 7. Are there console errors?
- [ ] Check browser DevTools → Console tab
- [ ] Note the exact error messages

---

## Common Issues & Solutions

### Issue 1: "This domain is not authorized" (Firebase Error)

**Symptoms:**
- Page loads but can't sign in
- Console shows Firebase auth error
- Error mentions "unauthorized domain"

**Solution:**
1. Go to [Firebase Console](https://console.firebase.google.com/project/tork-cafe5)
2. Authentication → Settings → Authorized domains
3. Click "Add domain"
4. Enter: `coach.tork.pro`
5. Click "Add"

**Time to fix:** 2 minutes  
**Detailed guide:** [QUICK_DOMAIN_FIX.md](./QUICK_DOMAIN_FIX.md)

---

### Issue 2: DNS Not Configured / Domain Doesn't Resolve

**Symptoms:**
- Browser shows "This site can't be reached"
- `nslookup coach.tork.pro` returns "Non-existent domain"
- No IP address returned

**Solution:**
You need to configure DNS records with your domain registrar (e.g., GoDaddy, Namecheap, Cloudflare).

#### For GitHub Pages:
1. Go to your domain registrar's DNS settings
2. Add an A record:
   ```
   Type: A
   Name: coach (or @)
   Value: 185.199.108.153
   ```
3. Also add these A records:
   ```
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
4. Wait 10-60 minutes for propagation

#### For Netlify:
1. Go to Netlify dashboard → Domain settings
2. Add custom domain: `coach.tork.pro`
3. Follow Netlify's DNS instructions
4. Or point your domain's DNS to Netlify

#### For Vercel:
1. Go to Vercel dashboard → Project Settings → Domains
2. Add domain: `coach.tork.pro`
3. Add the DNS records Vercel provides
4. Wait for verification

**Time to fix:** 15 minutes + propagation time (up to 48 hours)

---

### Issue 3: App Not Deployed / Empty Page

**Symptoms:**
- Blank white page
- 404 error
- "Index.html not found"

**Solution:**

#### Step 1: Build your app
```bash
npm run build
```

This creates a `dist` folder with your production files.

#### Step 2: Deploy the `dist` folder

**For GitHub Pages:**
1. Go to your repo → Settings → Pages
2. Source: Deploy from a branch
3. Branch: `main` (or your default branch)
4. Folder: `/dist` ← **Important!**
5. Click "Save"
6. Wait 2-3 minutes for deployment

**For Netlify:**
1. Drag and drop the `dist` folder to Netlify
2. Or connect your GitHub repo
3. Build command: `npm run build`
4. Publish directory: `dist`

**For Vercel:**
1. Connect your GitHub repo
2. Build command: `npm run build`
3. Output directory: `dist`
4. Click "Deploy"

**Time to fix:** 5-10 minutes

---

### Issue 4: HTTPS / SSL Certificate Issues

**Symptoms:**
- "Your connection is not private" warning
- "NET::ERR_CERT_AUTHORITY_INVALID"
- No green padlock in browser

**Solution:**

#### For GitHub Pages:
1. Go to repo Settings → Pages
2. Check "Enforce HTTPS" (may need to wait for certificate to provision)
3. Wait 10-20 minutes
4. Try accessing with `https://`

#### For Netlify:
- Netlify provides automatic SSL certificates
- Should work immediately after adding custom domain
- Check Netlify dashboard → Domain settings → HTTPS

#### For Cloudflare (if using):
1. Go to Cloudflare dashboard
2. SSL/TLS settings
3. Choose "Full" or "Full (strict)"
4. Enable "Always Use HTTPS"

**Time to fix:** 15-30 minutes

---

### Issue 5: Firestore Permission Denied

**Symptoms:**
- Can sign in but can't see data
- Console shows "Missing or insufficient permissions"
- Firebase error about denied access

**Solution:**

#### Step 1: Check Firestore Rules
1. Go to [Firebase Console](https://console.firebase.google.com/project/tork-cafe5)
2. Firestore Database → Rules
3. Make sure rules are configured correctly

#### Step 2: Apply correct rules
Copy these rules into Firestore (see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for complete rules):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isCoachOrAdmin() {
      return isAuthenticated() && 
        (get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'coach' ||
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
    
    match /users/{userId} {
      allow read, write: if isAuthenticated() && request.auth.uid == userId;
    }
    
    match /{document=**} {
      allow read, write: if isCoachOrAdmin();
    }
  }
}
```

#### Step 3: Verify user has correct role
1. Firestore Database → Data
2. Find your user in `users` collection
3. Make sure `role` field is set to `"coach"` or `"admin"`

**Time to fix:** 5 minutes

---

### Issue 6: Environment Variables Not Working

**Symptoms:**
- App works locally but not in production
- Firebase config errors
- "API key not valid" errors

**Solution:**

Most hosting providers need environment variables configured separately:

#### For GitHub Pages:
GitHub Pages is static - environment variables are baked into the build.

1. Make sure `.env` exists locally with correct values
2. Build locally: `npm run build`
3. The `dist` folder will have the values embedded
4. Deploy the `dist` folder

#### For Netlify:
1. Netlify dashboard → Site settings → Environment variables
2. Add each variable:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - etc.
3. Redeploy site

#### For Vercel:
1. Vercel dashboard → Project Settings → Environment Variables
2. Add each `VITE_*` variable
3. Redeploy

**Important:** Environment variables must start with `VITE_` for Vite to include them.

**Time to fix:** 10 minutes

---

### Issue 7: CORS / Cross-Origin Errors

**Symptoms:**
- Console shows CORS policy error
- "Access-Control-Allow-Origin" error
- Can't load resources from Firebase

**Solution:**

This is usually a Firebase domain authorization issue. See Issue 1 above.

If it's not Firebase-related:
1. Check your hosting provider's CORS settings
2. Make sure Firebase SDK is loaded correctly
3. Verify all Firebase calls use HTTPS

**Time to fix:** 5-15 minutes

---

### Issue 8: Cached Old Version

**Symptoms:**
- Changes don't appear after deployment
- Old UI still showing
- Works in incognito but not regular browser

**Solution:**

#### Clear browser cache:
1. Chrome: Ctrl+Shift+Delete (Cmd+Shift+Delete on Mac)
2. Select "Cached images and files"
3. Choose "All time"
4. Click "Clear data"

#### Or use incognito:
- Chrome: Ctrl+Shift+N (Cmd+Shift+N on Mac)
- Firefox: Ctrl+Shift+P (Cmd+Shift+P on Mac)

#### Force reload:
- Chrome: Ctrl+Shift+R (Cmd+Shift+R on Mac)
- Firefox: Ctrl+F5

**Time to fix:** 1 minute

---

## Step-by-Step Debugging Process

If you're still stuck, follow this systematic process:

### 1. Check Local Development
```bash
npm run dev
```
- Does it work locally? If no, fix local setup first.

### 2. Check Build
```bash
npm run build
```
- Does it build without errors? If no, fix build errors first.
- Check the `dist` folder - does it contain files?

### 3. Check DNS
```bash
nslookup coach.tork.pro
```
- Does it return an IP? If no, configure DNS.

### 4. Check Deployment
- Visit your hosting provider's default URL (not custom domain)
- Does the app load? If no, redeploy.

### 5. Check Firebase Domain
- Firebase Console → Authentication → Settings → Authorized domains
- Is `coach.tork.pro` listed? If no, add it.

### 6. Check HTTPS
- Visit `https://coach.tork.pro`
- Green padlock? If no, wait for SSL or configure it.

### 7. Check Browser Console
- Press F12
- Click Console tab
- Look for red error messages
- Google the exact error message

### 8. Check Firestore Rules
- Firebase Console → Firestore → Rules
- Are rules published? Are they correct?

---

## Testing From External Device

### Use Real External Access:
1. **Mobile phone on cellular** (not WiFi)
2. **Friend's computer**
3. **Different network**

### Don't rely on:
- Same WiFi network (might have local DNS)
- VPN (can cause routing issues)
- Same computer (browser cache issues)

---

## Getting Error Messages

### Browser Console (Essential):
1. Press F12 (or right-click → Inspect)
2. Click "Console" tab
3. Look for red error messages
4. Screenshot or copy exact error text

### Network Tab:
1. F12 → Network tab
2. Reload page
3. Look for failed requests (red)
4. Click on failed request to see details

### Firebase Console:
1. Authentication → Users (are users being created?)
2. Firestore → Data (is data being written?)
3. Look for any error indicators

---

## Priority Order for Fixing

Fix issues in this order:

1. ✅ **Local development works** (prerequisite)
2. ✅ **Build completes successfully** (npm run build)
3. ✅ **DNS resolves** (nslookup returns IP)
4. ✅ **App deployed** (files on hosting)
5. ✅ **HTTPS working** (green padlock)
6. ✅ **Firebase domain authorized** ← Most common issue
7. ✅ **Firestore rules configured**
8. ✅ **Can create account and sign in**

---

## Still Having Issues?

### Collect this information:

1. **What URL are you trying to access?**
   - Example: `https://coach.tork.pro`

2. **What happens when you visit it?**
   - Blank page? Error message? What exactly?

3. **Browser console errors?**
   - F12 → Console → Screenshot red errors

4. **Network tab errors?**
   - F12 → Network → Any failed requests?

5. **Where is your app hosted?**
   - GitHub Pages? Netlify? Vercel? Other?

6. **Did you add domain to Firebase?**
   - Yes/No? Which domain exactly?

7. **Can you access via hosting provider's default URL?**
   - Example: `your-site.netlify.app`

---

## Quick Reference: What Goes Where

| Issue | Fix Location |
|-------|--------------|
| Domain not authorized | Firebase Console → Authentication → Settings |
| DNS not resolving | Domain registrar (GoDaddy, Namecheap, etc.) |
| SSL certificate | Hosting provider settings |
| Environment variables | Hosting provider settings OR local `.env` |
| Firestore rules | Firebase Console → Firestore → Rules |
| User roles | Firebase Console → Firestore → users collection |
| Deploy app | Hosting provider (GitHub Pages, Netlify, etc.) |

---

## External Access Requirements Summary

For external users to access your app, ALL of these must be true:

- [ ] App is built (`npm run build`)
- [ ] Built files deployed to hosting
- [ ] Custom domain DNS configured
- [ ] DNS propagated (can take 48 hours)
- [ ] HTTPS/SSL certificate active
- [ ] `coach.tork.pro` added to Firebase authorized domains
- [ ] Firestore rules published
- [ ] Firebase auth enabled (Email/Password)
- [ ] No console errors in browser

---

## Time Estimates

| Task | Time Required |
|------|--------------|
| Authorize Firebase domain | 2 minutes |
| Build and deploy app | 5-10 minutes |
| Configure DNS | 15 minutes + propagation (up to 48h) |
| Set up SSL | 10-30 minutes (auto on most platforms) |
| Configure Firestore rules | 5 minutes |
| Clear browser cache | 1 minute |
| Create first account | 2 minutes |

---

## Most Common Issue

**The #1 reason external access doesn't work:**

🚨 **Firebase domain not authorized** 🚨

If you're using a custom domain like `coach.tork.pro`, you MUST add it to Firebase Console → Authentication → Settings → Authorized domains.

See [QUICK_DOMAIN_FIX.md](./QUICK_DOMAIN_FIX.md) for the fix (takes 2 minutes).

---

## Resources

- [Firebase Console](https://console.firebase.google.com/project/tork-cafe5)
- [QUICK_DOMAIN_FIX.md](./QUICK_DOMAIN_FIX.md) - Authorize domain
- [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) - Complete Firebase setup
- [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) - Deployment guide
- [DNS Checker](https://www.whatsmydns.net/) - Check DNS propagation

---

**Need immediate help?** Start with [QUICK_DOMAIN_FIX.md](./QUICK_DOMAIN_FIX.md) - it fixes 80% of external access issues.
