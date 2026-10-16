import { motion } from 'framer-motion'
import SectionHeading from './ui/SectionHeading'
import { rise, stagger, viewport } from '../lib/motion'

const points = [
  {
    label: 'What we do',
    text: 'Find weak spots in security, contracts, compliance and technology, then fix them early.',
  },
  {
    label: 'Who we help',
    text: 'Businesses that handle customer data, sign contracts and answer to auditors.',
  },
  {
    label: 'Why "UNEVENT"',
    text: 'When risk is handled well, nothing happens. That is the result we aim for.',
  },
]

const AboutSection = () => (
  <section id="about" className="relative bg-white py-24 lg:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        badge="About UNEVENT"
        title="We stop business problems before they start."
        text="UNEVENT is a risk-prevention company. One team covers cybersecurity, legal risk, compliance and custom software."
      />

      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="mt-12 grid gap-6 md:grid-cols-3"
      >
        {points.map((point) => (
          <motion.div key={point.label} variants={rise} className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6">
            <h3 className="font-display text-lg font-bold text-[#0B1730]">{point.label}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-[#334155]">{point.text}</p>
          </motion.div>
        ))}
      </motion.div>

      <p className="mt-8 text-sm text-slate-500">
        UNEVENT is not a law firm. Legal advice comes from qualified lawyers, and we work alongside yours.
      </p>
    </div>
  </section>
)

export default AboutSection
