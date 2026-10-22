import { useState } from 'react'
import { m } from 'framer-motion'
import SectionHeading from './ui/SectionHeading'
import { Arrow, GlyphIcon } from './ui/icons'
import { industries } from '../data/content'
import { services } from '../data/services'
import { rise, stagger, viewport } from '../lib/motion'

const visuals = {
  saas: {
    accent: '#1685DB',
    d: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
  },
  finance: {
    accent: '#E9AB27',
    d: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  health: {
    accent: '#F87171',
    d: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  },
  ecom: {
    accent: '#8B5CF6',
    d: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
  },
  prof: {
    accent: '#22C55E',
    d: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  },
}

const Panel = ({ item, active, onActivate }) => {
  const { accent, d } = visuals[item.slug]
  const divisions = item.divisions.map((slug) => services.find((service) => service.slug === slug))

  return (
    <m.div
      variants={rise}
      tabIndex={0}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      aria-label={item.name}
      style={{ borderColor: active ? `${accent}88` : 'rgba(255,255,255,0.1)' }}
      className={`group relative min-h-[360px] cursor-pointer overflow-hidden rounded-3xl border bg-[#0B1730] outline-none transition-[flex,border-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:ring-2 focus-visible:ring-[#F5B82E] lg:min-h-0 ${
        active ? 'lg:flex-[3.6]' : 'lg:flex-1'
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: active ? 1 : 0.35,
          background: `radial-gradient(520px circle at 20% 110%, ${accent}40, transparent 65%), radial-gradient(360px circle at 100% 0%, ${accent}1F, transparent 70%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />

      <div
        className={`absolute inset-0 hidden flex-col items-center justify-between py-8 transition-opacity duration-500 lg:flex ${
          active ? 'pointer-events-none opacity-0' : 'opacity-100 delay-300'
        }`}
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-xl border" style={{ borderColor: `${accent}55`, backgroundColor: `${accent}1A` }}>
          <GlyphIcon d={d} color={accent} className="h-6 w-6" />
        </span>
        <span className="rotate-180 font-display text-base font-semibold text-slate-300 [writing-mode:vertical-rl]">{item.name}</span>
      </div>

      <div
        className={`relative flex h-full flex-col justify-end p-7 transition-opacity duration-500 lg:absolute lg:inset-y-0 lg:left-0 lg:w-[480px] lg:p-9 ${
          active ? 'lg:opacity-100 lg:delay-300' : 'lg:pointer-events-none lg:opacity-0'
        }`}
      >
        <GlyphIcon d={d} color={accent} strokeWidth={0.8} className="pointer-events-none absolute -right-6 -top-6 h-52 w-52 opacity-[0.1] lg:left-[270px] lg:right-auto" />
        <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border" style={{ borderColor: `${accent}66`, backgroundColor: `${accent}22` }}>
          <GlyphIcon d={d} color={accent} className="h-7 w-7" />
        </span>
        <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">{item.name}</h3>
        <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-slate-300">{item.challenge}</p>
        <p className="mt-3 max-w-sm text-[14px] leading-relaxed text-slate-400">
          <span className="font-bold text-white">Our approach: </span>
          {item.approach}
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {divisions.map((division) => (
            <li key={division.id}>
              <a
                href={division.href}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200 outline-none backdrop-blur transition-colors hover:border-white/30 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#F5B82E]"
              >
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: division.accent, boxShadow: `0 0 8px ${division.accent}` }} />
                {division.name}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-bold outline-none transition-colors focus-visible:underline" style={{ color: accent }}>
          Discuss your needs
          <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </m.div>
  )
}

const IndustriesSection = () => {
  const [active, setActive] = useState(0)

  return (
    <section id="industries" className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1473E6]/40 to-transparent" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#F5B82E]/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Industries we serve"
          title="Built for sectors where one incident changes everything"
          text="We bring the same proactive approach to teams that handle sensitive data, regulated workflows and high-stakes operations."
        />
        <m.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewport} className="mt-14 flex flex-col gap-4 lg:h-[500px] lg:flex-row">
          {industries.map((item, index) => (
            <Panel key={item.slug} item={item} active={active === index} onActivate={() => setActive(index)} />
          ))}
        </m.div>
      </div>
    </section>
  )
}

export default IndustriesSection
