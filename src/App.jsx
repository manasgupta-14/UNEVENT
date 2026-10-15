import { Route, Routes } from 'react-router'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './Home'

const App = () => (
  <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#334155]">
    <Navbar />
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </main>
    <Footer />
  </div>
)

export default App
