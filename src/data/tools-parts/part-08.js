import { n, money, number, integer, percent, daysBetween, addDays, formatDate, payment, result, item, examNet } from '../tool-utils'

export const toolsPart08 = [
{
    slug: 'kar-marji-hesaplama', title: 'Kâr Marjı ve Kâr Oranı Hesaplama', shortTitle: 'Kâr Marjı', category: 'finans', icon: 'chart', badge: 'İşletme', trend: true, trendRank: 7,
    description: 'Alış maliyeti, satış fiyatı ve adet üzerinden birim kârı, toplam kârı, kâr marjını ve maliyet üstü kâr oranını hesaplayın.',
    keywords: ['kâr marjı hesaplama', 'kar oranı hesaplama', 'maliyet satış fiyatı', 'ürün karlılık'],
    formula: 'Birim kâr = satış fiyatı − maliyet. Kâr marjı = birim kâr ÷ satış fiyatı. Maliyet üstü kâr oranı = birim kâr ÷ maliyet.',
    fields: [
      { key: 'cost', label: 'Birim maliyet', type: 'number', default: 750, min: 0, suffix: 'TL' },
      { key: 'sale', label: 'Birim satış fiyatı', type: 'number', default: 1200, min: 0, suffix: 'TL' },
      { key: 'quantity', label: 'Satış adedi', type: 'number', default: 100, min: 1, suffix: 'adet' },
    ],
    calculate: (v) => {
      const cost=n(v.cost), sale=n(v.sale), quantity=n(v.quantity), unit=sale-cost, total=unit*quantity
      return result([item('Toplam kâr', money(total), unit >= 0 ? 'success' : 'warning'), item('Kâr marjı', percent(sale ? unit/sale*100 : 0), 'primary'), item('Birim kâr', money(unit))], [item('Toplam ciro', money(sale*quantity)), item('Toplam maliyet', money(cost*quantity)), item('Maliyet üstü kâr oranı', percent(cost ? unit/cost*100 : 0))], 'Vergi, komisyon, kargo ve diğer işletme giderleri dahil değildir.')
    },
  },
{
    slug: 'basabas-noktasi-hesaplama', title: 'Başabaş Noktası Hesaplama', shortTitle: 'Başabaş Noktası', category: 'finans', icon: 'balance', badge: 'İşletme', trend: true, trendRank: 11,
    description: 'Sabit gider, ürün satış fiyatı ve değişken maliyete göre zarar etmemek için gereken minimum satış adedini ve ciroyu hesaplayın.',
    keywords: ['başabaş noktası hesaplama', 'break even hesaplama', 'minimum satış adedi', 'işletme karlılık'],
    formula: 'Başabaş adedi = sabit gider ÷ (birim satış fiyatı − birim değişken maliyet).',
    fields: [
      { key: 'fixed', label: 'Toplam sabit gider', type: 'number', default: 150000, min: 0, suffix: 'TL' },
      { key: 'sale', label: 'Birim satış fiyatı', type: 'number', default: 1500, min: 0.01, suffix: 'TL' },
      { key: 'variable', label: 'Birim değişken maliyet', type: 'number', default: 900, min: 0, suffix: 'TL' },
    ],
    calculate: (v) => {
      const fixed=n(v.fixed), sale=n(v.sale), variable=n(v.variable), contribution=sale-variable
      if (contribution <= 0) return result([item('Başabaş noktası', 'Hesaplanamaz', 'warning')], [item('Birim katkı payı', money(contribution))], 'Satış fiyatı değişken maliyetten yüksek olmalıdır.')
      const units=Math.ceil(fixed/contribution), revenue=units*sale
      return result([item('Başabaş satış adedi', `${integer(units)} adet`, 'primary'), item('Gerekli ciro', money(revenue)), item('Birim katkı payı', money(contribution), 'success')], [item('Katkı payı oranı', percent(sale ? contribution/sale*100 : 0)), item('Sabit gider', money(fixed)), item('Birim değişken maliyet', money(variable))], 'Sonuç, girilen maliyetlerin sabit kaldığı varsayımıyla hesaplanır.')
    },
  },
{
    slug: 'tapu-harci-hesaplama', title: 'Tapu Harcı Hesaplama', shortTitle: 'Tapu Harcı', category: 'ev-yasam', icon: 'building', badge: 'Gayrimenkul', trend: true, trendRank: 5,
    description: 'Gayrimenkul satış bedeli, toplam harç oranı ve alıcı payına göre toplam, alıcı ve satıcı tapu harcını hesaplayın.',
    keywords: ['tapu harcı hesaplama', 'ev alım satım masrafı', 'tapu masrafı', 'alıcı satıcı harcı'],
    updatedAt: '2026-07-17',
    formula: 'Toplam tapu harcı = beyan edilen satış bedeli × toplam harç oranı. Alıcı ve satıcı payları seçilen dağılıma göre ayrılır.',
    sources: [{ label: 'Gelir İdaresi Harçlar Kanunu', url: 'https://www.gib.gov.tr/mevzuat/kanun/439' }, { label: 'GİB Tapu Harcı Ödeme', url: 'https://dijital.gib.gov.tr/hizliOdemeler/tapuHarciOdeme' }],
    fields: [
      { key: 'price', label: 'Satış bedeli', type: 'number', default: 3500000, min: 0, suffix: 'TL' },
      { key: 'rate', label: 'Toplam harç oranı', type: 'number', default: 4, min: 0, max: 100, step: 0.01, suffix: '%' },
      { key: 'buyerShare', label: 'Alıcının payı', type: 'number', default: 50, min: 0, max: 100, step: 1, suffix: '%' },
      { key: 'extra', label: 'Alıcı diğer masrafları', type: 'number', default: 0, min: 0, suffix: 'TL', help: 'Döner sermaye veya diğer masrafları biliyorsanız ekleyin.' },
    ],
    calculate: (v) => {
      const price=n(v.price), rate=n(v.rate), buyerShare=n(v.buyerShare), extra=n(v.extra), total=price*rate/100, buyer=total*buyerShare/100, seller=total-buyer
      return result([item('Toplam tapu harcı', money(total), 'primary'), item('Alıcının harcı', money(buyer)), item('Satıcının harcı', money(seller))], [item('Alıcının toplam masrafı', money(buyer+extra)), item('Uygulanan toplam oran', percent(rate)), item('Alıcı payı', percent(buyerShare))], 'Beyan değeri, istisnalar ve ek hizmet bedelleri gerçek tutarı değiştirebilir; resmî tahakkuku esas alın.')
    },
  },
{
    slug: 'emlakci-komisyonu-hesaplama', title: 'Emlakçı Komisyonu Hesaplama', shortTitle: 'Emlakçı Komisyonu', category: 'ev-yasam', icon: 'key', badge: 'Gayrimenkul', trend: true, trendRank: 12,
    description: 'Satış bedeli, taraf başına komisyon oranı ve KDV oranına göre alıcı, satıcı ve toplam emlakçı hizmet bedelini hesaplayın.',
    keywords: ['emlakçı komisyonu hesaplama', 'emlak komisyonu', 'ev satış komisyonu', 'KDV dahil komisyon'],
    updatedAt: '2026-07-17',
    formula: 'Taraf başına hizmet bedeli = satış bedeli × komisyon oranı. KDV dahil tutar, hizmet bedeline seçilen KDV oranının eklenmesiyle bulunur.',
    sources: [{ label: 'Ticaret Bakanlığı Taşınmaz Ticareti Yönetmeliği duyurusu', url: 'https://bolu.ticaret.gov.tr/duyurular/tasinmaz-ticareti-hakkinda-yonetmelik-resmi-gazetede-yayimlanarak-yururluge-gir' }],
    fields: [
      { key: 'price', label: 'Satış bedeli', type: 'number', default: 3500000, min: 0, suffix: 'TL' },
      { key: 'rate', label: 'Taraf başına komisyon', type: 'number', default: 2, min: 0, max: 100, step: 0.01, suffix: '%' },
      { key: 'vat', label: 'KDV oranı', type: 'number', default: 20, min: 0, max: 100, step: 0.01, suffix: '%' },
    ],
    calculate: (v) => {
      const price=n(v.price), rate=n(v.rate), vat=n(v.vat), base=price*rate/100, tax=base*vat/100, perSide=base+tax
      return result([item('Taraf başına KDV dahil', money(perSide), 'primary'), item('İki taraf toplamı', money(perSide*2)), item('Taraf başına KDV', money(tax))], [item('KDV hariç hizmet bedeli', money(base)), item('Komisyon oranı', percent(rate)), item('KDV oranı', percent(vat))], 'Sözleşmedeki paylaşım ve hizmet kapsamı farklı olabilir; imzalanan aracılık sözleşmesini esas alın.')
    },
  },
{
    slug: 'saatlik-ucret-hesaplama', title: 'Saatlik ve Günlük Ücret Hesaplama', shortTitle: 'Saatlik Ücret', category: 'maas-vergi', icon: 'stopwatch', badge: 'Çalışan', trend: true, trendRank: 13,
    description: 'Aylık ücret ve haftalık çalışma süresine göre yaklaşık günlük, saatlik ve dakikalık ücretinizi hesaplayın.',
    keywords: ['saatlik ücret hesaplama', 'günlük ücret hesaplama', 'maaşı saate çevirme', 'çalışma saati ücret'],
    updatedAt: '2026-07-17',
    sources: [{ label: 'Çalışma Bakanlığı çalışma süreleri', url: 'https://www.csgb.gov.tr/Media/j2gell2h/%C3%A7al%C4%B1%C5%9Fma-s%C3%BCreleri-ve-%C3%BCcret.pdf' }],
    fields: [
      { key: 'salary', label: 'Aylık ücret', type: 'number', default: 50000, min: 0, suffix: 'TL' },
      { key: 'weeklyHours', label: 'Haftalık çalışma', type: 'number', default: 45, min: 1, max: 168, step: 0.5, suffix: 'saat' },
      { key: 'workDays', label: 'Haftalık çalışma günü', type: 'number', default: 6, min: 1, max: 7, step: 1, suffix: 'gün' },
    ],
    calculate: (v) => {
      const salary=n(v.salary), weekly=n(v.weeklyHours), workDays=n(v.workDays), monthlyHours=weekly*52/12, hourly=salary/monthlyHours, daily=salary/(workDays*52/12)
      return result([item('Yaklaşık saatlik ücret', money(hourly), 'primary'), item('Yaklaşık günlük ücret', money(daily)), item('Dakikalık ücret', money(hourly/60))], [item('Aylık çalışma süresi', `${number(monthlyHours)} saat`), item('Haftalık çalışma', `${number(weekly)} saat`), item('Aylık ücret', money(salary))], 'Brüt/net ayrımı, ücretli izinler, primler ve sözleşme koşulları dahil değildir.')
    },
  },
{
    slug: 'indirme-suresi-hesaplama', title: 'Dosya İndirme Süresi Hesaplama', shortTitle: 'İndirme Süresi', category: 'pratik', icon: 'download', badge: 'Teknoloji', trend: true, trendRank: 14,
    description: 'Dosya boyutu ve internet hızına göre tahmini indirme süresini saniye, dakika ve saat olarak hesaplayın.',
    keywords: ['indirme süresi hesaplama', 'download time calculator', 'internet hızı dosya boyutu', 'mbps hesaplama'],
    fields: [
      { key: 'size', label: 'Dosya boyutu', type: 'number', default: 10, min: 0, step: 0.01, suffix: 'GB' },
      { key: 'speed', label: 'İnternet hızı', type: 'number', default: 100, min: 0.01, step: 0.01, suffix: 'Mbps' },
      { key: 'efficiency', label: 'Gerçek kullanım verimi', type: 'number', default: 85, min: 1, max: 100, step: 1, suffix: '%' },
    ],
    calculate: (v) => {
      const size=n(v.size), speed=n(v.speed), efficiency=n(v.efficiency), seconds=size*8*1024/(speed*(efficiency/100)), minutes=seconds/60
      const formatted=seconds<60?`${number(seconds)} saniye`:minutes<60?`${number(minutes)} dakika`:`${number(minutes/60)} saat`
      return result([item('Tahmini indirme süresi', formatted, 'primary'), item('Efektif hız', `${number(speed*efficiency/100)} Mbps`), item('Toplam süre', `${integer(seconds)} saniye`)], [item('Dosya boyutu', `${number(size)} GB`), item('Hat hızı', `${number(speed)} Mbps`), item('Verim varsayımı', percent(efficiency))], 'Wi‑Fi kalitesi, sunucu limiti ve ağ yoğunluğu gerçek süreyi değiştirebilir.')
    },
  },
{
    slug: 'doviz-cevirici', title: 'Döviz Çevirici', shortTitle: 'Döviz', category: 'pratik', icon: 'repeat', badge: 'Canlı Kur', special: 'currency',
    description: 'Güncel piyasa verisini tarayıcıdan alarak para birimleri arasında hızlı çeviri yapın.',
    keywords: ['döviz çevirici', 'kur hesaplama', 'tl dolar euro'], fields: [], calculate: () => result([]),
  }
]
