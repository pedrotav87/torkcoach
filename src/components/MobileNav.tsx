import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { 
  House, 
  Users, 
  Barbell, 
  ClipboardText, 
  ChatCircle, 
  ChartLine,
  List,
  Sparkle,
  UserCircle
} from '@phosphor-icons/react'

interface MobileNavProps {
  currentView: 'dashboard' | 'clients' | 'programs' | 'check-ins' | 'messages' | 'analytics' | 'trainer-profile' | 'client-profile' | 'check-in-review'
  clientCount: number
  unreviewedCheckIns: number
  onNavigate: (view: 'dashboard' | 'clients' | 'programs' | 'check-ins' | 'messages' | 'analytics' | 'trainer-profile') => void
  onCheckInClick: () => void
}

export function MobileNav({ 
  currentView, 
  clientCount, 
  unreviewedCheckIns,
  onNavigate,
  onCheckInClick
}: MobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="lg:hidden">
          <List className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Barbell className="w-5 h-5 text-primary-foreground" weight="bold" />
              </div>
              <span className="text-xl font-bold">Tork Coach</span>
            </div>
          </div>
          
          <nav className="flex-1 space-y-1 p-4">
            <Button
              variant={currentView === 'dashboard' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => onNavigate('dashboard')}
            >
              <House className="w-5 h-5 mr-3" weight={currentView === 'dashboard' ? 'fill' : 'regular'} />
              Dashboard
            </Button>
            
            <Button 
              variant={currentView === 'clients' ? 'secondary' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => onNavigate('clients')}
            >
              <Users className="w-5 h-5 mr-3" weight={currentView === 'clients' ? 'fill' : 'regular'} />
              Clients
              <Badge variant="secondary" className="ml-auto">
                {clientCount}
              </Badge>
            </Button>
            
            <Button 
              variant={currentView === 'programs' ? 'secondary' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => onNavigate('programs')}
            >
              <Barbell className="w-5 h-5 mr-3" weight={currentView === 'programs' ? 'fill' : 'regular'} />
              Programs
            </Button>
            
            <Button 
              variant={currentView === 'check-ins' ? 'secondary' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => onNavigate('check-ins')}
            >
              <ClipboardText className="w-5 h-5 mr-3" weight={currentView === 'check-ins' ? 'fill' : 'regular'} />
              Check-ins
              {unreviewedCheckIns > 0 && (
                <Badge variant="destructive" className="ml-auto">
                  {unreviewedCheckIns}
                </Badge>
              )}
            </Button>
            
            <Button 
              variant={currentView === 'messages' ? 'secondary' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => onNavigate('messages')}
            >
              <ChatCircle className="w-5 h-5 mr-3" weight={currentView === 'messages' ? 'fill' : 'regular'} />
              Messages
            </Button>
            
            <Button 
              variant={currentView === 'analytics' ? 'secondary' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => onNavigate('analytics')}
            >
              <ChartLine className="w-5 h-5 mr-3" weight={currentView === 'analytics' ? 'fill' : 'regular'} />
              Analytics
            </Button>
            
            <Button 
              variant={currentView === 'trainer-profile' ? 'secondary' : 'ghost'} 
              className="w-full justify-start"
              onClick={() => onNavigate('trainer-profile')}
            >
              <UserCircle className="w-5 h-5 mr-3" weight={currentView === 'trainer-profile' ? 'fill' : 'regular'} />
              Trainer Profile
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
        </div>
      </SheetContent>
    </Sheet>
  )
}
