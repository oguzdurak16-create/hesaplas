# Cloudflare Pages geçişi — Hesaplas.com

**Amaç:** Mevcut statik Next.js 14 sitesini aynı URL'lerle, yeni zorunlu aylık gider doğurmadan Cloudflare Pages Free'e taşımak.

## İçe aktarma

1. Cloudflare hesabında **Workers & Pages → Create application → Pages → Import an existing Git repository**.
2. GitHub bağlantısında `oguzdurak16-create/hesaplas` deposuna izin ver, **production branch = main**.
3. Framework preset: **Next.js (Static HTML Export)**.
4. Build command: `npm run build` (bu komut `postbuild` SEO denetimini de çalıştırır).
5. Build output directory: `out`. Root directory: depo kökü.
6. Environment variable: `NODE_VERSION=24` (depoda `.node-version` dosyası da 24 belirtir).
7. Plan: **Free**; Pages Functions/Workers ekleme, ücretli planı açma.
8. `*.pages.dev` geçici adresinde aşağıdaki kontrol listesini doğrula. **Bundan önce DNS'i değiştirme**.

## Yayın öncesi doğrulama
- Ana sayfa, araç arama, 48 hesaplayıcı, kategori sayfaları.
- `/abkant-tonaj` ücretsiz mühendislik hesaplayıcısı (3 mm, 1.000 mm, Rm 450 MPa, V24 için yaklaşık 239,6 kN / 24,44 tf).
- `/sitemap.xml` ve `/robots.txt`, canonical `https://www.hesaplas.com`.
- Analytics (`G-BDVJ5W4E3E`), AdSense kodunun yüklenmesi, çerez onayı.
- Mobil görünüm, her sayfa HTTPS, CDN statik varlıkları ve 404 yanıtı.

## Alan adı bağlama (yalnızca testler geçerse)
- Cloudflare Pages → Custom domains → önce `www.hesaplas.com`, ardından `hesaplas.com`.
- Apex domain için Cloudflare DNS zone gerekir; nameserver değiştirmeden önce tüm mevcut A/AAAA/CNAME/MX/TXT/CAA ve e-posta doğrulama kayıtlarını eksiksiz koru.
- Yalnızca www alt alan adı kullanılacaksa mevcut DNS hizmetinde `www` için Pages'in atadığı `<proje>.pages.dev` CNAME kullanılabilir.
- `hesaplas.com` → `https://www.hesaplas.com` 301 yönlendirmesini Cloudflare Redirect Rules ile yapılandır; path/query korunmalı.
- Her iki alan adında TLS ve en önemli 10 URL'nin yanıtlarını doğrula; ancak ondan sonra eski Vercel alan adı bağlantısını kaldır.
- DNS değişikliği yapılana kadar Vercel mevcut siteyi sunmaya devam eder.

## Geri dönüş
DNS kayıtları ve Vercel domain ayarları saklanmalı. Site hatalıysa DNS kayıtlarını eski hedefe döndür, cache ve sertifika durumunu izle.

## Teknik/finansal sınırlar
- Cloudflare Pages Free: statik varlık istekleri ücretsiz ve sınırsız; ücretsiz plan için 500 build/ay, en fazla 20.000 dosya, dosya başına 25 MiB.
- Cloudflare Pages Functions/Workers eklenirse statik sınırsız trafik garantisi bütün isteklere uygulanmaz.
- Domain yenileme, üçüncü taraf yazılım, Ads ve yasal yükümlülükler barındırma ücreti değildir ve ayrıca devam edebilir.
- Vercel Hobby yalnızca kişisel, ticari olmayan kullanıma izin verir.
- Vergisel uygunluk (GVK 20/B veya diğer hükümler) ayrıca teyit edilmeden ticari gelir otomatik olarak başlatılmamalı.

Kaynaklar:
- https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/
- https://developers.cloudflare.com/pages/configuration/build-image/
- https://developers.cloudflare.com/pages/configuration/custom-domains/
- https://developers.cloudflare.com/pages/functions/pricing/
- https://developers.cloudflare.com/pages/platform/limits/
- https://vercel.com/docs/plans/hobby
