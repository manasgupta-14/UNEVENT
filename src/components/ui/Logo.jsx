import { m } from 'framer-motion'

export const LogoMark = ({ className = 'h-[1.75rem] w-auto', glow = true }) => (
  <img src="/unevent-logo.png" alt="" aria-hidden="true" draggable="false" className={className} style={glow ? { filter: 'drop-shadow(0 3px 3px rgba(255,255,255,0.5))' } : undefined} />
)

export const Logo = ({ onClick, className = '', halo = false }) => (
  <m.a
    href="#"
    onClick={onClick}
    aria-label="UNEVENT home"
    className={`group relative inline-flex shrink-0 flex-col rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#F5B82E] ${className}`}
    whileTap={{ scale: 0.97 }}
  >
    <span className="flex items-end gap-[0.18rem]">
      {halo ? (
        <span className="relative inline-flex">
          <span aria-hidden="true" className="pointer-events-none absolute -inset-2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.34),transparent_68%)]" />
          <LogoMark glow={false} className="relative h-[1.75rem] w-auto drop-shadow-[0_0_5px_rgba(125,211,252,0.6)]" />
        </span>
      ) : (
        <LogoMark />
      )}
      <span className="flex items-center font-display text-[1.45rem] font-extrabold leading-none tracking-[0.08em] text-white sm:text-[1.6rem]">
        NEVEN
        <span aria-hidden="true" className="mx-[0.2em] inline-block h-[0.2em] w-[0.2em] translate-y-[0.1em] rounded-full bg-[#F5B82E] transition-transform duration-300 group-hover:scale-150" />
        T
      </span>
    </span>
    <span className="mt-1.5 flex w-full items-center gap-1.5" aria-hidden="true">
      <span className="h-[2px] min-w-2 flex-1 rounded-full bg-[#F5B82E]" />
      <span className="whitespace-nowrap text-[0.5rem] font-medium leading-none tracking-[0.26em] text-slate-300 sm:text-[0.55rem]">MAKE RISK A NON<span className="text-[#F5B82E]">-</span>EVENT.</span>
      <span className="h-[2px] min-w-2 flex-1 rounded-full bg-[#F5B82E]" />
    </span>
  </m.a>
)
