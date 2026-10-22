import { m } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { rgba, tint } from '../../lib/color'
import { rise, stagger, viewport } from '../../lib/motion'
import { rectOf } from '../../lib/pointer'

const spanFor = (count, index) => {
  const remainder = count % 3
  if (remainder === 2 && index >= count - 2) return 'lg:col-span-3'
  if (remainder === 1 && index === count - 1) return 'lg:col-span-6'
  return 'lg:col-span-2'
}

const OfferingCard = ({ service, title, text, index, span }) => {
  const handleMove = (event) => {
    const rect = rectOf(event.currentTarget)
    event.currentTarget.style.setProperty('--x', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--y', `${event.clientY - rect.top}px`)
  }

  return (
    <m.li
      variants={rise}
      onMouseMove={handleMove}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-7 backdrop-blur transition-colors duration-500 hover:border-white/25 ${span}`}
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), ${rgba(service.color, 0.26)}, transparent 70%)` }}
      />
      <span className="absolute inset-x-0 top-0 h-px opacity-60" style={{ background: `linear-gradient(90deg, transparent, ${service.color}, transparent)` }} />
      <span className="pointer-events-none absolute -right-2 -top-4 font-display text-[7rem] font-extrabold leading-none text-transparent transition-all duration-500 [-webkit-text-stroke:1px_rgba(255,255,255,0.08)] group-hover:[-webkit-text-stroke:1px_rgba(255,255,255,0.22)]">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="relative flex h-full flex-col">
        <span className="mb-6 h-1.5 w-10 rounded-full transition-all duration-500 group-hover:w-16" style={{ backgroundColor: service.color, boxShadow: `0 0 14px ${rgba(service.color, 0.8)}` }} />
        <h3 className="font-display text-xl font-bold leading-snug text-white">{title}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-300">{text}</p>
        <span className="mt-auto pt-6 text-sm font-bold opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ color: tint(service.color, 0.4) }}>
          Included in {service.name}
        </span>
      </div>
    </m.li>
  )
}

const ServiceOfferings = ({ service }) => (
  <section className="relative isolate overflow-hidden bg-[#0B1730] py-24 lg:py-32">
    <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
    <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[340px] w-[760px] -translate-x-1/2 rounded-full blur-[120px]" style={{ backgroundColor: rgba(service.color, 0.25) }} />
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        tone="dark"
        badge="What we offer"
        title={`Everything inside UNEVENT ${service.name}`}
        text="Use one offering on its own or combine several. Each one is scoped with you before work starts."
      />
      <m.ul variants={stagger(0.09)} initial="hidden" whileInView="show" viewport={viewport} className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
        {service.offerings.map(([title, text], index) => (
          <OfferingCard key={title} service={service} title={title} text={text} index={index} span={spanFor(service.offerings.length, index)} />
        ))}
      </m.ul>
    </div>
  </section>
)

export default ServiceOfferings
