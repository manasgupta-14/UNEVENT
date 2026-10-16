import { useRef } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
} from 'framer-motion'
import usePageMeta from '../hooks/usePageMeta'
import CtaSection from './CtaSection'
import MagneticButton from './ui/MagneticButton'
import NetworkCanvas from './ui/NetworkCanvas'
import SpotlightCard from './ui/SpotlightCard'
import CountUp from './ui/CountUp'
import RiskChart from './ui/RiskChart'
import { Arrow, GlyphIcon } from './ui/icons'
import { icons, services } from '../data/services'
import {
  divisionsSection,
  hero,
  meta,
  mission,
  story,
  values,
  valuesSection,
  vision,
} from '../data/about'
import { rgba, tint } from '../lib/color'
import { ease, rise, stagger } from '../lib/motion'

const counts = {
  divisions: services.length,
  offerings: services.reduce((total, service) => total + service.offerings.length, 0),
  values: values.length,
}

const Word = ({ children, delay, className = '' }) => (
  <span className="inline-block overflow-hidden pb-[0.14em] align-bottom">
    <motion.span
      className={`inline-block ${className}`}
      initial={{ y: '115%' }}
      animate={{ y: 0 }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.span>
  </span>
)

const Reveal = ({ children, className = '', delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.7, delay, ease }}
    className={className}
  >
    {children}
  </motion.div>
)

