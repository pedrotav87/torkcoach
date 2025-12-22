import { Client, CheckIn, WorkoutLog, AIInsight } from './types'

export function getClientStatusColor(status: Client['status']): string {
  switch (status) {
    case 'active':
      return 'bg-success text-success-foreground'
    case 'needs-attention':
      return 'bg-warning text-warning-foreground'
    case 'overdue':
      return 'bg-destructive text-destructive-foreground'
    case 'inactive':
      return 'bg-muted text-muted-foreground'
    default:
      return 'bg-muted text-muted-foreground'
  }
}

export function calculateAdherence(completed: number, total: number): number {
  if (total === 0) return 0
  return Math.round((completed / total) * 100)
}

export function formatDate(date: string): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function formatRelativeTime(date: string): string {
  const d = new Date(date)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
  return `${Math.floor(diffDays / 365)} years ago`
}

export function getDaysUntil(date: string): number {
  const d = new Date(date)
  const now = new Date()
  const diffMs = d.getTime() - now.getTime()
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24))
}

export function getComplianceColor(compliance: number): string {
  if (compliance >= 90) return 'text-success'
  if (compliance >= 70) return 'text-warning'
  return 'text-destructive'
}

export function calculateVolumeLoad(workouts: WorkoutLog[]): number {
  let total = 0
  workouts.forEach(workout => {
    workout.exercises.forEach(exercise => {
      exercise.sets.forEach(set => {
        if (set.completed) {
          total += set.reps * set.load
        }
      })
    })
  })
  return total
}

export function generateAIPromptForCheckIn(checkIn: CheckIn, client: Client): string {
  return window.spark.llmPrompt`You are an expert bodybuilding coach analyzing a client check-in.

Client Profile:
- Name: ${client.name}
- Training Age: ${client.profile.trainingAge} years
- Goals: ${client.profile.goals.join(', ')}
- Weak Points: ${client.profile.weakPoints.join(', ')}
- Volume Tolerance: ${client.profile.volumeTolerance}

Check-In Data:
- Weight: ${checkIn.weight} lbs (Target: ${client.metrics.targetWeight} lbs)
- Energy Level: ${checkIn.responses.energy}/10
- Hunger Level: ${checkIn.responses.hunger}/10
- Sleep Quality: ${checkIn.responses.sleep}/10
- Stress Level: ${checkIn.responses.stress}/10
- Training Adherence: ${checkIn.responses.adherence}/10
- Enjoyment: ${checkIn.responses.enjoyment}/10

Client Notes: ${checkIn.notes || 'None provided'}

Provide a concise 2-3 sentence coaching summary highlighting:
1. Key observations (positive or concerning patterns)
2. One specific actionable recommendation for the next week

Be supportive, specific, and focus on hypertrophy training principles.`
}

export async function generateCheckInInsights(checkIn: CheckIn, client: Client) {
  const prompt = window.spark.llmPrompt`You are an expert bodybuilding coach analyzing a client check-in. Generate 3-5 specific, actionable insights.

Client Profile:
- Name: ${client.name}
- Training Age: ${client.profile.trainingAge} years
- Goals: ${client.profile.goals.join(', ')}
- Weak Points: ${client.profile.weakPoints.join(', ')}
- Volume Tolerance: ${client.profile.volumeTolerance}
- Recovery Status: ${client.profile.recoveryStatus}

Check-In Data:
- Weight: ${checkIn.weight} lbs (Target: ${client.metrics.targetWeight} lbs)
- Energy Level: ${checkIn.responses.energy}/10
- Hunger Level: ${checkIn.responses.hunger}/10
- Sleep Quality: ${checkIn.responses.sleep}/10
- Stress Level: ${checkIn.responses.stress}/10
- Training Adherence: ${checkIn.responses.adherence}/10
- Enjoyment: ${checkIn.responses.enjoyment}/10

Client Notes: ${checkIn.notes || 'None provided'}

Return a JSON object with an "insights" property containing an array of insight objects. Each insight should have:
- "type": one of "observation", "recommendation", "concern", or "positive"
- "text": a clear, specific, actionable statement (1-2 sentences max)

Focus on:
1. Recovery markers (sleep, energy, stress)
2. Adherence patterns
3. Weight progression relative to goals
4. Training enjoyment and sustainability
5. Specific recommendations for next week

Example format:
{
  "insights": [
    {"type": "positive", "text": "Excellent training adherence this week shows strong commitment to the program."},
    {"type": "concern", "text": "Sleep averaging below 7/10 may be limiting recovery - consider earlier bedtime or stress management techniques."},
    {"type": "recommendation", "text": "With energy levels high, this is an ideal time to add 1-2 sets per muscle group to push progressive overload."}
  ]
}`

  const response = await window.spark.llm(prompt, 'gpt-4o-mini', true)
  const data = JSON.parse(response)
  
  return data.insights.map((insight: any, index: number) => ({
    id: `insight-${Date.now()}-${index}`,
    type: insight.type,
    text: insight.text,
    editable: true
  }))
}

