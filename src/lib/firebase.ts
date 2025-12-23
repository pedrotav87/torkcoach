// -----------------------------------------------------
// Firebase Initialization (Final Clean Version)
// -----------------------------------------------------

import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// -----------------------------------------------------
// 1. Firebase Config (from .env)
// -----------------------------------------------------
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
}

// Debug logs (optional)
console.log("🔥 Firebase config loaded:", firebaseConfig)

// -----------------------------------------------------
// 2. Initialize Firebase App
// -----------------------------------------------------
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// -----------------------------------------------------
// 3. Export Firebase Services
// -----------------------------------------------------
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

// -----------------------------------------------------
// 4. Analytics (optional, safe dynamic import)
// -----------------------------------------------------
let analytics = null

if (typeof window !== "undefined" && firebaseConfig.measurementId) {
  import("firebase/analytics")
    .then(({ getAnalytics }) => {
      analytics = getAnalytics(app)
    })
    .catch((err) => {
      console.warn("Analytics initialization skipped:", err)
    })
}

export { analytics }