import { useState } from 'react'
import { useSearchParams } from 'react-router'
import { m } from 'framer-motion'
import usePageMeta from '../hooks/usePageMeta'
import NetworkCanvas from './ui/NetworkCanvas'
import SpotlightCard from './ui/SpotlightCard'
import { Field } from './ui/FormField'
import { inputClass } from '../lib/form'
import CtaSection from './CtaSection'
import ContactChart from './ui/ContactChart'
import { Arrow, Check, GlyphIcon } from './ui/icons'
import { icons, services } from '../data/services'
import { details, email, formCopy, hero, map, meta, socials } from '../data/contact'
import { rgba, tint } from '../lib/color'
import { ease, rise, stagger } from '../lib/motion'

const initialForm = { name: '', email: '', company: '', phone: '', service: '', message: '', consent: false }

const validators = {
  name: (v) => (v.trim().length < 2 ? 'Please enter your full name.' : ''),
  email: (v) => (/^\S+@\S+\.\S+$/.test(v.trim()) ? '' : 'Please enter a valid work email.'),
  company: (v) => (v.trim() ? '' : 'Please enter your company name.'),
  phone: (v) => (!v.trim() || /^[+\d][\d\s()-]{6,}$/.test(v.trim()) ? '' : 'Please enter a valid phone number.'),
  service: (v) => (v ? '' : 'Please choose a service.'),
  message: (v) => (v.trim().length < 20 ? 'Tell us a little more (at least 20 characters).' : ''),
  consent: (v) => (v ? '' : 'Please agree so we can contact you.'),
}

const Reveal = ({ children, className = '', delay = 0 }) => (
  <m.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.7, delay, ease }}
    className={className}
  >
    {children}
  </m.div>
)

