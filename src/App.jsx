import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollManager from './components/ScrollManager'
import Home from './Home'

const IndustriesPage = lazy(() => import('./pages/industries/IndustriesPage'))
const InsightsPage = lazy(() => import('./pages/insights/InsightsPage'))
const ArticlePage = lazy(() => import('./pages/insights/ArticlePage'))
const CaseStudiesPage = lazy(() => import('./pages/case-studies/CaseStudiesPage'))

const modules = import.meta.glob('./pages/*Page.jsx')

const servicePages = Object.entries(modules).map(([path, loader]) => ({
  slug: path.match(/\/(\w+)Page\.jsx$/)[1].toLowerCase(),
  Page: lazy(loader),
}))

const App = () => (
  <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#334155]">
    <Navbar />

    <ScrollManager />

    <main>
      <Routes>
        <Route path="/" element={<Home />} />

        {servicePages.map(({ slug, Page }) => (
          <Route
            key={slug}
            path={`/services/${slug}`}
            element={
              <Suspense fallback={<div className="p-8">Loading...</div>}>
                <Page />
              </Suspense>
            }
          />
        ))}

        <Route
          path="/industries"
          element={
            <Suspense fallback={<div className="p-8">Loading...</div>}>
              <IndustriesPage />
            </Suspense>
          }
        />

        <Route
          path="/insights"
          element={
            <Suspense fallback={<div className="p-8">Loading...</div>}>
              <InsightsPage />
            </Suspense>
          }
        />

        <Route
          path="/insights/:slug"
          element={
            <Suspense fallback={<div className="p-8">Loading...</div>}>
              <ArticlePage />
            </Suspense>
          }
        />

        <Route
          path="/case-studies"
          element={
            <Suspense fallback={<div className="p-8">Loading...</div>}>
              <CaseStudiesPage />
            </Suspense>
          }
        />

        <Route path="*" element={<Home />} />
      </Routes>
    </main>

    <Footer />
  </div>
)

export default App
