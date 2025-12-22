import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Eye, PaperPlaneRight } from '@phosphor-icons/react'

export const CheckInsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Check-ins</h1>
          <p className="text-muted-foreground mt-1">Review client weekly check-ins</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="destructive" className="text-sm">3 Pending Review</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pending Reviews</CardTitle>
            <CardDescription>Check-ins awaiting coach feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                      C{i}
                    </div>
                    <div>
                      <p className="font-semibold">Client {i}</p>
                      <p className="text-sm text-muted-foreground">Submitted 2 hours ago</p>
                    </div>
                  </div>
                  <Button size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Review
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recently Completed</CardTitle>
            <CardDescription>Check-ins with feedback sent</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[4, 5, 6].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center text-sm font-bold text-success">
                      C{i}
                    </div>
                    <div>
                      <p className="font-semibold">Client {i}</p>
                      <p className="text-sm text-muted-foreground">Reviewed 1 day ago</p>
                    </div>
                  </div>
                  <Badge variant="outline">
                    <PaperPlaneRight className="w-3 h-3 mr-1" />
                    Sent
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
