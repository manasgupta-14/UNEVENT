import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import usePageMeta from '../../hooks/usePageMeta'
import NetworkCanvas from '../../components/ui/NetworkCanvas'
import CountUp from '../../components/ui/CountUp'
import TiltPanel from '../../components/ui/TiltPanel'
import InsightCard from '../../components/InsightCard'
import CtaSection from '../../components/CtaSection'
import { articles, categories } from '../../data/content'
import { categoryColor, formatDate } from '../../lib/insights'
import { ease, rise, stagger } from '../../lib/motion'

const PER_PAGE = 4

const Word = ({ children, delay, className = '' }) => (
  <span className="inline-block overflow-hidden pb-[0.14em] align-bottom">
    <motion.span className={`inline-block ${className}`} initial={{ y: '115%' }} animate={{ y: 0 }} transition={{ duration: 0.9, delay, ease }}>
      {children}
    </motion.span>
  </span>
)

const orbit = (index, total) => {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2
  return { x: 50 + 34 * Math.cos(angle), y: 50 + 34 * Math.sin(angle) }
}

const Constellation = ({ onPick }) => {
  const topics = categories.slice(1)
  const latest = [...articles].sort((a, b) => b.date.localeCompare(a.date))[0]
  const nodes = topics.map((topic, index) => ({
    topic,
    color: categoryColor(topic),
    count: articles.filter((item) => item.category === topic).length,
    ...orbit(index, topics.length),
  }))

  return (
    <TiltPanel className="relative mx-auto aspect-square w-full max-w-[520px]">
      <div className="absolute inset-[8%] rounded-full bg-[#1473E6]/25 blur-3xl" />
      <div className="absolute inset-[2%] animate-spin-slow rounded-full border border-dashed border-[#1473E6]/35">
        <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F5B82E] shadow-[0_0_16px_#F5B82E]" />
      </div>
      <div className="absolute inset-[16%] animate-spin-slower rounded-full border border-dashed border-[#F5B82E]/25">
        <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#1473E6] shadow-[0_0_14px_#1473E6]" />
      </div>

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
        {nodes.map((node) => (
          <line key={node.topic} x1="50" y1="50" x2={node.x} y2={node.y} stroke={node.color} strokeOpacity="0.6" strokeWidth="0.35" strokeDasharray="1.5 2.5" className="animate-dash" />
        ))}
        <circle cx="50" cy="50" r="11" stroke="#F5B82E" strokeOpacity="0.25" strokeWidth="0.4" />
        <circle cx="50" cy="50" r="7" fill="#0B1730" stroke="#F5B82E" strokeWidth="0.9" />
        <circle cx="50" cy="50" r="2" fill="#F5B82E" className="animate-node origin-self" />
      </svg>

      {nodes.map((node, index) => (
        <div key={node.topic} className="absolute z-10 -translate-x-1/2 -translate-y-1/2" style={{ left: `${node.x}%`, top: `${node.y}%` }}>
          <button
            type="button"
            onClick={() => onPick(node.topic)}
            aria-label={`${node.topic}: ${node.count} ${node.count === 1 ? 'article' : 'articles'}`}
            className="animate-float flex max-w-[140px] items-center gap-2.5 rounded-xl border border-white/20 bg-[#0B1730]/75 px-3 py-2 text-left shadow-[0_15px_40px_-16px_rgba(0,0,0,0.8)] outline-none backdrop-blur-md transition-colors hover:border-white/45 focus-visible:ring-2 focus-visible:ring-[#F5B82E]"
            style={{ animationDelay: `${index * 0.6}s` }}
          >
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full" style={{ backgroundColor: node.color }} />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ backgroundColor: node.color }} />
            </span>
            <span className="leading-tight">
              <span className="block text-[11px] font-bold text-white">{node.topic}</span>
              <span className="block text-[11px] font-semibold text-slate-400">{node.count} {node.count === 1 ? 'article' : 'articles'}</span>
            </span>
          </button>
        </div>
      ))}

      <Link
        to={`/insights/${latest.slug}`}
        className="absolute -bottom-3 left-1/2 z-20 w-[86%] max-w-[360px] -translate-x-1/2 rounded-xl border border-[#F5B82E]/40 bg-[#0B1730]/80 px-4 py-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] outline-none backdrop-blur-md transition-colors hover:border-[#F5B82E] focus-visible:ring-2 focus-visible:ring-[#F5B82E]"
      >
        <span className="block text-[11px] font-bold text-[#F5B82E]">Latest · {formatDate(latest.date)}</span>
        <span className="mt-0.5 line-clamp-1 block text-sm font-bold text-white">{latest.title}</span>
      </Link>
    </TiltPanel>
  )
}

const Hero = ({ onPick }) => {
  const words = 'Practical guides to prevent risk.'.split(' ')
  const stats = [
    { value: articles.length, label: 'Articles' },
    { value: categories.length - 1, label: 'Topics' },
    { value: articles.reduce((sum, item) => sum + item.read, 0), label: 'Minutes of reading' },
  ]

  return (
    <section className="relative isolate overflow-hidden bg-[#0B1730]">
      <NetworkCanvas className="opacity-70" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
      <div className="pointer-events-none absolute -left-32 top-10 -z-10 h-[420px] w-[420px] animate-float rounded-full bg-[#1473E6]/20 blur-[110px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-[380px] w-[380px] animate-float rounded-full bg-[#F5B82E]/10 blur-[110px]" style={{ animationDelay: '2s' }} />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pb-24 pt-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-8 lg:pb-28 lg:pt-20">
        <motion.div variants={stagger(0.1, 0.1)} initial="hidden" animate="show" className="relative z-10">
          <motion.nav variants={rise} aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-semibold text-slate-400">
            <Link to="/" className="outline-none transition-colors hover:text-white focus-visible:text-white">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white">Insights</span>
          </motion.nav>

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

          <motion.p variants={rise} className="mt-7 max-w-xl text-lg leading-relaxed text-slate-300 sm:text-xl">
            Short articles on cybersecurity, legal risk, compliance and technology, written in plain language. Each one takes five minutes or less.
          </motion.p>

          <motion.div variants={rise} className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl font-extrabold text-white"><CountUp to={stat.value} /></p>
                <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <Constellation onPick={onPick} />
      </div>
    </section>
  )
}

