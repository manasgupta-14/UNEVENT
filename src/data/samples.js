export const samplesMeta = {
  title: 'Sample Deliverables | UNEVENT',
  description: 'Labelled sample deliverables from each UNEVENT practice: a ranked findings register, a clause review matrix, a control and evidence tracker, an incident-readiness plan and a workflow output. Illustrative data, not client results.',
}

export const samplesHero = {
  badge: 'Sample deliverables',
  title: 'See the work product, not just the promise.',
  text: 'These are examples of what an engagement can produce. All data is illustrative and invented for demonstration. None of it comes from a client.',
  note: 'Sample deliverable. Illustrative data, not a client result.',
}

export const samples = [
  {
    id: 'risk-register',
    practice: 'protect',
    title: 'Ranked findings register',
    intro: 'From a security assessment: findings ranked by business impact and likelihood, each with an owner and a next action.',
    kind: 'table',
    columns: ['Finding', 'Severity', 'Why it matters', 'Suggested action', 'Owner (role)'],
    rows: [
      ['Weak shared password on an admin account', 'High', 'One leaked password could expose customer data.', 'Move to individual accounts with multi-factor sign-in.', 'IT lead'],
      ['Access rights not reviewed in 12 months', 'Medium', 'Former staff or unused accounts may still have access.', 'Run an access review and set a quarterly cadence.', 'IT lead'],
      ['Known vulnerability awaiting a patch', 'Medium', 'Public exploits may exist for the affected software.', 'Patch within the agreed window and verify.', 'Engineering'],
      ['No written incident plan', 'Low', 'Response depends on who happens to be available.', 'Adopt the one-page incident plan below.', 'Operations'],
    ],
    note: 'Severity combines likelihood and business impact in context. The same finding can rank differently in another business.',
  },
  {
    id: 'clause-matrix',
    practice: 'counsel',
    title: 'Clause review matrix',
    intro: 'From a first-pass contract risk review of a software licence agreement. Legal advice on any clause comes from a qualified lawyer.',
    kind: 'table',
    columns: ['Clause', 'Why it matters', 'Business impact', 'Suggested action'],
    rows: [
      ['Limitation of liability', 'The cap decides who pays when something fails.', 'A cap far below possible loss leaves the customer exposed.', 'Compare the cap to realistic loss. Ask whether data breaches sit inside or outside it.'],
      ['Data handling', 'Sets how personal and business data may be used and protected.', 'Vague terms can create privacy and security exposure.', 'Request explicit data-protection and breach-notification terms.'],
      ['Termination', 'Defines how you can leave and what happens to your data.', 'Hard exit terms can lock the business in.', 'Seek reasonable notice, and data return or deletion on exit.'],
      ['Subcontracting', 'Shows who else may touch your data or service.', 'Third parties may carry risks you cannot see.', 'Require consent, and flow-down of the same obligations.'],
    ],
    note: 'This matrix does not represent a review of any visitor’s contract.',
  },
  {
    id: 'control-tracker',
    practice: 'govern',
    title: 'Control and evidence tracker',
    intro: 'From a governance review: each control has an owner, the evidence that proves it ran, and a review date.',
    kind: 'table',
    columns: ['Control', 'Obligation it supports', 'Owner (role)', 'Evidence', 'Status', 'Next review'],
    rows: [
      ['Quarterly access review', 'Customer security requirement', 'IT lead', 'Signed review log', 'Evidence collected', 'Next quarter'],
      ['Policy approval cycle', 'Internal policy standard', 'Operations lead', 'Approved policy with version history', 'In progress', 'In 3 months'],
      ['Vendor risk check', 'Third-party management', 'Procurement', 'Completed vendor questionnaire', 'Evidence missing', 'In 1 month'],
      ['Incident plan test', 'Readiness expectation', 'Security lead', 'Tabletop exercise notes', 'Planned', 'In 6 months'],
    ],
    note: 'Illustrative sample only. A tracker supports audit preparation and does not guarantee compliance or certification.',
  },
  {
    id: 'incident-plan',
    practice: 'protect',
    title: 'One-page incident-readiness plan',
    intro: 'A short plan that names who does what, so the first hour is orderly. Containment support is offered only where it is in the agreed scope.',
    kind: 'plan',
    sections: [
      { heading: 'Roles', items: ['Incident lead: decides and coordinates.', 'Technical lead: isolates systems and preserves evidence.', 'Communications lead: informs leadership, customers and regulators where required.', 'Legal contact: qualified lawyer engaged where legal advice is needed.'] },
      { heading: 'First hour', items: ['Name one person in charge and start a timed log.', 'Isolate affected systems without wiping them.', 'Keep the circle small until the scope is understood.', 'Decide who must be told, and when.'] },
      { heading: 'Escalate when', items: ['Personal or customer data may be involved.', 'Critical systems are unavailable.', 'There is a ransom or extortion demand.', 'You are unsure of the scope after the first hour.'] },
      { heading: 'Afterwards', items: ['Write down what slowed the response.', 'Assign corrective actions with owners and dates.', 'Update the plan and rehearse it.'] },
    ],
  },
  {
    id: 'workflow-demo',
    practice: 'labs',
    title: 'Workflow output: supplier onboarding',
    intro: 'A sample of what an automated workflow produces, with a human review step. Labelled by delivery type so you know what is bought in and what is built.',
    kind: 'table',
    columns: ['Step', 'What happens', 'Output', 'Human review', 'Delivery type'],
    rows: [
      ['Intake', 'Supplier submits documents through a form.', 'Checklist created with due dates.', 'No', 'Custom build'],
      ['Check', 'Required documents are matched to the checklist.', 'Missing items flagged automatically.', 'Yes, a named reviewer confirms', 'Custom build'],
      ['Remind', 'Reminders go out for missing items.', 'Status view updated.', 'No', 'Curated product, configured'],
      ['Approve', 'Reviewer signs off the supplier.', 'Approval record with date and approver.', 'Yes', 'Custom build'],
    ],
    note: 'A named person stays responsible for the result. Outputs are validated against agreed acceptance criteria before release.',
  },
]
