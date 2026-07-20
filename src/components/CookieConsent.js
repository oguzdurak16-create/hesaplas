'use client'

import { useEffect, useState } from 'react'

const KEY = 'hesaplas_cookie_consent_v3'
const ADSENSE_CLIENT = 'ca-pub-4491868887846507'
const base = { necessary: true, analytics: false, ads: false }

function loadAds() {
  if (typeof document === 'undefined' || document.getElementById('adsense-loader')) return
  const script = document.createElement('script')
  script.id = 'adsense-loader'
  script.async = true
  script.crossOrigin = 'anonymous'
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`
  document.head.appendChild(script)
}

function updateConsent(value) {
  if (typeof window.gtag !== 'function') return
  window.gtag('consent', 'update', {
    analytics_storage: value.analytics ? 'granted' : 'denied',
    ad_storage: value.ads ? 'granted' : 'denied',
    ad_user_data: value.ads ? 'granted' : 'denied',
    ad_personalization: value.ads ? 'granted' : 'denied',
  })
  if (value.ads) loadAds()
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false)
  const [details, setDetails] = useState(false)
  const [prefs, setPrefs] = useState(base)

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || 'null')
      if (saved) { setPrefs({ ...base, ...saved }); updateConsent(saved) } else setOpen(true)
    } catch { setOpen(true) }
  }, [])

  const save = (next) => {
    const normalized = { ...base, ...next, necessary: true, savedAt: new Date().toISOString() }
    localStorage.setItem(KEY, JSON.stringify(normalized)); setPrefs(normalized); updateConsent(normalized); setOpen(false)
  }

  return (
    <>
      {open && <div className="cookie-panel" role="dialog" aria-modal="true" aria-label="Çerez tercihleri">
        <div className="cookie-head"><div><span className="eyebrow">Gizlilik ayarları</span><h2>Çerez tercihleri</h2></div><button onClick={() => setOpen(false)} aria-label="Kapat">×</button></div>
        <p>Zorunlu çerezler siteyi çalıştırır. Analitik ve reklam depolaması yalnızca izninizle açılır.</p>
        {details && <div className="cookie-options">
          <label><span><strong>Zorunlu</strong><small>Temel çalışma ve tercih kaydı.</small></span><input type="checkbox" checked readOnly /></label>
          <label><span><strong>Analitik</strong><small>Google Analytics kullanım ölçümü.</small></span><input type="checkbox" checked={prefs.analytics} onChange={() => setPrefs({ ...prefs, analytics: !prefs.analytics })} /></label>
          <label><span><strong>Reklam</strong><small>Kişiselleştirilmiş reklam depolaması.</small></span><input type="checkbox" checked={prefs.ads} onChange={() => setPrefs({ ...prefs, ads: !prefs.ads })} /></label>
        </div>}
        <div className="cookie-actions"><button className="button ghost" onClick={() => setDetails(!details)}>Ayarlar</button><button className="button ghost" onClick={() => save(base)}>Reddet</button><button className="button primary" onClick={() => save(details ? prefs : { necessary: true, analytics: true, ads: true })}>{details ? 'Kaydet' : 'Tümünü kabul et'}</button></div>
      </div>}
      {!open && <button className="cookie-trigger" onClick={() => setOpen(true)}>Çerezler</button>}
    </>
  )
}
