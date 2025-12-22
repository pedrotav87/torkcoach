# 🔐 GitHub Secrets Setup Guide

## Quick Setup Instructions

Your Firebase configuration needs to be added as GitHub Secrets for the deployment to work.

### Step-by-Step Process

#### 1. Navigate to GitHub Repository Settings
- Go to your repository on GitHub
- Click **Settings** tab (top right)
- In the left sidebar, click **Secrets and variables** → **Actions**

#### 2. Add Firebase Secrets

Click **New repository secret** for each of the following:

| Secret Name | Secret Value |
|------------|--------------|
| `VITE_FIREBASE_API_KEY` | `AIzaSyBTPK8YHJSIx0PbsCNlguAcv5QVaIWo9uI` |
| `VITE_FIREBASE_AUTH_DOMAIN` | `tork-cafe5.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | `tork-cafe5` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `tork-cafe5.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `533257019468` |
| `VITE_FIREBASE_APP_ID` | `1:533257019468:web:3c42217c9f11537d5714e9` |
| `VITE_FIREBASE_MEASUREMENT_ID` | `G-8FRRRH3MHC` |

#### 3. Verify Secrets

After adding all secrets, you should see 7 repository secrets listed:
- ✓ VITE_FIREBASE_API_KEY
- ✓ VITE_FIREBASE_AUTH_DOMAIN
- ✓ VITE_FIREBASE_PROJECT_ID
- ✓ VITE_FIREBASE_STORAGE_BUCKET
- ✓ VITE_FIREBASE_MESSAGING_SENDER_ID
- ✓ VITE_FIREBASE_APP_ID
- ✓ VITE_FIREBASE_MEASUREMENT_ID

## Why These Secrets Are Needed

The GitHub Actions deployment workflow uses these secrets to:
1. Build your app with Firebase credentials baked into the production bundle
2. Enable authentication to work on the deployed site (coach.tork.pro)
3. Connect to your Firebase project for user authentication and data storage

## How It Works

### During Build Process

```yaml
# .github/workflows/deploy.yml (excerpt)
- name: Build production bundle
  run: npm run build
  env:
    VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
    VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
    # ... other secrets
```

Vite injects these environment variables into your production build:

```typescript
// src/lib/firebase.ts (excerpt)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  // ... other config
}
```

### In Production

The built JavaScript bundle contains the Firebase configuration, allowing:
- User authentication (sign up, sign in, sign out)
- Firestore database access for user profiles
- Firebase Analytics tracking
- Secure communication with Firebase services

## Security Notes

### Are These Secrets Safe to Use?

**Yes!** Firebase API keys are designed to be public:
- They identify your Firebase project
- Security is enforced by Firebase Security Rules
- Authorized domains limit where auth can be used

### Actual Security Measures

1. **Authorized Domains**: Only coach.tork.pro and verified domains can use Firebase Auth
2. **Firestore Rules**: Database rules control who can read/write data
3. **Authentication**: Users must sign in to access data
4. **Rate Limiting**: Firebase automatically rate limits requests

### What's Protected

- User passwords (hashed by Firebase)
- User data (protected by Firestore rules)
- API requests (rate limited and domain restricted)

## Troubleshooting

### Secret Not Found Error
```
Error: Environment variable VITE_FIREBASE_API_KEY is not set
```
**Solution**: Verify secret name is exactly `VITE_FIREBASE_API_KEY` (case-sensitive)

### Authentication Error on Deployed Site
```
Firebase: Error (auth/unauthorized-domain)
```
**Solution**: Add coach.tork.pro to Firebase Console → Authentication → Authorized domains

### Build Fails After Adding Secrets
- Check GitHub Actions logs for specific error
- Verify all 7 secrets are added correctly
- Ensure secret values don't have extra spaces or quotes

## Next Steps

After adding secrets:

1. ✅ Push code to trigger deployment
   ```bash
   git push origin main
   ```

2. ✅ Monitor GitHub Actions
   - Go to **Actions** tab in your repository
   - Watch the "Deploy to GitHub Pages" workflow
   - Should complete in 2-5 minutes

3. ✅ Test deployed site
   - Visit https://coach.tork.pro
   - Should see login page
   - Create account and sign in
   - Verify dashboard loads with demo data

## Quick Copy-Paste Guide

For each secret, use these exact values (copy from here):

### VITE_FIREBASE_API_KEY
```
AIzaSyBTPK8YHJSIx0PbsCNlguAcv5QVaIWo9uI
```

### VITE_FIREBASE_AUTH_DOMAIN
```
tork-cafe5.firebaseapp.com
```

### VITE_FIREBASE_PROJECT_ID
```
tork-cafe5
```

### VITE_FIREBASE_STORAGE_BUCKET
```
tork-cafe5.firebasestorage.app
```

### VITE_FIREBASE_MESSAGING_SENDER_ID
```
533257019468
```

### VITE_FIREBASE_APP_ID
```
1:533257019468:web:3c42217c9f11537d5714e9
```

### VITE_FIREBASE_MEASUREMENT_ID
```
G-8FRRRH3MHC
```

---

**Once all secrets are added, your app will deploy successfully! 🚀**
