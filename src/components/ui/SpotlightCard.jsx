import { motion, useMotionValue, useSpring } from 'framer-motion'
import { rgba } from '../../lib/color'

const MotionLink = motion.a
const MotionBox = motion.div

const SpotlightCard = ({ children, color = '#1473E6', tilt = 5, href, className = '' }) => {
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const rotateX = useSpring(rx, { stiffness: 160, damping: 20, mass: 0.5 })
  const rotateY = useSpring(ry, { stiffness: 160, damping: 20, mass: 0.5 })
  const Tag = href ? MotionLink : MotionBox

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    ry.set((px - 0.5) * tilt * 2)
    rx.set((0.5 - py) * tilt * 2)
    event.currentTarget.style.setProperty('--x', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--y', `${event.clientY - rect.top}px`)
  }

  const handleLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <Tag
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000, '--accent': color }}
      className={`group relative block overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] outline-none backdrop-blur transition-[border-color,box-shadow] duration-500 hover:border-[var(--accent)] hover:shadow-[0_30px_70px_-34px_var(--accent)] focus-visible:ring-2 focus-visible:ring-[#F5B82E] ${className}`}
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(340px circle at var(--x, 50%) var(--y, 50%), ${rgba(color, 0.2)}, transparent 70%)` }}
      />
      <span
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-100"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />
      <div className="relative h-full">{children}</div>
    </Tag>
  )
}

export default SpotlightCard
