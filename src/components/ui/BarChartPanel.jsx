import { useState } from 'react'
import { motion } from 'framer-motion'
import TiltPanel from './TiltPanel'
import CountUp from './CountUp'
import { rgba, tint } from '../../lib/color'
import { ease } from '../../lib/motion'

const BarChartPanel = ({ chart }) => {
  const [active, setActive] = useState(0)
  const current = chart.bars[active]

  return (
    <TiltPanel max={8} className="relative mx-auto w-full max-w-[520px]">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-[0_40px_90px_-40px_rgba(20,115,230,0.55)] backdrop-blur sm:p-8">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-[70px] transition-colors duration-500"
          style={{ backgroundColor: rgba(current.color, 0.35) }}
        />

        <p className="relative text-xs font-bold uppercase tracking-widest text-[#F5B82E]">{chart.badge}</p>
        <h3 className="relative mt-2 font-display text-xl font-bold leading-snug text-white sm:text-2xl">
          {chart.title}
        </h3>

        <div className="relative mt-8 flex h-56 items-end gap-4 border-b border-white/15 sm:gap-6">
          {[25, 50, 75].map((line) => (
            <span
              key={line}
              className="pointer-events-none absolute inset-x-0 border-t border-dashed border-white/[0.07]"
              style={{ bottom: `${line}%` }}
            />
          ))}

          {chart.bars.map((bar, index) => {
            const isActive = index === active
            return (
              <button
                key={bar.label}
                type="button"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                aria-label={`${bar.label}: ${bar.display ?? `${bar.value} out of 100`}`}
                className="group relative flex h-full flex-1 flex-col justify-end outline-none"
              >
                <span
                  className="mb-2 text-center font-display text-lg font-extrabold text-white transition-transform duration-300 group-hover:-translate-y-1"
                  style={{ color: isActive ? tint(bar.color, 0.2) : '#fff' }}
                >
                  {bar.display ?? <CountUp to={bar.value} duration={1.6} />}
                </span>
                <motion.span
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.5 + index * 0.18, ease }}
                  className="block w-full origin-bottom rounded-t-xl transition-[filter,box-shadow] duration-300"
                  style={{
                    height: `${bar.value}%`,
                    minHeight: 8,
                    background: `linear-gradient(to top, ${rgba(bar.color, 0.35)}, ${bar.color})`,
                    boxShadow: isActive ? `0 0 28px ${rgba(bar.color, 0.65)}` : 'none',
                    filter: isActive ? 'brightness(1.15)' : 'brightness(0.85)',
                  }}
                />
              </button>
            )
          })}
        </div>

        <div className="relative mt-3 flex gap-4 sm:gap-6">
          {chart.bars.map((bar, index) => (
            <p
              key={bar.label}
              className="flex-1 text-center text-xs font-bold uppercase tracking-wider transition-colors duration-300"
              style={{ color: index === active ? tint(bar.color, 0.2) : '#94a3b8' }}
            >
              {bar.label}
            </p>
          ))}
        </div>

        <div className="relative mt-6 min-h-[84px] rounded-2xl border border-white/10 bg-[#0B1730]/60 p-4">
          <p className="text-sm leading-relaxed text-slate-300" key={current.label}>
            <span className="mr-2 font-bold" style={{ color: tint(current.color, 0.2) }}>{current.label}.</span>
            {current.detail}
          </p>
        </div>

        <div className="relative mt-5 flex flex-wrap items-center justify-between gap-2">
          <p className="bg-gradient-to-r from-[#F5B82E] to-[#FFE29A] bg-clip-text text-sm font-bold text-transparent">
            {chart.footer}
          </p>
          <p className="text-xs text-slate-500">{chart.unit} · {chart.note}</p>
        </div>
      </div>
    </TiltPanel>
  )
}

export default BarChartPanel