const Toolbar = ({ cat, onCat, q, onQ, count }) => (
  <div className="border-b border-slate-200 bg-white">
    <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 lg:px-8">
      <label className="relative block w-full max-w-xl">
        <span className="sr-only">Search articles</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <input
          type="search"
          value={q}
          onChange={(event) => onQ(event.target.value)}
          placeholder="Search articles"
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-[#0B1730] outline-none transition-shadow placeholder:text-slate-400 focus:border-[#1473E6] focus:ring-2 focus:ring-[#1473E6]/25"
        />
      </label>

      <div role="group" aria-label="Category" className="flex flex-wrap gap-2">
        {categories.map((item) => {
          const on = item === cat
          const total = item === 'All' ? articles.length : articles.filter((entry) => entry.category === item).length
          return (
            <button
              key={item}
              type="button"
              aria-pressed={on}
              onClick={() => onCat(item)}
              className={`relative inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#1473E6] ${on ? 'border-transparent text-white' : 'border-slate-200 bg-white text-[#334155] hover:border-[#1473E6]/50'}`}
            >
              {on && <motion.span layoutId="cat-pill" transition={{ type: 'spring', stiffness: 380, damping: 34 }} className="absolute inset-0 rounded-full bg-[#0B1730]" />}
              <span className="relative">{item}</span>
              <span className={`relative rounded-full px-2 py-0.5 text-xs ${on ? 'bg-white/15 text-white' : 'bg-slate-100 text-slate-500'}`}>{total}</span>
            </button>
          )
        })}
      </div>

      <p aria-live="polite" className="text-sm font-semibold text-slate-500">
        Showing {count} of {articles.length} {articles.length === 1 ? 'article' : 'articles'}
        {cat !== 'All' && <span className="text-[#0B1730]"> in {cat}</span>}
      </p>
    </div>
  </div>
)

const Pager = ({ page, pages, onPage }) => (
  <div className="mt-12 flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
    <button
      type="button"
      disabled={page === 1}
      onClick={() => onPage(page - 1)}
      className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-bold text-[#0B1730] outline-none transition-colors hover:border-[#1473E6] focus-visible:ring-2 focus-visible:ring-[#1473E6] disabled:cursor-not-allowed disabled:opacity-40"
    >
      Previous
    </button>
    <div className="w-full max-w-xs text-center">
      <p className="text-sm font-semibold text-slate-500">Page {page} of {pages}</p>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-200">
        <motion.span className="block h-full rounded-full bg-gradient-to-r from-[#F5B82E] to-[#1473E6]" animate={{ width: `${(page / pages) * 100}%` }} transition={{ duration: 0.5, ease }} />
      </div>
    </div>
    <button
      type="button"
      disabled={page === pages}
      onClick={() => onPage(page + 1)}
      className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-bold text-[#0B1730] outline-none transition-colors hover:border-[#1473E6] focus-visible:ring-2 focus-visible:ring-[#1473E6] disabled:cursor-not-allowed disabled:opacity-40"
    >
      Next
    </button>
  </div>
)

const InsightsPage = () => {
  usePageMeta({
    title: 'Insights | UNEVENT',
    description: 'Practical articles and guides on cybersecurity, legal risk, governance and technology, written in plain language.',
  })

  const [cat, setCat] = useState('All')
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)

  const list = useMemo(
    () => articles.filter((item) => (cat === 'All' || item.category === cat) && `${item.title} ${item.summary}`.toLowerCase().includes(q.trim().toLowerCase())),
    [cat, q],
  )
  const pages = Math.max(1, Math.ceil(list.length / PER_PAGE))
  const shown = list.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const changePage = (next) => {
    setPage(next)
    document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' })
  }

  const pickCategory = (value) => {
    setCat(value)
    setQ('')
    setPage(1)
    document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' })
  }

  const clear = () => {
    setCat('All')
    setQ('')
    setPage(1)
  }

  return (
    <MotionConfig reducedMotion="user">
      <Hero onPick={pickCategory} />
      <Toolbar cat={cat} onCat={(value) => { setCat(value); setPage(1) }} q={q} onQ={(value) => { setQ(value); setPage(1) }} count={list.length} />

      <section id="articles" className="relative scroll-mt-24 overflow-hidden bg-[#F8FAFC] py-16 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(11,23,48,0.07)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {shown.length === 0 ? (
            <div className="mx-auto max-w-md rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <h2 className="font-display text-xl font-bold text-[#0B1730]">No articles match</h2>
              <p className="mt-2 text-[#334155]">Clear the search or pick another category.</p>
              <button type="button" onClick={clear} className="mt-6 rounded-xl bg-[#0B1730] px-6 py-3 text-sm font-bold text-white outline-none transition-colors hover:bg-[#1473E6] focus-visible:ring-2 focus-visible:ring-[#F5B82E]">
                Clear filters
              </button>
            </div>
          ) : (
            <motion.div layout className="grid gap-6 md:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {shown.map((item, index) => (
                  <InsightCard key={item.slug} article={item} index={index} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {pages > 1 && <Pager page={page} pages={pages} onPage={changePage} />}
        </div>
      </section>

      <CtaSection />
    </MotionConfig>
  )
}

export default InsightsPage
