import { m } from 'framer-motion'
import usePageMeta from '../hooks/usePageMeta.js'
import CTA from '../components/CTA.jsx'
import MagneticButton from '../components/ui/MagneticButton'
import NetworkCanvas from '../components/ui/NetworkCanvas'
import { services } from '../data/services'
import { ease, rise, stagger } from '../lib/motion'

const values = [
  ['Trust', 'We handle sensitive information and treat it that way.', '#1685DB'],
  ['Prevention', 'Fixing a cause is cheaper than managing a crisis.', '#F5B82E'],
  ['Accountability', 'Clear scope, clear owners, clear next steps.', '#7146C8'],
  ['Confidentiality', 'What you share stays between us and your team.', '#1473E6'],
  ['Innovation', 'We build tools when the existing ones fall short.', '#C58A19'],
]

const Word = ({ children, delay, className = '' }) => (
  <span className="inline-block overflow-hidden pb-[0.14em] align-bottom">
    <m.span
      className={`inline-block ${className}`}
      initial={{ y: '115%' }}
      animate={{ y: 0 }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </m.span>
  </span>
)

const Reveal = ({ children, className = '', delay = 0 }) => (
  <m.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.7, delay, ease }}
    className={className}
  >
    {children}
  </m.div>
)

const Eyebrow = ({ children }) => (
  <span className="inline-flex items-center gap-2.5 rounded-full border border-[#1473E6]/30 bg-[#1473E6]/10 px-4 py-1.5 text-sm font-semibold text-blue-200 backdrop-blur">
    <span className="h-2 w-2 rounded-full bg-[#F5B82E]" />
    {children}
  </span>
)

export default function About() {
  usePageMeta('About', 'Why UNEVENT exists and how we work.')

  return (
    <>
      {/* HERO */}
      <section className="relative isolate flex items-center overflow-hidden bg-[#0B1730]">
        <NetworkCanvas className="opacity-60" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
        <div className="pointer-events-none absolute -left-32 top-0 -z-10 h-[380px] w-[380px] animate-float rounded-full bg-[#1473E6]/20 blur-[110px]" />
        <div className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-[320px] w-[320px] animate-float rounded-full bg-[#F5B82E]/10 blur-[110px]" style={{ animationDelay: '2s' }} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0B1730] to-transparent" />

        <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <m.div variants={stagger(0.1, 0.1)} initial="hidden" animate="show" className="max-w-3xl">
            <m.div variants={rise}>
              <Eyebrow>About UNEVENT</Eyebrow>
            </m.div>

            <h1 className="mt-7 font-display text-[2.5rem] font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
              <span className="block">
                <Word delay={0.25}>Prevention</Word> <Word delay={0.33}>beats</Word>
              </span>
              <span className="block">
                <Word
                  delay={0.45}
                  className="animate-gradient bg-gradient-to-r from-[#F5B82E] via-[#FFE29A] to-[#F5B82E] bg-[length:220%_auto] bg-clip-text text-transparent"
                >
                  crisis management.
                </Word>
              </span>
            </h1>

            <m.p variants={rise} className="mt-7 max-w-xl text-lg leading-relaxed text-slate-300 sm:text-xl">
              UNEVENT is a risk advisory firm that helps organisations spot exposure while it is still small and act on it.
            </m.p>
          </m.div>
        </div>
      </section>

      {/* STORY / MISSION / VISION */}
      <section className="relative bg-[#0B1730] py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <Reveal className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur sm:p-10">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Our story</h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-300">
              Security gaps, contract surprises and compliance failures usually have one thing in common: someone saw the warning signs and nobody owned them. We built UNEVENT to be the group that owns them.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate-400">
              Replace this paragraph with the founders' own story before launch.
            </p>
          </Reveal>

          <div className="grid gap-6">
            <Reveal delay={0.1} className="rounded-2xl border border-[#1473E6]/30 bg-[#1473E6]/10 p-8 backdrop-blur">
              <p className="text-sm font-bold uppercase tracking-widest text-[#F5B82E]">Mission</p>
              <p className="mt-3 text-lg leading-relaxed text-white">Help organizations prevent and manage business risk.</p>
            </Reveal>
            <Reveal delay={0.2} className="rounded-2xl border border-[#F5B82E]/25 bg-[#F5B82E]/5 p-8 backdrop-blur">
              <p className="text-sm font-bold uppercase tracking-widest text-[#F5B82E]">Vision</p>
              <p className="mt-3 text-lg leading-relaxed text-white">Business operations that are proactive, responsible and secure by default.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="relative bg-[#0E1D3B] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">What we hold to</h2>
          </Reveal>

          <dl className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map(([title, text, color], i) => (
              <Reveal key={title} delay={i * 0.07}>
                <div className="group h-full rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/10">
                  <span
                    className="block h-2.5 w-2.5 rounded-full transition-transform duration-300 group-hover:scale-150"
                    style={{ backgroundColor: color, boxShadow: `0 0 12px ${color}` }}
                  />
                  <dt className="mt-5 font-display text-xl font-bold text-white">{title}</dt>
                  <dd className="mt-2 leading-relaxed text-slate-300">{text}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* DIVISIONS */}
      <section className="relative bg-[#0B1730] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Eyebrow>Four divisions</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              One team, four ways to make it a non-event.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.08}>
                <a
                  href="#services"
                  className="group block h-full rounded-2xl border border-white/10 bg-white/5 p-6 outline-none backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-white/30 focus-visible:ring-2 focus-visible:ring-[#F5B82E]"
                >
                  <span className="h-1 w-10 rounded-full block" style={{ backgroundColor: s.color }} />
                  <p className="mt-5 font-display text-lg font-bold text-white">{s.name}</p>
                  <p className="text-sm font-semibold text-slate-400">{s.area}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{s.short}</p>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 flex flex-col gap-4 sm:flex-row">
            <MagneticButton href="#services" size="lg">Explore Our Services</MagneticButton>
            <MagneticButton href="#contact" tone="ghost" size="lg" arrow={false}>Discuss a risk</MagneticButton>
          </Reveal>
        </div>
      </section>

      <CTA title="Work with us" />
    </>
  )
}
