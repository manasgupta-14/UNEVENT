import { m } from 'framer-motion'
import SectionHeading from './ui/SectionHeading'
import { Arrow } from './ui/icons'
import { offers, offersSection } from '../data/offers'
import { services } from '../data/services'
import { rise, stagger, viewport } from '../lib/motion'

const byId = (id) => services.find((service) => service.id === id)

const Chip = ({ id, optional = false }) => {
  const service = byId(id)
  return (
    <li
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${optional ? 'border-dashed border-white/30 text-slate-300' : 'border-white/15 bg-white/5 text-white'}`}
      title={optional ? 'Added when relevant' : undefined}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: service.accent }} />
      {service.name}
    </li>
  )
}

const OffersSection = () => (
  <section id="offers" className="relative isolate overflow-hidden bg-[#0B1730] py-24 lg:py-32">
    <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
    <div className="pointer-events-none absolute -right-24 top-10 -z-10 hidden h-[320px] w-[320px] rounded-full bg-[#F5B82E]/10 blur-[110px] md:block" />
    <div className="pointer-events-none absolute -left-24 bottom-0 -z-10 hidden h-[360px] w-[360px] rounded-full bg-[#1473E6]/20 blur-[120px] md:block" />
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F5B82E]/50 to-transparent" />
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading tone="dark" badge={offersSection.badge} title={offersSection.title} text={offersSection.text} />

      <m.ul variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={viewport} className="mt-14 grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {offers.map((offer, index) => (
          <m.li key={offer.slug} variants={rise} whileHover={{ y: -8 }} className="group relative flex min-w-0 flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition-[box-shadow,border-color,background-color] duration-500 hover:border-[#F5B82E]/60 hover:bg-white/[0.07] hover:shadow-[0_30px_70px_-30px_rgba(245,184,46,0.35)] sm:p-7">
            <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#F5B82E] to-[#1473E6] transition-transform duration-500 group-hover:scale-x-100" />
            <span aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#F5B82E]/0 blur-2xl transition-colors duration-500 group-hover:bg-[#F5B82E]/20" />
            <span className="font-display text-sm font-bold text-[#F5B82E]">{String(index + 1).padStart(2, '0')}</span>
            <h3 className="mt-2 font-display text-xl font-bold text-white">{offer.name}</h3>
            <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">Good fit when</p>
            <p className="mt-1 text-[15px] leading-relaxed text-slate-200">{offer.trigger}</p>
            <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">You receive</p>
            <p className="mt-1 text-[15px] leading-relaxed text-slate-200">{offer.output}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {offer.practices.map((id) => <Chip key={id} id={id} />)}
              {(offer.optional ?? []).map((id) => <Chip key={id} id={id} optional />)}
            </ul>
            <a
              href={`/book?offer=${offer.slug}`}
              className="group/link mt-auto inline-flex min-h-11 items-center gap-2 pt-6 text-sm font-bold text-[#F5B82E] outline-none focus-visible:underline focus-visible:ring-2 focus-visible:ring-[#F5B82E]"
            >
              Discuss this starting point
              <Arrow className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
            </a>
          </m.li>
        ))}
      </m.ul>
    </div>
  </section>
)

export default OffersSection
