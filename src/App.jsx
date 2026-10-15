import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollManager from './components/ScrollManager'
import Home from './Home'

const GovernPage = lazy(() => import('./pages/GovernPage'))
const LabsPage = lazy(() => import('./pages/LabsPage'))

const App = () => (
  <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#334155]">
    <Navbar />

    <ScrollManager />

    <main>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/services/govern"
          element={
            <Suspense fallback={<div className="p-8">Loading...</div>}>
              <GovernPage />
            </Suspense>
          }
        />

        <Route
          path="/services/labs"
          element={
            <Suspense fallback={<div className="p-8">Loading...</div>}>
              <LabsPage />
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
