import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Client, Program, CheckIn, AIInsight, Notification, ActivityFeedItem, ActivityReaction, CheckInInsight } from '@/lib/types'
import { ClientDashboard } from '@/components/ClientDashboard'
import { ClientProfile } from '@/components/ClientProfile'
import { CheckInAnalysis } from '@/components/CheckInAnalysis'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { 
  House, 
  Users, 
  Barbell, 
  ClipboardText, 
  ChatCircle, 
  ChartLine,
  Bell,
  Sparkle
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { generateCheckInInsights } from '@/lib/helpers'
import { generateDemoClients, generateDemoPrograms, generateDemoCheckIns, generateDemoActivities } from '@/lib/demoData'
import { toast } from 'sonner'

type View = 'dashboard' | 'client-profile' | 'check-in-review'

function App() {
  const [clients, setClients] = useKV<Client[]>('clients', [])
  const [programs] = useKV<Program[]>('programs', [])
  const [checkIns, setCheckIns] = useKV<CheckIn[]>('check-ins', [])
  const [insights, setInsights] = useKV<AIInsight[]>('insights', [])
  const [notifications] = useKV<Notification[]>('notifications', [])
  const [activities, setActivities] = useKV<ActivityFeedItem[]>('activities', [])
  
  const safeClients = clients || []
  const safePrograms = programs || []
  const safeCheckIns = checkIns || []
  const safeInsights = insights || []
  const safeNotifications = notifications || []
  const safeActivities = activities || []
  
  const [currentView, setCurrentView] = useState<View>('dashboard')
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [selectedCheckIn, setSelectedCheckIn] = useState<CheckIn | null>(null)
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false)
  
  const unreadNotifications = safeNotifications.filter(n => !n.read).length
  
  useEffect(() => {
    if (safeClients.length === 0) {
      setClients(generateDemoClients())
    }
  }, [])
  
  useEffect(() => {
    if (safePrograms.length === 0 && safeClients.length > 0) {
      setClients(generateDemoClients())
    }
  }, [safeClients.length])
  
  useEffect(() => {
    if (safeCheckIns.length === 0 && safeClients.length > 0) {
      setCheckIns(generateDemoCheckIns())
    }
  }, [safeClients.length])
  
  useEffect(() => {
    if (safeActivities.length === 0 && safeClients.length > 0) {
      setActivities(generateDemoActivities())
    }
  }, [safeClients.length])
  
  const handleClientSelect = (client: Client) => {
    setSelectedClient(client)
    setCurrentView('client-profile')
  }
  
  const handleBack = () => {
    setCurrentView('dashboard')
    setSelectedClient(null)
    setSelectedCheckIn(null)
  }
  
  const handleCreateClient = () => {
    toast.info('Client creation coming soon', {
      description: 'This is a demo showcasing the platform architecture'
    })
  }
  
  const handleReviewCheckIn = (checkIn: CheckIn) => {
    const client = safeClients.find(c => c.id === checkIn.clientId)
    if (client) {
      setSelectedClient(client)
      setSelectedCheckIn(checkIn)
      setCurrentView('check-in-review')
    }
  }
  
  const handleGenerateCheckInInsights = async () => {
    if (!selectedCheckIn || !selectedClient) return
    
    setIsGeneratingInsights(true)
    try {
      const generatedInsights = await generateCheckInInsights(selectedCheckIn, selectedClient)
      
      setCheckIns((current) => 
        (current || []).map(ci => 
          ci.id === selectedCheckIn.id 
            ? { ...ci, aiInsights: generatedInsights }
            : ci
        )
      )
      
      setSelectedCheckIn({ ...selectedCheckIn, aiInsights: generatedInsights })
      
      toast.success('AI insights generated', {
        description: 'Review and edit before sending to client'
      })
    } catch (error) {
      toast.error('Failed to generate insights', {
        description: 'Please try again'
      })
    } finally {
      setIsGeneratingInsights(false)
    }
  }
  
  const handleSaveCheckInFeedback = (insights: CheckInInsight[], feedback: string) => {
    if (!selectedCheckIn) return
    
    setCheckIns((current) =>
      (current || []).map(ci =>
        ci.id === selectedCheckIn.id
          ? {
              ...ci,
              aiInsights: insights,
              coachFeedback: feedback,
              coachReviewed: true,
              reviewedAt: new Date().toISOString()
            }
          : ci
      )
    )
    
    setCurrentView('dashboard')
    setSelectedCheckIn(null)
  }
  
  const handleActivityReaction = (activityId: string, reactionType: ActivityReaction['type'], message?: string) => {
    const newReaction: ActivityReaction = {
      id: `reaction-${Date.now()}`,
      type: reactionType,
      message,
      coachName: 'Coach Mike',
      createdAt: new Date().toISOString()
    }
    
    setActivities((current) =>
      (current || []).map(activity =>
        activity.id === activityId
          ? { ...activity, reactions: [...activity.reactions, newReaction] }
          : activity
      )
    )
  }
  
  const generateInsightsForClient = async (client: Client) => {
    setIsGeneratingInsights(true)
    
    try {
      const clientCheckIns = safeCheckIns.filter(c => c.clientId === client.id)
      const latestCheckIn = clientCheckIns[0]
      
      if (latestCheckIn && !latestCheckIn.aiInsights) {
        const generatedInsights = await generateCheckInInsights(latestCheckIn, client)
        
        setCheckIns((current) =>
          (current || []).map(ci =>
            ci.id === latestCheckIn.id
              ? { ...ci, aiInsights: generatedInsights }
              : ci
          )
        )
        
        toast.success('AI insights generated', {
          description: 'Check-in analysis complete'
        })
      }
      
      const newInsight: AIInsight = {
        id: `insight-${Date.now()}`,
        clientId: client.id,
        type: 'adherence',
        title: 'Weekly Performance Summary',
        summary: 'Client is maintaining excellent adherence with consistent energy levels. Consider progressive overload in next training block.',
        recommendations: [
          'Continue current training volume',
          'Monitor recovery markers in next check-in',
          'Consider adding accessory work for weak points'
        ],
        priority: 'medium',
        dismissed: false,
        createdAt: new Date().toISOString()
      }
      
      setInsights((current) => [newInsight, ...(current || [])])
      
      toast.success('AI insights ready', {
        description: 'New recommendations generated'
      })
    } catch (error) {
      toast.error('Failed to generate insights', {
        description: 'Please try again'
      })
    } finally {
      setIsGeneratingInsights(false)
    }
  }
  
  const clientPrograms = selectedClient
    ? safePrograms.filter(p => p.clientId === selectedClient.id)
    : []
    
  const clientCheckIns = selectedClient
    ? safeCheckIns.filter(c => c.clientId === selectedClient.id).sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    : []
    
  const clientInsights = selectedClient
    ? safeInsights.filter(i => i.clientId === selectedClient.id && !i.dismissed)
    : []
  
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Barbell className="w-5 h-5 text-primary-foreground" weight="bold" />
              </div>
              <span className="text-xl font-bold">Apex Coach</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              {unreadNotifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {unreadNotifications}
                </Badge>
              )}
            </Button>
            
            <div className="flex items-center gap-3 pl-4 border-l">
              <div className="text-right">
                <div className="text-sm font-semibold">Coach Mike</div>
                <div className="text-xs text-muted-foreground">Pro Account</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                MC
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex">
        <aside className="hidden lg:flex w-64 flex-col border-r bg-card min-h-[calc(100vh-4rem)] sticky top-16">
          <nav className="flex-1 space-y-1 p-4">
            <Button
              variant={currentView === 'dashboard' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => {
                setCurrentView('dashboard')
                setSelectedClient(null)
                setSelectedCheckIn(null)
              }}
            >
              <House className="w-5 h-5 mr-3" weight={currentView === 'dashboard' ? 'fill' : 'regular'} />
              Dashboard
            </Button>
            
            <Button variant="ghost" className="w-full justify-start">
              <Users className="w-5 h-5 mr-3" />
              Clients
              <Badge variant="secondary" className="ml-auto">
                {safeClients.length}
              </Badge>
            </Button>
            
            <Button variant="ghost" className="w-full justify-start">
              <Barbell className="w-5 h-5 mr-3" />
              Programs
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => {
                const unreviewedCheckIns = safeCheckIns.filter(c => !c.coachReviewed)
                if (unreviewedCheckIns.length > 0) {
                  handleReviewCheckIn(unreviewedCheckIns[0])
                }
              }}
            >
              <ClipboardText className="w-5 h-5 mr-3" />
              Check-ins
              {safeCheckIns.filter(c => !c.coachReviewed).length > 0 && (
                <Badge variant="destructive" className="ml-auto">
                  {safeCheckIns.filter(c => !c.coachReviewed).length}
                </Badge>
              )}
            </Button>
            
            <Button variant="ghost" className="w-full justify-start">
              <ChatCircle className="w-5 h-5 mr-3" />
              Messages
            </Button>
            
            <Button variant="ghost" className="w-full justify-start">
              <ChartLine className="w-5 h-5 mr-3" />
              Analytics
            </Button>
          </nav>
          
          <div className="p-4 border-t">
            <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Sparkle className="w-5 h-5 text-accent" weight="fill" />
                <span className="font-semibold text-sm">AI Assistant</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Get intelligent coaching insights and recommendations
              </p>
              <Button size="sm" className="w-full" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </aside>
        
        <main className="flex-1 p-6 lg:p-8">
          <div className="container max-w-7xl mx-auto">
            {currentView === 'dashboard' && (
              <ClientDashboard
                clients={safeClients}
                activities={safeActivities}
                onClientSelect={handleClientSelect}
                onCreateClient={handleCreateClient}
                onReact={handleActivityReaction}
              />
            )}
            
            {currentView === 'client-profile' && selectedClient && (
              <ClientProfile
                client={selectedClient}
                programs={clientPrograms}
                recentCheckIns={clientCheckIns}
                insights={clientInsights}
                onBack={handleBack}
                onGenerateInsights={() => generateInsightsForClient(selectedClient)}
              />
            )}
            
            {currentView === 'check-in-review' && selectedCheckIn && selectedClient && (
              <div>
                <Button variant="ghost" onClick={handleBack} className="mb-4">
                  ← Back to Dashboard
                </Button>
                <CheckInAnalysis
                  checkIn={selectedCheckIn}
                  client={selectedClient}
                  onSave={handleSaveCheckInFeedback}
                  onGenerate={handleGenerateCheckInInsights}
                />
              </div>
            )}
          </div>
        </main>
      </div>
      
      <Dialog open={isGeneratingInsights}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkle className="w-5 h-5 text-accent animate-pulse" weight="fill" />
              Generating AI Insights...
            </DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <Sparkle className="w-8 h-8 text-accent animate-pulse" weight="fill" />
              </div>
              <p className="text-sm text-muted-foreground">
                Analyzing check-in data and generating personalized insights...
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default App
