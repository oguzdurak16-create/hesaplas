import { notFound } from 'next/navigation'
import Link from 'next/link'
import Script from 'next/script'
import ToolCard from '@/components/ToolCard'
import Icon from '@/components/Icon'
import { categories, tools } from '@/data/tools'
import { categoryIntentLinks } from '@/data/intent-links'
import { createMetadata, SITE_URL } from '@/lib/seo'

const categorySeo = {
  finans: {
    title: 'Finans Hesaplama Araçları',
    description: 'Kredi, faiz, borç, birikim, kâr marjı ve yatırım kararları için ücretsiz finans hesaplama araçlarını tek sayfada kullanın.',
    intro: 'Kredi taksitinden mevduat getirisine, borç yapılandırmadan kâr marjına kadar para kararlarını aynı yerde karşılaştırın.',
    keywords: ['finans hesaplama', 'kredi hesaplama', 'faiz hesaplama', 'borç hesaplama'],
  },
  'maas-vergi': {
    title: 'Maaş ve Vergi Hesaplama Araçları',
    description: 'Maaş, zam, kıdem, ihbar, fazla mesai, vergi ve çalışma hayatı hesaplarını ücretsiz araçlarla hızlıca yapın.',
    intro: 'Ücret, zam, tazminat ve vergi hesaplarını aynı kurallı akışta inceleyin; farklı senaryoları kolayca karşılaştırın.',
    keywords: ['maaş hesaplama', 'vergi hesaplama', 'kıdem hesaplama', 'zam hesaplama'],
  },
  'ev-yasam': {
    title: 'Ev ve Yaşam Hesaplama Araçları',
    description: 'Kira, yakıt, elektrik, emlak, ulaşım ve günlük yaşam giderleri için ücretsiz hesaplama araçlarını kullanın.',
    intro: 'Ev bütçesi ve günlük giderlerde aylık ve yıllık etkileri görün; farklı tüketim ve fiyat senaryolarını karşılaştırın.',
    keywords: ['kira hesaplama', 'yakıt hesaplama', 'elektrik hesaplama', 'ev gideri hesaplama'],
  },
  saglik: {
    title: 'Sağlık Hesaplama Araçları',
    description: 'BMI, ideal kilo, kalori, günlük su ihtiyacı ve gebelik gibi genel sağlık hesaplarını ücretsiz araçlarla yapın.',
    intro: 'Genel sağlık formüllerini hızlıca uygulayın. Sonuçların bilgilendirme amaçlı olduğunu ve tıbbi değerlendirme yerine geçmediğini dikkate alın.',
    keywords: ['bmi hesaplama', 'kalori hesaplama', 'ideal kilo hesaplama', 'su ihtiyacı'],
  },
  pratik: {
    title: 'Pratik Günlük Hesaplama Araçları',
    description: 'Yüzde, indirim, yaş, tarih farkı, birim fiyat ve taksit gibi günlük hesapları ücretsiz araçlarla anında yapın.',
    intro: 'Gün içinde tekrar tekrar yapılan küçük hesapları tek ekranda çözün; yüzde, tarih, fiyat ve alışveriş kararlarını hızlandırın.',
    keywords: ['yüzde hesaplama', 'indirim hesaplama', 'yaş hesaplama', 'tarih farkı'],
  },
  egitim: {
    title: 'Eğitim ve Sınav Hesaplama Araçları',
    description: 'YKS, TYT, AYT, LGS, KPSS, DGS ve OBP için net ve eğitim hesaplama araçlarını ücretsiz kullanın.',
    intro: 'Sınav netlerini ve eğitim hesaplarını ders bazında takip edin; denemeler arasında aynı kuralla karşılaştırma yapın.',
    keywords: ['yks net hesaplama', 'kpss net hesaplama', 'lgs net hesaplama', 'obp hesaplama'],
  },
  teknoloji: {
    title: 'Teknoloji ve Dijital Maliyet Hesaplama Araçları',
    description: 'Yapay zekâ token, API trafiği, SaaS metrikleri, indirme süresi ve dijital maliyet hesaplarını ücretsiz yapın.',
    intro: 'AI, API, SaaS ve dijital altyapı maliyetlerini kullanım miktarına göre senaryolayın ve bütçe etkisini görün.',
    keywords: ['ai token maliyeti', 'api maliyeti', 'saas hesaplama', 'indirme süresi hesaplama'],
  },
}

