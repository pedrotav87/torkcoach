import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useKV } from '@github/spark/hooks'
import { createSyncService } from '@/lib/syncService'
import { isFirebaseConfigured } from '@/lib/firebase'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { 
  CloudArrowUp,
  CloudArrowDown,
  CloudCheck,
  CloudSlash,
  ArrowsClockwise
} from '@phosphor-icons/react'
import { toast } from 'sonner'
import { Client, Program, CheckIn, AIInsight, Notification, ActivityFeedItem } from '@/lib/types'

export function SyncStatus() {
  const { user } = useAuth()
  const [clients] = useKV<Client[]>('clients', [])
  const [programs] = useKV<Program[]>('programs', [])
  const [checkIns] = useKV<CheckIn[]>('check-ins', [])
  const [insights] = useKV<AIInsight[]>('insights', [])
  const [notifications] = useKV<Notification[]>('notifications', [])
  const [activities] = useKV<ActivityFeedItem[]>('activities', [])
  
  const [syncing, setSyncing] = useState(false)
  const [lastSync, setLastSync] = useState<Date | null>(null)
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle')
  const [isConfigured, setIsConfigured] = useState(false)

  useEffect(() => {
    setIsConfigured(isFirebaseConfigured())
  }, [])

  const handleSyncToCloud = async () => {
    if (!user || !isConfigured) {
      toast.error('Firebase not configured', {
        description: 'Please set up Firebase to enable cloud sync'
      })
      return
    }

    setSyncing(true)
    setSyncStatus('syncing')

    try {
      const syncService = createSyncService(user.uid)
      
      await syncService.syncAll({
        clients: clients || [],
        programs: programs || [],
        checkIns: checkIns || [],
        insights: insights || [],
        notifications: notifications || [],
        activities: activities || []
      })

      setLastSync(new Date())
      setSyncStatus('success')
      
      toast.success('Synced to cloud', {
        description: 'All data backed up to Firebase'
      })
    } catch (error) {
      setSyncStatus('error')
      toast.error('Sync failed', {
        description: 'Could not sync to cloud. Please try again.'
      })
    } finally {
      setSyncing(false)
      setTimeout(() => setSyncStatus('idle'), 3000)
    }
  }

  const handleSyncFromCloud = async () => {
    if (!user || !isConfigured) {
      toast.error('Firebase not configured')
      return
    }

    setSyncing(true)
    setSyncStatus('syncing')

    try {
      const syncService = createSyncService(user.uid)
      const data = await syncService.loadAll()

      toast.success('Loaded from cloud', {
        description: `Loaded ${data.clients.length} clients and related data`
      })

      setLastSync(new Date())
      setSyncStatus('success')
    } catch (error) {
      setSyncStatus('error')
      toast.error('Load failed', {
        description: 'Could not load from cloud. Please try again.'
      })
    } finally {
      setSyncing(false)
      setTimeout(() => setSyncStatus('idle'), 3000)
    }
  }

  const getSyncIcon = () => {
    if (!isConfigured) return <CloudSlash className="w-4 h-4" />
    if (syncing) return <ArrowsClockwise className="w-4 h-4 animate-spin" />
    if (syncStatus === 'success') return <CloudCheck className="w-4 h-4" />
    return <CloudArrowUp className="w-4 h-4" />
  }

  const getSyncColor = () => {
    if (!isConfigured) return 'text-muted-foreground'
    if (syncStatus === 'success') return 'text-success'
    if (syncStatus === 'error') return 'text-destructive'
    return 'text-primary'
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="relative gap-2">
          {getSyncIcon()}
          {!isConfigured && (
            <Badge variant="secondary" className="ml-1 h-5">
              Offline
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CloudArrowUp className="w-5 h-5" />
            Cloud Sync
          </DialogTitle>
          <DialogDescription>
            {isConfigured 
              ? 'Sync your data with Firebase for backup and external access'
              : 'Firebase not configured. Running in offline mode.'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {isConfigured ? (
            <>
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <div className="font-medium">Last Sync</div>
                  <div className="text-sm text-muted-foreground">
                    {lastSync ? lastSync.toLocaleString() : 'Never'}
                  </div>
                </div>
                <div className={`p-2 rounded-full ${getSyncColor()}`}>
                  {getSyncIcon()}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Local Data</div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="p-2 bg-muted rounded">
                    <div className="font-medium">{clients?.length || 0}</div>
                    <div className="text-muted-foreground">Clients</div>
                  </div>
                  <div className="p-2 bg-muted rounded">
                    <div className="font-medium">{programs?.length || 0}</div>
                    <div className="text-muted-foreground">Programs</div>
                  </div>
                  <div className="p-2 bg-muted rounded">
                    <div className="font-medium">{checkIns?.length || 0}</div>
                    <div className="text-muted-foreground">Check-ins</div>
                  </div>
                  <div className="p-2 bg-muted rounded">
                    <div className="font-medium">{activities?.length || 0}</div>
                    <div className="text-muted-foreground">Activities</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={handleSyncToCloud} 
                  disabled={syncing}
                  className="flex-1"
                >
                  <CloudArrowUp className="w-4 h-4 mr-2" />
                  {syncing ? 'Syncing...' : 'Sync to Cloud'}
                </Button>
                <Button 
                  onClick={handleSyncFromCloud} 
                  disabled={syncing}
                  variant="outline"
                  className="flex-1"
                >
                  <CloudArrowDown className="w-4 h-4 mr-2" />
                  Load from Cloud
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <CloudSlash className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-4">
                Set up your Firebase configuration in .env to enable cloud sync
              </p>
              <Button variant="outline" size="sm" disabled>
                Configure Firebase
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
