import { useRef } from 'react'
import { m, useScroll, useSpring, useTransform } from 'framer-motion'
import SectionHeading from './ui/SectionHeading'
import { GlyphIcon } from './ui/icons'

const steps = [
  {
    id: '01',
    title: 'Discover',
    text: 'Understand the business, critical assets, obligations, dependencies and what cannot afford to fail.',
    output: 'Discovery brief and agreed scope.',
    d: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  },
  {
    id: '02',
    title: 'Assess',
    text: 'Identify gaps and rank them by business impact, likelihood and urgency.',
    output: 'Risk register, findings and priorities.',
    d: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
  },
  {
    id: '03',
    title: 'Implement',
    text: 'Agree and execute actions through advisory, client teams, qualified partners and suitable technology.',
    output: 'Action plan, ownership matrix, implemented controls or handover.',
    d: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  },
  {
    id: '04',
    title: 'Prepare & contain',
    text: 'Where included in scope, improve readiness, escalation paths, incident coordination and containment actions.',
    output: 'Runbook, escalation map, tabletop exercise or response plan.',
    d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
  {
    id: '05',
    title: 'Review',
    text: 'Track open actions, test controls and update priorities as the business changes.',
    output: 'Review report, evidence status and next-step plan.',
    d: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  },
]

const Step = ({ step, index, progress, onEnter, onLeave }) => {
  const start = index * 0.2
  const lit = useTransform(progress, [start - 0.08, start + 0.02], [0, 1])
  const borderColor = useTransform(lit, [0, 1], ['rgba(255,255,255,0.14)', '#F5B82E'])
  const boxShadow = useTransform(lit, [0, 1], ['0 0 0px rgba(245,184,46,0)', '0 0 38px rgba(245,184,46,0.4)'])
  const color = useTransform(lit, [0, 1], ['#64748B', '#F5B82E'])
  const scale = useTransform(lit, [0, 1], [0.9, 1])
  const opacity = useTransform(lit, [0, 1], [0.38, 1])
  const y = useTransform(lit, [0, 1], [14, 0])

  return (
    <li
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="relative grid cursor-pointer grid-cols-[68px_1fr] gap-x-5 lg:row-span-3 lg:grid-cols-1 lg:grid-rows-subgrid lg:justify-items-center lg:gap-x-0 lg:px-5 lg:text-center"
    >
      <m.div
        style={{ borderColor, boxShadow, scale }}
        className="relative z-10 row-span-2 flex h-[68px] w-[68px] shrink-0 items-center justify-center rounded-2xl border-2 bg-[#0B1730] lg:row-span-1"
      >
        <m.span style={{ color }} className="flex">
          <GlyphIcon d={step.d} className="h-8 w-8" />
        </m.span>
        <span className="absolute -right-2.5 -top-2.5 flex h-6 min-w-6 items-center justify-center rounded-full bg-[#F5B82E] px-1 text-[11px] font-extrabold text-[#0B1730]">
          {step.id}
        </span>
      </m.div>
      <m.div style={{ opacity, y }} className="pt-1 lg:pt-6">
        <h3 className="font-display text-xl font-bold text-white">{step.title}</h3>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-300">{step.text}</p>
      </m.div>
      <m.div style={{ opacity, y }} className="pt-3 lg:pt-5">
        <h4 className="whitespace-nowrap text-xs font-extrabold uppercase tracking-widest text-[#F5B82E]">Output</h4>
        <p className="mt-1 max-w-xs text-base font-semibold leading-snug text-white">{step.output}</p>
      </m.div>
    </li>
  )
}

const ApproachSection = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 60%', 'end 75%'] })

  const springConfig = { stiffness: 120, damping: 26, mass: 0.4 }
  const scrollProgress = useSpring(scrollYProgress, springConfig)
  const hoverMix = useSpring(0, springConfig)
  const hoverStep = useSpring(0, springConfig)
  const hoverLine = useSpring(0, springConfig)

  const progress = useTransform([scrollProgress, hoverStep, hoverMix], ([s, h, m]) => s + (h - s) * m)
  const lineProgress = useTransform([scrollProgress, hoverLine, hoverMix], ([s, l, m]) => s + (l - s) * m)

  const handleEnter = (index) => {
    hoverStep.set(index * 0.2 + 0.02)
    hoverLine.set(index / (steps.length - 1))
    hoverMix.set(1)
  }

  const handleLeave = () => hoverMix.set(0)

  return (
    <section id="approach" ref={ref} className="relative isolate overflow-hidden bg-[#0B1730] py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[360px] w-[720px] -translate-x-1/2 rounded-full bg-[#1473E6]/20 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tone="dark"
          align="center"
          badge="Our approach"
          title="A practical path from discovery to review"
          text="Scope and cadence are agreed with you up front. Prepare & contain is included only where it is in the agreed scope."
        />

        <div className="relative mt-16 lg:mt-20">
          <div className="absolute bottom-[34px] left-[33px] top-[34px] w-[2px] rounded-full bg-white/10 lg:hidden">
            <m.div style={{ scaleY: lineProgress }} className="h-full origin-top rounded-full bg-gradient-to-b from-[#F5B82E] to-[#1473E6]" />
          </div>
          <div className="absolute left-[10%] right-[10%] top-[33px] hidden h-[2px] rounded-full bg-white/10 lg:block">
            <m.div style={{ scaleX: lineProgress }} className="h-full origin-left rounded-full bg-gradient-to-r from-[#F5B82E] to-[#1473E6]" />
          </div>

          <ol className="relative grid gap-10 lg:grid-cols-5 lg:grid-rows-[auto_auto_auto] lg:gap-x-0 lg:gap-y-0">
            {steps.map((step, index) => (
              <Step
                key={step.id}
                step={step}
                index={index}
                progress={progress}
                onEnter={() => handleEnter(index)}
                onLeave={handleLeave}
              />
            ))}
          </ol>
        </div>

      </div>
    </section>
  )
}

export default ApproachSection