import { Link, Navigate } from 'react-router'
import usePageMeta from '../../hooks/usePageMeta'
import { legalPages } from '../../data/legal'

const LegalPage = ({ slug }) => {
  const page = legalPages[slug]
  usePageMeta({ title: page ? `${page.title} | UNEVENT` : 'UNEVENT', description: page?.intro })
  if (!page) return <Navigate to="/" replace />

  return (
    <>
      <section className="bg-[#0B1730] pb-14 pt-10 lg:pb-20 lg:pt-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-semibold text-slate-400">
            <Link to="/" className="outline-none transition-colors hover:text-white focus-visible:text-white">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white">{page.title}</span>
          </nav>
          <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{page.title}</h1>
          <p className="mt-4 text-sm font-semibold text-slate-400">Last updated: {page.updated}</p>
        </div>
      </section>
      <article className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-lg leading-relaxed text-[#0B1730]">{page.intro}</p>
          {page.sections.map(([heading, text]) => (
            <section key={heading} className="mt-10">
              <h2 className="font-display text-xl font-bold text-[#0B1730]">{heading}</h2>
              <p className="mt-3 leading-relaxed text-[#334155]">{text}</p>
            </section>
          ))}
        </div>
      </article>
    </>
  )
}

export default LegalPage
