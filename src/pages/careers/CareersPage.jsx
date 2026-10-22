import { useRef, useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, MotionConfig, m } from 'framer-motion'
import usePageMeta from '../../hooks/usePageMeta'
import NetworkCanvas from '../../components/ui/NetworkCanvas'
import TiltPanel from '../../components/ui/TiltPanel'
import CountUp from '../../components/ui/CountUp'
import SectionHeading from '../../components/ui/SectionHeading'
import { Arrow, Check, GlyphIcon } from '../../components/ui/icons'
import { jobs } from '../../data/content'
import { icons, services } from '../../data/services'
import { rgba } from '../../lib/color'
import { submitApplication } from '../../lib/applications'
import { ease, rise, stagger, viewport } from '../../lib/motion'

const MAX_MB = 3
const EXTENSIONS = ['pdf', 'docx']
const EMAIL_RE = /^\S+@\S+\.\S+$/

const values = [
  { title: 'Small team, real ownership', text: 'You work on live problems from week one, with people who will actually read your work.', d: icons.protect },
  { title: 'Plain language always', text: 'Reports, contracts and code comments should make sense to the person reading them.', d: icons.counsel },
  { title: 'Four disciplines, one team', text: 'Security, legal, governance and engineering sit together, so you learn across all of them.', d: icons.govern },
  { title: 'Remote-friendly', text: 'Most roles are remote or hybrid. We care about the work you ship, not where you sit.', d: icons.labs },
]

const steps = [
  { title: 'Apply', text: 'Send your details and resume for the role you like.' },
  { title: 'We review', text: 'The team reads every application and replies if there is a match.' },
  { title: 'Conversation', text: 'A relaxed chat about your work, your questions and how we operate.' },
  { title: 'Decision', text: 'A clear answer, either way, without a long wait.' },
]

const teamOf = (job) => services.find((service) => service.name === job.team) ?? services[0]

const Word = ({ children, delay, className = '' }) => (
  <span className="inline-block overflow-hidden pb-[0.14em] align-bottom">
    <m.span className={`inline-block ${className}`} initial={{ y: '115%' }} animate={{ y: 0 }} transition={{ duration: 0.9, delay, ease }}>
      {children}
    </m.span>
  </span>
)

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

