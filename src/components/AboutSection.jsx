import SectionHeading from './ui/SectionHeading'

const AboutSection = () => (
  <section id="about" className="relative bg-white py-24 lg:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <SectionHeading
        badge="About UNEVENT"
        title="Risk advisory, built around proof."
        text="Risk rarely arrives as one isolated problem. A security weakness can delay a sale; a contract clause can expand liability; a compliance gap can leave evidence missing; and a disconnected workflow can make every control harder to operate. UNEVENT brings risk advisory and technology together across Protect, Counsel, Govern and Labs—helping teams identify what matters, act on it and stay ready as conditions change."
      />

      <p className="mt-8 text-sm text-slate-500">
        UNEVENT is not a law firm. Legal advice comes from qualified lawyers, and we work alongside yours.
      </p>
    </div>
  </section>
)

export default AboutSection
