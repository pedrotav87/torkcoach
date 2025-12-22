export interface Client {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  status: 'active' | 'inactive' | 'needs-attention' | 'overdue'
  
  profile: {
    age: number
    gender: 'male' | 'female' | 'other'
    trainingAge: number
    goals: string[]
    weakPoints: string[]
    injuries: Injury[]
    nutritionHabits: string
    volumeTolerance: 'low' | 'medium' | 'high'
    recoveryStatus: 'excellent' | 'good' | 'fair' | 'poor'
  }
  
  metrics: {
    currentWeight: number
    targetWeight: number
    bodyFat?: number
    measurements: Measurements
  }
  
  adherence: {
    workoutCompliance: number
    nutritionCompliance: number
    checkInCompliance: number
  }
  
  currentProgram?: string
  lastCheckIn?: string
  lastWorkout?: string
  nextCheckInDue?: string
  
  createdAt: string
  updatedAt: string
}

export interface Injury {
  id: string
  area: string
  description: string
  severity: 'minor' | 'moderate' | 'severe'
  date: string
  resolved: boolean
}

export interface Certification {
  id: string
  name: string
  issuer: string
  year: number
  verified?: boolean
}

export interface Measurements {
  chest?: number
  shoulders?: number
  arms?: number
  waist?: number
  hips?: number
  thighs?: number
  calves?: number
  recordedAt: string
}

export interface Program {
  id: string
  name: string
  clientId: string
  description?: string
  startDate: string
  endDate: string
  status: 'active' | 'completed' | 'draft'
  
  weeks: Week[]
  
  goals: string[]
  notes?: string
  
  createdAt: string
  updatedAt: string
}

export interface Week {
  weekNumber: number
  days: TrainingDay[]
}

export interface TrainingDay {
  dayNumber: number
  name: string
  exercises: Exercise[]
  notes?: string
}

export interface Exercise {
  id: string
  name: string
  muscleGroup: string
  equipment: string[]
  videoUrl?: string
  imageUrl?: string
  instructions?: string
  
  sets: ExerciseSet[]
  restPeriod?: number
  
  supersetWith?: string
  notes?: string
}

export interface ExerciseSet {
  setNumber: number
  reps: number | string
  rpe?: number
  load?: number
  tempo?: string
  type: 'working' | 'warmup' | 'dropset' | 'amrap'
}

export interface WorkoutLog {
  id: string
  clientId: string
  programId: string
  dayNumber: number
  date: string
  
  exercises: LoggedExercise[]
  
  duration?: number
  notes?: string
  fatigue?: number
  mood?: number
  
  completed: boolean
  createdAt: string
}

export interface LoggedExercise {
  exerciseId: string
  name: string
  sets: LoggedSet[]
  notes?: string
}

export interface LoggedSet {
  setNumber: number
  reps: number
  load: number
  rpe?: number
  completed: boolean
}

export interface CheckIn {
  id: string
  clientId: string
  date: string
  
  weight: number
  bodyFat?: number
  measurements?: Measurements
  
  photos?: ProgressPhoto[]
  
  responses: {
    energy: number
    hunger: number
    stress: number
    sleep: number
    adherence: number
    enjoyment: number
  }
  
  notes?: string
  coachFeedback?: string
  coachReviewed: boolean
  
  aiSummary?: string
  aiInsights?: CheckInInsight[]
  
  createdAt: string
  reviewedAt?: string
}

export interface CheckInInsight {
  id: string
  type: 'observation' | 'recommendation' | 'concern' | 'positive'
  text: string
  editable?: boolean
}

export interface ProgressPhoto {
  id: string
  url: string
  type: 'front' | 'back' | 'side' | 'other'
  date: string
}

export interface Message {
  id: string
  threadId: string
  senderId: string
  senderName: string
  senderRole: 'coach' | 'client'
  
  type: 'text' | 'voice' | 'video' | 'image'
  content: string
  mediaUrl?: string
  
  read: boolean
  
  createdAt: string
}

export interface MessageThread {
  id: string
  clientId: string
  lastMessage?: Message
  unreadCount: number
  updatedAt: string
}

export interface NutritionLog {
  id: string
  clientId: string
  date: string
  
  meals: Meal[]
  
  totals: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
  
  targets: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
  
  notes?: string
  
  createdAt: string
}

export interface Meal {
  id: string
  name: string
  time: string
  foods: FoodItem[]
}

export interface FoodItem {
  id: string
  name: string
  quantity: number
  unit: string
  
  calories: number
  protein: number
  carbs: number
  fat: number
}

export interface AIInsight {
  id: string
  clientId: string
  type: 'progression' | 'recovery' | 'adherence' | 'nutrition' | 'warning'
  
  title: string
  summary: string
  recommendations: string[]
  
  priority: 'low' | 'medium' | 'high' | 'critical'
  
  data?: Record<string, any>
  
  dismissed: boolean
  
  createdAt: string
}

export interface Notification {
  id: string
  type: 'check-in' | 'program-ending' | 'message' | 'compliance' | 'milestone'
  
  title: string
  message: string
  
  clientId?: string
  clientName?: string
  
  actionUrl?: string
  
  read: boolean
  
  createdAt: string
}

export interface ActivityFeedItem {
  id: string
  clientId: string
  clientName: string
  clientAvatar?: string
  type: 'workout-complete' | 'meal-logged' | 'pr-beaten' | 'progression-overload' | 'check-in-submitted' | 'milestone'
  
  title: string
  description: string
  metadata?: Record<string, any>
  
  reactions: ActivityReaction[]
  
  createdAt: string
}

export interface ActivityReaction {
  id: string
  type: 'kudos' | 'fire' | 'strong' | 'message'
  message?: string
  coachName: string
  createdAt: string
}

export type ViewMode = 'coach' | 'client'

export type DashboardFilter = 'all' | 'active' | 'needs-attention' | 'overdue' | 'inactive'

export interface TrainerProfile {
  id: string
  name: string
  email: string
  avatar?: string
  bio?: string
  specializations: string[]
  certifications: Certification[]
  experience: {
    yearsCoaching: number
    totalClients: number
    successStories?: string
  }
  social?: {
    instagram?: string
    youtube?: string
    website?: string
  }
  contactInfo: {
    phone?: string
    availability?: string
    timezone?: string
  }
  createdAt: string
  updatedAt: string
}
