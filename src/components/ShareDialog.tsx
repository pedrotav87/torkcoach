import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { ShareNetwork, Copy, Check } from '@phosphor-icons/react'
import { generatePublicLink } from '@/lib/publicLinks'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner'

interface ShareDialogProps {
  type: 'client' | 'program' | 'progress'
  resourceId: string
  resourceName: string
}

export const ShareDialog = ({ type, resourceId, resourceName }: ShareDialogProps) => {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [generatedLink, setGeneratedLink] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const [expiresInDays, setExpiresInDays] = useState<string>('30')
  const [hasMaxAccess, setHasMaxAccess] = useState(false)
  const [maxAccess, setMaxAccess] = useState<string>('10')

  const handleGenerate = async () => {
    if (!user) return

    setLoading(true)
    try {
      const link = await generatePublicLink(type, resourceId, user.uid, {
        expiresInDays: expiresInDays === 'never' ? undefined : parseInt(expiresInDays),
        maxAccess: hasMaxAccess ? parseInt(maxAccess) : undefined
      })

      setGeneratedLink(link)
      toast.success('Public link generated', {
        description: 'Share this link with anyone to give them access'
      })
    } catch (error) {
      toast.error('Failed to generate link', {
        description: 'Please try again'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink)
      setCopied(true)
      toast.success('Link copied to clipboard')
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setGeneratedLink(null)
    setCopied(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <ShareNetwork className="w-4 h-4 mr-2" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Share {resourceName}</DialogTitle>
          <DialogDescription>
            Create a public link to share this {type} with anyone
          </DialogDescription>
        </DialogHeader>

        {!generatedLink ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="expires">Link Expiration</Label>
              <Select value={expiresInDays} onValueChange={setExpiresInDays}>
                <SelectTrigger id="expires">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="never">Never expires</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between space-x-2">
              <div className="space-y-0.5">
                <Label htmlFor="max-access">Limit access count</Label>
                <p className="text-sm text-muted-foreground">
                  Restrict how many times this link can be viewed
                </p>
              </div>
              <Switch
                id="max-access"
                checked={hasMaxAccess}
                onCheckedChange={setHasMaxAccess}
              />
            </div>

            {hasMaxAccess && (
              <div className="space-y-2">
                <Label htmlFor="max-count">Maximum views</Label>
                <Input
                  id="max-count"
                  type="number"
                  min="1"
                  value={maxAccess}
                  onChange={(e) => setMaxAccess(e.target.value)}
                />
              </div>
            )}

            <Button onClick={handleGenerate} disabled={loading} className="w-full">
              {loading ? 'Generating...' : 'Generate Public Link'}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Public Link</p>
              <div className="flex items-center gap-2">
                <Input
                  value={generatedLink}
                  readOnly
                  className="font-mono text-sm"
                />
                <Button
                  size="icon"
                  variant="outline"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-success" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <p className="flex items-center justify-between">
                <span className="text-muted-foreground">Expires:</span>
                <span className="font-medium">
                  {expiresInDays === 'never' ? 'Never' : `${expiresInDays} days`}
                </span>
              </p>
              {hasMaxAccess && (
                <p className="flex items-center justify-between">
                  <span className="text-muted-foreground">Max views:</span>
                  <span className="font-medium">{maxAccess}</span>
                </p>
              )}
            </div>

            <Button onClick={handleClose} variant="outline" className="w-full">
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
