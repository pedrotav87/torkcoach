import { Client, Program, CheckIn, AIInsight, Notification, ActivityFeedItem, CheckInInsight } from './types'

export function generateDemoClients(): Client[] {
  return [
    {
      id: 'client-1',
      name: 'Sarah Mitchell',
      email: 'sarah.mitchell@email.com',
      status: 'active',
      profile: {
        age: 28,
        gender: 'female',
        trainingAge: 3,
        goals: ['Build muscle mass', 'Increase strength', 'Improve posture'],
        weakPoints: ['Shoulders', 'Upper back'],
        injuries: [],
        nutritionHabits: 'Tracks macros consistently, meal preps weekly',
        volumeTolerance: 'medium',
        recoveryStatus: 'good'
      },
      metrics: {
        currentWeight: 145,
        targetWeight: 152,
        measurements: {
          chest: 35,
          shoulders: 42,
          arms: 12.5,
          waist: 27,
          hips: 38,
          thighs: 22,
          calves: 14,
          recordedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        }
      },
      adherence: {
        workoutCompliance: 92,
        nutritionCompliance: 88,
        checkInCompliance: 100
      },
      currentProgram: 'program-1',
      lastCheckIn: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      lastWorkout: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      nextCheckInDue: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'client-2',
      name: 'Marcus Johnson',
      email: 'marcus.j@email.com',
      status: 'active',
      profile: {
        age: 35,
        gender: 'male',
        trainingAge: 8,
        goals: ['Contest prep', 'Improve symmetry', 'Peak condition'],
        weakPoints: ['Calves', 'Rear delts'],
        injuries: [
          {
            id: 'inj-1',
            area: 'Lower back',
            description: 'Mild strain from deadlifts',
            severity: 'minor',
            date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
            resolved: false
          }
        ],
        nutritionHabits: 'Strict meal plan, tracking everything',
        volumeTolerance: 'high',
        recoveryStatus: 'excellent'
      },
      metrics: {
        currentWeight: 195,
        targetWeight: 187,
        bodyFat: 12,
        measurements: {
          chest: 44,
          shoulders: 52,
          arms: 17,
          waist: 32,
          hips: 40,
          thighs: 26,
          calves: 16,
          recordedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
        }
      },
      adherence: {
        workoutCompliance: 98,
        nutritionCompliance: 95,
        checkInCompliance: 100
      },
      currentProgram: 'program-2',
      lastCheckIn: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      lastWorkout: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      nextCheckInDue: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'client-3',
      name: 'Tyler Rodriguez',
      email: 'tyler.rod@email.com',
      status: 'needs-attention',
      profile: {
        age: 24,
        gender: 'male',
        trainingAge: 2,
        goals: ['Build overall mass', 'Gain strength'],
        weakPoints: ['Chest', 'Arms'],
        injuries: [],
        nutritionHabits: 'Inconsistent tracking, needs guidance',
        volumeTolerance: 'medium',
        recoveryStatus: 'fair'
      },
      metrics: {
        currentWeight: 168,
        targetWeight: 180,
        measurements: {
          chest: 38,
          shoulders: 46,
          arms: 14,
          waist: 30,
          hips: 37,
          thighs: 23,
          calves: 15,
          recordedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
        }
      },
      adherence: {
        workoutCompliance: 75,
        nutritionCompliance: 62,
        checkInCompliance: 80
      },
      currentProgram: 'program-3',
      lastCheckIn: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      lastWorkout: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      nextCheckInDue: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]
}

export function generateDemoPrograms(): Program[] {
  return [
    {
      id: 'program-1',
      name: 'Upper/Lower Hypertrophy - 4 Day',
      clientId: 'client-1',
      description: 'Focus on building muscle mass with balanced upper/lower split',
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      weeks: [],
      goals: ['Muscle hypertrophy', 'Strength development'],
      createdAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'program-2',
      name: 'Contest Prep - High Volume',
      clientId: 'client-2',
      description: 'Advanced program for competition preparation',
      startDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      weeks: [],
      goals: ['Peak conditioning', 'Maintain muscle mass', 'Improve weak points'],
      createdAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'program-3',
      name: 'Mass Building - Push/Pull/Legs',
      clientId: 'client-3',
      description: 'Focus on compound movements and progressive overload',
      startDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 70 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      weeks: [],
      goals: ['Mass gain', 'Strength foundation'],
      createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]
}

export function generateDemoCheckIns(): CheckIn[] {
  const demoInsights: CheckInInsight[] = [
    {
      id: 'insight-1',
      type: 'positive',
      text: 'Excellent training adherence this week shows strong commitment to the program.',
      editable: true
    },
    {
      id: 'insight-2',
      type: 'observation',
      text: 'Energy levels have remained consistent, indicating good recovery between sessions.',
      editable: true
    },
    {
      id: 'insight-3',
      type: 'recommendation',
      text: 'Consider adding 5-10 lbs to compound movements where RPE is below 8 to maintain progressive overload.',
      editable: true
    }
  ]

  return [
    {
      id: 'checkin-1',
      clientId: 'client-1',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      weight: 145.2,
      responses: {
        energy: 8,
        hunger: 7,
        stress: 4,
        sleep: 7,
        adherence: 9,
        enjoyment: 9
      },
      notes: 'Feeling great this week! Bench press felt really strong, got 135x10 which is a new rep PR. Sleep could be better but overall energy is good.',
      coachReviewed: false,
      aiInsights: demoInsights,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'checkin-2',
      clientId: 'client-2',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      weight: 193.8,
      bodyFat: 11.5,
      responses: {
        energy: 9,
        hunger: 8,
        stress: 3,
        sleep: 9,
        adherence: 10,
        enjoyment: 9
      },
      notes: 'Weight dropping nicely on schedule. Strength holding well. Lower back feeling 90% better.',
      coachReviewed: false,
      aiInsights: [
        {
          id: 'insight-4',
          type: 'positive',
          text: 'Perfect adherence and recovery markers indicate the prep is progressing ideally.',
          editable: true
        },
        {
          id: 'insight-5',
          type: 'recommendation',
          text: 'Lower back showing improvement - monitor closely but can cautiously reintroduce Romanian deadlifts with lighter weight.',
          editable: true
        }
      ],
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'checkin-3',
      clientId: 'client-3',
      date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      weight: 169.1,
      responses: {
        energy: 6,
        hunger: 9,
        stress: 7,
        sleep: 5,
        adherence: 6,
        enjoyment: 7
      },
      notes: 'Busy week at work, missed two sessions. Sleep has been rough. Need to get back on track.',
      coachReviewed: false,
      aiInsights: [
        {
          id: 'insight-6',
          type: 'concern',
          text: 'Low sleep (5/10) and missed sessions suggest stress management and scheduling support needed.',
          editable: true
        },
        {
          id: 'insight-7',
          type: 'recommendation',
          text: 'Consider switching to 3-day program temporarily to reduce pressure while work stress is high.',
          editable: true
        }
      ],
      createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]
}

export function generateDemoActivities(): ActivityFeedItem[] {
  return [
    {
      id: 'activity-1',
      clientId: 'client-1',
      clientName: 'Sarah Mitchell',
      type: 'pr-beaten',
      title: 'New Personal Record!',
      description: 'Barbell Bench Press - 135 lbs x 10 reps',
      metadata: {
        'Previous Best': '130x10',
        'Weight Increase': '+5 lbs',
        'Volume': '1,350 lbs'
      },
      reactions: [],
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'activity-2',
      clientId: 'client-2',
      clientName: 'Marcus Johnson',
      type: 'workout-complete',
      title: 'Push Day - Week 12 Complete',
      description: 'Crushed all sets on chest and shoulders. Feeling strong!',
      metadata: {
        'Duration': '75 min',
        'Volume Load': '14,250 lbs',
        'Exercises': '8'
      },
      reactions: [],
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'activity-3',
      clientId: 'client-1',
      clientName: 'Sarah Mitchell',
      type: 'meal-logged',
      title: 'Hit Macro Targets',
      description: 'All meals logged - 2,100 calories, 140g protein',
      metadata: {
        'Protein': '140g / 140g',
        'Carbs': '220g / 230g',
        'Fat': '65g / 60g'
      },
      reactions: [],
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'activity-4',
      clientId: 'client-2',
      clientName: 'Marcus Johnson',
      type: 'progression-overload',
      title: 'Progressive Overload Detected',
      description: 'Incline Dumbbell Press volume increased 15% over last 3 weeks',
      metadata: {
        'Week 10': '3,200 lbs',
        'Week 11': '3,400 lbs',
        'Week 12': '3,680 lbs'
      },
      reactions: [],
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'activity-5',
      clientId: 'client-1',
      clientName: 'Sarah Mitchell',
      type: 'check-in-submitted',
      title: 'Weekly Check-In Submitted',
      description: 'Weight: 145.2 lbs (+0.8 from last week) - Energy and recovery looking great!',
      metadata: {
        'Energy': '8/10',
        'Sleep': '7/10',
        'Adherence': '9/10'
      },
      reactions: [],
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'activity-6',
      clientId: 'client-2',
      clientName: 'Marcus Johnson',
      type: 'milestone',
      title: '12 Week Transformation Milestone',
      description: 'Successfully completed 12 weeks of contest prep. Down 8 lbs while maintaining all major lifts!',
      metadata: {
        'Weight Lost': '8 lbs',
        'Strength': 'Maintained',
        'Adherence': '98%'
      },
      reactions: [],
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]
}
