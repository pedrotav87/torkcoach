# Quick Start Guide - Tork Coach

## For Public/External Access

To make Tork Coach accessible to anyone on the internet with Firebase authentication:

### Step 1: Set Up Firebase (5 minutes)

1. **Create a Firebase project**
   - Go to https://console.firebase.google.com
   - Click "Add project"
   - Name it "Tork Coach" (or your preferred name)
   - Disable Google Analytics (optional)
   - Click "Create project"

2. **Enable Authentication**
   - In Firebase Console, click "Authentication" → "Get started"
   - Click "Sign-in method" tab
   - Enable "Email/Password"
   - Click "Save"

3. **Create Firestore Database**
   - Click "Firestore Database" → "Create database"
   - Choose "Start in production mode"
   - Select your preferred location
   - Click "Enable"

4. **Add Security Rules**
   - In Firestore, go to "Rules" tab
   - Copy the rules from [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) section 4
   - Click "Publish"

5. **Get Your Configuration**
   - Click the gear icon → "Project settings"
   - Scroll to "Your apps" → Click web icon (</>)
   - Register app as "Tork Coach Web"
   - Copy the `firebaseConfig` values

### Step 2: Configure Your App (2 minutes)

1. **Create `.env` file** in the project root:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSy...
   VITE_FIREBASE_AUTH_DOMAIN=tork-coach.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=tork-coach
   VITE_FIREBASE_STORAGE_BUCKET=tork-coach.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abc123
   ```

2. **Replace the values** with your Firebase config from Step 1.5

### Step 3: Run the App

```bash
npm install
npm run dev
```

Navigate to `http://localhost:5173` and you'll see the **Login Page**.

### Step 4: Create Your First Account

1. Click "Sign up"
2. Enter your email, password, and full name
3. Click "Create Account"
4. You're now logged in as a coach!

## Making It Publicly Accessible

### Option 1: Deploy to Firebase Hosting (Recommended)

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

Your app will be live at: `https://your-project-id.web.app`

### Option 2: Deploy to GitHub Pages

```bash
npm run build
# Follow GitHub Pages deployment process
```

### Option 3: Deploy to Vercel/Netlify

Both platforms have automatic deployment from GitHub repositories.

## Security Notes

✅ **Authentication is required** - No one can access the app without signing up
✅ **Role-based access** - All signups are "coach" role by default
✅ **Firestore security rules** - Users can only access their own data
✅ **HTTPS enforced** - All traffic is encrypted

## Troubleshooting

### "Firebase not configured" message
- Make sure your `.env` file exists in the project root
- Verify all environment variables start with `VITE_`
- Restart the dev server after creating `.env`

### "Invalid credentials" error
- Check your Firebase API key is correct
- Verify Email/Password auth is enabled in Firebase Console

### "Permission denied" in Firestore
- Ensure Firestore rules are published correctly
- Check that user documents have a `role` field

## Next Steps

Once you're logged in:

1. **Explore the Dashboard** - Activity feed and client overview
2. **Add Clients** - Navigate to Clients page
3. **Create Programs** - Go to Programs → Workouts
4. **Set Up Your Profile** - Click Trainer Profile in the sidebar

## Support

- Full setup guide: [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)
- Architecture: [ARCHITECTURE.md](./ARCHITECTURE.md)
- Security: [SECURITY_REQUIREMENTS.md](./SECURITY_REQUIREMENTS.md)

---

**Need Help?** Check the Firebase Console for error logs in Authentication and Firestore sections.
