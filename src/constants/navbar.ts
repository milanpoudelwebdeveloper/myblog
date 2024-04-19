import { ABOUT, BLOGS, CONTACT, HOME } from './routes'

export const navLinks = [
  { title: 'Home', link: HOME, prefetch: true },
  { title: 'Blogs', link: BLOGS, prefetch: true },
  { title: 'About', link: ABOUT, prefetch: false },
  { title: 'Contact', link: CONTACT, prefetch: false }
]
