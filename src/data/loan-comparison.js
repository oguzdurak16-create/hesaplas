import { payment } from './tool-utils.js'
export function compareLoanOffers(v) {
  const { principal, monthsA, monthsB, rateA, rateB, feeA, feeB } = v
  if (![principal, monthsA, monthsB, rateA, rateB, feeA, feeB].every(Number.isFinite) || principal <= 0 || principal > 1e12 || ![monthsA, monthsB].every(n => Number.isInteger(n) && n >= 1 && n <= 600) || [rateA, rateB].some(r => r < 0 || r > 100) || [feeA, feeB].some(f => f < 0 || f > 1e12)) throw new RangeError('Geçerli tutar, tam ay vade, faiz ve masraf girin.')
  const monthlyA = payment(principal, rateA, monthsA), monthlyB = payment(principal, rateB, monthsB)
  const totalA = monthlyA * monthsA + feeA, totalB = monthlyB * monthsB + feeB
  if (![monthlyA, monthlyB, totalA, totalB].every(Number.isFinite)) throw new RangeError('Hesaplama aralığı aşıldı.')
  return { monthlyA, monthlyB, totalA, totalB, costA: totalA - principal, costB: totalB - principal, difference: Math.abs(totalA - totalB) }
}
