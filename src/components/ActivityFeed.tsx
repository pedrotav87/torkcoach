import { useState } from 'react'
import { ActivityFeedItem, ActivityReaction } from '@/lib/types'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import {
  CheckCircle,
  Fire,
  Barbell,
  AppleLogo,
  Trophy,
  TrendUp,
  ClipboardText,
  Medal,
  Heart,
  Lightning,
  Flame,
  ChatCircle,
  PaperPlaneTilt
} from '@phosphor-icons/react'
import { formatRelativeTime } from '@/lib/helpers'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ActivityFeedProps {
  activities: ActivityFeedItem[]
  onReact: (activityId: string, reactionType: ActivityReaction['type'], message?: string) => void
}

export function ActivityFeed({ activities, onReact }: ActivityFeedProps) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyMessage, setReplyMessage] = useState('')

  const activityTypeConfig = {
    'workout-complete': {
      icon: CheckCircle,
      label: 'Workout Complete',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    'meal-logged': {
      icon: AppleLogo,
      label: 'Meal Logged',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    'pr-beaten': {
      icon: Trophy,
      label: 'Personal Record',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    'progression-overload': {
      icon: TrendUp,
      label: 'Progression Detected',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    'check-in-submitted': {
      icon: ClipboardText,
      label: 'Check-In Submitted',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    'milestone': {
      icon: Medal,
      label: 'Milestone Reached',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  }

  const reactionButtons = [
    { type: 'kudos' as const, icon: Heart, label: 'Kudos', color: 'text-pink-500' },
    { type: 'fire' as const, icon: Flame, label: 'Fire', color: 'text-orange-500' },
    { type: 'strong' as const, icon: Lightning, label: 'Strong', color: 'text-yellow-500' }
  ]

  const handleQuickReaction = (activityId: string, type: ActivityReaction['type']) => {
    onReact(activityId, type)
    toast.success('Reaction sent!', {
      description: 'Your client will see your encouragement',
      duration: 2000
    })
  }

  const handleSendMessage = (activityId: string) => {
    if (!replyMessage.trim()) return
    
    onReact(activityId, 'message', replyMessage)
    toast.success('Message sent!', {
      description: 'Your client will be notified'
    })
    setReplyMessage('')
    setReplyingTo(null)
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {activities.map((activity, index) => {
          const config = activityTypeConfig[activity.type]
          const Icon = config.icon
          const isReplying = replyingTo === activity.id

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {activity.clientName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold">{activity.clientName}</span>
                          <Badge variant="outline" className={cn('text-xs', config.color, config.bgColor)}>
                            <Icon className="w-3 h-3 mr-1" weight="fill" />
                            {config.label}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatRelativeTime(activity.createdAt)}
                        </span>
                      </div>

                      <h4 className="font-semibold text-sm mb-1">{activity.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{activity.description}</p>

                      {activity.metadata && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {Object.entries(activity.metadata).map(([key, value]) => (
                            <div key={key} className="px-2 py-1 bg-muted rounded text-xs">
                              <span className="text-muted-foreground">{key}:</span>{' '}
                              <span className="font-semibold font-mono">{value}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {activity.reactions.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3 p-2 bg-muted/30 rounded-lg">
                          {activity.reactions.map((reaction) => (
                            <div key={reaction.id} className="flex items-center gap-1 text-xs">
                              {reaction.type === 'kudos' && <Heart className="w-4 h-4 text-pink-500" weight="fill" />}
                              {reaction.type === 'fire' && <Flame className="w-4 h-4 text-orange-500" weight="fill" />}
                              {reaction.type === 'strong' && <Lightning className="w-4 h-4 text-yellow-500" weight="fill" />}
                              {reaction.type === 'message' && (
                                <div className="flex items-start gap-1 p-2 bg-card rounded border">
                                  <ChatCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" weight="fill" />
                                  <div>
                                    <div className="font-semibold text-xs">{reaction.coachName}</div>
                                    <div className="text-xs text-muted-foreground">{reaction.message}</div>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        {reactionButtons.map(({ type, icon: ReactionIcon, label, color }) => {
                          const hasReacted = activity.reactions.some(r => r.type === type)
                          return (
                            <Button
                              key={type}
                              variant={hasReacted ? 'secondary' : 'ghost'}
                              size="sm"
                              className="h-8"
                              onClick={() => handleQuickReaction(activity.id, type)}
                            >
                              <ReactionIcon className={cn('w-4 h-4', hasReacted && color)} weight={hasReacted ? 'fill' : 'regular'} />
                              <span className="ml-1 text-xs">{label}</span>
                            </Button>
                          )
                        })}

                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8"
                          onClick={() => setReplyingTo(isReplying ? null : activity.id)}
                        >
                          <ChatCircle className="w-4 h-4" />
                          <span className="ml-1 text-xs">Message</span>
                        </Button>
                      </div>

                      <AnimatePresence>
                        {isReplying && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3"
                          >
                            <div className="flex gap-2">
                              <Textarea
                                value={replyMessage}
                                onChange={(e) => setReplyMessage(e.target.value)}
                                placeholder="Send an encouraging message..."
                                className="min-h-[60px] text-sm"
                                autoFocus
                              />
                            </div>
                            <div className="flex gap-2 mt-2 justify-end">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setReplyingTo(null)
                                  setReplyMessage('')
                                }}
                              >
                                Cancel
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleSendMessage(activity.id)}
                                disabled={!replyMessage.trim()}
                              >
                                <PaperPlaneTilt className="w-4 h-4 mr-1" weight="bold" />
                                Send
                              </Button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </AnimatePresence>

      {activities.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Barbell className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No recent activity</p>
            <p className="text-sm text-muted-foreground mt-2">
              Client activities will appear here
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
