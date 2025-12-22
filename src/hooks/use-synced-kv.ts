import { useState, useEffect, useCallback } from 'react'
import { useKV } from '@github/spark/hooks'
import { useAuth } from '@/contexts/AuthContext'
import { createSyncService } from '@/lib/syncService'
import { isFirebaseConfigured } from '@/lib/firebase'

export function useSyncedKV<T>(
  key: string,
  defaultValue: T,
  options?: {
    syncOnChange?: boolean
    syncInterval?: number
  }
): [T, (value: T | ((prev: T) => T)) => void, () => void, { syncing: boolean; lastSync: Date | null }] {
  const { user } = useAuth()
  const [kvValue, setKVValue, deleteKVValue] = useKV<T>(key, defaultValue)
  const [syncing, setSyncing] = useState(false)
  const [lastSync, setLastSync] = useState<Date | null>(null)
  
  const safeValue = (kvValue ?? defaultValue) as T

  const syncOnChange = options?.syncOnChange ?? true
  const syncInterval = options?.syncInterval ?? 30000

  const syncToFirebase = useCallback(async (data: T) => {
    if (!user || !isFirebaseConfigured()) return

    try {
      setSyncing(true)
      const syncService = createSyncService(user.uid)

      if (Array.isArray(data)) {
        await syncService.syncToFirestore(key, data as any[])
      } else if (typeof data === 'object' && data !== null) {
        await syncService.syncToFirestore(key, [data] as any[])
      }

      setLastSync(new Date())
    } catch (error) {
      console.error(`Sync error for ${key}:`, error)
    } finally {
      setSyncing(false)
    }
  }, [user, key])

  const loadFromFirebase = useCallback(async () => {
    if (!user || !isFirebaseConfigured()) return

    try {
      setSyncing(true)
      const syncService = createSyncService(user.uid)
      const data = await syncService.syncFromFirestore<any>(key)

      if (data && data.length > 0) {
        if (Array.isArray(defaultValue)) {
          setKVValue(data as T)
        } else {
          setKVValue(data[0] as T)
        }
        setLastSync(new Date())
      }
    } catch (error) {
      console.error(`Load error for ${key}:`, error)
    } finally {
      setSyncing(false)
    }
  }, [user, key, defaultValue, setKVValue])

  useEffect(() => {
    loadFromFirebase()
  }, [])

  useEffect(() => {
    if (syncOnChange && safeValue !== defaultValue) {
      syncToFirebase(safeValue)
    }
  }, [safeValue, syncOnChange, syncToFirebase, defaultValue])

  useEffect(() => {
    if (!syncInterval || !user) return

    const interval = setInterval(() => {
      syncToFirebase(safeValue)
    }, syncInterval)

    return () => clearInterval(interval)
  }, [syncInterval, user, safeValue, syncToFirebase])

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    if (typeof value === 'function') {
      setKVValue(value as (prev: T) => T)
    } else {
      setKVValue(value as T)
    }
  }, [setKVValue])

  const deleteValue = useCallback(() => {
    deleteKVValue()
  }, [deleteKVValue])

  return [safeValue, setValue, deleteValue, { syncing, lastSync }]
}
