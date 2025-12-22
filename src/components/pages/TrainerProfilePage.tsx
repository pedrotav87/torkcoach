import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { TrainerProfile, Certification } from '@/lib/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  PencilSimple, 
  CheckCircle, 
  XCircle, 
  Plus, 
  Trash,
  Certificate,
  Users,
  Trophy,
  InstagramLogo,
  YoutubeLogo,
  Globe
} from '@phosphor-icons/react'
import { toast } from 'sonner'

export function TrainerProfilePage() {
  const [profile, setProfile] = useKV<TrainerProfile | null>('trainer-profile', null)
  const [isEditing, setIsEditing] = useState(!profile)
  const [editedProfile, setEditedProfile] = useState<TrainerProfile>(
    profile || {
      id: 'trainer-1',
      name: '',
      email: '',
      bio: '',
      specializations: [],
      certifications: [],
      experience: {
        yearsCoaching: 0,
        totalClients: 0,
        successStories: ''
      },
      social: {
        instagram: '',
        youtube: '',
        website: ''
      },
      contactInfo: {
        phone: '',
        availability: '',
        timezone: ''
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  )
  
  const [newSpecialization, setNewSpecialization] = useState('')
  const [newCertification, setNewCertification] = useState<Omit<Certification, 'id'>>({
    name: '',
    issuer: '',
    year: new Date().getFullYear(),
    verified: false
  })

  const handleSave = () => {
    if (!editedProfile.name || !editedProfile.email) {
      toast.error('Please fill in required fields', {
        description: 'Name and email are required'
      })
      return
    }

    setProfile({
      ...editedProfile,
      updatedAt: new Date().toISOString()
    })
    setIsEditing(false)
    toast.success('Profile updated successfully', {
      description: 'Your trainer profile has been saved'
    })
  }

  const handleCancel = () => {
    if (profile) {
      setEditedProfile(profile)
      setIsEditing(false)
    }
  }

  const addSpecialization = () => {
    if (newSpecialization.trim()) {
      setEditedProfile((prev) => ({
        ...prev,
        specializations: [...prev.specializations, newSpecialization.trim()]
      }))
      setNewSpecialization('')
    }
  }

  const removeSpecialization = (index: number) => {
    setEditedProfile((prev) => ({
      ...prev,
      specializations: prev.specializations.filter((_, i) => i !== index)
    }))
  }

  const addCertification = () => {
    if (newCertification.name && newCertification.issuer) {
      setEditedProfile((prev) => ({
        ...prev,
        certifications: [
          ...prev.certifications,
          { ...newCertification, id: `cert-${Date.now()}` }
        ]
      }))
      setNewCertification({
        name: '',
        issuer: '',
        year: new Date().getFullYear(),
        verified: false
      })
    }
  }

  const removeCertification = (id: string) => {
    setEditedProfile((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((cert) => cert.id !== id)
    }))
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  if (!isEditing && profile) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-heading">Trainer Profile</h1>
            <p className="text-muted-foreground mt-1">
              Your public profile visible to students
            </p>
          </div>
          <Button onClick={() => setIsEditing(true)}>
            <PencilSimple className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-start gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profile.avatar} />
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {getInitials(profile.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-2xl">{profile.name}</CardTitle>
                <CardDescription className="text-base mt-1">{profile.email}</CardDescription>
                
                <div className="flex items-center gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-accent" />
                    <span className="text-muted-foreground">
                      {profile.experience.yearsCoaching} years experience
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-accent" />
                    <span className="text-muted-foreground">
                      {profile.experience.totalClients}+ clients coached
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {profile.bio && (
              <div>
                <h3 className="font-semibold mb-2">About</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">{profile.bio}</p>
              </div>
            )}

            {profile.specializations.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Specializations</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.specializations.map((spec, index) => (
                    <Badge key={index} variant="secondary">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {profile.certifications.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Certificate className="w-5 h-5 text-accent" />
                  Certifications
                </h3>
                <div className="space-y-3">
                  {profile.certifications.map((cert) => (
                    <div key={cert.id} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                      <Certificate className="w-5 h-5 text-accent mt-0.5" />
                      <div className="flex-1">
                        <div className="font-medium">{cert.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {cert.issuer} • {cert.year}
                        </div>
                      </div>
                      {cert.verified && (
                        <CheckCircle className="w-5 h-5 text-success" weight="fill" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {profile.experience.successStories && (
              <div>
                <h3 className="font-semibold mb-2">Success Stories</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {profile.experience.successStories}
                </p>
              </div>
            )}

            {(profile.social?.instagram || profile.social?.youtube || profile.social?.website) && (
              <div>
                <h3 className="font-semibold mb-2">Connect</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.social.instagram && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={`https://instagram.com/${profile.social.instagram}`} target="_blank" rel="noopener noreferrer">
                        <InstagramLogo className="w-4 h-4 mr-2" />
                        Instagram
                      </a>
                    </Button>
                  )}
                  {profile.social.youtube && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={profile.social.youtube} target="_blank" rel="noopener noreferrer">
                        <YoutubeLogo className="w-4 h-4 mr-2" />
                        YouTube
                      </a>
                    </Button>
                  )}
                  {profile.social.website && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={profile.social.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="w-4 h-4 mr-2" />
                        Website
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            )}

            {(profile.contactInfo.phone || profile.contactInfo.availability) && (
              <div>
                <h3 className="font-semibold mb-2">Contact Information</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  {profile.contactInfo.phone && (
                    <div>Phone: {profile.contactInfo.phone}</div>
                  )}
                  {profile.contactInfo.availability && (
                    <div>Availability: {profile.contactInfo.availability}</div>
                  )}
                  {profile.contactInfo.timezone && (
                    <div>Timezone: {profile.contactInfo.timezone}</div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading">
            {profile ? 'Edit Trainer Profile' : 'Create Trainer Profile'}
          </h1>
          <p className="text-muted-foreground mt-1">
            This information will be visible to your students
          </p>
        </div>
        <div className="flex gap-2">
          {profile && (
            <Button variant="outline" onClick={handleCancel}>
              <XCircle className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          )}
          <Button onClick={handleSave}>
            <CheckCircle className="w-4 h-4 mr-2" />
            Save Profile
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Your name, contact, and professional details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={editedProfile.name}
                onChange={(e) =>
                  setEditedProfile((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={editedProfile.email}
                onChange={(e) =>
                  setEditedProfile((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio / Description</Label>
            <Textarea
              id="bio"
              value={editedProfile.bio}
              onChange={(e) =>
                setEditedProfile((prev) => ({ ...prev, bio: e.target.value }))
              }
              placeholder="Tell students about your coaching philosophy, experience, and approach..."
              rows={5}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="years">Years Coaching</Label>
              <Input
                id="years"
                type="number"
                value={editedProfile.experience.yearsCoaching}
                onChange={(e) =>
                  setEditedProfile((prev) => ({
                    ...prev,
                    experience: { ...prev.experience, yearsCoaching: parseInt(e.target.value) || 0 }
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clients">Total Clients Coached</Label>
              <Input
                id="clients"
                type="number"
                value={editedProfile.experience.totalClients}
                onChange={(e) =>
                  setEditedProfile((prev) => ({
                    ...prev,
                    experience: { ...prev.experience, totalClients: parseInt(e.target.value) || 0 }
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={editedProfile.contactInfo.phone}
                onChange={(e) =>
                  setEditedProfile((prev) => ({
                    ...prev,
                    contactInfo: { ...prev.contactInfo, phone: e.target.value }
                  }))
                }
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="availability">Availability</Label>
              <Input
                id="availability"
                value={editedProfile.contactInfo.availability}
                onChange={(e) =>
                  setEditedProfile((prev) => ({
                    ...prev,
                    contactInfo: { ...prev.contactInfo, availability: e.target.value }
                  }))
                }
                placeholder="Mon-Fri 9am-6pm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Input
                id="timezone"
                value={editedProfile.contactInfo.timezone}
                onChange={(e) =>
                  setEditedProfile((prev) => ({
                    ...prev,
                    contactInfo: { ...prev.contactInfo, timezone: e.target.value }
                  }))
                }
                placeholder="EST, PST, UTC+1, etc."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Specializations</CardTitle>
          <CardDescription>Areas of expertise (e.g., Hypertrophy, Powerlifting, Nutrition)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newSpecialization}
              onChange={(e) => setNewSpecialization(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  addSpecialization()
                }
              }}
              placeholder="Enter a specialization"
            />
            <Button type="button" onClick={addSpecialization}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          {editedProfile.specializations.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {editedProfile.specializations.map((spec, index) => (
                <Badge key={index} variant="secondary" className="gap-2">
                  {spec}
                  <button
                    onClick={() => removeSpecialization(index)}
                    className="hover:text-destructive"
                  >
                    <XCircle className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Certifications</CardTitle>
          <CardDescription>Professional certifications and credentials</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <Input
              value={newCertification.name}
              onChange={(e) =>
                setNewCertification((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Certification name"
            />
            <Input
              value={newCertification.issuer}
              onChange={(e) =>
                setNewCertification((prev) => ({ ...prev, issuer: e.target.value }))
              }
              placeholder="Issuing organization"
            />
            <div className="flex gap-2">
              <Input
                type="number"
                value={newCertification.year}
                onChange={(e) =>
                  setNewCertification((prev) => ({ ...prev, year: parseInt(e.target.value) || new Date().getFullYear() }))
                }
                placeholder="Year"
              />
              <Button type="button" onClick={addCertification}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
          {editedProfile.certifications.length > 0 && (
            <div className="space-y-2">
              {editedProfile.certifications.map((cert) => (
                <div key={cert.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Certificate className="w-5 h-5 text-accent" />
                  <div className="flex-1">
                    <div className="font-medium">{cert.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {cert.issuer} • {cert.year}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeCertification(cert.id)}
                  >
                    <Trash className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Success Stories</CardTitle>
          <CardDescription>Share notable achievements or transformations</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={editedProfile.experience.successStories}
            onChange={(e) =>
              setEditedProfile((prev) => ({
                ...prev,
                experience: { ...prev.experience, successStories: e.target.value }
              }))
            }
            placeholder="Describe client success stories, competition results, or other achievements..."
            rows={4}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Media</CardTitle>
          <CardDescription>Connect with students on social platforms</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="instagram">Instagram Username</Label>
            <div className="flex items-center gap-2">
              <InstagramLogo className="w-5 h-5 text-muted-foreground" />
              <span className="text-muted-foreground">@</span>
              <Input
                id="instagram"
                value={editedProfile.social?.instagram}
                onChange={(e) =>
                  setEditedProfile((prev) => ({
                    ...prev,
                    social: { ...prev.social, instagram: e.target.value }
                  }))
                }
                placeholder="username"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="youtube">YouTube Channel</Label>
            <div className="flex items-center gap-2">
              <YoutubeLogo className="w-5 h-5 text-muted-foreground" />
              <Input
                id="youtube"
                value={editedProfile.social?.youtube}
                onChange={(e) =>
                  setEditedProfile((prev) => ({
                    ...prev,
                    social: { ...prev.social, youtube: e.target.value }
                  }))
                }
                placeholder="https://youtube.com/@yourchannel"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-muted-foreground" />
              <Input
                id="website"
                value={editedProfile.social?.website}
                onChange={(e) =>
                  setEditedProfile((prev) => ({
                    ...prev,
                    social: { ...prev.social, website: e.target.value }
                  }))
                }
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
