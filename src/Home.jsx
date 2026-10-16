import Hero from './components/Hero'
import Marquee from './components/Marquee'
import AboutSection from './components/AboutSection'
import ServicesSection from './components/ServicesSection'
import ApproachSection from './components/ApproachSection'
import IndustriesSection from './components/IndustriesSection'
import InsightsSection from './components/InsightsSection'
import CtaSection from './components/CtaSection'
import usePageMeta from './hooks/usePageMeta'

const Home = () => {
  usePageMeta({
    title: 'UNEVENT | Cybersecurity, Legal Risk, Compliance & Tech',
    description: 'UNEVENT helps businesses stop cyber, legal and compliance problems before they happen, and builds the software that keeps them stopped.',
  })

  return (
    <>
      <Hero />
      <Marquee />
      <AboutSection />
      <ServicesSection />
      <ApproachSection />
      <IndustriesSection />
      <InsightsSection />
      <CtaSection />
    </>
  )
}

export default Home