const Hero = () => {
  const words = 'Small team, serious work.'.split(' ')
  const teams = new Set(jobs.map((job) => job.team)).size
  const stats = [
    { value: jobs.length, label: 'Open roles' },
    { value: teams, label: 'Teams hiring' },
    { value: 4, label: 'Disciplines' },
  ]

  return (
    <section className="relative isolate overflow-hidden bg-[#0B1730]">
      <NetworkCanvas className="opacity-70" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
      <div className="pointer-events-none absolute -left-32 top-10 -z-10 h-[420px] w-[420px] animate-float rounded-full bg-[#1473E6]/20 blur-[110px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-[380px] w-[380px] animate-float rounded-full bg-[#F5B82E]/10 blur-[110px]" style={{ animationDelay: '2s' }} />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-8 lg:pb-28 lg:pt-10">
        <m.div variants={stagger(0.1, 0.1)} initial="hidden" animate="show" className="relative z-10">
          <m.nav variants={rise} aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-semibold text-slate-400">
            <Link to="/" className="outline-none transition-colors hover:text-white focus-visible:text-white">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white">Careers</span>
          </m.nav>

          <m.span variants={rise} className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-[#F5B82E]/40 bg-[#F5B82E]/10 px-4 py-1.5 text-sm font-semibold text-[#FFE29A] backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-[#F5B82E]" />
            We are hiring
          </m.span>

          <h1 className="mt-6 font-display text-[2.6rem] font-extrabold leading-[1.06] tracking-tight text-white sm:text-6xl lg:text-[3.8rem]">
            {words.map((word, index) => {
              const last = index === words.length - 1
              return (
                <span key={word}>
                  <Word delay={0.25 + index * 0.09} className={last ? 'animate-gradient bg-gradient-to-r from-[#F5B82E] via-[#FFE29A] to-[#F5B82E] bg-[length:220%_auto] bg-clip-text text-transparent' : ''}>
                    {word}
                  </Word>{' '}
                </span>
              )
            })}
          </h1>

          <m.p variants={rise} className="mt-7 max-w-xl text-lg leading-relaxed text-slate-300 sm:text-xl">
            We hire people who like preventing problems. Join a team that blends cybersecurity, legal risk, governance and software to make risk a non-event.
          </m.p>

          <m.div variants={rise} className="mt-9 flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => scrollTo('roles')}
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#F5B82E] px-7 py-4 text-base font-bold text-[#0B1730] shadow-[0_0_0_1px_rgba(245,184,46,0.6),0_10px_30px_-10px_rgba(245,184,46,0.6)] outline-none transition-all duration-300 hover:shadow-[0_0_0_1px_rgba(245,184,46,0.9),0_16px_40px_-10px_rgba(245,184,46,0.85)] focus-visible:ring-2 focus-visible:ring-[#F5B82E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1730]"
            >
              <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
              <span className="relative">See open roles</span>
              <Arrow className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </m.div>

          <m.div variants={rise} className="mt-12 grid max-w-md grid-cols-3 gap-3 border-t sm:gap-6 border-white/10 pt-8">
            {stats.map((stat) => (
              <div key={stat.label} className="min-w-0">
                <p className="font-display text-2xl font-extrabold text-white sm:text-3xl"><CountUp to={stat.value} /></p>
                <p className="mt-1 text-xs text-slate-400 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </m.div>
        </m.div>

        <TiltPanel className="relative mx-auto w-full max-w-[520px]">
          <div className="absolute -inset-6 rounded-full bg-[#1473E6]/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#0B1730]/75 p-6 shadow-[0_40px_90px_-30px_rgba(20,115,230,0.55)] backdrop-blur-xl sm:p-7">
            <m.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-transparent via-[#1473E6]/15 to-transparent"
              animate={{ y: ['-30%', '560%'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />
            <div className="relative flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-bold text-slate-200">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-[#F5B82E]" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F5B82E]" />
                </span>
                Open positions
              </span>
              <span className="text-xs font-semibold text-slate-400">{jobs.length} roles</span>
            </div>

            <m.ul variants={stagger(0.12, 0.5)} initial="hidden" animate="show" className="relative mt-6 space-y-3">
              {jobs.map((job) => {
                const team = teamOf(job)
                return (
                  <m.li key={job.id} variants={rise}>
                    <button
                      type="button"
                      onClick={() => scrollTo('roles')}
                      className="flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left outline-none transition-colors hover:border-white/25 hover:bg-white/[0.08] focus-visible:ring-2 focus-visible:ring-[#F5B82E]"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: rgba(team.accent, 0.18) }}>
                        <GlyphIcon d={icons[team.id]} color={team.accent} className="h-5 w-5" strokeWidth={1.8} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-bold text-white">{job.title}</span>
                        <span className="mt-0.5 block text-xs text-slate-400">{job.team} · {job.where}</span>
                      </span>
                      <Arrow className="h-4 w-4 shrink-0 text-slate-500" />
                    </button>
                  </m.li>
                )
              })}
            </m.ul>
          </div>
        </TiltPanel>
      </div>
    </section>
  )
}

const Values = () => (
  <section className="relative overflow-hidden bg-[#F8FAFC] py-20 lg:py-28">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(11,23,48,0.07)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading badge="Life at UNEVENT" title="What it is like to work here" text="No big-company layers. Just focused people doing careful work for clients who rely on it." />
      <m.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewport} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((item, index) => (
          <m.div
            key={item.title}
            variants={rise}
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_30px_70px_-50px_rgba(11,23,48,0.5)] transition-transform duration-300 hover:-translate-y-1.5"
          >
            <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#1473E6] to-[#F5B82E] transition-transform duration-500 group-hover:scale-x-100" />
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1473E6]/10">
              <GlyphIcon d={item.d} color="#1473E6" className="h-6 w-6" strokeWidth={1.7} />
            </span>
            <p className="mt-5 text-xs font-bold text-[#92600A]">0{index + 1}</p>
            <h3 className="mt-1 font-display text-lg font-bold leading-snug text-[#0B1730]">{item.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-[#334155]">{item.text}</p>
          </m.div>
        ))}
      </m.div>
    </div>
  </section>
)

const JobCard = ({ job, onApply }) => {
  const team = teamOf(job)
  return (
    <m.article
      variants={rise}
      className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_30px_70px_-50px_rgba(11,23,48,0.5)] sm:p-9"
    >
      <span className="absolute inset-y-0 left-0 w-1.5" style={{ backgroundColor: team.accent }} />
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: rgba(team.accent, 0.14), color: team.ink }}>
              <GlyphIcon d={icons[team.id]} color={team.ink} className="h-4 w-4" strokeWidth={1.8} />
              {team.name} · {team.field}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{job.where}</span>
          </div>
          <h3 className="mt-4 font-display text-2xl font-bold leading-snug text-[#0B1730]">{job.title}</h3>
          <p className="mt-3 text-base leading-relaxed text-[#334155]">{job.about}</p>
          <p className="mt-4 text-sm leading-relaxed text-[#334155]">
            <span className="font-bold text-[#0B1730]">Skills: </span>
            {job.skills}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onApply(job.id)}
          className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-xl bg-[#0B1730] px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_-12px_rgba(11,23,48,0.7)] outline-none transition-colors hover:bg-[#132854] focus-visible:ring-2 focus-visible:ring-[#1473E6] focus-visible:ring-offset-2"
        >
          Apply for this role
          <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </m.article>
  )
}

const Roles = ({ onApply }) => (
  <section id="roles" className="relative bg-white py-20 lg:py-28">
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <SectionHeading badge="Open roles" title="Find the role that fits" text="Pick a role, then send your details. We read every application." />
      <m.div variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={viewport} className="mt-12 space-y-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} onApply={onApply} />
        ))}
      </m.div>
      <p className="mt-10 text-center text-[15px] text-[#334155]">
        Do not see your role? Write to{' '}
        <a href="mailto:hello@unevent.com?subject=General%20application" className="font-bold text-[#1473E6] underline-offset-4 hover:underline">
          hello@unevent.com
        </a>{' '}
        and tell us what you do best.
      </p>
    </div>
  </section>
)

