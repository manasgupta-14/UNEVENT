import { company } from './company'

const contactLine = `Questions about this page can be sent to ${company.email}.`

export const legalPages = {
  privacy: {
    title: 'Privacy Policy',
    updated: 'October 2026',
    intro: 'This page explains what information UNEVENT handles when you use this website and how it is used.',
    sections: [
      ['What we collect', 'Only what you choose to send us: your name, business email, organisation, a short description of your situation and, for bookings, your preferred practice, meeting type and time. Job applicants also send the details requested on the application form.'],
      ['How it reaches us', 'The contact and booking forms prepare an email in your own email app. Nothing is sent until you press send there. Details you send reach us by email.'],
      ['How we use it', 'To reply to your inquiry, arrange a call, and consider job applications. We do not sell your information.'],
      ['What not to send', 'Please do not send passwords, credentials or confidential legal documents through the website forms. If a secure channel is needed, we will agree one with you.'],
      ['Sharing', 'We share your details only with people who need them to respond to you, and with service providers or specialist partners only where that is needed and agreed with you.'],
      ['Your choices', `You can ask us to correct or delete the information you have sent us by writing to ${company.email}.`],
      ['Contact', contactLine],
    ],
  },
  terms: {
    title: 'Terms of Service',
    updated: 'October 2026',
    intro: 'These terms apply to your use of this website. Services are provided under a separate written agreement for each engagement.',
    sections: [
      ['Information only', 'Content on this site is general information. It is not legal, financial or compliance advice. UNEVENT is not a law firm. Legal advice comes only from qualified lawyers in the relevant jurisdiction.'],
      ['Scenarios and deliverable formats', 'Charts, scenarios and deliverable formats on this site describe how UNEVENT typically works. They do not describe specific client engagements and do not predict outcomes. Client work is confidential.'],
      ['No guarantee of outcomes', 'Risk can be reduced and readiness improved, but no service can guarantee that incidents, compliance failures or legal disputes will not occur.'],
      ['Engagements', 'Scope, deliverables, timelines, ownership and fees for any engagement are agreed in writing before work begins.'],
      ['Acceptable use', 'Please do not misuse the site, attempt to disrupt it, or submit unlawful content.'],
      ['Changes', 'We may update this site and these terms. The date at the top shows when this page was last updated.'],
      ['Contact', contactLine],
    ],
  },
  cookies: {
    title: 'Cookie Settings',
    updated: 'October 2026',
    intro: 'This page explains how this website uses browser storage.',
    sections: [
      ['Our current approach', 'This website does not use advertising or analytics cookies and does not track you across other sites.'],
      ['Technical storage', 'Your browser may keep technical data that the site needs to load and work, such as cached files. This is not used to identify you.'],
      ['Third-party content', 'The site loads fonts from Google Fonts, and the Contact page may show an embedded Google Map when a location is published. Those providers may process technical data such as your IP address under their own policies.'],
      ['If this changes', 'If we add analytics or other cookies, we will update this page and ask for your consent where required.'],
      ['Contact', contactLine],
    ],
  },
}
