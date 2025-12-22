# External Data Access Guide

This guide explains how to access your Tork Coach data from external applications, scripts, or services.

## Overview

All application data is stored in Firebase Firestore with the following structure:

```
users/
  {userId}/
    clients/
      {clientId}/
        - Client data (name, email, profile, metrics, etc.)
    programs/
      {programId}/
        - Training programs
    check-ins/
      {checkInId}/
        - Weekly check-in submissions
    insights/
      {insightId}/
        - AI-generated insights
    activities/
      {activityId}/
        - Activity feed items
    notifications/
      {notificationId}/
        - System notifications
```

## Method 1: Firebase Console (Web UI)

### Access Steps
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (e.g., "tork-cafe5")
3. Navigate to **Firestore Database**
4. Browse to: `users` → `{your-user-id}` → choose collection

### Features
- ✅ View all data in JSON format
- ✅ Edit documents directly
- ✅ Add new documents
- ✅ Delete documents
- ✅ Export collections
- ✅ Query with filters

### Getting Your User ID
1. Sign in to Tork Coach app
2. Open browser console (F12)
3. Type: `await spark.user()`
4. Copy the `id` field

## Method 2: Firebase REST API

### Authentication
First, get your ID token:

```bash
# Sign in and get ID token
curl -X POST 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "your@email.com",
    "password": "yourpassword",
    "returnSecureToken": true
  }'
```

Save the `idToken` from the response.

### Query Data

#### Get All Clients
```bash
curl -X GET \
  'https://firestore.googleapis.com/v1/projects/tork-cafe5/databases/(default)/documents/users/USER_ID/clients' \
  -H 'Authorization: Bearer YOUR_ID_TOKEN'
```

#### Get Specific Client
```bash
curl -X GET \
  'https://firestore.googleapis.com/v1/projects/tork-cafe5/databases/(default)/documents/users/USER_ID/clients/CLIENT_ID' \
  -H 'Authorization: Bearer YOUR_ID_TOKEN'
```

#### Get Check-ins
```bash
curl -X GET \
  'https://firestore.googleapis.com/v1/projects/tork-cafe5/databases/(default)/documents/users/USER_ID/check-ins' \
  -H 'Authorization: Bearer YOUR_ID_TOKEN'
```

#### Create New Client (POST)
```bash
curl -X POST \
  'https://firestore.googleapis.com/v1/projects/tork-cafe5/databases/(default)/documents/users/USER_ID/clients' \
  -H 'Authorization: Bearer YOUR_ID_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "fields": {
      "name": {"stringValue": "John Doe"},
      "email": {"stringValue": "john@example.com"},
      "status": {"stringValue": "active"}
    }
  }'
```

## Method 3: Firebase Admin SDK (Node.js)

### Setup

1. Install dependencies:
```bash
npm install firebase-admin
```

2. Get service account key:
   - Firebase Console → Project Settings → Service Accounts
   - Click "Generate new private key"
   - Save as `serviceAccountKey.json`

3. Initialize in your Node.js app:

```javascript
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
```

### Example Queries

#### Get All Clients
```javascript
async function getAllClients(userId) {
  const clientsRef = db
    .collection('users')
    .doc(userId)
    .collection('clients');
    
  const snapshot = await clientsRef.get();
  
  const clients = [];
  snapshot.forEach(doc => {
    clients.push({
      id: doc.id,
      ...doc.data()
    });
  });
  
  return clients;
}

// Usage
const clients = await getAllClients('your-user-id');
console.log(clients);
```

#### Get Recent Check-ins
```javascript
async function getRecentCheckIns(userId, limit = 10) {
  const checkInsRef = db
    .collection('users')
    .doc(userId)
    .collection('check-ins')
    .orderBy('date', 'desc')
    .limit(limit);
    
  const snapshot = await checkInsRef.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
```

#### Add New Client
```javascript
async function addClient(userId, clientData) {
  const clientRef = db
    .collection('users')
    .doc(userId)
    .collection('clients')
    .doc();
    
  await clientRef.set({
    ...clientData,
    id: clientRef.id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  
  return clientRef.id;
}

// Usage
const newClientId = await addClient('your-user-id', {
  name: 'Jane Smith',
  email: 'jane@example.com',
  status: 'active',
  profile: {
    age: 28,
    gender: 'female',
    goals: ['Build muscle', 'Improve strength']
  }
});
```

#### Update Client
```javascript
async function updateClient(userId, clientId, updates) {
  const clientRef = db
    .collection('users')
    .doc(userId)
    .collection('clients')
    .doc(clientId);
    
  await clientRef.update({
    ...updates,
    updatedAt: new Date().toISOString()
  });
}

// Usage
await updateClient('your-user-id', 'client-123', {
  status: 'needs-attention',
  'metrics.currentWeight': 175
});
```

