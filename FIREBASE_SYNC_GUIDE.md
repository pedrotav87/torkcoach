# Firebase Cloud Sync Setup Guide

This guide will help you set up Firebase to sync your Tork Coach data to the cloud, enabling:
- ✅ Data persistence across sessions
- ✅ External access via Firebase console
- ✅ Backup and recovery
- ✅ Multi-device sync

## Prerequisites

1. A Firebase account (free tier is sufficient)
2. Your Tork Coach application running

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select existing project
3. Enter project name (e.g., "tork-coach")
4. Disable Google Analytics (optional for this use case)
5. Click "Create project"

## Step 2: Register Web App

1. In your Firebase project, click the **Web** icon (`</>`)
2. Register app with nickname: "Tork Coach Web"
3. ✅ Check "Also set up Firebase Hosting" (optional)
4. Click "Register app"
5. Copy the configuration object shown

## Step 3: Enable Firestore Database

1. In Firebase Console, go to **Build** → **Firestore Database**
2. Click "Create database"
3. Choose **Production mode** for security
4. Select a location closest to your users
5. Click "Enable"

## Step 4: Configure Security Rules

1. In Firestore Database, go to **Rules** tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User data can only be accessed by the owner
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow authenticated users to read/write their own data
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

3. Click "Publish"

## Step 5: Enable Authentication

1. Go to **Build** → **Authentication**
2. Click "Get started"
3. Enable **Email/Password** provider
4. Click "Save"

## Step 6: Configure Application

1. Create/edit `.env` file in your project root:

```env
# Copy these values from Firebase Console > Project Settings > Your apps
VITE_FIREBASE_API_KEY=AIzaSyA_your_actual_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

2. Restart your development server:
```bash
npm run dev
```

## Step 7: Test Sync

1. Sign in to your Tork Coach application
2. Click the **Cloud Sync** button (cloud icon) in the header
3. Click "Sync to Cloud"
4. Verify success message appears

## Step 8: Verify in Firebase Console

1. Go to Firebase Console → **Firestore Database**
2. Navigate to: `users/{your-user-id}/`
3. You should see collections:
   - `clients`
   - `check-ins`
   - `programs`
   - `activities`
   - `insights`
   - `notifications`

## Using the Sync Feature

### Manual Sync
- Click the cloud icon in the header
- Choose:
  - **Sync to Cloud**: Upload local data to Firebase
  - **Load from Cloud**: Download data from Firebase

### Automatic Sync
The app automatically syncs data when changes are made (when Firebase is configured).

### Viewing Data Externally

#### Via Firebase Console
1. Go to Firestore Database
2. Browse collections under `users/{userId}/`
3. Click any document to view/edit JSON data

#### Via REST API
Firebase provides a REST API to access your data:

```bash
# Get all clients
curl "https://firestore.googleapis.com/v1/projects/YOUR-PROJECT-ID/databases/(default)/documents/users/USER-ID/clients"
```

#### Via Admin SDK (Node.js)
```javascript
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();
const clientsRef = db.collection('users').doc(userId).collection('clients');
const snapshot = await clientsRef.get();
snapshot.forEach(doc => console.log(doc.data()));
```

## Troubleshooting

### "Firebase not configured" error
- Verify `.env` file exists and contains correct values
- Restart dev server after creating `.env`
- Check browser console for detailed error messages

### "Permission denied" errors
- Verify Firestore security rules are published
- Ensure user is signed in
- Check that userId matches in Firestore path

### Data not syncing
- Click manual "Sync to Cloud" button
- Check browser console for errors
- Verify Firebase project is not paused/disabled

### Build Issues
If you encounter build errors:
```bash
npm run build
```

Check the output for specific errors and ensure all environment variables are set in your deployment environment.

## Security Best Practices

1. **Never commit `.env` to git** - It's already in `.gitignore`
2. **Use different projects for dev/prod** - Keep environments separate
3. **Review security rules** - Ensure users can only access their own data
4. **Enable App Check** (optional) - Protect against abuse
5. **Monitor usage** - Set up billing alerts in Firebase Console

## External Access Setup

If you need to access the data from external applications:

1. **Service Account** (recommended for servers):
   - Firebase Console → Project Settings → Service Accounts
   - Generate new private key
   - Use Admin SDK with service account credentials

2. **REST API** (for simple queries):
   - Use Firebase REST API with authentication
   - Generate ID token from Firebase Auth

3. **Cloud Functions** (for complex operations):
   - Deploy Firebase Cloud Functions
   - Access Firestore directly with Admin SDK

## GitHub Pages Deployment

To deploy with Firebase sync enabled:

1. Set secrets in GitHub repository:
   - Go to Settings → Secrets and variables → Actions
   - Add all `VITE_FIREBASE_*` variables

2. Deploy:
```bash
git push origin main
```

3. Verify at: `https://[username].github.io/[repo-name]/`

## Support

For issues:
1. Check Firebase Console → Usage & billing → Logs
2. Check browser developer console
3. Review Firestore security rules
4. Verify authentication is working

---

**Status Check:**
- ✅ Firebase project created
- ✅ Firestore enabled
- ✅ Authentication enabled
- ✅ Security rules configured
- ✅ `.env` file created
- ✅ Application restarted
- ✅ Test sync successful
- ✅ Data visible in Firebase Console
