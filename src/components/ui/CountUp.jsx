import { useEffect, useRef } from 'react'
import { animate, useInView } from 'framer-motion'

const CountUp = ({ to, duration = 1.4 }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return undefined
    const controls = animate(0, to, {
      duration,
      ease: 'easeOut',
      onUpdate: (value) => {
        if (ref.current) ref.current.textContent = Math.round(value)
      },
    })
    return () => controls.stop()
  }, [inView, to, duration])

  return <span ref={ref}>0</span>
}

export default CountUp
