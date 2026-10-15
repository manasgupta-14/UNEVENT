import { motion } from 'framer-motion'
import SectionHeading from './ui/SectionHeading'
import { Arrow } from './ui/icons'
import { articles, cases } from '../data/content'
import { services } from '../data/services'
import { rise, stagger, viewport } from '../lib/motion'

const formatDate = (value) =>
  new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })

const fromArticle = (article) => ({
  id: article.slug,
  type: 'Article',
  title: article.title,
  summary: article.summary,
  meta: [formatDate(article.date), `${article.read} min read`],
})

const fromCase = (entry) => ({
  id: entry.title,
  type: 'Case Study',
  title: entry.title,
  summary: entry.challenge,
  meta: [services.find((service) => service.slug === entry.division).name, 'Illustrative case'],
})

const insights = [fromArticle(articles[0]), fromArticle(articles[1]), fromCase(cases[0])]

const badge = {
  Article: 'bg-[#1473E6]/10 text-[#1473E6]',
  'Case Study': 'bg-[#F5B82E]/20 text-[#92600A]',
}

const Meta = ({ item, dark = false }) => (
  <div className={`flex items-center gap-3 text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
    <span>{item.meta[0]}</span>
    <span className={`h-1 w-1 rounded-full ${dark ? 'bg-slate-600' : 'bg-slate-300'}`} />
    <span>{item.meta[1]}</span>
  </div>
)

const Featured = ({ item }) => (
  <motion.a
    variants={rise}
    href="#insights"
    className="group relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-3xl bg-[#0B1730] p-8 outline-none focus-visible:ring-2 focus-visible:ring-[#1473E6] lg:col-span-7 lg:p-10"
  >
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(520px_circle_at_90%_0%,rgba(20,115,230,0.35),transparent_60%),radial-gradient(420px_circle_at_0%_100%,rgba(245,184,46,0.14),transparent_60%)]" />
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(135deg,transparent_35%,black)]" />
    <svg viewBox="0 0 320 320" fill="none" className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 animate-spin-slow opacity-70 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true">
      <circle cx="160" cy="160" r="150" stroke="#1473E6" strokeOpacity="0.4" strokeDasharray="4 8" />
      <circle cx="160" cy="160" r="110" stroke="#F5B82E" strokeOpacity="0.35" strokeDasharray="2 6" />
      <circle cx="160" cy="160" r="70" stroke="#60A5FA" strokeOpacity="0.4" />
      <circle cx="160" cy="10" r="6" fill="#F5B82E" />
      <circle cx="270" cy="160" r="5" fill="#1473E6" />
      <circle cx="160" cy="230" r="4" fill="#60A5FA" />
    </svg>

    <div className="relative flex items-center justify-between">
      <span className="rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-bold text-blue-200 backdrop-blur">{item.type}</span>
      <span className="text-sm font-semibold text-slate-400">Featured</span>
    </div>

    <div className="relative">
      <h3 className="max-w-lg font-display text-3xl font-bold leading-tight text-white lg:text-4xl">{item.title}</h3>
      <p className="mt-4 max-w-md text-base leading-relaxed text-slate-300">{item.summary}</p>
      <div className="mt-6 flex items-center justify-between gap-4">
        <Meta item={item} dark />
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F5B82E] text-[#0B1730] transition-transform duration-300 group-hover:-rotate-45">
          <Arrow className="h-5 w-5" />
        </span>
      </div>
    </div>
  </motion.a>
)

const Compact = ({ item }) => {
  const gold = item.type === 'Case Study'
  return (
    <motion.a
      variants={rise}
      href="#insights"
      className="group relative flex flex-1 flex-col justify-between gap-6 overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 outline-none transition-all duration-500 hover:-translate-y-1 hover:border-[#1473E6]/40 hover:shadow-[0_28px_60px_-28px_rgba(20,115,230,0.45)] focus-visible:ring-2 focus-visible:ring-[#1473E6]"
    >
      <span className={`absolute inset-y-0 left-0 w-1 origin-top scale-y-0 transition-transform duration-500 group-hover:scale-y-100 ${gold ? 'bg-[#F5B82E]' : 'bg-[#1473E6]'}`} />
      <div className="flex items-center justify-between">
        <span className={`rounded-full px-3.5 py-1.5 text-xs font-bold ${badge[item.type]}`}>{item.type}</span>
        <Meta item={item} />
      </div>
      <div className="flex items-end justify-between gap-6">
        <h3 className="font-display text-xl font-bold leading-snug text-[#0B1730]">{item.title}</h3>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 text-[#0B1730] transition-all duration-300 group-hover:border-transparent group-hover:bg-[#0B1730] group-hover:text-white">
          <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-45" />
        </span>
      </div>
    </motion.a>
  )
}

const InsightsSection = () => (
  <section id="insights" className="relative bg-[#F8FAFC] py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading badge="Featured insights" title="Perspective from the front line of risk" text="Articles and case studies on how proactive teams keep problems from becoming incidents." />
        <motion.a
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          href="#insights"
          className="group inline-flex w-fit items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-bold text-[#0B1730] outline-none transition-colors hover:border-[#0B1730] hover:bg-[#0B1730] hover:text-white focus-visible:ring-2 focus-visible:ring-[#1473E6]"
        >
          View all insights
          <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </motion.a>
      </div>

      <motion.div variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={viewport} className="mt-14 grid gap-6 lg:grid-cols-12">
        <Featured item={insights[0]} />
        <div className="flex flex-col gap-6 lg:col-span-5">
          {insights.slice(1).map((item) => (
            <Compact key={item.id} item={item} />
          ))}
        </div>
      </motion.div>
    </div>
  </section>
)

export default InsightsSection
