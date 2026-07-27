'use client'

import { useEffect, useState } from 'react'

const KEY = 'hesaplas_cookie_consent_v3'
const base = { necessary: true, analytics: false, ads: false }

function updateConsent(value) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || function gtag(){ window.dataLayer.push(arguments) }
  window.gtag('consent', 'update', {
    analytics_storage: value.analytics ? 'granted' : 'denied',
    ad_storage: value.ads ? 'granted' : 'denied',
    ad_user_data: value.ads ? 'granted' : 'denied',
    ad_personalization: value.ads ? 'granted' : 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
  })
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
    localStorage.setItem(KEY, JSON.stringify(normalized))
    setPrefs(normalized)
    updateConsent(normalized)
    setOpen(false)
  }

  return (
    <>
      {open && <div className="cookie-panel" role="dialog" aria-modal="true" aria-label="Çerez tercihleri">
        <div className="cookie-head"><div><span className="eyebrow">Gizlilik ayarları</span><h2>Çerez tercihleri</h2></div><button onClick={() => setOpen(false)} aria-label="Kapat">×</button></div>
        <p>Zorunlu kayıtlar siteyi çalıştırır. Analitik ölçüm ile reklam depolaması ve kişiselleştirme yalnızca izninizle etkinleşir.</p>
        {details && <div className="cookie-options">
          <label><span><strong>Zorunlu</strong><small>Temel çalışma, güvenlik ve tercih kaydı.</small></span><input type="checkbox" checked readOnly /></label>
          <label><span><strong>Analitik</strong><small>Google Analytics ile anonim kullanım ve performans ölçümü.</small></span><input type="checkbox" checked={prefs.analytics} onChange={() => setPrefs({ ...prefs, analytics: !prefs.analytics })} /></label>
          <label><span><strong>Reklam</strong><small>Google AdSense reklam ölçümü, depolaması ve kişiselleştirme tercihleri.</small></span><input type="checkbox" checked={prefs.ads} onChange={() => setPrefs({ ...prefs, ads: !prefs.ads })} /></label>
        </div>}
        <div className="cookie-actions"><button className="button ghost" onClick={() => setDetails(!details)}>Ayarlar</button><button className="button ghost" onClick={() => save(base)}>Tümünü reddet</button><button className="button primary" onClick={() => save(details ? prefs : { necessary: true, analytics: true, ads: true })}>{details ? 'Seçimleri kaydet' : 'Tümünü kabul et'}</button></div>
      </div>}
      {!open && <button className="cookie-trigger" onClick={() => setOpen(true)}>Çerezler</button>}
    </>
  )
}
