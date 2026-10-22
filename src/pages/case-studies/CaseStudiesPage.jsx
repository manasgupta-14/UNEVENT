import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, MotionConfig, m } from 'framer-motion'
import usePageMeta from '../../hooks/usePageMeta'
import NetworkCanvas from '../../components/ui/NetworkCanvas'
import TiltPanel from '../../components/ui/TiltPanel'
import CountUp from '../../components/ui/CountUp'
import SectionHeading from '../../components/ui/SectionHeading'
import CtaSection from '../../components/CtaSection'
import { Arrow, GlyphIcon } from '../../components/ui/icons'
import { cases } from '../../data/content'
import { icons, services } from '../../data/services'
import { rgba, tint } from '../../lib/color'
import { ease, rise, stagger, viewport } from '../../lib/motion'

const stages = [
  { key: 'challenge', label: 'Challenge' },
  { key: 'risks', label: 'Risks found' },
  { key: 'solution', label: 'Solution' },
  { key: 'result', label: 'Outcome' },
]

const byId = (id) => services.find((service) => service.id === id)

const Word = ({ children, delay, className = '' }) => (
  <span className="inline-block overflow-hidden pb-[0.14em] align-bottom">
    <m.span className={`inline-block ${className}`} initial={{ y: '115%' }} animate={{ y: 0 }} transition={{ duration: 0.9, delay, ease }}>
      {children}
    </m.span>
  </span>
)

const Pipeline = () => {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const timer = setTimeout(() => setActive((value) => (value + 1) % cases.length), 6200)
    return () => clearTimeout(timer)
  }, [active])

  const item = cases[active]
  const service = byId(item.division)

  return (
    <TiltPanel className="relative mx-auto w-full max-w-[520px]">
      <div className="absolute -inset-6 rounded-full blur-3xl transition-colors duration-700" style={{ backgroundColor: rgba(service.accent, 0.2) }} />
      <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#0B1730]/75 p-6 shadow-[0_40px_90px_-30px_rgba(20,115,230,0.55)] backdrop-blur-xl sm:p-7">
        <m.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-transparent via-[#1473E6]/15 to-transparent"
          animate={{ y: ['-30%', '560%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />

        <div className="relative flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-bold text-slate-200">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full" style={{ backgroundColor: service.accent }} />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: service.accent }} />
            </span>
            {service.name} · {service.field}
          </span>
          <span className="text-xs font-semibold text-slate-400">Example {active + 1} of {cases.length}</span>
        </div>

        <AnimatePresence mode="wait">
          <m.div key={active} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease }} className="relative">
            <h3 className="mt-5 font-display text-lg font-bold leading-snug text-white">{item.title}</h3>
            <ol className="relative mt-6 space-y-5">
              <div className="absolute inset-y-3 left-[11px] w-px bg-white/10">
                <m.span
                  className="block h-full origin-top"
                  style={{ background: `linear-gradient(${service.accent}, #F5B82E)` }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 2.2, delay: 0.3, ease: 'linear' }}
                />
              </div>
              {stages.map((stage, index) => (
                <m.li key={stage.key} initial={{ opacity: 0.3 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + index * 0.6, duration: 0.4 }} className="relative flex gap-4">
                  <m.span
                    initial={{ scale: 0.6, backgroundColor: '#0B1730' }}
                    animate={{ scale: 1, backgroundColor: service.accent }}
                    transition={{ delay: 0.3 + index * 0.6, duration: 0.4 }}
                    className="relative z-10 mt-0.5 h-6 w-6 shrink-0 rounded-full border-2"
                    style={{ borderColor: service.accent }}
                  />
                  <div>
                    <p className="text-sm font-bold text-white">{stage.label}</p>
                    <p className="mt-0.5 line-clamp-2 text-sm leading-snug text-slate-400">{item[stage.key]}</p>
                  </div>
                </m.li>
              ))}
            </ol>
          </m.div>
        </AnimatePresence>

        <div className="relative mt-6 flex items-center gap-2" role="group" aria-label="Choose an example">
          {cases.map((entry, index) => (
            <button
              key={entry.title}
              type="button"
              aria-label={`Show example ${index + 1}`}
              aria-pressed={index === active}
              onClick={() => setActive(index)}
              className={`h-2 rounded-full outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#F5B82E] ${index === active ? 'w-8' : 'w-2 opacity-50 hover:opacity-100'}`}
              style={{ backgroundColor: byId(entry.division).accent }}
            />
          ))}
        </div>
      </div>
    </TiltPanel>
  )
}

