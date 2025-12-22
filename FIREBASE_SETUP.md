# Firebase Setup Guide

This application uses Firebase for authentication and data storage. Follow these steps to set up Firebase for your project.

## 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com)
2. Click "Add project"
3. Enter a project name (e.g., "Tork Coach")
4. Follow the setup wizard (you can disable Google Analytics if not needed)

## 2. Enable Authentication

1. In your Firebase project, click on "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable "Email/Password" authentication
5. Click "Save"

## 3. Create Firestore Database

1. Click on "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in production mode" (we'll set up security rules next)
4. Select a location closest to your users
5. Click "Enable"

## 4. Set Up Security Rules

In Firestore, go to the "Rules" tab and replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Clients collection - only coaches can access
    match /clients/{clientId} {
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['coach', 'admin'];
    }
    
    // Programs collection - only coaches can access
    match /programs/{programId} {
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['coach', 'admin'];
    }
    
    // Check-ins collection - only coaches can access
    match /checkIns/{checkInId} {
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['coach', 'admin'];
    }
    
    // Messages collection - only coaches can access
    match /messages/{messageId} {
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['coach', 'admin'];
    }
    
    // Activities collection - only coaches can access
    match /activities/{activityId} {
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['coach', 'admin'];
    }
    
    // Public links collection - coaches can create, anyone can read active links
    match /publicLinks/{linkId} {
      allow read: if true;
      allow create, update: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['coach', 'admin'];
      allow delete: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['coach', 'admin'];
    }
  }
}
```

## 5. Get Your Firebase Configuration

1. In the Firebase Console, click on the gear icon next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>)
5. Register your app with a nickname (e.g., "Tork Coach Web")
6. Copy the firebaseConfig object

## 6. Configure Your Application

1. Copy `.env.example` to `.env` in your project root
2. Fill in your Firebase configuration values:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 7. Create Your First Coach Account

1. Start your development server: `npm run dev`
2. Navigate to the login page
3. Click "Sign up" and create an account with:
   - Email: your email
   - Password: at least 6 characters
   - Full name: your name
4. The account will be created with the "coach" role by default

## 8. Optional: Set Up Firebase Emulator (Local Development)

For local development without using production Firebase:

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize Firebase: `firebase init`
   - Select "Emulators"
   - Choose "Authentication" and "Firestore"
   - Accept default ports
4. Set in your `.env`: `VITE_USE_FIREBASE_EMULATOR=true`
5. Start emulator: `firebase emulators:start`

## Security Best Practices

1. **Never commit your `.env` file** - It's already in `.gitignore`
2. **Use environment variables** - Keep secrets out of code
3. **Row-level security** - Firestore rules ensure users only access their data
4. **Role-based access** - Only coaches can access client data
5. **Session management** - Firebase handles token refresh automatically

## Making a User an Admin

To make a user an admin (requires Firebase Admin SDK or manual update):

1. Go to Firestore in Firebase Console
2. Navigate to `users` collection
3. Find the user document (by their UID)
4. Edit the `role` field from `coach` to `admin`

## Public Access URLs

Coaches can generate public sharing links for:
- Client profiles
- Programs
- Progress reports

### Creating a Public Link

1. Navigate to the resource you want to share (client, program, etc.)
2. Click the "Share" button
3. Configure link settings:
   - **Expiration**: Choose when the link expires (7, 30, 90 days, or never)
   - **Access limit**: Optionally restrict how many times the link can be viewed
4. Click "Generate Public Link"
5. Copy and share the link

### Managing Public Links

Public links are stored in the `publicLinks` collection in Firestore with the following properties:
- `id`: Unique link identifier
- `type`: Resource type (client, program, progress)
- `resourceId`: ID of the shared resource
- `createdBy`: Coach who created the link
- `createdAt`: Creation timestamp
- `expiresAt`: Expiration timestamp (optional)
- `accessCount`: Number of times link has been accessed
- `maxAccess`: Maximum allowed accesses (optional)
- `isActive`: Whether the link is active

### Security Considerations

- Public links allow **read-only** access to specific resources
- Links can be deactivated at any time by the coach
- Expired or maxed-out links return a 404
- No authentication required to view public links
- Access is tracked and logged

## Troubleshooting

### Authentication Error
- Verify your API key is correct
- Check that Email/Password auth is enabled in Firebase Console

### Permission Denied
- Verify Firestore security rules are set up correctly
- Check that the user has the correct role in their user document

### Missing User Data
- Ensure the user document is created in Firestore during signup
- Check the `users/{uid}` document exists

## Support

For issues with Firebase setup, consult:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Authentication Guide](https://firebase.google.com/docs/auth)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
