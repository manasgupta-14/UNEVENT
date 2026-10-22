// Hero side chart. Illustrative scale only (not measured data, not client results).
// It shows how DPDP (India's Digital Personal Data Protection Act) readiness work
// is shared across the four UNEVENT practices.
export const dpdpChart = {
  badge: 'DPDP readiness · Illustrative',
  title: 'Where DPDP work sits across our four practices.',
  note: 'Sample data, not client results.',
  unit: 'Relative share of DPDP effort',
  bars: [
    { label: 'Protect', value: 70, color: '#1473E6', detail: 'Safeguards for personal data: access review, vulnerability findings and a breach-response plan that names who does what.' },
    { label: 'Counsel', value: 55, color: '#F5B82E', detail: 'Vendor and processor terms, notices and privacy documents reviewed with qualified lawyers where legal advice is needed.' },
    { label: 'Govern', value: 85, color: '#7146C8', detail: 'Data inventory, consent and notice records, owners and an evidence tracker kept reviewable all year.' },
    { label: 'Labs', value: 40, color: '#F08A3C', detail: 'Workflow tooling that puts agreed controls into practice, such as consent logs, reminders and status views.' },
  ],
  footer: 'Reduce exposure. Prepare better. Keep evidence ready.',
}
