import { notFound } from 'next/navigation'
import Link from 'next/link'
import Script from 'next/script'
import CalculatorApp from '@/components/CalculatorApp'
import ToolCard from '@/components/ToolCard'
import Icon from '@/components/Icon'
import FavoriteButton from '@/components/FavoriteButton'
import { categories, toolMap, tools } from '@/data/tools'
import { createMetadata, SITE_URL } from '@/lib/seo'

const categoryContent = {
  finans: {
    intro: 'Bu finans aracı, girilen tutar ve oranları genel finans matematiğiyle işler. Banka masrafı, sigorta, vergi veya kuruma özel koşullar ayrıca değişebilir.',
    evaluate: 'Ana sonuçla birlikte toplam maliyet, oran ve dönem farklarını da inceleyin. Karşılaştırma yaparken tüm seçeneklerde aynı vade ve aynı masraf kapsamını kullanın.',
  },
  'maas-vergi': {
    intro: 'Bu araç ücret, süre ve oran bilgilerini temel alarak yaklaşık sonuç üretir. Vergi dilimleri, tavanlar, istisnalar ve mevzuat dönemsel olarak değişebilir.',
    evaluate: 'Brüt ve net tutarları karıştırmadan değerlendirin. Resmî bordro veya hak ediş işlemlerinde güncel mevzuat ve kurum hesaplaması esas alınmalıdır.',
  },
  'ev-yasam': {
    intro: 'Bu araç günlük gider ve yaşam hesaplarını sadeleştirir. Sonuç doğrudan girdiğiniz tüketim, fiyat, mesafe veya oran değerlerine bağlıdır.',
    evaluate: 'Tek seferlik sonuç yerine aylık ve yıllık karşılıkları birlikte inceleyin. Fiyat değişebiliyorsa farklı senaryolar girerek aralık oluşturun.',
  },
  saglik: {
    intro: 'Bu araç genel kabul gören formüllerle bilgilendirme amaçlı bir tahmin sunar. Tanı, tedavi veya kişisel sağlık değerlendirmesi yerine geçmez.',
    evaluate: 'Sonucu tek başına karar ölçütü olarak kullanmayın. Yaş, sağlık durumu, gebelik, ilaç kullanımı ve kişisel farklılıklar için sağlık uzmanına başvurun.',
  },
  pratik: {
    intro: 'Bu pratik araç, günlük hesapları hızlı ve tekrar kullanılabilir hâle getirir. Alanlara kendi değerlerinizi yazdığınızda sonuç tarayıcıda anında yenilenir.',
    evaluate: 'Birimleri aynı tuttuğunuzdan emin olun. Karşılaştırma yaparken her seçenek için aynı ölçü, tarih veya fiyat temelini kullanın.',
  },
  egitim: {
    intro: 'Bu eğitim aracı doğru ve yanlış sayılarını ilgili sınavın ham net kuralına göre işler. Standart puan, okul başarı puanı ve aday dağılımı gibi değişkenleri içermez.',
    evaluate: 'Netleri ders bazında ve denemeler arasında takip edin. Kesin puan, sıralama veya yüzdelik dilim için yalnızca resmî sınav sonucunu esas alın.',
  },
  teknoloji: {
    intro: 'Bu teknoloji aracı API, yapay zeka, SaaS veya dijital altyapı maliyetlerini girilen kullanım değerleriyle tahmin eder. Sağlayıcı fiyatları ve kullanım desenleri zaman içinde değişebilir.',
    evaluate: 'Fiyat alanlarını kullandığınız hizmetin güncel tarifesiyle doldurun. En doğru bütçe için düşük, normal ve yüksek kullanım senaryolarını ayrı ayrı kaydedip karşılaştırın.',
  },
}

const applicationCategories = {
  finans: 'FinanceApplication',
  'maas-vergi': 'BusinessApplication',
  'ev-yasam': 'UtilitiesApplication',
  saglik: 'HealthApplication',
  pratik: 'UtilitiesApplication',
  egitim: 'EducationalApplication',
  teknoloji: 'DeveloperApplication',
}

export function generateStaticParams() { return tools.map((tool) => ({ slug: tool.slug })) }
export const dynamicParams = false

export function generateMetadata({ params }) {
  const tool = toolMap[params.slug]
  if (!tool) return {}
  return createMetadata({ title: tool.title, description: tool.description, path: `/${tool.slug}/`, keywords: tool.keywords })
}

