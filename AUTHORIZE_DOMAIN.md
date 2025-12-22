# Authorize coach.tork.pro Domain in Firebase

## Problem
When trying to access your app from `coach.tork.pro`, Firebase Authentication blocks the request because the domain is not authorized. This causes authentication to fail and the app won't load properly for external users.

## Solution
You need to add `coach.tork.pro` to the list of authorized domains in your Firebase Console.

---

## Step-by-Step Instructions

### 1. Open Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: **tork-cafe5**

### 2. Navigate to Authentication Settings
1. In the left sidebar, click on **"Authentication"**
2. Click on the **"Settings"** tab at the top
3. Scroll down to find **"Authorized domains"** section

### 3. Add Your Custom Domain
1. Click the **"Add domain"** button
2. Enter: `coach.tork.pro`
3. Click **"Add"**

### 4. Verify Domain List
After adding, your authorized domains should include:
- ✅ `localhost` (for local development)
- ✅ `tork-cafe5.firebaseapp.com` (default Firebase domain)
- ✅ `coach.tork.pro` (your custom domain)

---

## Important Notes

### Domain Format
- ✅ **Correct:** `coach.tork.pro`
- ❌ **Incorrect:** `https://coach.tork.pro` (don't include protocol)
- ❌ **Incorrect:** `coach.tork.pro/` (don't include trailing slash)

### Subdomain vs Root Domain
- If your app is at `coach.tork.pro`, add: `coach.tork.pro`
- If you also want `www.coach.tork.pro`, add: `www.coach.tork.pro`
- Add each subdomain separately

### Propagation Time
- Changes take effect **immediately**
- No waiting period required
- Test right after adding the domain

---

## Testing Your Configuration

### After Adding the Domain:

1. **Clear Your Browser Cache** (or use incognito/private mode)
   - Chrome: Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)
   - Select "Cached images and files"
   - Click "Clear data"

2. **Visit Your App**
   ```
   https://coach.tork.pro
   ```

3. **Check for Errors**
   - Open browser DevTools (F12)
   - Look at the Console tab
   - If you see Firebase auth errors, double-check the domain spelling

4. **Try to Sign In**
   - Test with your coach account
   - Authentication should work now

---

## Common Issues & Solutions

### Issue 1: "This domain is not authorized" Error
**Solution:** 
- Double-check spelling of domain in Firebase Console
- Make sure you added `coach.tork.pro` (not `https://coach.tork.pro`)
- Wait 1-2 minutes and try again

### Issue 2: Still Can't Access After Adding Domain
**Possible Causes:**
1. **DNS not configured properly**
   - Check that your DNS records point to your hosting
   - Verify with: `nslookup coach.tork.pro`

2. **App not deployed yet**
   - Make sure you've actually deployed your built app
   - The domain works, but there's no app to load

3. **Caching issues**
   - Clear browser cache completely
   - Try a different browser
   - Use incognito/private mode

### Issue 3: Works on Desktop but Not Mobile
**Solution:**
- Mobile browsers cache aggressively
- Clear cache on mobile device
- Try mobile incognito mode first

---

## Visual Guide

Here's what you're looking for in Firebase Console:

```
Firebase Console
└── Authentication
    └── Settings tab
        └── Authorized domains section
            ├── localhost (already there)
            ├── tork-cafe5.firebaseapp.com (already there)
            └── [Add domain button] ← Click here
                └── Enter: coach.tork.pro
```

---

## Additional Domains to Consider

If you plan to use multiple domains or subdomains, add all of them:

### For Development:
- `localhost` ✅ (already added by default)
- `127.0.0.1` (add if using IP directly)

### For Staging:
- `staging.coach.tork.pro` (if you have a staging environment)
- `dev.coach.tork.pro` (if you have a dev environment)

### For Production:
- `coach.tork.pro` ✅ (add this now)
- `www.coach.tork.pro` (if you want www version)
- `tork.pro` (if you want root domain to work)

---

## Security Considerations

### Why Firebase Requires Authorized Domains
Firebase only allows authentication from domains you explicitly approve. This prevents:
- ❌ Unauthorized sites from using your Firebase project
- ❌ Phishing attacks impersonating your app
- ❌ API key abuse

### Best Practices
- ✅ Only add domains you control
- ✅ Remove old/unused domains
- ✅ Don't add wildcard domains unless necessary
- ✅ Keep the list updated when changing hosting

---

## Quick Checklist

Before external users can access your app, verify:

- [ ] Domain is added in Firebase Console → Authentication → Settings → Authorized domains
- [ ] Domain spelling is correct (no https://, no trailing slash)
- [ ] DNS records are configured and propagated
- [ ] App is built and deployed to hosting
- [ ] SSL certificate is active (https works)
- [ ] Browser cache is cleared for testing
- [ ] You can sign in successfully from external computer

---

## What This Does NOT Fix

This authorization is **only for Firebase Authentication**. If you still can't access your app, you may also need to:

1. **Configure your hosting provider** (GitHub Pages, Netlify, Vercel, etc.)
2. **Set up DNS records** (A, CNAME) with your domain registrar
3. **Enable HTTPS** / SSL certificate
4. **Update CORS settings** if using external APIs
5. **Build and deploy** your production app

---

## After Authorizing the Domain

### Next Steps:

1. ✅ **Build your production app**
   ```bash
   npm run build
   ```

2. ✅ **Deploy the `dist` folder** to your hosting provider

3. ✅ **Test from external device**
   - Use phone on cellular (not wifi)
   - Try from friend's computer
   - Use different browser

4. ✅ **Update environment variables** if needed
   - Make sure production uses correct Firebase config
   - Don't use development URLs in production

---

## Need More Help?

### If authentication still doesn't work:

1. **Check Firebase Console → Authentication → Users**
   - Do test users exist?
   - Are they created properly?

2. **Check Browser Console**
   - What's the exact error message?
   - Is it a Firebase error or something else?

3. **Verify Firebase Config**
   - Open your deployed app
   - Check DevTools → Network tab
   - Look for Firebase API calls
   - Verify they're using correct project ID

4. **Check Firestore Rules**
   - Go to Firestore Database → Rules
   - Make sure rules allow authenticated users
   - See `FIREBASE_SETUP.md` for correct rules

---

## Screenshot Reference

Look for this in Firebase Console:

```
┌─────────────────────────────────────────┐
│ Authentication                          │
├─────────────────────────────────────────┤
│ [Users] [Sign-in method] [Settings]    │
│                                         │
│ Authorized domains                      │
│ ┌─────────────────────────────────┐   │
│ │ localhost                 [x]   │   │
│ │ tork-cafe5.firebaseapp.com [x] │   │
│ │ coach.tork.pro           [x]   │   │
│ └─────────────────────────────────┘   │
│                                         │
│ [+ Add domain]                         │
└─────────────────────────────────────────┘
```

---

## Summary

**What you need to do:**
1. Go to Firebase Console
2. Navigate to Authentication → Settings → Authorized domains
3. Click "Add domain"
4. Enter: `coach.tork.pro`
5. Click "Add"
6. Test your app from external device

**This fixes:**
- ✅ Firebase authentication errors
- ✅ "Domain not authorized" errors
- ✅ External access blocked by Firebase

**This does NOT fix:**
- ❌ DNS configuration
- ❌ Hosting/deployment issues
- ❌ SSL certificate problems
- ❌ Build errors

---

## Support Resources

- [Firebase Auth Domain Configuration](https://firebase.google.com/docs/auth/web/auth-domain)
- [Firebase Console](https://console.firebase.google.com)
- Your project: [tork-cafe5](https://console.firebase.google.com/project/tork-cafe5)

---

**🎯 Action Required:** You must manually add `coach.tork.pro` in Firebase Console. This cannot be automated - it's a security feature.
