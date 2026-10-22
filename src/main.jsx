import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { LazyMotion, MotionConfig } from 'framer-motion'

const features = import('./lib/motionFeatures').then((module) => module.default)
const loadFeatures = () => features

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LazyMotion features={loadFeatures}>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MotionConfig>
    </LazyMotion>
  </StrictMode>,
)
