import { createContext, useContext, useEffect } from 'react'

export const LightboxContext = createContext(() => {})
export const AppModalContext = createContext(() => {})

export const useLightbox = () => useContext(LightboxContext)
export const useAppModal = () => useContext(AppModalContext)

const focusable = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

// Dialog contract: focus trap, Escape to close, scroll lock, focus restore.
export function useDialog(ref, open, onClose, onKey) {
  useEffect(() => {
    if (!open) return
    const previous = document.activeElement
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    const frame = requestAnimationFrame(() => ref.current?.querySelector(focusable)?.focus())

    function handleKey(event) {
      if (event.key === 'Escape') return onClose()
      onKey?.(event)
      if (event.key !== 'Tab' || !ref.current) return
      const items = [...ref.current.querySelectorAll(focusable)]
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }

    document.addEventListener('keydown', handleKey)
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = overflow
      previous?.focus?.()
    }
  }, [ref, open, onClose, onKey])
}
