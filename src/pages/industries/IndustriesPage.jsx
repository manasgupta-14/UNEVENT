import { useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, MotionConfig, m } from 'framer-motion'
import usePageMeta from '../../hooks/usePageMeta'
import MagneticButton from '../../components/ui/MagneticButton'
import NetworkCanvas from '../../components/ui/NetworkCanvas'
import TiltPanel from '../../components/ui/TiltPanel'
import CountUp from '../../components/ui/CountUp'
import SectionHeading from '../../components/ui/SectionHeading'
import CtaSection from '../../components/CtaSection'
import { Arrow, GlyphIcon } from '../../components/ui/icons'
import { industries } from '../../data/content'
import { icons, services } from '../../data/services'
import { rgba, tint } from '../../lib/color'
import { ease, rise, stagger } from '../../lib/motion'

const byId = (id) => services.find((service) => service.id === id)

const Word = ({ children, delay, className = '' }) => (
  <span className="inline-block overflow-hidden pb-[0.14em] align-bottom">
    <m.span className={`inline-block ${className}`} initial={{ y: '115%' }} animate={{ y: 0 }} transition={{ duration: 0.9, delay, ease }}>
      {children}
    </m.span>
  </span>
)

const Matrix = ({ activeSlug, onPick }) => (
  <TiltPanel className="relative mx-auto w-full max-w-[540px]">
    <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#0B1730]/70 p-5 shadow-[0_40px_90px_-30px_rgba(20,115,230,0.55)] backdrop-blur-xl">
      <m.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-transparent via-[#1473E6]/20 to-transparent"
        animate={{ y: ['-30%', '460%'] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'linear' }}
      />
      <div className="relative grid grid-cols-[1.4fr_repeat(4,minmax(0,1fr))] items-end gap-2 px-2 pb-3 text-center">
        <span className="text-left text-[10px] font-semibold text-slate-400 sm:text-xs">Industry</span>
        {services.map((service) => (
          <span key={service.id} className="min-w-0 break-words text-[10px] font-bold leading-tight sm:text-xs" style={{ color: tint(service.accent, 0.35) }}>
            {service.name}
          </span>
        ))}
      </div>
      {industries.map((item, row) => {
        const on = item.slug === activeSlug
        return (
          <button
            key={item.slug}
            type="button"
            onClick={() => onPick(item.slug)}
            aria-label={`${item.name}: see risks and practices`}
            className={`relative grid w-full grid-cols-[1.4fr_repeat(4,minmax(0,1fr))] items-center gap-2 rounded-xl border px-2 py-3.5 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#F5B82E] ${on ? 'border-[#F5B82E]/50 bg-white/10' : 'border-transparent hover:bg-white/5'}`}
          >
            <span className="text-xs font-semibold text-slate-100 sm:text-sm">{item.name}</span>
            {services.map((service, col) => (
              <span key={service.id} className="flex justify-center">
                {item.divisions.includes(service.id) ? (
                  <m.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7 + (row * 4 + col) * 0.05, duration: 0.5, ease }}
                    className="relative flex h-3.5 w-3.5"
                  >
                    <span className="absolute inset-0 animate-ping-slow rounded-full" style={{ backgroundColor: service.accent }} />
                    <span className="relative h-3.5 w-3.5 rounded-full" style={{ backgroundColor: service.accent, boxShadow: `0 0 12px ${service.accent}` }} />
                  </m.span>
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                )}
              </span>
            ))}
          </button>
        )
      })}
      <p className="relative mt-4 px-2 text-xs leading-relaxed text-slate-400">A glowing dot shows where a practice typically applies to that industry. The mix is confirmed for each engagement. Tap a row for details.</p>
    </div>
  </TiltPanel>
)

