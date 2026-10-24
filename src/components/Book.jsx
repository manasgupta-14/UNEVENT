import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useSearchParams } from 'react-router'
import { AnimatePresence, m } from 'framer-motion'
import usePageMeta from '../hooks/usePageMeta'
import NetworkCanvas from './ui/NetworkCanvas'
import SpotlightCard from './ui/SpotlightCard'
import { Field } from './ui/FormField'
import { inputClass } from '../lib/form'
import { Arrow, Check, GlyphIcon } from './ui/icons'
import { icons, services } from '../data/services'
import { email } from '../data/contact'
import { offers } from '../data/offers'
import { hero, meetings, meta, popup, steps, summary, timeNote, times } from '../data/book'
import { rgba, tint } from '../lib/color'
import { ease, rise, stagger } from '../lib/motion'

const pad = (n) => String(n).padStart(2, '0')

const nextDays = (count) => {
  const out = []
  const day = new Date()
  while (out.length < count) {
    day.setDate(day.getDate() + 1)
    if (day.getDay() !== 0 && day.getDay() !== 6) {
      out.push({
        key: `${day.getFullYear()}-${pad(day.getMonth() + 1)}-${pad(day.getDate())}`,
        short: day.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }),
        long: day.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
      })
    }
  }
  return out
}

const emptyBooking = { service: '', meeting: '', date: '', time: '', name: '', email: '', company: '' }

const detailValidators = {
  name: (v) => (v.trim().length < 2 ? 'Please enter your full name.' : ''),
  email: (v) => (/^\S+@\S+\.\S+$/.test(v.trim()) ? '' : 'Please enter a valid work email.'),
  company: (v) => (v.trim() ? '' : 'Please enter your company name.'),
}

