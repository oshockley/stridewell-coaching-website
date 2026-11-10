import type { ReactNode } from 'react'

interface SectionHeadingProps {
  id: string
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  align = 'center',
  tone = 'dark',
}: SectionHeadingProps) {
  const centered = align === 'center'
  const onNavy = tone === 'light'
  return (
    <div className={`max-w-2xl ${centered ? 'mx-auto text-center' : ''}`}>
      <p
        className={`mb-4 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase ${onNavy ? 'text-lime' : 'text-muted'}`}
      >
        <span aria-hidden="true" className="h-1.5 w-6 rounded-full bg-lime" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`text-3xl leading-[1.1] font-bold sm:text-4xl lg:text-5xl ${onNavy ? 'text-white' : 'text-ink'}`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-5 text-lg leading-relaxed ${onNavy ? 'text-on-navy' : 'text-muted'}`}>{intro}</p>
      )}
    </div>
  )
}
