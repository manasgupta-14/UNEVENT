import { useState } from 'react'
import { MotionConfig, m } from 'framer-motion'
import TiltPanel from './TiltPanel'
import CountUp from './CountUp'
import MagneticButton from './MagneticButton'
import { rgba, tint } from '../../lib/color'
import { ease } from '../../lib/motion'

const BarChartPanel = ({ chart }) => {
  const [active, setActive] = useState(0)
  const current = chart.bars[active]
  const values = chart.bars.map((bar) => bar.value)
  const rank = current.value === Math.max(...values) ? 'Largest share' : current.value === Math.min(...values) ? 'Smallest share' : null

  const handleKey = (event, index) => {
    const last = chart.bars.length - 1
    const next = event.key === 'ArrowRight' ? Math.min(index + 1, last) : event.key === 'ArrowLeft' ? Math.max(index - 1, 0) : null
    if (next === null) return
    event.preventDefault()
    setActive(next)
    event.currentTarget.parentElement.children[next]?.focus()
  }

  return (
    <MotionConfig reducedMotion="user">
      <TiltPanel max={8} className="relative mx-auto w-full max-w-[520px]">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-[0_40px_90px_-40px_rgba(20,115,230,0.55)] backdrop-blur sm:p-8">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-[70px] transition-colors duration-500"
            style={{ backgroundColor: rgba(current.color, 0.35) }}
          />

          <div className="relative flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs font-bold uppercase tracking-widest text-[#F5B82E]">{chart.badge}</p>
          </div>
          <h3 className="relative mt-2 font-display text-xl font-bold leading-snug text-white sm:text-2xl">
            {chart.title}
          </h3>

          <div role="group" aria-label={chart.note ? `${chart.unit}. ${chart.note}` : chart.unit} className="relative mt-8 flex h-56 items-end gap-4 border-b border-white/15 sm:gap-6">
            {[25, 50, 75].map((line) => (
              <span
                key={line}
                aria-hidden="true"
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
                  onKeyDown={(event) => handleKey(event, index)}
                  aria-pressed={isActive}
                  aria-label={`${bar.label}: ${bar.display ?? `${bar.value} out of 100`}`}
                  className="group relative flex h-full flex-1 flex-col justify-end rounded-t-xl outline-none focus-visible:ring-2 focus-visible:ring-[#F5B82E]"
                >
                  <span
                    className="mb-2 text-center font-display text-lg font-extrabold text-white transition-transform duration-300 group-hover:-translate-y-1"
                    style={{ color: isActive ? tint(bar.color, 0.2) : '#fff' }}
                  >
                    {bar.display ?? <CountUp to={bar.value} duration={1.6} />}
                  </span>
                  <m.span
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.5 + index * 0.18, ease }}
                    className="block w-full origin-bottom rounded-t-xl transition-[filter,box-shadow] duration-300"
                    style={{
                      height: `${bar.value}%`,
                      minHeight: 8,
                      background: `linear-gradient(to top, ${rgba(bar.color, 0.35)}, ${bar.color})`,
                      boxShadow: isActive ? `0 0 28px ${rgba(bar.color, 0.65)}, inset 0 3px 0 rgba(255,255,255,0.55)` : 'none',
                      filter: isActive ? 'brightness(1.15)' : 'brightness(0.85)',
                    }}
                  />
                </button>
              )
            })}
          </div>

          <div className="relative mt-3 flex gap-4 sm:gap-6" aria-hidden="true">
            {chart.bars.map((bar, index) => (
              <p
                key={bar.label}
                className={`flex-1 text-center text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${index === active ? 'underline decoration-2 underline-offset-4' : ''}`}
                style={{ color: index === active ? tint(bar.color, 0.2) : '#94a3b8' }}
              >
                {bar.label}
              </p>
            ))}
          </div>

          <div aria-live="polite" className="relative mt-6 min-h-[96px] rounded-2xl border border-white/10 bg-[#0B1730]/60 p-4">
            <div key={current.label}>
              <p className="flex flex-wrap items-center gap-2 text-sm font-bold" style={{ color: tint(current.color, 0.2) }}>
                {current.label}
                {rank && (
                  <span className="rounded-full border border-white/15 px-2 py-0.5 text-[11px] font-semibold text-slate-300">{rank}</span>
                )}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{current.detail}</p>
            </div>
          </div>

          <div className="relative mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="bg-gradient-to-r from-[#F5B82E] to-[#FFE29A] bg-clip-text text-sm font-bold text-transparent">
                {chart.footer}
              </p>
              <p className="mt-1 text-xs text-slate-400">{chart.unit}{chart.note ? ` · ${chart.note}` : ''}</p>
            </div>
            <MagneticButton href="/book" className="shrink-0 self-start sm:self-auto">
              Book a Consultation
            </MagneticButton>
          </div>
        </div>
      </TiltPanel>
    </MotionConfig>
  )
}

export default BarChartPanel
