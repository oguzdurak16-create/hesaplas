export const currentEditorial = {
  'kira-artis-hesaplama': {
    seoTitle: 'Eylül 2026 Kira Artış Oranı Hesaplama - %31,79 TÜFE',
    description: 'Eylül 2026 kira artış oranı %31,79. Mevcut kira üzerinden aylık artışı, yeni kira bedelini ve yıllık farkı hesaplayın.',
    keywords: ['Eylül 2026 kira artış oranı', 'kira artış hesaplama', 'kira zammı hesaplama', 'TÜFE kira artışı', 'yeni kira hesaplama'],
    updatedAt: '2026-09-06',
    example: 'Örnek: 20.000 TL aylık kira için Eylül 2026 oranı %31,79 uygulandığında aylık artış 6.358 TL, yeni aylık kira 26.358 TL ve yıllık ek maliyet 76.296 TL olur.',
    guide: {
      intro: 'TÜİK’in 3 Eylül 2026’da yayımladığı Ağustos 2026 TÜFE bülteninde on iki aylık ortalamalara göre değişim %31,79 olarak açıklandı. Bu oran Eylül 2026 yenilemelerinde kira artış hesabında referans alınır. Farklı bir yenileme ayı için o aya karşılık gelen güncel oranı girin.',
      evaluate: 'Yenileme ayınızı, sözleşmedeki artış hükmünü ve TÜİK’in ilgili on iki aylık ortalama oranını birlikte kontrol edin. %31,79 Eylül 2026 yenilemeleri içindir; başka aylarda aynı oranı otomatik kullanmayın.',
    },
    faqs: [
      { q: 'Eylül 2026 kira artış oranı kaç?', a: 'TÜİK’in Ağustos 2026 TÜFE bülteninde on iki aylık ortalamalara göre değişim %31,79 olarak açıklandı. Bu oran Eylül 2026 yenilemeleri için referans alınır.' },
      { q: 'Eylül 2026’da 20.000 TL kira ne kadar olur?', a: '%31,79 oran tamamen uygulanırsa 20.000 TL kira 6.358 TL artarak 26.358 TL olur.' },
      { q: 'Kira artışında yıllık TÜFE mi 12 aylık ortalama mı kullanılır?', a: 'Konut ve çatılı iş yeri kiralarında Türk Borçlar Kanunu m.344 kapsamında on iki aylık ortalamalara göre TÜFE değişimi dikkate alınır; yıllık TÜFE oranı aynı değer değildir.' },
      { q: 'Eylül oranı sonraki aylarda da geçerli mi?', a: 'Hayır. Yenileme ayı değiştikçe referans alınan TÜİK verisi de değişir.' },
      { q: 'Ev sahibi %31,79’dan daha az artış yapabilir mi?', a: 'Evet. Bu oran hesaplamada dikkate alınan üst sınırdır; sözleşme ve somut hukuki durumlar ayrıca değerlendirilmelidir.' },
      { q: 'Kira artış oranı hangi kaynaktan geliyor?', a: 'Oran, TÜİK’in 3 Eylül 2026 tarihli Ağustos 2026 Tüketici Fiyat Endeksi bültenindeki on iki aylık ortalama değişim verisidir.' },
    ],
    sources: [
      { label: 'TÜİK — Tüketici Fiyat Endeksi, Ağustos 2026', url: 'https://veriportali.tuik.gov.tr/tr/press/58290/metadata' },
    ],
    fieldOverrides: {
      renewalDate: { default: 'today', help: 'Eylül 2026 içinde yenilenen sözleşmeler için TÜİK Ağustos 2026 verisi referans alınır.' },
      rate: { default: 31.79, help: 'Eylül 2026 yenilemeleri için TÜİK’in 12 aylık ortalama TÜFE değişimi %31,79’dur. Farklı yenileme ayında oranı güncelleyin.' },
    },
  },
}
