'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { categories, tools } from '@/data/tools'
import Icon from './Icon'

function normalize(value = '') {
  return value.toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ö/g, 'o').replace(/ü/g, 'u')
}

export default function ToolSearchDialog({ open, onClose }) {
  const router = useRouter()
  const inputRef = useRef(null)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const results = useMemo(() => {
    const q = normalize(query).trim()
    const source = q ? tools.filter((tool) => normalize(`${tool.title} ${tool.description} ${tool.keywords.join(' ')}`).includes(q)) : tools.filter((tool) => tool.trend)
    return source.slice(0, 8)
  }, [query])

  useEffect(() => {
    if (!open) return
    setQuery(''); setActive(0)
    window.setTimeout(() => inputRef.current?.focus(), 30)
    const close = (event) => { if (event.key === 'Escape') onClose() }
    document.body.classList.add('dialog-open')
    window.addEventListener('keydown', close)
    return () => { document.body.classList.remove('dialog-open'); window.removeEventListener('keydown', close) }
  }, [onClose, open])

  const go = (slug) => { onClose(); router.push(`/${slug}/`) }
  const keyDown = (event) => {
    if (event.key === 'ArrowDown') { event.preventDefault(); setActive((active + 1) % Math.max(results.length, 1)) }
    if (event.key === 'ArrowUp') { event.preventDefault(); setActive((active - 1 + Math.max(results.length, 1)) % Math.max(results.length, 1)) }
    if (event.key === 'Enter' && results[active]) { event.preventDefault(); go(results[active].slug) }
  }
  if (!open) return null
  return <div className="search-dialog-backdrop" onMouseDown={onClose}>
    <section className="search-dialog" role="dialog" aria-modal="true" aria-label="Hesaplama aracı ara" onMouseDown={(e) => e.stopPropagation()}>
      <div className="dialog-search"><Icon name="search" /><input ref={inputRef} value={query} onChange={(e) => { setQuery(e.target.value); setActive(0) }} onKeyDown={keyDown} placeholder="Ne hesaplamak istiyorsunuz?" /><kbd>ESC</kbd></div>
      <div className="dialog-caption"><span>{query ? `${results.length} sonuç` : 'Öne çıkan araçlar'}</span><small>↑↓ gezin · Enter aç</small></div>
      <div className="dialog-results">
        {results.map((tool, index) => {
          const category = categories.find((item) => item.id === tool.category)
          return <button key={tool.slug} type="button" className={index === active ? 'active' : ''} onMouseEnter={() => setActive(index)} onClick={() => go(tool.slug)}>
            <span className={`dialog-tool-icon category-${tool.category}`}><Icon name={tool.icon} /></span>
            <span><strong>{tool.shortTitle || tool.title}</strong><small>{category?.name} · {tool.description}</small></span>
            <Icon name="arrow" size="sm" />
          </button>
        })}
        {!results.length && <div className="dialog-empty"><Icon name="search" size="lg" /><strong>Araç bulunamadı</strong><span>Başka bir kelime deneyin.</span></div>}
      </div>
      <div className="dialog-footer"><span><Icon name="shield" size="sm" /> Hesaplamalar cihazınızda yapılır</span><button type="button" onClick={() => { onClose(); router.push('/tum-araclar/') }}>Tüm araçları aç</button></div>
    </section>
  </div>
}
