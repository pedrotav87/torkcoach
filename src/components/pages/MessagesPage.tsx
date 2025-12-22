import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { MagnifyingGlass, PaperPlaneRight } from '@phosphor-icons/react'

export const MessagesPage = () => {
  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6">
      <Card className="w-80 flex flex-col">
        <CardHeader className="border-b">
          <CardTitle>Messages</CardTitle>
          <div className="mt-3">
            <div className="relative">
              <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search clients..." className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-0">
          <div className="space-y-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3 p-4 hover:bg-muted/50 cursor-pointer border-b">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    C{i}
                  </div>
                  {i <= 2 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-white text-xs flex items-center justify-center">
                      2
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold truncate">Client {i}</p>
                    <span className="text-xs text-muted-foreground">2h</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">Last message preview...</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="flex-1 flex flex-col">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                C1
              </div>
              <div>
                <CardTitle className="text-base">Client 1</CardTitle>
                <CardDescription>Active now</CardDescription>
              </div>
            </div>
            <Badge variant="secondary">Coach</Badge>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            <div className="flex justify-start">
              <div className="max-w-[70%] bg-muted rounded-lg p-3">
                <p className="text-sm">Hey coach! Just finished my workout, feeling great!</p>
                <p className="text-xs text-muted-foreground mt-1">10:30 AM</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="max-w-[70%] bg-primary text-primary-foreground rounded-lg p-3">
                <p className="text-sm">Awesome work! How did the new weight feel on squats?</p>
                <p className="text-xs text-primary-foreground/70 mt-1">10:32 AM</p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="max-w-[70%] bg-muted rounded-lg p-3">
                <p className="text-sm">Really solid! Hit all my reps with good form.</p>
                <p className="text-xs text-muted-foreground mt-1">10:35 AM</p>
              </div>
            </div>
          </div>
        </CardContent>

        <div className="border-t p-4">
          <div className="flex gap-2">
            <Textarea placeholder="Type your message..." rows={2} className="resize-none" />
            <Button size="icon" className="h-auto">
              <PaperPlaneRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
