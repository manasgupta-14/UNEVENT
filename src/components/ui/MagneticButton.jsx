import { m, useMotionValue, useSpring } from 'framer-motion'
import { Arrow } from './icons'
import { rectOf } from '../../lib/pointer'

const tones = {
  gold: 'bg-[#F5B82E] text-[#0B1730] shadow-[0_0_0_1px_rgba(245,184,46,0.6),0_10px_30px_-10px_rgba(245,184,46,0.6)] hover:shadow-[0_0_0_1px_rgba(245,184,46,0.9),0_16px_40px_-10px_rgba(245,184,46,0.85)]',
  ghost: 'border border-white/20 bg-white/5 text-white backdrop-blur hover:border-white/45 hover:bg-white/10',
  blue: 'bg-[#1473E6] text-white shadow-[0_10px_30px_-10px_rgba(20,115,230,0.7)] hover:bg-[#2b82f0]',
  navy: 'bg-[#0B1730] text-white shadow-[0_10px_30px_-12px_rgba(11,23,48,0.7)] hover:bg-[#132854]',
}

const sizes = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-4 text-base',
}

const MagneticButton = ({ href, children, tone = 'gold', size = 'md', arrow = true, className = '', onClick }) => {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { stiffness: 260, damping: 18, mass: 0.4 })
  const y = useSpring(rawY, { stiffness: 260, damping: 18, mass: 0.4 })

  const handleMove = (event) => {
    const rect = rectOf(event.currentTarget)
    rawX.set((event.clientX - (rect.left + rect.width / 2)) * 0.22)
    rawY.set((event.clientY - (rect.top + rect.height / 2)) * 0.3)
  }

  const handleLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <m.a
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x, y }}
      whileTap={{ scale: 0.96 }}
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl font-bold outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#F5B82E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1730] ${tones[tone]} ${sizes[size]} ${className}`}
    >
      {tone === 'gold' && (
        <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      )}
      <span className="relative">{children}</span>
      {arrow && <Arrow className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />}
    </m.a>
  )
}

export default MagneticButton
