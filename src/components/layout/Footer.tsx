import { Mail, MapPin, Phone } from 'lucide-react'
import { navLinks, site } from '../../data/site'
import { Logo } from '../ui/Logo'
import { SocialIcon } from '../ui/SocialIcon'

const YEAR = new Date().getFullYear()

export function Footer() {
  const { contact } = site
  return (
    <footer className="on-dark bg-navy pt-16 pb-28 text-on-navy md:pb-12">
      <div className="container-site">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr]">
          <div className="max-w-sm">
            <Logo tone="light" />
            <p className="mt-5 leading-relaxed">
              Personal training and online coaching with {site.coach.name}. Strength you can feel, results you can
              keep.
            </p>
            <ul className="mt-6 flex gap-3" aria-label="Social media">
              {site.socials.map((s) => (
                <li key={s.platform}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${site.name} on ${s.label} (opens in a new tab)`}
                    className="inline-flex size-11 items-center justify-center rounded-full bg-white/5 text-white transition-colors hover:bg-lime hover:text-navy"
                  >
                    <SocialIcon platform={s.platform} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-sm font-semibold tracking-[0.14em] text-white uppercase">Explore</h2>
            <ul className="mt-5 grid gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#consult" className="hover:text-white">
                  Free Consult
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold tracking-[0.14em] text-white uppercase">Get in touch</h2>
            <address className="mt-5 grid gap-4 not-italic">
              <p className="flex items-start gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-lime" />
                <span>
                  {contact.studio}, {contact.city}
                  <br />
                  <span className="text-sm">{contact.hours}</span>
                </span>
              </p>
              <a href={contact.phoneHref} className="flex items-center gap-3 hover:text-white">
                <Phone aria-hidden="true" className="size-5 shrink-0 text-lime" />
                {contact.phoneDisplay}
              </a>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-3 wrap-anywhere hover:text-white">
                <Mail aria-hidden="true" className="size-5 shrink-0 text-lime" />
                {contact.email}
              </a>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm sm:flex-row sm:justify-between">
          <p>
            © {YEAR} {site.name}. All rights reserved.
          </p>
          <p>Coaching in Phoenix, AZ and online.</p>
        </div>
      </div>
    </footer>
  )
}