const Hero = () => {
  const words = 'See exactly how we work.'.split(' ')
  const stats = [
    { value: cases.length, label: 'Example scenarios' },
    { value: new Set(cases.map((item) => item.division)).size, label: 'Practices shown' },
    { value: stages.length, label: 'Steps in each' },
  ]

  return (
    <section className="relative isolate overflow-hidden bg-[#0B1730]">
      <NetworkCanvas className="opacity-70" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
      <div className="pointer-events-none absolute -left-32 top-10 -z-10 h-[420px] w-[420px] animate-float rounded-full bg-[#1473E6]/20 blur-[110px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-[380px] w-[380px] animate-float rounded-full bg-[#F5B82E]/10 blur-[110px]" style={{ animationDelay: '2s' }} />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-8 lg:pb-28 lg:pt-10">
        <m.div variants={stagger(0.1, 0.1)} initial="hidden" animate="show" className="relative z-10">
          <m.nav variants={rise} aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-semibold text-slate-400">
            <Link to="/" className="outline-none transition-colors hover:text-white focus-visible:text-white">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white">Illustrative scenarios</span>
          </m.nav>

          <m.span variants={rise} className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-[#F5B82E]/40 bg-[#F5B82E]/10 px-4 py-1.5 text-sm font-semibold text-[#FFE29A] backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-[#F5B82E]" />
            Illustrative examples, not real client results
          </m.span>

          <h1 className="mt-6 font-display text-[2.6rem] font-extrabold leading-[1.06] tracking-tight text-white sm:text-6xl lg:text-[3.8rem]">
            {words.map((word, index) => {
              const last = index === words.length - 1
              return (
                <span key={word}>
                  <Word delay={0.25 + index * 0.09} className={last ? 'animate-gradient bg-gradient-to-r from-[#F5B82E] via-[#FFE29A] to-[#F5B82E] bg-[length:220%_auto] bg-clip-text text-transparent' : ''}>
                    {word}
                  </Word>{' '}
                </span>
              )
            })}
          </h1>

          <m.p variants={rise} className="mt-7 max-w-xl text-lg leading-relaxed text-slate-300 sm:text-xl">
            Explore illustrative scenarios showing how UNEVENT could approach common risk situations. These examples are not real client results. Any expected outcomes are illustrative until validated.
          </m.p>

          <m.div variants={rise} className="mt-10 grid max-w-md grid-cols-3 gap-3 border-t sm:gap-6 border-white/10 pt-8">
            {stats.map((stat) => (
              <div key={stat.label} className="min-w-0">
                <p className="font-display text-2xl font-extrabold text-white sm:text-3xl"><CountUp to={stat.value} /></p>
                <p className="mt-1 text-xs text-slate-400 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </m.div>
        </m.div>

        <Pipeline />
      </div>
    </section>
  )
}

const CaseCard = ({ item }) => {
  const service = byId(item.division)

  return (
    <m.article
      variants={rise}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_30px_70px_-50px_rgba(11,23,48,0.5)] sm:p-10"
    >
      <span className="absolute inset-y-0 left-0 w-1.5" style={{ backgroundColor: service.accent }} />

      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: rgba(service.accent, 0.14), color: service.ink }}>
              <GlyphIcon d={icons[service.id]} color={service.ink} className="h-4 w-4" strokeWidth={1.8} />
              {service.name} · {service.field}
            </span>
            <span className="rounded-full bg-[#F5B82E]/20 px-3 py-1 text-xs font-bold text-[#92600A]">Illustrative example</span>
          </div>
          <h2 className="mt-4 max-w-2xl font-display text-2xl font-bold leading-snug text-[#0B1730] sm:text-3xl">{item.title}</h2>
        </div>
        <Link
          to={service.href}
          className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-bold text-[#0B1730] outline-none transition-colors hover:border-[#0B1730] hover:bg-[#0B1730] hover:text-white focus-visible:ring-2 focus-visible:ring-[#1473E6]"
        >
          Explore {service.name}
          <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      <m.div variants={stagger(0.15, 0.2)} initial="hidden" whileInView="show" viewport={viewport} className="relative mt-10">
        <div aria-hidden="true" className="absolute inset-x-0 top-5 hidden h-px bg-slate-200 lg:block">
          <m.span
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.4, delay: 0.3, ease } } }}
            className="block h-full origin-left"
            style={{ background: `linear-gradient(90deg, ${service.accent}, ${tint(service.accent, 0.5)})` }}
          />
        </div>
        <ol className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage, index) => {
            const last = index === stages.length - 1
            return (
              <m.li key={stage.key} variants={rise} className="flex flex-col">
                <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white text-sm font-extrabold" style={{ borderColor: service.accent, color: service.ink }}>
                  {index + 1}
                </span>
                <div
                  className="mt-4 h-full rounded-2xl border p-5 transition-transform duration-300 hover:-translate-y-1"
                  style={last ? { borderColor: rgba(service.accent, 0.5), backgroundColor: rgba(service.accent, 0.08) } : { borderColor: '#E2E8F0', backgroundColor: '#F8FAFC' }}
                >
                  <h3 className="text-sm font-bold text-[#0B1730]">{stage.label}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#334155]">{item[stage.key]}</p>
                </div>
              </m.li>
            )
          })}
        </ol>
      </m.div>
    </m.article>
  )
}

const CaseStudiesPage = () => {
  usePageMeta({
    title: 'Illustrative Scenarios | UNEVENT',
    description: 'Illustrative scenarios showing how UNEVENT approaches security, legal, compliance and technology problems. These are examples, not real client results.',
  })

  return (
    <MotionConfig reducedMotion="user">
      <Hero />
      <section className="relative overflow-hidden bg-[#F8FAFC] py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(11,23,48,0.07)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="The examples"
            title="Every scenario follows the same four steps"
            text="Challenge, risks found, solution and outcome. These illustrate how we work and are not real client results."
          />
          <div className="mt-12 space-y-8">
            {cases.map((item) => (
              <CaseCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>
      <CtaSection />
    </MotionConfig>
  )
}

export default CaseStudiesPage
