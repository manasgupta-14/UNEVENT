import { m } from 'framer-motion'
import { rise, stagger, viewport } from '../../lib/motion'

const SectionHeading = ({ badge, title, text, tone = 'light', align = 'left', className = '' }) => {
  const dark = tone === 'dark'
  return (
    <m.div
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={`flex max-w-3xl flex-col gap-4 ${align === 'center' ? 'mx-auto items-center text-center' : ''} ${className}`}
    >
      {badge && (
        <m.span
          variants={rise}
          className={`inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-semibold ${
            dark ? 'border-white/15 bg-white/5 text-blue-200' : 'border-[#1473E6]/20 bg-[#1473E6]/10 text-[#1473E6]'
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#F5B82E]" />
          {badge}
        </m.span>
      )}
      <m.h2
        variants={rise}
        className={`font-display text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl ${dark ? 'text-white' : 'text-[#0B1730]'}`}
      >
        {title}
      </m.h2>
      {text && (
        <m.p variants={rise} className={`text-base leading-relaxed sm:text-lg ${dark ? 'text-slate-300' : 'text-[#334155]'}`}>
          {text}
        </m.p>
      )}
    </m.div>
  )
}

export default SectionHeading