export default function ToolPage({ params }) {
  const tool = toolMap[params.slug]
  if (!tool) notFound()
  const category = categories.find((item) => item.id === tool.category)
  const related = tools.filter((item) => item.category === tool.category && item.slug !== tool.slug).slice(0, 3)
  const guide = { ...categoryContent[tool.category], ...(tool.guide || {}) }
  const defaultFaq = [
    { q: `${tool.title} nasıl kullanılır?`, a: `Formdaki ${tool.fields.length ? tool.fields.map((field) => field.label.toLocaleLowerCase('tr-TR')).slice(0, 3).join(', ') : 'gerekli'} bilgilerini girin. Sonuç tarayıcınızda anında hesaplanır.` },
    { q: 'Hesaplama sonucu kesin midir?', a: 'Sonuç, girilen değerlere ve aracın kullandığı genel formüle göre oluşturulan bilgilendirme amaçlı bir tahmindir. Resmî işlemlerde ilgili kurumun güncel verilerini kullanın.' },
    { q: 'Girdiğim bilgiler kaydediliyor mu?', a: 'Hesaplama değerleri tarayıcınızda işlenir. Hesaplas.com bu girdileri kullanıcı hesabına kaydetmez.' },
  ]
  const faq = [...(tool.faqs || []), ...defaultFaq].slice(0, 5)
  const updatedLabel = new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${tool.updatedAt}T12:00:00`))
  const schema = {
    '@context': 'https://schema.org', '@graph': [
      { '@type': 'WebApplication', name: tool.title, url: `${SITE_URL}/${tool.slug}/`, applicationCategory: applicationCategories[tool.category], operatingSystem: 'Any', browserRequirements: 'JavaScript', offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' }, description: tool.description, inLanguage: 'tr-TR', dateModified: tool.updatedAt },
      { '@type': 'HowTo', name: `${tool.title} nasıl yapılır?`, description: tool.description, totalTime: 'PT1M', step: [{ '@type': 'HowToStep', position: 1, name: 'Değerleri girin', text: tool.fields.length ? tool.fields.map((field) => field.label).join(', ') : 'Gerekli değerleri girin' }, { '@type': 'HowToStep', position: 2, name: 'Sonucu inceleyin', text: 'Hesaplanan ana sonuçları ve ayrıntıları karşılaştırın.' }] },
      { '@type': 'FAQPage', mainEntity: faq.map((row) => ({ '@type': 'Question', name: row.q, acceptedAnswer: { '@type': 'Answer', text: row.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: SITE_URL }, { '@type': 'ListItem', position: 2, name: category?.name, item: `${SITE_URL}/tum-araclar/#${tool.category}` }, { '@type': 'ListItem', position: 3, name: tool.title, item: `${SITE_URL}/${tool.slug}/` }] },
    ],
  }
  return <div className="page-bg">
    <Script id={`${tool.slug}-schema`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <div className="container tool-page-container">
      <nav className="breadcrumb"><Link href="/">Ana sayfa</Link><span>/</span><Link href={`/tum-araclar/#${tool.category}`}>{category?.name}</Link><span>/</span><strong>{tool.shortTitle}</strong></nav>
      <header className={`tool-page-hero category-${tool.category}`}><span className="tool-hero-icon"><Icon name={tool.icon} size="lg" /></span><div className="tool-hero-copy"><span className="eyebrow">{category?.name} aracı {tool.badge && `• ${tool.badge}`}</span><h1>{tool.title}</h1><p>{tool.description}</p><div className="tool-hero-meta"><small className="updated-label">İçerik güncellemesi: {updatedLabel}</small><FavoriteButton slug={tool.slug} /></div></div></header>
      <CalculatorApp slug={tool.slug} />
      <section className="content-layout"><article className="seo-article"><span className="eyebrow">Hesaplama rehberi</span><h2>{tool.title} nedir?</h2><p>{guide.intro}</p><h3>Hesaplama nasıl yapılır?</h3><p>{tool.formula || `${tool.fields.map((field) => field.label).join(', ')} değerleri aracın formülünde birlikte kullanılır. Alanlardan birini değiştirdiğinizde sonuç otomatik olarak yeniden hesaplanır.`}</p><h3>Sonucu nasıl değerlendirmelisiniz?</h3><p>{guide.evaluate}</p><h3>Sonucu paylaşma ve karşılaştırma</h3><p>Paylaş düğmesi girdiğiniz değerleri sayfa adresine ekler. Senaryoyu kaydet seçeneğiyle en fazla üç sonucu yalnızca kendi tarayıcınızda karşılaştırabilirsiniz.</p>{!!tool.sources?.length && <div className="source-box"><strong>Resmî ve birincil kaynaklar</strong>{tool.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer noopener">{source.label} ↗</a>)}</div>}</article><aside className="faq-card"><span className="eyebrow">Sık sorulanlar</span><h2>Merak edilenler</h2>{faq.map((row) => <details key={row.q}><summary>{row.q}<span>+</span></summary><p>{row.a}</p></details>)}</aside></section>
      {!!related.length && <section className="related-section"><div className="section-heading"><div><span className="eyebrow">Sonraki hesap</span><h2>İlgili araçlar</h2></div><Link className="text-link" href="/tum-araclar/">Tüm araçlar →</Link></div><div className="tool-grid-cards">{related.map((item) => <ToolCard key={item.slug} tool={item} />)}</div></section>}
    </div>
  </div>
}
