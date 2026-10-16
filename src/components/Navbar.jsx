import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLocation, useNavigate } from 'react-router'
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'framer-motion'
import MagneticButton from './ui/MagneticButton'
import { Logo } from './ui/Logo'
import { Arrow } from './ui/icons'
import { icons, services } from '../data/services'

const navItems = [
  { key: 'home', label: 'Home', href: '#' },
  { key: 'services', label: 'Services', mega: true },
  { key: 'industries', label: 'Industries', href: '/industries' },
  { key: 'insights', label: 'Insights', href: '#insights' },
  { key: 'about', label: 'About', href: '#about' },
  { key: 'contact', label: 'Contact', href: '#contact' },
]

const spyIds = ['industries', 'insights', 'about', 'contact']

const ease = [0.22, 1, 0.36, 1]

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease } },
}

const ServiceIcon = ({ id, color, className = 'h-5 w-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d={icons[id]} />
  </svg>
)

const Chevron = ({ open }) => (
  <motion.svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-3.5 w-3.5"
    animate={{ rotate: open ? 180 : 0 }}
    transition={{ duration: 0.25, ease }}
    aria-hidden="true"
  >
    <path d="M6 9l6 6 6-6" />
  </motion.svg>
)

const ServiceTile = ({ service, onNavigate }) => {
  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--x', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--y', `${event.clientY - rect.top}px`)
  }

  return (
    <motion.a
      variants={itemVariants}
      href={service.href}
      onClick={() => onNavigate('services')}
      onMouseMove={handleMove}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25, ease }}
      className="group relative flex gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 outline-none transition-colors duration-300 hover:border-white/25 focus-visible:ring-2 focus-visible:ring-[#F5B82E]"
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(260px circle at var(--x, 50%) var(--y, 50%), ${service.accent}30, transparent 70%)` }}
      />
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent, ${service.accent}, transparent)` }}
      />
      <span
        className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
        style={{ borderColor: `${service.accent}55`, backgroundColor: `${service.accent}1A` }}
      >
        <ServiceIcon id={service.id} color={service.accent} className="h-6 w-6" />
      </span>
      <span className="relative min-w-0">
        <span className="flex items-center gap-2">
          <span className="text-base font-bold text-white">{service.name}</span>
          <span className="rounded-full px-2 py-0.5 text-[11px] font-medium" style={{ color: service.accent, backgroundColor: `${service.accent}1F` }}>
            {service.field}
          </span>
        </span>
        <span className="mt-1.5 block text-[13px] leading-relaxed text-slate-400">{service.desc}</span>
        <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 transition-colors group-hover:text-white">
          Explore Service
          <Arrow className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </span>
    </motion.a>
  )
}

