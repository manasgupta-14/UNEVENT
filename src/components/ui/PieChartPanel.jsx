import { useState } from 'react'
import { MotionConfig, m } from 'framer-motion'
import TiltPanel from './TiltPanel'
import MagneticButton from './MagneticButton'
import { rgba, tint } from '../../lib/color'
import { ease } from '../../lib/motion'

const CX = 100
const CY = 100
const R = 90
const HOLE = 34

const point = (radius, angle) => [CX + radius * Math.cos(angle), CY + radius * Math.sin(angle)]

const labelColor = (hex) => {
  const value = parseInt(hex.slice(1), 16)
  const luma = (0.299 * ((value >> 16) & 255) + 0.587 * ((value >> 8) & 255) + 0.114 * (value & 255)) / 255
  return luma > 0.6 ? '#0B1730' : '#FFFFFF'
}

const buildSlices = (bars) => {
  let start = -Math.PI / 2
  return bars.map((bar, index) => {
    const share = bar.value - (bars[index - 1]?.value ?? 0)
    const sweep = (share / 100) * Math.PI * 2
    const end = start + sweep
    const mid = start + sweep / 2
    const [x1, y1] = point(R, start)
    const [x2, y2] = point(R, end)
    const path = `M ${CX} ${CY} L ${x1} ${y1} A ${R} ${R} 0 ${sweep > Math.PI ? 1 : 0} 1 ${x2} ${y2} Z`
    const [lx, ly] = point(R * 0.68, mid)
    const slice = { ...bar, share, path, lx, ly, dx: Math.cos(mid) * 5, dy: Math.sin(mid) * 5 }
    start = end
    return slice
  })
}

const PieChartPanel = ({ chart }) => {
  const [active, setActive] = useState(0)
  const slices = buildSlices(chart.bars)
  const current = slices[active]
  const biggest = Math.max(...slices.map((slice) => slice.share))
  const smallest = Math.min(...slices.map((slice) => slice.share))
  const rank = current.share === biggest ? 'Largest share' : current.share === smallest ? 'Smallest share' : null

  const handleKey = (event, index) => {
    const last = slices.length - 1
    const next = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? Math.min(index + 1, last) : event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? Math.max(index - 1, 0) : null
    if (next === null) return
    event.preventDefault()
    setActive(next)
    event.currentTarget.parentElement.querySelectorAll('[data-slice]')[next]?.focus()
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
            <p className="text-xs font-medium text-slate-400">Hover or tap a slice</p>
          </div>
          <h3 className="relative mt-2 font-display text-xl font-bold leading-snug text-white sm:text-2xl">{chart.title}</h3>

          <div className="relative mt-6 grid items-center gap-6 sm:grid-cols-[1fr_auto]">
            <m.div
              initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
              whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease }}
              className="mx-auto aspect-square w-full max-w-[250px]"
            >
              <svg viewBox="0 0 200 200" role="group" aria-label={`${chart.unit}. ${chart.note}`} className="h-full w-full overflow-visible">
                {slices.map((slice, index) => {
                  const isActive = index === active
                  return (
                    <g
                      key={slice.label}
                      style={{ transform: isActive ? `translate(${slice.dx}px, ${slice.dy}px)` : 'translate(0px, 0px)', transition: 'transform 0.3s ease' }}
                    >
                      <path
                        data-slice
                        d={slice.path}
                        fill={slice.color}
                        stroke="#0E1D3B"
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                        tabIndex={0}
                        role="button"
                        aria-pressed={isActive}
                        aria-label={`${slice.label}: ${slice.display}, ${slice.share}%`}
                        onMouseEnter={() => setActive(index)}
                        onFocus={() => setActive(index)}
                        onClick={() => setActive(index)}
                        onKeyDown={(event) => handleKey(event, index)}
                        className="cursor-pointer outline-none transition-[filter] duration-300 focus-visible:[stroke:#F5B82E]"
                        style={{ filter: isActive ? `brightness(1.15) drop-shadow(0 0 10px ${rgba(slice.color, 0.65)})` : 'brightness(0.88)' }}
                      />
                      <text
                        x={slice.lx}
                        y={slice.ly}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill={labelColor(slice.color)}
                        className="pointer-events-none font-display"
                        style={{ fontSize: 15, fontWeight: 800 }}
                      >
                        {slice.share}%
                      </text>
                    </g>
                  )
                })}

                <circle cx={CX} cy={CY} r={HOLE} fill="#0B1730" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" className="pointer-events-none" />
                <text x={CX} y={CY - 5} textAnchor="middle" dominantBaseline="central" fill="#FFFFFF" className="pointer-events-none font-display" style={{ fontSize: 15, fontWeight: 800 }}>
                  {current.display}
                </text>
                <text x={CX} y={CY + 11} textAnchor="middle" dominantBaseline="central" fill={tint(current.color, 0.2)} className="pointer-events-none" style={{ fontSize: 7.5, fontWeight: 700 }}>
                  {current.label}
                </text>
              </svg>
            </m.div>

            <ul className="flex flex-col gap-2.5" aria-hidden="true">
              {slices.map((slice, index) => (
                <li key={slice.label}>
                  <button
                    type="button"
                    tabIndex={-1}
                    onMouseEnter={() => setActive(index)}
                    onClick={() => setActive(index)}
                    className={`flex w-full items-center gap-3 rounded-lg px-2 py-1 text-left text-sm font-semibold transition-colors duration-300 ${index === active ? 'bg-white/[0.08] text-white' : 'text-slate-400'}`}
                  >
                    <span className="h-3.5 w-3.5 shrink-0 rounded-[3px]" style={{ backgroundColor: slice.color, boxShadow: index === active ? `0 0 12px ${rgba(slice.color, 0.8)}` : 'none' }} />
                    <span>
                      {slice.label} <span className="font-medium text-slate-500">({slice.display})</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div aria-live="polite" className="relative mt-6 min-h-[96px] rounded-2xl border border-white/10 bg-[#0B1730]/60 p-4">
            <div key={current.label}>
              <p className="flex flex-wrap items-center gap-2 text-sm font-bold" style={{ color: tint(current.color, 0.2) }}>
                {current.label}
                {rank && <span className="rounded-full border border-white/15 px-2 py-0.5 text-[11px] font-semibold text-slate-300">{rank}</span>}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{current.detail}</p>
            </div>
          </div>

          <div className="relative mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="bg-gradient-to-r from-[#F5B82E] to-[#FFE29A] bg-clip-text text-sm font-bold text-transparent">{chart.footer}</p>
              <p className="mt-1 text-xs text-slate-400">{chart.unit} · {chart.note}</p>
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

export default PieChartPanel
