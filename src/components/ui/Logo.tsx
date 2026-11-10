interface LogoProps {
  /** "light" renders white text for navy backgrounds. */
  tone?: 'light' | 'dark'
  className?: string
}

export function LogoMark({ className = 'size-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="9" className="fill-lime" />
      <path
        d="M7 23 L13 17 L17 20 L25 10"
        fill="none"
        className="stroke-navy"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="25" cy="10" r="2.4" className="fill-navy" />
    </svg>
  )
}

export function Logo({ tone = 'dark', className = '' }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      <span
        className={`font-display text-xl font-bold tracking-tight ${tone === 'light' ? 'text-white' : 'text-ink'}`}
      >
        Stridewell
      </span>
    </span>
  )
}
