import { AnimatePresence, motion } from 'framer-motion'

export const Field = ({ id, label, required = false, error, children, className = '' }) => (
  <div className={`group ${className}`}>
    <label
      htmlFor={id}
      className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-slate-300 transition-colors duration-300 group-hover:text-white group-focus-within:text-[#F5B82E]"
    >
      {label}
      {required ? (
        <span className="text-[#F5B82E]" aria-hidden="true">*</span>
      ) : (
        <span className="text-xs font-medium text-slate-500">(optional)</span>
      )}
    </label>
    {children}
    <AnimatePresence initial={false}>
      {error && (
        <motion.p
          id={`${id}-error`}
          role="alert"
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-1.5 text-sm font-medium text-red-300"
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
)
