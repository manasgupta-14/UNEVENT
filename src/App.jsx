import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Route, Routes } from 'react-router'
import Navbar from './components/Navbar'
import ScrollManager from './components/ScrollManager'
import Home from './Home'
import { PageSkeleton } from './components/ui/Skeletons'

const Footer = lazy(() => import('./components/Footer'))
const About = lazy(() => import('./components/About'))
const Contact = lazy(() => import('./components/Contact'))
const Book = lazy(() => import('./components/Book'))
const IndustriesPage = lazy(() => import('./pages/industries/IndustriesPage'))
const InsightsPage = lazy(() => import('./pages/insights/InsightsPage'))
const ArticlePage = lazy(() => import('./pages/insights/ArticlePage'))
const CaseStudiesPage = lazy(() => import('./pages/case-studies/CaseStudiesPage'))
const CareersPage = lazy(() => import('./pages/careers/CareersPage'))

const modules = import.meta.glob('./pages/*Page.jsx')

const servicePages = Object.entries(modules).map(([path, loader]) => ({
  slug: path.match(/\/(\w+)Page\.jsx$/)[1].toLowerCase(),
  Page: lazy(loader),
}))

const loading = <PageSkeleton />

const LazyFooter = () => {
  const [near, setNear] = useState(true)
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (near || !node) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true)
          observer.disconnect()
        }
      },
      { rootMargin: '600px 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [near])

  if (!near) return <div ref={ref} aria-hidden="true" className="min-h-[24rem] bg-[#0B1730]" />
  return (
    <Suspense fallback={<div aria-hidden="true" className="min-h-[24rem] bg-[#0B1730]" />}>
      <Footer />
    </Suspense>
  )
}

const App = () => (
  <div className="min-h-dvh bg-[#F8FAFC] font-sans text-[#334155]">
    <Navbar />

    <ScrollManager />

    <main>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/about"
          element={
            <Suspense fallback={loading}>
              <About />
            </Suspense>
          }
        />

        <Route
          path="/contact"
          element={
            <Suspense fallback={loading}>
              <Contact />
            </Suspense>
          }
        />

        <Route
          path="/book"
          element={
            <Suspense fallback={loading}>
              <Book />
            </Suspense>
          }
        />

        {servicePages.map(({ slug, Page }) => (
          <Route
            key={slug}
            path={`/practice/${slug}`}
            element={
              <Suspense fallback={loading}>
                <Page />
              </Suspense>
            }
          />
        ))}

        <Route
          path="/industries"
          element={
            <Suspense fallback={loading}>
              <IndustriesPage />
            </Suspense>
          }
        />

        <Route
          path="/insights"
          element={
            <Suspense fallback={loading}>
              <InsightsPage />
            </Suspense>
          }
        />

        <Route
          path="/insights/:slug"
          element={
            <Suspense fallback={loading}>
              <ArticlePage />
            </Suspense>
          }
        />

        <Route
          path="/case-studies"
          element={
            <Suspense fallback={loading}>
              <CaseStudiesPage />
            </Suspense>
          }
        />

        <Route
          path="/careers"
          element={
            <Suspense fallback={loading}>
              <CareersPage />
            </Suspense>
          }
        />

        <Route path="*" element={<Home />} />
      </Routes>
    </main>

    <LazyFooter />
  </div>
)

export default App