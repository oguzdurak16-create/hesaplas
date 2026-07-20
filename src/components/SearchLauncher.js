'use client'

import Icon from './Icon'

export default function SearchLauncher({ className = 'hero-search' }) {
  return <button className={className} type="button" onClick={() => window.dispatchEvent(new CustomEvent('hesaplas:open-search'))}><Icon name="search"/><span>Ne hesaplamak istiyorsunuz?</span><kbd>Ctrl K</kbd></button>
}
