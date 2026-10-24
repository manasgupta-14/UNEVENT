import SectionHeading from './ui/SectionHeading'
import { legalNotice } from '../data/company'

const triggers = [
  'An enterprise security review',
  'Vendor or contract exposure',
  'Privacy obligations',
  'Audit evidence requests',
  'AI or technology adoption',
]

const AboutSection = () => (
  <section id="about" className="relative bg-white py-24 lg:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        badge="About UNEVENT"
        title="Risk advisory, built around proof."
        text="Risk rarely arrives as one isolated problem. A security weakness can delay a sale; a contract clause can expand liability; a compliance gap can leave evidence missing; and a disconnected workflow can make every control harder to operate. UNEVENT brings risk advisory and technology together across Protect, Counsel, Govern and Labs—helping teams identify what matters, act on it and stay ready as conditions change."
      />

      <div className="mt-10 max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-wider text-slate-500">Common reasons teams call us</p>
        <ul className="mt-4 flex flex-wrap gap-2.5">
          {triggers.map((item) => (
            <li key={item} className="rounded-full border border-slate-200 bg-[#F8FAFC] px-4 py-2 text-sm font-semibold text-[#0B1730]">{item}</li>
          ))}
        </ul>
      </div>

      <p className="mt-8 text-sm text-slate-500">{legalNotice}</p>
    </div>
  </section>
)

export default AboutSection
