import { m } from 'framer-motion'
import { Logo, LogoMark } from './ui/Logo'
import { GlyphIcon } from './ui/icons'
import { services } from '../data/services'
import { company, legalNotice } from '../data/company'
import { socials as profiles } from '../data/contact'

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Industries', href: '/industries' },
  { label: 'Insights', href: '/insights' },
  { label: 'Illustrative Scenarios', href: '/scenarios' },
  { label: 'Sample Deliverables', href: '/samples' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact Us', href: '/contact' },
]

const phoneIcon = 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
const mailIcon = 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
const pinIcon = 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z'

const contact = [
  company.address && { d: pinIcon, node: <span>{company.address}</span> },
  { d: mailIcon, node: <a href={`mailto:${company.email}`} className="transition-colors hover:text-white">{company.email}</a> },
  company.phone && { d: phoneIcon, node: <a href={`tel:${company.phone.replace(/[^+\d]/g, '')}`} className="transition-colors hover:text-white">{company.phone}</a> },
].filter(Boolean)

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
              Make risk a non-event. A risk advisory firm connecting cyber, legal and compliance insight with curated and in-house technology.
            </p>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-slate-500">{legalNotice}</p>
            {profiles.length > 0 && <div className="mt-7 flex gap-3">
              {profiles.map((social) => (
                <m.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.92 }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 outline-none transition-colors hover:border-[#F5B82E]/60 hover:bg-[#F5B82E]/10 hover:text-[#F5B82E] focus-visible:ring-2 focus-visible:ring-[#F5B82E]"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                    <path d={social.d} />
                  </svg>
                </m.a>
              ))}
            </div>}
          </div>

          <div>
            <h4 className="font-display text-base font-bold text-white">Practice</h4>
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
              {companyLinks.map((item) => (
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
          <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} {company.legalName || 'UNEVENT'}. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms of Service</FooterLink>
            <FooterLink href="/cookies">Cookie Settings</FooterLink>
            <m.button
              onClick={toTop}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Back to top"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5B82E] text-[#0B1730] outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </m.button>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none -mb-[0.12em] flex select-none items-end justify-center gap-[0.18rem] font-display text-[clamp(3.4rem,17vw,14rem)] font-extrabold leading-none"
      >
        <LogoMark glow={false} className="h-[0.86em] w-auto opacity-25" />
        <span className="flex items-center bg-gradient-to-b from-white/[0.14] to-transparent bg-clip-text tracking-[0.08em] text-transparent">
          NEVEN
          <span className="mx-[0.2em] inline-block h-[0.2em] w-[0.2em] translate-y-[0.1em] rounded-full bg-[#F5B82E]/50" />
          T
        </span>
      </div>
    </footer>
  )
}

export default Footer