const Eyebrow = ({ children, live = false }) => (
  <span className="inline-flex items-center gap-2.5 rounded-full border border-[#1473E6]/30 bg-[#1473E6]/10 px-4 py-1.5 text-sm font-semibold text-blue-200 backdrop-blur">
    <span className="relative flex h-2 w-2">
      {live && <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-[#F5B82E]" />}
      <span className="relative h-2 w-2 rounded-full bg-[#F5B82E]" />
    </span>
    {children}
  </span>
)

const Hero = () => {
  const mx = useMotionValue(-600)
  const my = useMotionValue(-600)
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${mx}px ${my}px, rgba(20,115,230,0.18), transparent 70%)`

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    mx.set(event.clientX - rect.left)
    my.set(event.clientY - rect.top)
  }

  return (
    <section onMouseMove={handleMove} className="relative isolate flex items-center overflow-hidden bg-[#0B1730]">
      <NetworkCanvas className="opacity-60" />
      <motion.div style={{ background: spotlight }} className="pointer-events-none absolute inset-0 -z-10" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
      <div className="pointer-events-none absolute -left-32 top-0 -z-10 h-[380px] w-[380px] animate-float rounded-full bg-[#1473E6]/20 blur-[110px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-[320px] w-[320px] animate-float rounded-full bg-[#F5B82E]/10 blur-[110px]" style={{ animationDelay: '2s' }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0B1730] to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <motion.div variants={stagger(0.1, 0.1)} initial="hidden" animate="show" className="max-w-3xl">
          <motion.div variants={rise}>
            <Eyebrow live>{hero.badge}</Eyebrow>
          </motion.div>

          <h1 className="mt-7 font-display text-[2.5rem] font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
            <span className="block">
              {hero.lead.map((word, index) => (
                <span key={word}>
                  <Word delay={0.25 + index * 0.08}>{word}</Word>{' '}
                </span>
              ))}
            </span>
            <span className="block">
              <Word
                delay={0.45}
                className="animate-gradient bg-gradient-to-r from-[#F5B82E] via-[#FFE29A] to-[#F5B82E] bg-[length:220%_auto] bg-clip-text text-transparent"
              >
                {hero.accent}
              </Word>
            </span>
          </h1>

          <motion.p variants={rise} className="mt-7 max-w-xl text-lg leading-relaxed text-slate-300 sm:text-xl">
            {hero.text}
          </motion.p>

          <motion.dl variants={rise} className="mt-10 grid max-w-xl grid-cols-3 gap-3 sm:gap-4">
            {hero.stats.map((stat) => (
              <div key={stat.key} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                  <CountUp to={counts[stat.key]} />
                </dd>
                <p aria-hidden="true" className="mt-1 text-xs font-semibold uppercase tracking-widest text-slate-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.dl>
        </motion.div>
        <RiskChart />
        </div>
      </div>
    </section>
  )
}

const StorySection = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 65%', 'end 60%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  return (
    <section ref={ref} className="relative bg-[#0B1730] py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>{story.badge}</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
            {story.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-300">{story.intro}</p>
          <p className="mt-8 inline-block bg-gradient-to-r from-[#F5B82E] to-[#FFE29A] bg-clip-text font-display text-xl font-bold text-transparent">
            {story.closing}
          </p>
        </Reveal>

        <div className="relative pl-12 sm:pl-14">
          <span className="absolute left-[15px] top-2 bottom-2 w-px bg-white/10 sm:left-[19px]" />
          <motion.span
            style={{ scaleY: fill }}
            className="absolute left-[15px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-[#F5B82E] to-[#1473E6] sm:left-[19px]"
          />

          <div className="space-y-6">
            {story.chapters.map((chapter, index) => (
              <Reveal key={chapter.label} delay={index * 0.05} className="relative">
                <motion.span
                  initial={{ scale: 0.6, backgroundColor: '#132854' }}
                  whileInView={{ scale: 1, backgroundColor: '#F5B82E' }}
                  viewport={{ once: true, margin: '-30% 0px' }}
                  transition={{ duration: 0.5, ease }}
                  className="absolute -left-12 top-7 flex h-8 w-8 items-center justify-center rounded-full border border-[#F5B82E]/60 text-xs font-extrabold text-[#0B1730] shadow-[0_0_18px_rgba(245,184,46,0.55)] sm:-left-14 sm:h-10 sm:w-10 sm:text-sm"
                >
                  {String(index + 1).padStart(2, '0')}
                </motion.span>
                <SpotlightCard color="#1473E6" tilt={3}>
                  <div className="p-7 sm:p-8">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#F5B82E]">{chapter.label}</p>
                    <h3 className="mt-3 font-display text-xl font-bold text-white sm:text-2xl">{chapter.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-slate-300 sm:text-lg">{chapter.text}</p>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const DirectionCard = ({ item, delay }) => (
  <Reveal delay={delay} className="h-full">
    <SpotlightCard color={item.color} className="h-full">
      <div className="flex h-full flex-col p-8 sm:p-10">
        <div className="flex items-center gap-4">
          <span
            className="flex h-14 w-14 items-center justify-center rounded-2xl border"
            style={{ borderColor: rgba(item.color, 0.4), backgroundColor: rgba(item.color, 0.14) }}
          >
            <GlyphIcon d={item.icon} color={tint(item.color, 0.25)} className="h-7 w-7" />
          </span>
          <p className="text-sm font-bold uppercase tracking-widest" style={{ color: tint(item.color, 0.25) }}>
            {item.label}
          </p>
        </div>
        <h3 className="mt-7 font-display text-2xl font-bold leading-snug text-white sm:text-3xl">{item.headline}</h3>
        <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">{item.text}</p>
        <ul className="mt-auto flex flex-wrap gap-2.5 pt-8">
          {item.points.map((point) => (
            <li
              key={point}
              className="rounded-full border px-3.5 py-1.5 text-sm font-semibold text-white"
              style={{ borderColor: rgba(item.color, 0.4), backgroundColor: rgba(item.color, 0.1) }}
            >
              {point}
            </li>
          ))}
        </ul>
      </div>
    </SpotlightCard>
  </Reveal>
)

const DirectionSection = () => (
  <section className="relative bg-[#0E1D3B] py-20 lg:py-28">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
    <div className="relative mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
      <DirectionCard item={mission} delay={0} />
      <DirectionCard item={vision} delay={0.1} />
    </div>
  </section>
)

const spanFor = (index) => {
  if (index < 3) return 'lg:col-span-2'
  if (index === 3) return 'lg:col-span-3'
  return 'sm:col-span-2 lg:col-span-3'
}

const ValuesSection = () => (
  <section className="relative bg-[#0B1730] py-20 lg:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Reveal className="max-w-3xl">
        <Eyebrow>{valuesSection.badge}</Eyebrow>
        <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          {valuesSection.title}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-slate-300">{valuesSection.text}</p>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
        {values.map((value, index) => (
          <Reveal key={value.title} delay={index * 0.07} className={spanFor(index)}>
            <SpotlightCard color={value.color} className="h-full">
              <div className="flex h-full flex-col p-7">
                <div className="flex items-start justify-between">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-xl border"
                    style={{ borderColor: rgba(value.color, 0.4), backgroundColor: rgba(value.color, 0.14) }}
                  >
                    <GlyphIcon d={value.icon} color={tint(value.color, 0.25)} className="h-6 w-6" />
                  </span>
                  <span className="font-display text-sm font-bold text-white/25">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-6 font-display text-xl font-bold text-white">{value.title}</h3>
                <p className="mt-1 text-sm font-semibold" style={{ color: tint(value.color, 0.25) }}>
                  {value.tagline}
                </p>
                <p className="mt-4 leading-relaxed text-slate-300">{value.text}</p>
                <p className="mt-auto border-t border-white/10 pt-5 text-sm leading-relaxed text-slate-400">
                  <span className="mr-2 text-xs font-bold uppercase tracking-widest" style={{ color: tint(value.color, 0.25) }}>
                    In practice
                  </span>
                  {value.practice}
                </p>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

const DivisionsSection = () => (
  <section className="relative bg-[#0E1D3B] py-20 lg:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Reveal>
        <Eyebrow>{divisionsSection.badge}</Eyebrow>
        <h2 className="mt-5 max-w-3xl font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          {divisionsSection.title}
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <Reveal key={service.slug} delay={index * 0.08}>
            <SpotlightCard href={service.href} color={service.color} className="h-full">
              <div className="flex h-full flex-col p-6">
                <GlyphIcon d={icons[service.slug]} color={tint(service.color, 0.2)} className="h-8 w-8" />
                <p className="mt-5 font-display text-lg font-bold text-white">UNEVENT {service.name}</p>
                <p className="text-sm font-semibold text-slate-400">{service.area}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{service.short}</p>
                <span className="mt-auto flex items-center gap-2 pt-5 text-sm font-bold text-white">
                  Explore
                  <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 flex flex-col gap-4 sm:flex-row">
        <MagneticButton href="/#services" size="lg">Explore Our Services</MagneticButton>
        <MagneticButton href="#contact" tone="ghost" size="lg" arrow={false}>Talk to Our Team</MagneticButton>
      </Reveal>
    </div>
  </section>
)

const About = () => {
  usePageMeta(meta.title, meta.description)

  return (
    <>
      <Hero />
      <StorySection />
      <DirectionSection />
      <ValuesSection />
      <DivisionsSection />
      <div className="bg-[#F8FAFC] pt-20 lg:pt-28">
        <CtaSection />
      </div>
    </>
  )
}

export default About
