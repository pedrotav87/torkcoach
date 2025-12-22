import { Client } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  ChatCircle, 
  TrendUp, 
  CheckCircle, 
  Warning, 
  Clock,
  Pause
} from '@phosphor-icons/react'
import { getClientStatusColor, formatRelativeTime } from '@/lib/helpers'
import { motion } from 'framer-motion'

interface ClientCardProps {
  client: Client
  onClick: () => void
}

export function ClientCard({ client, onClick }: ClientCardProps) {
  const statusIcons = {
    'active': CheckCircle,
    'needs-attention': Warning,
    'overdue': Clock,
    'inactive': Pause
  }
  
  const StatusIcon = statusIcons[client.status]
  
  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -2 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
        onClick={onClick}
      >
        <div className="flex items-start gap-4">
          <Avatar className="h-14 w-14 border-2 border-primary/20">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
              {client.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-semibold text-lg truncate">{client.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {client.profile.trainingAge}yr training age
                </p>
              </div>
              
              <Badge className={getClientStatusColor(client.status)}>
                <StatusIcon className="w-3 h-3 mr-1" weight="fill" />
                {client.status.replace('-', ' ')}
              </Badge>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Workouts</div>
                <div className="text-sm font-mono font-semibold">
                  {client.adherence.workoutCompliance}%
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Nutrition</div>
                <div className="text-sm font-mono font-semibold">
                  {client.adherence.nutritionCompliance}%
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Check-ins</div>
                <div className="text-sm font-mono font-semibold">
                  {client.adherence.checkInCompliance}%
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                Last workout: {client.lastWorkout ? formatRelativeTime(client.lastWorkout) : 'None'}
              </span>
              {client.nextCheckInDue && (
                <span className="text-warning">
                  Check-in due: {formatRelativeTime(client.nextCheckInDue)}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 mt-3 pt-3 border-t">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <ChatCircle className="w-4 h-4 mr-1" />
            Message
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <TrendUp className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}
