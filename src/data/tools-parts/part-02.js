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
    slug: 'kidem-tazminati', title: 'Kıdem Tazminatı Tutar Tahmini', shortTitle: 'Kıdem', category: 'maas-vergi', icon: 'award', badge: 'Çalışan', trend: true,
    description: 'İşe giriş, ayrılış, giydirilmiş brüt ücret ve geçerli kıdem tazminatı tavanıyla yaklaşık brüt ve damga vergisi sonrası tutarı hesaplayın.',
    keywords: ['kıdem tazminatı hesaplama', '2026 kıdem tazminatı tavanı', 'kıdem hesabı', 'işten ayrılma tazminatı'],
    updatedAt: '2026-07-27',
    fields: [
      { key: 'start', label: 'İşe giriş tarihi', type: 'date', default: '2022-01-01' },
      { key: 'end', label: 'İşten ayrılış tarihi', type: 'date', default: '2026-07-27' },
      { key: 'gross', label: 'Aylık giydirilmiş brüt ücret', type: 'number', default: 75000, min: 0, suffix: 'TL' },
      { key: 'cap', label: 'Aylık kıdem tazminatı tavanı', type: 'number', default: 73729.87, min: 0, suffix: 'TL', help: '1 Temmuz–31 Aralık 2026 dönemi resmî tavanı varsayılan olarak girilmiştir.' },
      { key: 'stampRate', label: 'Damga vergisi oranı', type: 'number', default: 0.759, min: 0, max: 100, step: 0.001, suffix: '%' },
    ],
    calculate: (v) => {
      const days = Math.max(0, daysBetween(v.start, v.end))
      const years = days / 365
      const gross = Math.max(0, n(v.gross))
      const cap = Math.max(0, n(v.cap))
      const base = cap > 0 ? Math.min(gross, cap) : gross
      const grossComp = base * years
      const stamp = grossComp * Math.max(0, n(v.stampRate)) / 100
      const net = Math.max(0, grossComp - stamp)
      return result(
        [item('Damga vergisi sonrası tahmin', money(net), 'primary'), item('Brüt kıdem tahmini', money(grossComp)), item('Çalışma süresi', `${number(years)} yıl`)],
        [item('Toplam gün', `${integer(days)} gün`), item('Bir yıl için esas ücret', money(base)), item('Uygulanan tavan', cap > 0 ? money(cap) : 'Tavan yok'), item('Damga vergisi', money(stamp))],
        'Araç yalnızca tutar tahmini yapar; kıdem tazminatına hak kazanma koşullarını belirlemez. Ayrılış nedeni, kesintisiz hizmet, ücret kalemleri ve hukuki durum ayrıca incelenmelidir.'
      )
    },
    formula: 'Yaklaşık hizmet süresi toplam günün 365’e bölünmesiyle bulunur. Bir yıllık hesaba esas ücret, giydirilmiş brüt ücret ile girilen dönem tavanından düşük olanıdır. Brüt kıdem tahmini bu ücretin hizmet yılıyla çarpılmasıyla; damga vergisi sonrası tutar ise seçilen damga vergisinin düşülmesiyle hesaplanır.',
    guide: {
      intro: 'Kıdem tazminatı, yalnızca çalışma süresi ve maaşa bakılarak kesinleştirilemez. Bu araç, hak kazanıldığı varsayımıyla parasal bir tahmin üretir. 1 Temmuz–31 Aralık 2026 dönemi için Çalışma ve Sosyal Güvenlik Bakanlığınca açıklanan 73.729,87 TL tavan varsayılan olarak kullanılır.',
      evaluate: 'İşten ayrılış tarihinizin hangi tavan dönemine denk geldiğini kontrol edin. Giydirilmiş brüt ücrete düzenli para ve para ile ölçülebilen menfaatlerin hangi kapsamda dahil olduğunu bordro veya uzman görüşüyle doğrulayın. Hak kazanma koşulları karşılanmıyorsa matematiksel sonuç ödeme hakkı doğurmaz.',
    },
    faqs: [
      { q: '2026 ikinci yarı kıdem tazminatı tavanı ne kadar?', a: '1 Temmuz 2026 ile 31 Aralık 2026 arasında geçerli aylık kıdem tazminatı tavanı 73.729,87 TL olarak açıklanmıştır.' },
      { q: 'Brüt ücretim tavandan yüksekse ne olur?', a: 'Bir tam hizmet yılı için hesapta tavan tutar esas alınır. Araç, giydirilmiş brüt ücret ile girilen tavanın düşük olanını kullanır.' },
      { q: 'Bu sonuç kıdem tazminatına hak kazandığımı gösterir mi?', a: 'Hayır. Sonuç yalnızca hak kazanıldığı varsayımıyla tutar tahminidir. Ayrılış şekli ve yasal koşullar ayrıca değerlendirilmelidir.' },
    ],
    sources: [
      { label: 'ÇSGB — 1 Temmuz–31 Aralık 2026 kıdem tazminatı tavanı', url: 'https://www.csgb.gov.tr/yayinlar/calisma-hayati-istatistikleri-e-bulteni/temmuz-2026/ucret-ve-sendikal-istatistikler.html' },
    ],
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
    slug: 'kdv-hesaplama', title: 'KDV Dahil ve Hariç Hesaplama', shortTitle: 'KDV', category: 'maas-vergi', icon: 'percent', badge: 'Hızlı',
    description: 'KDV hariç tutara vergi ekleyin veya KDV dahil toplamın içindeki matrah ve KDV tutarını ayırın.',
    keywords: ['KDV hesaplama', 'KDV dahil hesaplama', 'KDV hariç hesaplama', 'KDV ayırma', 'yüzde 20 KDV'],
    updatedAt: '2026-07-27',
    fields: [
      { key: 'amount', label: 'Tutar', type: 'number', default: 10000, min: 0, suffix: 'TL' },
      { key: 'rate', label: 'KDV oranı', type: 'select', default: 20, options: [{ value: 1, label: '%1' }, { value: 10, label: '%10' }, { value: 20, label: '%20' }] },
      { key: 'mode', label: 'Tutar tipi', type: 'select', default: 'excluded', options: [{ value: 'excluded', label: 'KDV hariç' }, { value: 'included', label: 'KDV dahil' }] },
    ],
    calculate: (v) => {
      const amount = Math.max(0, n(v.amount)), rate = Math.max(0, n(v.rate))
      const base = v.mode === 'included' ? amount / (1 + rate / 100) : amount
      const tax = base * rate / 100
      const total = base + tax
      return result(
        [item('KDV dahil toplam', money(total), 'primary'), item('KDV tutarı', money(tax), 'warning'), item('KDV hariç matrah', money(base))],
        [item('KDV oranı', percent(rate)), item('Giriş tipi', v.mode === 'included' ? 'KDV dahil' : 'KDV hariç')],
        'Doğru KDV oranı mal veya hizmetin mevzuattaki sınıfına göre belirlenir. Araç seçilen oranla yalnızca matematiksel ayırma veya ekleme yapar.'
      )
    },
    formula: 'KDV hariç tutarda vergi = matrah × oran / 100 ve toplam = matrah + vergi olarak hesaplanır. KDV dahil tutarda matrah = toplam / (1 + oran / 100); vergi ise toplam ile matrah arasındaki farktır.',
    guide: {
      intro: 'Türkiye’de temel KDV oranları yüzde 1, yüzde 10 ve yüzde 20 olarak uygulanır; ancak hangi teslim veya hizmetin hangi orana tabi olduğu ilgili listelere ve özel düzenlemelere bağlıdır. Bu araç oran sınıflandırması yapmaz.',
      evaluate: 'Fatura veya işlem türünüz için doğru oranı belirledikten sonra giriş tutarının KDV dahil mi hariç mi olduğunu seçin. Özellikle KDV dahil tutardan vergi ayırırken tutarı doğrudan oranla çarpmak yerine bölme formülünün kullanılması gerekir.',
    },
    faqs: [
      { q: 'KDV dahil tutarın içindeki KDV nasıl bulunur?', a: 'Önce toplam tutar 1 + KDV oranına bölünerek matrah bulunur. KDV, toplam tutardan bu matrah çıkarılarak hesaplanır.' },
      { q: 'Her ürün için yüzde 20 mi kullanılmalı?', a: 'Hayır. Güncel temel oranlar yüzde 1, yüzde 10 ve yüzde 20 olmakla birlikte ürün veya hizmetin tabi olduğu oran ilgili mevzuata göre değişir.' },
      { q: 'KDV oranını araç otomatik seçer mi?', a: 'Hayır. İşleminize uygun oranı belirleyip araçta seçmeniz gerekir.' },
    ],
    sources: [
      { label: 'Gelir İdaresi Başkanlığı — Güncel KDV oranları', url: 'https://cdn.gib.gov.tr/api/gibportal-file/file/getFileResources?objectKey=arsiv%2Fyardim-kaynaklar%2Fyararli-bilgiler%2Fkdv-oranlari.pdf' },
    ],
  }
]
