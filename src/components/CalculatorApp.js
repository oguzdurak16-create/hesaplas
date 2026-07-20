'use client'

import { useEffect, useMemo, useState } from 'react'
import { toolMap } from '@/data/tools'
import CurrencyCalculator from './CurrencyCalculator'
import Icon from './Icon'

function defaultValues(tool) {
  const today = new Date().toISOString().slice(0, 10)
  return Object.fromEntries(tool.fields.map((field) => [field.key, field.default === 'today' ? today : (field.default ?? '')]))
}

function valuesFromUrl(tool, defaults) {
  if (typeof window === 'undefined') return defaults
  const params = new URLSearchParams(window.location.search)
  const next = { ...defaults }
  tool.fields.forEach((field) => {
    if (params.has(field.key)) next[field.key] = params.get(field.key)
  })
  return next
}

function trackTool(slug) {
  try {
    const key = 'hesaplas_recent_tools_v1'
    const current = JSON.parse(localStorage.getItem(key) || '[]').filter((item) => item !== slug)
    localStorage.setItem(key, JSON.stringify([slug, ...current].slice(0, 6)))
  } catch {}
}

function trackEvent(name, params = {}) {
  try {
    if (typeof window.gtag === 'function') window.gtag('event', name, params)
  } catch {}
}

function validate(tool, values) {
  const fields = {}
  const general = []

  tool.fields.forEach((field) => {
    const raw = values[field.key]
    if (field.type === 'number') {
      const value = Number(String(raw ?? '').replace(',', '.'))
      if (raw === '' || !Number.isFinite(value)) fields[field.key] = 'Geçerli bir sayı girin.'
      else if (field.min !== undefined && value < field.min) fields[field.key] = `En az ${field.min} girilebilir.`
      else if (field.max !== undefined && value > field.max) fields[field.key] = `En fazla ${field.max} girilebilir.`
    }
    if (field.type === 'date' && raw && Number.isNaN(new Date(raw).getTime())) fields[field.key] = 'Geçerli bir tarih girin.'
  })

  ;(tool.constraints || []).forEach((constraint) => {
    const total = constraint.keys.reduce((sum, key) => sum + Number(values[key] || 0), 0)
    if (constraint.max !== undefined && total > constraint.max) general.push(constraint.message)
    if (constraint.min !== undefined && total < constraint.min) general.push(constraint.message)
  })

  return { valid: !Object.keys(fields).length && !general.length, fields, general }
}

function scenarioStorageKey(slug) { return `hesaplas_scenarios_v1_${slug}` }

