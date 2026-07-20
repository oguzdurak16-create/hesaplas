'use client'

import { useEffect, useState } from 'react'
import Icon from './Icon'

function sendMetric(name, value, id) {
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'web_vital', {
        metric_name: name,
        metric_value: Math.round(name === 'CLS' ? value * 1000 : value),
        metric_id: id || '',
        non_interaction: true,
      })
    }
  } catch {}
}

function observeWebVitals() {
  if (!('PerformanceObserver' in window)) return () => {}
  const observers = []
  try {
    const lcp = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const last = entries[entries.length - 1]
      if (last) sendMetric('LCP', last.startTime, last.id)
    })
    lcp.observe({ type: 'largest-contentful-paint', buffered: true })
    observers.push(lcp)
  } catch {}
  try {
    let clsValue = 0
    const cls = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => { if (!entry.hadRecentInput) clsValue += entry.value })
      sendMetric('CLS', clsValue)
    })
    cls.observe({ type: 'layout-shift', buffered: true })
    observers.push(cls)
  } catch {}
  try {
    let maxDuration = 0
    const inp = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => { maxDuration = Math.max(maxDuration, entry.duration || 0) })
      if (maxDuration) sendMetric('INP', maxDuration)
    })
    inp.observe({ type: 'event', buffered: true, durationThreshold: 40 })
    observers.push(inp)
  } catch {}
  return () => observers.forEach((observer) => observer.disconnect())
}

export default function ModernWebFeatures() {
  const [installEvent, setInstallEvent] = useState(null)
  const [online, setOnline] = useState(true)

  useEffect(() => {
    setOnline(navigator.onLine)
    const onOnline = () => setOnline(true)
    const onOffline = () => setOnline(false)
    const onInstall = (event) => { event.preventDefault(); setInstallEvent(event) }
    const onInstalled = () => setInstallEvent(null)
    window.addEventListener('online', onOnline)
    window.addEventListener('offline', onOffline)
    window.addEventListener('beforeinstallprompt', onInstall)
    window.addEventListener('appinstalled', onInstalled)

    const schedule = window.requestIdleCallback || ((callback) => window.setTimeout(callback, 800))
    const cancel = window.cancelIdleCallback || window.clearTimeout
    const task = schedule(() => {
      if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => {})
    })
    const stopVitals = observeWebVitals()
    return () => {
      cancel(task)
      stopVitals()
      window.removeEventListener('online', onOnline)
      window.removeEventListener('offline', onOffline)
      window.removeEventListener('beforeinstallprompt', onInstall)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  const install = async () => {
    if (!installEvent) return
    await installEvent.prompt()
    await installEvent.userChoice
    setInstallEvent(null)
  }

  if (!online) return <div className="network-status offline" role="status"><Icon name="shield" size="sm" /> Çevrimdışısınız; daha önce açılan araçlar kullanılabilir.</div>
  if (!installEvent) return null
  return <aside className="install-prompt" aria-label="Hesaplas uygulamasını yükle">
    <span><Icon name="download" /><span><strong>Hesaplas’ı uygulama olarak yükleyin</strong><small>Daha hızlı açılış ve çevrimdışı erişim.</small></span></span>
    <button type="button" onClick={install}>Yükle</button>
    <button className="install-close" type="button" onClick={() => setInstallEvent(null)} aria-label="Kapat">×</button>
  </aside>
}
