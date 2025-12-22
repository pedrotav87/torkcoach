import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Logo } from '@/components/Logo'
import { Spinner, Eye } from '@phosphor-icons/react'
import { toast } from 'sonner'

export const LoginPage = () => {
  const { signIn, signUp, enterDemoMode } = useAuth()
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)

  const isFirebaseConfigured = import.meta.env.VITE_FIREBASE_API_KEY && 
    import.meta.env.VITE_FIREBASE_API_KEY !== 'demo-api-key'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password, {
          displayName: fullName,
          role: 'coach'
        })
        
        if (error) {
          const errorMessage = error.message.includes('email-already-in-use') 
            ? 'This email is already registered'
            : error.message.includes('weak-password')
            ? 'Password should be at least 6 characters'
            : error.message.includes('invalid-email')
            ? 'Invalid email address'
            : error.message
          toast.error('Sign up failed', { description: errorMessage })
        } else {
          toast.success('Account created!', { description: 'Welcome to Tork Coach' })
        }
      } else {
        const { error } = await signIn(email, password)
        
        if (error) {
          const errorMessage = error.message.includes('user-not-found') || error.message.includes('wrong-password') || error.message.includes('invalid-credential')
            ? 'Invalid email or password'
            : error.message.includes('too-many-requests')
            ? 'Too many failed attempts. Please try again later'
            : error.message
          toast.error('Login failed', { description: errorMessage })
        } else {
          toast.success('Welcome back!')
        }
      }
    } catch (error) {
      toast.error('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleDemoMode = () => {
    enterDemoMode()
    toast.success('Entering demo mode...', { description: 'Using demo credentials' })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size="lg" />
          </div>
          <p className="text-muted-foreground">Professional Bodybuilding CRM Platform</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{isSignUp ? 'Create Account' : 'Welcome Back'}</CardTitle>
            <CardDescription>
              {isSignUp 
                ? 'Start coaching your clients today' 
                : 'Sign in to manage your clients'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isFirebaseConfigured && (
              <>
                <div className="mb-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                  <p className="text-sm text-warning-foreground">
                    <strong>Demo Mode:</strong> Firebase not configured. Using demo authentication.
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mb-4" 
                  onClick={handleDemoMode}
                  type="button"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Enter Demo Mode
                </Button>
                <div className="relative mb-4">
                  <Separator />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                    or
                  </span>
                </div>
              </>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="coach@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  minLength={6}
                />
                {isSignUp && (
                  <p className="text-xs text-muted-foreground">
                    Password must be at least 6 characters
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner className="w-4 h-4 mr-2 animate-spin" />
                    {isSignUp ? 'Creating account...' : 'Signing in...'}
                  </>
                ) : (
                  isSignUp ? 'Create Account' : 'Sign In'
                )}
              </Button>

              <div className="text-center text-sm">
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-primary hover:underline"
                  disabled={loading}
                >
                  {isSignUp 
                    ? 'Already have an account? Sign in' 
                    : "Don't have an account? Sign up"}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>

        {isFirebaseConfigured ? (
          <p className="text-center text-xs text-muted-foreground mt-6">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        ) : (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground text-center mb-2">
              <strong>Setup Instructions:</strong>
            </p>
            <p className="text-xs text-muted-foreground">
              Configure Firebase by creating a .env file with your Firebase credentials. 
              See FIREBASE_SETUP.md for detailed instructions.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
