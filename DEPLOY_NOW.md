# 🚀 Final Deployment Instructions - Tork Coach

## 🎯 Your App is 100% Ready to Deploy

All code is configured correctly. You just need to complete these 3 steps to go live.

---

## Step 1: Add GitHub Secrets (5 minutes)

### Why?
GitHub Actions needs your Firebase credentials to build the production app.

### How?

1. **Go to your GitHub repository**
   ```
   https://github.com/YOUR_USERNAME/YOUR_REPO_NAME
   ```

2. **Navigate to Settings**
   - Click the **Settings** tab (top right)
   - Click **Secrets and variables** in left sidebar
   - Click **Actions**

3. **Add these 7 secrets** (click "New repository secret" for each):

   | Name (copy exactly) | Value (copy exactly) |
   |---------------------|----------------------|
   | `VITE_FIREBASE_API_KEY` | `AIzaSyBTPK8YHJSIx0PbsCNlguAcv5QVaIWo9uI` |
   | `VITE_FIREBASE_AUTH_DOMAIN` | `tork-cafe5.firebaseapp.com` |
   | `VITE_FIREBASE_PROJECT_ID` | `tork-cafe5` |
   | `VITE_FIREBASE_STORAGE_BUCKET` | `tork-cafe5.firebasestorage.app` |
   | `VITE_FIREBASE_MESSAGING_SENDER_ID` | `533257019468` |
   | `VITE_FIREBASE_APP_ID` | `1:533257019468:web:3c42217c9f11537d5714e9` |
   | `VITE_FIREBASE_MEASUREMENT_ID` | `G-8FRRRH3MHC` |

4. **Verify**: You should see 7 secrets listed

---

## Step 2: Authorize Domain in Firebase (2 minutes)

### Why?
Firebase needs to allow authentication from your custom domain.

### How?

1. **Go to Firebase Console**
   ```
   https://console.firebase.google.com/project/tork-cafe5
   ```

2. **Navigate to Authentication**
   - Click **Authentication** in left menu
   - Click **Settings** tab
   - Click **Authorized domains** section

3. **Add your domain** (if not already there):
   - Click **Add domain**
   - Enter: `coach.tork.pro`
   - Click **Add**

4. **Verify these domains are listed**:
   - ✓ `tork-cafe5.firebaseapp.com` (default)
   - ✓ `coach.tork.pro` (your custom domain)
   - ✓ `YOUR_USERNAME.github.io` (optional, for GitHub Pages fallback)

---

## Step 3: Deploy! (1 minute)

### Push Code to Trigger Deployment

Open terminal in your project folder and run:

```bash
# Stage all changes
git add .

# Commit with message
git commit -m "Deploy Tork Coach with fixed Firebase configuration"

# Push to GitHub
git push origin main
```

### What Happens Next?

1. **GitHub Actions starts** (automatically)
   - Installs dependencies
   - Builds production bundle with Firebase credentials
   - Deploys to GitHub Pages

2. **Monitor progress**
   - Go to **Actions** tab in your GitHub repository
   - Watch "Deploy to GitHub Pages" workflow
   - Takes 2-5 minutes to complete

3. **Your app goes live!**
   - Deployed to: `https://coach.tork.pro`
   - Also available at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

---

## ✅ Testing Your Deployed App

### 1. Open in Browser
```
https://coach.tork.pro
```

### 2. You Should See
- ✓ Login page with Tork Coach logo
- ✓ Email and password fields
- ✓ "Sign Up" and "Sign In" options
- ✓ No GitHub authentication prompt

### 3. Create Your Account
- Click "Sign Up"
- Enter email and password
- Click "Create Account"
- Should redirect to dashboard

### 4. Verify Features
- ✓ Dashboard loads with demo clients
- ✓ Activity feed shows client activities
- ✓ Sidebar navigation works
- ✓ All pages accessible
- ✓ Can sign out and sign back in

---

## 🔍 Troubleshooting

### Build Fails in GitHub Actions

**Check:** Are all 7 GitHub Secrets added correctly?
- Names must be EXACT (including `VITE_` prefix)
- Values should have no extra spaces or quotes

**View logs:**
1. Go to **Actions** tab
2. Click failed workflow
3. Read error message

### Login Shows "Unauthorized Domain" Error

**Fix:** Add `coach.tork.pro` to Firebase Console authorized domains
1. Firebase Console → Authentication → Settings → Authorized domains
2. Click "Add domain"
3. Enter: `coach.tork.pro`

### Page Shows 404 Error

**Check GitHub Pages settings:**
1. Repository → Settings → Pages
2. Source should be: **GitHub Actions**
3. Custom domain: `coach.tork.pro`

**Wait for DNS:**
- DNS changes take 5-10 minutes to propagate
- Try in incognito/private window
- Clear browser cache

### App Works Locally but Not on coach.tork.pro

**Verify environment variables are in GitHub Secrets**, not just in `.env`
- Local: uses `.env` file
- Production: uses GitHub Secrets
- They must match!

---

## 📊 Deployment Checklist

Before pushing:
- ✅ All 7 GitHub Secrets added
- ✅ Firebase authorized domains configured
- ✅ CNAME file contains `coach.tork.pro`
- ✅ Code committed and ready to push

After pushing:
- ✅ GitHub Actions workflow completes successfully
- ✅ coach.tork.pro loads (may take 5-10 minutes)
- ✅ Login page displays
- ✅ Can create account and sign in
- ✅ Dashboard loads with demo data

---

## 🎉 Success!

Once deployed, your app will be:
- ✅ Live at coach.tork.pro
- ✅ Accessible to anyone (no GitHub login required)
- ✅ Fully functional with Firebase authentication
- ✅ Using secure HTTPS connection
- ✅ Ready for your coaching clients

---

## 📁 Key Files (Already Configured)

These files are already set up correctly:
- ✅ `.env` - Local Firebase credentials
- ✅ `src/lib/firebase.ts` - Firebase initialization
- ✅ `src/contexts/AuthContext.tsx` - Authentication logic
- ✅ `.github/workflows/deploy.yml` - Deployment workflow
- ✅ `CNAME` - Custom domain configuration
- ✅ `vite.config.ts` - Build configuration

**You don't need to modify any code!** Just complete the 3 steps above.

---

## 🆘 Need Help?

If something doesn't work:
1. Check GitHub Actions logs for build errors
2. Verify Firebase Console shows your domain as authorized
3. Confirm all 7 GitHub Secrets are added with correct names
4. Wait 5-10 minutes for DNS propagation
5. Try in incognito/private browser window

---

## 🚀 Ready to Deploy?

1. ✅ Add GitHub Secrets
2. ✅ Authorize domain in Firebase
3. ✅ Push code to GitHub

**Your coaching platform will be live in minutes!**

```bash
git push origin main
```

