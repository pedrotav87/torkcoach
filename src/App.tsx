import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { useAuth } from '@/contexts/AuthContext'
import { Client, Program, CheckIn, AIInsight, Notification, ActivityFeedItem, ActivityReaction, CheckInInsight } from '@/lib/types'
import { ClientDashboard } from '@/components/ClientDashboard'
import { ClientProfile } from '@/components/ClientProfile'
import { CheckInAnalysis } from '@/components/CheckInAnalysis'
import { MobileNav } from '@/components/MobileNav'
import { LoginPage } from '@/components/auth/LoginPage'
import { ClientsPage } from '@/components/pages/ClientsPage'
import { ProgramsPage } from '@/components/pages/ProgramsPage'
import { CheckInsPage } from '@/components/pages/CheckInsPage'
import { MessagesPage } from '@/components/pages/MessagesPage'
import { AnalyticsPage } from '@/components/pages/AnalyticsPage'
import { Logo } from '@/components/Logo'
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
  Sparkle,
  SignOut
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { generateCheckInInsights } from '@/lib/helpers'
import { generateDemoClients, generateDemoPrograms, generateDemoCheckIns, generateDemoActivities } from '@/lib/demoData'
import { toast } from 'sonner'

type View = 'dashboard' | 'clients' | 'programs' | 'check-ins' | 'messages' | 'analytics' | 'client-profile' | 'check-in-review'

function App() {
  const { user, loading: authLoading, signOut, isCoach } = useAuth()
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

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary flex items-center justify-center">
            <Barbell className="w-8 h-8 text-primary-foreground animate-pulse" weight="bold" />
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginPage />
  }

  if (!isCoach) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-4">This portal is for coaches only. Please contact support if you believe this is an error.</p>
          <Button onClick={() => signOut()}>
            Sign Out
          </Button>
        </div>
      </div>
    )
  }
  
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
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <MobileNav
              currentView={currentView}
              clientCount={safeClients.length}
              unreviewedCheckIns={safeCheckIns.filter(c => !c.coachReviewed).length}
              onNavigate={(view) => {
                setCurrentView(view)
                setSelectedClient(null)
                setSelectedCheckIn(null)
              }}
              onCheckInClick={() => {
                const unreviewedCheckIns = safeCheckIns.filter(c => !c.coachReviewed)
                if (unreviewedCheckIns.length > 0) {
                  handleReviewCheckIn(unreviewedCheckIns[0])
                }
              }}
            />
            <Logo size="md" className="ml-2" />
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              {unreadNotifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {unreadNotifications}
                </Badge>
              )}
            </Button>
            
            <div className="hidden sm:flex items-center gap-3 pl-4 border-l">
              <div className="text-right hidden md:block">
                <div className="text-sm font-semibold">{user.displayName || user.email}</div>
                <div className="text-xs text-muted-foreground">Coach</div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => signOut()}>
                <SignOut className="w-5 h-5" />
              </Button>
            </div>
            
            <Button variant="ghost" size="icon" className="sm:hidden" onClick={() => signOut()}>
              <SignOut className="w-4 h-4" />
            </Button>
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
            
            <Button 
              variant={currentView === 'clients' ? 'secondary' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => {
                setCurrentView('clients')
                setSelectedClient(null)
                setSelectedCheckIn(null)
              }}
            >
              <Users className="w-5 h-5 mr-3" weight={currentView === 'clients' ? 'fill' : 'regular'} />
              Clients
              <Badge variant="secondary" className="ml-auto">
                {safeClients.length}
              </Badge>
            </Button>
            
            <Button 
              variant={currentView === 'programs' ? 'secondary' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => {
                setCurrentView('programs')
                setSelectedClient(null)
                setSelectedCheckIn(null)
              }}
            >
              <Barbell className="w-5 h-5 mr-3" weight={currentView === 'programs' ? 'fill' : 'regular'} />
              Programs
            </Button>
            
            <Button 
              variant={currentView === 'check-ins' ? 'secondary' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => {
                setCurrentView('check-ins')
                setSelectedClient(null)
                setSelectedCheckIn(null)
              }}
            >
              <ClipboardText className="w-5 h-5 mr-3" weight={currentView === 'check-ins' ? 'fill' : 'regular'} />
              Check-ins
              {safeCheckIns.filter(c => !c.coachReviewed).length > 0 && (
                <Badge variant="destructive" className="ml-auto">
                  {safeCheckIns.filter(c => !c.coachReviewed).length}
                </Badge>
              )}
            </Button>
            
            <Button 
              variant={currentView === 'messages' ? 'secondary' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => {
                setCurrentView('messages')
                setSelectedClient(null)
                setSelectedCheckIn(null)
              }}
            >
              <ChatCircle className="w-5 h-5 mr-3" weight={currentView === 'messages' ? 'fill' : 'regular'} />
              Messages
            </Button>
            
            <Button 
              variant={currentView === 'analytics' ? 'secondary' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => {
                setCurrentView('analytics')
                setSelectedClient(null)
                setSelectedCheckIn(null)
              }}
            >
              <ChartLine className="w-5 h-5 mr-3" weight={currentView === 'analytics' ? 'fill' : 'regular'} />
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
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
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
            
            {currentView === 'clients' && <ClientsPage />}
            
            {currentView === 'programs' && <ProgramsPage />}
            
            {currentView === 'check-ins' && <CheckInsPage />}
            
            {currentView === 'messages' && <MessagesPage />}
            
            {currentView === 'analytics' && <AnalyticsPage />}
            
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
