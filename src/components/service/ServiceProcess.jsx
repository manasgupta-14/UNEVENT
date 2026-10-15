import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { Check } from '../ui/icons'
import { rgba, tint } from '../../lib/color'
import { rise, stagger, viewport } from '../../lib/motion'

const Node = ({ label, index, count, progress, service }) => {
  const start = (index / (count - 1)) * 0.86
  const lit = useTransform(progress, [start - 0.08, start + 0.02], [0, 1])
  const borderColor = useTransform(lit, [0, 1], ['#CBD5E1', service.color])
  const backgroundColor = useTransform(lit, [0, 1], ['#FFFFFF', rgba(service.color, 0.14)])
  const color = useTransform(lit, [0, 1], ['#94A3B8', service.ink])
  const boxShadow = useTransform(lit, [0, 1], ['0 0 0px rgba(0,0,0,0)', `0 0 28px ${rgba(service.color, 0.45)}`])
  const scale = useTransform(lit, [0, 1], [0.9, 1])
  const opacity = useTransform(lit, [0, 1], [0.45, 1])

  return (
    <li className="relative flex items-center gap-5 lg:flex-col lg:gap-4">
      <motion.span
        style={{ borderColor, backgroundColor, color, boxShadow, scale }}
        className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 font-display text-lg font-extrabold"
      >
        {index + 1}
      </motion.span>
      <motion.span style={{ opacity }} className="font-display text-base font-bold text-[#0B1730] lg:text-center">
        {label}
      </motion.span>
    </li>
  )
}

const ServiceProcess = ({ service }) => {
  const ref = useRef(null)
  const count = service.process.length
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 65%', 'end 80%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 })

  return (
    <section ref={ref} className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="pointer-events-none absolute -left-40 bottom-10 h-[380px] w-[380px] rounded-full blur-[120px]" style={{ backgroundColor: `${service.color}1F` }} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          badge="How we work"
          title={`A clear path in ${count} steps`}
          text="Every engagement follows the same sequence, so you always know what has happened and what comes next."
        />

        <div className="relative mt-16 lg:mt-20">
          <div className="absolute bottom-7 left-[27px] top-7 w-[2px] rounded-full bg-slate-200 lg:hidden">
            <motion.div style={{ scaleY: progress, backgroundColor: service.color }} className="h-full origin-top rounded-full" />
          </div>
          <div className="absolute top-7 hidden h-[2px] rounded-full bg-slate-200 lg:block" style={{ left: `${50 / count}%`, right: `${50 / count}%` }}>
            <motion.div style={{ scaleX: progress, backgroundColor: service.color }} className="h-full origin-left rounded-full" />
          </div>
          <ol className="relative grid gap-8 lg:gap-0" style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}>
            {service.process.map((label, index) => (
              <Node key={label} label={label} index={index} count={count} progress={progress} service={service} />
            ))}
          </ol>
        </div>

        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="relative mt-20 overflow-hidden rounded-[2rem] bg-[#0B1730] p-8 sm:p-10 lg:p-12"
        >
          <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(520px circle at 100% 0%, ${rgba(service.color, 0.35)}, transparent 62%)` }} />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(135deg,transparent_40%,black)]" />
          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-sm">
              <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">What you walk away with</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-300">Every engagement ends with tangible output you can read, share and act on.</p>
            </div>
            <motion.ul variants={stagger(0.1, 0.15)} initial="hidden" whileInView="show" viewport={viewport} className="grid flex-1 gap-4 sm:grid-cols-2 lg:max-w-2xl">
              {service.deliverables.map((item) => (
                <motion.li key={item} variants={rise} className="flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 backdrop-blur">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: rgba(service.color, 0.25) }}>
                    <Check className="h-4 w-4" color={tint(service.color, 0.5)} />
                  </span>
                  <span className="text-[15px] font-bold text-white">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ServiceProcess
