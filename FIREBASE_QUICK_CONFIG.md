# Firebase Configuration - Quick Reference

## 🔥 What You Need

1. **Firebase Account** (free) - [console.firebase.google.com](https://console.firebase.google.com)
2. **6 Configuration Values** - From your Firebase project settings
3. **`.env` File** - Created in your project root

## ⚡ 3-Step Setup

### Step 1: Create Firebase Project (2 minutes)

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Add project"**
3. Name it (e.g., "Tork Coach")
4. Click through the wizard → **"Create project"**

### Step 2: Enable Services (3 minutes)

**Enable Authentication:**
1. Click **"Authentication"** in sidebar
2. Click **"Get started"**
3. Click **"Email/Password"**
4. Toggle **Enable** → **Save**

**Enable Firestore:**
1. Click **"Firestore Database"** in sidebar
2. Click **"Create database"**
3. Choose **"Production mode"**
4. Select your **location** → **Enable**

**Add Security Rules:**
1. In Firestore, click **"Rules"** tab
2. Paste this code:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAuth() {
      return request.auth != null;
    }
    
    function isCoach() {
      return isAuth() && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['coach', 'admin'];
    }
    
    match /users/{userId} {
      allow read, write: if isAuth() && request.auth.uid == userId;
    }
    
    match /{collection}/{document=**} {
      allow read, write: if isCoach();
    }
  }
}
```

3. Click **"Publish"**

### Step 3: Get Configuration & Configure App (2 minutes)

**Get Your Config:**
1. Click **⚙️ (gear icon)** → **"Project settings"**
2. Scroll to **"Your apps"**
3. Click **</>** (web icon)
4. Register app (name it "Tork Coach Web")
5. **Copy** the config values

**Create `.env` File:**
1. In your project root, create a file named `.env`
2. Copy this template:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

3. Fill in each value from your Firebase config (after the `=` sign)

**Example of filled `.env`:**
```env
VITE_FIREBASE_API_KEY=AIzaSyAbc123def456ghi789jkl012mno345pqr
VITE_FIREBASE_AUTH_DOMAIN=tork-coach-prod.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tork-coach-prod
VITE_FIREBASE_STORAGE_BUCKET=tork-coach-prod.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=987654321098
VITE_FIREBASE_APP_ID=1:987654321098:web:abc123def456
```

## 🚀 Start the App

```bash
npm install
npm run dev
```

Navigate to `http://localhost:5173` and create your account!

## ✅ Checklist

- [ ] Firebase project created
- [ ] Email/Password authentication enabled
- [ ] Firestore database created
- [ ] Security rules published
- [ ] `.env` file created with all 6 values
- [ ] Dev server restarted

## 🎯 What Each Config Value Does

| Variable | What It Is | Example |
|----------|-----------|---------|
| `VITE_FIREBASE_API_KEY` | Public API key for Firebase | `AIzaSyA...` |
| `VITE_FIREBASE_AUTH_DOMAIN` | Authentication domain | `your-app.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Your project identifier | `your-app` |
| `VITE_FIREBASE_STORAGE_BUCKET` | File storage location | `your-app.appspot.com` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Cloud messaging ID | `123456789` |
| `VITE_FIREBASE_APP_ID` | Your app's unique ID | `1:123:web:abc` |

## ❌ Common Mistakes

1. **Forgot to create `.env` file** → App shows "Firebase not configured"
2. **Typo in environment variable names** → Must start with `VITE_`
3. **Didn't restart dev server** → Changes in `.env` require restart
4. **Extra spaces or quotes** → Copy values exactly, no quotes needed
5. **Wrong API key** → Double-check you copied from correct project

## 🆘 Troubleshooting

### "Firebase not configured" message
✅ Verify `.env` file exists in project root (same level as `package.json`)  
✅ All 6 variables are filled in  
✅ Restart dev server with `npm run dev`

### "Authentication failed" error
✅ Email/Password auth is enabled in Firebase Console  
✅ Check API key is correct  
✅ Try creating new account instead of signing in

### "Permission denied" in app
✅ Firestore security rules are published  
✅ User account has `role: "coach"` in Firestore `users` collection

## 🔒 Security Note

Your Firebase API key is **safe to expose in frontend code**. Firebase security is enforced by:
- Authentication (users must sign in)
- Firestore Security Rules (control what users can access)
- Your `.env` file should still be in `.gitignore` to keep config organized

## 📚 More Help

- **Quick Start:** [QUICKSTART.md](./QUICKSTART.md)
- **Full Setup Guide:** [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)
- **Architecture:** [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Firebase Docs:** [firebase.google.com/docs](https://firebase.google.com/docs)

---

**Total Setup Time: ~7 minutes** ⏱️
