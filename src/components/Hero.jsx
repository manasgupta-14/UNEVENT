import { lazy, Suspense, useEffect, useState } from 'react'
import { m, useMotionValue, useSpring, useTransform } from 'framer-motion'
import MagneticButton from './ui/MagneticButton'
import { services } from '../data/services'
import { ease, rise, stagger } from '../lib/motion'
import { rectOf } from '../lib/pointer'

const NetworkCanvas = lazy(() => import('./ui/NetworkCanvas'))

const SHIELD = 'M100 15L160 40V90C160 135 135 170 100 185C65 170 40 135 40 90V40L100 15Z'
const SHIELD_INNER = 'M100 25L150 46V88C150 125 129 154 100 168C71 154 50 125 50 88V46L100 25Z'

const nodes = [
  { cx: 100, cy: 58, color: '#1685DB' },
  { cx: 62, cy: 92, color: '#E9AB27' },
  { cx: 138, cy: 92, color: '#7146C8' },
  { cx: 76, cy: 134, color: '#C58A19' },
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
  { id: 'protect', label: 'Sample finding', pos: 'left-[3%] top-[8%]', depth: 22, delay: '0s' },
  { id: 'counsel', label: 'Flagged clause', pos: 'right-[3%] top-[20%]', depth: 30, delay: '1.2s' },
  { id: 'govern', label: 'Control status', pos: 'left-[3%] bottom-[16%]', depth: 26, delay: '2.1s' },
  { id: 'labs', label: 'Automation output', pos: 'right-[3%] bottom-[8%]', depth: 34, delay: '0.6s' },
]

const Word = ({ children, delay, className = '' }) => (
  <span className="inline-block overflow-hidden pb-[0.14em] align-bottom">
    <m.span
      className={`inline-block ${className}`}
      initial={{ y: '115%' }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </m.span>
  </span>
)

const ChipBody = ({ chip, delay }) => {
  const service = services.find((item) => item.id === chip.id)

  return (
    <div
      className="flex min-w-0 items-center gap-2.5 rounded-xl border border-white/20 bg-[#0B1730]/70 px-3 py-2.5 shadow-[0_15px_40px_-16px_rgba(0,0,0,0.8)] backdrop-blur-md sm:gap-3 sm:px-3.5"
      style={delay ? { animationDelay: delay } : undefined}
    >
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full" style={{ backgroundColor: service.accent }} />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ backgroundColor: service.accent }} />
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block text-[11px] font-semibold text-slate-400">{service.name}</span>
        <span className="block text-xs font-bold text-white">{chip.label}</span>
      </span>
    </div>
  )
}

const FloatingChip = ({ chip, sx, sy }) => {
  const x = useTransform(sx, [-0.5, 0.5], [-chip.depth, chip.depth])
  const y = useTransform(sy, [-0.5, 0.5], [-chip.depth, chip.depth])

  return (
    <m.div style={{ x, y }} className={`absolute z-20 hidden sm:block ${chip.pos}`}>
      <div className="animate-float" style={{ animationDelay: chip.delay }}>
        <ChipBody chip={chip} />
      </div>
    </m.div>
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
    const rect = rectOf(event.currentTarget)
    px.set((event.clientX - rect.left) / rect.width - 0.5)
    py.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  const handleLeave = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <m.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, delay: 0.3, ease }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="relative aspect-square w-full"
    >
      <div className="absolute inset-[8%] rounded-full bg-[#1473E6]/25 blur-3xl" />
      <div className="absolute inset-[2%] animate-spin-slow rounded-full border border-dashed border-[#1473E6]/35">
        <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F5B82E] shadow-[0_0_16px_#F5B82E]" />
      </div>
      <div className="absolute inset-[14%] animate-spin-slower rounded-full border border-dashed border-[#F5B82E]/25">
        <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#1473E6] shadow-[0_0_14px_#1473E6]" />
      </div>

      <m.div
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

          <m.path
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
      </m.div>

      {chips.map((chip) => (
        <FloatingChip key={chip.id} chip={chip} sx={sx} sy={sy} />
      ))}
    </m.div>
  )
}

