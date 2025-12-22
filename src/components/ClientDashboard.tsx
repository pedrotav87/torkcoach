import { Client, DashboardFilter, ActivityFeedItem, ActivityReaction } from '@/lib/types'
import { ClientCard } from '@/components/ClientCard'
import { ActivityFeed } from '@/components/ActivityFeed'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, MagnifyingGlass, Faders, Rss, Users } from '@phosphor-icons/react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'

interface ClientDashboardProps {
  clients: Client[]
  activities: ActivityFeedItem[]
  onClientSelect: (client: Client) => void
  onCreateClient: () => void
  onReact: (activityId: string, reactionType: ActivityReaction['type'], message?: string) => void
}

export function ClientDashboard({ clients, activities, onClientSelect, onCreateClient, onReact }: ClientDashboardProps) {
  const [filter, setFilter] = useState<DashboardFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')
  
  const filteredClients = clients.filter(client => {
    const matchesFilter = filter === 'all' || client.status === filter
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })
  
  const filterCounts = {
    all: clients.length,
    active: clients.filter(c => c.status === 'active').length,
    'needs-attention': clients.filter(c => c.status === 'needs-attention').length,
    overdue: clients.filter(c => c.status === 'overdue').length,
    inactive: clients.filter(c => c.status === 'inactive').length
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            Manage your coaching roster and track client activity
          </p>
        </div>
        
        <Button onClick={onCreateClient} size="lg" className="w-full sm:w-auto">
          <Plus className="w-5 h-5 mr-2" weight="bold" />
          Add Client
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Rss className="w-5 h-5 text-accent" weight="bold" />
            <h2 className="text-xl font-bold">Activity Feed</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Recent client activity and achievements
          </p>
          
          <ActivityFeed activities={activities} onReact={onReact} />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-primary" weight="bold" />
            <h2 className="text-xl font-bold">All Clients</h2>
            <Badge variant="secondary" className="ml-auto">
              {clients.length}
            </Badge>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search clients by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Button variant="outline" size="default">
              <Faders className="w-5 h-5 mr-2" />
              Filters
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {(['all', 'active', 'needs-attention', 'overdue', 'inactive'] as DashboardFilter[]).map((f) => (
              <Badge
                key={f}
                variant={filter === f ? 'default' : 'outline'}
                className="cursor-pointer px-3 py-1.5 text-sm capitalize"
                onClick={() => setFilter(f)}
              >
                {f.replace('-', ' ')} ({filterCounts[f]})
              </Badge>
            ))}
          </div>
          
          {filteredClients.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No clients found</p>
              <p className="text-sm text-muted-foreground mt-2">
                {searchQuery ? 'Try adjusting your search' : 'Add your first client to get started'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredClients.map((client) => (
                <ClientCard
                  key={client.id}
                  client={client}
                  onClick={() => onClientSelect(client)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