const Eyebrow = ({ children }) => (
  <span className="inline-flex items-center gap-2.5 rounded-full border border-[#1473E6]/30 bg-[#1473E6]/10 px-4 py-1.5 text-sm font-semibold text-blue-200 backdrop-blur">
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-[#F5B82E]" />
      <span className="relative h-2 w-2 rounded-full bg-[#F5B82E]" />
    </span>
    {children}
  </span>
)

const Word = ({ children, delay, className = '' }) => (
  <span className="inline-block overflow-hidden pb-[0.14em] align-bottom">
    <m.span
      className={`inline-block ${className}`}
      initial={{ y: '115%' }}
      animate={{ y: 0 }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </m.span>
  </span>
)

const Hero = () => (
  <section className="relative isolate overflow-hidden bg-[#0B1730]">
    <NetworkCanvas className="opacity-60" />
    <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
    <div className="pointer-events-none absolute -left-32 top-0 -z-10 h-[360px] w-[360px] animate-float rounded-full bg-[#1473E6]/20 blur-[110px]" />
    <div className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-[300px] w-[300px] animate-float rounded-full bg-[#F5B82E]/10 blur-[110px]" style={{ animationDelay: '2s' }} />

    <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pb-20 lg:pt-36">
      <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
      <m.div variants={stagger(0.1, 0.1)} initial="hidden" animate="show" className="max-w-3xl">
        <m.div variants={rise}>
          <Eyebrow>{hero.badge}</Eyebrow>
        </m.div>
        <h1 className="mt-7 font-display text-[2.3rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
          {hero.lead.map((line, index) => (
            <span key={line} className="block">
              <Word delay={0.25 + index * 0.1}>{line}</Word>
            </span>
          ))}
          <span className="block">
            <Word
              delay={0.5}
              className="animate-gradient bg-gradient-to-r from-[#F5B82E] via-[#FFE29A] to-[#F5B82E] bg-[length:220%_auto] bg-clip-text text-transparent"
            >
              {hero.accent}
            </Word>
          </span>
        </h1>
        <m.p variants={rise} className="mt-7 max-w-xl text-lg leading-relaxed text-slate-300 sm:text-xl">
          {hero.text}
        </m.p>
      </m.div>
      <ContactChart />
      </div>
    </div>
  </section>
)

const ContactForm = () => {
  const [params] = useSearchParams()
  const [form, setForm] = useState(() => ({
    ...initialForm,
    service: services.some((service) => service.slug === params.get('service')) ? params.get('service') : '',
  }))
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const update = (key) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    setForm((current) => ({ ...current, [key]: value }))
    if (errors[key]) setErrors((current) => ({ ...current, [key]: validators[key](value) }))
  }

  const blur = (key) => () => setErrors((current) => ({ ...current, [key]: validators[key](form[key]) }))

  const fieldProps = (key) => ({
    id: key,
    value: form[key],
    onChange: update(key),
    onBlur: blur(key),
    'aria-invalid': Boolean(errors[key]),
    'aria-describedby': errors[key] ? `${key}-error` : undefined,
    className: inputClass(errors[key]),
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    const next = Object.fromEntries(Object.keys(validators).map((key) => [key, validators[key](form[key])]))
    setErrors(next)
    const firstError = Object.keys(next).find((key) => next[key])
    if (firstError) {
      document.getElementById(firstError)?.focus()
      return
    }

    const service = services.find((item) => item.slug === form.service)
    const subject = `Inquiry: ${service ? `UNEVENT ${service.name}` : 'UNEVENT'} - ${form.company.trim()}`
    const body = [
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      `Company: ${form.company.trim()}`,
      form.phone.trim() && `Phone: ${form.phone.trim()}`,
      `Service: ${service ? `${service.name} (${service.field})` : form.service}`,
      '',
      form.message.trim(),
    ]
      .filter((line) => line !== false && line !== '')
      .join('\n')

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  if (sent) {
    return (
      <div className="flex h-full min-h-[420px] flex-col items-center justify-center p-8 text-center sm:p-12">
        <m.span
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease }}
          className="flex h-16 w-16 items-center justify-center rounded-full border border-[#F5B82E]/60 bg-[#F5B82E]/15 shadow-[0_0_30px_rgba(245,184,46,0.4)]"
        >
          <Check className="h-8 w-8" color="#F5B82E" />
        </m.span>
        <h3 className="mt-6 font-display text-2xl font-bold text-white">{formCopy.successTitle}</h3>
        <p className="mt-3 max-w-sm text-base leading-relaxed text-slate-300">
          {formCopy.successText}{' '}
          <a href={`mailto:${email}`} className="font-semibold text-[#F5B82E] underline-offset-4 hover:underline">{email}</a>.
        </p>
        <button
          type="button"
          onClick={() => { setForm(initialForm); setErrors({}); setSent(false) }}
          className="mt-8 rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-bold text-white outline-none transition-all duration-300 hover:border-white/45 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#F5B82E]"
        >
          {formCopy.again}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex h-full flex-col p-6 sm:p-9">
      <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">{formCopy.title}</h2>
      <p className="mt-2 text-sm text-slate-400">
        {formCopy.note} {formCopy.privacy}
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Full name" required error={errors.name}>
          <input {...fieldProps('name')} type="text" autoComplete="name" placeholder="Jane Doe" aria-required="true" />
        </Field>
        <Field id="email" label="Work email" required error={errors.email}>
          <input {...fieldProps('email')} type="email" autoComplete="email" placeholder="jane@company.com" aria-required="true" />
        </Field>
        <Field id="company" label="Company name" required error={errors.company}>
          <input {...fieldProps('company')} type="text" autoComplete="organization" placeholder="Your company" aria-required="true" />
        </Field>
        <Field id="phone" label="Phone" error={errors.phone}>
          <input {...fieldProps('phone')} type="tel" autoComplete="tel" placeholder="+1 555 000 0000" />
        </Field>
        <Field id="service" label="Service of interest" required error={errors.service} className="sm:col-span-2">
          <select {...fieldProps('service')} aria-required="true" className={`${inputClass(errors.service)} [&>option]:bg-[#0B1730] [&>option]:text-white`}>
            <option value="">Choose a service</option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                UNEVENT {service.name} ({service.field})
              </option>
            ))}
            <option value="general">Not sure yet</option>
          </select>
        </Field>
        <Field id="message" label="Business requirements" required error={errors.message} className="sm:col-span-2">
          <textarea {...fieldProps('message')} rows={5} placeholder="Tell us what you are dealing with..." aria-required="true" className={`${inputClass(errors.message)} resize-none`} />
        </Field>
      </div>

      <div className="mt-6">
        <label className="group flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-slate-300 transition-colors duration-300 hover:text-white">
          <input
            id="consent"
            type="checkbox"
            checked={form.consent}
            onChange={update('consent')}
            aria-required="true"
            aria-invalid={Boolean(errors.consent)}
            className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-md border border-white/25 bg-white/5 outline-none transition-all duration-300 hover:border-[#1473E6] focus-visible:ring-2 focus-visible:ring-[#F5B82E] checked:border-[#F5B82E] checked:bg-[#F5B82E] checked:bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2024%2024%22%20fill=%22none%22%20stroke=%22%230B1730%22%20stroke-width=%223%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22><path%20d=%22M5%2012.5l4.5%204.5L19%207.5%22/></svg>')]"
          />
          <span>
            {formCopy.consent} <span className="font-bold text-[#F5B82E]" aria-hidden="true">*</span>
          </span>
        </label>
        {errors.consent && <p role="alert" className="mt-1.5 text-sm font-medium text-red-300">{errors.consent}</p>}
      </div>

      <div className="mt-auto pt-8">
      <m.button
        type="submit"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#F5B82E] px-7 py-4 text-base font-bold text-[#0B1730] shadow-[0_0_0_1px_rgba(245,184,46,0.6),0_10px_30px_-10px_rgba(245,184,46,0.6)] outline-none transition-shadow duration-300 hover:shadow-[0_0_0_1px_rgba(245,184,46,0.9),0_16px_40px_-10px_rgba(245,184,46,0.85)] focus-visible:ring-2 focus-visible:ring-white sm:w-auto"
      >
        <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        <span className="relative">{formCopy.submit}</span>
        <Arrow className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </m.button>
      </div>
    </form>
  )
}

const DetailRow = ({ row }) => {
  const content = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 group-hover/row:scale-110 group-hover/row:border-[#F5B82E]/60 group-hover/row:bg-[#F5B82E]/15">
        <GlyphIcon d={row.icon} color="#F5B82E" className="h-5 w-5" strokeWidth={1.7} />
      </span>
      <span>
        <span className="block text-xs font-bold uppercase tracking-widest text-slate-500">{row.label}</span>
        <span className="mt-0.5 block leading-relaxed text-slate-200 transition-colors duration-300 group-hover/row:text-white">{row.value}</span>
      </span>
    </>
  )
  const base = 'group/row flex items-start gap-4 rounded-2xl p-2 -m-2 outline-none'
  return row.href ? (
    <a
      href={row.href}
      target={row.href.startsWith('http') ? '_blank' : undefined}
      rel={row.href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className={`${base} focus-visible:ring-2 focus-visible:ring-[#F5B82E]`}
    >
      {content}
    </a>
  ) : (
    <div className={base}>{content}</div>
  )
}

const SocialLink = ({ social }) => {
  const [hovered, setHovered] = useState(false)
  return (
    <m.a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.name}
      title={social.name}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      whileHover={{ y: -5, scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className="flex h-12 w-12 items-center justify-center rounded-xl border outline-none transition-[border-color,background-color,color,box-shadow] duration-300 focus-visible:ring-2 focus-visible:ring-[#F5B82E]"
      style={{
        color: hovered ? social.color : '#94a3b8',
        borderColor: hovered ? rgba(social.color === '#FFFFFF' ? '#FFFFFF' : social.color, 0.6) : 'rgba(255,255,255,0.1)',
        backgroundColor: hovered ? rgba(social.color, 0.14) : 'rgba(255,255,255,0.05)',
        boxShadow: hovered ? `0 12px 28px -12px ${rgba(social.color, 0.8)}` : 'none',
      }}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path d={social.d} fillRule={social.evenodd ? 'evenodd' : 'nonzero'} />
      </svg>
    </m.a>
  )
}

const DetailsCard = () => (
  <SpotlightCard color="#1473E6" tilt={0} className="h-full">
    <div className="flex h-full flex-col p-6 sm:p-9">
      <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">{details.title}</h2>
      <div className="mt-8 flex flex-1 flex-col justify-between gap-6">
        {details.rows.map((row) => (
          <DetailRow key={row.key} row={row} />
        ))}
      </div>

      <div className="mt-8 border-t border-white/10 pt-6">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">{details.helpTitle}</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.id}
              className="group/tile flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--c)] hover:bg-white/[0.07]"
              style={{ '--c': rgba(service.accent, 0.6) }}
            >
              <GlyphIcon d={icons[service.slug]} color={tint(service.accent, 0.2)} className="mt-0.5 h-6 w-6 shrink-0 transition-transform duration-300 group-hover/tile:scale-110" />
              <div>
                <p className="text-sm font-bold text-white">UNEVENT {service.name}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-slate-400">{service.area}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-slate-400">{details.helpText}</p>
      </div>

      <div className="mt-6 border-t border-white/10 pt-6">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">{details.socialsTitle}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {socials.map((social) => (
            <SocialLink key={social.name} social={social} />
          ))}
        </div>
      </div>
    </div>
  </SpotlightCard>
)

