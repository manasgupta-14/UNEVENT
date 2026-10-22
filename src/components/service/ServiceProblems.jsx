import { m } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { Check, GlyphIcon } from '../ui/icons'
import { rise, stagger, viewport } from '../../lib/motion'
import { rectOf } from '../../lib/pointer'

const alert = 'M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z'

const ProblemCard = ({ service, text, index }) => {
  const handleMove = (event) => {
    const rect = rectOf(event.currentTarget)
    event.currentTarget.style.setProperty('--x', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--y', `${event.clientY - rect.top}px`)
  }

  return (
    <m.li
      variants={rise}
      onMouseMove={handleMove}
      style={{ '--accent': service.color, '--glow': `${service.color}55` }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1.5 hover:border-[var(--accent)] hover:shadow-[0_30px_60px_-28px_var(--glow)]"
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(280px circle at var(--x, 50%) var(--y, 50%), ${service.color}1A, transparent 70%)` }}
      />
      <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-100" style={{ backgroundColor: service.color }} />
      <div className="relative flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border transition-transform duration-500 group-hover:-rotate-6" style={{ borderColor: `${service.color}44`, backgroundColor: `${service.color}1A` }}>
          <GlyphIcon d={alert} color={service.ink} className="h-6 w-6" strokeWidth={1.7} />
        </span>
        <span className="font-display text-sm font-bold text-slate-300">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <p className="relative mt-6 font-display text-lg font-semibold leading-snug text-[#0B1730]">{text}</p>
      <span className="relative mt-auto flex items-center gap-2 pt-6 text-sm font-bold opacity-100 transition-all duration-500 lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100" style={{ color: service.ink }}>
        <Check className="h-4 w-4" />
        A non-event with UNEVENT
      </span>
    </m.li>
  )
}

const ServiceProblems = ({ service }) => (
  <section className="relative overflow-hidden bg-[#F8FAFC] py-24 lg:py-28">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(11,23,48,0.07)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
    <div className="pointer-events-none absolute -right-32 top-0 h-[380px] w-[380px] rounded-full blur-[110px]" style={{ backgroundColor: `${service.color}22` }} />
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        badge="Sound familiar?"
        title="Problems we help you prevent"
        text="These are the situations most teams meet right before an incident. They are also the easiest to fix early."
      />
      <m.ul variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewport} className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {service.problems.map((text, index) => (
          <ProblemCard key={text} service={service} text={text} index={index} />
        ))}
      </m.ul>
    </div>
  </section>
)

export default ServiceProblems
