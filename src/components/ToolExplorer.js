'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { categories, tools } from '@/data/tools'
import ToolCard from './ToolCard'
import Icon from './Icon'

function normalize(value = '') {
  return value.toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ş/g, 's').replace(/ç/g, 'c').replace(/ö/g, 'o').replace(/ü/g, 'u')
}

export default function ToolExplorer({ initialLimit = 12, showHeading = true }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('featured')
  const inputRef = useRef(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const q = params.get('q')
    if (q) setQuery(q)
    const hash = window.location.hash.replace('#', '')
    if (categories.some((item) => item.id === hash)) setCategory(hash)
  }, [])

  const filtered = useMemo(() => {
    const tokens = normalize(query).trim().split(/\s+/).filter(Boolean)
    const found = tools.filter((tool) => {
      if (category !== 'all' && tool.category !== category) return false
      const text = normalize(`${tool.title} ${tool.shortTitle || ''} ${tool.description} ${tool.keywords.join(' ')} ${tool.badge || ''}`)
      return tokens.every((token) => text.includes(token))
    })
    return [...found].sort((a, b) => sort === 'az' ? a.title.localeCompare(b.title, 'tr') : Number(!!b.trend) - Number(!!a.trend))
  }, [query, category, sort])

  const visible = query || category !== 'all' || initialLimit >= tools.length ? filtered : filtered.slice(0, initialLimit)
  const updateQuery = (value) => {
    setQuery(value)
    const url = new URL(window.location.href)
    value ? url.searchParams.set('q', value) : url.searchParams.delete('q')
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`)
  }
  const updateCategory = (value) => {
    setCategory(value)
    const url = new URL(window.location.href)
    url.hash = value === 'all' ? '' : value
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`)
  }

  return (
    <section className="explorer-section">
      {showHeading && <div className="section-heading"><div><span className="eyebrow">Araç kütüphanesi</span><h2>İhtiyacınız olan hesabı bulun</h2><p>Arayın, kategori seçin veya öne çıkan araçlardan başlayın.</p></div><span className="tool-count"><strong>{tools.length}</strong> ücretsiz araç</span></div>}
      <div className="explorer-shell">
        <aside className="explorer-sidebar">
          <span className="sidebar-label">Kategoriler</span>
          <button className={category === 'all' ? 'active' : ''} onClick={() => updateCategory('all')}><span><Icon name="grid" size="sm" /> Tüm araçlar</span><b>{tools.length}</b></button>
          {categories.map((cat) => <button key={cat.id} className={category === cat.id ? `active category-${cat.id}` : `category-${cat.id}`} onClick={() => updateCategory(cat.id)}><span><Icon name={cat.icon} size="sm" /> {cat.name}</span><b>{tools.filter((tool) => tool.category === cat.id).length}</b></button>)}
        </aside>
        <div className="explorer-main">
          <div className="explorer-toolbar">
            <div className="search-box"><Icon name="search" /><input ref={inputRef} value={query} onChange={(e) => updateQuery(e.target.value)} placeholder="Kredi, kira, maaş, OBP..." aria-label="Hesaplama aracı ara" />{query ? <button onClick={() => updateQuery('')} aria-label="Aramayı temizle">×</button> : <kbd>/</kbd>}</div>
            <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Araçları sırala"><option value="featured">Öne çıkanlar</option><option value="az">A’dan Z’ye</option></select>
          </div>
          <div className="mobile-category-pills">
            <button className={category === 'all' ? 'active' : ''} onClick={() => updateCategory('all')}>Tümü</button>
            {categories.map((cat) => <button key={cat.id} className={category === cat.id ? 'active' : ''} onClick={() => updateCategory(cat.id)}>{cat.name}</button>)}
          </div>
          <div className="filter-result-line"><span><strong>{filtered.length}</strong> araç bulundu</span>{(query || category !== 'all') && <button type="button" onClick={() => { updateQuery(''); updateCategory('all') }}>Filtreleri temizle</button>}</div>
          <div className="tool-grid-cards">{visible.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}</div>
          {!visible.length && <div className="empty-state"><Icon name="search" size="lg" /><strong>Araç bulunamadı</strong><span>Farklı bir kelime deneyin veya filtreleri temizleyin.</span></div>}
        </div>
      </div>
    </section>
  )
}
