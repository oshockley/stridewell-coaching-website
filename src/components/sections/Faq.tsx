import { AnimatePresence, m } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { faqs } from '../../data/faqs'
import { site } from '../../data/site'
import { SectionHeading } from '../ui/SectionHeading'

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" aria-labelledby="faq-title" className="section-y bg-mist">
      <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <SectionHeading
            id="faq-title"
            align="left"
            eyebrow="FAQ"
            title="Questions, answered."
            intro={
              <>
                Something else on your mind? Email{' '}
                <a
                  href={`mailto:${site.contact.email}`}
                  className="font-semibold wrap-anywhere text-ink underline underline-offset-4"
                >
                  {site.contact.email}
                </a>{' '}
                or ask during your free consult.
              </>
            }
          />
        </div>

        <div className="grid gap-3">
          {faqs.map((faq, i) => {
            const open = openIndex === i
            const buttonId = `faq-button-${i}`
            const panelId = `faq-panel-${i}`
            return (
              <div key={faq.question} className="rounded-2xl bg-white shadow-card">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={open ? panelId : undefined}
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 rounded-2xl p-5 text-left font-display text-lg font-semibold text-ink sm:px-6"
                  >
                    {faq.question}
                    <span
                      aria-hidden="true"
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full transition-[transform,background-color] duration-300 motion-reduce:transition-none ${open ? 'rotate-45 bg-lime' : 'bg-mist'}`}
                    >
                      <Plus className="size-4 text-navy" strokeWidth={2.5} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {open && (
                    <m.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-6 leading-relaxed text-muted sm:px-6">{faq.answer}</p>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
