import { AnimatePresence, m } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { site } from '../../data/site'
import { ButtonLink } from '../ui/Button'

/**
 * Sticky bottom CTA on small screens. Appears once the hero has scrolled away
 * and hides again while the consultation form itself is on screen.
 */
export function MobileConsultBar() {
  const [pastHero, setPastHero] = useState(false)
  const [formVisible, setFormVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('top')
    const form = document.getElementById('consult')
    if (!hero || !form) return
    const heroObserver = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting))
    const formObserver = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), {
      threshold: 0.15,
    })
    heroObserver.observe(hero)
    formObserver.observe(form)
    return () => {
      heroObserver.disconnect()
      formObserver.disconnect()
    }
  }, [])

  const show = pastHero && !formVisible

  return (
    <AnimatePresence>
      {show && (
        <m.div
          className="on-dark fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-navy/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm leading-tight text-on-navy">
              <span className="block font-semibold text-white">Not sure where to start?</span>
              {site.consult.minutes}-minute call, no pressure.
            </p>
            <ButtonLink href="#consult">
              Free Consult
              <ArrowRight aria-hidden="true" className="size-4" />
            </ButtonLink>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
