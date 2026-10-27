import { m } from 'framer-motion'
import PanelShell from './PanelShell'
import CountUp from '../../ui/CountUp'
import { rgba, tint } from '../../../lib/color'

const bars = [38, 56, 44, 70, 62, 84, 76]

const CheckRow = ({ label, index, color }) => (
  <li className="flex items-center gap-3 text-sm font-semibold text-slate-200">
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border" style={{ borderColor: rgba(color, 0.55), backgroundColor: rgba(color, 0.16) }}>
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke={tint(color, 0.55)} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <m.path
          d="M5 12.5l4.5 4.5L19 7.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 6, repeat: Infinity, times: [0, 0.15, 0.85, 1], delay: index * 0.7, ease: 'easeInOut' }}
        />
      </svg>
    </span>
    {label}
  </li>
)

const GovernVisual = ({ service }) => {
  const color = service.color
  const light = tint(color, 0.45)

  return (
    <PanelShell
      color={color}
      title="governance / status"
      chips={[
        { label: 'Policy approved', pos: '-right-3 -top-5', delay: '0s' },
        { label: 'Evidence collected', pos: '-right-4 bottom-[18%]', delay: '1.4s', tone: '#34D399' },
      ]}
    >
      <div className="flex items-center gap-6">
        <div className="relative h-[118px] w-[118px] shrink-0">
          <svg viewBox="0 0 120 120" className="h-full w-full" fill="none" aria-hidden="true">
            <circle cx="60" cy="60" r="50" stroke="rgba(255,255,255,0.1)" strokeWidth="9" />
            <m.circle
              cx="60"
              cy="60"
              r="50"
              stroke={light}
              strokeWidth="9"
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, delay: 0.7, ease: 'easeOut' }}
              style={{ filter: `drop-shadow(0 0 8px ${rgba(color, 0.8)})` }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-2xl font-bold text-white">
              <CountUp to={service.deliverables.length} />
            </span>
            <span className="text-[10px] font-semibold text-slate-400">deliverables</span>
          </div>
        </div>
        <ul className="flex-1 space-y-3">
          {service.deliverables.map((label, index) => (
            <CheckRow key={label} label={label} index={index} color={color} />
          ))}
        </ul>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
          <span>Evidence review cycle</span>
          <span style={{ color: light }}>Monthly</span>
        </div>
        <div className="mt-4 flex h-20 items-end gap-2.5">
          {bars.map((height, index) => (
            <div key={height} className="flex h-full flex-1 items-end">
              <m.span
                className="w-full rounded-t-md"
                style={{ height: `${height}%`, originY: 1, background: `linear-gradient(to top, ${rgba(color, 0.35)}, ${light})` }}
                initial={{ scaleY: 0.2 }}
                animate={{ scaleY: [0.35, 1, 0.35] }}
                transition={{ duration: 3.4, repeat: Infinity, delay: index * 0.2, ease: 'easeInOut' }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 space-y-2.5">
        {service.process.slice(0, 3).map((step, index) => (
          <div key={step} className="flex items-center gap-3">
            <span className="w-16 shrink-0 break-words text-xs font-semibold text-slate-400 sm:w-20">{step}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <m.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${color}, ${light})` }}
                initial={{ width: 0 }}
                animate={{ width: ['0%', `${96 - index * 22}%`] }}
                transition={{ duration: 1.6, delay: 1 + index * 0.25, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
      </div>
    </PanelShell>
  )
}

export default GovernVisual
