export const site = {
  name: 'Stridewell Coaching',
  coach: {
    name: 'Jordan Reyes',
    firstName: 'Jordan',
    coachingSince: 2018,
    yearsCoaching: 8,
    clientsCoached: 350,
  },
  consult: {
    minutes: 20,
  },
  contact: {
    email: 'hello@stridewellcoaching.com',
    phoneDisplay: '(602) 555-0148',
    phoneHref: 'tel:+16025550148',
    studio: 'Arcadia studio',
    city: 'Phoenix, AZ',
    hours: 'Mon–Sat, 5:30am–7pm',
  },
  rating: {
    average: 4.9,
    count: 180,
  },
  socials: [
    { platform: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/' },
    { platform: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/' },
    { platform: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/' },
  ],
} as const

export const stats = [
  { value: `${site.coach.yearsCoaching} yrs`, label: 'coaching' },
  { value: `${site.coach.clientsCoached}+`, label: 'clients coached' },
  { value: String(site.rating.average), label: 'average rating' },
]

export type SocialPlatform = (typeof site.socials)[number]['platform']

export const navLinks = [
  { href: '#programs', label: 'Programs' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#results', label: 'Results' },
  { href: '#about', label: 'About' },
  { href: '#faq', label: 'FAQ' },
] as const
