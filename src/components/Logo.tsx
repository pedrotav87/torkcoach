import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md'

}onst sizeMap = {

  lg: 'h-16',
  xl: 'h-20'
}

export function Logo({ className, size = 'md' }: LogoProps) {
}

export function Logo({ className, size = 'md' }: LogoProps) {
  const logoSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABLAAAAJYCAYAAABP2dGKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSogMABBAAMASAAgTsEIIR1kxgQkCBBgIAAkCBBgE4REBAQlIsVBJQYBBANRA4PgU4kUAICJZhg/AiQ3AUhgBAAwBhBgAUAECBAChAAgCMAeATwECBRBoAFAAMAuAhBgD5AN4CQCEGAQUcFAgAQABAQQCBgEA4AcA+gAgBQBmAXgBkBsA8AcBMAYAsAMAlQCQAoACgAwAOAEUAZACAAQAoAGwAjADwAMAMgAcACwBpApgB8AoALADQAGQA+AQAEAAIQDgAsACIAHgAiAAwA7AA8AOwBpAFwA9AAMAdQDqABsAXQBrAC0AUwBVAC4AQwA5ADEAPAAzADAAMAAiAdoA1QC9AG0AJwAhABgAGgAWADYATgByAJYAqACwAMoAvgDKAMIAuAAA'
  
  return (
    <img 
      src={logoSrc}
      alt="Tork Coach Logo"
}