const CATEGORY_CSS = `
  .category-hub{padding:58px 0 92px;}
  .category-hub-hero{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:24px;align-items:end;padding:34px;border:1px solid #e1e8f1;border-radius:24px;background:#fff;box-shadow:0 18px 46px rgba(31,55,91,.07);}
  .category-hub-hero h1{max-width:850px;margin:10px 0 14px;font-size:clamp(2.25rem,4vw,4rem);line-height:1.02;letter-spacing:-.045em;}
  .category-hub-hero p{max-width:820px;color:#65758b;line-height:1.75;}
  .category-hub-count{min-width:150px;padding:20px;border-radius:18px;background:#f4f7fb;text-align:center;}
  .category-hub-count strong{display:block;font-size:2rem;}
  .category-hub-count span{font-size:.72rem;color:#728198;}
  .category-hub-grid{margin-top:32px;}
  .category-hub-grid .tool-grid-cards{grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;}
  .category-intent{margin-top:34px;padding:28px;border:1px solid #e1e8f1;border-radius:22px;background:#fff;}
  .category-intent h2{margin:8px 0 8px;}
  .category-intent>p{max-width:820px;color:#65758b;line-height:1.7;}
  .category-intent-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:18px;}
  .category-intent-card{display:block;padding:18px;border:1px solid #e3eaf3;border-radius:16px;background:#f9fbfd;transition:transform .15s ease,border-color .15s ease;}
  .category-intent-card:hover{transform:translateY(-2px);border-color:#c8d5e5;}
  .category-intent-card strong{display:block;margin-bottom:7px;font-size:.95rem;}
  .category-intent-card span{display:block;color:#68788e;font-size:.78rem;line-height:1.6;}
  .category-intent-card em{display:inline-block;margin-top:10px;font-style:normal;font-size:.72rem;font-weight:800;}
  .category-hub-note{margin-top:34px;padding:26px;border:1px solid #e1e8f1;border-radius:20px;background:#fff;}
  .category-hub-note h2{margin-bottom:10px;}
  .category-hub-note p{color:#65758b;line-height:1.75;}
  .category-switch{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px;}
  .category-switch a{padding:9px 12px;border:1px solid #dde5ef;border-radius:999px;background:#f8fafc;font-size:.75rem;font-weight:750;}
  @media(max-width:980px){.category-hub-grid .tool-grid-cards{grid-template-columns:repeat(2,minmax(0,1fr));}}
  @media(max-width:720px){.category-hub{padding-top:30px}.category-hub-hero{grid-template-columns:1fr;padding:24px}.category-hub-count{text-align:left}.category-hub-grid .tool-grid-cards{grid-template-columns:1fr}.category-intent-grid{grid-template-columns:1fr;}}
`

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.id }))
}

export const dynamicParams = false

export function generateMetadata({ params }) {
  const category = categories.find((item) => item.id === params.category)
  const seo = categorySeo[params.category]
  if (!category || !seo) return {}
  return createMetadata({
    title: seo.title,
    description: seo.description,
    path: `/kategori/${category.id}/`,
    keywords: seo.keywords,
  })
}

export default function CategoryPage({ params }) {
  const category = categories.find((item) => item.id === params.category)
  const seo = categorySeo[params.category]
  if (!category || !seo) notFound()

  const categoryTools = tools.filter((tool) => tool.category === category.id)
  const intentLinks = (categoryIntentLinks[category.id] || []).filter((item) => categoryTools.some((tool) => tool.slug === item.slug))
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: seo.title,
    description: seo.description,
    url: `${SITE_URL}/kategori/${category.id}/`,
    inLanguage: 'tr-TR',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: categoryTools.map((tool, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: tool.title,
        url: `${SITE_URL}/${tool.slug}/`,
      })),
    },
  }

  return (
    <div className="page-bg category-hub">
      <style dangerouslySetInnerHTML={{ __html: CATEGORY_CSS }} />
      <Script id={`${category.id}-category-schema`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="container">
        <nav className="breadcrumb"><Link href="/">Ana sayfa</Link><span>/</span><Link href="/tum-araclar/">Tüm araçlar</Link><span>/</span><strong>{category.name}</strong></nav>
        <header className={`category-hub-hero category-${category.id}`}>
          <div>
            <span className="eyebrow"><Icon name={category.icon} size="sm" /> {category.name}</span>
            <h1>{seo.title}</h1>
            <p>{seo.intro}</p>
          </div>
          <div className="category-hub-count"><strong>{categoryTools.length}</strong><span>ücretsiz hesaplama aracı</span></div>
        </header>

        {!!intentLinks.length && <section className="category-intent" aria-label={`${category.name} hesaplama rehberi`}>
          <span className="eyebrow">Hangi araç ne zaman?</span>
          <h2>İhtiyacınıza göre doğru hesaplamadan başlayın</h2>
          <p>Aynı kategorideki araçlar benzer görünse de farklı kararları cevaplar. Aşağıdaki başlangıç noktaları, aradığınız sonuca doğrudan gitmenizi sağlar.</p>
          <div className="category-intent-grid">
            {intentLinks.map((item) => <Link className="category-intent-card" href={`/${item.slug}/`} key={item.slug}>
              <strong>{item.title}</strong>
              <span>{item.description}</span>
              <em>Hesaplamayı aç →</em>
            </Link>)}
          </div>
        </section>}

        <section className="category-hub-grid" aria-label={`${category.name} araçları`}>
          <div className="tool-grid-cards">{categoryTools.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}</div>
        </section>

        <section className="category-hub-note">
          <span className="eyebrow">Hesaplas.com</span>
          <h2>{category.name} hesaplarını tek yerde karşılaştırın</h2>
          <p>{seo.description} Her araç kendi sayfasında formül açıklaması, örnek senaryo, sık sorulan sorular ve aynı karar zincirindeki ilgili hesaplamalara doğrudan bağlantılar içerir.</p>
          <div className="category-switch">
            {categories.filter((item) => item.id !== category.id).map((item) => <Link key={item.id} href={`/kategori/${item.id}/`}>{item.name}</Link>)}
          </div>
        </section>
      </div>
    </div>
  )
}
