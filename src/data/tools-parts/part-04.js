import { n, money, number, integer, percent, daysBetween, addDays, formatDate, payment, result, item, examNet } from '../tool-utils'

export const toolsPart04 = [
{
    slug: 'hamilelik-hesaplama', title: 'Hamilelik ve Tahmini Doğum Tarihi', shortTitle: 'Hamilelik', category: 'saglik', icon: 'baby', badge: 'Takvim',
    description: 'Son adet tarihine göre tahmini doğum tarihini ve seçilen tarihteki gebelik haftasını hesaplayın.',
    keywords: ['hamilelik hesaplama', 'doğum tarihi hesaplama', 'gebelik haftası'],
    fields: [
      { key: 'lastPeriod', label: 'Son adet tarihinin ilk günü', type: 'date', default: '2026-01-01' },
      { key: 'checkDate', label: 'Hesaplama tarihi', type: 'date', default: 'today' },
    ],
    calculate: (v) => {
      const days = daysBetween(v.lastPeriod, v.checkDate), weeks = Math.floor(days / 7), rem = days % 7, due = addDays(v.lastPeriod, 280), remaining = Math.max(0, daysBetween(v.checkDate, due))
      return result([item('Tahmini doğum tarihi', formatDate(due), 'primary'), item('Gebelik haftası', `${weeks} hafta ${rem} gün`), item('Tahmini kalan süre', `${integer(remaining)} gün`)], [item('Toplam geçen gün', `${integer(days)} gün`), item('Tahmini gebelik süresi', '40 hafta')], 'Tahmini sonuçtur; ultrason ve hekim değerlendirmesi esas alınır.')
    },
  },
{
    slug: 'emeklilik-hesaplama', title: 'Emeklilik Tarihi Planlama', shortTitle: 'Emeklilik', category: 'saglik', icon: 'calendar-check', badge: 'Planlama',
    description: 'Doğum tarihi ve hedef emeklilik yaşına göre hedef tarihi ve kalan süreyi hesaplayın.',
    keywords: ['emeklilik hesaplama', 'emeklilik yaşı', 'emeklilik tarihi'],
    fields: [
      { key: 'birth', label: 'Doğum tarihi', type: 'date', default: '1990-01-01' },
      { key: 'targetAge', label: 'Hedef emeklilik yaşı', type: 'number', default: 60, min: 18, max: 80, suffix: 'yaş' },
      { key: 'today', label: 'Hesaplama tarihi', type: 'date', default: 'today' },
    ],
    calculate: (v) => {
      const birth = new Date(v.birth), target = new Date(v.birth); target.setFullYear(target.getFullYear() + n(v.targetAge)); const days = Math.max(0, daysBetween(v.today, target)), years = days / 365
      return result([item('Hedef tarih', formatDate(target), 'primary'), item('Kalan süre', `${number(years)} yıl`), item('Kalan gün', `${integer(days)} gün`)], [item('Hedef yaş', `${integer(n(v.targetAge))} yaş`), item('Doğum tarihi', formatDate(birth))], 'Bu araç SGK hak sahipliği hesabı yapmaz; yalnızca yaşa dayalı planlama sunar.')
    },
  },
{
    slug: 'yuzde-hesaplama', title: 'Yüzde Hesaplama', shortTitle: 'Yüzde', category: 'pratik', icon: 'percent', badge: 'Hızlı',
    description: 'Bir sayının yüzdesini, iki sayı arasındaki yüzde değişimi ve oranı tek ekranda hesaplayın.',
    keywords: ['yüzde hesaplama', 'yüzde değişim', 'oran hesaplama'],
    fields: [
      { key: 'base', label: 'Ana sayı', type: 'number', default: 1000, step: 0.01 },
      { key: 'rate', label: 'Yüzde oranı', type: 'number', default: 20, step: 0.01, suffix: '%' },
      { key: 'second', label: 'Karşılaştırılan sayı', type: 'number', default: 1250, step: 0.01 },
    ],
    calculate: (v) => {
      const base = n(v.base), rate = n(v.rate), second = n(v.second), part = base * rate / 100, change = base ? (second - base) / base * 100 : 0
      return result([item(`${percent(rate)} karşılığı`, number(part), 'primary'), item('Yüzde değişim', percent(change), change >= 0 ? 'success' : 'danger'), item('İkinci sayının oranı', percent(base ? second / base * 100 : 0))], [item('Ana sayı + yüzde', number(base + part)), item('Ana sayı - yüzde', number(base - part)), item('Fark', number(second - base))])
    },
  },
{
    slug: 'indirim-hesaplama', title: 'İndirim Hesaplama', shortTitle: 'İndirim', category: 'pratik', icon: 'tag', badge: 'Alışveriş',
    description: 'Etiket fiyatı ve indirim oranına göre indirim tutarını ve ödenecek son fiyatı hesaplayın.',
    keywords: ['indirim hesaplama', 'indirimli fiyat', 'yüzde indirim'],
    fields: [
      { key: 'price', label: 'Etiket fiyatı', type: 'number', default: 2500, min: 0, suffix: 'TL' },
      { key: 'discount', label: 'İndirim oranı', type: 'number', default: 25, min: 0, max: 100, step: 0.01, suffix: '%' },
      { key: 'extra', label: 'Ek indirim oranı', type: 'number', default: 0, min: 0, max: 100, step: 0.01, suffix: '%' },
    ],
    calculate: (v) => {
      const price = n(v.price), first = price * (1 - n(v.discount) / 100), final = first * (1 - n(v.extra) / 100), saved = price - final
      return result([item('Ödenecek fiyat', money(final), 'primary'), item('Toplam indirim', money(saved), 'success'), item('Efektif indirim', percent(price ? saved / price * 100 : 0))], [item('İlk indirim sonrası', money(first)), item('Etiket fiyatı', money(price)), item('Ek indirim', percent(n(v.extra)))])
    },
  },
{
    slug: 'yas-hesaplama', title: 'Yaş Hesaplama', shortTitle: 'Yaş', category: 'pratik', icon: 'cake', badge: 'Takvim',
    description: 'Doğum tarihinizden tam yaşınızı, toplam ay ve gün sayısını ve bir sonraki doğum gününü hesaplayın.',
    keywords: ['yaş hesaplama', 'kaç yaşındayım', 'doğum tarihi hesaplama'],
    fields: [
      { key: 'birth', label: 'Doğum tarihi', type: 'date', default: '1990-01-01' },
      { key: 'today', label: 'Hesaplama tarihi', type: 'date', default: 'today' },
    ],
    calculate: (v) => {
      const birth = new Date(v.birth), today = new Date(v.today), days = daysBetween(v.birth, v.today)
      let age = today.getFullYear() - birth.getFullYear(); const before = today.getMonth() < birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate()); if (before) age--
      const next = new Date(today.getFullYear(), birth.getMonth(), birth.getDate()); if (next < today) next.setFullYear(next.getFullYear() + 1)
      return result([item('Tam yaş', `${age} yaş`, 'primary'), item('Toplam gün', `${integer(days)} gün`), item('Sonraki doğum günü', formatDate(next))], [item('Toplam ay yaklaşık', `${integer(days / 30.4375)} ay`), item('Kalan gün', `${integer(daysBetween(v.today, next))} gün`)])
    },
  },
{
    slug: 'tarih-farki-hesaplama', title: 'İki Tarih Arası Gün Hesaplama', shortTitle: 'Tarih Farkı', category: 'pratik', icon: 'calendar-range', badge: 'Pratik',
    description: 'İki tarih arasındaki toplam gün, hafta, ay ve iş günü tahminini hesaplayın.',
    keywords: ['iki tarih arası gün', 'tarih farkı hesaplama', 'gün sayısı'],
    fields: [
      { key: 'start', label: 'Başlangıç tarihi', type: 'date', default: '2026-01-01' },
      { key: 'end', label: 'Bitiş tarihi', type: 'date', default: '2026-07-17' },
    ],
    calculate: (v) => {
      const days = daysBetween(v.start, v.end), weeks = days / 7, months = days / 30.4375
      let weekdays = 0, d = new Date(v.start), end = new Date(v.end); while (d < end && days < 5000) { const day = d.getDay(); if (day !== 0 && day !== 6) weekdays++; d.setDate(d.getDate() + 1) }
      return result([item('Toplam gün', `${integer(days)} gün`, 'primary'), item('Hafta karşılığı', `${number(weeks)} hafta`), item('Ay karşılığı', `${number(months)} ay`)], [item('Hafta içi gün tahmini', `${integer(weekdays)} gün`), item('Takvim günü', `${integer(days)} gün`)], 'Resmi tatiller iş günü hesabından düşülmemiştir.')
    },
  },
{
    slug: 'birim-fiyat-hesaplama', title: 'Birim Fiyat Karşılaştırma', shortTitle: 'Birim Fiyat', category: 'pratik', icon: 'shopping-cart', badge: 'Alışveriş',
    description: 'Farklı gramaj ve adetlerdeki ürünlerin birim fiyatını karşılaştırarak daha avantajlı seçeneği bulun.',
    keywords: ['birim fiyat hesaplama', 'gram fiyatı', 'ürün karşılaştırma'],
    fields: [
      { key: 'priceA', label: 'A ürünü fiyatı', type: 'number', default: 120, min: 0, suffix: 'TL' },
      { key: 'amountA', label: 'A ürünü miktarı', type: 'number', default: 750, min: 0.01, suffix: 'birim' },
      { key: 'priceB', label: 'B ürünü fiyatı', type: 'number', default: 95, min: 0, suffix: 'TL' },
      { key: 'amountB', label: 'B ürünü miktarı', type: 'number', default: 500, min: 0.01, suffix: 'birim' },
    ],
    calculate: (v) => {
      const pa = n(v.priceA), aa = Math.max(0.01, n(v.amountA)), pb = n(v.priceB), ab = Math.max(0.01, n(v.amountB)), ua = pa / aa, ub = pb / ab, cheaper = ua <= ub ? 'A ürünü' : 'B ürünü', saving = Math.abs(ua - ub) / Math.max(ua, ub) * 100
      return result([item('Daha avantajlı', cheaper, 'primary'), item('A birim fiyatı', `${number(ua)} TL`), item('B birim fiyatı', `${number(ub)} TL`)], [item('Birim fiyat farkı', `${number(Math.abs(ua - ub))} TL`), item('Avantaj oranı', percent(saving))])
    },
  },
{
    slug: 'taksit-hesaplama', title: 'Taksit ve Vade Farkı Hesaplama', shortTitle: 'Taksit', category: 'pratik', icon: 'split', badge: 'Alışveriş',
    description: 'Peşin fiyat, taksit sayısı ve vade farkına göre aylık taksit ve toplam ödeme tutarını hesaplayın.',
    keywords: ['taksit hesaplama', 'vade farkı', 'aylık ödeme'],
    fields: [
      { key: 'cash', label: 'Peşin fiyat', type: 'number', default: 30000, min: 0, suffix: 'TL' },
      { key: 'months', label: 'Taksit sayısı', type: 'number', default: 6, min: 1, max: 60, suffix: 'ay' },
      { key: 'difference', label: 'Toplam vade farkı', type: 'number', default: 12, min: 0, step: 0.01, suffix: '%' },
    ],
    calculate: (v) => {
      const cash = n(v.cash), months = Math.max(1, n(v.months)), diff = n(v.difference), total = cash * (1 + diff / 100), installment = total / months
      return result([item('Aylık taksit', money(installment), 'primary'), item('Toplam ödeme', money(total)), item('Vade farkı tutarı', money(total - cash), 'warning')], [item('Peşin fiyat', money(cash)), item('Taksit', `${integer(months)} ay`), item('Toplam fark', percent(diff))])
    },
  }
]
