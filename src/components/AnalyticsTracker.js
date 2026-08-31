'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

function ensureGtag() {
  if (typeof window === 'undefined') return null
  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || function gtag(){ window.dataLayer.push(arguments) }
  return window.gtag
}

function cleanText(value = '') {
  return String(value).replace(/\s+/g, ' ').trim().slice(0, 120)
}

export default function AnalyticsTracker({ gaId }) {
  const pathname = usePathname()

  useEffect(() => {
    const gtag = ensureGtag()
    if (!gtag) return

    const pagePath = `${window.location.pathname}${window.location.search}`
    gtag('event', 'page_view', {
      send_to: gaId,
      page_title: document.title,
      page_location: window.location.href,
      page_path: pagePath,
    })
  }, [pathname, gaId])

  useEffect(() => {
    const track = (eventName, params = {}) => {
      const gtag = ensureGtag()
      if (!gtag) return
      gtag('event', eventName, { send_to: gaId, ...params })
    }

    const onClick = (event) => {
      const target = event.target instanceof Element ? event.target.closest('a,button') : null
      if (!target) return

      if (target.tagName === 'A') {
        const href = target.getAttribute('href') || ''
        const text = cleanText(target.textContent)
        const isToolCard = Boolean(target.closest('.tool-card'))
        const isCategory = href.startsWith('/kategori/')

        if (isToolCard) {
          track('tool_open', { link_url: href, link_text: text, source_path: pathname })
        } else if (isCategory) {
          track('category_open', { link_url: href, link_text: text, source_path: pathname })
        } else {
          track('navigation_click', { link_url: href, link_text: text, source_path: pathname })
        }
        return
      }

      const text = cleanText(target.textContent)
      if (target.classList.contains('header-search-button') || target.classList.contains('mobile-search-link') || target.closest('.hero-search')) {
        track('search_open', { button_text: text, source_path: pathname })
      } else if (target.classList.contains('calculate-button')) {
        track('calculator_click', { button_text: text, source_path: pathname })
      } else {
        track('button_click', { button_text: text, source_path: pathname })
      }
    }

    const onSubmit = (event) => {
      if (!(event.target instanceof HTMLFormElement)) return
      track('calculator_submit', { source_path: pathname })
    }

    document.addEventListener('click', onClick, true)
    document.addEventListener('submit', onSubmit, true)
    return () => {
      document.removeEventListener('click', onClick, true)
      document.removeEventListener('submit', onSubmit, true)
    }
  }, [pathname, gaId])

  return null
}
