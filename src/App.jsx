import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollManager from './components/ScrollManager'
import Home from './Home'

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

        <Route path="*" element={<Home />} />
      </Routes>
    </main>

    <Footer />
  </div>
)

export default App
