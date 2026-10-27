import { Link } from 'react-router'
import { m } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { Arrow, Check } from '../ui/icons'
import { rise, stagger, viewport } from '../../lib/motion'

const Panel = ({ title, children, tone = 'light', service }) => (
  <m.div
    variants={rise}
    className="h-full rounded-3xl border bg-white p-6 sm:p-7"
    style={{ borderColor: tone === 'accent' ? `${service.color}66` : '#E2E8F0' }}
  >
    <h3 className="font-display text-lg font-bold text-[#0B1730]">{title}</h3>
    <div className="mt-4 text-[15px] leading-relaxed text-[#334155]">{children}</div>
  </m.div>
)

const List = ({ items, service, icon = true }) => (
  <ul className="space-y-3">
    {items.map((item) => (
      <li key={item} className="flex items-start gap-3">
        {icon ? (
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: `${service.color}22` }}>
            <Check className="h-3 w-3" color={service.ink} />
          </span>
        ) : (
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
        )}
        <span>{item}</span>
      </li>
    ))}
  </ul>
)

const ServiceScope = ({ service }) => (
  <section className="relative overflow-hidden bg-white py-24 lg:py-28">
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        badge="Who it is for"
        title={`Who ${service.name} is for, and what it covers`}
        text="Read this before you reach out, so you know whether this is the right first step."
      />

      <m.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewport} className="mt-12 grid gap-6 lg:grid-cols-3">
        <Panel title="Typical trigger" service={service}>
          <p>{service.buyer}</p>
          <p className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-sm font-semibold text-[#0B1730]">Delivery: {service.mode}</p>
        </Panel>
        <Panel title="What is in scope" service={service}>
          <List items={service.inScope} service={service} />
        </Panel>
        <Panel title="Boundaries" tone="accent" service={service}>
          <List items={service.boundaries} service={service} icon={false} />
        </Panel>
      </m.div>

      {service.enables && (
        <m.p variants={rise} initial="hidden" whileInView="show" viewport={viewport} className="mt-8 rounded-3xl border border-slate-200 bg-[#F8FAFC] p-6 text-[15px] leading-relaxed text-[#334155] sm:p-7">
          <span className="font-display font-bold text-[#0B1730]">How Labs fits with the other practices. </span>
          {service.enables}
        </m.p>
      )}


      {service.sample && (
        <m.div variants={rise} initial="hidden" whileInView="show" viewport={viewport} className="mt-8">
          <Link
            to={`/samples#${service.sample}`}
            className="group inline-flex items-center gap-2 text-sm font-bold outline-none focus-visible:underline"
            style={{ color: service.ink }}
          >
            {service.sampleLabel}
            <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </m.div>
      )}
    </div>
  </section>
)

export default ServiceScope