const Hero = ({ activeSlug, onPick }) => {
  const words = 'Risk looks different in every industry.'.split(' ')
  const stats = [
    { value: industries.length, label: 'Industries' },
    { value: services.length, label: 'Practices' },
    { value: industries.reduce((sum, item) => sum + item.divisions.length, 0), label: 'Practice pairings' },
  ]

  return (
    <section className="relative isolate overflow-hidden bg-[#0B1730]">
      <NetworkCanvas className="opacity-70" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
      <div className="pointer-events-none absolute -left-32 top-10 -z-10 h-[420px] w-[420px] animate-float rounded-full bg-[#1473E6]/20 blur-[110px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-[380px] w-[380px] animate-float rounded-full bg-[#F5B82E]/10 blur-[110px]" style={{ animationDelay: '2s' }} />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-8 sm:px-6 lg:grid-cols-[1fr_1fr] lg:gap-10 lg:px-8 lg:pb-28 lg:pt-10">
        <m.div variants={stagger(0.1, 0.1)} initial="hidden" animate="show" className="relative z-10">
          <m.nav variants={rise} aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-semibold text-slate-400">
            <Link to="/" className="outline-none transition-colors hover:text-white focus-visible:text-white">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white">Industries</span>
          </m.nav>

          <h1 className="mt-6 font-display text-[2.6rem] font-extrabold leading-[1.06] tracking-tight text-white sm:text-6xl lg:text-[3.9rem]">
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
            Explore common exposure patterns by industry and see how UNEVENT’s practices may help.
          </m.p>

          <m.div variants={rise} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <MagneticButton href="#explorer" size="lg">Find your industry</MagneticButton>
            <MagneticButton href="#contact" tone="ghost" size="lg" arrow={false}>Discuss a risk</MagneticButton>
          </m.div>

          <m.div variants={rise} className="mt-12 grid max-w-md grid-cols-3 gap-3 border-t sm:gap-6 border-white/10 pt-8">
            {stats.map((stat) => (
              <div key={stat.label} className="min-w-0">
                <p className="font-display text-2xl font-extrabold text-white sm:text-3xl"><CountUp to={stat.value} /></p>
                <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </m.div>
        </m.div>

        <Matrix activeSlug={activeSlug} onPick={onPick} />
      </div>
    </section>
  )
}

const Explorer = ({ slug, onPick }) => {
  const item = industries.find((entry) => entry.slug === slug) ?? industries[0]
  const used = item.divisions.map(byId).filter(Boolean)
  const glow = used[0]?.accent ?? '#1473E6'

  return (
    <section id="explorer" className="relative overflow-hidden bg-[#F8FAFC] py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(11,23,48,0.07)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Target sectors"
          title="What can go wrong, and how we help reduce it"
          text="Choose a sector to see its biggest risk, what we do about it, and which practices we bring."
        />

        <div id="sector-detail" className="mt-12 grid scroll-mt-24 items-start gap-6 lg:scroll-mt-28 lg:grid-cols-[0.8fr_1.2fr]">
          <div role="tablist" aria-label="Industries" className="grid grid-cols-1 gap-2 min-[480px]:grid-cols-2 lg:sticky lg:top-24 lg:grid-cols-1">
            {industries.map((entry) => {
              const on = entry.slug === item.slug
              return (
                <button
                  key={entry.slug}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => onPick(entry.slug, false)}
                  className={`relative min-w-0 rounded-2xl border px-4 py-3.5 sm:px-5 sm:py-4 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#1473E6] ${on ? 'border-transparent' : 'border-slate-200 bg-white hover:border-[#1473E6]/50'}`}
                >
                  {on && <m.span layoutId="industry-tab" transition={{ type: 'spring', stiffness: 380, damping: 34 }} className="absolute inset-0 rounded-2xl bg-[#0B1730]" />}
                  <span className="relative flex items-center justify-between gap-3">
                    <span className={`font-display text-base font-bold ${on ? 'text-white' : 'text-[#0B1730]'}`}>{entry.name}</span>
                    <span className="flex shrink-0 gap-1" aria-hidden="true">
                      {entry.divisions.map((id) => <span key={id} className="h-2 w-2 rounded-full" style={{ backgroundColor: byId(id)?.accent }} />)}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>

          <AnimatePresence mode="wait">
            <m.article
              key={item.slug}
              role="tabpanel"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease }}
              className="relative isolate min-w-0 overflow-hidden rounded-3xl bg-[#0B1730] p-5 text-white shadow-[0_40px_80px_-40px_rgba(11,23,48,0.8)] sm:p-10"
            >
              <NetworkCanvas className="opacity-40" density={9000} reach={110} />
              <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: `radial-gradient(520px circle at 85% 0%, ${rgba(glow, 0.32)}, transparent 65%)` }} />
              <h3 className="font-display text-2xl font-bold sm:text-4xl">{item.name}</h3>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <p className="text-sm font-bold text-[#F5B82E]">The risk</p>
                  <p className="mt-2 leading-relaxed text-slate-200">{item.challenge}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <p className="text-sm font-bold text-[#60A5FA]">How we help</p>
                  <p className="mt-2 leading-relaxed text-slate-200">{item.approach}</p>
                </div>
              </div>

              <m.ol key={`${item.slug}-path`} variants={stagger(0.07, 0.1)} initial="hidden" animate="show" aria-label="Pathway" className="mt-5 space-y-3">
                {[
                  ['Buying trigger', item.trigger],
                  ['Typical exposure', item.exposure],
                  ['Intervention', item.intervention],
                  ['Likely output', item.output],
                  ['Illustrative effect', item.effect],
                ].map(([label, text], index) => (
                  <m.li key={label} variants={rise} className="grid gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:grid-cols-[10.5rem_minmax(0,1fr)] sm:items-start sm:gap-5 sm:p-5">
                    <p className="flex items-center gap-3 text-xs font-extrabold uppercase tracking-wider text-[#F5B82E]">
                      <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#F5B82E]/40 bg-[#F5B82E]/10">{index + 1}</span>
                      {label}
                    </p>
                    <p className="min-w-0 text-sm leading-relaxed text-slate-200 sm:text-[15px]">{text}</p>
                  </m.li>
                ))}
              </m.ol>
              <p className="mt-4 text-xs leading-relaxed text-slate-400">
                Target sector. This is an illustrative pathway, not a record of past client work. Effects are expected, not measured or promised.
              </p>

              <p className="mt-9 text-sm font-bold text-slate-300">Practices we bring to {item.name.toLowerCase()}</p>
              <m.div variants={stagger(0.08, 0.15)} initial="hidden" animate="show" className="mt-3 flex flex-wrap gap-3">
                {used.map((service) => (
                  <m.div key={service.id} variants={rise}>
                    <Link
                      to={service.href}
                      className="group inline-flex items-center gap-3 rounded-xl border px-4 py-3 outline-none transition-transform duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#F5B82E]"
                      style={{ borderColor: rgba(service.accent, 0.5), backgroundColor: rgba(service.accent, 0.12) }}
                    >
                      <GlyphIcon d={icons[service.id]} color={tint(service.accent, 0.35)} className="h-5 w-5" strokeWidth={1.8} />
                      <span className="leading-tight">
                        <span className="block text-sm font-bold text-white">{service.name}</span>
                        <span className="block text-xs text-slate-300">{service.field}</span>
                      </span>
                      <Arrow className="h-4 w-4 text-slate-300 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </m.div>
                ))}
              </m.div>
            </m.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

const IndustriesPage = () => {
  const [slug, setSlug] = useState(() => {
    const hash = window.location.hash.slice(1)
    return industries.some((item) => item.slug === hash) ? hash : industries[0].slug
  })

  usePageMeta({
    title: 'Industries We Serve | UNEVENT',
    description: `See the main risks in ${industries.map((item) => item.name.toLowerCase()).join(', ')} and the UNEVENT security, legal, compliance and technology practices that help reduce them.`,
  })

  const pick = (next, fromHero = true) => {
    setSlug(next)
    if (!fromHero && window.innerWidth >= 1024) return
    window.setTimeout(() => document.getElementById('sector-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), fromHero ? 60 : 450)
  }

  return (
    <MotionConfig reducedMotion="user">
      <Hero activeSlug={slug} onPick={pick} />
      <Explorer slug={slug} onPick={pick} />
      <CtaSection />
    </MotionConfig>
  )
}

export default IndustriesPage
