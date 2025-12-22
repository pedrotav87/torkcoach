import { useState } from 'react'
import { CheckIn, Client, CheckInInsight } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import {
  Sparkle,
  CheckCircle,
  Warning,
  Lightbulb,
  TrendUp,
  PencilSimple,
  Check,
  X,
  PaperPlaneTilt,
  Brain
} from '@phosphor-icons/react'
import { formatDate } from '@/lib/helpers'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

interface CheckInAnalysisProps {
  checkIn: CheckIn
  client: Client
  onSave: (insights: CheckInInsight[], feedback: string) => void
  onGenerate: () => Promise<void>
}

export function CheckInAnalysis({ checkIn, client, onSave, onGenerate }: CheckInAnalysisProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [insights, setInsights] = useState<CheckInInsight[]>(checkIn.aiInsights || [])
  const [coachFeedback, setCoachFeedback] = useState(checkIn.coachFeedback || '')
  const [editingInsightId, setEditingInsightId] = useState<string | null>(null)
  const [editingText, setEditingText] = useState('')

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      await onGenerate()
      toast.success('AI insights generated', {
        description: 'Review and edit before sending to client'
      })
    } catch (error) {
      toast.error('Failed to generate insights')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleEditInsight = (insightId: string, currentText: string) => {
    setEditingInsightId(insightId)
    setEditingText(currentText)
  }

  const handleSaveEdit = (insightId: string) => {
    setInsights(insights.map(i => 
      i.id === insightId ? { ...i, text: editingText } : i
    ))
    setEditingInsightId(null)
    setEditingText('')
  }

  const handleCancelEdit = () => {
    setEditingInsightId(null)
    setEditingText('')
  }

  const handleDeleteInsight = (insightId: string) => {
    setInsights(insights.filter(i => i.id !== insightId))
  }

  const handleAddInsight = (type: CheckInInsight['type']) => {
    const newInsight: CheckInInsight = {
      id: `insight-${Date.now()}`,
      type,
      text: '',
      editable: true
    }
    setInsights([...insights, newInsight])
    setEditingInsightId(newInsight.id)
    setEditingText('')
  }

  const handleSendToClient = () => {
    onSave(insights, coachFeedback)
    toast.success('Feedback sent to client', {
      description: `${client.name} will be notified`
    })
  }

  const insightTypeConfig = {
    observation: {
      icon: Lightbulb,
      label: 'Observation',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/20'
    },
    recommendation: {
      icon: TrendUp,
      label: 'Recommendation',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20'
    },
    concern: {
      icon: Warning,
      label: 'Concern',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20'
    },
    positive: {
      icon: CheckCircle,
      label: 'Positive',
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20'
    }
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Brain className="w-6 h-6 text-accent" weight="bold" />
            </div>
            <div>
              <CardTitle>Check-In Analysis</CardTitle>
              <CardDescription>
                {formatDate(checkIn.date)} • {client.name}
              </CardDescription>
            </div>
          </div>
          
          <Button
            onClick={handleGenerate}
            disabled={isGenerating}
            variant="outline"
            size="sm"
          >
            <Sparkle className="w-4 h-4 mr-2" weight={isGenerating ? 'regular' : 'fill'} />
            {isGenerating ? 'Analyzing...' : 'Generate AI Insights'}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Energy</div>
            <div className="text-2xl font-mono font-bold">{checkIn.responses.energy}/10</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Sleep</div>
            <div className="text-2xl font-mono font-bold">{checkIn.responses.sleep}/10</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Stress</div>
            <div className="text-2xl font-mono font-bold">{checkIn.responses.stress}/10</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Adherence</div>
            <div className="text-2xl font-mono font-bold">{checkIn.responses.adherence}/10</div>
          </div>
        </div>

        {checkIn.notes && (
          <div>
            <div className="text-sm font-semibold mb-2">Client Notes</div>
            <div className="p-3 bg-muted/50 rounded-lg text-sm">
              {checkIn.notes}
            </div>
          </div>
        )}

        <Separator />

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">AI Insights</h3>
            <div className="flex gap-2">
              {(['observation', 'recommendation', 'concern', 'positive'] as const).map((type) => (
                <Button
                  key={type}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleAddInsight(type)}
                >
                  <span className="text-xs capitalize">{type}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {insights.map((insight) => {
                const config = insightTypeConfig[insight.type]
                const Icon = config.icon
                const isEditing = editingInsightId === insight.id

                return (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className={`p-3 rounded-lg border ${config.bgColor} ${config.borderColor}`}
                  >
                    <div className="flex gap-3">
                      <Icon className={`w-5 h-5 ${config.color} flex-shrink-0 mt-0.5`} weight="fill" />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {config.label}
                          </Badge>
                          
                          {!isEditing && (
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => handleEditInsight(insight.id, insight.text)}
                              >
                                <PencilSimple className="w-3 h-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-destructive"
                                onClick={() => handleDeleteInsight(insight.id)}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          )}
                        </div>

                        {isEditing ? (
                          <div className="space-y-2">
                            <Textarea
                              value={editingText}
                              onChange={(e) => setEditingText(e.target.value)}
                              className="text-sm min-h-[60px]"
                              placeholder="Enter insight..."
                              autoFocus
                            />
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleSaveEdit(insight.id)}
                              >
                                <Check className="w-4 h-4 mr-1" />
                                Save
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={handleCancelEdit}
                              >
                                <X className="w-4 h-4 mr-1" />
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm">{insight.text}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>

            {insights.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Sparkle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No insights yet</p>
                <p className="text-xs mt-1">Generate AI insights or add manually</p>
              </div>
            )}
          </div>
        </div>

        <Separator />

        <div>
          <label htmlFor="coach-feedback" className="text-sm font-semibold mb-2 block">
            Your Feedback to Client
          </label>
          <Textarea
            id="coach-feedback"
            value={coachFeedback}
            onChange={(e) => setCoachFeedback(e.target.value)}
            placeholder="Add personal feedback and coaching notes..."
            className="min-h-[100px]"
          />
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="outline">
            Save Draft
          </Button>
          <Button
            onClick={handleSendToClient}
            disabled={insights.length === 0 && !coachFeedback}
          >
            <PaperPlaneTilt className="w-4 h-4 mr-2" weight="bold" />
            Send to Client
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
