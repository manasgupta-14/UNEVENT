// All About-page copy lives here. Edit text, add or remove items, and the page updates itself.

export const meta = {
  title: 'About',
  description: 'Why UNEVENT exists, where we are headed and the principles we work by.',
}

export const hero = {
  badge: 'About UNEVENT',
  lead: ['Prevention', 'beats'],
  accent: 'crisis management.',
  text: 'Risk rarely arrives as one isolated problem. A security weakness can delay a sale; a contract clause can expand liability; a compliance gap can leave evidence missing; and a disconnected workflow can make every control harder to operate. UNEVENT brings risk advisory and technology together across Protect, Counsel, Govern and Labs—helping teams identify what matters, act on it and stay ready as conditions change.',
  stats: [
    { key: 'divisions', label: 'Practices' },
    { key: 'offerings', label: 'Offerings' },
    { key: 'values', label: 'Core values' },
  ],
}

export const story = {
  badge: 'Our story',
  title: 'Built to own the warnings everyone else notices.',
  intro: 'UNEVENT began with a simple observation about how business problems actually happen.',
  closing: 'Make it a non-event.',
  chapters: [
    {
      label: 'The signal',
      title: 'Crises rarely arrive unannounced.',
      text: 'A reused password, a clause nobody read, a missed compliance date, a tool that stopped fitting. Each one shows up early and quietly, long before it becomes an incident.',
    },
    {
      label: 'The gap',
      title: 'Warnings get noticed, not owned.',
      text: 'Security sits with IT, contracts with legal, compliance with operations. The gaps between those teams are exactly where small issues grow into expensive ones.',
    },
    {
      label: 'The answer',
      title: 'One team that owns the gap.',
      text: 'UNEVENT brings Protect, Counsel, Govern and Labs together. We find the issue early, give it a clear owner and close it before it turns into an event.',
    },
  ],
}

export const mission = {
  label: 'Mission',
  color: '#1473E6',
  icon: 'M12 3a9 9 0 100 18 9 9 0 000-18z M12 7a5 5 0 100 10 5 5 0 000-10z M12 11a1 1 0 100 2 1 1 0 000-2z',
  headline: 'Help organisations identify, reduce and manage business risk.',
  text: 'We look across cybersecurity, legal, compliance and technology, rank what we find by real risk, and turn it into plain steps a team can act on.',
  points: ['Find it early', 'Rank by real risk', 'Fix with clear owners'],
}

export const vision = {
  label: 'Vision',
  color: '#F5B82E',
  icon: 'M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  headline: 'Business operations that are proactive, responsible and secure by default.',
  text: 'We picture a world where reviewing risk is part of how work gets done, not something that happens after something breaks.',
  points: ['Proactive', 'Responsible', 'Secure by default'],
}

export const valuesSection = {
  badge: 'What we hold to',
  title: 'Five commitments behind every engagement.',
  text: 'These are the promises we make before any work begins.',
}

export const values = [
  {
    title: 'Trust',
    tagline: 'Sensitive by default.',
    text: 'Clients show us their weakest points. We treat every system, contract and record as sensitive and work only within what is agreed in writing.',
    practice: 'Written scope before any work starts.',
    color: '#1685DB',
    icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
  },
  {
    title: 'Prevention',
    tagline: 'Early beats urgent.',
    text: 'Fixing a cause costs far less than managing a crisis. We act on small signals while the fix is still simple.',
    practice: 'Findings ranked by risk, not by volume.',
    color: '#F5B82E',
    icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'Accountability',
    tagline: 'Every risk has an owner.',
    text: 'A warning nobody owns becomes an incident. Every engagement ends with clear scope, named owners and dated next steps.',
    practice: 'Action lists and risk registers, not just reports.',
    color: '#9B6BFF',
    icon: 'M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5',
  },
  {
    title: 'Confidentiality',
    tagline: 'What you share stays with us.',
    text: 'Your data, documents and findings stay between UNEVENT and your team. We share only what you approve, with the people you approve.',
    practice: 'Need-to-know access on every project.',
    color: '#4C9BFF',
    icon: 'M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z',
  },
  {
    title: 'Innovation',
    tagline: 'Build when tools fall short.',
    text: 'When no existing tool solves the problem, we build one through UNEVENT Labs, and keep it simple enough for teams to actually use.',
    practice: 'Automation where it removes real manual risk.',
    color: '#E9AB27',
    icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
  },
]

export const divisionsSection = {
  badge: 'Four practices',
  title: 'One team, four ways to make it a non-event.',
}

// Hero side chart. Values are an illustrative scale (not measured data) that shows
// the story's point: the later a risk is caught, the more it costs to deal with.
export const riskChart = {
  badge: 'Why early matters',
  title: 'The later a risk is caught, the more it costs.',
  note: 'Illustrative scale, not measured data.',
  unit: 'Relative effort to fix',
  bars: [
    {
      label: 'Early signal',
      value: 10,
      color: '#1473E6',
      detail: 'A reused password or a missed clause, caught while the fix is still simple.',
    },
    {
      label: 'Unowned gap',
      value: 45,
      color: '#F5B82E',
      detail: 'The warning is noticed but nobody owns it, so it keeps growing between teams.',
    },
    {
      label: 'Live incident',
      value: 100,
      color: '#F08A3C',
      detail: 'Now it is a crisis: urgent, public and expensive to manage.',
    },
  ],
  footer: 'UNEVENT keeps you on the left of this chart.',
}