const MegaMenu = ({ onNavigate, onEnter, onLeave }) => (
  <motion.div
    initial={{ opacity: 0, y: -10, clipPath: 'inset(0 0 100% 0)' }}
    animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.4, ease } }}
    exit={{ opacity: 0, y: -6, clipPath: 'inset(0 0 40% 0)', transition: { duration: 0.18 } }}
    onMouseEnter={onEnter}
    onMouseLeave={onLeave}
    className="absolute inset-x-0 top-full hidden border-t border-white/10 bg-[#0B1730]/95 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.75)] backdrop-blur-2xl lg:block"
  >
    <div className="pointer-events-none absolute inset-0 animate-scan bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
    <div className="pointer-events-none absolute -top-24 left-1/4 h-48 w-96 rounded-full bg-[#1473E6]/20 blur-3xl" />
    <motion.div
      variants={listVariants}
      initial="hidden"
      animate="show"
      className="relative mx-auto grid max-w-7xl grid-cols-12 gap-6 px-8 py-8"
    >
      <div className="col-span-8 grid grid-cols-2 gap-4">
        {services.map((service) => (
          <ServiceTile key={service.id} service={service} onNavigate={onNavigate} />
        ))}
      </div>
      <motion.div
        variants={itemVariants}
        className="relative col-span-4 flex flex-col justify-between overflow-hidden rounded-2xl border border-[#F5B82E]/25 bg-gradient-to-br from-[#F5B82E]/15 via-[#F5B82E]/5 to-transparent p-6"
      >
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border border-[#F5B82E]/20" />
        <div className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full border border-[#F5B82E]/30" />
        <div className="relative">
          <span className="relative mb-4 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-[#F5B82E]" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-[#F5B82E]" />
          </span>
          <h3 className="text-lg font-bold leading-snug text-white">Not sure which division fits?</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-slate-300">
            Tell us what you are dealing with and we will map it to the right team.
          </p>
        </div>
        <MagneticButton href="#contact" onClick={() => onNavigate('contact')} className="relative mt-6 self-start">
          Book a Consultation
        </MagneticButton>
      </motion.div>
    </motion.div>
  </motion.div>
)

const MobileDrawer = ({ open, onClose, active, onNavigate }) => {
  const [servicesOpen, setServicesOpen] = useState(false)
  const closeRef = useRef(null)

  useEffect(() => {
    if (open) closeRef.current?.focus()
  }, [open])

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#050B18]/75 backdrop-blur-sm"
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col overflow-hidden border-l border-white/10 bg-[#0B1730] shadow-2xl"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#1473E6]/25 blur-3xl" />

            <div className="relative flex h-20 shrink-0 items-center justify-between border-b border-white/10 px-5">
              <Logo onClick={() => onNavigate('home')} />
              <motion.button
                ref={closeRef}
                onClick={onClose}
                whileTap={{ scale: 0.9, rotate: 90 }}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-white outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#F5B82E]"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </motion.button>
            </div>

            <motion.nav
              variants={listVariants}
              initial="hidden"
              animate="show"
              className="relative flex-1 space-y-1 overflow-y-auto px-4 py-5"
            >
              {navItems.map((item) =>
                item.mega ? (
                  <motion.div key={item.key} variants={itemVariants}>
                    <button
                      onClick={() => setServicesOpen((value) => !value)}
                      aria-expanded={servicesOpen}
                      className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-base font-semibold text-slate-200 outline-none transition-colors hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-[#F5B82E]"
                    >
                      Services
                      <Chevron open={servicesOpen} />
                    </button>
                    <AnimatePresence initial={false}>
                      {servicesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-1 pb-2 pl-3 pt-1">
                            {services.map((service) => (
                              <a
                                key={service.id}
                                href={service.href}
                                onClick={() => onNavigate('services')}
                                className="flex items-center gap-3 rounded-xl px-3 py-2.5 outline-none transition-colors hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-[#F5B82E]"
                              >
                                <span
                                  className="flex h-9 w-9 items-center justify-center rounded-lg"
                                  style={{ backgroundColor: `${service.accent}1F` }}
                                >
                                  <ServiceIcon id={service.id} color={service.accent} className="h-[18px] w-[18px]" />
                                </span>
                                <span>
                                  <span className="block text-sm font-semibold text-white">{service.name}</span>
                                  <span className="block text-xs text-slate-400">{service.field}</span>
                                </span>
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.a
                    key={item.key}
                    variants={itemVariants}
                    href={item.href}
                    onClick={() => onNavigate(item.key)}
                    className={`relative flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#F5B82E] ${
                      active === item.key ? 'bg-white/[0.07] text-white' : 'text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                    {active === item.key && <span className="h-1.5 w-1.5 rounded-full bg-[#F5B82E]" />}
                  </motion.a>
                )
              )}
            </motion.nav>

            <div className="relative shrink-0 border-t border-white/10 p-5">
              <MagneticButton href="#contact" onClick={() => onNavigate('contact')} size="lg" className="w-full">
                Book a Consultation
              </MagneticButton>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}

const Navbar = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const onService = pathname.startsWith('/services')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [hovered, setHovered] = useState(null)
  const [active, setActive] = useState('home')
  const headerRef = useRef(null)
  const closeTimer = useRef(null)
  const current = onService ? 'services' : pathname === '/industries' ? 'industries' : active

  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 })

  useMotionValueEvent(scrollY, 'change', (value) => {
    setScrolled(value > 12)
    if (value < 160) setActive('home')
  })

  const openMega = useCallback(() => {
    clearTimeout(closeTimer.current)
    setMegaOpen(true)
  }, [])

  const closeMega = useCallback(() => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setMegaOpen(false), 140)
  }, [])

  const handleNavigate = useCallback((key) => {
    setActive(key)
    setMegaOpen(false)
    setMenuOpen(false)
  }, [])

  const handleRoute = (event, key, href) => {
    if (href?.startsWith('/')) {
      event.preventDefault()
      navigate(href)
    }
    handleNavigate(key)
  }

  const handleHome = (event) => {
    event.preventDefault()
    if (pathname !== '/') navigate('/')
    else window.scrollTo({ top: 0, behavior: 'smooth' })
    handleNavigate('home')
  }

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setMegaOpen(false)
        setMenuOpen(false)
      }
    }
    const onPointer = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) setMegaOpen(false)
    }
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
      window.removeEventListener('resize', onResize)
      clearTimeout(closeTimer.current)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    if (pathname !== '/') return undefined
    const targets = spyIds.map((id) => document.getElementById(id)).filter(Boolean)
    if (!targets.length) return undefined
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [pathname])

  return (
    <MotionConfig reducedMotion="user">
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 border-b transition-all duration-500 ${
          scrolled
            ? 'border-white/10 bg-[#0B1730]/80 shadow-[0_12px_40px_-14px_rgba(0,0,0,0.7)] backdrop-blur-xl'
            : 'border-transparent bg-[#0B1730]'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className={`flex w-full items-center justify-between transition-[height] duration-500 ease-out ${scrolled ? 'h-16' : 'h-20'}`}>
            <Logo onClick={handleHome} />

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1" onMouseLeave={() => setHovered(null)}>
                {navItems.map((item) => {
                  const isActive = item.mega ? megaOpen || onService : current === item.key
                  const content = (
                    <>
                      {hovered === item.key && (
                        <motion.span
                          layoutId="nav-hover"
                          className="absolute inset-0 rounded-lg bg-white/[0.08]"
                          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                        />
                      )}
                      <span className="relative flex items-center gap-1.5">
                        {item.label}
                        {item.mega && <Chevron open={megaOpen} />}
                      </span>
                      {isActive && (
                        <motion.span
                          layoutId={item.mega ? undefined : 'nav-active'}
                          className="absolute inset-x-4 -bottom-0.5 h-[2px] rounded-full bg-[#F5B82E]"
                          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                        />
                      )}
                    </>
                  )

                  const cls = `relative block rounded-lg px-4 py-2 text-sm font-semibold outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#F5B82E] ${
                    isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                  }`

                  return (
                    <li key={item.key} onMouseEnter={() => setHovered(item.key)}>
                      {item.mega ? (
                        <button
                          type="button"
                          aria-haspopup="true"
                          aria-expanded={megaOpen}
                          onMouseEnter={openMega}
                          onMouseLeave={closeMega}
                          onClick={() => setMegaOpen((value) => !value)}
                          className={cls}
                        >
                          {content}
                        </button>
                      ) : (
                        <a
                          href={item.href}
                          onClick={item.key === 'home' ? handleHome : (event) => handleRoute(event, item.key, item.href)}
                          className={cls}
                        >
                          {content}
                        </a>
                      )}
                    </li>
                  )
                })}
              </ul>
            </nav>

            <div className="hidden lg:block">
              <MagneticButton href="#contact" onClick={() => handleNavigate('contact')}>
                Book a Consultation
              </MagneticButton>
            </div>

            <motion.button
              onClick={() => setMenuOpen(true)}
              whileTap={{ scale: 0.92 }}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#F5B82E] lg:hidden"
            >
              <span className="flex w-5 flex-col items-end gap-[5px]">
                <span className="h-[2px] w-5 rounded-full bg-white" />
                <span className="h-[2px] w-3 rounded-full bg-[#F5B82E] transition-all duration-300 group-hover:w-5" />
                <span className="h-[2px] w-4 rounded-full bg-white transition-all duration-300 group-hover:w-5" />
              </span>
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {megaOpen && <MegaMenu onNavigate={handleNavigate} onEnter={openMega} onLeave={closeMega} />}
        </AnimatePresence>

        <motion.div
          style={{ scaleX: progress }}
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-[#1473E6] via-[#F5B82E] to-[#F5B82E]"
        />
      </header>

      <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)} active={current} onNavigate={handleNavigate} />
    </MotionConfig>
  )
}

export default Navbar
