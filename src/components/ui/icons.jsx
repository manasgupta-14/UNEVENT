import { icons } from '../../data/services'

export const ServiceImage = ({ id, className = 'h-6 w-6' }) => (
  <img src={`/${id}.webp`} width="384" height="384" loading="lazy" decoding="async" alt="" aria-hidden="true" draggable="false" className={`${className} object-contain`} />
)

export const Arrow = ({ className = 'h-4 w-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const Check = ({ className = 'h-4 w-4', color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
)

const pathToService = Object.fromEntries(Object.entries(icons).map(([id, path]) => [path, id]))

export const GlyphIcon = ({ d, color = 'currentColor', className = 'h-6 w-6', strokeWidth = 1.5, plain = false }) => {
  if (!plain && pathToService[d]) return <ServiceImage id={pathToService[d]} className={className} />
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={d} />
    </svg>
  )
}
