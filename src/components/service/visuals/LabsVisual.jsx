import { useEffect, useState } from 'react'
import { m } from 'framer-motion'
import PanelShell from './PanelShell'
import { rgba, tint } from '../../../lib/color'

const script = ['$ labs init prototype', 'design    approved', 'build     passing', 'deploy    live']
const full = script.join('\n')

const LabsVisual = ({ service }) => {
  const color = service.color
  const light = tint(color, 0.35)
  const steps = service.process
  const [count, setCount] = useState(0)
  const [step, setStep] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setCount((value) => (value > full.length + 36 ? 0 : value + 1)), 55)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setStep((value) => (value + 1) % steps.length), 1100)
    return () => clearInterval(id)
  }, [steps.length])

  const lines = full.slice(0, count).split('\n')

  return (
    <PanelShell
      color={color}
      title="labs / build.sh"
      chips={[
        { label: 'React', pos: '-left-5 top-[12%]', delay: '0s', tone: '#61DAFB' },
        { label: 'Node.js', pos: '-right-5 top-[30%]', delay: '1.2s', tone: '#34D399' },
        { label: 'MongoDB', pos: 'right-10 -bottom-4', delay: '2.2s', tone: '#4ADE80' },
      ]}
    >
      <div className="min-h-[9.5rem] rounded-2xl border border-white/10 bg-[#050B18]/80 p-4 font-mono text-[13px] leading-7">
        {lines.map((line, index) => {
          const [head, ...rest] = index === 0 ? [line] : line.split(/\s{2,}/)
          return (
            <div key={script[index]} className="flex gap-3 whitespace-pre">
              {index === 0 ? (
                <span style={{ color: light }}>{head}</span>
              ) : (
                <>
                  <span className="text-slate-500">{head}</span>
                  <span className="font-bold" style={{ color: '#34D399' }}>
                    {rest.join(' ')}
                  </span>
                </>
              )}
              {index === lines.length - 1 && <span className="inline-block h-4 w-2 translate-y-1 animate-pulse" style={{ backgroundColor: light }} />}
            </div>
          )
        })}
      </div>

      <div className="mt-7">
        <div className="mb-4 flex items-center justify-between text-xs font-semibold text-slate-400">
          <span>Delivery pipeline</span>
          <span style={{ color: light }}>{steps[step]}</span>
        </div>
        <div className="relative mx-7">
          <div className="absolute inset-x-0 top-3 h-[2px] rounded-full bg-white/10" />
          <m.div
            className="absolute left-0 top-3 h-[2px] rounded-full"
            style={{ background: `linear-gradient(90deg, ${color}, ${light})` }}
            animate={{ width: `${(step / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          />
          <div className="relative flex justify-between">
            {steps.map((label, index) => {
              const done = index <= step
              return (
                <div key={label} className="flex w-0 flex-col items-center gap-2">
                  <m.span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 bg-[#0B1730] text-[10px] font-extrabold"
                    animate={{
                      borderColor: done ? color : 'rgba(255,255,255,0.18)',
                      color: done ? light : '#64748B',
                      scale: index === step ? 1.25 : 1,
                      boxShadow: index === step ? `0 0 18px ${rgba(color, 0.8)}` : '0 0 0px rgba(0,0,0,0)',
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {index + 1}
                  </m.span>
                  <span className="hidden whitespace-nowrap text-[10px] font-semibold text-slate-400 sm:block">{label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-3">
        {service.deliverables.slice(0, 3).map((label, index) => (
          <m.div
            key={label}
            className="rounded-xl border border-white/10 bg-white/[0.04] min-w-0 break-words p-3 text-[10px] font-semibold leading-snug text-slate-300 sm:text-[11px]"
            animate={{ borderColor: ['rgba(255,255,255,0.1)', rgba(color, 0.6), 'rgba(255,255,255,0.1)'] }}
            transition={{ duration: 4, repeat: Infinity, delay: index * 1.3 }}
          >
            {label}
          </m.div>
        ))}
      </div>
    </PanelShell>
  )
}

export default LabsVisual
