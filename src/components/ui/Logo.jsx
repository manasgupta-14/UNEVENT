import { m } from 'framer-motion'

export const LogoMark = ({ className = 'h-[1.75rem] w-auto' }) => (
  <svg viewBox="0 0 64 68" fill="none" className={className} style={{ filter: 'drop-shadow(0 3px 3px rgba(255,255,255,0.5))' }} aria-hidden="true">
    <defs>
      <linearGradient id="logoBlue" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#3D8BFF" />
        <stop offset="1" stopColor="#1747A8" />
      </linearGradient>
      <linearGradient id="logoGold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#FFD25A" />
        <stop offset="1" stopColor="#E9A21C" />
      </linearGradient>
    </defs>
    <path d="M16 3V38A16 16 0 0 0 48 38V26" stroke="url(#logoBlue)" strokeWidth="15" />
    <path d="M40.5 4L57 0.5C58 22 51 38 38 49C30 56 24 60 17 62.5C31 52 42 34 40.5 4Z" fill="url(#logoGold)" />
  </svg>
)

export const Logo = ({ onClick, className = '' }) => (
  <m.a
    href="#"
    onClick={onClick}
    aria-label="UNEVENT home"
    className={`group relative inline-flex shrink-0 flex-col rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#F5B82E] ${className}`}
    whileTap={{ scale: 0.97 }}
  >
    <span className="flex items-end gap-[0.18rem]">
      <LogoMark />
      <span className="flex items-center font-display text-[1.45rem] font-extrabold leading-none tracking-[0.08em] text-white sm:text-[1.6rem]">
        NEVEN
        <span aria-hidden="true" className="mx-[0.2em] inline-block h-[0.2em] w-[0.2em] translate-y-[0.1em] rounded-full bg-[#F5B82E] transition-transform duration-300 group-hover:scale-150" />
        T
      </span>
    </span>
    <span className="mt-1.5 flex w-full items-center gap-1.5" aria-hidden="true">
      <span className="h-px flex-1 bg-[#F5B82E]/80" />
      <span className="whitespace-nowrap text-[0.5rem] font-medium leading-none tracking-[0.26em] text-slate-300 sm:text-[0.55rem]">MAKE IT A NON-EVENT.</span>
      <span className="h-px flex-1 bg-[#F5B82E]/80" />
    </span>
  </m.a>
)
