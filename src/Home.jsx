import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import { CardGridSkeleton } from './components/ui/Skeletons'
import usePageMeta from './hooks/usePageMeta'

const AboutSection = lazy(() => import('./components/AboutSection'))
const ServicesSection = lazy(() => import('./components/ServicesSection'))
const ApproachSection = lazy(() => import('./components/ApproachSection'))
const IndustriesSection = lazy(() => import('./components/IndustriesSection'))
const InsightsSection = lazy(() => import('./components/InsightsSection'))
const CtaSection = lazy(() => import('./components/CtaSection'))

// Below-the-fold sections are only fetched/rendered when they come near the screen,
// so the first paint (hero) is not competing with six other chunks on mobile.
const Lazy = ({ children, id, count = 3, dark = false }) => {
  const [near, setNear] = useState(() => typeof window === 'undefined' || !('IntersectionObserver' in window) || Boolean(window.location.hash))
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

  const skeleton = <CardGridSkeleton id={id} count={count} dark={dark} />

  if (!near) return <div ref={ref}>{skeleton}</div>
  return <Suspense fallback={skeleton}>{children}</Suspense>
}

const Home = () => {
  usePageMeta({
    title: 'UNEVENT | Risk Advisory: Cyber, Legal, Compliance & Technology',
    description: 'UNEVENT is a risk advisory firm helping organisations identify and prioritise cyber, legal and compliance exposure, and turn findings into practical controls.',
  })

  return (
    <>
      <Hero />
      <Marquee />
      <Lazy id="about"><AboutSection /></Lazy>
      <Lazy id="services" count={4}><ServicesSection /></Lazy>
      <Lazy id="approach" count={4}><ApproachSection /></Lazy>
      <Lazy id="industries"><IndustriesSection /></Lazy>
      <Lazy id="insights"><InsightsSection /></Lazy>
      <Lazy id="contact" count={2} dark><CtaSection /></Lazy>
    </>
  )
}

export default Home
