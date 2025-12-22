# Firebase Setup Guide

This application uses Firebase for authentication and data storage. Follow these steps to set up Firebase for your project.

> **Note:** The application will work in demo mode without Firebase configuration. To enable full authentication and data persistence, complete this setup.

## Quick Start

1. Create a Firebase project
2. Enable Email/Password authentication
3. Create a Firestore database
4. Copy your Firebase config to `.env` file
5. Restart your development server

## Detailed Setup Instructions

### 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com)
2. Click "Add project"
3. Enter a project name (e.g., "Tork Coach")
4. Follow the setup wizard (you can disable Google Analytics if not needed)
5. Click "Create project"

### 2. Enable Authentication

1. In your Firebase project, click on "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Click on "Email/Password"
5. Toggle the "Enable" switch to ON
6. Click "Save"

### 3. Create Firestore Database

1. Click on "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in production mode" (we'll set up security rules next)
4. Select a location closest to your users
5. Click "Enable"

### 4. Set Up Security Rules

In Firestore, go to the "Rules" tab and replace the default rules with:

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
    
    match /clients/{clientId} {
      allow read, write: if isCoachOrAdmin();
    }
    
    match /programs/{programId} {
      allow read, write: if isCoachOrAdmin();
    }
    
    match /checkIns/{checkInId} {
      allow read, write: if isCoachOrAdmin();
    }
    
    match /messages/{messageId} {
      allow read, write: if isCoachOrAdmin();
    }
    
    match /activities/{activityId} {
      allow read, write: if isCoachOrAdmin();
    }
    
    match /insights/{insightId} {
      allow read, write: if isCoachOrAdmin();
    }
    
    match /notifications/{notificationId} {
      allow read, write: if isCoachOrAdmin();
    }
  }
}
```

Click "Publish" to save the rules.

### 5. Get Your Firebase Configuration

1. In the Firebase Console, click on the **gear icon** (⚙️) next to "Project Overview"
2. Select **"Project settings"**
3. Scroll down to **"Your apps"** section
4. If you don't see a web app yet, click the **</>** (web) icon to add one
5. Register your app with a nickname (e.g., "Tork Coach Web")
6. You don't need to set up Firebase Hosting - just click "Continue to console"
7. Copy the `firebaseConfig` object values

It will look something like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyA...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### 6. Configure Your Application

1. In your project root directory, create a file named `.env` (if it doesn't exist)
2. Copy the template from `.env.example`
3. Fill in your Firebase configuration values:

```env
VITE_FIREBASE_API_KEY=AIzaSyA...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

**Important:** 
- Replace each value with your actual Firebase config values
- Do NOT commit the `.env` file to version control (it's already in `.gitignore`)
- Each value should be on its own line without quotes

### 7. Restart Your Application

After creating your `.env` file:

1. Stop your development server (Ctrl+C or Cmd+C)
2. Restart it: `npm run dev`
3. The application will now use your Firebase configuration

### 8. Create Your First Coach Account

1. Navigate to the application login page
2. Click **"Don't have an account? Sign up"**
3. Fill in the form:
   - **Full Name:** Your name
   - **Email:** Your email address
   - **Password:** At least 6 characters
4. Click **"Create Account"**
5. You'll be automatically signed in as a coach

Your account will be created with the `coach` role by default, giving you full access to all features.

## Testing Your Setup

To verify everything is working:

1. Sign up with a test account
2. Check Firebase Console > Authentication - you should see your new user
3. Check Firebase Console > Firestore Database > users collection - you should see your user document
4. Try creating demo data in the app

## Demo Mode (No Firebase Required)

If you don't configure Firebase, the app will work in demo mode:

- Click "Enter Demo Mode" on the login page
- All data is stored locally in the browser
- Perfect for testing and development
- Data persists in browser storage

## Troubleshooting

### "Firebase not configured" Warning

**Solution:** Make sure your `.env` file exists and contains all required variables. Restart your dev server after creating/editing `.env`.

### "Permission Denied" Error

**Solution:** Verify that:
1. Firestore security rules are published
2. Your user document exists in the `users` collection
3. The user document has a `role` field set to `'coach'` or `'admin'`

### "Invalid API Key" Error

**Solution:** 
1. Double-check your API key in `.env` matches Firebase Console
2. Make sure there are no extra spaces or quotes in `.env`
3. Restart your development server

### Authentication Not Working

**Solution:**
1. Go to Firebase Console > Authentication > Sign-in method
2. Ensure Email/Password is enabled
3. Check that your domain is authorized (for production deployments)

### User Document Not Created

**Solution:** If you created an account but can't access the app:
1. Go to Firebase Console > Firestore Database
2. Navigate to the `users` collection
3. Find your user document (by UID)
4. Manually add these fields if missing:
   - `email`: your email
   - `displayName`: your name
   - `role`: `"coach"`
   - `createdAt`: current timestamp

## Security Best Practices

### ✅ DO:
- Keep your `.env` file private (never commit to git)
- Use strong passwords for user accounts
- Review Firestore security rules regularly
- Enable Firebase App Check for production
- Set up proper CORS policies

### ❌ DON'T:
- Expose Firebase config in client-side code (it's public by design, but protected by security rules)
- Share your service account keys
- Disable security rules in production
- Use the same Firebase project for dev and production

## Advanced Configuration

### Firebase Emulator (Local Development)

For offline development without using production Firebase:

```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize emulators
firebase init emulators

# Select Authentication and Firestore
# Accept default ports (9099 for Auth, 8080 for Firestore)

# Add to your .env:
VITE_USE_FIREBASE_EMULATOR=true

# Start emulators
firebase emulators:start
```

### Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_FIREBASE_API_KEY` | Your Firebase API key | `AIzaSyA...` |
| `VITE_FIREBASE_AUTH_DOMAIN` | Authentication domain | `your-app.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID | `your-app` |
| `VITE_FIREBASE_STORAGE_BUCKET` | Cloud Storage bucket | `your-app.appspot.com` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Messaging sender ID | `123456789` |
| `VITE_FIREBASE_APP_ID` | Firebase app ID | `1:123:web:abc` |
| `VITE_USE_FIREBASE_EMULATOR` | Use local emulator | `true` or `false` |

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Authentication Guide](https://firebase.google.com/docs/auth)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Console](https://console.firebase.google.com)

## Support

If you encounter issues not covered in this guide:

1. Check the browser console for error messages
2. Review the Firebase Console for authentication/database errors
3. Ensure all environment variables are correctly set
4. Try demo mode to isolate if the issue is Firebase-related

## Next Steps

Once Firebase is configured:

1. ✅ Create your coach account
2. ✅ Explore the dashboard
3. ✅ Add demo clients to test features
4. ✅ Generate AI insights for check-ins
5. ✅ Configure your trainer profile

Your Tork Coach platform is now ready for production use!
