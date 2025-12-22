import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db, isFirebaseConfigured } from '@/lib/firebase'

interface AppUser {
  uid: string
  email: string
  displayName: string
  role: string
}

interface AuthContextType {
  user: AppUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signUp: (email: string, password: string, metadata?: Record<string, any>) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
  isCoach: boolean
  enterDemoMode: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [isCoach, setIsCoach] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      try {
        if (firebaseUser) {
          const userDocRef = doc(db, 'users', firebaseUser.uid)
          
          let userData: any = null
          if (isFirebaseConfigured()) {
            try {
              const userDoc = await getDoc(userDocRef)
              if (userDoc.exists()) {
                userData = userDoc.data()
              }
            } catch (error) {
              console.error('Error fetching user data:', error)
            }
          }
          
          const appUser: AppUser = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: userData?.displayName || firebaseUser.email?.split('@')[0] || 'Coach',
            role: userData?.role || 'coach'
          }
          setCurrentUser(appUser)
          setIsCoach(appUser.role === 'coach' || appUser.role === 'admin')
        } else {
          setCurrentUser(null)
          setIsCoach(false)
        }
      } catch (error) {
        console.error('Auth state change error:', error)
        setCurrentUser(null)
        setIsCoach(false)
      } finally {
        setLoading(false)
      }
    })

    return unsubscribe
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      return { error: null }
    } catch (error) {
      return { error: error as Error }
    }
  }

  const signUp = async (email: string, password: string, metadata?: Record<string, any>) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      
      if (isFirebaseConfigured()) {
        try {
          const userDocRef = doc(db, 'users', userCredential.user.uid)
          await setDoc(userDocRef, {
            email,
            displayName: metadata?.displayName || email.split('@')[0],
            role: metadata?.role || 'coach',
            createdAt: new Date().toISOString()
          })
        } catch (error) {
          console.error('Error creating user document:', error)
        }
      }
      
      return { error: null }
    } catch (error) {
      return { error: error as Error }
    }
  }

  const signOut = async () => {
    await firebaseSignOut(auth)
  }

  const enterDemoMode = async () => {
    if (!isFirebaseConfigured()) {
      const demoUser: AppUser = {
        uid: 'demo-user-id',
        email: 'demo@torkcoach.com',
        displayName: 'Demo Coach',
        role: 'coach'
      }
      setCurrentUser(demoUser)
      setIsCoach(true)
      return
    }
    
    try {
      await signInWithEmailAndPassword(auth, 'demo@torkcoach.com', 'demo123456')
    } catch (error) {
      console.error('Demo mode error:', error)
    }
  }

  const value: AuthContextType = {
    user: currentUser,
    loading,
    signIn,
    signUp,
    signOut,
    isCoach,
    enterDemoMode
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
