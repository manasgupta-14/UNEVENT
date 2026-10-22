import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import usePageMeta from './hooks/usePageMeta'

const AboutSection = lazy(() => import('./components/AboutSection'))
const ServicesSection = lazy(() => import('./components/ServicesSection'))
const ApproachSection = lazy(() => import('./components/ApproachSection'))
const IndustriesSection = lazy(() => import('./components/IndustriesSection'))
const InsightsSection = lazy(() => import('./components/InsightsSection'))
const CtaSection = lazy(() => import('./components/CtaSection'))

// Below-the-fold sections are only fetched/rendered when they come near the screen,
// so the first paint (hero) is not competing with six other chunks on mobile.
const Lazy = ({ children, id }) => {
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
      { rootMargin: '900px 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [near])

  // Invisible placeholder (keeps the #id anchor) instead of a grey skeleton, so nothing flashes under the hero on first load.
  const placeholder = <div id={id} aria-hidden="true" />

  if (!near) return <div ref={ref}>{placeholder}</div>
  return <Suspense fallback={placeholder}>{children}</Suspense>
}

const Home = () => {
  usePageMeta({
    title: 'UNEVENT | Risk Advisory: Cyber, Legal, Compliance & Technology',
    description: 'UNEVENT is a risk advisory firm that helps organisations identify and prioritise cyber, legal and compliance exposure, turn findings into practical controls, and use curated products and services plus in-house technology to strengthen prevention, readiness and response.',
  })

  return (
    <>
      <Hero />
      <Marquee />
      <Lazy id="practice"><ServicesSection /></Lazy>
      <Lazy id="approach"><ApproachSection /></Lazy>
      <Lazy id="industries"><IndustriesSection /></Lazy>
      <Lazy id="insights"><InsightsSection /></Lazy>
      <Lazy id="about"><AboutSection /></Lazy>
      <Lazy id="contact"><CtaSection /></Lazy>
    </>
  )
}

export default Home