const Process = () => (
  <section className="relative overflow-hidden bg-[#F8FAFC] py-20 lg:py-28">
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading badge="Hiring process" title="Simple and respectful" text="Four steps, no trick questions." />
      <m.div variants={stagger(0.15, 0.1)} initial="hidden" whileInView="show" viewport={viewport} className="relative mt-12">
        <div aria-hidden="true" className="absolute inset-x-0 top-5 hidden h-px bg-slate-200 lg:block">
          <m.span
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.4, delay: 0.3, ease } } }}
            className="block h-full origin-left bg-gradient-to-r from-[#1473E6] to-[#F5B82E]"
          />
        </div>
        <ol className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <m.li key={step.title} variants={rise} className="flex flex-col">
              <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#1473E6] bg-white text-sm font-extrabold text-[#1473E6]">
                {index + 1}
              </span>
              <div className="mt-4 h-full rounded-2xl border border-slate-200 bg-white p-5 transition-transform duration-300 hover:-translate-y-1">
                <h3 className="text-sm font-bold text-[#0B1730]">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#334155]">{step.text}</p>
              </div>
            </m.li>
          ))}
        </ol>
      </m.div>
    </div>
  </section>
)

const inputClass =
  'mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-[15px] text-[#0B1730] outline-none transition placeholder:text-slate-400 focus:border-[#1473E6] focus:ring-2 focus:ring-[#1473E6]/25'

const Field = ({ id, label, children }) => (
  <div>
    <label htmlFor={id} className="text-sm font-bold text-[#0B1730]">{label}</label>
    {children}
  </div>
)

