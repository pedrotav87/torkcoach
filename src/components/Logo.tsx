import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeMap = {
  sm: 'text-xl',
  md: 'text-2xl',
  lg: 'text-4xl',
  xl: 'text-5xl'
}

export function Logo({ className, size = 'md' }: LogoProps) {
  return (
    <div className={cn('inline-flex items-center gap-3', className)}>
      <svg 
        viewBox="0 0 120 80" 
        className={cn(
          size === 'sm' && 'h-6',
          size === 'md' && 'h-8',
          size === 'lg' && 'h-12',
          size === 'xl' && 'h-16',
          'w-auto'
        )}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="metalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D4A574" />
            <stop offset="30%" stopColor="#8B5A2B" />
            <stop offset="70%" stopColor="#A0714D" />
            <stop offset="100%" stopColor="#D4A574" />
          </linearGradient>
          <linearGradient id="plateGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6B4423" />
            <stop offset="50%" stopColor="#8B5A2B" />
            <stop offset="100%" stopColor="#6B4423" />
          </linearGradient>
          <filter id="shadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
            <feOffset dx="0" dy="2" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.4"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <g filter="url(#shadow)">
          <ellipse cx="20" cy="40" rx="8" ry="25" fill="url(#metalGradient)" stroke="#6B4423" strokeWidth="1.5"/>
          <ellipse cx="32" cy="40" rx="6" ry="22" fill="#4A2511" opacity="0.3"/>
          
          <rect x="30" y="20" width="60" height="40" fill="url(#plateGradient)" stroke="#6B4423" strokeWidth="2" rx="2"/>
          <rect x="35" y="25" width="50" height="30" fill="#4A2511" opacity="0.2"/>
          <circle cx="60" cy="40" r="12" fill="#2A1505" stroke="#6B4423" strokeWidth="1.5"/>
          <circle cx="60" cy="40" r="8" fill="none" stroke="#8B5A2B" strokeWidth="1"/>
          
          <ellipse cx="100" cy="40" rx="8" ry="25" fill="url(#metalGradient)" stroke="#6B4423" strokeWidth="1.5"/>
          <ellipse cx="88" cy="40" rx="6" ry="22" fill="#4A2511" opacity="0.3"/>
          
          <path d="M 55 10 L 60 5 L 65 10 Z" fill="#FFD700" opacity="0.9" stroke="#B8860B" strokeWidth="0.5"/>
        </g>
      </svg>
      
      <span 
        className={cn(
          'font-bold tracking-[0.15em] uppercase',
          sizeMap[size]
        )}
        style={{
          background: 'linear-gradient(135deg, #D4A574 0%, #8B5A2B 50%, #D4A574 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 2px 4px rgba(0,0,0,0.1)',
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 700
        }}
      >
        TORK
      </span>
    </div>
  )
}
