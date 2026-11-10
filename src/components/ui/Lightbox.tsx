import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { ReactNode, Ref } from 'react'
import { useEffect, useRef } from 'react'

export interface LightboxItem {
  src: string
  alt: string
  caption: string
}

interface LightboxProps {
  items: LightboxItem[]
  index: number | null
  onIndexChange: (index: number) => void
  onClose: () => void
}

/**
 * Accessible image viewer built on the native <dialog> element:
 * showModal() traps focus and makes the page behind it inert,
 * Escape closes it, and Left/Right arrows step through photos.
 * Focus returns to whatever opened it once it closes.
 */
export function Lightbox({ items, index, onIndexChange, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const open = index !== null

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) {
      returnFocusRef.current = document.activeElement as HTMLElement | null
      dialog.showModal()
      closeRef.current?.focus()
    }
    if (!open && dialog.open) {
      dialog.close()
      returnFocusRef.current?.focus()
    }
  }, [open])

  const step = (delta: number) => {
    if (index === null) return
    onIndexChange((index + delta + items.length) % items.length)
  }

  const item = index !== null ? items[index] : null

  return (
    <dialog
      ref={dialogRef}
      aria-label="Client photo"
      className="on-dark m-auto h-full max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-navy/90 backdrop:backdrop-blur-sm"
      // Escape fires "cancel"; route it through React state so focus is restored.
      onCancel={(e) => {
        e.preventDefault()
        onClose()
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') step(1)
        if (e.key === 'ArrowLeft') step(-1)
      }}
      // Clicking the backdrop (the dialog element itself) closes the viewer.
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {item && (
        <div className="pointer-events-none flex h-full flex-col items-center justify-center gap-4 p-4 sm:p-10">
          <figure className="pointer-events-auto flex max-h-full flex-col items-center">
            <img
              key={item.src}
              src={item.src}
              alt={item.alt}
              className="max-h-[calc(100dvh-10rem)] w-auto max-w-full rounded-2xl object-contain shadow-lift"
            />
            <figcaption aria-live="polite" className="mt-4 text-center font-display text-lg font-semibold text-white">
              {item.caption}
              <span className="mt-1 block font-sans text-sm font-normal text-on-navy">
                Photo {index! + 1} of {items.length}
              </span>
            </figcaption>
          </figure>

          <div className="pointer-events-auto flex gap-3">
            <LightboxButton label="Previous photo" onClick={() => step(-1)}>
              <ChevronLeft aria-hidden="true" className="size-6" />
            </LightboxButton>
            <LightboxButton label="Close" onClick={onClose} buttonRef={closeRef}>
              <X aria-hidden="true" className="size-6" />
            </LightboxButton>
            <LightboxButton label="Next photo" onClick={() => step(1)}>
              <ChevronRight aria-hidden="true" className="size-6" />
            </LightboxButton>
          </div>
        </div>
      )}
    </dialog>
  )
}

function LightboxButton({
  label,
  onClick,
  buttonRef,
  children,
}: {
  label: string
  onClick: () => void
  buttonRef?: Ref<HTMLButtonElement>
  children: ReactNode
}) {
  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-lime hover:text-navy"
    >
      {children}
    </button>
  )
}
