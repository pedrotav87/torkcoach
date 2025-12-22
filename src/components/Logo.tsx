import { cn } from '@/lib/utils'
import { Barbell } from '@phosphor-icons/react'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function Logo({ className, size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  }

  const iconSizes = {
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="bg-primary rounded-lg p-1.5">
        <Barbell className="text-primary-foreground" weight="bold" size={iconSizes[size]} />
      </div>
      <span className={cn('font-bold font-heading', sizeClasses[size])}>
        Tork Coach
      </span>
    </div>
  )
}
