import { cn } from '@/lib/utils'
import { Barbell } from '@phosphor-icons/react'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function Logo({ className, size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  }
  
  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
        <Barbell className="text-primary-foreground" size={iconSizes[size]} weight="bold" />
      </div>
      <span className={cn('font-bold font-heading', sizeClasses[size])}>
        Tork Coach
      </span>
    </div>
  )
}
