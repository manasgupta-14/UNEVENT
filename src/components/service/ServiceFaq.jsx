import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { Arrow } from '../ui/icons'
import { ease, rise, stagger, viewport } from '../../lib/motion'

const FaqItem = ({ service, question, answer, open, onToggle, index }) => (
  <motion.div
    variants={rise}
    className="overflow-hidden rounded-2xl border bg-white transition-[border-color,box-shadow] duration-500"
    style={{ borderColor: open ? service.color : '#E2E8F0', boxShadow: open ? `0 24px 50px -28px ${service.color}88` : '0 0 0 rgba(0,0,0,0)' }}
  >
    <h3>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`faq-panel-${index}`}
        className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1473E6]"
      >
        <span className="font-display text-base font-bold text-[#0B1730] sm:text-lg">{question}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0, backgroundColor: open ? service.color : '#F1F5F9', color: open ? '#FFFFFF' : '#0B1730' }}
          transition={{ duration: 0.3, ease }}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className="h-4 w-4" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </motion.span>
      </button>
    </h3>
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          id={`faq-panel-${index}`}
          role="region"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease }}
        >
          <p className="px-6 pb-6 text-[15px] leading-relaxed text-[#334155]">{answer}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
)

const ServiceFaq = ({ service }) => {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] py-24 lg:py-32">
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading badge="FAQ" title="Questions, answered" text={`Straight answers about how UNEVENT ${service.name} works.`} />
          <a
            href="#contact"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-bold outline-none focus-visible:underline"
            style={{ color: service.ink }}
          >
            Still have a question? Talk to our team
            <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
        <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewport} className="space-y-4">
          {service.faqs.map(([question, answer], index) => (
            <FaqItem
              key={question}
              service={service}
              question={question}
              answer={answer}
              index={index}
              open={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ServiceFaq
