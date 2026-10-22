import { m } from 'framer-motion'
import MagneticButton from '../ui/MagneticButton'
import CountUp from '../ui/CountUp'
import { GlyphIcon } from '../ui/icons'
import Visual from './visuals'
import { icons } from '../../data/services'
import { rgba, tint } from '../../lib/color'
import { ease, rise, stagger } from '../../lib/motion'

const Word = ({ children, delay, style, className = '' }) => (
  <span className="inline-block overflow-hidden pb-[0.14em] align-bottom">
    <m.span
      className={`inline-block ${className}`}
      style={style}
      initial={{ y: '115%' }}
      animate={{ y: 0 }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </m.span>
  </span>
)

const ServiceHero = ({ service }) => {
  const words = service.headline.split(' ')
  const stats = [
    { value: service.offerings.length, label: 'Offerings' },
    { value: service.process.length, label: 'Process steps' },
    { value: service.deliverables.length, label: 'Deliverables' },
  ]

  return (
    <section className="relative isolate overflow-hidden bg-[#0B1730]">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: `radial-gradient(760px circle at 78% 12%, ${rgba(service.color, 0.3)}, transparent 62%), radial-gradient(520px circle at 0% 100%, ${rgba(service.color, 0.14)}, transparent 60%)` }} />
      <div className="pointer-events-none absolute -left-24 top-24 -z-10 h-[360px] w-[360px] animate-float rounded-full blur-[110px]" style={{ backgroundColor: rgba(service.color, 0.22) }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0B1730] to-transparent" />

      <div className="mx-auto grid max-w-7xl items-start gap-12 px-4 pb-16 pt-6 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 lg:px-8 lg:pb-24 lg:pt-8">
        <m.div variants={stagger(0.1, 0.1)} initial="hidden" animate="show">
          <m.nav variants={rise} aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-400">
            <a href="/" className="outline-none transition-colors hover:text-white focus-visible:text-white">Home</a>
            <span aria-hidden="true">/</span>
            <a href="/#practice" className="outline-none transition-colors hover:text-white focus-visible:text-white">Practice</a>
            <span aria-hidden="true">/</span>
            <span className="text-white">{service.name}</span>
          </m.nav>

          <m.span
            variants={rise}
            className="mt-6 inline-flex items-center gap-3 rounded-full border bg-white/5 py-1.5 pl-1.5 pr-4 text-sm font-semibold text-slate-200 backdrop-blur"
            style={{ borderColor: rgba(service.color, 0.45) }}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: rgba(service.color, 0.22) }}>
              <GlyphIcon d={icons[service.slug]} color={tint(service.color, 0.35)} className="h-[18px] w-[18px]" strokeWidth={1.8} />
            </span>
            UNEVENT {service.name}
            <span className="hidden h-1 w-1 rounded-full bg-slate-500 sm:block" />
            <span className="hidden text-slate-400 sm:inline">{service.area}</span>
          </m.span>

          <h1 className="mt-6 font-display text-[2.5rem] font-extrabold leading-[1.06] tracking-tight text-white sm:text-6xl lg:text-[3.9rem]">
            {words.map((word, index) => {
              const last = index === words.length - 1
              return (
                <span key={`${word}-${index}`}>
                  <Word
                    delay={0.25 + index * 0.08}
                    className={last ? 'animate-gradient bg-[length:220%_auto] bg-clip-text text-transparent' : ''}
                    style={last ? { backgroundImage: `linear-gradient(90deg, ${service.color}, ${tint(service.color, 0.6)}, ${service.color})` } : undefined}
                  >
                    {word}
                  </Word>{' '}
                </span>
              )
            })}
          </h1>

          <m.p variants={rise} className="mt-7 max-w-xl text-lg leading-relaxed text-slate-300 sm:text-xl">
            {service.short}
          </m.p>

          <m.div variants={rise} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <MagneticButton href="#contact" size="lg">
              {service.cta}
            </MagneticButton>
            <MagneticButton href="/#practice" tone="ghost" size="lg" arrow={false}>
              All practices
            </MagneticButton>
          </m.div>

          <m.dl variants={rise} className="mt-12 grid max-w-md grid-cols-3 gap-3 border-t border-white/10 pt-8">
            {stats.map((stat) => (
              <div key={stat.label} className="min-w-0">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-2xl font-bold sm:text-3xl" style={{ color: tint(service.color, 0.4) }}>
                  <CountUp to={stat.value} />
                </dd>
                <p className="mt-1 text-xs font-semibold text-slate-400">{stat.label}</p>
              </div>
            ))}
          </m.dl>
        </m.div>

        <Visual service={service} />
      </div>
    </section>
  )
}

export default ServiceHero
