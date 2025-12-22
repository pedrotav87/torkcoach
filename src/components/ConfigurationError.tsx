import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Barbell, WarningCircle, Copy, Check } from '@phosphor-icons/react'
import { useState } from 'react'

export function ConfigurationError() {
  const [copied, setCopied] = useState(false)

  const envContent = `VITE_FIREBASE_API_KEY=AIzaSyA_your_actual_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(envContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <Barbell className="w-6 h-6 text-primary-foreground" weight="bold" />
            </div>
            <div>
              <CardTitle className="text-2xl">Tork Coach</CardTitle>
              <CardDescription>Firebase Configuration Required</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <WarningCircle className="w-5 h-5" />
            <AlertDescription>
              Firebase environment variables are not configured. The application requires a valid Firebase connection for authentication and data storage.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Quick Setup Instructions:</h3>
            
            <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
              <li>Create a Firebase project at <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">console.firebase.google.com</a></li>
              <li>Enable Email/Password authentication in the Authentication section</li>
              <li>Create a Firestore database in production mode</li>
              <li>Copy your project configuration from Project Settings</li>
              <li>Create a <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.env</code> file in the project root directory</li>
              <li>Add the following content to your <code className="bg-muted px-1.5 py-0.5 rounded text-xs">.env</code> file:</li>
            </ol>

            <div className="relative">
              <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto border">
                {envContent}
              </pre>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2"
                onClick={handleCopy}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>

            <ol start={7} className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
              <li>Replace the placeholder values with your actual Firebase configuration</li>
              <li>Restart the development server</li>
            </ol>
          </div>

          <div className="pt-4 border-t">
            <p className="text-xs text-muted-foreground mb-2">
              <strong>Detailed Instructions:</strong>
            </p>
            <p className="text-xs text-muted-foreground">
              See <code className="bg-muted px-1.5 py-0.5 rounded">FIREBASE_SETUP.md</code> for complete step-by-step instructions, or check <code className="bg-muted px-1.5 py-0.5 rounded">QUICKSTART.md</code> for a 10-minute quick start guide.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
