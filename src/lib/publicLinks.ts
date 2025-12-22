import { db } from './firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'

export interface PublicLink {
  id: string
  type: 'client' | 'program' | 'progress'
  resourceId: string
  createdBy: string
  createdAt: string
  expiresAt?: string
  accessCount: number
  maxAccess?: number
  isActive: boolean
}

export const generatePublicLink = async (
  type: PublicLink['type'],
  resourceId: string,
  userId: string,
  options?: {
    expiresInDays?: number
    maxAccess?: number
  }
): Promise<string> => {
  const linkId = uuidv4()
  const createdAt = new Date().toISOString()
  
  let expiresAt: string | undefined
  if (options?.expiresInDays) {
    const expiry = new Date()
    expiry.setDate(expiry.getDate() + options.expiresInDays)
    expiresAt = expiry.toISOString()
  }

  const publicLink: PublicLink = {
    id: linkId,
    type,
    resourceId,
    createdBy: userId,
    createdAt,
    expiresAt,
    accessCount: 0,
    maxAccess: options?.maxAccess,
    isActive: true
  }

  await setDoc(doc(db, 'publicLinks', linkId), publicLink)

  return `${window.location.origin}/public/${type}/${linkId}`
}

export const getPublicLink = async (linkId: string): Promise<PublicLink | null> => {
  const docRef = doc(db, 'publicLinks', linkId)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) {
    return null
  }

  const link = docSnap.data() as PublicLink

  if (!link.isActive) {
    return null
  }

  if (link.expiresAt && new Date(link.expiresAt) < new Date()) {
    return null
  }

  if (link.maxAccess && link.accessCount >= link.maxAccess) {
    return null
  }

  return link
}

export const incrementAccessCount = async (linkId: string): Promise<void> => {
  const docRef = doc(db, 'publicLinks', linkId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const link = docSnap.data() as PublicLink
    await setDoc(docRef, {
      ...link,
      accessCount: link.accessCount + 1
    })
  }
}

export const deactivatePublicLink = async (linkId: string): Promise<void> => {
  const docRef = doc(db, 'publicLinks', linkId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    const link = docSnap.data() as PublicLink
    await setDoc(docRef, {
      ...link,
      isActive: false
    })
  }
}
