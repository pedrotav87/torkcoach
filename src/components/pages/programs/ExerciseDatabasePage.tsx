import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, MagnifyingGlass, Play, Funnel } from '@phosphor-icons/react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export const ExerciseDatabasePage = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const exercises = [
    { name: 'Barbell Bench Press', muscle: 'Chest', equipment: 'Barbell', difficulty: 'Intermediate' },
    { name: 'Barbell Squat', muscle: 'Legs', equipment: 'Barbell', difficulty: 'Advanced' },
    { name: 'Deadlift', muscle: 'Back', equipment: 'Barbell', difficulty: 'Advanced' },
    { name: 'Overhead Press', muscle: 'Shoulders', equipment: 'Barbell', difficulty: 'Intermediate' },
    { name: 'Pull-ups', muscle: 'Back', equipment: 'Bodyweight', difficulty: 'Intermediate' },
    { name: 'Dumbbell Rows', muscle: 'Back', equipment: 'Dumbbells', difficulty: 'Beginner' },
    { name: 'Leg Press', muscle: 'Legs', equipment: 'Machine', difficulty: 'Beginner' },
    { name: 'Cable Flyes', muscle: 'Chest', equipment: 'Cable', difficulty: 'Beginner' }
  ]

  const filteredExercises = exercises.filter(ex => 
    ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ex.muscle.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search exercises by name or muscle group..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Funnel className="w-4 h-4 mr-2" />
          Filter
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Exercise
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add Custom Exercise</DialogTitle>
              <DialogDescription>Create a new exercise for your library</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="exercise-name">Exercise Name</Label>
                <Input id="exercise-name" placeholder="e.g., Incline Dumbbell Press" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="muscle-group">Muscle Group</Label>
                  <Select>
                    <SelectTrigger id="muscle-group">
                      <SelectValue placeholder="Select muscle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chest">Chest</SelectItem>
                      <SelectItem value="back">Back</SelectItem>
                      <SelectItem value="legs">Legs</SelectItem>
                      <SelectItem value="shoulders">Shoulders</SelectItem>
                      <SelectItem value="arms">Arms</SelectItem>
                      <SelectItem value="core">Core</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="equipment">Equipment</Label>
                  <Select>
                    <SelectTrigger id="equipment">
                      <SelectValue placeholder="Select equipment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="barbell">Barbell</SelectItem>
                      <SelectItem value="dumbbell">Dumbbell</SelectItem>
                      <SelectItem value="machine">Machine</SelectItem>
                      <SelectItem value="cable">Cable</SelectItem>
                      <SelectItem value="bodyweight">Bodyweight</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions">Instructions</Label>
                <Textarea 
                  id="instructions" 
                  placeholder="Describe the proper form and execution..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="video-url">Video URL (optional)</Label>
                <Input id="video-url" placeholder="https://youtube.com/..." />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Exercise</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredExercises.map((exercise) => (
          <Card key={exercise.name} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-base">{exercise.name}</CardTitle>
                  <CardDescription>{exercise.muscle}</CardDescription>
                </div>
                <Button size="icon" variant="ghost">
                  <Play className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary">{exercise.equipment}</Badge>
                <Badge variant="outline">{exercise.difficulty}</Badge>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                Add to Program
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