const ShieldBlock = () => (
  <div className="mx-auto w-full max-w-[520px] min-w-0 lg:max-w-[min(430px,54vh)]">
    <ShieldVisual />
    <div className="mt-6 grid grid-cols-2 gap-3 sm:hidden">
      {chips.map((chip) => (
        <ChipBody key={chip.id} chip={chip} />
      ))}
    </div>
  </div>
)

const Hero = () => {
  const [showCanvas, setShowCanvas] = useState(false)

  useEffect(() => {
    let idleId
    let timerId
    const start = () => setShowCanvas(true)
    const schedule = () => {
      timerId = window.setTimeout(() => {
        if ('requestIdleCallback' in window) idleId = window.requestIdleCallback(start, { timeout: 2000 })
        else start()
      }, 1200)
    }
    if (document.readyState === 'complete') schedule()
    else window.addEventListener('load', schedule, { once: true })
    return () => {
      window.removeEventListener('load', schedule)
      window.clearTimeout(timerId)
      if (idleId && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId)
    }
  }, [])

  const handleMove = (event) => {
    const rect = rectOf(event.currentTarget)
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  return (
    <section
      id="home"
      onPointerMove={handleMove}
      className="relative isolate flex flex-1 items-center overflow-hidden bg-[#0B1730]"
    >
      {showCanvas && (
        <Suspense fallback={null}>
          <NetworkCanvas className="opacity-80" />
        </Suspense>
      )}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(500px_circle_at_var(--mx,70%)_var(--my,30%),rgba(20,115,230,0.2),transparent_60%)]" />
      <div className="pointer-events-none absolute -left-32 top-10 -z-10 h-[420px] w-[420px] rounded-full bg-[#1473E6]/20 blur-[110px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-[380px] w-[380px] rounded-full bg-[#F5B82E]/10 blur-[110px]" style={{ animationDelay: '2s' }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0B1730] to-transparent" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6 lg:px-8 lg:py-6">
        <m.div variants={stagger(0.07, 0.05)} initial="hidden" animate="show" className="relative z-10 min-w-0">
          <m.span
            variants={rise}
            className="inline-flex items-center gap-2.5 rounded-full border border-[#1473E6]/30 bg-[#1473E6]/10 px-4 py-1.5 text-sm font-semibold text-blue-200 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-[#F5B82E]" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F5B82E]" />
            </span>
            Risk advisory · Cyber · Legal · Compliance · Technology
          </m.span>

          <h1 className="mt-4 font-display text-[2.3rem] font-extrabold leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-[clamp(2.4rem,6.4vh,3.4rem)]">
            <span className="block">
              <Word delay={0.05}>Make</Word> <Word delay={0.11}>Risk</Word> <Word delay={0.17}>a</Word>
            </span>
            <span className="block">
              <Word
                delay={0.25}
                className="animate-gradient bg-gradient-to-r from-[#F5B82E] via-[#FFE29A] to-[#F5B82E] bg-[length:220%_auto] bg-clip-text text-transparent"
              >
                Non-Event.
              </Word>
            </span>
          </h1>

          <m.p variants={rise} className="mt-4 max-w-xl text-base leading-relaxed text-slate-300 lg:text-[17px]">
            UNEVENT is a risk advisory firm helping organisations identify and prioritise cyber, legal and compliance exposure—and turn findings into practical controls. We combine expert-led advisory with curated products and services and in-house technology to strengthen prevention, readiness and response.
          </m.p>

          <m.div variants={rise} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <MagneticButton href="/book" size="lg">
              Discuss a risk
            </MagneticButton>
            <MagneticButton href="#practice" tone="ghost" size="lg" arrow={false}>
              Explore our four practices
            </MagneticButton>
          </m.div>

          <m.div variants={rise} className="mt-6 flex flex-wrap items-center gap-2">
            {services.map((service) => (
              <a
                key={service.id}
                href="#practice"
                className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm font-semibold text-slate-200 outline-none backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#F5B82E]"
              >
                <span className="h-2 w-2 rounded-full transition-transform duration-300 group-hover:scale-150" style={{ backgroundColor: service.accent, boxShadow: `0 0 10px ${service.accent}` }} />
                {service.name}<span className="font-medium text-slate-400">· {service.field}</span>
              </a>
            ))}
          </m.div>
        </m.div>

        <ShieldBlock />
      </div>

          </section>
  )
}

export default Hero
