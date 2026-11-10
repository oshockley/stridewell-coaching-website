import { Apple, Award, Dumbbell, Quote } from 'lucide-react'
import { photos, unsplash, unsplashSrcSet } from '../../data/images'
import { site } from '../../data/site'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const credentials = [
  { icon: Award, short: 'NASM-CPT', full: 'Certified Personal Trainer, National Academy of Sports Medicine' },
  { icon: Apple, short: 'Precision Nutrition L1', full: 'Level 1 Certified Nutrition Coach' },
  {
    icon: Dumbbell,
    short: 'CSCS',
    full: 'Certified Strength and Conditioning Specialist, National Strength and Conditioning Association',
  },
]

export function About() {
  const { coach } = site
  return (
    <section id="about" aria-labelledby="about-title" className="section-y bg-mist">
      <div className="container-site grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
          <img
            src={unsplash(photos.coach, 720, 880)}
            srcSet={unsplashSrcSet(photos.coach, [480, 720, 960], 880 / 720)}
            sizes="(min-width: 1024px) 34rem, (min-width: 480px) 28rem, 90vw"
            width={720}
            height={880}
            loading="lazy"
            decoding="async"
            alt={`${coach.name}, head coach of ${site.name}, in the training studio`}
            className="aspect-[720/880] w-full rounded-card object-cover shadow-lift"
          />
          <div className="on-dark absolute right-4 -bottom-6 rounded-2xl bg-navy px-5 py-4 text-white shadow-lift sm:-right-6">
            <p className="font-display text-3xl font-bold text-lime">Since {coach.coachingSince}</p>
            <p className="text-sm text-on-navy">coaching in Phoenix</p>
          </div>
        </Reveal>

        <div>
          <SectionHeading
            id="about-title"
            align="left"
            eyebrow="About the coach"
            title={`Hi, I’m ${coach.firstName}.`}
          />
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
            <p>
              I ran track in college until a stress fracture ended my season. Rebuilding in the weight room taught me
              more than racing ever did: strength comes from patient, steady progress, not punishing sprints.
            </p>
            <p>
              I’ve been coaching in Phoenix since {coach.coachingSince}, and I’ve worked with more than {coach.clientsCoached} clients,
              from first-time lifters in their sixties to competitive athletes. I started Stridewell to give every one
              of them the same thing: a plan built for their real life, and a coach who checks in every single week.
            </p>
          </div>

          <ul className="mt-8 grid gap-3" aria-label="Credentials">
            {credentials.map((c) => (
              <li key={c.short} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-card">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-navy text-lime">
                  <c.icon aria-hidden="true" className="size-5" />
                </span>
                <span>
                  <span className="block font-semibold text-ink">{c.short}</span>
                  <span className="block text-sm text-muted">{c.full}</span>
                </span>
              </li>
            ))}
          </ul>

          <figure className="mt-8 border-l-4 border-lime pl-5">
            <Quote aria-hidden="true" className="size-6 text-navy/30" />
            <blockquote className="mt-2 font-display text-xl leading-snug font-semibold text-ink">
              The best program isn’t the hardest one. It’s the one you’re still doing a year from now.
            </blockquote>
            <figcaption className="mt-3 text-sm text-muted">{coach.name}, NASM-CPT, CSCS</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
