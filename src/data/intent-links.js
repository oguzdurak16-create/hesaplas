export const categoryIntentLinks = {
  finans: [
    {
      slug: 'kredi-hesaplama',
      title: 'Yeni kredi için taksit ve toplam maliyet',
      description: 'Kredi tutarı, aylık faiz, vade ve masraflarla aylık taksiti ve toplam geri ödemeyi karşılaştırın.',
    },
    {
      slug: 'kredi-karti-borc',
      title: 'Kredi kartı yapılandırma hesaplama',
      description: 'Kart borcunuzu yapılandırma faiz ve vadeye göre hesaplayın; aylık taksit, toplam ödeme ve finansman maliyetini görün.',
    },
    {
      slug: 'kredi-yapilandirma-hesaplama',
      title: 'Mevcut krediyi yapılandırma karşılaştırması',
      description: 'Kalan borcun mevcut planını yeni faiz, vade ve masraflarla karşılaştırıp toplam farkı görün.',
    },
    {
      slug: 'mevduat-faiz-hesaplama',
      title: 'Vadeli mevduatta net getiri',
      description: 'Brüt faiz, vade günü ve stopaj oranıyla net kazancı ve vade sonu tutarını hesaplayın.',
    },
  ],
  'maas-vergi': [
    {
      slug: 'maas-hesaplama',
      title: 'Brütten net maaş tahmini',
      description: 'SGK, işsizlik primi, gelir vergisi ve istisnaları kullanarak tek aylık yaklaşık net ücreti inceleyin.',
    },
    {
      slug: 'zam-hesaplama',
      title: 'Zam sonrası yeni maaş',
      description: 'Mevcut maaş ve zam yüzdesinden yeni tutarı, aylık farkı ve yıllık artış etkisini görün.',
    },
    {
      slug: 'kidem-tazminati',
      title: 'Kıdem tazminatı tahmini',
      description: 'Hizmet süresi, giydirilmiş brüt ücret ve geçerli tavanla yaklaşık kıdem tutarını hesaplayın.',
    },
  ],
  'ev-yasam': [
    {
      slug: 'kira-artis-hesaplama',
      title: 'Eylül 2026 kira artış oranı ve yeni kira',
      description: 'Eylül 2026 için %31,79 TÜFE 12 aylık ortalama oranıyla yeni aylık kirayı ve yıllık farkı hesaplayın.',
    },
    {
      slug: 'yakit-tuketimi-hesaplama',
      title: '100 km yakıt tüketimi ve yol maliyeti',
      description: 'Mesafe, tüketilen litre ve yakıt fiyatından 100 km tüketimini ve kilometre maliyetini hesaplayın.',
    },
    {
      slug: 'elektrik-tuketimi-hesaplama',
      title: 'Cihazın aylık elektrik maliyeti',
      description: 'Cihaz gücü, günlük kullanım ve birim enerji fiyatıyla aylık kWh ve yaklaşık maliyeti bulun.',
    },
  ],
  egitim: [
    {
      slug: 'yks-tyt-net-hesaplama',
      title: 'TYT ham net hesabı',
      description: 'Türkçe, Sosyal, Matematik ve Fen doğru-yanlışlarından ders netlerini ve toplam TYT netini hesaplayın.',
    },
    {
      slug: 'lgs-net-hesaplama',
      title: 'LGS ders ve toplam net hesabı',
      description: 'Alt testlerdeki doğru-yanlışlardan sözel, sayısal ve genel LGS ham netlerini ayrı görün.',
    },
    {
      slug: 'kpss-net-hesaplama',
      title: 'KPSS Genel Yetenek ve Genel Kültür neti',
      description: 'Doğru ve yanlış sayılarından iki testin netini ve toplam KPSS ham netini hesaplayın.',
    },
  ],
}

export const relatedToolSlugs = {
  'kredi-hesaplama': ['kredi-karti-borc', 'kredi-yapilandirma-hesaplama', 'mevduat-faiz-hesaplama'],
  'kredi-karti-borc': ['kredi-hesaplama', 'kredi-yapilandirma-hesaplama', 'mevduat-faiz-hesaplama'],
  'kredi-yapilandirma-hesaplama': ['kredi-hesaplama', 'kredi-karti-borc', 'mevduat-faiz-hesaplama'],
  'mevduat-faiz-hesaplama': ['kredi-hesaplama', 'kredi-yapilandirma-hesaplama', 'kredi-karti-borc'],
  'maas-hesaplama': ['zam-hesaplama', 'kidem-tazminati'],
  'zam-hesaplama': ['maas-hesaplama', 'kidem-tazminati'],
  'kidem-tazminati': ['maas-hesaplama', 'zam-hesaplama'],
  'kira-artis-hesaplama': ['yakit-tuketimi-hesaplama', 'elektrik-tuketimi-hesaplama'],
  'yakit-tuketimi-hesaplama': ['kira-artis-hesaplama', 'elektrik-tuketimi-hesaplama'],
  'elektrik-tuketimi-hesaplama': ['kira-artis-hesaplama', 'yakit-tuketimi-hesaplama'],
  'yks-tyt-net-hesaplama': ['lgs-net-hesaplama', 'kpss-net-hesaplama'],
  'lgs-net-hesaplama': ['yks-tyt-net-hesaplama', 'kpss-net-hesaplama'],
  'kpss-net-hesaplama': ['yks-tyt-net-hesaplama', 'lgs-net-hesaplama'],
}
