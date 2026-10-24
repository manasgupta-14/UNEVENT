import { m } from 'framer-motion'
import PanelShell from './PanelShell'
import { rgba, tint } from '../../../lib/color'

const blips = [
  { x: 68, y: 28, tone: '#F87171', delay: 0.2 },
  { x: 26, y: 52, tone: '#FBBF24', delay: 1.1 },
  { x: 76, y: 66, tone: '#FBBF24', delay: 2 },
  { x: 40, y: 80, tone: '#60A5FA', delay: 2.8 },
  { x: 52, y: 20, tone: '#60A5FA', delay: 3.6 },
]

const findings = [
  { label: 'Weak shared password', level: 'High', width: 88, tone: '#F87171' },
  { label: 'Unreviewed access rights', level: 'Medium', width: 62, tone: '#FBBF24' },
  { label: 'Unpatched vulnerability', level: 'Medium', width: 54, tone: '#FBBF24' },
  { label: 'No incident plan', level: 'Low', width: 30, tone: '#60A5FA' },
]

const ProtectVisual = ({ service }) => {
  const color = service.color
  const light = tint(color, 0.4)

  return (
    <PanelShell
      color={color}
      title="protect / sample.scan"
      chips={[
        { label: 'Sample finding', pos: '-left-5 top-[20%]', delay: '0s' },
        { label: 'Findings ranked', pos: '-right-4 bottom-[26%]', delay: '1.6s', tone: '#FBBF24' },
      ]}
    >
      <div className="relative mx-auto aspect-square w-full max-w-[250px]">
        {[0, 16, 32, 48].map((inset) => (
          <div key={inset} className="absolute rounded-full border" style={{ inset: `${inset}%`, borderColor: rgba(color, 0.3) }} />
        ))}
        <div className="absolute inset-x-0 top-1/2 h-px" style={{ backgroundColor: rgba(color, 0.25) }} />
        <div className="absolute inset-y-0 left-1/2 w-px" style={{ backgroundColor: rgba(color, 0.25) }} />
        <m.div
          className="absolute inset-0 rounded-full"
          style={{ background: `conic-gradient(from 0deg, transparent 0deg, transparent 240deg, ${rgba(color, 0.55)} 360deg)` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        />
        {blips.map((blip) => (
          <m.span
            key={`${blip.x}-${blip.y}`}
            className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ left: `${blip.x}%`, top: `${blip.y}%`, backgroundColor: blip.tone, boxShadow: `0 0 14px ${blip.tone}` }}
            animate={{ scale: [0.6, 1.5, 0.6], opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 5, repeat: Infinity, delay: blip.delay, ease: 'easeInOut' }}
          />
        ))}
        <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ backgroundColor: light, boxShadow: `0 0 18px ${color}` }} />
      </div>

      <ul className="mt-7 space-y-3">
        {findings.map((finding, index) => (
          <li key={finding.label} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-200">{finding.label}</span>
              <span style={{ color: finding.tone }}>{finding.level}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <m.div
                className="h-full rounded-full"
                style={{ backgroundColor: finding.tone }}
                initial={{ width: 0 }}
                animate={{ width: `${finding.width}%` }}
                transition={{ duration: 1.3, delay: 0.9 + index * 0.2, ease: 'easeOut' }}
              />
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-[11px] leading-relaxed text-slate-400">
        Severity reflects likelihood and business impact in context: High needs action first, Medium is planned, Low is tracked. The same finding can rank differently in another business.
      </p>
    </PanelShell>
  )
}

export default ProtectVisual
