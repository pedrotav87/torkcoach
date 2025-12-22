import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Client, Program, CheckIn, AIInsight, Notification } from '@/lib/types'
import { ClientDashboard } from '@/components/ClientDashboard'
import { ClientProfile } from '@/components/ClientProfile'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
import { generateAIPromptForCheckIn, generateAIPromptForProgramReview } from '@/lib/helpers'
import { toast } from 'sonner'

type View = 'dashboard' | 'client-profile'

function App() {
  const [clients] = useKV<Client[]>('clients', [])
  const [programs] = useKV<Program[]>('programs', [])
  const [checkIns] = useKV<CheckIn[]>('check-ins', [])
  const [insights, setInsights] = useKV<AIInsight[]>('insights', [])
  const [notifications] = useKV<Notification[]>('notifications', [])
  
  const safeClients = clients || []
  const safePrograms = programs || []
  const safeCheckIns = checkIns || []
  const safeInsights = insights || []
  const safeNotifications = notifications || []
  
  const [currentView, setCurrentView] = useState<View>('dashboard')
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false)
  
  const unreadNotifications = safeNotifications.filter(n => !n.read).length
  
  const handleClientSelect = (client: Client) => {
    setSelectedClient(client)
    setCurrentView('client-profile')
  }
  
  const handleBack = () => {
    setCurrentView('dashboard')
    setSelectedClient(null)
  }
  
  const handleCreateClient = () => {
    toast.info('Client creation coming soon', {
      description: 'This is a demo showcasing the platform architecture'
    })
  }
  
  const generateInsightsForClient = async (client: Client) => {
    setIsGeneratingInsights(true)
    
    try {
      const clientCheckIns = safeCheckIns.filter(c => c.clientId === client.id)
      const latestCheckIn = clientCheckIns[0]
      
      if (latestCheckIn && !latestCheckIn.aiSummary) {
        const prompt = generateAIPromptForCheckIn(latestCheckIn, client)
        const summary = await window.spark.llm(prompt, 'gpt-4o-mini')
        
        toast.success('AI insights generated', {
          description: 'Check-in analysis complete'
        })
      }
      
      const weeklyPrompt = generateAIPromptForProgramReview(client, client.adherence.workoutCompliance)
      const weeklySummary = await window.spark.llm(weeklyPrompt, 'gpt-4o-mini')
      
      const newInsight: AIInsight = {
        id: `insight-${Date.now()}`,
        clientId: client.id,
        type: 'adherence',
        title: 'Weekly Performance Summary',
        summary: weeklySummary,
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
            
            <Button variant="ghost" className="w-full justify-start">
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
                onClientSelect={handleClientSelect}
                onCreateClient={handleCreateClient}
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
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