const Eyebrow = ({ children }) => (
  <span className="inline-flex items-center gap-2.5 rounded-full border border-[#1473E6]/30 bg-[#1473E6]/10 px-4 py-1.5 text-sm font-semibold text-blue-200 backdrop-blur">
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-[#F5B82E]" />
      <span className="relative h-2 w-2 rounded-full bg-[#F5B82E]" />
    </span>
    {children}
  </span>
)

const Hero = ({ startingPoint }) => (
  <section className="relative isolate overflow-hidden bg-[#0B1730]">
    <NetworkCanvas className="opacity-60" />
    <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
    <div className="pointer-events-none absolute -left-32 top-0 -z-10 h-[340px] w-[340px] animate-float rounded-full bg-[#1473E6]/20 blur-[110px]" />
    <div className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-[280px] w-[280px] animate-float rounded-full bg-[#F5B82E]/10 blur-[110px]" style={{ animationDelay: '2s' }} />
    <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-10 sm:px-6 sm:pt-12 lg:px-8 lg:pb-16 lg:pt-14">
      <m.div variants={stagger(0.1, 0.1)} initial="hidden" animate="show" className="max-w-3xl">
        <m.div variants={rise}>
          <Eyebrow>{hero.badge}</Eyebrow>
        </m.div>
        <m.h1 variants={rise} className="mt-7 font-display text-[2.3rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
          {hero.lead}
          <span className="block animate-gradient bg-gradient-to-r from-[#F5B82E] via-[#FFE29A] to-[#F5B82E] bg-[length:220%_auto] bg-clip-text text-transparent">
            {hero.accent}
          </span>
        </m.h1>
        <m.p variants={rise} className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300 sm:text-xl">
          {hero.text}
        </m.p>
        {startingPoint && (
          <m.p variants={rise} className="mt-5 inline-flex max-w-xl rounded-xl border border-[#F5B82E]/40 bg-[#F5B82E]/10 px-4 py-3 text-sm font-semibold text-[#FFE29A]">
            Starting point: {startingPoint.name}. {startingPoint.output}
          </m.p>
        )}
      </m.div>
    </div>
  </section>
)

const Stepper = ({ step }) => (
  <ol className="flex items-center" aria-label="Progress">
    {steps.map((item, index) => {
      const done = step > index
      const now = step === index
      return (
        <li key={item.key} className="flex flex-1 items-center last:flex-none" aria-current={now ? 'step' : undefined}>
          <span className="flex items-center gap-2.5">
            <m.span
              animate={{ scale: now ? 1.12 : 1 }}
              className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-extrabold transition-colors duration-500 ${
                done
                  ? 'border-[#F5B82E] bg-[#F5B82E] text-[#0B1730]'
                  : now
                    ? 'border-[#F5B82E] bg-[#F5B82E]/15 text-[#F5B82E] shadow-[0_0_20px_rgba(245,184,46,0.45)]'
                    : 'border-white/15 bg-white/5 text-slate-500'
              }`}
            >
              {done ? <Check className="h-4 w-4" /> : index + 1}
            </m.span>
            <span className={`hidden text-sm font-bold transition-colors duration-300 sm:block ${now ? 'text-white' : done ? 'text-slate-300' : 'text-slate-500'}`}>
              {item.label}
            </span>
          </span>
          {index < steps.length - 1 && (
            <span className="relative mx-3 h-px flex-1 bg-white/10">
              <m.span
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#F5B82E] to-[#1473E6]"
                initial={false}
                animate={{ width: done ? '100%' : '0%' }}
                transition={{ duration: 0.6, ease }}
              />
            </span>
          )}
        </li>
      )
    })}
  </ol>
)

const Choice = ({ selected, onClick, color = '#1473E6', children }) => (
  <m.button
    type="button"
    onClick={onClick}
    aria-pressed={selected}
    whileHover={{ y: -3 }}
    whileTap={{ scale: 0.98 }}
    className={`group relative flex w-full items-start gap-4 rounded-2xl border p-5 text-left outline-none transition-[border-color,background-color,box-shadow] duration-300 focus-visible:ring-2 focus-visible:ring-[#F5B82E] ${
      selected ? 'bg-white/[0.09]' : 'border-white/10 bg-white/[0.04] hover:bg-white/[0.07]'
    }`}
    style={{
      borderColor: selected ? color : undefined,
      boxShadow: selected ? `0 18px 44px -22px ${color}` : undefined,
    }}
  >
    <span
      className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{ boxShadow: `inset 0 0 0 1px ${rgba(color, 0.55)}` }}
    />
    {children}
    <span
      className={`relative ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${selected ? 'scale-100 border-[#F5B82E] bg-[#F5B82E]' : 'scale-90 border-white/20'}`}
    >
      {selected && <Check className="h-3.5 w-3.5" color="#0B1730" />}
    </span>
  </m.button>
)

const Pill = ({ selected, onClick, children }) => (
  <m.button
    type="button"
    onClick={onClick}
    aria-pressed={selected}
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.95 }}
    className={`rounded-xl border px-4 py-2.5 text-sm font-bold outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#F5B82E] ${
      selected
        ? 'border-[#F5B82E] bg-[#F5B82E] text-[#0B1730] shadow-[0_10px_26px_-10px_rgba(245,184,46,0.8)]'
        : 'border-white/10 bg-white/[0.04] text-slate-200 hover:border-[#1473E6]/70 hover:bg-white/[0.08] hover:text-white'
    }`}
  >
    {children}
  </m.button>
)

const SummaryCard = ({ booking, days }) => {
  const service = services.find((item) => item.slug === booking.service)
  const meeting = meetings.find((item) => item.key === booking.meeting)
  const date = days.find((item) => item.key === booking.date)
  const time = times.find((item) => item.value === booking.time)
  const values = {
    service: service && `UNEVENT ${service.name}`,
    meeting: meeting && `${meeting.label} (${meeting.length})`,
    date: date?.long,
    time: time?.label,
  }

  return (
    <SpotlightCard color="#1473E6" tilt={0} className="h-full">
      <div className="p-6 sm:p-8">
        <h2 className="font-display text-xl font-bold text-white sm:text-2xl">{summary.title}</h2>
        <dl className="mt-6 space-y-5">
          {summary.rows.map((row) => (
            <div key={row.key} className="flex items-start gap-3">
              <span
                className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${values[row.key] ? 'border-[#F5B82E] bg-[#F5B82E]' : 'border-white/20'}`}
              >
                {values[row.key] && <Check className="h-3 w-3" color="#0B1730" />}
              </span>
              <div>
                <dt className="text-xs font-bold uppercase tracking-widest text-slate-500">{row.label}</dt>
                <dd className={`mt-0.5 leading-relaxed ${values[row.key] ? 'font-semibold text-white' : 'text-slate-500'}`}>
                  {values[row.key] || summary.empty}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </SpotlightCard>
  )
}

const ConfirmPopup = ({ booking, reference, days, onClose, startingPoint }) => {
  const closeRef = useRef(null)
  const service = services.find((item) => item.slug === booking.service)
  const meeting = meetings.find((item) => item.key === booking.meeting)
  const date = days.find((item) => item.key === booking.date)
  const time = times.find((item) => item.value === booking.time)

  const rows = [
    ['Practice', `UNEVENT ${service.name} (${service.area})`],
    ['Meeting', `${meeting.label} (${meeting.length})`],
    ['Date', date.long],
    ['Time', time.label],
    ['Name', booking.name.trim()],
    ['Email', booking.email.trim()],
    ['Company', booking.company.trim()],
    ...(startingPoint ? [['Starting point', startingPoint.name]] : []),
  ]

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const mailBody = [`Booking reference: ${reference}`, '', ...rows.map(([label, value]) => `${label}: ${value}`)].join('\n')
  const mailHref = `mailto:${email}?subject=${encodeURIComponent(`Consultation booking ${reference}`)}&body=${encodeURIComponent(mailBody)}`

  return createPortal(
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#050B18]/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <m.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        initial={{ opacity: 0, y: 40, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.96 }}
        transition={{ duration: 0.5, ease }}
        onClick={(event) => event.stopPropagation()}
        className="relative my-auto w-full max-w-lg overflow-hidden rounded-3xl border border-white/15 bg-[#0B1730] shadow-[0_40px_120px_-30px_rgba(20,115,230,0.7)]"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F5B82E] to-transparent" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#F5B82E]/20 blur-[80px]" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-[#1473E6]/20 blur-[80px]" />

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 outline-none transition-all duration-300 hover:rotate-90 hover:border-white/30 hover:text-white focus-visible:ring-2 focus-visible:ring-[#F5B82E]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="h-4 w-4" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="relative p-7 sm:p-9">
          <m.span
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
            className="flex h-16 w-16 items-center justify-center rounded-full border border-[#F5B82E]/60 bg-[#F5B82E]/15 shadow-[0_0_34px_rgba(245,184,46,0.45)]"
          >
            <Check className="h-8 w-8" color="#F5B82E" />
          </m.span>
          <h2 id="booking-title" className="mt-5 font-display text-2xl font-extrabold text-white sm:text-3xl">{popup.title}</h2>
          <p className="mt-2 text-slate-300">{popup.text}</p>

          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#F5B82E]/40 bg-[#F5B82E]/10 px-4 py-1.5 text-sm font-bold text-[#F5B82E]">
            {popup.reference}: <span className="tracking-wider">{reference}</span>
          </p>

          <dl className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.04]">
            {rows.map(([label, value], index) => (
              <m.div
                key={label}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.25 + index * 0.05, ease }}
                className="flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:items-baseline sm:gap-4"
              >
                <dt className="w-24 shrink-0 text-xs font-bold uppercase tracking-widest text-slate-500">{label}</dt>
                <dd className="break-words font-semibold text-white">{value}</dd>
              </m.div>
            ))}
          </dl>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <m.button
              type="button"
              onClick={onClose}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex flex-1 items-center justify-center rounded-xl bg-[#F5B82E] px-6 py-3.5 font-bold text-[#0B1730] shadow-[0_10px_30px_-10px_rgba(245,184,46,0.6)] outline-none transition-shadow duration-300 hover:shadow-[0_16px_40px_-10px_rgba(245,184,46,0.85)] focus-visible:ring-2 focus-visible:ring-white"
            >
              {popup.done}
            </m.button>
            <a
              href={mailHref}
              className="inline-flex flex-1 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-center text-sm font-bold text-white outline-none transition-all duration-300 hover:border-white/45 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#F5B82E]"
            >
              {popup.email}
            </a>
          </div>
        </div>
      </m.div>
    </m.div>,
    document.body,
  )
}

const Book = () => {
  usePageMeta(meta)
  const [searchParams] = useSearchParams()
  const startingPoint = offers.find((item) => item.slug === searchParams.get('offer')) ?? null
  const [days] = useState(() => nextDays(10))
  const [step, setStep] = useState(0)
  const [booking, setBooking] = useState(emptyBooking)
  const [errors, setErrors] = useState({})
  const [confirmed, setConfirmed] = useState(null)

  const set = (key, value) => setBooking((current) => ({ ...current, [key]: value }))

  const setDetail = (key) => (event) => {
    set(key, event.target.value)
    if (errors[key]) setErrors((current) => ({ ...current, [key]: detailValidators[key](event.target.value) }))
  }

  const blurDetail = (key) => () => setErrors((current) => ({ ...current, [key]: detailValidators[key](booking[key]) }))

  const detailProps = (key) => ({
    id: key,
    value: booking[key],
    onChange: setDetail(key),
    onBlur: blurDetail(key),
    'aria-required': 'true',
    'aria-invalid': Boolean(errors[key]),
    'aria-describedby': errors[key] ? `${key}-error` : undefined,
    className: inputClass(errors[key]),
  })

  const canContinue = [
    Boolean(booking.service),
    Boolean(booking.meeting),
    Boolean(booking.date && booking.time),
  ][step]

  const confirm = () => {
    const next = Object.fromEntries(Object.keys(detailValidators).map((key) => [key, detailValidators[key](booking[key])]))
    setErrors(next)
    const firstError = Object.keys(next).find((key) => next[key])
    if (firstError) {
      document.getElementById(firstError)?.focus()
      return
    }
    const reference = `UNE-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
    setConfirmed({ booking, reference })
  }

  const closePopup = () => {
    setConfirmed(null)
    setBooking(emptyBooking)
    setErrors({})
    setStep(0)
  }

  const current = steps[step]
  const isLast = step === steps.length - 1

  return (
    <>
      <Hero startingPoint={startingPoint} />
      <section className="relative bg-[#0E1D3B] py-16 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="relative mx-auto grid max-w-7xl items-stretch gap-6 px-4 sm:px-6 lg:grid-cols-[1.4fr_0.6fr] lg:gap-8 lg:px-8">
          <SpotlightCard color="#F5B82E" tilt={0} className="h-full">
            <div className="flex h-full flex-col p-6 sm:p-9">
              <Stepper step={step} />

              <div className="mt-10 flex-1">
                <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">{current.title}</h2>
                <p className="mt-2 text-sm text-slate-400">
                  {current.hint}
                  {isLast && <> <span className="font-bold text-[#F5B82E]">*</span> {summary.note}</>}
                </p>

                <AnimatePresence mode="wait" initial={false}>
                  <m.div
                    key={step}
                    initial={{ opacity: 0, x: 28 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -28 }}
                    transition={{ duration: 0.35, ease }}
                    className="mt-8"
                  >
                    {step === 0 && (
                      <div className="grid gap-4 sm:grid-cols-2">
                        {services.map((service) => (
                          <Choice key={service.slug} selected={booking.service === service.slug} onClick={() => set('service', service.slug)} color={service.accent}>
                            <span
                              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border"
                              style={{ borderColor: rgba(service.accent, 0.45), backgroundColor: rgba(service.accent, 0.14) }}
                            >
                              <GlyphIcon d={icons[service.slug]} color={tint(service.accent, 0.25)} className="h-6 w-6" />
                            </span>
                            <span>
                              <span className="block font-display text-lg font-bold text-white">UNEVENT {service.name}</span>
                              <span className="mt-0.5 block text-sm text-slate-400">{service.area}</span>
                            </span>
                          </Choice>
                        ))}
                      </div>
                    )}

                    {step === 1 && (
                      <div className="grid gap-4">
                        {meetings.map((meeting) => (
                          <Choice key={meeting.key} selected={booking.meeting === meeting.key} onClick={() => set('meeting', meeting.key)}>
                            <span>
                              <span className="flex flex-wrap items-center gap-3">
                                <span className="font-display text-lg font-bold text-white">{meeting.label}</span>
                                <span className="rounded-full border border-[#F5B82E]/40 bg-[#F5B82E]/10 px-2.5 py-0.5 text-xs font-bold text-[#F5B82E]">{meeting.length}</span>
                              </span>
                              <span className="mt-1 block text-sm leading-relaxed text-slate-400">{meeting.text}</span>
                            </span>
                          </Choice>
                        ))}
                      </div>
                    )}

                    {step === 2 && (
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Day</p>
                        <div className="mt-3 flex flex-wrap gap-2.5">
                          {days.map((day) => (
                            <Pill key={day.key} selected={booking.date === day.key} onClick={() => set('date', day.key)}>
                              {day.short}
                            </Pill>
                          ))}
                        </div>
                        <p className="mt-7 text-xs font-bold uppercase tracking-widest text-slate-500">Time</p>
                        <div className="mt-3 flex flex-wrap gap-2.5">
                          {times.map((time) => (
                            <Pill key={time.value} selected={booking.time === time.value} onClick={() => set('time', time.value)}>
                              {time.label}
                            </Pill>
                          ))}
                        </div>
                        <p className="mt-5 text-sm text-slate-500">{timeNote}</p>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="grid gap-5">
                        <Field id="name" label="Full name" required error={errors.name}>
                          <input {...detailProps('name')} type="text" autoComplete="name" placeholder="Jane Doe" />
                        </Field>
                        <Field id="email" label="Work email" required error={errors.email}>
                          <input {...detailProps('email')} type="email" autoComplete="email" placeholder="jane@company.com" />
                        </Field>
                        <Field id="company" label="Company" required error={errors.company}>
                          <input {...detailProps('company')} type="text" autoComplete="organization" placeholder="Your company" />
                        </Field>
                      </div>
                    )}
                  </m.div>
                </AnimatePresence>
              </div>

              <div className="mt-10 flex items-center justify-between gap-3 border-t border-white/10 pt-6">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white outline-none transition-all duration-300 hover:border-white/45 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#F5B82E]"
                  >
                    Back
                  </button>
                ) : (
                  <span />
                )}
                <m.button
                  type="button"
                  disabled={!isLast && !canContinue}
                  onClick={isLast ? confirm : () => setStep(step + 1)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#F5B82E] px-7 py-3.5 font-bold text-[#0B1730] shadow-[0_0_0_1px_rgba(245,184,46,0.6),0_10px_30px_-10px_rgba(245,184,46,0.6)] outline-none transition-all duration-300 hover:shadow-[0_0_0_1px_rgba(245,184,46,0.9),0_16px_40px_-10px_rgba(245,184,46,0.85)] focus-visible:ring-2 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:hover:translate-y-0"
                >
                  <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                  <span className="relative">{isLast ? 'Confirm booking' : 'Continue'}</span>
                  <Arrow className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </m.button>
              </div>
            </div>
          </SpotlightCard>

          <SummaryCard booking={booking} days={days} />
        </div>
      </section>

      <AnimatePresence>
        {confirmed && <ConfirmPopup key="popup" startingPoint={startingPoint} booking={confirmed.booking} reference={confirmed.reference} days={days} onClose={closePopup} />}
      </AnimatePresence>
    </>
  )
}

export default Book
