import { Clock, Expand } from 'lucide-react'
import { useState } from 'react'
import { unsplash, unsplashSrcSet } from '../../data/images'
import { getProgram } from '../../data/programs'
import { clientResults } from '../../data/results'
import { Lightbox } from '../ui/Lightbox'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

export function Results() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="results" aria-labelledby="results-title" className="section-y bg-white">
      <div className="container-site">
        <SectionHeading
          id="results-title"
          eyebrow="Client results"
          title="Real people. Steady progress. No crash diets."
          intro="Results vary with consistency, sleep, and starting point. These are typical of clients who show up for the plan week after week."
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {clientResults.map((result, i) => (
            <li key={result.name}>
              <Reveal delay={(i % 3) * 0.08} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-white shadow-card">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(i)}
                    className="relative block overflow-hidden focus-visible:-outline-offset-4"
                    aria-label={`View larger photo of ${result.name}`}
                  >
                    <img
                      src={unsplash(result.photoId, 600, 450)}
                      srcSet={unsplashSrcSet(result.photoId, [400, 600, 800], 0.75)}
                      sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 90vw"
                      width={600}
                      height={450}
                      loading="lazy"
                      decoding="async"
                      alt={result.photoAlt}
                      className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                    />
                    <span className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-navy/80 text-white backdrop-blur">
                      <Expand aria-hidden="true" className="size-4" />
                    </span>
                  </button>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-lg font-bold text-ink">{result.name}</h3>
                      <span className="rounded-full bg-mist px-2.5 py-1 text-xs font-semibold text-ink">
                        {getProgram(result.programId).name}
                      </span>
                    </div>
                    <p className="mt-3 font-display text-2xl leading-tight font-bold text-ink">{result.outcome}</p>
                    <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-muted">
                      <Clock aria-hidden="true" className="size-4" />
                      in {result.timeframe}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-muted">{result.detail}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      <Lightbox
        items={clientResults.map((r) => ({
          src: unsplash(r.photoId, 1400),
          alt: r.photoAlt,
          caption: `${r.name}: ${r.outcome} in ${r.timeframe}`,
        }))}
        index={openIndex}
        onIndexChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </section>
  )
}
