import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router'
import { MotionConfig, m } from 'framer-motion'
import usePageMeta from '../../hooks/usePageMeta'
import NetworkCanvas from '../../components/ui/NetworkCanvas'
import InsightCard from '../../components/InsightCard'
import CtaSection from '../../components/CtaSection'
import { articles } from '../../data/content'
import { services } from '../../data/services'
import { categoryColor, formatDate } from '../../lib/insights'
import { rgba } from '../../lib/color'
import { ease, rise, stagger, viewport } from '../../lib/motion'

const Word = ({ children, delay }) => (
  <span className="inline-block overflow-hidden pb-[0.14em] align-bottom">
    <m.span className="inline-block" initial={{ y: '115%' }} animate={{ y: 0 }} transition={{ duration: 0.9, delay, ease }}>
      {children}
    </m.span>
  </span>
)

const ArticlePage = () => {
  const { slug } = useParams()
  const article = articles.find((item) => item.slug === slug)
  const [copied, setCopied] = useState(false)

  usePageMeta({
    title: article ? `${article.title} | UNEVENT Insights` : undefined,
    description: article?.summary,
  })

  if (!article) return <Navigate to="/insights" replace />

  const color = categoryColor(article.category)
  const relatedService = services.find((item) => item.id === article.practice)
  const others = articles.filter((item) => item.slug !== article.slug)
  const related = [...others.filter((item) => item.category === article.category), ...others.filter((item) => item.category !== article.category)].slice(0, 2)
  const share = `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <MotionConfig reducedMotion="user">
      <div key={article.slug}>
        <section className="relative isolate overflow-hidden bg-[#0B1730]">
          <NetworkCanvas className="opacity-60" />
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
          <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: `radial-gradient(700px circle at 80% 0%, ${rgba(color, 0.3)}, transparent 62%)` }} />

          <m.div variants={stagger(0.1, 0.1)} initial="hidden" animate="show" className="mx-auto max-w-4xl px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-20 lg:pt-10">
            <m.nav variants={rise} aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-400">
              <Link to="/" className="outline-none transition-colors hover:text-white focus-visible:text-white">Home</Link>
              <span aria-hidden="true">/</span>
              <Link to="/insights" className="outline-none transition-colors hover:text-white focus-visible:text-white">Insights</Link>
            </m.nav>

            <m.span variants={rise} className="mt-7 inline-flex items-center gap-2.5 rounded-full border bg-white/5 px-4 py-1.5 text-sm font-semibold text-slate-200 backdrop-blur" style={{ borderColor: rgba(color, 0.5) }}>
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }} />
              {article.category}
            </m.span>

            <h1 className="mt-6 font-display text-[2.2rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl">
              {article.title.split(' ').map((word, index) => (
                <span key={`${word}-${index}`}>
                  <Word delay={0.2 + index * 0.05}>{word}</Word>{' '}
                </span>
              ))}
            </h1>

            <m.p variants={rise} className="mt-6 text-sm font-semibold text-slate-400">
              By the UNEVENT team · Published {formatDate(article.date)} · {article.read} min read
            </m.p>
          </m.div>
        </section>

        <article className="bg-white py-16 lg:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <m.aside
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.3 }}
              className="rounded-2xl border-l-4 p-6"
              style={{ borderColor: color, backgroundColor: rgba(color, 0.08) }}
            >
              <p className="text-sm font-bold text-slate-500">The short version</p>
              <p className="mt-2 text-lg font-semibold leading-relaxed text-[#0B1730]">{article.summary}</p>
            </m.aside>

            <m.div variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={viewport} className="mt-10 space-y-6">
              {article.body.map((paragraph, index) => (
                <m.p key={index} variants={rise} className={index === 0 ? 'text-xl leading-relaxed text-[#0B1730]' : 'text-lg leading-relaxed text-[#334155]'}>
                  {paragraph}
                </m.p>
              ))}
            </m.div>

            {relatedService && (
              <aside className="mt-12 rounded-3xl border p-6 sm:p-7" style={{ borderColor: rgba(relatedService.color, 0.5), backgroundColor: rgba(relatedService.color, 0.06) }}>
                <p className="text-sm font-bold text-slate-500">Next step</p>
                <p className="mt-2 font-display text-lg font-bold text-[#0B1730]">{article.trigger}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link to={relatedService.href} className="rounded-xl bg-[#0B1730] px-4 py-2.5 text-sm font-bold text-white outline-none hover:bg-[#13244a] focus-visible:ring-2 focus-visible:ring-[#1473E6]">
                    {relatedService.cta}
                  </Link>
                  <Link to={`/samples#${relatedService.sample}`} className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-[#0B1730] outline-none hover:border-[#1473E6] focus-visible:ring-2 focus-visible:ring-[#1473E6]">
                    {relatedService.sampleLabel}
                  </Link>
                </div>
              </aside>
            )}

            {article.category === 'Legal and Contract Risk' && (
              <p className="mt-6 text-sm leading-relaxed text-slate-500">
                This is general information, not legal advice. Laws differ by jurisdiction, so have a qualified lawyer review anything that matters.
              </p>
            )}

            <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-slate-200 pt-8">
              <span className="text-sm font-bold text-[#0B1730]">Share this article</span>
              <a href={share} target="_blank" rel="noreferrer" className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-[#0B1730] outline-none transition-colors hover:border-[#1473E6] focus-visible:ring-2 focus-visible:ring-[#1473E6]">
                Post on X
              </a>
              <button type="button" onClick={copyLink} className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-[#0B1730] outline-none transition-colors hover:border-[#1473E6] focus-visible:ring-2 focus-visible:ring-[#1473E6]">
                {copied ? 'Link copied' : 'Copy link'}
              </button>
              <Link to="/insights" className="ml-auto text-sm font-bold text-[#1473E6] outline-none hover:underline focus-visible:underline">All insights</Link>
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <section className="relative overflow-hidden bg-[#F8FAFC] py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="font-display text-3xl font-bold tracking-tight text-[#0B1730]">Keep reading</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {related.map((item, index) => (
                  <InsightCard key={item.slug} article={item} index={index} />
                ))}
              </div>
            </div>
          </section>
        )}

        <CtaSection />
      </div>
    </MotionConfig>
  )
}

export default ArticlePage
