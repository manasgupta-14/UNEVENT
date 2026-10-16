import { useEffect } from 'react'
import { Navigate } from 'react-router'
import ServiceHero from './ServiceHero'
import ServiceProblems from './ServiceProblems'
import ServiceOfferings from './ServiceOfferings'
import ServiceProcess from './ServiceProcess'
import ServiceFaq from './ServiceFaq'
import ServiceCta from './ServiceCta'
import { getService } from '../../data/services'

const ServiceLayout = ({ slug }) => {
  const service = getService(slug)

  useEffect(() => {
    if (service) document.title = `UNEVENT ${service.name} | ${service.headline}`
    return () => {
      document.title = 'UNEVENT | Make Risk a Non-Event'
    }
  }, [service])

  if (!service) return <Navigate to="/" replace />

  return (
    <div key={slug}>
      <ServiceHero service={service} />
      <ServiceProblems service={service} />
      <ServiceOfferings service={service} />
      <ServiceProcess service={service} />
      <ServiceFaq service={service} />
      <ServiceCta service={service} />
    </div>
  )
}

export default ServiceLayout
