import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { Arrow } from './ui/icons'
import { categoryColor, formatDate } from '../lib/insights'
import { rgba } from '../lib/color'
import { ease } from '../lib/motion'

const InsightCard = ({ article, index = 0 }) => {
  const color = categoryColor(article.category)

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--x', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--y', `${event.clientY - rect.top}px`)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, ease, delay: index * 0.06 }}
    >
      <Link
        to={`/insights/${article.slug}`}
        onMouseMove={handleMove}
        style={{ '--c': color, '--glow': rgba(color, 0.5) }}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 outline-none transition-[border-color,box-shadow] duration-500 hover:border-[var(--c)] hover:shadow-[0_34px_70px_-34px_var(--glow)] focus-visible:ring-2 focus-visible:ring-[#1473E6]"
      >
        <span
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), ${rgba(color, 0.12)}, transparent 70%)` }}
        />
        <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-100" style={{ backgroundColor: color }} />

        <span className="relative inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: rgba(color, 0.12), color }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
          {article.category}
        </span>
        <h3 className="relative mt-5 font-display text-xl font-bold leading-snug text-[#0B1730]">{article.title}</h3>
        <p className="relative mt-3 text-[15px] leading-relaxed text-[#334155]">{article.summary}</p>

        <div className="relative mt-auto flex items-center justify-between border-t border-slate-100 pt-5 text-sm">
          <span className="text-slate-500">{formatDate(article.date)} · {article.read} min read</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-[#0B1730] transition-all duration-300 group-hover:border-transparent group-hover:text-white group-hover:[background-color:var(--c)]">
            <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

export default InsightCard
