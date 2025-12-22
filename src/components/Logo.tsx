import { cn } from '@/lib/utils'
import { Barbell } from '@phosphor-icons/react'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeMap = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
  xl: 'text-3xl'
}

export function Logo({ className, size = 'md' }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
        <Barbell className="w-5 h-5 text-primary-foreground" weight="bold" />
      </div>
      <span className={cn('font-bold font-heading', sizeMap[size])}>
        Tork Coach
      </span>
    </div>
  )
}











