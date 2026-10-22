import { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import PanelShell from './PanelShell'
import { rgba, tint } from '../../../lib/color'

const clauses = [
  { label: 'Liability cap', note: 'Check against possible loss' },
  { label: 'Data handling', note: 'Inside or outside the cap?' },
  { label: 'Termination', note: 'Exit terms need a second read' },
  { label: 'Subcontracting', note: 'Who else touches your data' },
]

const CounselVisual = ({ service }) => {
  const color = service.color
  const light = tint(color, 0.4)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive((value) => (value + 1) % clauses.length), 1700)
    return () => clearInterval(id)
  }, [])

  return (
    <PanelShell
      color={color}
      title="counsel / review.doc"
      chips={[
        { label: 'Clause flagged', pos: '-left-4 top-[14%]', delay: '0s' },
        { label: 'Plain-language notes', pos: '-right-4 bottom-[20%]', delay: '1.5s', tone: '#34D399' },
      ]}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="font-display text-base font-bold text-white">Software license agreement</p>
          <p className="text-xs font-semibold text-slate-400">First-pass risk review</p>
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border" style={{ borderColor: rgba(color, 0.5), backgroundColor: rgba(color, 0.14) }}>
          <svg viewBox="0 0 24 24" fill="none" stroke={light} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </span>
      </div>

      <ul className="mt-5 space-y-3">
        {clauses.map((clause, index) => {
          const on = active === index
          return (
            <m.li
              key={clause.label}
              animate={{ borderColor: on ? rgba(color, 0.7) : 'rgba(255,255,255,0.08)', backgroundColor: on ? rgba(color, 0.1) : 'rgba(255,255,255,0.025)' }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl border p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-bold text-white">{clause.label}</span>
                <AnimatePresence>
                  {on && (
                    <m.span
                      initial={{ opacity: 0, scale: 0.7, x: 8 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      className="flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-extrabold text-[#0B1730]"
                      style={{ backgroundColor: color }}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3" aria-hidden="true">
                        <path d="M5 3v18l2-1 2 1 2-1 2 1 2-1 2 1V3H5zm4 5h6v2H9V8z" />
                      </svg>
                      Review
                    </m.span>
                  )}
                </AnimatePresence>
              </div>
              <div className="mt-3 space-y-2">
                <div className="relative h-2 overflow-hidden rounded-full bg-white/10">
                  <m.span
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ backgroundColor: color }}
                    animate={{ width: on ? '78%' : '0%' }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                  />
                </div>
                <div className="h-2 w-2/3 rounded-full bg-white/10" />
              </div>
              <m.p animate={{ opacity: on ? 1 : 0.4 }} className="mt-3 text-xs font-semibold" style={{ color: on ? light : '#64748B' }}>
                {clause.note}
              </m.p>
            </m.li>
          )
        })}
      </ul>
    </PanelShell>
  )
}

export default CounselVisual
