export const focusEditorial = {
  'kredi-hesaplama': {
    seoTitle: 'Kredi Hesaplama 2026 - Taksit ve Toplam Geri Ödeme',
    description: 'Kredi tutarı, aylık faiz, vade ve masraflarla aylık taksiti, toplam geri ödemeyi, finansman maliyetini ve ödeme planını hesaplayın.',
    updatedAt: '2026-08-14',
    example: 'Örnek: 250.000 TL kredi, aylık %3,49 faiz ve 24 ay vade seçildiğinde araç eşit taksit formülüyle aylık ödemeyi hesaplar; ayrıca tüm taksitlerin toplamını, faiz yükünü ve girdiğiniz tek seferlik masrafları ayrı gösterir. Banka tekliflerini karşılaştırırken aynı ana para ve vade ile senaryo oluşturun.',
    guide: {
      intro: 'Kredi hesabında yalnızca aylık taksite bakmak yanıltıcı olabilir. Bu araç ana para, aylık faiz, vade ve bilinen tek seferlik masrafları aynı ekranda birleştirerek taksit yükünü ve toplam geri ödemeyi karşılaştırılabilir hale getirir.',
      evaluate: 'İki banka teklifini karşılaştırırken kredi tutarı ve vadeyi aynı tutun. Aylık taksit düşük görünse bile uzun vade toplam finansman maliyetini yükseltebilir. Sigorta, ekspertiz ve tahsis gibi masrafları biliyorsanız masraf alanına ekleyin.',
    },
    faqs: [
      { q: 'Kredi hesaplamada en önemli karşılaştırma değeri hangisi?', a: 'Tek bir değer yeterli değildir. Aylık taksit ödeme gücünü, toplam geri ödeme ve finansman maliyeti ise kredinin toplam yükünü gösterir.' },
      { q: 'Faiz oranı düşerse yapılandırma mantıklı olur mu?', a: 'Yeni oran tek başına yeterli değildir. Kalan borç, kalan vade, yeni vade ve yapılandırma masrafları birlikte karşılaştırılmalıdır.' },
    ],
  },
  'kredi-karti-borc': {
    seoTitle: 'Kredi Kartı Borç Hesaplama 2026 - Taksit ve Faiz Simülasyonu',
    description: 'Kredi kartı borcunuzu aylık faiz ve kapatma süresine göre eşit taksitli senaryoda hesaplayın; toplam ödeme ve finansman maliyetini görün.',
    updatedAt: '2026-08-14',
    example: 'Örnek: 75.000 TL kart borcunu 12 ayda kapatma senaryosunda araç, girdiğiniz aylık akdi faiz ve varsa faiz üzerindeki ek yükü kullanarak her ayın faiz ve ana para payını hesaplar. Bu bir banka ekstresi değil, teklif karşılaştırma simülasyonudur.',
    guide: {
      intro: 'Kart borcu hesaplama aracı, borcun yeni harcama yapılmadan eşit taksitlerle kapatıldığı varsayımsal bir senaryo üretir. Böylece farklı faiz ve vade seçeneklerinin aylık ödeme ile toplam maliyete etkisini yan yana görebilirsiniz.',
      evaluate: 'Sonucu bankanızın gerçek yapılandırma veya borç transferi teklifiyle karşılaştırın. Ekstre faizi, gecikme faizi, vergi ve ücretler farklı uygulanabileceği için teklifinizdeki oranları araca aynen girmeniz önemlidir.',
    },
  },
  'kredi-yapilandirma-hesaplama': {
    seoTitle: 'Kredi Yapılandırma Hesaplama 2026 - Eski ve Yeni Plan Karşılaştırma',
    description: 'Kalan kredi borcunuzu yeni faiz ve vadeyle yapılandırdığınızda aylık taksit ve toplam maliyetin mevcut plana göre nasıl değişeceğini hesaplayın.',
    updatedAt: '2026-08-14',
    example: 'Örnek: 150.000 TL kalan borç için mevcut 10 taksit ile yeni 18 aylık yapılandırmayı karşılaştırabilirsiniz. Araç yeni aylık taksiti, yeni toplam ödemeyi ve mevcut plandan farkı aynı sonuç ekranında gösterir.',
    guide: {
      intro: 'Yapılandırma kararında amaç yalnızca taksiti düşürmek değil, kalan borcun toplam maliyetini anlamaktır. Daha uzun vade aylık ödemeyi azaltırken toplam faiz yükünü artırabilir.',
      evaluate: 'Bankadan kalan ana para veya erken kapama tutarını öğrenin; kalan taksitlerin toplamını borç ana parası sanmayın. Yeni yapılandırma masrafı varsa mutlaka ekleyin ve toplam farkı pozitif/negatif olarak değerlendirin.',
    },
    faqs: [
      { q: 'Taksit düşüyorsa yapılandırma kesin avantajlı mıdır?', a: 'Hayır. Vade uzadığı için aylık ödeme düşerken toplam geri ödeme artabilir. Kararı toplam maliyet farkına göre değerlendirin.' },
    ],
  },
  'mevduat-faiz-hesaplama': {
    seoTitle: 'Mevduat Faiz Hesaplama 2026 - Net Vadeli Mevduat Getirisi',
    description: 'Anapara, yıllık brüt faiz, vade günü ve stopaj oranına göre brüt faiz, vergi kesintisi, net kazanç ve vade sonu tutarını hesaplayın.',
    updatedAt: '2026-08-14',
    example: 'Örnek: 250.000 TL anapara için bankanızın verdiği yıllık brüt faiz oranını, vade gününü ve o vadeye uygulanan stopaj oranını girin. Araç brüt faizden stopajı düşerek net kazancı ve vade sonu toplamını gösterir.',
    guide: {
      intro: 'Vadeli mevduat karşılaştırırken bankaların ilan ettiği brüt faiz oranı tek başına yeterli değildir. Vade günü ve stopaj oranı net getiriyi doğrudan etkiler.',
      evaluate: 'Aynı anapara için teklifleri karşılaştırırken gün sayısını ve stopajı eşitleyin. Hoş geldin faizi, koşullu oran veya vade sonunda yenilenen oran gibi kampanya şartlarını ayrıca kontrol edin.',
    },
    faqs: [
      { q: 'Mevduat faizinde brüt ve net getiri farkı nedir?', a: 'Brüt getiri vergi kesintisi öncesidir. Net getiri, girilen stopaj oranı düşüldükten sonra kalan kazançtır.' },
      { q: 'Stopaj oranı neden kullanıcıdan isteniyor?', a: 'Stopaj oranları ürünün türüne ve vadesine göre değişebildiği için araç güncel bankacılık ürününüzdeki oranı girmenizi ister.' },
    ],
    sources: [
      { label: 'Gelir İdaresi Başkanlığı — Menkul sermaye iradı bilgileri', url: 'https://www.gib.gov.tr/vergi-konulari/1_bireysel/10_menkul_sermaye_iradi/10' },
    ],
  },
  'maas-hesaplama': {
    seoTitle: '2026 Brüt Net Maaş Hesaplama - Net Ücret Tahmini',
    description: '2026 SGK prime esas kazanç sınırı, çalışan primleri, gelir vergisi oranı ve istisna tutarlarıyla tek aylık yaklaşık brüt-net maaş hesabı yapın.',
    updatedAt: '2026-08-14',
    example: 'Örnek: Aylık 75.000 TL brüt ücret için araç önce SGK ve işsizlik primi matrahını, ardından gelir vergisi matrahını hesaplar. Seçtiğiniz gelir vergisi oranı ve girdiğiniz istisnalar uygulandıktan sonra yaklaşık net ücret gösterilir. Bu hesap tam yıllık bordro simülasyonu değildir.',
    guide: {
      intro: '2026 maaş aracında SGK prime esas kazanç üst sınırı 297.270 TL olarak tanımlıdır. Gelir vergisinde ise kullanıcının kümülatif matrahına karşılık gelen oranı seçmesi gerekir; araç vergi dilimine hangi ayda geçtiğinizi otomatik tahmin etmez.',
      evaluate: 'Bordro kontrolünde yalnız net maaşı değil SGK matrahı, çalışan primi, işsizlik primi, gelir vergisi ve damga vergisi kalemlerini ayrı inceleyin. Prim, ikramiye, yemek/yol ve kişisel istisnalar sonucu değiştirebilir.',
    },
    faqs: [
      { q: '2026 SGK aylık prime esas kazanç üst sınırı nedir?', a: 'SGK tarafından özel sektör için 1 Ocak–31 Aralık 2026 döneminde aylık üst sınır 297.270 TL olarak yayımlanmıştır.' },
      { q: '2026 ücret gelir vergisi oranları nelerdir?', a: '2026 tarifesinde oranlar %15, %20, %27, %35 ve %40 olarak uygulanır; hangi oranın kullanılacağı kümülatif ücret matrahına göre değişir.' },
    ],
  },
  'zam-hesaplama': {
    seoTitle: 'Maaş Zam Hesaplama 2026 - Yüzde Zam ve Yeni Maaş',
    description: 'Eski maaş ve zam yüzdesinden yeni maaşı, aylık ve yıllık artış tutarını hesaplayın; maaş farkını saniyeler içinde görün.',
    updatedAt: '2026-08-14',
    example: 'Örnek: 50.000 TL maaşa %25 zam uygulandığında artış 12.500 TL, yeni maaş 62.500 TL olur. Araç aylık farkın yanında bu farkın 12 aylık karşılığını da gösterir.',
    guide: {
      intro: 'Zam hesabı, mevcut tutarın belirli bir yüzde kadar artırılmasıdır. Araç maaş dışında kira, fiyat, bütçe veya ücret gibi herhangi bir tutarın yüzdesel artışını hesaplamak için de kullanılabilir.',
      evaluate: 'Brüt maaşa yapılan zam ile net maaş artışı aynı olmayabilir. Bordro etkisini görmek istiyorsanız zam sonucundaki yeni brüt tutarı brüt-net maaş aracında ayrıca hesaplayın.',
    },
  },
  'kidem-tazminati': {
    seoTitle: 'Kıdem Tazminatı Hesaplama 2026 - Güncel Tavan ve Net Tahmin',
    description: 'İşe giriş ve ayrılış tarihi, giydirilmiş brüt ücret ve 2026 ikinci yarı kıdem tazminatı tavanıyla yaklaşık brüt ve damga vergisi sonrası kıdem tutarını hesaplayın.',
    updatedAt: '2026-08-14',
    example: 'Örnek: Giydirilmiş brüt ücreti 90.000 TL olan çalışanda 1 Temmuz–31 Aralık 2026 dönemi için bir hizmet yılı hesabında ücret yerine 73.729,87 TL tavan esas alınır. Araç toplam hizmet gününü oransal yıla çevirir ve damga vergisi sonrası tahmini gösterir.',
    guide: {
      intro: 'Kıdem tazminatında hesap tabanı, giydirilmiş brüt ücret ile geçerli dönem tavanından düşük olan tutardır. 1 Temmuz–31 Aralık 2026 için resmî tavan 73.729,87 TL’dir. Araç tutarı hesaplar; kıdeme hak kazanıp kazanmadığınızı hukuken belirlemez.',
      evaluate: 'İşe giriş ve ayrılış tarihlerini, düzenli yan hakları içeren giydirilmiş brüt ücreti ve ayrılış dönemindeki tavanı kontrol edin. İşten ayrılma sebebi ve hizmetin niteliği hak kazanma sonucunu değiştirebilir.',
    },
    faqs: [
      { q: '2026 ikinci yarı kıdem tazminatı tavanı ne kadar?', a: 'Çalışma ve Sosyal Güvenlik Bakanlığı 1 Temmuz–31 Aralık 2026 dönemi için bir hizmet yılına ilişkin tavanı 73.729,87 TL olarak yayımlamıştır.' },
      { q: 'Kıdem tazminatından gelir vergisi kesilir mi?', a: 'Kıdem tazminatının istisna kapsamındaki kısmından gelir vergisi kesilmez; araç damga vergisi oranını ayrıca uygular.' },
    ],
  },
  'kira-artis-hesaplama': {
    seoTitle: 'Kira Artış Oranı Hesaplama 2026 - Yeni Kira ve TÜFE',
    description: 'Mevcut kira ve sözleşme yenileme ayınız için geçerli TÜFE 12 aylık ortalama oranını girerek yeni aylık kirayı ve yıllık farkı hesaplayın.',
    updatedAt: '2026-08-14',
    example: 'Örnek: 20.000 TL kira ve %32,03 artış oranı kullanılırsa aylık artış 6.406 TL, yeni kira 26.406 TL olur. %32,03 oranı Temmuz 2026 yenilemelerine ait örnektir; farklı yenileme aylarında TÜİK’in o dönem için yayımladığı oran girilmelidir.',
    guide: {
      intro: 'Kira artışında kullanılacak TÜFE 12 aylık ortalama oranı sözleşmenin yenilendiği aya göre değişir. Araç oranı hukuken otomatik seçmek yerine kullanıcıdan alır; böylece eski bir oranı “güncel” diye uygulama riskini azaltır.',
      evaluate: 'Önce sözleşme yenileme ayınızı belirleyin, sonra o dönem için yayımlanmış TÜİK 12 aylık ortalama oranını kontrol edin. Sözleşmedeki daha düşük oran veya özel hukuki durumlar ayrıca dikkate alınmalıdır.',
    },
    faqs: [
      { q: 'Kira artışında hangi TÜFE oranı kullanılır?', a: 'Konut ve çatılı işyeri kiralarında yenileme döneminde TÜFE’nin on iki aylık ortalamalara göre değişim oranı temel yasal sınır olarak dikkate alınır; sözleşme ve özel durumlar sonucu etkileyebilir.' },
      { q: 'Temmuz 2026 kira artış oranı kaçtı?', a: 'TÜİK’in Haziran 2026 bültenindeki on iki aylık ortalama değişim %32,03’tür ve Temmuz 2026 yenilemeleri için referans olmuştur.' },
    ],
    fieldOverrides: {
      renewalDate: { default: 'today', help: 'Sözleşmenizin yenilendiği tarihi seçin; uygulanacak oran yenileme ayına göre değişir.' },
      rate: { default: 0, help: 'Yenileme ayınız için TÜİK tarafından yayımlanan TÜFE 12 aylık ortalama oranını girin. Temmuz 2026 örneği %32,03’tür.' },
    },
  },
  'kdv-hesaplama': {
    seoTitle: 'KDV Hesaplama 2026 - KDV Dahil ve Hariç Hesaplama',
    description: 'KDV hariç tutara vergi ekleyin veya KDV dahil fiyatın içindeki matrah ve KDV tutarını %1, %10, %20 ya da kendi oranınızla ayırın.',
    updatedAt: '2026-08-14',
    example: 'Örnek: KDV hariç 10.000 TL tutara %20 oran uygulandığında KDV 2.000 TL ve KDV dahil toplam 12.000 TL olur. KDV dahil tutardan geriye hesapta ise matrah, toplam tutarın 1 + oran/100 değerine bölünmesiyle bulunur.',
    guide: {
      intro: 'KDV hesabında “hariçten dahile” ve “dahilden harice” işlemleri farklıdır. Hariç tutarda vergi matraha eklenir; dahil tutarda ise vergi doğrudan toplamın yüzde 20’si alınarak ayrılamaz, matrah ters formülle bulunmalıdır.',
      evaluate: 'İşleme uygulanacak KDV oranını ürün veya hizmetin güncel mevzuattaki sınıfına göre kontrol edin. Araç matematiksel ayrıştırma yapar; hangi mal veya hizmete hangi oranın uygulanacağını belirlemez.',
    },
    faqs: [
      { q: 'KDV dahil tutardan KDV nasıl ayrılır?', a: 'Matrah = KDV dahil tutar / (1 + oran/100). KDV tutarı da toplamdan matrah çıkarılarak bulunur.' },
      { q: 'Türkiye’de tek bir KDV oranı mı var?', a: 'Hayır. İşlemin niteliğine göre farklı oranlar uygulanabilir; genel oran ve indirimli oranlar mevzuatla belirlenir.' },
    ],
    sources: [
      { label: 'Gelir İdaresi Başkanlığı — Katma Değer Vergisi Kanunu, Madde 28', url: 'https://www.gib.gov.tr/mevzuat/kanun/436' },
    ],
  },
  'yakit-tuketimi-hesaplama': {
    seoTitle: 'Yakıt Tüketimi Hesaplama - 100 KM ve Kilometre Maliyeti',
    description: 'Gidilen mesafe, tüketilen litre ve yakıt fiyatıyla 100 km tüketimini, kilometre başı maliyeti ve toplam yol masrafını hesaplayın.',
    updatedAt: '2026-08-14',
    example: 'Örnek: 500 km’de 32 litre yakıt tüketen araç 100 km’de 6,4 litre yakar. Litre fiyatı 50 TL ise toplam yakıt maliyeti 1.600 TL, kilometre maliyeti 3,20 TL olur.',
    guide: {
      intro: 'Gerçek yakıt tüketimini ölçmenin en pratik yolu, iki dolum arasında gidilen kilometreyi ve tekrar depoyu doldurmak için alınan litreyi kullanmaktır. Araç bu iki değerden litre/100 km tüketimini çıkarır.',
      evaluate: 'Şehir içi, uzun yol, klima kullanımı, yük, lastik basıncı ve sürüş tarzı tüketimi değiştirebilir. Karşılaştırma yaparken mümkünse benzer rota ve kullanım koşullarındaki dolumları kullanın.',
    },
    faqs: [
      { q: '100 km yakıt tüketimi nasıl hesaplanır?', a: 'Tüketilen litre, gidilen kilometreye bölünür ve 100 ile çarpılır. Örneğin 32 litre / 500 km × 100 = 6,4 L/100 km.' },
      { q: 'Kilometre başı yakıt maliyeti nasıl bulunur?', a: 'Toplam alınan yakıtın TL maliyeti gidilen kilometreye bölünür.' },
    ],
  },
}
