import { Navigate } from 'react-router'
import ServiceHero from './ServiceHero'
import ServiceProblems from './ServiceProblems'
import ServiceOfferings from './ServiceOfferings'
import ServiceProcess from './ServiceProcess'
import ServiceFaq from './ServiceFaq'
import ServiceCta from './ServiceCta'
import usePageMeta from '../../hooks/usePageMeta'
import { getService } from '../../data/services'

const ServiceLayout = ({ slug }) => {
  const service = getService(slug)

  usePageMeta({
    title: service ? `${service.name} | ${service.area} by UNEVENT` : 'UNEVENT',
    description: service?.short,
  })

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
