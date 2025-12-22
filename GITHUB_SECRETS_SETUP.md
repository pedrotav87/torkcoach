# GitHub Repository Secrets Setup

## Why You Need This

Your GitHub Actions deployment workflow requires Firebase environment variables to build the application. These are passed as **Repository Secrets** for security and portability.

---

## Required Secrets

You need to add **7 secrets** to your GitHub repository:

| Secret Name | Your Value |
|------------|-----------|
| `VITE_FIREBASE_API_KEY` | `AIzaSyBTPK8YHJSIx0PbsCNlguAcv5QVaIWo9uI` |
| `VITE_FIREBASE_AUTH_DOMAIN` | `tork-cafe5.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | `tork-cafe5` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `tork-cafe5.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `533257019468` |
| `VITE_FIREBASE_APP_ID` | `1:533257019468:web:3c42217c9f11537d5714e9` |
| `VITE_FIREBASE_MEASUREMENT_ID` | `G-8FRRRH3MHC` |

---

## Step-by-Step Instructions

### 1. Navigate to Repository Settings

1. Go to your GitHub repository: **https://github.com/[your-username]/[your-repo-name]**
2. Click the **Settings** tab (top right, next to "Insights")

### 2. Access Secrets and Variables

1. In the left sidebar, scroll down to **"Secrets and variables"**
2. Click **"Actions"**

### 3. Add Each Secret

For **each of the 7 secrets** listed above:

1. Click the **"New repository secret"** button (green button, top right)
2. In the **"Name"** field, enter the secret name EXACTLY as shown (e.g., `VITE_FIREBASE_API_KEY`)
3. In the **"Secret"** field, paste the corresponding value
4. Click **"Add secret"**
5. Repeat for all 7 secrets

### 4. Verify All Secrets Are Added

After adding all secrets, your "Actions secrets" page should show:

```
✓ VITE_FIREBASE_API_KEY              Updated X minutes ago
✓ VITE_FIREBASE_AUTH_DOMAIN          Updated X minutes ago
✓ VITE_FIREBASE_PROJECT_ID           Updated X minutes ago
✓ VITE_FIREBASE_STORAGE_BUCKET       Updated X minutes ago
✓ VITE_FIREBASE_MESSAGING_SENDER_ID  Updated X minutes ago
✓ VITE_FIREBASE_APP_ID               Updated X minutes ago
✓ VITE_FIREBASE_MEASUREMENT_ID       Updated X minutes ago
```

---

## Quick Copy-Paste Reference

To make this easier, here are the secrets formatted for quick copying:

### Secret 1
**Name:**
```
VITE_FIREBASE_API_KEY
```
**Value:**
```
AIzaSyBTPK8YHJSIx0PbsCNlguAcv5QVaIWo9uI
```

### Secret 2
**Name:**
```
VITE_FIREBASE_AUTH_DOMAIN
```
**Value:**
```
tork-cafe5.firebaseapp.com
```

### Secret 3
**Name:**
```
VITE_FIREBASE_PROJECT_ID
```
**Value:**
```
tork-cafe5
```

### Secret 4
**Name:**
```
VITE_FIREBASE_STORAGE_BUCKET
```
**Value:**
```
tork-cafe5.firebasestorage.app
```

### Secret 5
**Name:**
```
VITE_FIREBASE_MESSAGING_SENDER_ID
```
**Value:**
```
533257019468
```

### Secret 6
**Name:**
```
VITE_FIREBASE_APP_ID
```
**Value:**
```
1:533257019468:web:3c42217c9f11537d5714e9
```

### Secret 7
**Name:**
```
VITE_FIREBASE_MEASUREMENT_ID
```
**Value:**
```
G-8FRRRH3MHC
```

---

## Security Notes

### Are These Safe to Use as Secrets?

**Yes!** Firebase API keys are designed to be public (they're embedded in your frontend code anyway). However:

- Using GitHub Secrets is **best practice** for portability
- Prevents hardcoding values in your workflow file
- Makes it easy to update if you change Firebase projects
- Keeps your workflow file clean and reusable

### Firebase Security Rules

Firebase security is enforced by:
- **Authentication rules** (who can sign in)
- **Firestore security rules** (who can read/write data)
- **Authorized domains** (which domains can use Firebase Auth)

The API key alone cannot be used maliciously if your Firebase security rules are properly configured.

---

## What Happens After Adding Secrets?

Once all 7 secrets are added:

1. **Automatic deployment works** - Every push to `main` branch will trigger a build
2. **Environment variables are injected** - The build process uses these values
3. **Firebase integration works** - Authentication and Firestore function properly

---

## Testing After Setup

After adding secrets, trigger a deployment:

### Option 1: Push Code
```bash
git add .
git commit -m "Test deployment with secrets"
git push origin main
```

### Option 2: Manual Workflow Trigger
1. Go to **Actions** tab in your repository
2. Select **"Deploy to GitHub Pages"** workflow
3. Click **"Run workflow"** dropdown
4. Click **"Run workflow"** button

### Verify Success
1. Wait 2-5 minutes for deployment
2. Check **Actions** tab - workflow should show green checkmark ✓
3. Visit your site: **https://coach.tork.pro**
4. Test Firebase login - should work without errors

---

## Common Mistakes

### ❌ Wrong Secret Names
Secret names must match EXACTLY (case-sensitive):
- ❌ `vite_firebase_api_key` (lowercase)
- ❌ `FIREBASE_API_KEY` (missing VITE_ prefix)
- ✅ `VITE_FIREBASE_API_KEY` (correct)

### ❌ Extra Spaces in Values
When copying values, avoid:
- Leading/trailing spaces
- Line breaks
- Hidden characters

### ❌ Missing Secrets
All 7 secrets are required. If even one is missing, the build will use fallback values which may not work in production.

---

## Troubleshooting

### Build Still Failing After Adding Secrets?

1. **Check secret names** - They must match exactly
2. **Re-run workflow** - Secrets are only loaded when workflow starts
3. **Check workflow file** - Open `.github/workflows/deploy.yml` and verify secret names match

### How to Update a Secret?

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click the secret name
3. Click **"Update secret"**
4. Paste new value
5. Click **"Update secret"**

### How to Delete a Secret?

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click the secret name
3. Click **"Remove secret"**
4. Confirm deletion

---

## Next Steps

After adding GitHub Secrets:

1. ✅ Secrets configured
2. 📝 Push code to trigger deployment
3. ⏱️ Wait for GitHub Actions to complete (2-5 min)
4. 🌐 Visit **https://coach.tork.pro**
5. 🎉 Your app is live!

---

## Need Help?

If you're still having issues after adding secrets:

1. Check the **Actions** tab for error logs
2. Verify all 7 secrets are listed in Settings
3. Ensure Firebase Authorized Domains includes `coach.tork.pro`
4. Check DNS configuration for custom domain

Your app should be accessible externally once:
- ✅ GitHub Secrets added
- ✅ CNAME configured (already done)
- ✅ Firebase Authorized Domains configured
- ✅ DNS records pointing to GitHub Pages
- ✅ Deployment successful
