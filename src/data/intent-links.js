export const categoryIntentLinks = {
  finans: [
    {
      slug: 'kredi-hesaplama',
      title: 'Yeni kredi için taksit ve toplam maliyet',
      description: 'Kredi tutarı, aylık faiz, vade ve masraflarla aylık taksiti ve toplam geri ödemeyi karşılaştırın.',
    },
    {
      slug: 'kredi-karti-borc',
      title: 'Kredi kartı borcu nasıl hesaplanır?',
      description: 'Kart borcunuzu aylık faiz ve vadeye göre hesaplayın; aylık taksit, toplam ödeme ve finansman maliyetini görün.',
    },
    {
      slug: 'kredi-yapilandirma-hesaplama',
      title: 'Mevcut krediyi yapılandırma karşılaştırması',
      description: 'Kalan borcun mevcut planını yeni faiz, vade ve masraflarla karşılaştırıp toplam farkı görün.',
    },
    {
      slug: 'mevduat-faiz-hesaplama',
      title: 'Mevduat faizi nasıl hesaplanır?',
      description: 'Anapara, yıllık brüt faiz, vade günü ve stopajla net kazancı ve vade sonu tutarını hesaplayın.',
    },
    {
      slug: 'bilesik-faiz-hesaplama',
      title: 'Bileşik faiz ve dönemsel büyüme',
      description: 'Anaparanın faiz tekrarlarıyla zaman içinde nasıl büyüdüğünü farklı dönem ve oranlarla hesaplayın.',
    },
    {
      slug: 'enflasyon-satin-alma-gucu',
      title: 'Paranın satın alma gücü',
      description: 'Enflasyon oranı ve süreye göre bugünkü paranın gelecekteki reel karşılığını karşılaştırın.',
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
      title: 'Kıdem tazminatı nasıl hesaplanır?',
      description: 'Hizmet süresi, giydirilmiş brüt ücret ve geçerli tavanla yaklaşık kıdem tutarını hesaplayın.',
    },
    {
      slug: 'ihbar-tazminati-hesaplama',
      title: 'İhbar tazminatı hesaplama',
      description: 'Çalışma süresine göre ihbar süresini ve ücret karşılığını yaklaşık olarak hesaplayın.',
    },
    {
      slug: 'fazla-mesai-hesaplama',
      title: 'Fazla mesai ücretini hesaplama',
      description: 'Saatlik ücret ve fazla çalışma süresine göre yaklaşık fazla mesai karşılığını görün.',
    },
    {
      slug: 'kdv-hesaplama',
      title: 'KDV dahil ve hariç hesaplama',
      description: 'KDV hariç fiyata vergi ekleyin veya KDV dahil toplamın içindeki matrah ve vergi tutarını ayırın.',
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
    {
      slug: 'tapu-harci-hesaplama',
      title: 'Tapu harcı hesaplama',
      description: 'Gayrimenkul satış bedeli ve harç oranıyla toplam, alıcı ve satıcı paylarını hesaplayın.',
    },
    {
      slug: 'emlakci-komisyonu-hesaplama',
      title: 'Emlakçı komisyonu hesaplama',
      description: 'Satış veya kiralama işleminde uygulanacak oran ve KDV ile yaklaşık komisyon tutarını görün.',
    },
    {
      slug: 'elektrikli-arac-sarj-maliyeti',
      title: 'Elektrikli araç şarj maliyeti',
      description: 'Tüketim, kWh fiyatı, mesafe ve şarj kaybına göre yolculuk ve 100 km maliyetini hesaplayın.',
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
  'mevduat-faiz-hesaplama': ['bilesik-faiz-hesaplama', 'enflasyon-satin-alma-gucu', 'kredi-hesaplama'],
  'bilesik-faiz-hesaplama': ['mevduat-faiz-hesaplama', 'enflasyon-satin-alma-gucu', 'birikim-hedefi-hesaplama'],
  'maas-hesaplama': ['zam-hesaplama', 'kidem-tazminati', 'fazla-mesai-hesaplama'],
  'zam-hesaplama': ['maas-hesaplama', 'kidem-tazminati', 'fazla-mesai-hesaplama'],
  'kidem-tazminati': ['ihbar-tazminati-hesaplama', 'maas-hesaplama', 'zam-hesaplama'],
  'ihbar-tazminati-hesaplama': ['kidem-tazminati', 'maas-hesaplama', 'fazla-mesai-hesaplama'],
  'fazla-mesai-hesaplama': ['maas-hesaplama', 'kidem-tazminati', 'ihbar-tazminati-hesaplama'],
  'kdv-hesaplama': ['vergi-hesaplama', 'kar-marji-hesaplama', 'basabas-noktasi-hesaplama'],
  'kira-artis-hesaplama': ['tapu-harci-hesaplama', 'emlakci-komisyonu-hesaplama', 'yakit-tuketimi-hesaplama'],
  'yakit-tuketimi-hesaplama': ['elektrikli-arac-sarj-maliyeti', 'kira-artis-hesaplama', 'elektrik-tuketimi-hesaplama'],
  'elektrik-tuketimi-hesaplama': ['gunes-paneli-geri-donus-hesaplama', 'yakit-tuketimi-hesaplama', 'kira-artis-hesaplama'],
  'tapu-harci-hesaplama': ['emlakci-komisyonu-hesaplama', 'kira-artis-hesaplama', 'kredi-hesaplama'],
  'emlakci-komisyonu-hesaplama': ['tapu-harci-hesaplama', 'kira-artis-hesaplama', 'kredi-hesaplama'],
  'yks-tyt-net-hesaplama': ['lgs-net-hesaplama', 'kpss-net-hesaplama'],
  'lgs-net-hesaplama': ['yks-tyt-net-hesaplama', 'kpss-net-hesaplama'],
  'kpss-net-hesaplama': ['yks-tyt-net-hesaplama', 'lgs-net-hesaplama'],
}
