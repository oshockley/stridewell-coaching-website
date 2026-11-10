/**
 * Scrolls to a section and moves keyboard focus to a target inside it.
 * Smooth scrolling comes from CSS and is disabled for reduced-motion users.
 */
export function scrollToSection(sectionId: string, focusSelector?: string) {
  const section = document.getElementById(sectionId)
  if (!section) return
  section.scrollIntoView({ block: 'start' })
  const target = focusSelector ? section.querySelector<HTMLElement>(focusSelector) : null
  target?.focus({ preventScroll: true })
}
