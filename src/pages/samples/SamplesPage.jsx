import { useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { m } from 'framer-motion'
import usePageMeta from '../../hooks/usePageMeta'
import NetworkCanvas from '../../components/ui/NetworkCanvas'
import CtaSection from '../../components/CtaSection'
import { samples, samplesHero, samplesMeta } from '../../data/samples'
import { services } from '../../data/services'
import { ease, rise, stagger, viewport } from '../../lib/motion'

const byId = (id) => services.find((service) => service.id === id)

const tones = {
  High: 'bg-red-50 text-red-700 ring-red-200',
  Medium: 'bg-amber-50 text-amber-800 ring-amber-200',
  Low: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  'Evidence collected': 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  'In progress': 'bg-blue-50 text-blue-700 ring-blue-200',
  'Evidence missing': 'bg-red-50 text-red-700 ring-red-200',
  Planned: 'bg-slate-100 text-slate-700 ring-slate-200',
}

const Cell = ({ value, column }) => {
  const tone = (column === 'Severity' || column === 'Status') && tones[value]
  if (!tone) return value
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ring-1 ring-inset ${tone}`}>{value}</span>
}

const rowIn = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
}

const Table = ({ sample }) => (
  <>
    <m.ul variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={viewport} className="grid gap-3 sm:grid-cols-2 lg:hidden">
      {sample.rows.map((row) => (
        <m.li key={row[0]} variants={rowIn} className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_10px_-6px_rgba(11,23,48,0.15)]">
          <p className="font-display text-base font-bold text-[#0B1730]">{row[0]}</p>
          <dl className="mt-3 space-y-2.5">
            {row.slice(1).map((cell, index) => (
              <div key={sample.columns[index + 1]}>
                <dt className="text-xs font-bold uppercase tracking-wider text-slate-500">{sample.columns[index + 1]}</dt>
                <dd className="mt-0.5 text-sm leading-relaxed text-[#334155]"><Cell value={cell} column={sample.columns[index + 1]} /></dd>
              </div>
            ))}
          </dl>
        </m.li>
      ))}
    </m.ul>

    <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_-6px_rgba(11,23,48,0.15)] transition-shadow duration-300 hover:shadow-[0_18px_40px_-20px_rgba(11,23,48,0.3)] lg:block">
      <table className="w-full table-fixed border-collapse text-left text-sm">
        <caption className="sr-only">{sample.title}</caption>
        <thead>
          <tr className="bg-[#0B1730]">
            {sample.columns.map((column) => (
              <th key={column} scope="col" className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-white">{column}</th>
            ))}
          </tr>
        </thead>
        <m.tbody variants={stagger(0.09)} initial="hidden" whileInView="show" viewport={viewport}>
          {sample.rows.map((row) => (
            <m.tr key={row[0]} variants={rowIn} className="border-t border-slate-100 align-top transition-colors duration-200 hover:bg-[#F5B82E]/10">
              {row.map((cell, index) => (
                <td key={`${row[0]}-${index}`} className={`break-words px-4 py-3.5 leading-relaxed ${index === 0 ? 'font-semibold text-[#0B1730]' : 'text-[#334155]'}`}>
                  <Cell value={cell} column={sample.columns[index]} />
                </td>
              ))}
            </m.tr>
          ))}
        </m.tbody>
      </table>
    </div>
  </>
)

const Plan = ({ sample }) => (
  <m.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewport} className="grid gap-4 md:grid-cols-2">
    {sample.sections.map((section) => (
      <m.div key={section.heading} variants={rowIn} className="group/plan min-w-0 rounded-2xl border border-slate-200 bg-white p-5 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#F5B82E]/60 hover:shadow-[0_18px_40px_-20px_rgba(11,23,48,0.3)]">
        <h4 className="font-display text-base font-bold text-[#0B1730]">{section.heading}</h4>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#334155]">
          {section.items.map((item) => (
            <li key={item} className="flex gap-2.5">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F5B82E]" />
              <span className="min-w-0">{item}</span>
            </li>
          ))}
        </ul>
      </m.div>
    ))}
  </m.div>
)

const Sample = ({ sample }) => {
  const service = byId(sample.practice)
  return (
    <m.article id={sample.id} variants={rise} initial="hidden" whileInView="show" viewport={viewport} whileHover={{ y: -4 }} className="group relative scroll-mt-28 overflow-hidden rounded-3xl border border-slate-200 bg-[#F8FAFC] p-5 shadow-[0_2px_10px_-6px_rgba(11,23,48,0.18)] transition-[box-shadow,border-color] duration-300 hover:border-[#F5B82E]/70 hover:shadow-[0_30px_70px_-28px_rgba(11,23,48,0.35)] sm:p-9">
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100" style={{ background: `linear-gradient(90deg, ${service.accent}, #F5B82E)` }} />
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: `${service.accent}24`, color: service.ink }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: service.accent }} />
          {service.name} · {service.area}
        </span>
      </div>
      <h2 className="mt-4 font-display text-2xl font-bold leading-tight text-[#0B1730] sm:text-3xl">{sample.title}</h2>
      <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[#334155]">{sample.intro}</p>
      <div className="mt-6">{sample.kind === 'plan' ? <Plan sample={sample} /> : <Table sample={sample} />}</div>
      {sample.note && <p className="mt-4 text-sm leading-relaxed text-slate-500">{sample.note}</p>}
      <Link to={service.href} className="mt-5 inline-flex min-h-11 items-center text-sm font-bold outline-none hover:underline focus-visible:underline" style={{ color: service.ink }}>
        Explore {service.name}
      </Link>
    </m.article>
  )
}

