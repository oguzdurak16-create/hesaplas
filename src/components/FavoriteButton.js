'use client'

import { useEffect, useState } from 'react'

const KEY = 'hesaplas_favorite_tools_v1'

export default function FavoriteButton({ slug }) {
  const [active, setActive] = useState(false)

  useEffect(() => {
    try { setActive(JSON.parse(localStorage.getItem(KEY) || '[]').includes(slug)) } catch {}
  }, [slug])

  const toggle = () => {
    try {
      const current = JSON.parse(localStorage.getItem(KEY) || '[]')
      const next = current.includes(slug) ? current.filter((item) => item !== slug) : [slug, ...current].slice(0, 12)
      localStorage.setItem(KEY, JSON.stringify(next))
      setActive(next.includes(slug))
      window.dispatchEvent(new CustomEvent('hesaplas:favorites'))
      if (typeof window.gtag === 'function') window.gtag('event', next.includes(slug) ? 'favorite_add' : 'favorite_remove', { tool_slug: slug })
    } catch {}
  }

  return <button type="button" className={`favorite-button ${active ? 'active' : ''}`} onClick={toggle} aria-pressed={active}>
    <span aria-hidden="true">{active ? '★' : '☆'}</span>{active ? 'Favorilerde' : 'Favoriye ekle'}
  </button>
}
