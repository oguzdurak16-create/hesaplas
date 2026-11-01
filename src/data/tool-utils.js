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
export const isCalendarDate = (value) => {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const date = new Date(`${value}T00:00:00Z`)
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value
}
// Count Monday–Friday in [start, end), independently of the browser time zone.
export const weekdaysBetween = (start, end) => {
  if (!isCalendarDate(start) || !isCalendarDate(end) || end < start) throw new RangeError('Geçerli ve sıralı tarihler girin.')
  const first = new Date(`${start}T00:00:00Z`)
  const days = (new Date(`${end}T00:00:00Z`) - first) / 86400000
  let count = Math.floor(days / 7) * 5
  for (let offset = 0; offset < days % 7; offset++) {
    const day = (first.getUTCDay() + offset) % 7
    if (day !== 0 && day !== 6) count++
  }
  return count
}
export const daysBetween = (a, b) => Math.max(0, Math.round((new Date(b) - new Date(a)) / 86400000))
export const addDays = (date, days) => {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}
export const formatDate = (date) => {
  const parsed = date instanceof Date ? date : new Date(`${date}T12:00:00`)
  if (Number.isNaN(parsed.getTime())) return 'Geçersiz tarih'
  return new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }).format(parsed)
}
export const payment = (principal, monthlyRate, months) => {
  const r = monthlyRate / 100
  if (!months) return 0
  if (!r) return principal / months
  // log1p/expm1 retain precision when the monthly rate is close to zero.
  return principal * r / -Math.expm1(-months * Math.log1p(r))
}
export const result = (summary, details = [], note = '', table = null) => ({ summary, details, note, table })
export const item = (label, value, tone = '') => ({ label, value, tone })
export const examNet = (correct, wrong, penalty = 4) => n(correct) - (n(wrong) / penalty)
