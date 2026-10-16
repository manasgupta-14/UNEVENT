import { motion } from 'framer-motion'
import { Logo } from './ui/Logo'
import { GlyphIcon } from './ui/icons'
import { services } from '../data/services'

const socials = [
  {
    name: 'LinkedIn',
    d: 'M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9.75h4V21H3zM9.75 9.75h3.83v1.54h.05c.53-1 1.84-2.07 3.79-2.07 4.05 0 4.8 2.67 4.8 6.13V21h-4v-4.9c0-1.17-.02-2.67-1.63-2.67-1.63 0-1.88 1.27-1.88 2.59V21h-4z',
  },
  {
    name: 'X',
    d: 'M18.244 2H21.5l-7.12 8.14L22.75 22h-6.55l-5.13-6.7L5.2 22H1.94l7.62-8.71L1.5 2h6.7l4.64 6.13L18.244 2zm-1.15 18h1.8L7.02 3.9H5.1L17.094 20z',
  },
  {
    name: 'GitHub',
    d: 'M12 .5a11.5 11.5 0 00-3.64 22.41c.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a10.9 10.9 0 015.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56A11.5 11.5 0 0012 .5z',
  },
]

const company = [
  { label: 'About Us', href: '#about' },
  { label: 'Industries', href: '/industries' },
  { label: 'Insights', href: '/insights' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Careers', href: '#' },
  { label: 'Contact Us', href: '#contact' },
]

const contact = [
  {
    d: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
    node: (
      <span>
        123 Security Blvd, Suite 400
        <br />
        Tech District, NY 10001
      </span>
    ),
  },
  {
    d: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    node: (
      <a href="mailto:hello@unevent.com" className="transition-colors hover:text-white">
        hello@unevent.com
      </a>
    ),
  },
  {
    d: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
    node: (
      <a href="tel:+18005550199" className="transition-colors hover:text-white">
        +1 (800) 555-0199
      </a>
    ),
  },
]

const FooterLink = ({ href, children }) => (
  <a
    href={href}
    className="relative w-fit text-sm text-slate-400 outline-none transition-colors duration-300 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#F5B82E] after:transition-transform after:duration-300 hover:text-white hover:after:scale-x-100 focus-visible:text-white"
  >
    {children}
  </a>
)

const Footer = () => {
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative isolate overflow-hidden bg-[#050B18] pt-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F5B82E]/60 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-[760px] -translate-x-1/2 rounded-full bg-[#1473E6]/15 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
          <div>
            <Logo onClick={(event) => { event.preventDefault(); toTop() }} />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-slate-400">
              Make risk a non-event. Cybersecurity, legal risk, compliance and custom software, from one team.
            </p>
            <div className="mt-7 flex gap-3">
              {socials.map((social) => (
                <motion.a
                  key={social.name}
                  href="#"
                  aria-label={social.name}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.92 }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 outline-none transition-colors hover:border-[#F5B82E]/60 hover:bg-[#F5B82E]/10 hover:text-[#F5B82E] focus-visible:ring-2 focus-visible:ring-[#F5B82E]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                    <path d={social.d} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-base font-bold text-white">Services</h4>
            <div className="mt-6 flex flex-col gap-3.5">
              {services.map((service) => (
                <FooterLink key={service.id} href={service.href}>
                  {service.name} ({service.field})
                </FooterLink>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-base font-bold text-white">Company</h4>
            <div className="mt-6 flex flex-col gap-3.5">
              {company.map((item) => (
                <FooterLink key={item.label} href={item.href}>
                  {item.label}
                </FooterLink>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-base font-bold text-white">Contact</h4>
            <ul className="mt-6 space-y-4 text-sm text-slate-400">
              {contact.map((row) => (
                <li key={row.d} className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                    <GlyphIcon d={row.d} color="#F5B82E" className="h-[18px] w-[18px]" strokeWidth={1.8} />
                  </span>
                  <span className="pt-1.5 leading-relaxed">{row.node}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-white/10 py-8 md:flex-row">
          <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} UNEVENT. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Terms of Service</FooterLink>
            <FooterLink href="#">Cookie Settings</FooterLink>
            <motion.button
              onClick={toTop}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Back to top"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5B82E] text-[#0B1730] outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none -mb-[0.18em] select-none bg-gradient-to-b from-white/[0.14] to-transparent bg-clip-text text-center font-display text-[clamp(3.4rem,17vw,14rem)] font-extrabold leading-none tracking-[0.1em] text-transparent"
      >
        UNEVENT
      </div>
    </footer>
  )
}

export default Footer
