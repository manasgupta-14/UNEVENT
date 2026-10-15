import { motion } from 'framer-motion'

export const LogoMark = ({ className = 'h-9 w-9' }) => (
  <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
    <motion.path
      d="M16 2.5l11 4v8.2c0 6.6-4.4 11.6-11 14.8C9.4 26.3 5 21.3 5 14.7V6.5l11-4z"
      stroke="#F5B82E"
      strokeWidth="1.6"
      strokeLinejoin="round"
      fill="#1473E6"
      fillOpacity="0.18"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
    />
    <motion.path
      d="M11.5 10v6.2a4.5 4.5 0 009 0V10"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.9, delay: 0.5, ease: 'easeInOut' }}
    />
  </svg>
)

export const Logo = ({ onClick, className = '' }) => (
  <motion.a
    href="#"
    onClick={onClick}
    aria-label="UNEVENT home"
    className={`group relative flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#F5B82E] ${className}`}
    whileTap={{ scale: 0.97 }}
  >
    <LogoMark />
    <span className="relative font-display text-[1.3rem] font-bold leading-none tracking-[0.16em] text-white">
      UNEVENT
      <span className="absolute -bottom-1.5 left-0 h-[2px] w-3 rounded-full bg-[#F5B82E] transition-all duration-500 ease-out group-hover:w-full" />
    </span>
  </motion.a>
)
