export const offersSection = {
  badge: 'Ways to start',
  title: 'Pick a practical first engagement.',
  text: 'Each starting point names the trigger it suits, what you receive and which practices are involved. Scope, deliverables and timing are confirmed with you before any work begins.',
}

export const offers = [
  {
    slug: 'risk-baseline',
    name: 'Risk Baseline',
    trigger: 'Leadership needs a view of the top exposures.',
    output: 'Prioritised risk register, action plan and ownership map.',
    practices: ['protect', 'counsel', 'govern'],
    optional: ['labs'],
  },
  {
    slug: 'enterprise-readiness',
    name: 'Enterprise Readiness Pack',
    trigger: 'A customer or auditor asks for security and control evidence.',
    output: 'Evidence pack, gap list, questionnaire support and priorities.',
    practices: ['protect', 'govern', 'labs'],
  },
  {
    slug: 'contract-risk-review',
    name: 'Contract Risk Review',
    trigger: 'A material SaaS, vendor or customer agreement is being signed or renewed.',
    output: 'Clause matrix, negotiation points and an issue tracker.',
    practices: ['counsel'],
    optional: ['protect', 'govern'],
  },
  {
    slug: 'governance-privacy-readiness',
    name: 'Governance and Privacy Readiness',
    trigger: 'You need to organise obligations, policies, controls and evidence.',
    output: 'Applicability and gap review, owners, evidence tracker and roadmap.',
    practices: ['govern'],
    optional: ['counsel', 'labs'],
  },
  {
    slug: 'ai-automation-readiness',
    name: 'AI and Automation Readiness',
    trigger: 'The business wants AI or automation in a sensitive workflow.',
    output: 'Use-case review, risk and control checklist, solution design and acceptance tests.',
    practices: ['labs', 'govern'],
    optional: ['counsel', 'protect'],
  },
  {
    slug: 'incident-readiness',
    name: 'Incident Readiness and Containment Planning',
    trigger: 'Leadership needs clear action paths if an event occurs.',
    output: 'Escalation map, runbook and tabletop exercise. Containment support only where scoped.',
    practices: ['protect', 'govern', 'labs'],
    optional: ['counsel'],
  },
]
