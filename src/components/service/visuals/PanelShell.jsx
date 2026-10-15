import TiltPanel from '../../ui/TiltPanel'
import { rgba } from '../../../lib/color'

const PanelShell = ({ color, title, chips = [], children }) => (
  <TiltPanel className="relative mx-auto w-full max-w-[520px]">
    <div className="absolute -inset-8 rounded-[3rem] opacity-70 blur-3xl" style={{ background: `radial-gradient(closest-side, ${rgba(color, 0.38)}, transparent)` }} />
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B1730]/85 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl">
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
      <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="ml-3 font-mono text-xs text-slate-400">{title}</span>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-semibold text-slate-400">Illustrative</span>
      </div>
      <div className="relative p-5 sm:p-6">{children}</div>
    </div>
    {chips.map((chip) => (
      <div key={chip.label} className={`absolute z-20 hidden sm:block ${chip.pos}`}>
        <div
          className="animate-float flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#0B1730]/80 px-3.5 py-2 text-xs font-bold text-white shadow-[0_18px_40px_-16px_rgba(0,0,0,0.8)] backdrop-blur-md"
          style={{ animationDelay: chip.delay }}
        >
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: chip.tone || color, boxShadow: `0 0 10px ${chip.tone || color}` }} />
          {chip.label}
        </div>
      </div>
    ))}
  </TiltPanel>
)

export default PanelShell
