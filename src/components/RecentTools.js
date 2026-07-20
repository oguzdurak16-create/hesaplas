'use client'

import { useEffect, useState } from 'react'
import { toolMap } from '@/data/tools'
import ToolCard from './ToolCard'

export default function RecentTools() {
  const [recent, setRecent] = useState([])
  useEffect(() => {
    try {
      const slugs = JSON.parse(localStorage.getItem('hesaplas_recent_tools_v1') || '[]')
      setRecent(slugs.map((slug) => toolMap[slug]).filter(Boolean).slice(0, 3))
    } catch {}
  }, [])
  if (!recent.length) return null
  return <section className="recent-section">
    <div className="section-heading"><div><span className="eyebrow">Kaldığınız yer</span><h2>Son kullandığınız araçlar</h2></div></div>
    <div className="tool-grid-cards">{recent.map((tool) => <ToolCard key={tool.slug} tool={tool} compact />)}</div>
  </section>
}
