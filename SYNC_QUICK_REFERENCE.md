# Cloud Sync Quick Reference

## What is Cloud Sync?

Cloud Sync automatically backs up your Tork Coach data to Firebase Firestore, enabling:
- ✅ Data persistence across browser sessions
- ✅ Access from multiple devices
- ✅ External data access via API
- ✅ Integration with third-party tools
- ✅ Backup and disaster recovery

## Setup (2 minutes)

1. **Create `.env` file** in project root:
```env
VITE_FIREBASE_API_KEY=AIzaSyBTPK8YHJSIx0PbsCNlguAcv5QVaIWo9uI
VITE_FIREBASE_AUTH_DOMAIN=tork-cafe5.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tork-cafe5
VITE_FIREBASE_STORAGE_BUCKET=tork-cafe5.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=533257019468
VITE_FIREBASE_APP_ID=1:533257019468:web:3c42217c9f11537d5714e9
VITE_FIREBASE_MEASUREMENT_ID=G-8FRRRH3MHC
```

2. **Restart dev server**:
```bash
npm run dev
```

3. **Done!** Cloud sync is now active.

## Using Cloud Sync

### Automatic Sync
- Data syncs automatically when you make changes
- No manual intervention needed
- Works in the background

### Manual Sync
1. Click the **cloud icon** in the header
2. View sync status dialog
3. Click "Sync to Cloud" to upload
4. Click "Load from Cloud" to download

### Sync Status Indicators
- ☁️ **Cloud icon** - Sync available
- 🔄 **Spinning** - Currently syncing
- ✓ **Green** - Sync successful
- ⚠️ **Red** - Sync error
- 🚫 **Offline badge** - Firebase not configured

## Data Structure

All data is stored in Firestore at:
```
users/
  {your-user-id}/
    clients/          - All client records
    programs/         - Training programs
    check-ins/        - Weekly check-ins
    insights/         - AI insights
    activities/       - Activity feed
    notifications/    - System notifications
```

## Accessing Your Data

### 1. Firebase Console (Easiest)
1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Select project: **tork-cafe5**
3. Navigate to **Firestore Database**
4. Browse: `users` → `{your-id}` → select collection

### 2. REST API
```bash
# Get all clients
curl "https://firestore.googleapis.com/v1/projects/tork-cafe5/databases/(default)/documents/users/YOUR_USER_ID/clients" \
  -H "Authorization: Bearer YOUR_ID_TOKEN"
```

### 3. Node.js (Admin SDK)
```javascript
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

const clients = await db
  .collection('users')
  .doc(userId)
  .collection('clients')
  .get();
```

### 4. Python
```python
from firebase_admin import firestore
db = firestore.client()

clients = db.collection('users').document(user_id).collection('clients').get()
```

## Common Tasks

### Export All Data
```javascript
// In browser console or Node.js
const userId = 'your-user-id';
const syncService = createSyncService(userId);
const data = await syncService.loadAll();
console.log(JSON.stringify(data, null, 2));
```

### Backup to File
1. Click cloud icon
2. View data in dialog
3. Copy or export as needed

### Restore from Cloud
1. Click cloud icon
2. Click "Load from Cloud"
3. Data restored to local storage

## Troubleshooting

### "Firebase not configured"
- Create `.env` file with Firebase config
- Restart dev server
- Refresh browser

### "Permission denied"
- Sign in to the application
- Verify you're authenticated
- Check Firebase Console → Authentication

### Data not syncing
- Check internet connection
- Verify Firebase project is active
- Click manual "Sync to Cloud"

### Build errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
npm run build
```

## Security

### Current Setup
- Your project ID: `tork-cafe5`
- Auth domain: `tork-cafe5.firebaseapp.com`
- Data access: Authenticated users only
- Rules: Users can only access their own data

### Best Practices
- ✅ Never commit `.env` to git (already in `.gitignore`)
- ✅ Use different projects for dev/prod
- ✅ Monitor usage in Firebase Console
- ✅ Set billing alerts

## GitHub Deployment

To deploy with sync enabled:

1. **Add secrets** in GitHub repo:
   - Settings → Secrets → Actions
   - Add all `VITE_FIREBASE_*` variables

2. **Push to main**:
```bash
git add .
git commit -m "Enable cloud sync"
git push origin main
```

3. **Verify**: Visit your GitHub Pages URL

## Need Help?

**Quick Guides:**
- [FIREBASE_SYNC_GUIDE.md](./FIREBASE_SYNC_GUIDE.md) - Complete setup guide
- [EXTERNAL_DATA_ACCESS.md](./EXTERNAL_DATA_ACCESS.md) - API access guide
- [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) - Firebase configuration

**Support:**
- Check Firebase Console → Logs
- Review browser console (F12)
- Verify authentication status

---

## Quick Status Check

Run through this checklist:

- [ ] `.env` file created with Firebase config
- [ ] Dev server restarted
- [ ] Signed in to application
- [ ] Cloud icon visible in header
- [ ] Manual sync works
- [ ] Data visible in Firebase Console
- [ ] GitHub secrets configured (for deployment)

**All checked?** You're ready to go! 🚀
