import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { MotionConfig, m } from 'framer-motion'
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
import { ease, rise, stagger, viewport } from '../../lib/motion'

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
      <p className="relative mt-4 px-2 text-xs leading-relaxed text-slate-400">A glowing dot shows where a practice applies to that industry. The mix is confirmed for each engagement. Tap a row for details.</p>
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

const glanceSteps = [
  ['Identify exposure', 'Map where your data, systems, contracts and vendors create risk.'],
  ['Prioritise gaps', 'Rank what matters first by likelihood, impact and effort.'],
  ['Plan practical controls', 'Agree safeguards and next steps your team can act on.'],
]

const panelId = (slug) => `sector-${slug}`

const isDesktop = () => window.matchMedia('(min-width: 1024px)').matches
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const SectorNav = ({ navRef, activeSlug, onPick }) => (
  <nav
    ref={navRef}
    aria-label="Industries"
    className="sticky top-[calc(4rem+env(safe-area-inset-top))] z-20 -mx-4 flex gap-2 overflow-x-auto bg-[#F8FAFC]/90 px-4 py-2 backdrop-blur [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:static lg:mx-0 lg:grid lg:grid-cols-1 lg:overflow-visible lg:bg-transparent lg:p-0 lg:backdrop-blur-none [&::-webkit-scrollbar]:hidden"
  >
    {industries.map((entry) => {
      const on = entry.slug === activeSlug
      return (
        <button
          key={entry.slug}
          type="button"
          aria-current={on ? 'true' : undefined}
          onClick={() => onPick(entry.slug)}
          className={`relative shrink-0 rounded-2xl border px-4 py-3 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#1473E6] lg:w-full lg:shrink lg:px-5 lg:py-3.5 ${on ? 'border-transparent' : 'border-slate-200 bg-white hover:border-[#1473E6]/50'}`}
        >
          {on && <m.span layoutId="industry-tab" transition={{ type: 'spring', stiffness: 380, damping: 34 }} className="absolute inset-0 rounded-2xl bg-[#0B1730]" />}
          <span className="relative flex items-center justify-between gap-3">
            <span className={`whitespace-nowrap font-display text-base font-bold lg:whitespace-normal ${on ? 'text-white' : 'text-[#0B1730]'}`}>{entry.name}</span>
            <span className="flex shrink-0 gap-1" aria-hidden="true">
              {entry.divisions.map((id) => <span key={id} className="h-2 w-2 rounded-full" style={{ backgroundColor: byId(id)?.accent }} />)}
            </span>
          </span>
        </button>
      )
    })}
  </nav>
)

const Glance = () => (
  <section aria-labelledby="glance-title" className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-[0_2px_10px_-6px_rgba(11,23,48,0.15)] backdrop-blur max-lg:order-last">
    <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#1473E6]">How we work</p>
    <h3 id="glance-title" className="mt-1 font-display text-lg font-bold text-[#0B1730]">Risk Advisory at a Glance</h3>
    <ol className="mt-3 space-y-2">
      {glanceSteps.map(([title, text], index) => (
        <li key={title} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-3">
          <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#F5B82E]/60 bg-[#F5B82E]/15 text-xs font-extrabold text-[#0B1730]">{index + 1}</span>
          <span className="min-w-0">
            <span className="block text-sm font-bold text-[#0B1730]">{title}</span>
            <span className="mt-0.5 block text-[13px] leading-snug text-slate-600">{text}</span>
          </span>
        </li>
      ))}
    </ol>
  </section>
)

const SectorPanel = ({ item }) => {
  const used = item.divisions.map(byId).filter(Boolean)
  const glow = used[0]?.accent ?? '#1473E6'

  return (
    <m.article
      id={panelId(item.slug)}
      aria-labelledby={`${panelId(item.slug)}-title`}
      data-sector={item.slug}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.5, ease }}
      className="relative isolate min-w-0 scroll-mt-40 overflow-hidden rounded-3xl bg-[#0B1730] p-5 text-white shadow-[0_40px_80px_-40px_rgba(11,23,48,0.8)] sm:p-10 lg:scroll-mt-28"
    >
      <NetworkCanvas className="opacity-40" density={9000} reach={110} />
      <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: `radial-gradient(520px circle at 85% 0%, ${rgba(glow, 0.32)}, transparent 65%)` }} />
      <h3 id={`${panelId(item.slug)}-title`} className="font-display text-2xl font-bold sm:text-4xl">{item.name}</h3>

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

      <m.ol variants={stagger(0.07, 0.1)} initial="hidden" whileInView="show" viewport={viewport} aria-label="Pathway" className="mt-5 space-y-3">
        {[
          ['Buying trigger', item.trigger],
          ['Exposure', item.exposure],
          ['Intervention', item.intervention],
          ['Likely output', item.output],
          ['Expected effect', item.effect],
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

      <p className="mt-9 text-sm font-bold text-slate-300">Practices we bring to {item.name.toLowerCase()}</p>
      <m.div variants={stagger(0.08, 0.15)} initial="hidden" whileInView="show" viewport={viewport} className="mt-3 flex flex-wrap gap-3">
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
  )
}

