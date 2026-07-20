'use client'

import { useEffect, useState } from 'react'
import { toolMap } from '@/data/tools'
import ToolCard from './ToolCard'

const KEY = 'hesaplas_favorite_tools_v1'

export default function FavoriteTools() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const load = () => {
      try {
        const slugs = JSON.parse(localStorage.getItem(KEY) || '[]')
        setFavorites(slugs.map((slug) => toolMap[slug]).filter(Boolean).slice(0, 6))
      } catch {}
    }
    load()
    window.addEventListener('hesaplas:favorites', load)
    return () => window.removeEventListener('hesaplas:favorites', load)
  }, [])

  if (!favorites.length) return null
  return <section id="favoriler" className="recent-section favorite-section">
    <div className="section-heading"><div><span className="eyebrow">Kişisel liste</span><h2>Favori araçlarınız</h2></div><span className="tool-count">Bu cihazda saklanır</span></div>
    <div className="tool-grid-cards">{favorites.map((tool) => <ToolCard key={tool.slug} tool={tool} compact />)}</div>
  </section>
}
