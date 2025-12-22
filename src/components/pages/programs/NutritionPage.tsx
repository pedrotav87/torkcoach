import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, MagnifyingGlass, Pizza, Egg, ForkKnife } from '@phosphor-icons/react'

export const NutritionPage = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Meal Plan Templates</CardTitle>
              <CardDescription>Pre-configured nutrition plans for different goals</CardDescription>
            </div>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Create Plan
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Lean Bulk', calories: '3200', protein: '180g', carbs: '400g', fat: '90g' },
              { name: 'Maintenance', calories: '2600', protein: '160g', carbs: '300g', fat: '80g' },
              { name: 'Cut', calories: '2000', protein: '180g', carbs: '200g', fat: '60g' }
            ].map((plan) => (
              <Card key={plan.name} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-base">{plan.name}</CardTitle>
                  <CardDescription>{plan.calories} kcal/day</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Protein</span>
                      <span className="font-semibold">{plan.protein}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Carbs</span>
                      <span className="font-semibold">{plan.carbs}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fat</span>
                      <span className="font-semibold">{plan.fat}</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-4">Assign to Client</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recipe Library</CardTitle>
          <CardDescription>Macro-friendly meals and recipes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search recipes..." className="pl-9" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'High Protein Pancakes', icon: Pizza, calories: 420, protein: '42g', category: 'Breakfast' },
              { name: 'Grilled Chicken Bowl', icon: ForkKnife, calories: 580, protein: '55g', category: 'Lunch' },
              { name: 'Salmon & Sweet Potato', icon: Egg, calories: 650, protein: '48g', category: 'Dinner' },
              { name: 'Protein Smoothie', icon: ForkKnife, calories: 320, protein: '35g', category: 'Snack' }
            ].map((recipe) => (
              <div key={recipe.name} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <recipe.icon className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{recipe.name}</p>
                    <Badge variant="outline" className="text-xs">{recipe.category}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{recipe.calories} kcal • {recipe.protein} protein</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
