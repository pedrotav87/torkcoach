import { cn } from '@/lib/utils'
import { Barbell } from '@phosphor-icons/react'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeMap = {
  sm: 'h-8',
  md: 'h-10',
  lg: 'h-12',
  xl: 'h-16'
}

export function Logo({ className, size = 'md' }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn(
        'rounded-xl bg-primary flex items-center justify-center aspect-square',
        sizeMap[size]
      )}>
        <Barbell className="w-[60%] h-[60%] text-primary-foreground" weight="bold" />
      </div>
      <span className={cn(
        'font-bold font-heading text-foreground',
        size === 'sm' && 'text-lg',
        size === 'md' && 'text-xl',
        size === 'lg' && 'text-2xl',
        size === 'xl' && 'text-3xl'
      )}>
        Tork Coach
      </span>
    </div>
  )
}
