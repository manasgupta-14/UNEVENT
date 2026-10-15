import { services as content } from './content'

const ink = {
  protect: '#0F6FBF',
  counsel: '#A16207',
}

export const icons = {
  protect:
    'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  counsel:
    'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3',
}

export const services = content.map((item) => ({
  ...item,
  id: item.slug,
  field: item.area,
  tagline: item.headline,
  desc: item.short,
  points: item.offerings.slice(0, 3).map((offering) => offering[0]),
  accent: item.color,
  ink: ink[item.slug],
  href: `/services/${item.slug}`,
}))

export const getService = (slug) => services.find((service) => service.slug === slug)