const Explorer = ({ slug, onActive, registerScroll }) => {
  const navRef = useRef(null)
  const visible = useRef(new Set())
  const locked = useRef(false)
  const lockTimer = useRef(0)
  const syncRef = useRef(() => {})

  const offset = useCallback(() => {
    const header = document.querySelector('header')?.offsetHeight ?? 64
    const strip = !isDesktop() && navRef.current ? navRef.current.offsetHeight : 0
    return header + strip
  }, [])

  const scrollToPanel = useCallback((target) => {
    const el = document.getElementById(panelId(target))
    if (!el) return
    window.clearTimeout(lockTimer.current)
    locked.current = true
    const release = () => {
      window.clearTimeout(lockTimer.current)
      window.removeEventListener('scrollend', release)
      locked.current = false
      syncRef.current()
    }
    window.addEventListener('scrollend', release, { once: true })
    lockTimer.current = window.setTimeout(release, 1400)
    const top = el.getBoundingClientRect().top + window.scrollY - offset() - 16
    window.scrollTo({ top: Math.max(0, top), behavior: reducedMotion() ? 'auto' : 'smooth' })
  }, [offset])

  const handlePick = useCallback((target) => {
    onActive(target)
    scrollToPanel(target)
  }, [onActive, scrollToPanel])

  useEffect(() => {
    registerScroll(scrollToPanel)
    return () => registerScroll(null)
  }, [registerScroll, scrollToPanel])

  useEffect(() => {
    const panels = industries.map((entry) => document.getElementById(panelId(entry.slug))).filter(Boolean)
    if (!panels.length) return undefined
    let observer = null

    const sync = () => {
      if (locked.current) return
      let next = null
      industries.forEach((entry) => {
        if (visible.current.has(entry.slug)) next = entry.slug
      })
      if (next) onActive(next)
    }
    syncRef.current = sync

    const connect = () => {
      observer?.disconnect()
      visible.current.clear()
      const top = offset() + 8
      const bandBottom = Math.max(top + 120, window.innerHeight * 0.5)
      const bottom = Math.max(0, window.innerHeight - bandBottom)
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const key = entry.target.dataset.sector
            if (entry.isIntersecting) visible.current.add(key)
            else visible.current.delete(key)
          })
          sync()
        },
        { rootMargin: `-${top}px 0px -${bottom}px 0px`, threshold: 0 },
      )
      panels.forEach((panel) => observer.observe(panel))
    }

    connect()
    window.addEventListener('resize', connect)
    return () => {
      window.removeEventListener('resize', connect)
      observer?.disconnect()
      window.clearTimeout(lockTimer.current)
    }
  }, [offset, onActive])

  useEffect(() => {
    const nav = navRef.current
    const button = nav?.querySelector('[aria-current="true"]')
    if (!nav || !button || nav.scrollWidth <= nav.clientWidth) return
    nav.scrollTo({ left: button.offsetLeft - (nav.clientWidth - button.offsetWidth) / 2, behavior: reducedMotion() ? 'auto' : 'smooth' })
  }, [slug])

  return (
    <section id="explorer" className="relative overflow-clip bg-[#F8FAFC] py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(11,23,48,0.07)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Target sectors"
          title="What can go wrong, and how we help reduce it"
          text="Choose a sector to see its biggest risk, what we do about it, and which practices we bring."
        />

        <div id="sector-detail" className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="max-lg:contents lg:sticky lg:top-24 lg:flex lg:flex-col lg:gap-4 lg:[@media(max-height:700px)]:static">
            <SectorNav navRef={navRef} activeSlug={slug} onPick={handlePick} />
            <Glance />
          </div>

          <div className="min-w-0 space-y-6">
            {industries.map((entry) => <SectorPanel key={entry.slug} item={entry} />)}
          </div>
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
  const scroller = useRef(null)
  const initialSlug = useRef(slug)

  usePageMeta({
    title: 'Industries We Serve | UNEVENT',
    description: `See the main risks in ${industries.map((item) => item.name.toLowerCase()).join(', ')} and the UNEVENT security, legal, compliance and technology practices that help reduce them.`,
  })

  const registerScroll = useCallback((fn) => {
    scroller.current = fn
  }, [])

  useEffect(() => {
    if (window.location.hash.slice(1) !== initialSlug.current) return undefined
    const timer = window.setTimeout(() => scroller.current?.(initialSlug.current), 400)
    return () => window.clearTimeout(timer)
  }, [])

  const pick = useCallback((next) => {
    setSlug(next)
    scroller.current?.(next)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <Hero activeSlug={slug} onPick={pick} />
      <Explorer slug={slug} onActive={setSlug} registerScroll={registerScroll} />
      <CtaSection />
    </MotionConfig>
  )
}

export default IndustriesPage
