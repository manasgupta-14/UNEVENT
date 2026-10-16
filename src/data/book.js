// All Book-a-consultation copy lives here. Edit text, meeting types or time slots and the page updates.

export const meta = {
  title: 'Book a consultation',
  description: 'Pick a service, a time and book a call with UNEVENT.',
}

export const hero = {
  badge: 'Book a consultation',
  lead: 'Four short steps.',
  accent: 'We will confirm by email.',
  text: 'Choose a service, a meeting type and a time that suits you. No preparation needed.',
}

export const steps = [
  { key: 'service', label: 'Service', title: 'What do you need help with?', hint: 'Pick the closest area.' },
  { key: 'meeting', label: 'Meeting', title: 'What kind of meeting suits you?', hint: 'You can change this later.' },
  { key: 'time', label: 'Time', title: 'Pick a day and a time.', hint: 'Weekdays only.' },
  { key: 'details', label: 'Details', title: 'Who should we expect?', hint: 'We use this only to confirm your booking.' },
]

export const meetings = [
  { key: 'intro', label: 'Intro call', length: '30 min', text: 'A short conversation about what you are dealing with.' },
  { key: 'scoping', label: 'Scoping session', length: '60 min', text: 'Go through your situation in depth and agree what to do first.' },
  { key: 'review', label: 'Existing project review', length: '45 min', text: 'A second look at work that is already under way.' },
]

export const times = [
  { value: '10:00', label: '10:00 AM' },
  { value: '11:00', label: '11:00 AM' },
  { value: '12:00', label: '12:00 PM' },
  { value: '14:00', label: '2:00 PM' },
  { value: '15:00', label: '3:00 PM' },
  { value: '16:00', label: '4:00 PM' },
]

export const timeNote = 'Times are in your local timezone.'

export const summary = {
  title: 'Your booking',
  empty: 'Not chosen yet',
  rows: [
    { key: 'service', label: 'Service' },
    { key: 'meeting', label: 'Meeting' },
    { key: 'date', label: 'Date' },
    { key: 'time', label: 'Time' },
  ],
  note: 'Fields marked with * are required.',
}

export const popup = {
  title: 'Booking confirmed',
  text: 'Here are your booking details. We will confirm by email.',
  reference: 'Reference',
  done: 'Done',
  email: 'Email these details to UNEVENT',
}
