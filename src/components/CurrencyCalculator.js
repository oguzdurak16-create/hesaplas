'use client'

import { useEffect, useMemo, useState } from 'react'

const currencies = ['TRY', 'USD', 'EUR', 'GBP', 'CHF', 'JPY', 'CAD', 'AUD']
const money = (value, currency) => new Intl.NumberFormat('tr-TR', { style: 'currency', currency, maximumFractionDigits: currency === 'JPY' ? 0 : 4 }).format(Number(value) || 0)

export default function CurrencyCalculator() {
  const [amount, setAmount] = useState(1000)
  const [from, setFrom] = useState('TRY')
  const [to, setTo] = useState('USD')
  const [rates, setRates] = useState(null)
  const [date, setDate] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [manualRate, setManualRate] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    const timer = window.setTimeout(() => controller.abort(), 8000)
    fetch('https://api.frankfurter.app/latest?from=TRY', { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('Kur alınamadı')))
      .then((data) => {
        setRates({ TRY: 1, ...data.rates })
        setDate(data.date || 'Güncel')
        setLoading(false)
      })
      .catch(() => { setError(true); setLoading(false) })
      .finally(() => window.clearTimeout(timer))
    return () => { controller.abort(); window.clearTimeout(timer) }
  }, [])

  const unitRate = useMemo(() => {
    if (!rates) return Number(manualRate) || 0
    return (rates[to] || 0) / (rates[from] || 1)
  }, [from, manualRate, rates, to])
  const converted = Number(amount || 0) * unitRate

  const swap = () => {
    setFrom(to); setTo(from)
    if (!rates && unitRate) setManualRate(1 / unitRate)
  }

  const copyResult = async () => {
    const text = `${money(Number(amount || 0), from)} = ${money(converted, to)}\n1 ${from} = ${unitRate.toLocaleString('tr-TR', { maximumFractionDigits: 6 })} ${to}`
    try {
      await navigator.clipboard.writeText(text)
      if (typeof window.gtag === 'function') window.gtag('event', 'currency_result_copy', { from_currency: from, to_currency: to })
    } catch {}
  }

  return (
    <div className="calculator-layout">
      <section className="calculator-form-card">
        <div className="form-card-head"><span>Kur bilgileri</span><small>{loading ? 'Kur yükleniyor…' : rates ? `Referans veri tarihi: ${date}` : 'Manuel kur modu'}</small></div>
        {error && <div className="validation-summary"><span>Canlı kur kaynağına ulaşılamadı. Yanlış veya eski bir kur göstermek yerine manuel kur alanı açıldı.</span></div>}
        <div className="field-group"><label htmlFor="currency-amount">Tutar</label><div className="input-wrap"><input id="currency-amount" type="number" value={amount} min="0" step="0.01" onChange={(e) => setAmount(e.target.value)} /><span>{from}</span></div></div>
        <div className="currency-row">
          <div className="field-group"><label htmlFor="currency-from">Kaynak</label><select id="currency-from" value={from} onChange={(e) => setFrom(e.target.value)}>{currencies.map((c) => <option key={c}>{c}</option>)}</select></div>
          <button className="swap-button" type="button" onClick={swap} aria-label="Para birimlerini değiştir">⇄</button>
          <div className="field-group"><label htmlFor="currency-to">Hedef</label><select id="currency-to" value={to} onChange={(e) => setTo(e.target.value)}>{currencies.map((c) => <option key={c}>{c}</option>)}</select></div>
        </div>
        {!rates && !loading && <div className="field-group manual-rate-field"><label htmlFor="manual-rate">1 {from} kaç {to}?</label><div className="input-wrap"><input id="manual-rate" type="number" min="0" step="0.000001" value={manualRate} onChange={(e) => setManualRate(e.target.value)} /><span>{to}</span></div></div>}
        <p className="form-disclaimer">Referans kur, banka veya döviz bürosu alış-satış fiyatı değildir.</p>
      </section>
      <section className="result-card">
        <div className="result-card-head"><div><div className="result-label">Çevrilen tutar</div><div className="result-main">{money(converted, to)}</div></div><button type="button" className="copy-button" onClick={copyResult}>Sonucu kopyala</button></div>
        <div className="result-list"><div><span>Girdi</span><strong>{money(Number(amount || 0), from)}</strong></div><div><span>Birim kur</span><strong>1 {from} = {unitRate.toLocaleString('tr-TR', { maximumFractionDigits: 6 })} {to}</strong></div>{unitRate > 0 && <div><span>Ters kur</span><strong>1 {to} = {(1 / unitRate).toLocaleString('tr-TR', { maximumFractionDigits: 6 })} {from}</strong></div>}</div>
      </section>
    </div>
  )
}