const ApplyForm = ({ jobId, setJobId }) => {
  const [form, setForm] = useState({ name: '', email: '', note: '' })
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [reference, setReference] = useState('')
  const fileInput = useRef(null)

  const job = jobs.find((item) => item.id === jobId)
  const update = (key) => (event) => setForm((prev) => ({ ...prev, [key]: event.target.value }))

  const pick = (event) => {
    const chosen = event.target.files[0]
    setError('')
    if (!chosen) return setFile(null)
    const ext = chosen.name.split('.').pop().toLowerCase()
    if (!EXTENSIONS.includes(ext)) {
      setFile(null)
      return setError('Upload a PDF or DOCX file.')
    }
    if (chosen.size > MAX_MB * 1024 * 1024) {
      setFile(null)
      return setError(`File must be under ${MAX_MB} MB.`)
    }
    return setFile(chosen)
  }

  const submit = async (event) => {
    event.preventDefault()
    if (!job) return setError('Choose the role you are applying for.')
    if (!form.name.trim() || !EMAIL_RE.test(form.email)) return setError('Enter your name and a valid email.')
    if (!file) return setError('Attach your resume (PDF or DOCX).')
    setError('')
    setBusy(true)
    try {
      const data = await submitApplication({
        ...form,
        jobId: job.id,
        resume: { name: file.name, size: file.size, type: file.type },
      })
      setReference(data.reference)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  const reset = () => {
    setReference('')
    setForm({ name: '', email: '', note: '' })
    setFile(null)
    setJobId('')
    if (fileInput.current) fileInput.current.value = ''
  }

  return (
    <section id="apply" className="relative isolate overflow-hidden bg-[#0B1730] py-20 lg:py-28">
      <NetworkCanvas className="opacity-40" density={9000} reach={110} />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(600px_circle_at_50%_0%,rgba(20,115,230,0.3),transparent_65%),radial-gradient(420px_circle_at_100%_100%,rgba(245,184,46,0.14),transparent_60%)]" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
        <SectionHeading
          tone="dark"
          badge="Apply"
          title="Send your application"
          text="Tell us who you are and attach your resume. If there is a match, we will be in touch."
        />

        <m.div variants={rise} initial="hidden" whileInView="show" viewport={viewport} className="rounded-3xl border border-white/15 bg-white p-6 shadow-[0_40px_90px_-30px_rgba(20,115,230,0.55)] sm:p-9">
          <AnimatePresence mode="wait">
            {reference ? (
              <m.div key="done" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease }} className="py-6 text-center" role="status">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F5B82E]/20">
                  <Check className="h-7 w-7" color="#92600A" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-bold text-[#0B1730]">Application received</h3>
                <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-[#334155]">
                  Thank you. Your reference is <strong className="rounded-md bg-slate-100 px-2 py-0.5 font-display text-[#0B1730]">{reference}</strong>. We will be in touch if there is a match.
                </p>
                <button type="button" onClick={reset} className="mt-7 rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-bold text-[#0B1730] outline-none transition-colors hover:border-[#0B1730] hover:bg-[#0B1730] hover:text-white focus-visible:ring-2 focus-visible:ring-[#1473E6]">
                  Apply for another role
                </button>
              </m.div>
            ) : (
              <m.form key="form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
                <Field id="role" label="Role">
                  <select id="role" value={jobId} onChange={(event) => setJobId(event.target.value)} className={inputClass}>
                    <option value="">Select a role</option>
                    {jobs.map((item) => (
                      <option key={item.id} value={item.id}>{item.title} ({item.team})</option>
                    ))}
                  </select>
                </Field>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="name" label="Full name">
                    <input id="name" autoComplete="name" value={form.name} onChange={update('name')} className={inputClass} placeholder="Your name" />
                  </Field>
                  <Field id="email" label="Email">
                    <input id="email" type="email" autoComplete="email" value={form.email} onChange={update('email')} className={inputClass} placeholder="you@example.com" />
                  </Field>
                </div>
                <Field id="resume" label={`Resume (PDF or DOCX, up to ${MAX_MB} MB)`}>
                  <input
                    id="resume"
                    ref={fileInput}
                    type="file"
                    accept=".pdf,.docx"
                    onChange={pick}
                    className="mt-2 w-full cursor-pointer rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3 text-sm text-[#334155] file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-[#0B1730] file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:border-[#1473E6]"
                  />
                  {file && <p className="mt-2 text-xs font-semibold text-[#0F6FBF]">{file.name} ({(file.size / 1024).toFixed(0)} KB)</p>}
                </Field>
                <Field id="note" label="Anything else (optional)">
                  <textarea id="note" rows="3" value={form.note} onChange={update('note')} className={inputClass} placeholder="Links, projects or a short note" />
                </Field>

                {error && (
                  <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={busy}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#F5B82E] px-7 py-4 text-base font-bold text-[#0B1730] shadow-[0_10px_30px_-10px_rgba(245,184,46,0.6)] outline-none transition-all duration-300 hover:shadow-[0_16px_40px_-10px_rgba(245,184,46,0.85)] focus-visible:ring-2 focus-visible:ring-[#0B1730] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {busy ? 'Sending…' : 'Send application'}
                  {!busy && <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />}
                </button>
              </m.form>
            )}
          </AnimatePresence>
        </m.div>
      </div>
    </section>
  )
}

const CareersPage = () => {
  usePageMeta({
    title: 'Careers | UNEVENT',
    description: 'Open roles at UNEVENT. Join a small team across security, legal risk, governance and software.',
  })
  const [jobId, setJobId] = useState('')

  const apply = (id) => {
    setJobId(id)
    setTimeout(() => scrollTo('apply'), 40)
  }

  return (
    <MotionConfig reducedMotion="user">
      <Hero />
      <Values />
      <Roles onApply={apply} />
      <Process />
      <ApplyForm jobId={jobId} setJobId={setJobId} />
    </MotionConfig>
  )
}

export default CareersPage
