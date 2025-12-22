import { initializeApp, getApps } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDemoKeyForLocalDevelopment123456789',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'demo-tork-coach.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'demo-tork-coach',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'demo-tork-coach.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789012',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:123456789012:web:abc123def456'
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

export const isFirebaseConfigured = () => {
  return import.meta.env.VITE_FIREBASE_API_KEY && 
    import.meta.env.VITE_FIREBASE_API_KEY !== 'AIzaSyDemoKeyForLocalDevelopment123456789'
}

if (import.meta.env.DEV && import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true') {
  try {
    connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })
    connectFirestoreEmulator(db, 'localhost', 8080)
  } catch (error) {
    console.warn('Firebase emulator connection failed:', error)
  }
}
