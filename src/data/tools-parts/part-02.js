import { n, money, number, integer, percent, daysBetween, addDays, formatDate, payment, result, item, examNet } from '../tool-utils'

export const toolsPart02 = [
{
    slug: 'birikim-hedefi-hesaplama', title: 'Birikim Hedefi Hesaplama', shortTitle: 'Birikim Hedefi', category: 'finans', icon: 'target', badge: 'Planlama',
    description: 'Hedef tutara ulaşmak için gereken aylık birikimi veya mevcut planınızın kaç ay süreceğini hesaplayın.',
    keywords: ['birikim hedefi hesaplama', 'aylık tasarruf', 'para biriktirme'],
    fields: [
      { key: 'target', label: 'Hedef tutar', type: 'number', default: 500000, min: 1, suffix: 'TL' },
      { key: 'current', label: 'Mevcut birikim', type: 'number', default: 50000, min: 0, suffix: 'TL' },
      { key: 'months', label: 'Hedef süre', type: 'number', default: 24, min: 1, suffix: 'ay' },
      { key: 'annualRate', label: 'Yıllık tahmini getiri', type: 'number', default: 0, min: 0, step: 0.1, suffix: '%' },
    ],
    calculate: (v) => {
      const target = n(v.target), current = n(v.current), months = Math.max(1, n(v.months)), r = n(v.annualRate) / 100 / 12
      const grownCurrent = current * Math.pow(1 + r, months)
      const factor = r ? (Math.pow(1 + r, months) - 1) / r : months
      const monthly = Math.max(0, (target - grownCurrent) / factor)
      return result([item('Gerekli aylık birikim', money(monthly), 'primary'), item('Toplam aylık katkı', money(monthly * months)), item('Tahmini getiri katkısı', money(Math.max(0, target - current - monthly * months)), 'success')], [item('Hedef', money(target)), item('Süre', `${integer(months)} ay`), item('Başlangıç', money(current))], 'Getiri sabit varsayılır; hedef planlama amacıyla kullanın.')
    },
  },
{
    slug: 'maas-hesaplama', title: 'Basit Brüt Net Maaş Tahmini', shortTitle: 'Maaş Tahmini', category: 'maas-vergi', icon: 'banknote', badge: 'Popüler', trend: true,
    description: 'Tek bir ay için brüt maaş, SGK tavanı, prim oranları, gelir vergisi oranı ve kullanıcı tarafından girilen istisnalarla yaklaşık net ücreti hesaplayın.',
    keywords: ['brüt net maaş tahmini', 'maaş kesintileri hesaplama', 'net ücret hesaplama', '2026 sgk tavanı', 'gelir vergisi maaş'],
    updatedAt: '2026-07-27',
    fields: [
      { key: 'gross', label: 'Aylık brüt maaş', type: 'number', default: 75000, min: 0, suffix: 'TL' },
      { key: 'incomeTax', label: 'Uygulanacak gelir vergisi oranı', type: 'number', default: 20, min: 0, max: 100, step: 0.01, suffix: '%', help: 'Kümülatif matrahınıza karşılık gelen marjinal oranı girin.' },
      { key: 'incomeTaxExemption', label: 'Aylık gelir vergisi istisnası', type: 'number', default: 0, min: 0, suffix: 'TL', help: 'Bordronuzdaki istisna tutarını biliyorsanız girin; araç bunu otomatik belirlemez.' },
      { key: 'sgk', label: 'Çalışan SGK oranı', type: 'number', default: 14, min: 0, max: 100, step: 0.01, suffix: '%' },
      { key: 'unemployment', label: 'İşsizlik sigortası oranı', type: 'number', default: 1, min: 0, max: 100, step: 0.01, suffix: '%' },
      { key: 'sgkCeiling', label: 'Aylık SGK matrah tavanı', type: 'number', default: 297270, min: 0, suffix: 'TL', help: '2026 özel sektör aylık prime esas kazanç üst sınırı varsayılan olarak girilmiştir.' },
      { key: 'stampRate', label: 'Damga vergisi oranı', type: 'number', default: 0.759, min: 0, max: 100, step: 0.001, suffix: '%' },
      { key: 'stampExemption', label: 'Damga vergisi istisna matrahı', type: 'number', default: 0, min: 0, suffix: 'TL', help: 'Bordronuzdaki damga vergisi istisnasına esas brüt matrahı biliyorsanız girin.' },
    ],
    calculate: (v) => {
      const gross = Math.max(0, n(v.gross))
      const ceiling = Math.max(0, n(v.sgkCeiling))
      const sgkBase = ceiling > 0 ? Math.min(gross, ceiling) : gross
      const sgk = sgkBase * Math.max(0, n(v.sgk)) / 100
      const unemployment = sgkBase * Math.max(0, n(v.unemployment)) / 100
      const taxBase = Math.max(0, gross - sgk - unemployment)
      const grossIncomeTax = taxBase * Math.max(0, n(v.incomeTax)) / 100
      const incomeTaxExemption = Math.min(grossIncomeTax, Math.max(0, n(v.incomeTaxExemption)))
      const incomeTax = Math.max(0, grossIncomeTax - incomeTaxExemption)
      const stampBase = Math.max(0, gross - Math.max(0, n(v.stampExemption)))
      const stampTax = stampBase * Math.max(0, n(v.stampRate)) / 100
      const net = Math.max(0, gross - sgk - unemployment - incomeTax - stampTax)
      return result(
        [item('Yaklaşık net ücret', money(net), 'primary'), item('Toplam kesinti', money(gross - net), 'warning'), item('Gelir vergisi matrahı', money(taxBase))],
        [item('SGK primi', money(sgk)), item('İşsizlik primi', money(unemployment)), item('Gelir vergisi', money(incomeTax)), item('Damga vergisi', money(stampTax)), item('SGK matrahı', money(sgkBase))],
        'Bu araç tek aylık ve kullanıcı kontrollü bir tahmindir. Kümülatif vergi matrahını, otomatik vergi dilimi geçişini, bordroya özgü ek ödeme ve kesintileri kendiliğinden hesaplamaz.'
      )
    },
    formula: 'Önce brüt ücret, girilen SGK tavanıyla sınırlandırılarak SGK ve işsizlik primi matrahı belirlenir. Gelir vergisi matrahı brüt ücretten bu iki prim düşülerek bulunur. Girilen gelir vergisi oranı uygulanır, yazılan istisna tutarı vergiden düşülür. Damga vergisi ise brüt tutardan girilen istisna matrahı çıkarıldıktan sonra seçilen oranla hesaplanır.',
    guide: {
      intro: 'Bu sayfa tam bordro hesaplayıcısı değil, tek aylık brüt-net ücret tahmin aracıdır. Kullanıcının gelir vergisi oranını ve bordrosundaki istisna tutarlarını bilerek girmesini bekler. Böylece otomatik ve hatalı bir “kesin maaş” sonucu vermek yerine hangi varsayımların kullanıldığını açıkça gösterir.',
      evaluate: 'Sonucu bordronuzla karşılaştırırken kümülatif gelir vergisi matrahını, prim ve ikramiyeleri, yemek-yol yardımlarını, engellilik indirimi gibi kişisel unsurları ve işveren uygulamalarını dikkate alın. SGK tavanı üzerindeki brüt ücretlerde prim hesabının tavanla sınırlandığını kontrol edin.',
    },
    faqs: [
      { q: 'Bu araç 2026 bordrosunu kesin hesaplar mı?', a: 'Hayır. Tek ay için kullanıcı tarafından girilen oran ve istisnalarla tahmin üretir. Kümülatif matrah ve kişisel bordro kalemleri otomatik hesaplanmadığı için resmî bordro yerine kullanılamaz.' },
      { q: 'Gelir vergisi oranına ne yazılmalı?', a: 'Yıl içindeki kümülatif ücret matrahınıza karşılık gelen oranı yazın. 2026 ücret gelirleri için oranlar yüzde 15, 20, 27, 35 ve 40 dilimlerinden oluşur; hangi dilimde olduğunuz bordro dönemine göre değişebilir.' },
      { q: 'SGK tavanı neden ayrı bir alan?', a: 'SGK ve işsizlik primi, prime esas kazanç üst sınırını aşan ücret kısmından hesaplanmaz. 2026 özel sektör için aylık üst sınır varsayılan olarak 297.270 TL girilmiştir; dönem değişirse alanı güncelleyin.' },
    ],
    sources: [
      { label: 'SGK — 2026 prime esas kazanç alt ve üst sınırları', url: 'https://www.sgk.gov.tr/Content/Post/2e0c9e1a-2cfe-4456-af10-49d3de0c58ba/Prime-Esas-Kazanc-Miktarlari-2026-01-14-10-35-39' },
      { label: 'Gelir İdaresi Başkanlığı — 2026 gelir vergisi tarifesi', url: 'https://www.gib.gov.tr/yardim-kaynaklar/yararli-bilgiler/gelir-vergisi-tarifesi' },
    ],
  },
{
    slug: 'zam-hesaplama', title: 'Maaş Zam Hesaplama', shortTitle: 'Zam', category: 'maas-vergi', icon: 'arrow-up', badge: 'Trend', trend: true,
    description: 'Eski maaş ve zam oranına göre yeni maaşı; eski ve yeni maaşa göre gerçekleşen zam oranını hesaplayın.',
    keywords: ['zam hesaplama', 'maaş zammı hesaplama', 'yüzde zam'],
    fields: [
      { key: 'old', label: 'Eski maaş / tutar', type: 'number', default: 50000, min: 0, suffix: 'TL' },
      { key: 'rate', label: 'Zam oranı', type: 'number', default: 25, min: -100, step: 0.01, suffix: '%' },
    ],
    calculate: (v) => {
      const old = n(v.old), rate = n(v.rate), increase = old * rate / 100, next = old + increase
      return result([item('Yeni tutar', money(next), 'primary'), item('Artış miktarı', money(increase), increase >= 0 ? 'success' : 'danger'), item('Zam oranı', percent(rate))], [item('Eski tutar', money(old)), item('Aylık fark', money(increase)), item('Yıllık fark', money(increase * 12))])
    },
  },
{
    slug: 'kidem-tazminati', title: 'Kıdem Tazminatı Hesaplama', shortTitle: 'Kıdem', category: 'maas-vergi', icon: 'award', badge: 'Çalışan',
    description: 'İşe giriş, ayrılış ve brüt ücret bilgileriyle yaklaşık kıdem tazminatını hesaplayın.',
    keywords: ['kıdem tazminatı hesaplama', 'kıdem hesabı', 'işten ayrılma tazminatı'],
    fields: [
      { key: 'start', label: 'İşe giriş tarihi', type: 'date', default: '2022-01-01' },
      { key: 'end', label: 'İşten ayrılış tarihi', type: 'date', default: '2026-01-01' },
      { key: 'gross', label: 'Giydirilmiş brüt ücret', type: 'number', default: 75000, min: 0, suffix: 'TL' },
      { key: 'cap', label: 'Uygulanacak aylık tavan', type: 'number', default: 0, min: 0, suffix: 'TL', help: 'Tavan uygulanmayacaksa 0 bırakın.' },
    ],
    calculate: (v) => {
      const days = daysBetween(v.start, v.end), years = days / 365, gross = n(v.gross), cap = n(v.cap), base = cap > 0 ? Math.min(gross, cap) : gross, grossComp = base * years, stamp = grossComp * 0.00759, net = grossComp - stamp
      return result([item('Yaklaşık net kıdem', money(net), 'primary'), item('Brüt kıdem', money(grossComp)), item('Çalışma süresi', `${number(years)} yıl`)], [item('Toplam gün', `${integer(days)} gün`), item('Hesaba esas ücret', money(base)), item('Damga vergisi', money(stamp))], 'Hak kazanma şartları ve güncel tavan için resmi mevzuatı kontrol edin.')
    },
  },
{
    slug: 'ihbar-tazminati-hesaplama', title: 'İhbar Tazminatı Hesaplama', shortTitle: 'İhbar', category: 'maas-vergi', icon: 'calendar-clock', badge: 'Yeni',
    description: 'Çalışma süresi ve brüt ücret üzerinden ihbar süresini ve yaklaşık brüt tazminatı hesaplayın.',
    keywords: ['ihbar tazminatı hesaplama', 'ihbar süresi', 'işçi tazminatı'],
    fields: [
      { key: 'years', label: 'Toplam çalışma süresi', type: 'number', default: 3, min: 0, step: 0.1, suffix: 'yıl' },
      { key: 'gross', label: 'Aylık brüt ücret', type: 'number', default: 75000, min: 0, suffix: 'TL' },
    ],
    calculate: (v) => {
      const years = n(v.years), gross = n(v.gross), weeks = years < 0.5 ? 2 : years < 1.5 ? 4 : years < 3 ? 6 : 8, daily = gross / 30, comp = daily * weeks * 7
      return result([item('Brüt ihbar tazminatı', money(comp), 'primary'), item('İhbar süresi', `${weeks} hafta`), item('Gün karşılığı', `${weeks * 7} gün`)], [item('Günlük brüt ücret', money(daily)), item('Çalışma süresi', `${number(years)} yıl`)], 'Gelir ve damga vergisi kesintileri net tutarı etkiler.')
    },
  },
{
    slug: 'fazla-mesai-hesaplama', title: 'Fazla Mesai Hesaplama', shortTitle: 'Fazla Mesai', category: 'maas-vergi', icon: 'clock', badge: 'Pratik',
    description: 'Aylık brüt ücret, çalışma saati ve mesai katsayısıyla fazla çalışma ücretini hesaplayın.',
    keywords: ['fazla mesai hesaplama', 'mesai ücreti', 'saatlik ücret'],
    fields: [
      { key: 'gross', label: 'Aylık brüt ücret', type: 'number', default: 60000, min: 0, suffix: 'TL' },
      { key: 'hours', label: 'Fazla mesai süresi', type: 'number', default: 10, min: 0, step: 0.5, suffix: 'saat' },
      { key: 'multiplier', label: 'Mesai katsayısı', type: 'number', default: 1.5, min: 0, step: 0.1, suffix: 'x' },
      { key: 'monthlyHours', label: 'Aylık normal saat', type: 'number', default: 225, min: 1, suffix: 'saat' },
    ],
    calculate: (v) => {
      const g = n(v.gross), hours = n(v.hours), multi = n(v.multiplier), monthly = Math.max(1, n(v.monthlyHours)), hourly = g / monthly, extra = hourly * multi * hours
      return result([item('Brüt mesai ücreti', money(extra), 'primary'), item('Normal saatlik ücret', money(hourly)), item('Mesai saatlik ücret', money(hourly * multi))], [item('Mesai süresi', `${number(hours)} saat`), item('Katsayı', `${number(multi)}x`)])
    },
  },
{
    slug: 'vergi-hesaplama', title: 'Vergi Hesaplama', shortTitle: 'Vergi', category: 'maas-vergi', icon: 'receipt', badge: 'Vergi',
    description: 'Matrah ve oran girerek vergi tutarını, vergi dahil toplamı ve efektif oranı hesaplayın.',
    keywords: ['vergi hesaplama', 'vergi tutarı', 'matrah hesaplama'],
    fields: [
      { key: 'base', label: 'Vergi matrahı', type: 'number', default: 100000, min: 0, suffix: 'TL' },
      { key: 'rate', label: 'Vergi oranı', type: 'number', default: 20, min: 0, max: 100, step: 0.01, suffix: '%' },
      { key: 'deduction', label: 'İndirim / istisna', type: 'number', default: 0, min: 0, suffix: 'TL' },
    ],
    calculate: (v) => {
      const base = n(v.base), deduction = n(v.deduction), taxable = Math.max(0, base - deduction), rate = n(v.rate), tax = taxable * rate / 100
      return result([item('Hesaplanan vergi', money(tax), 'primary'), item('Vergi dahil toplam', money(base + tax)), item('Vergiye tabi tutar', money(taxable))], [item('Oran', percent(rate)), item('İndirim', money(deduction)), item('Efektif oran', percent(base ? tax / base * 100 : 0))], 'Özel vergi türlerinin dilim, istisna ve kesintileri farklı olabilir.')
    },
  },
{
    slug: 'kdv-hesaplama', title: 'KDV Hesaplama', shortTitle: 'KDV', category: 'maas-vergi', icon: 'percent', badge: 'Hızlı',
    description: 'KDV hariç tutara KDV ekleyin veya KDV dahil tutarın içindeki KDV ve matrahı bulun.',
    keywords: ['kdv hesaplama', 'kdv dahil hariç', 'kdv ayırma'],
    fields: [
      { key: 'amount', label: 'Tutar', type: 'number', default: 10000, min: 0, suffix: 'TL' },
      { key: 'rate', label: 'KDV oranı', type: 'select', default: 20, options: [{ value: 1, label: '%1' }, { value: 10, label: '%10' }, { value: 20, label: '%20' }] },
      { key: 'mode', label: 'Tutar tipi', type: 'select', default: 'excluded', options: [{ value: 'excluded', label: 'KDV hariç' }, { value: 'included', label: 'KDV dahil' }] },
    ],
    calculate: (v) => {
      const a = n(v.amount), rate = n(v.rate)
      const base = v.mode === 'included' ? a / (1 + rate / 100) : a
      const tax = base * rate / 100, total = base + tax
      return result([item('KDV dahil toplam', money(total), 'primary'), item('KDV tutarı', money(tax), 'warning'), item('KDV hariç matrah', money(base))], [item('KDV oranı', percent(rate)), item('Giriş tipi', v.mode === 'included' ? 'KDV dahil' : 'KDV hariç')])
    },
  }
]
