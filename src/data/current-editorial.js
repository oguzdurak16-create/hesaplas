export const currentEditorial = {
  'kira-artis-hesaplama': {
    title: 'Eylül 2026 Kira Artış Oranı ve Yeni Kira Hesaplama',
    seoTitle: 'Eylül 2026 Kira Artış Oranı Hesaplama - %31,79 TÜFE',
    description: 'Eylül 2026 kira artış oranı %31,79. Mevcut kira üzerinden aylık artışı, yeni kira bedelini ve yıllık farkı hesaplayın.',
    keywords: ['Eylül 2026 kira artış oranı', 'kira artış hesaplama', 'kira zammı hesaplama', 'TÜFE kira artışı', 'yeni kira hesaplama'],
    updatedAt: '2026-09-06',
    trendRank: 0,
    replaceSources: true,
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
  'kredi-karti-borc': {
    title: 'Kredi Kartı Yapılandırma ve Borç Taksit Hesaplama 2026',
    shortTitle: 'Kart Yapılandırma',
    seoTitle: 'Kredi Kartı Yapılandırma Hesaplama 2026 - Taksit ve Toplam Ödeme',
    description: 'Kredi kartı borcunuzu yapılandırma faiz ve vadeye göre hesaplayın; aylık taksiti, toplam ödemeyi ve finansman maliyetini görün. 29 Ocak 2026 tarihli özel BDDK başvuru süresi sona ermiştir.',
    keywords: ['kredi kartı yapılandırma hesaplama', 'kredi kartı borç yapılandırma hesaplama', 'kredi kartı borcu yapılandırma', 'kredi kartı taksit hesaplama', 'kredi kartı yapılandırma faizi 2026'],
    updatedAt: '2026-09-06',
    trendRank: 1,
    replaceSources: true,
    example: 'Örnek: 100.000 TL kart borcu, aylık %3,11 faiz ve 24 ay vade seçildiğinde, faiz üzerindeki ek yük alanı 0 bırakılırsa yaklaşık aylık taksit 5.975 TL ve toplam ödeme 143.398 TL olur. Bankanız faiz üzerine vergi veya başka yük uyguluyorsa ilgili oranı ayrıca girin.',
    guide: {
      intro: '29 Ocak 2026 tarihli 11366 sayılı BDDK kararı, karar tarihindeki şartları taşıyan bireysel kredi kartı borçları için başvurunun üç ay içinde yapılması koşuluyla en fazla 48 aya kadar yeniden yapılandırma imkânı tanıdı. Bu özel başvuru penceresi artık sona ermiştir. Sayfadaki hesaplayıcı, mevcut bir yapılandırma planını veya bankanızın yeni teklifini matematiksel olarak karşılaştırmak için kullanılabilir.',
      evaluate: 'TCMB’ye göre 11366 sayılı karar kapsamındaki kredi kartı yapılandırmalarında aylık akdi faiz oranı aylık referans oran olan %3,11’i aşamaz. Bankanız daha düşük oran uygulayabilir. Hesaplamada bankanızın gerçek faizini, vadeyi ve varsa faiz üzerindeki ek yükü kullanın; özel BDDK başvuru hakkı ile mevcut banka teklifini birbirinden ayırın.',
    },
    faqs: [
      { q: '2026 kredi kartı yapılandırma faizi en fazla kaç?', a: 'TCMB, 29 Ocak 2026 tarihli 11366 sayılı BDDK kararı kapsamındaki kredi kartı yapılandırmalarında aylık akdi faiz oranının aylık referans oran olan %3,11’i aşamayacağını belirtir.' },
      { q: 'Kredi kartı borcu en fazla kaç ay yapılandırılabiliyordu?', a: '11366 sayılı BDDK kararı, şartları taşıyan bireysel kredi kartı borçları için en fazla 48 ay vade öngördü.' },
      { q: '29 Ocak 2026 yapılandırma başvurusu hâlâ açık mı?', a: 'Hayır. Kararda başvurunun karar tarihinden itibaren üç ay içinde yapılması şartı vardı; bu özel başvuru süresi sona ermiştir.' },
      { q: 'Mevcut banka yapılandırma teklifimi burada hesaplayabilir miyim?', a: 'Evet. Borç tutarını, bankanın verdiği aylık faizi, vadeyi ve varsa faiz üzerindeki ek yükü girerek taksit ve toplam ödeme karşılaştırması yapabilirsiniz.' },
      { q: 'Faiz üzerindeki ek yük alanına ne yazmalıyım?', a: 'Bankanızın teklif veya ödeme planında faiz üzerine uygulanan vergi, fon ya da benzeri ek yük varsa toplam oranı girin. Kesin oranı bilmiyorsanız 0 bırakıp sonucu yalnız temel faiz simülasyonu olarak okuyun.' },
      { q: 'Kredi kartı yapılandırma ile normal kart faizi aynı mı?', a: 'Hayır. Yapılandırma ayrı bir ödeme planıdır. TCMB, ilgili BDDK kararları kapsamındaki yapılandırmalar için aylık akdi faizi referans oranla sınırlar; normal kart borcuna uygulanan azami oranlar dönem borcu dilimine göre ayrıca belirlenir.' },
    ],
    sources: [
      { label: 'BDDK — 29.01.2026 tarihli 11366 sayılı Kurul Kararı', url: 'https://www.bddk.org.tr/Mevzuat/DokumanGetir/1325' },
      { label: 'TCMB — Kredi kartı işlemlerinde uygulanacak azami faiz oranları', url: 'https://www.tcmb.gov.tr/wps/wcm/connect/TR/TCMB+TR/Main+Menu/Istatistikler/Bankacilik+Verileri/Kredi_Karti_Islemlerinde_Uygulanacak_Azami_Faiz_Oranlari' },
    ],
    fieldOverrides: {
      rate: { default: 3.11, help: '11366 sayılı BDDK kararı kapsamındaki kredi kartı yapılandırmalarında aylık akdi faiz %3,11 referans oranını aşamaz. Mevcut banka teklifiniz daha düşükse teklif oranını girin.' },
      months: { default: 24, max: 48, help: '11366 sayılı BDDK kararı kapsamındaki azami vade 48 aydı. Mevcut banka teklifinizdeki vadeyi girin.' },
      extraRate: { default: 0, help: 'Bankanızın teklifinde faiz üzerine uygulanan vergi, fon veya benzeri ek yük varsa toplam oranı girin. Kesin oranı bilmiyorsanız 0 bırakın.' },
    },
  },
}
