import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollManager from './components/ScrollManager'
import Home from './Home'

const About = lazy(() => import('./components/About'))
const Contact = lazy(() => import('./components/Contact'))
const Book = lazy(() => import('./components/Book'))

const modules = import.meta.glob('./pages/*Page.jsx')

const servicePages = Object.entries(modules).map(([path, loader]) => ({
  slug: path.match(/\/(\w+)Page\.jsx$/)[1].toLowerCase(),
  Page: lazy(loader),
}))

const loading = <div className="p-8">Loading...</div>

const App = () => (
  <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#334155]">
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
            path={`/services/${slug}`}
            element={
              <Suspense fallback={loading}>
                <Page />
              </Suspense>
            }
          />
        ))}

        <Route path="*" element={<Home />} />
      </Routes>
    </main>

    <Footer />
  </div>
)

export default App
