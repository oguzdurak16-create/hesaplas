'use client'

import { useEffect, useState } from 'react'
import Icon from './Icon'

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light')
  useEffect(() => { setTheme(document.documentElement.dataset.theme || 'light') }, [])
  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    localStorage.setItem('hesaplas_theme_v1', next)
    setTheme(next)
  }
  return <button type="button" className="theme-toggle" onClick={toggle} aria-label={theme === 'dark' ? 'Açık temaya geç' : 'Koyu temaya geç'}><Icon name={theme === 'dark' ? 'sun' : 'moon'} size="sm" /></button>
}
