# Hesaplas.com v4.4

Next.js 14, statik export ve Vercel dağıtımı için hazırlanmış ücretsiz hesaplama platformu.

## v4.4 içeriği
- 48 çalışan araç: 47 yerel formül motoru ve canlı/manual modlu döviz çevirici
- Baştan tasarlanan mobil ve masaüstü arayüz
- SVG ikon sistemi ve kategori renkleri
- `Ctrl + K` veya `/` ile global araç arama
- Açık/koyu tema ve tarayıcıda tercih kaydı
- Mobil alt hızlı menü
- Kategori yan menüsü, gelişmiş arama ve A-Z sıralama
- Yenilenen hesaplama formu, sabit sonuç paneli ve senaryo karşılaştırma
- Favoriler, son kullanılan araçlar, paylaşma, kopyalama ve yazdırma
- Yeni araçlar: kâr marjı, başabaş noktası, tapu harcı, emlakçı komisyonu, saatlik ücret ve indirme süresi
- Araç bazlı metadata, canonical, FAQ, HowTo ve WebApplication şemaları
- 55 URL içeren tekrarsız sitemap
- Google Analytics `G-BDVJ5W4E3E`, AdSense ve Consent Mode v2
- Node.js `24.x` ve yalnızca genel npm registry adresleri

## Yerel çalıştırma
```bash
npm ci
npm run dev
```

## Üretim testi
```bash
npm run build
```

Statik çıktı `out/` klasöründe oluşur.

## GitLab
`GITLAB_PUSH.bat`, `main` dalını ve aşağıdaki depoyu kullanır:

`https://gitlab.com/oguzdurak16/hesaplas-com.git`

Kullanıcı adı `oguzdurak16`, e-posta `oguzdurak16@gmail.com` olarak ayarlıdır. Force push yapmaz; uzak geçmişi çekip güvenli birleştirme sonrasında push eder.
