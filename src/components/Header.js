'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import Icon from './Icon'
import ThemeToggle from './ThemeToggle'
import ToolSearchDialog from './ToolSearchDialog'

const links = [
  { name: 'Finans', href: '/tum-araclar/#finans' },
  { name: 'Maaş', href: '/tum-araclar/#maas-vergi' },
  { name: 'Ev & Yaşam', href: '/tum-araclar/#ev-yasam' },
  { name: 'Sağlık', href: '/tum-araclar/#saglik' },
  { name: 'Eğitim', href: '/tum-araclar/#egitim' },
]

const allToolsButtonStyle = {
  color: '#ffffff',
  background: 'linear-gradient(135deg, #2563eb 0%, #5b45d8 100%)',
  border: '1px solid rgba(255,255,255,.12)',
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const closeSearch = useCallback(() => setSearchOpen(false), [])

  useEffect(() => {
    const shortcut = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); setSearchOpen(true) }
      if (event.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) { event.preventDefault(); setSearchOpen(true) }
    }
    const external = () => setSearchOpen(true)
    window.addEventListener('keydown', shortcut)
    window.addEventListener('hesaplas:open-search', external)
    return () => { window.removeEventListener('keydown', shortcut); window.removeEventListener('hesaplas:open-search', external) }
  }, [])

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <Link href="/" className="brand" onClick={() => setOpen(false)} aria-label="Hesaplas.com ana sayfa">
            <span className="brand-mark"><Icon name="calculator" size="sm" /></span>
            <span>hesaplas<strong>.com</strong></span>
          </Link>
          <nav className="desktop-nav" aria-label="Ana menü">
            {links.map((link) => <Link key={link.href} href={link.href}>{link.name}</Link>)}
          </nav>
          <div className="header-actions">
            <button className="header-search-button" type="button" onClick={() => setSearchOpen(true)}><Icon name="search" size="sm" /><span>Araç ara</span><kbd>Ctrl K</kbd></button>
            <ThemeToggle />
            <Link className="all-tools-button" style={allToolsButtonStyle} href="/tum-araclar/"><Icon name="grid" size="sm" /> <span>Tüm araçlar</span></Link>
            <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Menüyü aç veya kapat"><Icon name={open ? 'close' : 'menu'} /></button>
          </div>
        </div>
        {open && (
          <nav className="mobile-nav" aria-label="Mobil menü">
            <button type="button" className="mobile-search-link" onClick={() => { setOpen(false); setSearchOpen(true) }}><Icon name="search" /> Araç ara</button>
            {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.name}<Icon name="arrow" size="sm" /></Link>)}
            <Link href="/tum-araclar/" onClick={() => setOpen(false)}>Tüm hesaplama araçları<Icon name="grid" size="sm" /></Link>
          </nav>
        )}
      </header>
      <ToolSearchDialog open={searchOpen} onClose={closeSearch} />
    </>
  )
}
