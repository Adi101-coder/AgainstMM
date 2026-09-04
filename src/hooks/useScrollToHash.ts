import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scroll to a hash target after client-side navigation. */
export function useScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) return

    const id = hash.slice(1)
    const scroll = () => {
      const target = document.getElementById(id)
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    // Wait one frame so the destination page has mounted.
    requestAnimationFrame(scroll)
  }, [pathname, hash])
}
