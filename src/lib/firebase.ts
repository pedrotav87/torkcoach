import { initializeApp, getApps } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyBTPK8YHJSIx0PbsCNlguAcv5QVaIWo9uI',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'tork-cafe5.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'tork-cafe5',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'tork-cafe5.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '533257019468',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:533257019468:web:3c42217c9f11537d5714e9',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-8FRRRH3MHC'
}

let app
try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
} catch (error) {
  console.error('Firebase initialization error:', error)
  app = getApps()[0]
}

export const auth = getAuth(app)
export const db = getFirestore(app)

let analytics
if (typeof window !== 'undefined' && firebaseConfig.measurementId) {
  try {
    analytics = getAnalytics(app)
  } catch (error) {
    console.warn('Analytics initialization skipped:', error)
  }
}

export { analytics }

export const isFirebaseConfigured = () => {
  return import.meta.env.VITE_FIREBASE_API_KEY && 
    import.meta.env.VITE_FIREBASE_API_KEY !== 'AIzaSyBTPK8YHJSIx0PbsCNlguAcv5QVaIWo9uI'
}

if (import.meta.env.DEV && import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true') {
  try {
    connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })
    connectFirestoreEmulator(db, 'localhost', 8080)
  } catch (error) {
    console.warn('Firebase emulator connection failed:', error)
  }
}
