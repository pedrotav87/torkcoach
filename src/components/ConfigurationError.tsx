import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Barbell, WarningCircle, Copy, Check } from '@phosphor-icons/react'
import { useState } from 'react'

export function ConfigurationError() {
  const [copied, setCopied] = useState(false)

  const envContent = `VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key`

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
              <CardDescription>Configuration Required</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <WarningCircle className="w-5 h-5" />
            <AlertDescription>
              Supabase environment variables are not configured. The application requires a valid Supabase connection to function.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Setup Instructions:</h3>
            
            <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
              <li>Create a Supabase project at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">supabase.com</a></li>
              <li>Copy your project URL and anon key from the project settings</li>
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

            <ol start={5} className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
              <li>Replace <code className="bg-muted px-1.5 py-0.5 rounded text-xs">your_supabase_project_url</code> with your actual Supabase URL</li>
              <li>Replace <code className="bg-muted px-1.5 py-0.5 rounded text-xs">your_supabase_anon_key</code> with your actual anon key</li>
              <li>Restart the development server</li>
            </ol>
          </div>

          <div className="pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              For detailed setup instructions, see <code className="bg-muted px-1.5 py-0.5 rounded">SUPABASE_SETUP.md</code> in the project root.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