const SamplesPage = () => {
  usePageMeta({ title: samplesMeta.title, description: samplesMeta.description })
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const id = hash.slice(1)
    const timer = window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 350)
    return () => window.clearTimeout(timer)
  }, [hash])

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#0B1730]">
        <NetworkCanvas className="opacity-60" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
        <div className="pointer-events-none absolute -right-20 top-0 -z-10 hidden h-[320px] w-[320px] animate-float rounded-full bg-[#F5B82E]/10 blur-[110px] md:block" />
        <m.div variants={stagger(0.1, 0.1)} initial="hidden" animate="show" className="mx-auto max-w-4xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-24 lg:pt-14">
          <m.nav variants={rise} aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-semibold text-slate-400">
            <Link to="/" className="outline-none transition-colors hover:text-white focus-visible:text-white">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white">Deliverables</span>
          </m.nav>
          <m.span variants={rise} className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm font-semibold text-blue-200">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F5B82E]" />
            {samplesHero.badge}
          </m.span>
          <m.h1 variants={rise} transition={{ ease }} className="mt-6 font-display text-[clamp(1.9rem,8.5vw,2.4rem)] font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">{samplesHero.title}</m.h1>
          <m.p variants={rise} className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">{samplesHero.text}</m.p>
          <m.ul variants={rise} aria-label="Jump to a deliverable" className="mt-8 flex flex-wrap gap-2.5">
            {samples.map((sample) => (
              <li key={sample.id}>
                <a href={`#${sample.id}`} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 text-sm font-semibold text-white outline-none backdrop-blur transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[#F5B82E]/70 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#F5B82E]">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: byId(sample.practice).accent }} />
                  {sample.title}
                </a>
              </li>
            ))}
          </m.ul>
        </m.div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-6xl space-y-6 px-4 sm:space-y-8 sm:px-6 lg:px-8">
          {samples.map((sample) => <Sample key={sample.id} sample={sample} />)}
        </div>
      </section>

      <div className="bg-[#F8FAFC] pt-20 lg:pt-28">
        <CtaSection />
      </div>
    </>
  )
}

export default SamplesPage
