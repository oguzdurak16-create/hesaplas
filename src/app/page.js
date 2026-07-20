import Link from 'next/link'
import Script from 'next/script'
import ToolExplorer from '@/components/ToolExplorer'
import ToolCard from '@/components/ToolCard'
import Icon from '@/components/Icon'
import RecentTools from '@/components/RecentTools'
import SearchLauncher from '@/components/SearchLauncher'
import FavoriteTools from '@/components/FavoriteTools'
import { categories, trendingTools, tools } from '@/data/tools'
import { createMetadata, SITE_URL } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Ücretsiz Online Hesaplama Araçları',
  description: 'Kredi, kira, maaş, vergi, eğitim, sağlık ve günlük ihtiyaçlar için hızlı, ücretsiz ve mobil uyumlu hesaplama araçları.',
  path: '/',
  keywords: ['hesaplama araçları', 'online hesaplama', 'kira artış hesaplama', 'kredi hesaplama', 'zam hesaplama'],
})

export default function HomePage() {
  const schema = { '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: tools.map((tool, index) => ({ '@type': 'ListItem', position: index + 1, name: tool.title, url: `${SITE_URL}/${tool.slug}/` })) }
  return <>
    <Script id="tools-list-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <section className="hero">
      <div className="hero-orb hero-orb-one"/><div className="hero-orb hero-orb-two"/>
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="hero-badge"><Icon name="sparkles" size="sm" /> Ücretsiz, hızlı, üyelik gerektirmez</span>
          <h1>Hesabı yapın.<br/><em>Kararı kolaylaştırın.</em></h1>
          <p>Kredi taksitinden kira artışına, maaş hesabından sınav netine kadar günlük kararlar için tek ve sade hesaplama merkezi.</p>
          <SearchLauncher />
          <div className="hero-actions"><Link href="/tum-araclar/" className="button primary large">Tüm araçları keşfet <Icon name="arrow" size="sm" /></Link><Link href="/kredi-hesaplama/" className="button glass large">Kredi hesapla</Link></div>
          <div className="hero-trust"><span><Icon name="zap" size="sm"/><b>Anında sonuç</b></span><span><Icon name="shield" size="sm"/><b>Yerel hesaplama</b></span><span><Icon name="calculator" size="sm"/><b>{tools.length} çalışan araç</b></span></div>
        </div>
        <div className="hero-dashboard">
          <div className="dashboard-head"><div><span className="eyebrow light">Öne çıkanlar</span><h2>Bugünün hızlı araçları</h2></div><span className="dashboard-live"><i/> Güncel</span></div>
          <div className="dashboard-tools">{trendingTools.slice(0,5).map((tool,index)=><ToolCard key={tool.slug} tool={tool} compact rank={index+1}/>)}</div>
          <div className="dashboard-footer"><span><Icon name="command" size="sm"/> Kısayol</span><b>Ctrl + K ile her yerden ara</b></div>
        </div>
      </div>
    </section>

    <section className="quick-strip"><div className="container quick-strip-inner">{categories.map((cat)=><Link href={`/tum-araclar/#${cat.id}`} key={cat.id} className={`category-${cat.id}`}><span><Icon name={cat.icon}/></span><div><strong>{cat.name}</strong><small>{tools.filter(t=>t.category===cat.id).length} araç</small></div><Icon name="arrow" size="sm"/></Link>)}</div></section>

    <div className="container home-content">
      <ToolExplorer />
      <FavoriteTools />
      <RecentTools />

      <section className="featured-section">
        <div className="featured-copy"><span className="eyebrow light">Yeni karar ekranı</span><h2>Yalnızca sonucu değil, farkı da görün.</h2><p>Hesaplama araçları ana sonuçla birlikte toplam maliyeti, oranı, farkı ve gerekli ayrıntıları tek ekranda sunar.</p><div className="featured-actions"><Link href="/kira-artis-hesaplama/" className="button white">Kira artışı hesapla <Icon name="arrow" size="sm"/></Link><Link href="/kar-marji-hesaplama/" className="button glass">Kâr marjı hesapla</Link></div></div>
        <div className="decision-preview"><div className="preview-top"><span>Örnek karar özeti</span><i>Canlı</i></div><div className="preview-main"><small>Yeni aylık kira</small><strong>26.406 TL</strong><span className="preview-change">+6.406 TL / ay</span></div><div className="preview-grid"><div><small>Yıllık fark</small><b>76.872 TL</b></div><div><small>Artış</small><b>%32,03</b></div></div><div className="preview-bar"><i style={{width:'68%'}}/></div></div>
      </section>

      <section className="home-info"><div><span className="eyebrow">Neden Hesaplas?</span><h2>Karmaşık formülleri sade bir karar akışına dönüştürüyoruz.</h2><p>Her araç kendi ihtiyacına göre tasarlanır; gereksiz alan, zorunlu üyelik veya gizli sonuç ekranı yoktur.</p></div><div className="info-points"><article><span><Icon name="zap"/></span><h3>Hızlı</h3><p>Sonuçlar alanları değiştirirken anında güncellenir.</p></article><article><span><Icon name="shield"/></span><h3>Gizli</h3><p>Girdiğiniz değerler hesaplama için tarayıcıda işlenir.</p></article><article><span><Icon name="sparkles"/></span><h3>Anlaşılır</h3><p>Ana sonuç, fark ve detaylar ayrı katmanlarda gösterilir.</p></article></div></section>
    </div>
  </>
}
