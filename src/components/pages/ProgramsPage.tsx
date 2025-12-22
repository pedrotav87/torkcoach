import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, ForkKnife, Barbell, Database } from '@phosphor-icons/react'
import { NutritionPage } from './programs/NutritionPage'
import { WorkoutsPage } from './programs/WorkoutsPage'
import { ExerciseDatabasePage } from './programs/ExerciseDatabasePage'

export const ProgramsPage = () => {
  const [activeTab, setActiveTab] = useState('workouts')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Programs</h1>
          <p className="text-muted-foreground mt-1">Build and manage training & nutrition programs</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Program
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="workouts" className="gap-2">
            <Barbell className="w-4 h-4" />
            Workouts
          </TabsTrigger>
          <TabsTrigger value="nutrition" className="gap-2">
            <ForkKnife className="w-4 h-4" />
            Nutrition
          </TabsTrigger>
          <TabsTrigger value="exercises" className="gap-2">
            <Database className="w-4 h-4" />
            Exercise Database
          </TabsTrigger>
        </TabsList>

        <TabsContent value="workouts" className="space-y-6">
          <WorkoutsPage />
        </TabsContent>

        <TabsContent value="nutrition" className="space-y-6">
          <NutritionPage />
        </TabsContent>

        <TabsContent value="exercises" className="space-y-6">
          <ExerciseDatabasePage />
        </TabsContent>
      </Tabs>
    </div>
  )
}
