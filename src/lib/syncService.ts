import { db } from './firebase'
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  deleteDoc,
  writeBatch,
  query,
  where,
  Timestamp
} from 'firebase/firestore'
import { Client, Program, CheckIn, AIInsight, Notification, ActivityFeedItem } from './types'

export class SyncService {
  private userId: string
  private syncEnabled: boolean = true

  constructor(userId: string) {
    this.userId = userId
  }

  private getCollectionPath(collectionName: string): string {
    return `users/${this.userId}/${collectionName}`
  }

  async syncToFirestore<T extends Record<string, any>>(
    collectionName: string,
    data: T[]
  ): Promise<void> {
    if (!this.syncEnabled) return

    try {
      const batch = writeBatch(db)
      const collectionPath = this.getCollectionPath(collectionName)

      data.forEach((item) => {
        if (item.id) {
          const docRef = doc(db, collectionPath, item.id)
          batch.set(docRef, {
            ...item,
            syncedAt: Timestamp.now(),
            userId: this.userId
          })
        }
      })

      await batch.commit()
      console.log(`✓ Synced ${data.length} items to ${collectionName}`)
    } catch (error) {
      console.error(`Error syncing ${collectionName}:`, error)
      throw error
    }
  }

  async syncFromFirestore<T>(collectionName: string): Promise<T[]> {
    if (!this.syncEnabled) return []

    try {
      const collectionPath = this.getCollectionPath(collectionName)
      const collectionRef = collection(db, collectionPath)
      const snapshot = await getDocs(collectionRef)

      const data = snapshot.docs.map((doc) => {
        const docData = doc.data()
        delete docData.syncedAt
        delete docData.userId
        return docData as T
      })

      console.log(`✓ Loaded ${data.length} items from ${collectionName}`)
      return data
    } catch (error) {
      console.error(`Error loading ${collectionName}:`, error)
      return []
    }
  }

  async syncClients(clients: Client[]): Promise<void> {
    return this.syncToFirestore('clients', clients)
  }

  async loadClients(): Promise<Client[]> {
    return this.syncFromFirestore<Client>('clients')
  }

  async syncPrograms(programs: Program[]): Promise<void> {
    return this.syncToFirestore('programs', programs)
  }

  async loadPrograms(): Promise<Program[]> {
    return this.syncFromFirestore<Program>('programs')
  }

  async syncCheckIns(checkIns: CheckIn[]): Promise<void> {
    return this.syncToFirestore('check-ins', checkIns)
  }

  async loadCheckIns(): Promise<CheckIn[]> {
    return this.syncFromFirestore<CheckIn>('check-ins')
  }

  async syncInsights(insights: AIInsight[]): Promise<void> {
    return this.syncToFirestore('insights', insights)
  }

  async loadInsights(): Promise<AIInsight[]> {
    return this.syncFromFirestore<AIInsight>('insights')
  }

  async syncNotifications(notifications: Notification[]): Promise<void> {
    return this.syncToFirestore('notifications', notifications)
  }

  async loadNotifications(): Promise<Notification[]> {
    return this.syncFromFirestore<Notification>('notifications')
  }

  async syncActivities(activities: ActivityFeedItem[]): Promise<void> {
    return this.syncToFirestore('activities', activities)
  }

  async loadActivities(): Promise<ActivityFeedItem[]> {
    return this.syncFromFirestore<ActivityFeedItem>('activities')
  }

  async syncAll(data: {
    clients?: Client[]
    programs?: Program[]
    checkIns?: CheckIn[]
    insights?: AIInsight[]
    notifications?: Notification[]
    activities?: ActivityFeedItem[]
  }): Promise<void> {
    const promises: Promise<void>[] = []

    if (data.clients) promises.push(this.syncClients(data.clients))
    if (data.programs) promises.push(this.syncPrograms(data.programs))
    if (data.checkIns) promises.push(this.syncCheckIns(data.checkIns))
    if (data.insights) promises.push(this.syncInsights(data.insights))
    if (data.notifications) promises.push(this.syncNotifications(data.notifications))
    if (data.activities) promises.push(this.syncActivities(data.activities))

    await Promise.all(promises)
  }

  async loadAll(): Promise<{
    clients: Client[]
    programs: Program[]
    checkIns: CheckIn[]
    insights: AIInsight[]
    notifications: Notification[]
    activities: ActivityFeedItem[]
  }> {
    const [clients, programs, checkIns, insights, notifications, activities] = await Promise.all([
      this.loadClients(),
      this.loadPrograms(),
      this.loadCheckIns(),
      this.loadInsights(),
      this.loadNotifications(),
      this.loadActivities()
    ])

    return {
      clients,
      programs,
      checkIns,
      insights,
      notifications,
      activities
    }
  }

  async clearAllData(): Promise<void> {
    const collections = ['clients', 'programs', 'check-ins', 'insights', 'notifications', 'activities']
    
    for (const collectionName of collections) {
      try {
        const collectionPath = this.getCollectionPath(collectionName)
        const collectionRef = collection(db, collectionPath)
        const snapshot = await getDocs(collectionRef)
        
        const batch = writeBatch(db)
        snapshot.docs.forEach((doc) => {
          batch.delete(doc.ref)
        })
        
        await batch.commit()
        console.log(`✓ Cleared ${collectionName}`)
      } catch (error) {
        console.error(`Error clearing ${collectionName}:`, error)
      }
    }
  }

  setSyncEnabled(enabled: boolean): void {
    this.syncEnabled = enabled
  }
}

export const createSyncService = (userId: string): SyncService => {
  return new SyncService(userId)
}
