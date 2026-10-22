import { m } from 'framer-motion'
import MagneticButton from '../ui/MagneticButton'
import NetworkCanvas from '../ui/NetworkCanvas'
import { Arrow } from '../ui/icons'
import { services } from '../../data/services'
import { rgba } from '../../lib/color'
import { rise, stagger, viewport } from '../../lib/motion'

const ServiceCta = ({ service }) => {
  const others = services.filter((item) => item.slug !== service.slug)

  return (
    <section id="contact" className="relative bg-[#F8FAFC] pb-24 lg:pb-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <m.div variants={rise} initial="hidden" whileInView="show" viewport={viewport} className="relative overflow-hidden rounded-[2rem] p-px">
          <span
            className="absolute left-1/2 top-1/2 aspect-square w-[260%] -translate-x-1/2 -translate-y-1/2 animate-beam"
            style={{ background: `conic-gradient(from 0deg, transparent 0deg, transparent 240deg, ${service.color} 295deg, #F5B82E 335deg, transparent 360deg)` }}
          />
          <div className="relative isolate overflow-hidden rounded-[calc(2rem-1px)] bg-[#0B1730] px-6 py-16 text-center sm:px-12 lg:py-24">
            <NetworkCanvas className="opacity-60" density={9000} reach={110} />
            <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: `radial-gradient(600px circle at 50% 0%, ${rgba(service.color, 0.38)}, transparent 65%), radial-gradient(420px circle at 100% 100%, rgba(245,184,46,0.14), transparent 60%)` }} />
            <m.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewport} className="relative mx-auto flex max-w-3xl flex-col items-center">
              <m.span variants={rise} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm font-semibold text-slate-200 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: service.color, boxShadow: `0 0 10px ${service.color}` }} />
                UNEVENT {service.name}
              </m.span>
              <m.h2 variants={rise} className="mt-6 font-display text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl">
                Let&apos;s Discuss Your Requirements
              </m.h2>
              <m.p variants={rise} className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
                Tell us what you&apos;re dealing with. We&apos;ll help you identify the next practical step.
              </m.p>
              <m.div variants={rise} className="mt-10 flex flex-col gap-4 sm:flex-row">
                <MagneticButton href={`mailto:hello@unevent.com?subject=${encodeURIComponent(service.cta)}`} size="lg">
                  {service.cta}
                </MagneticButton>
                <MagneticButton href="mailto:hello@unevent.com" tone="ghost" size="lg" arrow={false}>
                  hello@unevent.com
                </MagneticButton>
              </m.div>
            </m.div>
          </div>
        </m.div>

        <m.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewport} className="mt-16">
          <m.h3 variants={rise} className="font-display text-xl font-bold text-[#0B1730]">
            Explore other practices
          </m.h3>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {others.map((item) => (
              <m.a
                key={item.slug}
                variants={rise}
                href={item.href}
                whileHover={{ y: -4 }}
                style={{ '--accent': item.color, '--glow': `${item.color}55` }}
                className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 outline-none transition-[border-color,box-shadow] duration-500 hover:border-[var(--accent)] hover:shadow-[0_24px_50px_-26px_var(--glow)] focus-visible:ring-2 focus-visible:ring-[#1473E6]"
              >
                <span className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 transition-transform duration-500 group-hover:scale-y-100" style={{ backgroundColor: item.color }} />
                <span>
                  <span className="block font-display text-lg font-bold text-[#0B1730]">{item.name}</span>
                  <span className="block text-sm font-semibold" style={{ color: item.ink }}>
                    {item.area}
                  </span>
                </span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-[#0B1730] transition-all duration-300 group-hover:border-transparent group-hover:text-white group-hover:[background-color:var(--accent)]">
                  <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </m.a>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  )
}

export default ServiceCta
