import { n, money, number, result, item } from '../tool-utils.js'
import { compareLoanOffers } from '../loan-comparison.js'
export const toolsPart10 = [{
  slug: 'kredi-teklif-karsilastirma', title: 'Kredi Teklif Karşılaştırma', shortTitle: 'Kredi Karşılaştırma', category: 'finans', icon: 'wallet', badge: 'Karşılaştırma', trend: true, updatedAt: '2026-11-03',
  description: 'İki kredi teklifinin aylık taksidini, faiz ve peşin masraflar dahil toplam geri ödemesini karşılaştırın. Farklı vadeleri birlikte değerlendirin.',
  keywords: ['kredi teklif karşılaştırma', 'kredi masrafı toplam maliyet', 'iki banka kredi karşılaştırma'],
  fields: [
    { key: 'principal', label: 'Ortak kredi tutarı', type: 'number', default: 150000, min: 1, max: 1e12, suffix: 'TL' },
    { key: 'monthsA', label: 'Teklif A vadesi', type: 'number', default: 24, min: 1, max: 600, integer: true, step: 1, suffix: 'ay' },
    { key: 'rateA', label: 'Teklif A aylık dönemsel oran', help: 'Faize vergi ekleniyorsa vergi dahil dönemsel oranı girin. KKDF ve BSMV otomatik eklenmez.', type: 'number', default: 2, min: 0, max: 100, step: 0.01, suffix: '%' },
    { key: 'feeA', label: 'Teklif A peşin masraf ve sigorta', type: 'number', default: 3000, min: 0, max: 1e12, suffix: 'TL' },
    { key: 'monthsB', label: 'Teklif B vadesi', type: 'number', default: 24, min: 1, max: 600, integer: true, step: 1, suffix: 'ay' },
    { key: 'rateB', label: 'Teklif B aylık dönemsel oran', help: 'İki teklifte de aynı kapsamda oran kullanın; nominal ve vergi dahil oranı karıştırmayın.', type: 'number', default: 2.1, min: 0, max: 100, step: 0.01, suffix: '%' },
    { key: 'feeB', label: 'Teklif B peşin masraf ve sigorta', type: 'number', default: 0, min: 0, max: 1e12, suffix: 'TL' },
  ],
  calculate: raw => {
    const values = Object.fromEntries(Object.entries(raw).map(([k,v]) => [k,n(v)]))
    const c = compareLoanOffers(values)
    const lower = c.difference < 0.005 ? 'Eşit' : c.totalA < c.totalB ? 'Teklif A' : 'Teklif B'
    return result([item('Teklif A toplam geri ödeme', money(c.totalA), 'primary'), item('Teklif B toplam geri ödeme', money(c.totalB), 'primary'), item('Toplam ödeme farkı', money(c.difference))], [item('Teklif A aylık taksit', money(c.monthlyA)), item('Teklif B aylık taksit', money(c.monthlyB)), item('Teklif A finansman maliyeti', money(c.costA)), item('Teklif B finansman maliyeti', money(c.costB)), item('Toplam geri ödemesi düşük seçenek', lower), item('Vadeler', `${number(values.monthsA)} / ${number(values.monthsB)} ay`)], 'Eşit taksit ve sabit faiz varsayılır. Masraflar peşin ödenir, krediye eklenmez. KKDF/BSMV ve dönemsel sigorta otomatik hesaplanmaz. Varsa vergi dahil dönemsel oranı kullanın; masrafa yalnız peşin ödenen bedelleri girin. Sonuç yıllık maliyet oranı veya kredi onayı değildir.')
  },
  formula: 'Aylık taksit = P × r / [1 − (1 + r)^−n]; r aylık faizin ondalık karşılığıdır. Faiz sıfırsa taksit P/n. Toplam geri ödeme = n × taksit + peşin masraf; finansman maliyeti = toplam geri ödeme − P.',
  guide: { intro: 'Düşük aylık faiz tek başına en düşük toplam maliyet anlamına gelmez. Her iki teklife aynı kredi tutarını, sözleşmedeki aylık faizi, vadesini ve peşin maliyetlerini girin. Varsayılan oranlar yalnız örnektir; güncel banka teklifi değildir.', evaluate: 'Aylık taksiti ve toplam ödemeyi ayrı karşılaştırın. Uzun vadeli teklifin taksidi düşük, toplam maliyeti yüksek olabilir. İki teklifte masraf kapsamı aynı olmalıdır.' },
  faqs: [{ question: 'Sigortayı nereye girmeliyim?', answer: 'Peşin ödenen ve takside dahil olmayan sigorta ile diğer ücretleri masraf alanına ekleyin. Tekrarlanan veya takside eklenen bedeller bu basitleştirilmiş modelin dışındadır.' }, { question: 'Farklı vadeleri karşılaştırabilir miyim?', answer: 'Evet; her teklifin vadesi ayrıdır. Toplam maliyeti tek başına değil, aylık ödeme gücünüz ve vade farkıyla birlikte değerlendirin.' }],
  related: ['kredi-hesaplama', 'kredi-yapilandirma-hesaplama', 'taksit-hesaplama'],
}]
