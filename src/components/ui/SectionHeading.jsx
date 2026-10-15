import { motion } from 'framer-motion'
import { rise, stagger, viewport } from '../../lib/motion'

const SectionHeading = ({ badge, title, text, tone = 'light', align = 'left', className = '' }) => {
  const dark = tone === 'dark'
  return (
    <motion.div
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={`flex max-w-3xl flex-col gap-4 ${align === 'center' ? 'mx-auto items-center text-center' : ''} ${className}`}
    >
      {badge && (
        <motion.span
          variants={rise}
          className={`inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-semibold ${
            dark ? 'border-white/15 bg-white/5 text-blue-200' : 'border-[#1473E6]/20 bg-[#1473E6]/10 text-[#1473E6]'
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#F5B82E]" />
          {badge}
        </motion.span>
      )}
      <motion.h2
        variants={rise}
        className={`font-display text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl ${dark ? 'text-white' : 'text-[#0B1730]'}`}
      >
        {title}
      </motion.h2>
      {text && (
        <motion.p variants={rise} className={`text-base leading-relaxed sm:text-lg ${dark ? 'text-slate-300' : 'text-[#334155]'}`}>
          {text}
        </motion.p>
      )}
    </motion.div>
  )
}

export default SectionHeading
