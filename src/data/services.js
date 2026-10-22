import { services as content } from './content'

const ink = {
  protect: '#0F6FBF',
  counsel: '#A16207',
  govern: '#7146C8',
  labs: '#92610F',
}

export const icons = {
  protect:
    'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  counsel:
    'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3',
  govern:
    'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z M15 9h-4.5a.5.5 0 01-.5-.5V4',
  labs:
    'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
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
  href: `/practice/${item.slug}`,
}))

export const getService = (slug) => services.find((service) => service.slug === slug)
