export const categoryIntentLinks = {
  finans: [
    {
      slug: 'kredi-hesaplama',
      title: 'Yeni kredi için taksit ve toplam maliyet',
      description: 'Kredi tutarı, aylık faiz, vade ve masraflarla aylık taksiti ve toplam geri ödemeyi karşılaştırın.',
    },
    {
      slug: 'kredi-karti-borc',
      title: 'Kredi kartı borcunu kapatma senaryosu',
      description: 'Kart borcunu seçtiğiniz faiz ve vadede eşit taksitli bir kapatma planı olarak simüle edin.',
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
      title: 'Yeni kira ve yıllık fark',
      description: 'Mevcut kira ve yenileme döneminiz için kullanacağınız artış oranıyla yeni aylık kirayı görün.',
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
}
