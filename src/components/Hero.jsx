import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import MagneticButton from './ui/MagneticButton'
import NetworkCanvas from './ui/NetworkCanvas'
import { services } from '../data/services'
import { ease, rise, stagger } from '../lib/motion'

const SHIELD = 'M100 15L160 40V90C160 135 135 170 100 185C65 170 40 135 40 90V40L100 15Z'
const SHIELD_INNER = 'M100 25L150 46V88C150 125 129 154 100 168C71 154 50 125 50 88V46L100 25Z'

const nodes = [
  { cx: 100, cy: 58, color: '#1473E6' },
  { cx: 62, cy: 92, color: '#F5B82E' },
  { cx: 138, cy: 92, color: '#A855F7' },
  { cx: 76, cy: 134, color: '#F97316' },
  { cx: 124, cy: 134, color: '#1473E6' },
]

const links = [
  [100, 100, 100, 58],
  [100, 100, 62, 92],
  [100, 100, 138, 92],
  [100, 100, 76, 134],
  [100, 100, 124, 134],
  [100, 58, 62, 92],
  [100, 58, 138, 92],
  [62, 92, 76, 134],
  [138, 92, 124, 134],
  [76, 134, 124, 134],
]

const chips = [
  { id: 'protect', label: 'Threat blocked', pos: 'left-0 top-[8%] sm:-left-6', depth: 22, delay: '0s' },
  { id: 'counsel', label: 'Contract reviewed', pos: 'right-0 top-[18%] sm:-right-4', depth: 30, delay: '1.2s' },
  { id: 'govern', label: 'Policy compliant', pos: 'left-0 bottom-[14%] sm:-left-4', depth: 26, delay: '2.1s' },
  { id: 'labs', label: 'Automation live', pos: 'right-0 bottom-[6%] sm:-right-6', depth: 34, delay: '0.6s' },
]

const Word = ({ children, delay, className = '' }) => (
  <span className="inline-block overflow-hidden pb-[0.14em] align-bottom">
    <motion.span
      className={`inline-block ${className}`}
      initial={{ y: '115%' }}
      animate={{ y: 0 }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.span>
  </span>
)

const FloatingChip = ({ chip, sx, sy }) => {
  const service = services.find((item) => item.id === chip.id)
  const x = useTransform(sx, [-0.5, 0.5], [-chip.depth, chip.depth])
  const y = useTransform(sy, [-0.5, 0.5], [-chip.depth, chip.depth])

  return (
    <motion.div style={{ x, y }} className={`absolute z-20 ${chip.pos}`}>
      <div
        className="animate-float flex items-center gap-3 rounded-xl border border-white/10 bg-[#0B1730]/70 px-3.5 py-2.5 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.8)] backdrop-blur-md"
        style={{ animationDelay: chip.delay }}
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full" style={{ backgroundColor: service.accent }} />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ backgroundColor: service.accent }} />
        </span>
        <span className="leading-tight">
          <span className="block text-[11px] font-semibold text-slate-400">{service.name}</span>
          <span className="block text-xs font-bold text-white">{chip.label}</span>
        </span>
      </div>
    </motion.div>
  )
}

const ShieldVisual = () => {
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 90, damping: 18, mass: 0.6 })
  const sy = useSpring(py, { stiffness: 90, damping: 18, mass: 0.6 })
  const rotateY = useTransform(sx, [-0.5, 0.5], [-14, 14])
  const rotateX = useTransform(sy, [-0.5, 0.5], [12, -12])

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    px.set((event.clientX - rect.left) / rect.width - 0.5)
    py.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  const handleLeave = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, delay: 0.3, ease }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="relative mx-auto aspect-square w-full max-w-[520px]"
    >
      <div className="absolute inset-[8%] rounded-full bg-[#1473E6]/25 blur-3xl" />
      <div className="absolute inset-[2%] animate-spin-slow rounded-full border border-dashed border-[#1473E6]/35">
        <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F5B82E] shadow-[0_0_16px_#F5B82E]" />
      </div>
      <div className="absolute inset-[14%] animate-spin-slower rounded-full border border-dashed border-[#F5B82E]/25">
        <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#1473E6] shadow-[0_0_14px_#1473E6]" />
      </div>

      <motion.div
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        className="absolute inset-[10%] [transform-style:preserve-3d]"
      >
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible drop-shadow-[0_0_44px_rgba(20,115,230,0.45)]" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="heroShield" x1="100" y1="15" x2="100" y2="185" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#1473E6" stopOpacity="0.45" />
              <stop offset="1" stopColor="#0B1730" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="heroStroke" x1="40" y1="15" x2="160" y2="185" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#F5B82E" />
              <stop offset="0.55" stopColor="#1473E6" />
              <stop offset="1" stopColor="#F5B82E" />
            </linearGradient>
            <linearGradient id="heroScan" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#1473E6" stopOpacity="0" />
              <stop offset="0.5" stopColor="#60A5FA" stopOpacity="0.55" />
              <stop offset="1" stopColor="#1473E6" stopOpacity="0" />
            </linearGradient>
            <clipPath id="heroClip">
              <path d={SHIELD} />
            </clipPath>
          </defs>

          <motion.path
            d={SHIELD}
            fill="url(#heroShield)"
            stroke="url(#heroStroke)"
            strokeWidth="2.2"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, delay: 0.5, ease: 'easeInOut' }}
          />
          <path d={SHIELD_INNER} stroke="#F5B82E" strokeOpacity="0.55" strokeWidth="1" strokeDasharray="3 5" className="animate-dash" />

          <g clipPath="url(#heroClip)">
            <rect x="36" y="20" width="128" height="26" fill="url(#heroScan)" className="animate-scan-y" />
          </g>

          <g strokeWidth="1" strokeDasharray="3 5" strokeOpacity="0.6" stroke="#60A5FA">
            {links.map(([x1, y1, x2, y2]) => (
              <line key={`${x1}-${y1}-${x2}-${y2}`} x1={x1} y1={y1} x2={x2} y2={y2} className="animate-dash" />
            ))}
          </g>

          {nodes.map((node, index) => (
            <g key={`${node.cx}-${node.cy}`}>
              <circle cx={node.cx} cy={node.cy} r="11" stroke={node.color} strokeOpacity="0.28" />
              <circle
                cx={node.cx}
                cy={node.cy}
                r="6"
                fill="#0B1730"
                stroke={node.color}
                strokeWidth="2"
                className="animate-node origin-self"
                style={{ animationDelay: `${index * 0.35}s` }}
              />
            </g>
          ))}

          <circle cx="100" cy="100" r="22" stroke="#F5B82E" strokeOpacity="0.25" />
          <circle cx="100" cy="100" r="15" fill="#0B1730" stroke="#F5B82E" strokeWidth="2.5" />
          <circle cx="100" cy="100" r="4.5" fill="#F5B82E" className="animate-node origin-self" />
        </svg>
      </motion.div>

      {chips.map((chip) => (
        <FloatingChip key={chip.id} chip={chip} sx={sx} sy={sy} />
      ))}
    </motion.div>
  )
}

