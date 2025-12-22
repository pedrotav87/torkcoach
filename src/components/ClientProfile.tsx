import { Client, Program, CheckIn, AIInsight } from '@/lib/types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import {
  User,
  Barbell,
  ChartLine,
  AppleLogo,
  ChatCircle,
  ArrowLeft,
  Sparkle,
  Warning,
  CheckCircle,
  TrendUp
} from '@phosphor-icons/react'
import { formatDate, getComplianceColor } from '@/lib/helpers'

interface ClientProfileProps {
  client: Client
  programs: Program[]
  recentCheckIns: CheckIn[]
  insights: AIInsight[]
  onBack: () => void
  onGenerateInsights: () => void
}

export function ClientProfile({
  client,
  programs,
  recentCheckIns,
  insights,
  onBack,
  onGenerateInsights
}: ClientProfileProps) {
  const activeProgram = programs.find(p => p.status === 'active')
  const latestCheckIn = recentCheckIns[0]
  
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="self-start">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold truncate">{client.name}</h1>
          <p className="text-muted-foreground text-sm sm:text-base truncate">{client.email}</p>
        </div>
        
        <Button variant="outline" className="w-full sm:w-auto">
          <ChatCircle className="w-5 h-5 mr-2" />
          Message
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Workout Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className={`text-3xl font-bold font-mono ${getComplianceColor(client.adherence.workoutCompliance)}`}>
                {client.adherence.workoutCompliance}%
              </span>
              <TrendUp className="w-5 h-5 text-success" weight="bold" />
            </div>
            <Progress value={client.adherence.workoutCompliance} className="mt-3" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Nutrition Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className={`text-3xl font-bold font-mono ${getComplianceColor(client.adherence.nutritionCompliance)}`}>
                {client.adherence.nutritionCompliance}%
              </span>
            </div>
            <Progress value={client.adherence.nutritionCompliance} className="mt-3" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Check-In Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className={`text-3xl font-bold font-mono ${getComplianceColor(client.adherence.checkInCompliance)}`}>
                {client.adherence.checkInCompliance}%
              </span>
            </div>
            <Progress value={client.adherence.checkInCompliance} className="mt-3" />
          </CardContent>
        </Card>
      </div>
      
      {insights.length > 0 && (
        <Card className="border-accent/50 bg-accent/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkle className="w-5 h-5 text-accent" weight="fill" />
                <CardTitle>AI Insights</CardTitle>
              </div>
              <Button variant="ghost" size="sm" onClick={onGenerateInsights}>
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {insights.slice(0, 3).map((insight) => (
              <div key={insight.id} className="flex gap-3 p-3 bg-card rounded-lg border">
                {insight.priority === 'critical' && <Warning className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" weight="fill" />}
                {insight.priority === 'high' && <Warning className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" weight="fill" />}
                {insight.priority === 'medium' && <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" weight="fill" />}
                {insight.priority === 'low' && <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" weight="fill" />}
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm">{insight.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{insight.summary}</p>
                  {insight.recommendations.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {insight.recommendations.map((rec, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground pl-4 relative before:content-['•'] before:absolute before:left-0">
                          {rec}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">
            <User className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="program">
            <Barbell className="w-4 h-4 mr-2" />
            Program
          </TabsTrigger>
          <TabsTrigger value="progress">
            <ChartLine className="w-4 h-4 mr-2" />
            Progress
          </TabsTrigger>
          <TabsTrigger value="nutrition">
            <AppleLogo className="w-4 h-4 mr-2" />
            Nutrition
          </TabsTrigger>
          <TabsTrigger value="messages">
            <ChatCircle className="w-4 h-4 mr-2" />
            Messages
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Age</div>
                  <div className="font-semibold">{client.profile.age} years</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Training Age</div>
                  <div className="font-semibold">{client.profile.trainingAge} years</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Current Weight</div>
                  <div className="font-semibold">{client.metrics.currentWeight} lbs</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Target Weight</div>
                  <div className="font-semibold">{client.metrics.targetWeight} lbs</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Volume Tolerance</div>
                  <div className="font-semibold capitalize">{client.profile.volumeTolerance}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Recovery Status</div>
                  <div className="font-semibold capitalize">{client.profile.recoveryStatus}</div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <div className="text-sm text-muted-foreground mb-2">Goals</div>
                <div className="flex flex-wrap gap-2">
                  {client.profile.goals.map((goal, idx) => (
                    <Badge key={idx} variant="secondary">{goal}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-muted-foreground mb-2">Weak Points</div>
                <div className="flex flex-wrap gap-2">
                  {client.profile.weakPoints.map((point, idx) => (
                    <Badge key={idx} variant="outline">{point}</Badge>
                  ))}
                </div>
              </div>
              
              {client.profile.injuries.length > 0 && (
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Active Injuries</div>
                  <div className="space-y-2">
                    {client.profile.injuries.filter(i => !i.resolved).map((injury) => (
                      <div key={injury.id} className="p-3 bg-muted rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-semibold">{injury.area}</div>
                            <div className="text-sm text-muted-foreground">{injury.description}</div>
                          </div>
                          <Badge variant={injury.severity === 'severe' ? 'destructive' : 'secondary'}>
                            {injury.severity}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {latestCheckIn && (
            <Card>
              <CardHeader>
                <CardTitle>Latest Check-In</CardTitle>
                <CardDescription>{formatDate(latestCheckIn.date)}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground">Energy</div>
                    <div className="text-lg font-mono font-semibold">{latestCheckIn.responses.energy}/10</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Sleep</div>
                    <div className="text-lg font-mono font-semibold">{latestCheckIn.responses.sleep}/10</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Stress</div>
                    <div className="text-lg font-mono font-semibold">{latestCheckIn.responses.stress}/10</div>
                  </div>
                </div>
                
                {latestCheckIn.aiSummary && (
                  <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Sparkle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" weight="fill" />
                      <p className="text-sm">{latestCheckIn.aiSummary}</p>
                    </div>
                  </div>
                )}
                
                {latestCheckIn.notes && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Client Notes</div>
                    <p className="text-sm">{latestCheckIn.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="program" className="mt-6">
          {activeProgram ? (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{activeProgram.name}</CardTitle>
                    <CardDescription>
                      {formatDate(activeProgram.startDate)} - {formatDate(activeProgram.endDate)}
                    </CardDescription>
                  </div>
                  <Badge>Active</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Barbell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Program details and workout schedule</p>
                  <p className="text-sm mt-2">Full program builder coming soon</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Barbell className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No active program</p>
                <Button className="mt-4">Create Program</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="progress" className="mt-6">
          <Card>
            <CardContent className="text-center py-12 text-muted-foreground">
              <ChartLine className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Progress tracking and analytics</p>
              <p className="text-sm mt-2">Charts and photo comparisons coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="nutrition" className="mt-6">
          <Card>
            <CardContent className="text-center py-12 text-muted-foreground">
              <AppleLogo className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Nutrition tracking and meal plans</p>
              <p className="text-sm mt-2">Macro tracking coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="messages" className="mt-6">
          <Card>
            <CardContent className="text-center py-12 text-muted-foreground">
              <ChatCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Message thread with {client.name}</p>
              <p className="text-sm mt-2">Messaging system coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
