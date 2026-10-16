import { motion } from 'framer-motion'
import MagneticButton from './ui/MagneticButton'
import NetworkCanvas from './ui/NetworkCanvas'
import { services } from '../data/services'
import { rise, stagger, viewport } from '../lib/motion'

const CtaSection = () => (
  <section id="contact" className="relative bg-[#F8FAFC] pb-24 lg:pb-32">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <motion.div variants={rise} initial="hidden" whileInView="show" viewport={viewport} className="relative overflow-hidden rounded-[2rem] p-px">
        <span className="absolute left-1/2 top-1/2 aspect-square w-[260%] -translate-x-1/2 -translate-y-1/2 animate-beam bg-[conic-gradient(from_0deg,transparent_0deg,transparent_240deg,#F5B82E_295deg,#1473E6_335deg,transparent_360deg)]" />
        <div className="relative isolate overflow-hidden rounded-[calc(2rem-1px)] bg-[#0B1730] px-6 py-16 text-center sm:px-12 lg:py-24">
          <NetworkCanvas className="opacity-60" density={9000} reach={110} />
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(600px_circle_at_50%_0%,rgba(20,115,230,0.35),transparent_65%),radial-gradient(420px_circle_at_100%_100%,rgba(245,184,46,0.16),transparent_60%)]" />

          <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewport} className="relative mx-auto flex max-w-3xl flex-col items-center">
            <motion.span variants={rise} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm font-semibold text-blue-200 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F5B82E]" />
              Get started
            </motion.span>
            <motion.h2 variants={rise} className="mt-6 font-display text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl">
              Tell us your biggest risk.
            </motion.h2>
            <motion.p variants={rise} className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
              Security, contracts, compliance or software: share what worries you and we will reply with a clear, practical plan.
            </motion.p>
            <motion.div variants={rise} className="mt-10 flex flex-col gap-4 sm:flex-row">
              <MagneticButton href="mailto:hello@unevent.com?subject=Consultation%20request" size="lg">
                Book a Consultation
              </MagneticButton>
              <MagneticButton href="mailto:hello@unevent.com" tone="ghost" size="lg" arrow={false}>
                hello@unevent.com
              </MagneticButton>
            </motion.div>
            <motion.div variants={rise} className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-semibold text-slate-400">
              {services.map((service) => (
                <span key={service.id} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: service.accent }} />
                  {service.name}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
)

export default CtaSection