const MapCard = () => {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(map.query)}&output=embed`
  const link = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(map.query)}`
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(map.query)}`

  return (
    <SpotlightCard color="#F5B82E" tilt={0}>
      <div className="p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 px-1 pb-4">
          <div>
            <h2 className="font-display text-lg font-bold text-white">{map.title}</h2>
            <p className="mt-1 text-sm text-slate-400">{map.address}</p>
          </div>
          <a
            href={directions}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-xl border border-[#F5B82E]/40 bg-[#F5B82E]/10 px-4 py-2 text-sm font-bold text-[#F5B82E] outline-none transition-all duration-300 hover:bg-[#F5B82E] hover:text-[#0B1730] focus-visible:ring-2 focus-visible:ring-[#F5B82E]"
          >
            {map.directionsLabel}
            <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-white/10">
          <iframe
            title="UNEVENT office location on Google Maps"
            src={src}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="block h-[320px] w-full border-0 sm:h-[420px] lg:h-[500px]"
          />
        </div>
        <a href={link} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block px-1 text-sm font-semibold text-slate-400 transition-colors hover:text-white">
          Open in Google Maps
        </a>
      </div>
    </SpotlightCard>
  )
}

const Contact = () => {
  usePageMeta(meta.title, meta.description)

  return (
    <>
      <Hero />

      <section className="relative bg-[#0E1D3B] py-16 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="relative mx-auto grid max-w-7xl items-stretch gap-6 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-8">
          <Reveal className="h-full">
            <SpotlightCard color="#F5B82E" tilt={0} className="h-full">
              <ContactForm />
            </SpotlightCard>
          </Reveal>
          <Reveal delay={0.1} className="h-full">
            <DetailsCard />
          </Reveal>
        </div>
      </section>

      <div className="bg-[#F8FAFC] pt-20 lg:pt-28">
        <CtaSection />
      </div>

      <section className="relative bg-[#0B1730] py-16 lg:py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <MapCard />
          </Reveal>
        </div>
      </section>
    </>
  )
}

export default Contact
