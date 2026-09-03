export const indexRecovery = {
  'yakit-tuketimi-hesaplama': {
    seoTitle: 'Yakıt Tüketimi Hesaplama - 100 KM ve Kilometre Maliyeti',
    description: 'Gidilen kilometre, tüketilen litre ve yakıt fiyatıyla 100 km tüketimini, kilometre başı maliyeti ve toplam yol masrafını hesaplayın.',
    updatedAt: '2026-09-03',
    formula: '100 km tüketim = tüketilen litre / gidilen kilometre × 100. Toplam yakıt maliyeti = tüketilen litre × litre fiyatı. Kilometre başı maliyet = toplam yakıt maliyeti / gidilen kilometre.',
    example: 'Örnek: 500 km yolda 32 litre yakıt tüketildiğinde ortalama tüketim 6,4 L/100 km olur. Litre fiyatı 50 TL ise toplam yakıt maliyeti 1.600 TL, kilometre başı maliyet 3,20 TL olur.',
    guide: {
      intro: 'Yakıt tüketimini yalnızca depo göstergesine göre değil, dolumlar arasındaki gerçek mesafe ve alınan litre üzerinden hesaplamak daha sağlıklı karşılaştırma sağlar. Bu araç 100 km tüketimini, toplam yol maliyetini ve kilometre başına harcamayı aynı verilerden üretir.',
      evaluate: 'Farklı yolculukları karşılaştırırken aynı yakıt türünü ve mümkünse depo doldurma yöntemini kullanın. Şehir içi trafik, hız, klima, lastik basıncı, yük ve hava sıcaklığı tüketimi değiştirebilir; tek yolculuk yerine birkaç dolumun ortalamasına bakın.',
    },
    faqs: [
      { q: '100 km yakıt tüketimi nasıl hesaplanır?', a: 'Tüketilen litreyi gidilen kilometreye bölüp 100 ile çarpın. Örneğin 32 litre ile 500 km gidildiyse sonuç 6,4 L/100 km olur.' },
      { q: 'Kilometre başı yakıt maliyeti nasıl bulunur?', a: 'Toplam yakıt harcamasını gidilen kilometreye bölün. Litre fiyatı değiştiğinde aynı tüketimde kilometre maliyeti de değişir.' },
      { q: 'Araç ekranındaki ortalama tüketimle neden farklı çıkabilir?', a: 'Yol bilgisayarı tahmini tüketim üretir. Pompadan alınan litre ve gerçek kilometreyle yapılan dolumdan doluma ölçüm küçük farklar gösterebilir.' },
    ],
  },
  'elektrik-tuketimi-hesaplama': {
    seoTitle: 'Elektrik Tüketimi Hesaplama - Cihaz kWh ve Aylık Maliyet',
    description: 'Cihaz gücü, günlük çalışma süresi, kullanım günü ve TL/kWh birim fiyatıyla aylık elektrik tüketimini ve yaklaşık maliyeti hesaplayın.',
    updatedAt: '2026-09-03',
    formula: 'Aylık tüketim (kWh) = cihaz gücü (W) / 1000 × günlük kullanım saati × kullanım günü. Yaklaşık maliyet = aylık kWh × girdiğiniz birim enerji fiyatı.',
    example: 'Örnek: 1.500 W gücündeki bir cihaz günde 4 saat ve ayda 30 gün çalışırsa yaklaşık 180 kWh tüketir. Birim fiyatı 3 TL/kWh girildiğinde yalnız enerji bedeli üzerinden yaklaşık 540 TL aylık maliyet hesaplanır.',
    guide: {
      intro: 'Bir cihazın elektrik maliyetini hesaplamak için watt değerini çalışma süresiyle birlikte değerlendirmek gerekir. Yüksek güçlü ama kısa çalışan bir cihaz, düşük güçlü fakat gün boyu açık kalan başka bir cihazdan daha az enerji tüketebilir.',
      evaluate: 'Cihaz etiketindeki nominal güç her an aynı çekiş anlamına gelmeyebilir. Termostatlı, inverterli veya değişken hızlı cihazlar çalışma boyunca farklı güç kullanabilir. Fatura karşılaştırması yaparken dağıtım, vergi, kademe ve tarife bileşenlerinin birim fiyatı etkileyebileceğini dikkate alın.',
    },
    faqs: [
      { q: 'Watt değeri kWh değerine nasıl çevrilir?', a: 'Watt değerini 1000’e bölerek kW bulunur; bunu çalışma saatiyle çarptığınızda kWh tüketimi elde edilir.' },
      { q: 'Aylık elektrik maliyeti neden faturayla birebir aynı çıkmaz?', a: 'Araç girdiğiniz TL/kWh fiyatını kullanır. Gerçek faturada tarife, kademe, vergi ve diğer bedeller toplam birim maliyeti değiştirebilir.' },
      { q: 'İnverter klima veya buzdolabında hangi güç değeri kullanılmalı?', a: 'Bu cihazlarda anlık güç değişir. En doğru yaklaşım enerji etiketi, üretici tüketim verisi veya priz tipi enerji ölçerden alınan ortalama tüketimi kullanmaktır.' },
    ],
  },
}
