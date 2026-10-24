import { company } from './company'

export const meta = {
  title: 'Contact',
  description: 'Tell UNEVENT what you are dealing with and our team will suggest a practical next step.',
}

export const hero = {
  badge: 'Contact us',
  lead: ['Tell us what you’re', 'dealing with.'],
  accent: 'We’ll help you identify the next practical step.',
  text: 'Share the situation, your deadline and the type of support you are looking for. Avoid sending confidential documents through the initial form; use an agreed secure channel when needed.',
}

export const formCopy = {
  title: 'Send an inquiry',
  note: 'Fields marked with * are required.',
  privacy: 'Please do not share passwords, credentials or confidential legal documents here.',
  consent: 'I agree that UNEVENT may contact me about this inquiry.',
  submit: 'Send inquiry',
  successTitle: 'Your email app should be opening.',
  successText: 'Press send there to complete your inquiry. If nothing opened, write to us directly at',
  again: 'Write another inquiry',
}

const icon = {
  address: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
  email: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  phone: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
  hours: 'M8 7V3m8 4V3M3 11h18M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z',
  reply: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
}

export const details = {
  title: 'Contact details',
  rows: [
    company.address && {
      key: 'address',
      label: 'Location',
      value: company.address,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address)}`,
      icon: icon.address,
    },
    { key: 'email', label: 'Email us', value: company.email, href: `mailto:${company.email}`, icon: icon.email },
    company.phone && { key: 'phone', label: 'Call us', value: company.phone, href: `tel:${company.phone.replace(/[^+\d]/g, '')}`, icon: icon.phone },
    company.hours && { key: 'hours', label: 'Office hours', value: company.hours, icon: icon.hours },
    { key: 'reply', label: 'Reply time', value: company.typicalReply, icon: icon.reply },
  ].filter(Boolean),
  helpTitle: 'Who we help with what',
  helpText: 'Not sure where your question fits? Pick the closest area in the form, or choose "Not sure yet".',
  socialsTitle: 'Follow us',
}

export const email = company.email

const socialStyle = {
  YouTube: { color: '#FF3B3B', d: 'M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z' },
  Instagram: { color: '#E1306C', evenodd: true, d: 'M7.8 2h8.4A5.8 5.8 0 0122 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8A5.8 5.8 0 012 16.2V7.8A5.8 5.8 0 017.8 2zm-.2 2A3.6 3.6 0 004 7.6v8.8A3.6 3.6 0 007.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6A3.6 3.6 0 0016.4 4H7.6zm9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z' },
  Facebook: { color: '#4C8DFF', d: 'M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0022 12z' },
  X: { color: '#FFFFFF', d: 'M18.244 2H21.5l-7.12 8.14L22.75 22h-6.55l-5.13-6.7L5.2 22H1.94l7.62-8.71L1.5 2h6.7l4.64 6.13L18.244 2zm-1.15 18h1.8L7.02 3.9H5.1L17.094 20z' },
  LinkedIn: { color: '#3B9BFF', d: 'M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9.75h4V21H3zM9.75 9.75h3.83v1.54h.05c.53-1 1.84-2.07 3.79-2.07 4.05 0 4.8 2.67 4.8 6.13V21h-4v-4.9c0-1.17-.02-2.67-1.63-2.67-1.63 0-1.88 1.27-1.88 2.59V21h-4z' },
}

export const socials = company.socials
  .filter((item) => item.href && socialStyle[item.name])
  .map((item) => ({ ...item, ...socialStyle[item.name] }))

export const map = company.address
  ? {
      title: 'Find us on the map',
      address: company.address,
      query: company.address,
      directionsLabel: 'Get directions',
    }
  : null

export const contactChart = {
  badge: 'What happens next',
  title: 'From your message to our reply.',
  note: 'Typical timing, not a guaranteed turnaround.',
  unit: 'Progress toward your reply',
  bars: [
    {
      label: 'Inquiry sent',
      display: 'Day 0',
      value: 25,
      color: '#1473E6',
      detail: 'You tell us what you are dealing with, by form, email or phone.',
    },
    {
      label: 'Routed',
      display: 'Day 1',
      value: 60,
      color: '#F5B82E',
      detail: 'The team reads it and routes it to the right practice: Protect, Counsel, Govern or Labs.',
    },
    {
      label: 'Reply sent',
      display: 'Day 2',
      value: 100,
      color: '#F08A3C',
      detail: 'We reply with a suggested next step, usually within two business days.',
    },
  ],
  footer: 'Reply times are typical and can vary with scope.',
}
