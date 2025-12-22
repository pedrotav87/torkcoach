import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useKV } from '@github/spark/hooks'

interface DemoUser {
  uid: string
  email: string
  displayName: string
  role: string
}

interface AuthContextType {
  user: DemoUser | null
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
  const [currentUser, setCurrentUser] = useKV<DemoUser | null>('auth-user', null)
  const [loading, setLoading] = useState(true)
  const [isCoach, setIsCoach] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      if (currentUser) {
        setIsCoach(currentUser.role === 'coach' || currentUser.role === 'admin')
      } else {
        setIsCoach(false)
      }
      setLoading(false)
    }
    checkAuth()
  }, [currentUser])

  const signIn = async (email: string, password: string) => {
    try {
      const demoUser: DemoUser = {
        uid: `user-${Date.now()}`,
        email,
        displayName: email.split('@')[0],
        role: 'coach'
      }
      
      setCurrentUser(demoUser)
      return { error: null }
    } catch (error) {
      return { error: error as Error }
    }
  }

  const signUp = async (email: string, password: string, metadata?: Record<string, any>) => {
    try {
      const demoUser: DemoUser = {
        uid: `user-${Date.now()}`,
        email,
        displayName: metadata?.displayName || email.split('@')[0],
        role: metadata?.role || 'coach'
      }
      
      setCurrentUser(demoUser)
      return { error: null }
    } catch (error) {
      return { error: error as Error }
    }
  }

  const signOut = async () => {
    setCurrentUser(null)
  }

  const enterDemoMode = () => {
    const demoUser: DemoUser = {
      uid: 'demo-user',
      email: 'demo@torkcoach.com',
      displayName: 'Demo Coach',
      role: 'coach'
    }
    setCurrentUser(demoUser)
  }

  const value: AuthContextType = {
    user: currentUser ?? null,
    loading,
    signIn,
    signUp,
    signOut,
    isCoach,
    enterDemoMode
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
