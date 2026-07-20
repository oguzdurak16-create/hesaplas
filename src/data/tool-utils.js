const trMoney = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 2 })
const trNumber = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 })
const trInteger = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 })
const usdMoney = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 4 })

export const n = (value) => {
  const parsed = Number(String(value ?? '').replace(',', '.'))
  return Number.isFinite(parsed) ? parsed : 0
}
export const money = (value) => trMoney.format(Number.isFinite(value) ? value : 0)
export const number = (value) => trNumber.format(Number.isFinite(value) ? value : 0)
export const integer = (value) => trInteger.format(Number.isFinite(value) ? value : 0)
export const usd = (value) => usdMoney.format(Number.isFinite(value) ? value : 0)
export const percent = (value) => `%${number(value)}`
export const daysBetween = (a, b) => Math.max(0, Math.round((new Date(b) - new Date(a)) / 86400000))
export const addDays = (date, days) => {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}
export const formatDate = (date) => new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }).format(date)
export const payment = (principal, monthlyRate, months) => {
  const r = monthlyRate / 100
  if (!months) return 0
  if (!r) return principal / months
  return principal * (r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1)
}
export const result = (summary, details = [], note = '', table = null) => ({ summary, details, note, table })
export const item = (label, value, tone = '') => ({ label, value, tone })
export const examNet = (correct, wrong, penalty = 4) => n(correct) - (n(wrong) / penalty)