export default function CalculatorApp({ slug }) {
  const tool = toolMap[slug]
  const defaults = useMemo(() => defaultValues(tool), [tool])
  const [values, setValues] = useState(defaults)
  const [feedback, setFeedback] = useState('')
  const [scenarios, setScenarios] = useState([])
  const validation = useMemo(() => validate(tool, values), [tool, values])
  const output = useMemo(() => {
    if (!validation.valid) return null
    try { return tool.calculate(values) } catch { return null }
  }, [tool, values, validation.valid])

  useEffect(() => {
    setValues(valuesFromUrl(tool, defaults))
    trackTool(slug)
    trackEvent('tool_view', { tool_slug: slug, tool_category: tool.category })
    try { setScenarios(JSON.parse(localStorage.getItem(scenarioStorageKey(slug)) || '[]')) } catch {}
  }, [defaults, slug, tool])

  if (tool.special === 'currency') return <CurrencyCalculator />

  const flash = (message) => { setFeedback(message); window.setTimeout(() => setFeedback(''), 2000) }
  const update = (key, value) => setValues((current) => ({ ...current, [key]: value }))
  const resultText = () => !output ? '' : [`${tool.title} - Hesaplas.com`, ...output.summary.map((row) => `${row.label}: ${row.value}`), ...output.details.map((row) => `${row.label}: ${row.value}`)].join('\n')

  const calculate = () => {
    if (!validation.valid) { flash('Hatalı alanları düzeltin'); return }
    trackEvent('calculator_submit', { tool_slug: slug, tool_category: tool.category })
    document.querySelector('.result-card')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }

  const copyResult = async () => {
    if (!output) return
    try { await navigator.clipboard.writeText(resultText()); flash('Sonuç kopyalandı'); trackEvent('result_copy', { tool_slug: slug }) } catch { flash('Kopyalanamadı') }
  }

  const shareResult = async () => {
    if (!validation.valid) { flash('Önce hatalı alanları düzeltin'); return }
    const params = new URLSearchParams()
    tool.fields.forEach((field) => params.set(field.key, values[field.key] ?? ''))
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`
    window.history.replaceState({}, '', url)
    try {
      if (navigator.share) await navigator.share({ title: tool.title, text: 'Hesaplama senaryosu', url })
      else await navigator.clipboard.writeText(url)
      flash(navigator.share ? 'Paylaşım açıldı' : 'Bağlantı kopyalandı')
      trackEvent('result_share', { tool_slug: slug })
    } catch (error) {
      if (error?.name !== 'AbortError') flash('Bağlantı hazırlanamadı')
    }
  }

  const reset = () => {
    setValues(defaults)
    window.history.replaceState({}, '', window.location.pathname)
    flash('Alanlar sıfırlandı')
  }

  const saveScenario = () => {
    if (!output || !validation.valid) { flash('Geçerli bir sonuç oluşturun'); return }
    const snapshot = {
      id: Date.now(),
      createdAt: new Date().toLocaleString('tr-TR', { dateStyle: 'short', timeStyle: 'short' }),
      inputs: tool.fields.map((field) => ({ label: field.label, value: `${values[field.key]}${field.suffix ? ` ${field.suffix}` : ''}` })),
      summary: output.summary,
    }
    const next = [snapshot, ...scenarios].slice(0, 3)
    setScenarios(next)
    localStorage.setItem(scenarioStorageKey(slug), JSON.stringify(next))
    flash('Senaryo kaydedildi')
    trackEvent('scenario_save', { tool_slug: slug })
  }

  const removeScenario = (id) => {
    const next = scenarios.filter((scenario) => scenario.id !== id)
    setScenarios(next)
    localStorage.setItem(scenarioStorageKey(slug), JSON.stringify(next))
  }

  return (
    <div className="calculator-layout">
      <section className="calculator-form-card">
        <div className="form-card-head"><div><span>Bilgileri girin</span><small>Alanları kendi senaryonuza göre düzenleyin</small></div><b className="form-step">01</b></div>
        <form onSubmit={(e) => { e.preventDefault(); calculate() }} noValidate>
          <div className="fields-grid">
            {tool.fields.map((field) => {
              const helpId = field.help ? `${slug}-${field.key}-help` : undefined
              const errorId = validation.fields[field.key] ? `${slug}-${field.key}-error` : undefined
              return <div className={`field-group ${tool.fields.length === 3 && field.key === tool.fields[2]?.key ? 'field-wide-mobile' : ''}`} key={field.key}>
                <label htmlFor={`${slug}-${field.key}`}>{field.label}</label>
                {field.type === 'select' ? (
                  <select id={`${slug}-${field.key}`} value={values[field.key]} aria-describedby={helpId} onChange={(e) => update(field.key, e.target.value)}>
                    {field.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </select>
                ) : (
                  <div className={`input-wrap ${validation.fields[field.key] ? 'has-error' : ''}`}>
                    <input id={`${slug}-${field.key}`} type={field.type || 'number'} inputMode={field.type === 'number' ? 'decimal' : undefined} value={values[field.key]} min={field.min} max={field.max} step={field.step || (field.type === 'number' ? 'any' : undefined)} aria-invalid={!!validation.fields[field.key]} aria-describedby={[helpId, errorId].filter(Boolean).join(' ') || undefined} onChange={(e) => update(field.key, e.target.value)} />
                    {field.suffix && <span>{field.suffix}</span>}
                  </div>
                )}
                {field.help && <small id={helpId} className="field-help">{field.help}</small>}
                {validation.fields[field.key] && <small id={errorId} className="field-error">{validation.fields[field.key]}</small>}
              </div>
            })}
          </div>
          {!!validation.general.length && <div className="validation-summary" role="alert">{validation.general.map((message) => <span key={message}>{message}</span>)}</div>}
          <button className="calculate-button" type="submit" disabled={!validation.valid}>Hesapla <Icon name="arrow" size="sm" /></button>
          <div className="calculator-actions" aria-label="Hesaplama işlemleri">
            <button type="button" onClick={reset}><Icon name="refresh" size="sm" /> Sıfırla</button>
            <button type="button" onClick={shareResult}><Icon name="repeat" size="sm" /> Paylaş</button>
            <button type="button" onClick={saveScenario}><Icon name="clipboard" size="sm" /> Kaydet</button>
            <button type="button" onClick={() => window.print()}><Icon name="receipt" size="sm" /> Yazdır</button>
          </div>
          {feedback && <div className="action-feedback" role="status">{feedback}</div>}
        </form>
      </section>

      <section className="result-card" aria-live="polite">
        <div className="result-card-head"><div><span className="result-kicker">Hesaplama sonucu</span><h2>{tool.shortTitle || tool.title}</h2></div><button onClick={copyResult} className="copy-button" type="button" disabled={!output}><Icon name="copy" size="sm" /> Sonucu kopyala</button></div>
        {output ? <>
          <div className="summary-grid">
            {output.summary.map((row, index) => <div key={`${row.label}-${index}`} className={`summary-item ${row.tone || ''}`}><span>{row.label}</span><strong>{row.value}</strong></div>)}
          </div>
          {!!output.details.length && <div className="result-list">{output.details.map((row, index) => <div key={`${row.label}-${index}`}><span>{row.label}</span><strong>{row.value}</strong></div>)}</div>}
          {output.note && <p className="result-note">{output.note}</p>}
        </> : <div className="result-placeholder">Hesaplama için hatalı alanları düzeltin.</div>}
      </section>

      {!!scenarios.length && <section className="scenario-card">
        <div className="table-head"><div><span className="eyebrow">Yerel karşılaştırma</span><h2>Kaydedilen senaryolar</h2></div><small>En fazla 3 senaryo</small></div>
        <div className="scenario-grid">{scenarios.map((scenario) => <article key={scenario.id}>
          <div className="scenario-head"><span>{scenario.createdAt}</span><button type="button" onClick={() => removeScenario(scenario.id)} aria-label="Senaryoyu sil">×</button></div>
          <div className="scenario-summary">{scenario.summary.map((row) => <div key={row.label}><span>{row.label}</span><strong>{row.value}</strong></div>)}</div>
          <details><summary>Girilen değerler</summary><div className="scenario-inputs">{scenario.inputs.map((row) => <span key={row.label}>{row.label}: <b>{row.value}</b></span>)}</div></details>
        </article>)}</div>
        <p className="local-note">Senaryolar yalnızca bu tarayıcıda saklanır.</p>
      </section>}

      {output?.table && <section className="payment-table-card">
        <div className="table-head"><div><span className="eyebrow">İlk dönemler</span><h2>Örnek ödeme planı</h2></div><small>İlk 12 ay gösterilir</small></div>
        <div className="table-scroll"><table><thead><tr>{output.table.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead><tbody>{output.table.rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>)}</tbody></table></div>
      </section>}
    </div>
  )
}
