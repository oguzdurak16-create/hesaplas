'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Icon from './Icon'

export default function MobileDock() {
  const pathname = usePathname()
  const openSearch = () => window.dispatchEvent(new CustomEvent('hesaplas:open-search'))
  return <nav className="mobile-dock" aria-label="Mobil hızlı menü">
    <Link href="/" className={pathname === '/' ? 'active' : ''}><Icon name="home" /><span>Ana sayfa</span></Link>
    <button type="button" onClick={openSearch}><Icon name="search" /><span>Ara</span></button>
    <Link href="/tum-araclar/" className={pathname === '/tum-araclar/' ? 'active' : ''}><Icon name="grid" /><span>Araçlar</span></Link>
    <Link href="/#favoriler"><Icon name="star" /><span>Favoriler</span></Link>
  </nav>
}
