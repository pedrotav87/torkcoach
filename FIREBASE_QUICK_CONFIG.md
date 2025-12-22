# Firebase Configuration - Quick Reference

1. **Firebase Accou

## ⚡ 3-Step Setup
### Step 1: Create Firebase Project (2 minutes)
1. Go to [Firebase Console](https://console.fireb



1. Click **"Authentication"** in sidebar


1. Click **"Firestore Data
3. Choose **"Production mode"**


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

    }
**Ge
    function isCoach() {
3. Click **</>** (web ico
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['coach', 'admin'];

    
    match /users/{userId} {
      allow read, write: if isAuth() && request.auth.uid == userId;
VITE_
    
VITE_FIREBASE_STORAGE_BUCKET=
      allow read, write: if isCoach();
```
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

- [ ] 
VITE_FIREBASE_API_KEY=

VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
| `VITE_FIREBASE_STOR
```

3. Fill in each value from your Firebase config (after the `=` sign)

**Example of filled `.env`:**
4. **E
VITE_FIREBASE_API_KEY=AIzaSyAbc123def456ghi789jkl012mno345pqr
VITE_FIREBASE_AUTH_DOMAIN=tork-coach-prod.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tork-coach-prod
✅ Verify `.env` file exists in project root (same level 
VITE_FIREBASE_MESSAGING_SENDER_ID=987654321098
VITE_FIREBASE_APP_ID=1:987654321098:web:abc123def456
```

## 🚀 Start the App

```bash

npm run dev
You

Navigate to `http://localhost:5173` and create your account!



- **Architecture:** [ARCHITECT
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




✅ Verify `.env` file exists in project root (same level as `package.json`)  
✅ All 6 variables are filled in  
✅ Restart dev server with `npm run dev`

### "Authentication failed" error

























