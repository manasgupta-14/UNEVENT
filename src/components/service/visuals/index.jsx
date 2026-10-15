import GovernVisual from './GovernVisual'
import LabsVisual from './LabsVisual'

const map = {
  govern: GovernVisual,
  labs: LabsVisual,
}

const Visual = ({ service }) => {
  const Component = map[service.slug]
  return Component ? <Component service={service} /> : null
}

export default Visual
