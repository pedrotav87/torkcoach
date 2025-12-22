import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Play, Calendar } from '@phosphor-icons/react'

export const WorkoutsPage = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Workout Templates</CardTitle>
          <CardDescription>Pre-built workout programs and custom templates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {['Push/Pull/Legs', 'Upper/Lower Split', 'Full Body 3x', 'Bro Split', 'Powerbuilding'].map((program) => (
              <Card key={program} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-base">{program}</CardTitle>
                  <CardDescription>4-6 weeks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Badge variant="secondary">Hypertrophy</Badge>
                    <Badge variant="outline">Intermediate</Badge>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Play className="w-3 h-3 mr-1" />
                      Preview
                    </Button>
                    <Button size="sm" className="flex-1">
                      Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Active Programs</CardTitle>
              <CardDescription>Currently assigned client programs</CardDescription>
            </div>
            <Button size="sm" variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              View Calendar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    C{i}
                  </div>
                  <div>
                    <p className="font-semibold">Client {i} - Push/Pull/Legs</p>
                    <p className="text-sm text-muted-foreground">Week 3 of 6 • 4 days/week</p>
                  </div>
                </div>
                <Badge>Active</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
