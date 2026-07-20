import { n, money, number, integer, percent, usd, result, item } from '../tool-utils'

export const toolsPart09 = [
  {
    slug: 'yapay-zeka-token-maliyeti', title: 'Yapay Zeka Token Maliyeti Hesaplama', shortTitle: 'AI Token Maliyeti', category: 'teknoloji', icon: 'sparkles', badge: 'Yapay Zeka', trend: true, trendRank: 1,
    description: 'Girdi ve çıktı token sayıları ile milyon token başına fiyatlara göre yapay zeka API kullanım maliyetini USD ve TL olarak hesaplayın.',
    keywords: ['yapay zeka token maliyeti', 'AI API maliyet hesaplama', 'LLM token calculator', 'OpenAI maliyet', 'Claude Gemini maliyet'],
    updatedAt: '2026-07-20',
    formula: 'Toplam maliyet = (girdi tokenı ÷ 1.000.000 × girdi fiyatı) + (çıktı tokenı ÷ 1.000.000 × çıktı fiyatı).',
    fields: [
      { key: 'inputTokens', label: 'Girdi tokenı', type: 'number', default: 1000000, min: 0, suffix: 'token' },
      { key: 'outputTokens', label: 'Çıktı tokenı', type: 'number', default: 250000, min: 0, suffix: 'token' },
      { key: 'inputPrice', label: 'Girdi fiyatı', type: 'number', default: 1, min: 0, step: 0.0001, suffix: '$ / 1M' },
      { key: 'outputPrice', label: 'Çıktı fiyatı', type: 'number', default: 4, min: 0, step: 0.0001, suffix: '$ / 1M' },
      { key: 'usdTry', label: 'USD/TL kuru', type: 'number', default: 40, min: 0.01, step: 0.01, suffix: 'TL' },
    ],
    calculate: (v) => {
      const input=n(v.inputTokens), output=n(v.outputTokens), inputPrice=n(v.inputPrice), outputPrice=n(v.outputPrice), rate=n(v.usdTry)
      const inputCost=input/1000000*inputPrice, outputCost=output/1000000*outputPrice, total=inputCost+outputCost
      return result([item('Toplam API maliyeti', usd(total), 'primary'), item('TL karşılığı', money(total*rate)), item('1.000 istek tahmini', usd(total/1000), 'success')], [item('Girdi maliyeti', usd(inputCost)), item('Çıktı maliyeti', usd(outputCost)), item('Toplam token', integer(input+output))], 'Model fiyatları sık değişebilir. Kullandığınız sağlayıcının güncel milyon token fiyatlarını alanlara girin.')
    },
  },
  {
    slug: 'api-trafik-maliyeti', title: 'API Trafik ve Veri Maliyeti Hesaplama', shortTitle: 'API Trafik Maliyeti', category: 'teknoloji', icon: 'route', badge: 'Geliştirici', trend: true, trendRank: 9,
    description: 'Günlük istek sayısı, istek ve yanıt boyutu ile veri çıkış fiyatına göre aylık API trafiğini ve yaklaşık maliyetini hesaplayın.',
    keywords: ['API maliyet hesaplama', 'egress cost calculator', 'veri transfer maliyeti', 'cloud API traffic'],
    updatedAt: '2026-07-20',
    formula: 'Aylık veri = günlük istek × gün × (istek KB + yanıt KB). Veri çıkış maliyeti GB başına fiyatla hesaplanır.',
    fields: [
      { key: 'requests', label: 'Günlük istek', type: 'number', default: 100000, min: 0, suffix: 'istek' },
      { key: 'requestKB', label: 'Ortalama istek boyutu', type: 'number', default: 2, min: 0, step: 0.01, suffix: 'KB' },
      { key: 'responseKB', label: 'Ortalama yanıt boyutu', type: 'number', default: 25, min: 0, step: 0.01, suffix: 'KB' },
      { key: 'days', label: 'Faturalama dönemi', type: 'number', default: 30, min: 1, max: 366, suffix: 'gün' },
      { key: 'egressPrice', label: 'Veri çıkış fiyatı', type: 'number', default: 0.09, min: 0, step: 0.0001, suffix: '$ / GB' },
    ],
    calculate: (v) => {
      const req=n(v.requests), requestKB=n(v.requestKB), responseKB=n(v.responseKB), days=n(v.days), price=n(v.egressPrice)
      const totalRequests=req*days, totalGB=totalRequests*(requestKB+responseKB)/1024/1024, cost=totalGB*price
      return result([item('Aylık veri trafiği', `${number(totalGB)} GB`, 'primary'), item('Tahmini veri maliyeti', usd(cost)), item('Toplam istek', integer(totalRequests), 'success')], [item('Günlük veri', `${number(totalGB/days)} GB`), item('İstek başı veri', `${number(requestKB+responseKB)} KB`), item('1 milyon istek maliyeti', usd((requestKB+responseKB)/1024/1024*1000000*price))], 'İşlem, veritabanı, sunucu ve API sağlayıcı ücretleri dahil değildir; yalnızca veri transferi tahminidir.')
    },
  },
  {
    slug: 'saas-mrr-churn-ltv-hesaplama', title: 'SaaS MRR, Churn ve LTV Hesaplama', shortTitle: 'SaaS Metrikleri', category: 'teknoloji', icon: 'chart', badge: 'SaaS', trend: true, trendRank: 10,
    description: 'Müşteri sayısı, kullanıcı başı gelir, aylık churn ve brüt marja göre MRR, kaybedilen gelir ve yaklaşık müşteri yaşam boyu değerini hesaplayın.',
    keywords: ['SaaS MRR hesaplama', 'churn calculator', 'LTV hesaplama', 'abonelik geliri'],
    updatedAt: '2026-07-20',
    formula: 'MRR = aktif müşteri × ARPU. Yaklaşık LTV = ARPU × brüt marj ÷ aylık churn oranı.',
    fields: [
      { key: 'customers', label: 'Aktif müşteri', type: 'number', default: 500, min: 0, suffix: 'müşteri' },
      { key: 'arpu', label: 'Aylık kullanıcı başı gelir', type: 'number', default: 750, min: 0, suffix: 'TL' },
      { key: 'churn', label: 'Aylık müşteri kaybı', type: 'number', default: 3, min: 0.01, max: 100, step: 0.01, suffix: '%' },
      { key: 'margin', label: 'Brüt marj', type: 'number', default: 80, min: 0, max: 100, step: 0.1, suffix: '%' },
    ],
    calculate: (v) => {
      const customers=n(v.customers), arpu=n(v.arpu), churn=n(v.churn), margin=n(v.margin), mrr=customers*arpu
      const lostCustomers=customers*churn/100, lostMrr=lostCustomers*arpu, ltv=arpu*(margin/100)/(churn/100)
      return result([item('Aylık tekrar eden gelir', money(mrr), 'primary'), item('Yaklaşık müşteri LTV', money(ltv), 'success'), item('Aylık kaybedilen MRR', money(lostMrr), 'warning')], [item('Tahmini kaybedilen müşteri', number(lostCustomers)), item('Yıllık gelir koşusu', money(mrr*12)), item('Ortalama müşteri ömrü', `${number(1/(churn/100))} ay`)], 'Basitleştirilmiş SaaS metriğidir; expansion MRR, cohort davranışı ve müşteri edinme maliyeti dahil değildir.')
    },
  },
  {
    slug: 'elektrikli-arac-sarj-maliyeti', title: 'Elektrikli Araç Şarj Maliyeti Hesaplama', shortTitle: 'EV Şarj Maliyeti', category: 'ev-yasam', icon: 'zap', badge: 'Elektrikli Araç', trend: true, trendRank: 2,
    description: 'Mesafe, araç tüketimi, kWh fiyatı ve şarj kaybına göre elektrikli aracın yolculuk ve 100 kilometre maliyetini hesaplayın.',
    keywords: ['elektrikli araç şarj maliyeti', 'EV cost calculator', 'kWh 100 km maliyet', 'elektrikli otomobil tüketim'],
    updatedAt: '2026-07-20',
    formula: 'Net enerji = mesafe × tüketim ÷ 100. Şebekeden çekilen enerji, şarj kaybı eklenerek bulunur.',
    fields: [
      { key: 'distance', label: 'Yolculuk mesafesi', type: 'number', default: 500, min: 0, suffix: 'km' },
      { key: 'consumption', label: 'Araç tüketimi', type: 'number', default: 17, min: 0.01, step: 0.1, suffix: 'kWh/100 km' },
      { key: 'unitPrice', label: 'Elektrik birim fiyatı', type: 'number', default: 8, min: 0, step: 0.01, suffix: 'TL/kWh' },
      { key: 'loss', label: 'Şarj kaybı', type: 'number', default: 10, min: 0, max: 100, step: 0.1, suffix: '%' },
    ],
    calculate: (v) => {
      const distance=n(v.distance), consumption=n(v.consumption), price=n(v.unitPrice), loss=n(v.loss)
      const netEnergy=distance*consumption/100, gridEnergy=netEnergy*(1+loss/100), cost=gridEnergy*price
      return result([item('Yolculuk şarj maliyeti', money(cost), 'primary'), item('100 km maliyeti', money(distance ? cost/distance*100 : 0), 'success'), item('Şebekeden çekilen enerji', `${number(gridEnergy)} kWh`)], [item('Bataryaya ulaşan enerji', `${number(netEnergy)} kWh`), item('Şarj kaybı maliyeti', money((gridEnergy-netEnergy)*price)), item('Kilometre maliyeti', `${number(distance ? cost/distance : 0)} TL/km`)], 'Tarife, sıcaklık, hız, klima kullanımı ve şarj cihazı verimi gerçek maliyeti değiştirir.')
    },
  },
  {
    slug: 'gunes-paneli-geri-donus-hesaplama', title: 'Güneş Paneli Geri Dönüş Süresi Hesaplama', shortTitle: 'Güneş Paneli Geri Dönüşü', category: 'ev-yasam', icon: 'sun', badge: 'Enerji', trend: true, trendRank: 3,
    description: 'Sistem maliyeti, aylık elektrik faturası, karşılama oranı ve bakım giderine göre güneş enerjisi yatırımının basit geri dönüş süresini hesaplayın.',
    keywords: ['güneş paneli geri dönüş süresi', 'solar yatırım hesaplama', 'GES amortisman', 'elektrik faturası güneş paneli'],
    updatedAt: '2026-07-20',
    formula: 'Yıllık net tasarruf = aylık fatura × 12 × karşılama oranı − yıllık bakım. Geri dönüş = sistem maliyeti ÷ yıllık net tasarruf.',
    fields: [
      { key: 'systemCost', label: 'Toplam sistem maliyeti', type: 'number', default: 350000, min: 0, suffix: 'TL' },
      { key: 'monthlyBill', label: 'Ortalama aylık fatura', type: 'number', default: 6500, min: 0, suffix: 'TL' },
      { key: 'coverage', label: 'Faturayı karşılama oranı', type: 'number', default: 80, min: 0, max: 100, step: 0.1, suffix: '%' },
      { key: 'maintenance', label: 'Yıllık bakım gideri', type: 'number', default: 5000, min: 0, suffix: 'TL' },
      { key: 'annualIncrease', label: 'Yıllık enerji fiyat artışı', type: 'number', default: 20, min: 0, max: 500, step: 0.1, suffix: '%' },
    ],
    calculate: (v) => {
      const cost=n(v.systemCost), bill=n(v.monthlyBill), coverage=n(v.coverage), maintenance=n(v.maintenance), increase=n(v.annualIncrease)
      const firstYear=bill*12*coverage/100-maintenance
      if (firstYear <= 0) return result([item('Geri dönüş süresi', 'Hesaplanamaz', 'warning')], [item('İlk yıl net tasarruf', money(firstYear))], 'Net yıllık tasarruf pozitif olmalıdır.')
      let cumulative=0, year=0, annualSaving=firstYear
      while (cumulative < cost && year < 50) { cumulative += annualSaving; year += 1; annualSaving = (annualSaving+maintenance)*(1+increase/100)-maintenance }
      const simplePayback=cost/firstYear
      return result([item('Basit geri dönüş süresi', `${number(simplePayback)} yıl`, 'primary'), item('Fiyat artışlı tahmini süre', `${integer(year)} yıl`, 'success'), item('İlk yıl net tasarruf', money(firstYear))], [item('İlk yıl brüt tasarruf', money(bill*12*coverage/100)), item('10 yıllık basit tasarruf', money(firstYear*10-cost)), item('Karşılama oranı', percent(coverage))], 'Keşif, üretim tahmini, panel bozulması, finansman ve mahsuplaşma koşulları ayrıca değerlendirilmelidir.')
    },
  },
  {
    slug: 'ulasim-karbon-ayak-izi', title: 'Ulaşım Karbon Ayak İzi Hesaplama', shortTitle: 'Karbon Ayak İzi', category: 'ev-yasam', icon: 'route', badge: 'Sürdürülebilirlik', trend: true, trendRank: 11,
    description: 'Günlük mesafe, kullanım günü, kilometre başına emisyon ve araçtaki kişi sayısına göre aylık ve yıllık ulaşım karbon ayak izinizi hesaplayın.',
    keywords: ['karbon ayak izi hesaplama', 'ulaşım emisyon hesaplama', 'kg CO2 hesaplama', 'araç karbon salımı'],
    updatedAt: '2026-07-20',
    formula: 'Aylık emisyon = günlük mesafe × kullanım günü × kilometre başına emisyon. Kişi başı değer yolcu sayısına bölünür.',
    fields: [
      { key: 'dailyDistance', label: 'Günlük toplam mesafe', type: 'number', default: 40, min: 0, suffix: 'km' },
      { key: 'days', label: 'Aylık kullanım günü', type: 'number', default: 22, min: 0, max: 31, suffix: 'gün' },
      { key: 'factor', label: 'Emisyon faktörü', type: 'number', default: 0.18, min: 0, step: 0.001, suffix: 'kg CO₂/km' },
      { key: 'passengers', label: 'Araçtaki kişi sayısı', type: 'number', default: 1, min: 1, max: 100, step: 1, suffix: 'kişi' },
    ],
    calculate: (v) => {
      const distance=n(v.dailyDistance), days=n(v.days), factor=n(v.factor), passengers=n(v.passengers)
      const monthly=distance*days*factor, annual=monthly*12, perPerson=monthly/passengers
      return result([item('Aylık toplam emisyon', `${number(monthly)} kg CO₂`, 'primary'), item('Yıllık toplam emisyon', `${number(annual/1000)} ton CO₂`), item('Kişi başı aylık', `${number(perPerson)} kg CO₂`, 'success')], [item('Aylık mesafe', `${integer(distance*days)} km`), item('Emisyon faktörü', `${number(factor)} kg/km`), item('Araçtaki kişi', integer(passengers))], 'Emisyon faktörü yakıt türü, araç modeli, trafik ve hesaplama standardına göre değişir; güncel faktörü kendiniz girebilirsiniz.')
    },
  },
  {
    slug: 'enflasyon-satin-alma-gucu', title: 'Enflasyon ve Satın Alma Gücü Hesaplama', shortTitle: 'Satın Alma Gücü', category: 'finans', icon: 'chart-down', badge: 'Ekonomi', trend: true, trendRank: 4,
    description: 'Tutar, yıllık enflasyon ve süreye göre gelecekte aynı alım gücü için gereken parayı ve mevcut paranın reel değerini hesaplayın.',
    keywords: ['enflasyon hesaplama', 'satın alma gücü hesaplama', 'paranın gelecekteki değeri', 'reel değer'],
    updatedAt: '2026-07-20',
    formula: 'Gelecekte gerekli tutar = bugünkü tutar × (1 + enflasyon oranı)^yıl.',
    fields: [
      { key: 'amount', label: 'Bugünkü tutar', type: 'number', default: 100000, min: 0, suffix: 'TL' },
      { key: 'inflation', label: 'Yıllık enflasyon', type: 'number', default: 30, min: -99, max: 1000, step: 0.1, suffix: '%' },
      { key: 'years', label: 'Süre', type: 'number', default: 3, min: 0, max: 100, step: 0.1, suffix: 'yıl' },
    ],
    calculate: (v) => {
      const amount=n(v.amount), inflation=n(v.inflation), years=n(v.years), factor=Math.pow(1+inflation/100,years)
      const required=amount*factor, real=amount/factor, erosion=amount-real
      return result([item('Aynı alım gücü için gereken', money(required), 'primary'), item('Mevcut tutarın reel değeri', money(real)), item('Satın alma gücü kaybı', money(erosion), 'warning')], [item('Bileşik fiyat artışı', percent((factor-1)*100)), item('Süre', `${number(years)} yıl`), item('Yıllık varsayım', percent(inflation))], 'Enflasyonun her yıl sabit kaldığı varsayılır; kişisel harcama sepetiniz resmî endeksten farklı olabilir.')
    },
  },
  {
    slug: 'freelance-saatlik-ucret-hesaplama', title: 'Freelance Saatlik Ücret Hesaplama', shortTitle: 'Freelance Ücret', category: 'maas-vergi', icon: 'stopwatch', badge: 'Serbest Çalışma', trend: true, trendRank: 8,
    description: 'Hedef net gelir, faturalandırılabilir saat, gider, vergi ve tatil süresine göre sürdürülebilir minimum freelance saatlik ücretinizi hesaplayın.',
    keywords: ['freelance saatlik ücret hesaplama', 'serbest çalışan fiyat belirleme', 'danışmanlık saat ücreti', 'freelancer rate calculator'],
    updatedAt: '2026-07-20',
    formula: 'Gerekli yıllık ciro = hedef net yıllık gelir ÷ (1 − gider oranı − vergi oranı). Saatlik ücret, yıllık ciroya göre faturalandırılabilir saatlere bölünür.',
    constraints: [{ keys: ['overhead', 'tax'], max: 95, message: 'Gider ve vergi oranlarının toplamı %95’i geçemez.' }],
    fields: [
      { key: 'targetNet', label: 'Hedef aylık net gelir', type: 'number', default: 80000, min: 0, suffix: 'TL' },
      { key: 'billableHours', label: 'Aylık faturalandırılabilir saat', type: 'number', default: 100, min: 1, max: 744, suffix: 'saat' },
      { key: 'overhead', label: 'İşletme gider oranı', type: 'number', default: 20, min: 0, max: 95, step: 0.1, suffix: '%' },
      { key: 'tax', label: 'Vergi ve kesinti payı', type: 'number', default: 25, min: 0, max: 95, step: 0.1, suffix: '%' },
      { key: 'vacationWeeks', label: 'Yıllık çalışılmayan hafta', type: 'number', default: 6, min: 0, max: 51, step: 1, suffix: 'hafta' },
    ],
    calculate: (v) => {
      const net=n(v.targetNet), hours=n(v.billableHours), overhead=n(v.overhead), tax=n(v.tax), vacation=n(v.vacationWeeks)
      const annualNet=net*12, keep=1-(overhead+tax)/100, annualRevenue=annualNet/keep, annualHours=hours*12*(52-vacation)/52, hourly=annualRevenue/annualHours
      return result([item('Minimum saatlik ücret', money(hourly), 'primary'), item('Hedef aylık ciro', money(annualRevenue/12)), item('Günlük 8 saat karşılığı', money(hourly*8), 'success')], [item('Yıllık hedef ciro', money(annualRevenue)), item('Yıllık faturalandırılabilir saat', number(annualHours)), item('Gider + vergi payı', percent(overhead+tax))], 'Bu araç fiyatlama için yaklaşık hedef verir; KDV, tahsilat riski ve proje bazlı değer fiyatlaması ayrıca ele alınmalıdır.')
    },
  }
]
