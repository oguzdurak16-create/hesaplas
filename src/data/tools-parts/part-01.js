import { n, money, number, integer, percent, daysBetween, addDays, formatDate, payment, result, item, examNet } from '../tool-utils'

export const toolsPart01 = [
{
    slug: 'kredi-hesaplama', title: 'Kredi Hesaplama', shortTitle: 'Kredi', category: 'finans', icon: 'landmark', badge: 'Popüler', trend: true,
    description: 'Kredi tutarı, aylık faiz ve vadeye göre taksit, toplam geri ödeme ve örnek ödeme planını hesaplayın.',
    keywords: ['kredi hesaplama', 'kredi taksit hesaplama', 'faiz hesaplama', 'ödeme planı'],
    fields: [
      { key: 'principal', label: 'Kredi tutarı', type: 'number', default: 250000, min: 1000, suffix: 'TL' },
      { key: 'rate', label: 'Aylık faiz oranı', type: 'number', default: 3.49, min: 0, step: 0.01, suffix: '%' },
      { key: 'months', label: 'Vade', type: 'number', default: 24, min: 1, max: 120, suffix: 'ay' },
    ],
    calculate: (v) => {
      const p = n(v.principal), r = n(v.rate), m = Math.max(1, n(v.months))
      const pay = payment(p, r, m), total = pay * m, interest = total - p
      let balance = p
      const rows = []
      for (let i = 1; i <= Math.min(m, 12); i++) {
        const interestPart = balance * (r / 100)
        const principalPart = pay - interestPart
        balance = Math.max(0, balance - principalPart)
        rows.push([`${i}. ay`, money(pay), money(principalPart), money(interestPart), money(balance)])
      }
      return result(
        [item('Aylık taksit', money(pay), 'primary'), item('Toplam geri ödeme', money(total)), item('Toplam faiz', money(interest), 'warning')],
        [item('Ana para', money(p)), item('Vade', `${integer(m)} ay`), item('Aylık oran', percent(r))],
        'Hesaplama masraf, sigorta ve banka özel vergilerini içermez.',
        { headers: ['Dönem', 'Taksit', 'Ana para', 'Faiz', 'Kalan'], rows }
      )
    },
  },
{
    slug: 'kredi-karti-borc', title: 'Kredi Kartı Borç Hesaplama', shortTitle: 'Kart Borcu', category: 'finans', icon: 'credit-card', badge: 'Çok Aranan', trend: true,
    description: 'Kredi kartı borcunuzun seçtiğiniz faiz ve vadede yaklaşık aylık ödeme ve toplam maliyetini görün.',
    keywords: ['kredi kartı borç hesaplama', 'kart borcu faiz', 'kredi kartı yapılandırma'],
    fields: [
      { key: 'debt', label: 'Toplam kart borcu', type: 'number', default: 75000, min: 100, suffix: 'TL' },
      { key: 'rate', label: 'Aylık faiz oranı', type: 'number', default: 4.25, min: 0, step: 0.01, suffix: '%' },
      { key: 'months', label: 'Kapatma süresi', type: 'number', default: 12, min: 1, max: 60, suffix: 'ay' },
    ],
    calculate: (v) => {
      const d = n(v.debt), r = n(v.rate), m = Math.max(1, n(v.months)), pay = payment(d, r, m), total = pay * m
      return result(
        [item('Aylık ödeme', money(pay), 'primary'), item('Toplam ödeme', money(total)), item('Faiz maliyeti', money(total - d), 'warning')],
        [item('Borç', money(d)), item('Tahmini süre', `${integer(m)} ay`), item('Borç artışı', percent(d ? ((total - d) / d) * 100 : 0))],
        'Gerçek kart faizi, vergi ve asgari ödeme koşulları bankaya göre değişebilir.'
      )
    },
  },
{
    slug: 'kredi-yapilandirma-hesaplama', title: 'Kredi Yapılandırma Hesaplama', shortTitle: 'Yapılandırma', category: 'finans', icon: 'refresh', badge: 'Trend', trend: true,
    description: 'Mevcut borcu yeni faiz ve vade ile yapılandırdığınızda taksit ve toplam maliyet nasıl değişir hesaplayın.',
    keywords: ['kredi yapılandırma hesaplama', 'borç yapılandırma', 'yeni taksit hesaplama'],
    fields: [
      { key: 'debt', label: 'Kalan borç', type: 'number', default: 150000, min: 100, suffix: 'TL' },
      { key: 'oldPayment', label: 'Mevcut aylık ödeme', type: 'number', default: 18000, min: 0, suffix: 'TL' },
      { key: 'newRate', label: 'Yeni aylık faiz', type: 'number', default: 3.29, min: 0, step: 0.01, suffix: '%' },
      { key: 'newMonths', label: 'Yeni vade', type: 'number', default: 18, min: 1, max: 120, suffix: 'ay' },
    ],
    calculate: (v) => {
      const d = n(v.debt), old = n(v.oldPayment), r = n(v.newRate), m = Math.max(1, n(v.newMonths)), pay = payment(d, r, m), total = pay * m
      return result(
        [item('Yeni aylık taksit', money(pay), 'primary'), item('Aylık fark', money(pay - old), pay <= old ? 'success' : 'warning'), item('Toplam yeni ödeme', money(total))],
        [item('Toplam finansman maliyeti', money(total - d)), item('Taksit değişimi', percent(old ? ((pay - old) / old) * 100 : 0)), item('Yeni vade', `${integer(m)} ay`)],
        'Yapılandırma masrafı ve erken kapama koşulları dahil değildir.'
      )
    },
  },
{
    slug: 'mevduat-faiz-hesaplama', title: 'Mevduat Faiz Hesaplama', shortTitle: 'Mevduat Faizi', category: 'finans', icon: 'piggy-bank', badge: 'Trend', trend: true,
    description: 'Anapara, yıllık faiz, gün ve stopaj oranına göre net mevduat getirisini hesaplayın.',
    keywords: ['mevduat faiz hesaplama', 'vadeli mevduat getirisi', 'net faiz'],
    fields: [
      { key: 'principal', label: 'Anapara', type: 'number', default: 250000, min: 1, suffix: 'TL' },
      { key: 'annualRate', label: 'Yıllık brüt faiz', type: 'number', default: 45, min: 0, step: 0.01, suffix: '%' },
      { key: 'days', label: 'Vade', type: 'number', default: 32, min: 1, max: 3660, suffix: 'gün' },
      { key: 'withholding', label: 'Stopaj oranı', type: 'number', default: 15, min: 0, max: 100, step: 0.01, suffix: '%' },
    ],
    calculate: (v) => {
      const p = n(v.principal), rate = n(v.annualRate), days = n(v.days), stop = n(v.withholding)
      const gross = p * rate / 100 * days / 365, tax = gross * stop / 100, net = gross - tax
      return result([item('Net kazanç', money(net), 'success'), item('Vade sonu', money(p + net), 'primary'), item('Brüt faiz', money(gross))], [item('Stopaj', money(tax)), item('Net getiri oranı', percent(p ? net / p * 100 : 0)), item('Gün', `${integer(days)} gün`)], 'Stopaj oranını bankanızdaki güncel vadeye göre girin.')
    },
  },
{
    slug: 'bilesik-faiz-hesaplama', title: 'Bileşik Faiz Hesaplama', shortTitle: 'Bileşik Faiz', category: 'finans', icon: 'trending-up', badge: 'Yatırım',
    description: 'Başlangıç tutarı, düzenli ekleme, yıllık getiri ve süreyle birikiminizin gelecekteki değerini hesaplayın.',
    keywords: ['bileşik faiz hesaplama', 'birikim hesaplama', 'yatırım getirisi'],
    fields: [
      { key: 'initial', label: 'Başlangıç tutarı', type: 'number', default: 100000, min: 0, suffix: 'TL' },
      { key: 'monthly', label: 'Aylık ekleme', type: 'number', default: 5000, min: 0, suffix: 'TL' },
      { key: 'annualRate', label: 'Yıllık getiri', type: 'number', default: 30, min: -99, step: 0.1, suffix: '%' },
      { key: 'years', label: 'Süre', type: 'number', default: 5, min: 1, max: 50, suffix: 'yıl' },
    ],
    calculate: (v) => {
      const initial = n(v.initial), monthly = n(v.monthly), annual = n(v.annualRate), years = n(v.years)
      const r = annual / 100 / 12, months = years * 12
      let total = initial
      for (let i = 0; i < months; i++) total = total * (1 + r) + monthly
      const deposited = initial + monthly * months
      return result([item('Tahmini toplam', money(total), 'primary'), item('Toplam yatırılan', money(deposited)), item('Tahmini kazanç', money(total - deposited), 'success')], [item('Süre', `${number(years)} yıl`), item('Aylık ekleme', money(monthly)), item('Kazanç oranı', percent(deposited ? (total - deposited) / deposited * 100 : 0))], 'Getiri sabit varsayılmıştır; yatırım sonucu garanti değildir.')
    },
  },
{
    slug: 'altin-kar-zarar-hesaplama', title: 'Altın Kâr Zarar Hesaplama', shortTitle: 'Altın Kâr/Zarar', category: 'finans', icon: 'coins', badge: 'Trend', trend: true,
    description: 'Altın miktarı, alış ve güncel satış fiyatına göre kâr veya zararınızı hesaplayın.',
    keywords: ['altın kar zarar hesaplama', 'gram altın maliyet', 'altın kazanç'],
    fields: [
      { key: 'grams', label: 'Altın miktarı', type: 'number', default: 25, min: 0, step: 0.01, suffix: 'gram' },
      { key: 'buy', label: 'Gram alış maliyeti', type: 'number', default: 4000, min: 0, suffix: 'TL' },
      { key: 'sell', label: 'Güncel gram satış', type: 'number', default: 4500, min: 0, suffix: 'TL' },
      { key: 'fee', label: 'Toplam masraf', type: 'number', default: 0, min: 0, suffix: 'TL' },
    ],
    calculate: (v) => {
      const g = n(v.grams), buy = n(v.buy), sell = n(v.sell), fee = n(v.fee), cost = g * buy + fee, value = g * sell, profit = value - cost
      return result([item(profit >= 0 ? 'Net kâr' : 'Net zarar', money(Math.abs(profit)), profit >= 0 ? 'success' : 'danger'), item('Güncel değer', money(value), 'primary'), item('Toplam maliyet', money(cost))], [item('Getiri', percent(cost ? profit / cost * 100 : 0)), item('Birim fark', money(sell - buy)), item('Miktar', `${number(g)} gram`)], 'Alış-satış makası ve komisyonları masraf alanına ekleyebilirsiniz.')
    },
  },
{
    slug: 'enflasyon-deger-kaybi', title: 'Enflasyon Değer Kaybı Hesaplama', shortTitle: 'Enflasyon Kaybı', category: 'finans', icon: 'chart-down', badge: 'Yeni',
    description: 'Bir tutarın enflasyon karşısındaki alım gücü kaybını ve aynı gücü korumak için gereken yeni tutarı hesaplayın.',
    keywords: ['enflasyon hesaplama', 'alım gücü kaybı', 'paranın değer kaybı'],
    fields: [
      { key: 'amount', label: 'Başlangıç tutarı', type: 'number', default: 100000, min: 0, suffix: 'TL' },
      { key: 'inflation', label: 'Enflasyon oranı', type: 'number', default: 35, min: -99, step: 0.01, suffix: '%' },
    ],
    calculate: (v) => {
      const a = n(v.amount), inf = n(v.inflation), needed = a * (1 + inf / 100), purchasing = inf > -100 ? a / (1 + inf / 100) : 0
      return result([item('Aynı alım gücü için', money(needed), 'primary'), item('Reel alım gücü', money(purchasing), 'warning'), item('Nominal fark', money(needed - a))], [item('Enflasyon', percent(inf)), item('Alım gücü kaybı', percent(a ? (a - purchasing) / a * 100 : 0))], 'Basitleştirilmiş tek dönem hesabıdır.')
    },
  }
]