const Hero = () => {
  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  return (
    <section
      id="home"
      onPointerMove={handleMove}
      className="relative isolate flex min-h-[calc(100svh-5rem)] items-center overflow-hidden bg-[#0B1730]"
    >
      <NetworkCanvas className="opacity-70" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(620px_circle_at_var(--mx,70%)_var(--my,30%),rgba(20,115,230,0.2),transparent_60%)]" />
      <div className="pointer-events-none absolute -left-32 top-10 -z-10 h-[420px] w-[420px] animate-float rounded-full bg-[#1473E6]/20 blur-[110px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-[380px] w-[380px] animate-float rounded-full bg-[#F5B82E]/10 blur-[110px]" style={{ animationDelay: '2s' }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0B1730] to-transparent" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-8 lg:py-24">
        <motion.div variants={stagger(0.1, 0.1)} initial="hidden" animate="show" className="relative z-10">
          <motion.span
            variants={rise}
            className="inline-flex items-center gap-2.5 rounded-full border border-[#1473E6]/30 bg-[#1473E6]/10 px-4 py-1.5 text-sm font-semibold text-blue-200 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-[#F5B82E]" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F5B82E]" />
            </span>
            We make it a non-event.
          </motion.span>

          <h1 className="mt-7 font-display text-[2.7rem] font-extrabold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-[4.3rem]">
            <span className="block">
              <Word delay={0.25}>Make</Word> <Word delay={0.33}>Risk</Word> <Word delay={0.41}>a</Word>
            </span>
            <span className="block">
              <Word
                delay={0.5}
                className="animate-gradient bg-gradient-to-r from-[#F5B82E] via-[#FFE29A] to-[#F5B82E] bg-[length:220%_auto] bg-clip-text text-transparent"
              >
                Non-Event.
              </Word>
            </span>
          </h1>

          <motion.p variants={rise} className="mt-7 max-w-xl text-lg leading-relaxed text-slate-300 sm:text-xl">
            Proactive cybersecurity, legal risk management, governance and technology solutions designed to help businesses prevent problems before they escalate.
          </motion.p>

          <motion.div variants={rise} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <MagneticButton href="#services" size="lg">
              Explore Our Services
            </MagneticButton>
            <MagneticButton href="#contact" tone="ghost" size="lg" arrow={false}>
              Talk to Our Team
            </MagneticButton>
          </motion.div>

          <motion.div variants={rise} className="mt-10 flex flex-wrap items-center gap-2.5">
            {services.map((service) => (
              <a
                key={service.id}
                href="#services"
                className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm font-semibold text-slate-200 outline-none backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#F5B82E]"
              >
                <span className="h-2 w-2 rounded-full transition-transform duration-300 group-hover:scale-150" style={{ backgroundColor: service.accent, boxShadow: `0 0 10px ${service.accent}` }} />
                {service.name}
              </a>
            ))}
          </motion.div>
        </motion.div>

        <ShieldVisual />
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block" aria-hidden="true">
        <div className="flex h-9 w-6 justify-center rounded-full border border-white/25 pt-2">
          <span className="h-1.5 w-1 animate-cue rounded-full bg-[#F5B82E]" />
        </div>
      </div>
    </section>
  )
}

export default Hero
