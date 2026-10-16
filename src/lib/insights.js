import { services } from '../data/services'

const divisionByCategory = {
  Cybersecurity: 'protect',
  'Legal and Contract Risk': 'counsel',
  'Governance and Compliance': 'govern',
  'AI and Technology': 'labs',
}

export const categoryColor = (category) =>
  services.find((service) => service.id === divisionByCategory[category])?.accent ?? '#1473E6'

export const formatDate = (value, month = 'short') =>
  new Date(value).toLocaleDateString('en-GB', { day: 'numeric', month, year: 'numeric', timeZone: 'UTC' })
