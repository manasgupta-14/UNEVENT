import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import ScrollManager from './components/ScrollManager'

const modules = import.meta.glob('./pages/*Page.jsx')

const servicePages = Object.entries(modules).map(([path, loader]) => ({
  slug: path.match(/\/(\w+)Page\.jsx$/)[1].toLowerCase(),
  Page: lazy(loader),
}))

const App = () => (
  <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#334155]">
    <ScrollManager />

    <main>
      <Routes>
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

        <Route path="*" element={<Navigate to="/services/protect" replace />} />
      </Routes>
    </main>
  </div>
)

export default App