export function generateAIPromptForProgression(client: Client, recentWorkouts: WorkoutLog[]): string {
  const volumeLoad = calculateVolumeLoad(recentWorkouts)
  const completionRate = calculateAdherence(
    recentWorkouts.filter(w => w.completed).length,
    recentWorkouts.length
  )
  
  return window.spark.llmPrompt`You are an expert bodybuilding coach reviewing training progression.

Client: ${client.name}
Training Age: ${client.profile.trainingAge} years
Volume Tolerance: ${client.profile.volumeTolerance}
Recent Volume Load: ${volumeLoad} total lbs
Workout Completion: ${completionRate}%

Recent Workout Data:
${JSON.stringify(recentWorkouts.slice(0, 5), null, 2)}

Based on hypertrophy principles, provide:
1. Should this client progress (add load/volume), maintain, or deload? Why?
2. Which specific exercises show good progression?
3. Any concerning patterns (skipped exercises, declining RPE, incomplete sessions)?

Keep response concise and actionable (3-4 sentences).`
}

export function generateAIPromptForProgramReview(client: Client, adherence: number): string {
  return window.spark.llmPrompt`You are a bodybuilding coach reviewing a client's weekly performance.

Client: ${client.name}
Goals: ${client.profile.goals.join(', ')}
Weak Points to Address: ${client.profile.weakPoints.join(', ')}

Current Week Performance:
- Workout Adherence: ${client.adherence.workoutCompliance}%
- Nutrition Adherence: ${client.adherence.nutritionCompliance}%
- Check-In Adherence: ${client.adherence.checkInCompliance}%

Identify:
1. One strength this week
2. One area needing attention
3. One specific action item for next week

Format as a brief, motivating summary (2-3 sentences).`
}

export const MUSCLE_GROUPS = [
  'Chest',
  'Back',
  'Shoulders',
  'Biceps',
  'Triceps',
  'Forearms',
  'Quads',
  'Hamstrings',
  'Glutes',
  'Calves',
  'Abs',
  'Core'
]

export const EQUIPMENT_OPTIONS = [
  'Barbell',
  'Dumbbell',
  'Machine',
  'Cable',
  'Bodyweight',
  'Kettlebell',
  'Resistance Band',
  'Smith Machine',
  'Other'
]

export const EXERCISE_LIBRARY = [
  { id: 'ex1', name: 'Barbell Bench Press', muscleGroup: 'Chest', equipment: ['Barbell'] },
  { id: 'ex2', name: 'Barbell Squat', muscleGroup: 'Quads', equipment: ['Barbell'] },
  { id: 'ex3', name: 'Deadlift', muscleGroup: 'Back', equipment: ['Barbell'] },
  { id: 'ex4', name: 'Barbell Row', muscleGroup: 'Back', equipment: ['Barbell'] },
  { id: 'ex5', name: 'Overhead Press', muscleGroup: 'Shoulders', equipment: ['Barbell'] },
  { id: 'ex6', name: 'Pull-ups', muscleGroup: 'Back', equipment: ['Bodyweight'] },
  { id: 'ex7', name: 'Dips', muscleGroup: 'Chest', equipment: ['Bodyweight'] },
  { id: 'ex8', name: 'Incline Dumbbell Press', muscleGroup: 'Chest', equipment: ['Dumbbell'] },
  { id: 'ex9', name: 'Romanian Deadlift', muscleGroup: 'Hamstrings', equipment: ['Barbell'] },
  { id: 'ex10', name: 'Leg Press', muscleGroup: 'Quads', equipment: ['Machine'] },
  { id: 'ex11', name: 'Lat Pulldown', muscleGroup: 'Back', equipment: ['Cable'] },
  { id: 'ex12', name: 'Cable Fly', muscleGroup: 'Chest', equipment: ['Cable'] },
  { id: 'ex13', name: 'Lateral Raise', muscleGroup: 'Shoulders', equipment: ['Dumbbell'] },
  { id: 'ex14', name: 'Leg Curl', muscleGroup: 'Hamstrings', equipment: ['Machine'] },
  { id: 'ex15', name: 'Leg Extension', muscleGroup: 'Quads', equipment: ['Machine'] },
  { id: 'ex16', name: 'Barbell Curl', muscleGroup: 'Biceps', equipment: ['Barbell'] },
  { id: 'ex17', name: 'Tricep Pushdown', muscleGroup: 'Triceps', equipment: ['Cable'] },
  { id: 'ex18', name: 'Face Pull', muscleGroup: 'Shoulders', equipment: ['Cable'] },
  { id: 'ex19', name: 'Calf Raise', muscleGroup: 'Calves', equipment: ['Machine'] },
  { id: 'ex20', name: 'Plank', muscleGroup: 'Core', equipment: ['Bodyweight'] }
]
