import { m, useMotionValue, useSpring } from 'framer-motion'
import { ease } from '../../lib/motion'
import { rectOf } from '../../lib/pointer'

const TiltPanel = ({ children, className = '', max = 7 }) => {
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const rotateX = useSpring(rx, { stiffness: 120, damping: 18, mass: 0.6 })
  const rotateY = useSpring(ry, { stiffness: 120, damping: 18, mass: 0.6 })

  const handleMove = (event) => {
    const rect = rectOf(event.currentTarget)
    ry.set(((event.clientX - rect.left) / rect.width - 0.5) * max * 2)
    rx.set((0.5 - (event.clientY - rect.top) / rect.height) * max * 2)
  }

  const handleLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <m.div
      initial={{ opacity: 0, y: 36, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.3, ease }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      className={className}
    >
      {children}
    </m.div>
  )
}

export default TiltPanel