#### Query Clients by Status
```javascript
async function getClientsByStatus(userId, status) {
  const clientsRef = db
    .collection('users')
    .doc(userId)
    .collection('clients')
    .where('status', '==', status);
    
  const snapshot = await clientsRef.get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Usage
const activeClients = await getClientsByStatus('your-user-id', 'active');
```

## Method 4: Python SDK

### Setup
```bash
pip install firebase-admin
```

### Usage
```python
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize
cred = credentials.Certificate('serviceAccountKey.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

# Get all clients
def get_all_clients(user_id):
    clients_ref = db.collection('users').document(user_id).collection('clients')
    clients = clients_ref.stream()
    
    return [{'id': client.id, **client.to_dict()} for client in clients]

# Get check-ins
def get_check_ins(user_id, limit=10):
    check_ins_ref = (db.collection('users')
                      .document(user_id)
                      .collection('check-ins')
                      .order_by('date', direction=firestore.Query.DESCENDING)
                      .limit(limit))
    
    return [{'id': doc.id, **doc.to_dict()} for doc in check_ins_ref.stream()]

# Usage
clients = get_all_clients('your-user-id')
for client in clients:
    print(f"{client['name']} - {client['email']}")
```

## Method 5: Export to JSON

### Via Firebase Console
1. Go to Firestore Database
2. Click the ⋮ menu on any collection
3. Select "Export collection"
4. Choose format and download

### Via gcloud CLI
```bash
# Install gcloud
# https://cloud.google.com/sdk/docs/install

# Authenticate
gcloud auth login

# Export all data
gcloud firestore export gs://YOUR_BUCKET_NAME/exports

# Export specific collection
gcloud firestore export gs://YOUR_BUCKET_NAME/exports \
  --collection-ids=clients,check-ins
```

## Method 6: Integrate with External Services

### Zapier Integration
1. Use "Firebase" trigger in Zapier
2. Connect your Firebase project
3. Set up automation (e.g., new check-in → send email)

### Make (Integromat)
1. Add Firebase module
2. Use service account for authentication
3. Create workflows

### n8n (Self-hosted automation)
1. Install Firebase nodes
2. Use REST API or Admin SDK
3. Build custom workflows

## Security Considerations

### Firestore Security Rules
Current rules restrict access to authenticated users:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Best Practices
1. **Never expose service account keys** in client-side code
2. **Use ID tokens** for REST API calls (expire after 1 hour)
3. **Refresh tokens** for long-running applications
4. **Monitor access** in Firebase Console → Usage & billing → Logs
5. **Set up billing alerts** to prevent unexpected costs

## Common Use Cases

### Export Weekly Report
```javascript
async function exportWeeklyReport(userId) {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  const checkInsRef = db
    .collection('users')
    .doc(userId)
    .collection('check-ins')
    .where('date', '>=', oneWeekAgo.toISOString());
    
  const snapshot = await checkInsRef.get();
  const checkIns = snapshot.docs.map(doc => doc.data());
  
  // Generate CSV or PDF report
  return checkIns;
}
```

### Sync to Google Sheets
```javascript
const { GoogleSpreadsheet } = require('google-spreadsheet');

async function syncToSheets(userId, sheetId) {
  const clients = await getAllClients(userId);
  
  const doc = new GoogleSpreadsheet(sheetId);
  await doc.useServiceAccountAuth(credentials);
  await doc.loadInfo();
  
  const sheet = doc.sheetsByIndex[0];
  await sheet.clear();
  await sheet.setHeaderRow(['Name', 'Email', 'Status', 'Last Check-in']);
  
  const rows = clients.map(client => ({
    'Name': client.name,
    'Email': client.email,
    'Status': client.status,
    'Last Check-in': client.lastCheckIn || 'N/A'
  }));
  
  await sheet.addRows(rows);
}
```

### Automated Backup
```javascript
const cron = require('node-cron');

// Run daily at 2 AM
cron.schedule('0 2 * * *', async () => {
  const backup = await getAllData('your-user-id');
  
  // Save to S3, local file, or email
  fs.writeFileSync(
    `backup-${new Date().toISOString()}.json`,
    JSON.stringify(backup, null, 2)
  );
  
  console.log('Backup completed');
});
```

## Troubleshooting

### "Permission denied" errors
- Verify security rules allow your access
- Check authentication token is valid
- Ensure user ID matches

### "Project not found"
- Verify project ID in Firebase Console
- Check service account permissions

### Rate limits
- Firebase has quotas for free tier
- Upgrade to Blaze plan for production use
- Implement exponential backoff for retries

## Support Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore REST API Reference](https://firebase.google.com/docs/firestore/use-rest-api)
- [Admin SDK Reference](https://firebase.google.com/docs/admin/setup)
- [Security Rules Guide](https://firebase.google.com/docs/firestore/security/get-started)

---

**Quick Reference:**
- Project ID: `tork-cafe5`
- Auth Domain: `tork-cafe5.firebaseapp.com`
- Firestore Root: `users/{userId}/`
- Collections: `clients`, `programs`, `check-ins`, `insights`, `activities`, `notifications`
