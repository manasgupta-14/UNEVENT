import { m, useMotionValue, useSpring } from 'framer-motion'
import SectionHeading from './ui/SectionHeading'
import { Arrow, Check, GlyphIcon } from './ui/icons'
import { icons, services } from '../data/services'
import { rise, stagger, viewport } from '../lib/motion'
import { rectOf } from '../lib/pointer'

const ServiceCard = ({ service }) => {
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const rotateX = useSpring(rx, { stiffness: 180, damping: 20, mass: 0.5 })
  const rotateY = useSpring(ry, { stiffness: 180, damping: 20, mass: 0.5 })

  const handleMove = (event) => {
    const rect = rectOf(event.currentTarget)
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    ry.set((px - 0.5) * 9)
    rx.set((0.5 - py) * 9)
    event.currentTarget.style.setProperty('--x', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--y', `${event.clientY - rect.top}px`)
  }

  const handleLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <m.a
      variants={rise}
      href={service.href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000, '--accent': service.accent, '--glow': `${service.accent}66` }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 outline-none transition-[border-color,box-shadow] duration-500 hover:border-[var(--accent)] hover:shadow-[0_34px_70px_-30px_var(--glow)] focus-visible:ring-2 focus-visible:ring-[#1473E6]"
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), ${service.accent}1F, transparent 70%)` }}
      />
      <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-100" style={{ backgroundColor: service.accent }} />
      <GlyphIcon
        d={icons[service.id]}
        color={service.accent}
        strokeWidth={1}
        className="pointer-events-none absolute -bottom-6 -right-6 h-44 w-44 rotate-12 opacity-[0.08] transition-all duration-700 group-hover:rotate-0 group-hover:scale-110 group-hover:opacity-[0.14]"
      />

      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105" style={{ borderColor: `${service.accent}40`, backgroundColor: `${service.accent}1A` }}>
        <GlyphIcon d={icons[service.id]} color={service.ink} className="h-8 w-8" />
        <span className="absolute inset-0 rounded-2xl opacity-0 ring-4 transition-opacity duration-500 group-hover:opacity-100" style={{ '--tw-ring-color': `${service.accent}33` }} />
      </div>

      <div className="relative mt-7">
        <p className="text-sm font-semibold text-slate-400">UNEVENT</p>
        <h3 className="font-display text-2xl font-bold text-[#0B1730]">{service.name}</h3>
        <p className="mt-1 text-sm font-bold" style={{ color: service.ink }}>
          {service.field}
        </p>
      </div>

      <p className="relative mt-4 text-[15px] leading-relaxed text-[#334155]">{service.desc}</p>

      <ul className="relative mt-6 space-y-2.5">
        {service.points.map((point) => (
          <li key={point} className="flex items-start gap-2.5 text-sm text-[#334155]">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: `${service.accent}22` }}>
              <Check className="h-3 w-3" color={service.ink} />
            </span>
            {point}
          </li>
        ))}
      </ul>

      <div className="relative mt-auto flex items-center justify-between border-t border-slate-100 pt-6">
        <span className="text-sm font-bold text-[#0B1730]">Explore Service</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-[#0B1730] transition-all duration-300 group-hover:border-transparent group-hover:text-white group-hover:[background-color:var(--accent)]">
          <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </div>
    </m.a>
  )
}

const ServicesSection = () => (
  <section id="services" className="relative overflow-hidden bg-[#F8FAFC] py-24 lg:py-32">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(11,23,48,0.07)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
    <div className="pointer-events-none absolute -right-40 top-0 h-[420px] w-[420px] rounded-full bg-[#1473E6]/10 blur-[110px]" />
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeading
          badge="Our services"
          title="Four practices. One joined-up risk approach."
          text="Protect, Counsel and Govern are the risk practices. Labs is the technology layer that puts agreed controls into practice, with curated and in-house solutions."
        />
        <m.p
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="max-w-sm text-sm leading-relaxed text-slate-500"
        >
          Pick one service or combine them. We start by learning how your business works.
        </m.p>
      </div>

      <m.div
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
      >
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </m.div>
    </div>
  </section>
)

export default ServicesSection
