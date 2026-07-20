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

const HOME_UI_CSS = `
  .v6-home{overflow:hidden;background:linear-gradient(180deg,#f7f9fd 0,#fff 640px);}
  .v6-home .container,.site-header .container{width:min(1400px,calc(100% - 64px));}
  .site-header{background:color-mix(in srgb,var(--paper) 91%,transparent);}
  .header-inner{height:72px;gap:20px;}
  .brand{font-size:1.23rem;}
  .desktop-nav{gap:3px;margin-left:6px;}
  .desktop-nav a{padding:9px 11px;font-size:.78rem;}
  .header-search-button{min-width:220px;background:var(--paper);}
  .all-tools-button{height:43px;border-radius:13px!important;}

  .v6-hero{position:relative;padding:68px 0 54px;border-bottom:1px solid #e7edf6;}
  .v6-hero:before{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at 15% 20%,rgba(37,99,235,.12),transparent 28%),radial-gradient(circle at 82% 10%,rgba(91,69,216,.1),transparent 25%);}
  .v6-hero-grid{position:relative;display:grid;grid-template-columns:minmax(0,1.08fr) minmax(420px,.72fr);align-items:center;gap:64px;}
  .v6-badge{width:fit-content;display:inline-flex;align-items:center;gap:8px;padding:7px 11px;border:1px solid #d8e2f1;border-radius:999px;color:#40516a;background:rgba(255,255,255,.78);box-shadow:0 8px 25px rgba(33,56,94,.06);font-size:.7rem;font-weight:820;}
  .v6-badge .icon{color:#2563eb;}
  .v6-hero-copy h1{max-width:850px;margin-top:20px;color:#101827;font-size:clamp(3.25rem,5.2vw,5.45rem);font-weight:890;line-height:.98;letter-spacing:-.067em;}
  .v6-hero-copy h1 em{color:#2563eb;font-style:normal;}
  .v6-hero-copy>p{max-width:720px;margin-top:23px;color:#617086;font-size:1rem;line-height:1.75;}
  .v6-hero .hero-search{width:min(720px,100%);height:62px;margin-top:27px;border:1px solid #d8e2f1;color:#6d7b8f;background:#fff;box-shadow:0 18px 48px rgba(30,56,98,.11);}
  .v6-hero .hero-search:hover{border-color:#9bb8ec;background:#fff;box-shadow:0 22px 55px rgba(37,99,235,.14);}
  .v6-hero .hero-search .icon{color:#2563eb;}
  .v6-hero .hero-search kbd{border-color:#dbe3ee;color:#6d7b8f;background:#f5f7fa;}
  .v6-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:14px;}
  .v6-actions .button.glass{color:#26364e;border-color:#d9e2ee;background:rgba(255,255,255,.72);}
  .v6-actions .button.glass:hover{background:#fff;}
  .v6-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;max-width:720px;margin-top:25px;}
  .v6-stat{display:grid;grid-template-columns:39px 1fr;align-items:center;gap:10px;padding:12px 13px;border:1px solid #e0e7f1;border-radius:14px;background:rgba(255,255,255,.68);}
  .v6-stat>span{width:39px;height:39px;display:grid;place-items:center;border-radius:11px;color:#2563eb;background:#eaf1ff;}
  .v6-stat div{display:grid;line-height:1.25;}
  .v6-stat strong{color:#172238;font-size:.78rem;}
  .v6-stat small{margin-top:2px;color:#748297;font-size:.61rem;}

  .v6-spotlight{overflow:hidden;border:1px solid rgba(255,255,255,.1);border-radius:25px;color:#fff;background:linear-gradient(150deg,#0b1423 0%,#142744 65%,#183056 100%);box-shadow:0 35px 90px rgba(13,29,57,.24);}
  .v6-spotlight-head{display:flex;align-items:flex-start;justify-content:space-between;gap:15px;padding:22px 22px 17px;border-bottom:1px solid rgba(255,255,255,.08);}
  .v6-spotlight-head h2{margin-top:4px;font-size:1.18rem;letter-spacing:-.025em;}
  .v6-live{display:flex;align-items:center;gap:7px;padding:5px 8px;border-radius:999px;color:#95e7d1;background:rgba(55,210,165,.09);font-size:.62rem;font-weight:820;}
  .v6-live i{width:7px;height:7px;border-radius:50%;background:#4ee5bf;box-shadow:0 0 0 4px rgba(78,229,191,.09);}
  .v6-spotlight-tools{display:grid;}
  .v6-spotlight .tool-card{min-height:78px;grid-template-columns:28px 40px 1fr 18px;align-items:center;gap:11px;padding:11px 18px;border:0;border-bottom:1px solid rgba(255,255,255,.075);border-radius:0;color:#fff;background:transparent;box-shadow:none;}
  .v6-spotlight .tool-card:hover{transform:none;background:rgba(255,255,255,.055);box-shadow:none;}
  .v6-spotlight .tool-card:before{display:none;}
  .v6-spotlight .tool-card-icon{width:40px;height:40px;border-radius:12px;color:#0a1423;background:#75e5f2;}
  .v6-spotlight .tool-card-meta{display:none;}
  .v6-spotlight .tool-card-top strong{color:#edf4ff;font-size:.8rem;}
  .v6-spotlight .card-arrow,.v6-spotlight .tool-rank{color:#7c8fa9;}
  .v6-spotlight-foot{display:flex;align-items:center;justify-content:space-between;gap:15px;min-height:52px;padding:0 20px;color:#8fa0b7;font-size:.65rem;}
  .v6-spotlight-foot span{display:flex;align-items:center;gap:7px;}
  .v6-spotlight-foot a{color:#9eeaf2;font-weight:800;}

  .v6-category-wrap{position:relative;margin-top:-1px;padding:18px 0 20px;border-bottom:1px solid #e5ebf4;background:#fff;}
  .v6-categories{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:9px;}
  .v6-category{min-width:0;display:grid;grid-template-columns:39px 1fr 16px;align-items:center;gap:10px;min-height:70px;padding:11px 12px;border:1px solid #e1e8f1;border-radius:15px;background:#fff;transition:.2s ease;}
  .v6-category:hover{transform:translateY(-2px);border-color:#b9cae5;box-shadow:0 14px 32px rgba(31,55,91,.09);}
  .v6-category>span:first-child{width:39px;height:39px;display:grid;place-items:center;border-radius:11px;color:var(--card-accent,#2563eb);background:color-mix(in srgb,var(--card-accent,#2563eb) 10%,#fff);}
  .v6-category div{min-width:0;display:grid;line-height:1.25;}
  .v6-category strong{overflow:hidden;color:#26344a;font-size:.7rem;text-overflow:ellipsis;white-space:nowrap;}
  .v6-category small{margin-top:3px;color:#8491a3;font-size:.59rem;}
  .v6-category>.icon{color:#a4afbd;}

  .v6-home .home-content{padding:70px 0 100px;}
  .v6-home .explorer-section{margin-bottom:76px;}
  .v6-home .section-heading{margin-bottom:24px;}
  .v6-home .section-heading h2{font-size:clamp(2rem,3vw,3rem);}
  .v6-home .explorer-shell{grid-template-columns:220px minmax(0,1fr);gap:20px;}
  .v6-home .explorer-sidebar{top:92px;border-radius:17px;background:#f6f8fb;}
  .v6-home .explorer-toolbar{grid-template-columns:minmax(0,1fr) 160px;}
  .v6-home .tool-grid-cards{grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;}
  .v6-home .tool-card{min-height:158px;padding:18px;border-radius:17px;}
  .v6-home .tool-card-top strong{font-size:.87rem;}
  .v6-home .tool-card small{font-size:.68rem;}
  .v6-home .featured-section{margin-bottom:78px;}

  @media(max-width:1220px){
    .v6-home .container,.site-header .container{width:min(100% - 44px,1180px);}
    .v6-hero-grid{grid-template-columns:minmax(0,1fr) 390px;gap:38px;}
    .v6-hero-copy h1{font-size:clamp(3rem,5vw,4.5rem);}
    .v6-categories{grid-template-columns:repeat(4,minmax(0,1fr));}
    .v6-home .tool-grid-cards{grid-template-columns:repeat(2,minmax(0,1fr));}
  }
  @media(max-width:980px){
    .v6-hero{padding-top:52px;}
    .v6-hero-grid{grid-template-columns:1fr;}
    .v6-spotlight{max-width:760px;}
    .v6-stats{max-width:none;}
    .v6-categories{grid-template-columns:repeat(3,minmax(0,1fr));}
  }
  @media(max-width:760px){
    .v6-home .container,.site-header .container{width:min(100% - 26px,1220px);}
    .v6-hero{padding:42px 0 38px;}
    .v6-hero-copy h1{font-size:clamp(2.65rem,13vw,4rem);}
    .v6-hero-copy>p{font-size:.88rem;}
    .v6-hero .hero-search{height:56px;}
    .v6-actions{display:grid;}
    .v6-actions .button{width:100%;}
    .v6-stats{grid-template-columns:1fr;}
    .v6-stat{min-height:60px;}
    .v6-spotlight{border-radius:20px;}
    .v6-spotlight .tool-card{grid-template-columns:25px 37px 1fr 17px;padding:10px 12px;}
    .v6-category-wrap{overflow:auto;padding:14px 0;}
    .v6-categories{width:max-content;display:flex;gap:8px;}
    .v6-category{width:175px;min-height:66px;}
    .v6-home .home-content{padding:52px 0 78px;}
    .v6-home .tool-grid-cards{grid-template-columns:1fr;}
    .v6-home .tool-card{min-height:137px;}
  }
`

export default function HomePage() {
  const schema = { '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: tools.map((tool, index) => ({ '@type': 'ListItem', position: index + 1, name: tool.title, url: `${SITE_URL}/${tool.slug}/` })) }
  return <div className="v6-home">
    <style dangerouslySetInnerHTML={{ __html: HOME_UI_CSS }} />
    <Script id="tools-list-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

    <section className="v6-hero">
      <div className="container v6-hero-grid">
        <div className="v6-hero-copy">
          <span className="v6-badge"><Icon name="sparkles" size="sm" /> Ücretsiz, hızlı ve üyelik gerektirmez</span>
          <h1>Hesaplamayı hızlandırın.<br/><em>Kararı netleştirin.</em></h1>
          <p>Kredi taksitinden kira artışına, maaş hesabından yapay zekâ maliyetine kadar günlük ve profesyonel kararlar için tek hesaplama merkezi.</p>
          <SearchLauncher />
          <div className="v6-actions">
            <Link href="/tum-araclar/" className="button primary large">Tüm araçları keşfet <Icon name="arrow" size="sm" /></Link>
            <Link href="/kredi-hesaplama/" className="button glass large">Kredi hesapla</Link>
          </div>
          <div className="v6-stats">
            <div className="v6-stat"><span><Icon name="calculator" /></span><div><strong>{tools.length} çalışan araç</strong><small>Tek ekranda anında sonuç</small></div></div>
            <div className="v6-stat"><span><Icon name="grid" /></span><div><strong>{categories.length} ana kategori</strong><small>Finanstan teknolojiye</small></div></div>
            <div className="v6-stat"><span><Icon name="shield" /></span><div><strong>Tarayıcıda hesaplama</strong><small>Verileriniz cihazınızda kalır</small></div></div>
          </div>
        </div>

        <aside className="v6-spotlight" aria-label="Öne çıkan hesaplama araçları">
          <div className="v6-spotlight-head"><div><span className="eyebrow light">Öne çıkanlar</span><h2>Bugünün hızlı araçları</h2></div><span className="v6-live"><i/> Güncel</span></div>
          <div className="v6-spotlight-tools">{trendingTools.slice(0,5).map((tool,index)=><ToolCard key={tool.slug} tool={tool} compact rank={index+1}/>)}</div>
          <div className="v6-spotlight-foot"><span><Icon name="command" size="sm" /> Ctrl + K ile her yerden arayın</span><Link href="/tum-araclar/">Tümünü gör</Link></div>
        </aside>
      </div>
    </section>

    <section className="v6-category-wrap" aria-label="Hesaplama kategorileri">
      <div className="container v6-categories">
        {categories.map((cat)=><Link href={`/tum-araclar/#${cat.id}`} key={cat.id} className={`v6-category category-${cat.id}`}><span><Icon name={cat.icon}/></span><div><strong>{cat.name}</strong><small>{tools.filter(t=>t.category===cat.id).length} ücretsiz araç</small></div><Icon name="arrow" size="sm"/></Link>)}
      </div>
    </section>

    <div className="container home-content">
      <ToolExplorer />
      <FavoriteTools />
      <RecentTools />

      <section className="featured-section">
        <div className="featured-copy"><span className="eyebrow light">Karar ekranı</span><h2>Yalnızca sonucu değil, farkı da görün.</h2><p>Hesaplama araçları ana sonuçla birlikte toplam maliyeti, oranı, farkı ve gerekli ayrıntıları tek ekranda sunar.</p><div className="featured-actions"><Link href="/kira-artis-hesaplama/" className="button white">Kira artışı hesapla <Icon name="arrow" size="sm"/></Link><Link href="/kar-marji-hesaplama/" className="button glass">Kâr marjı hesapla</Link></div></div>
        <div className="decision-preview"><div className="preview-top"><span>Örnek karar özeti</span><i>Canlı</i></div><div className="preview-main"><small>Yeni aylık kira</small><strong>26.406 TL</strong><span className="preview-change">+6.406 TL / ay</span></div><div className="preview-grid"><div><small>Yıllık fark</small><b>76.872 TL</b></div><div><small>Artış</small><b>%32,03</b></div></div><div className="preview-bar"><i style={{width:'68%'}}/></div></div>
      </section>

      <section className="home-info"><div><span className="eyebrow">Neden Hesaplas?</span><h2>Karmaşık formülleri sade bir karar akışına dönüştürüyoruz.</h2><p>Her araç kendi ihtiyacına göre tasarlanır; gereksiz alan, zorunlu üyelik veya gizli sonuç ekranı yoktur.</p></div><div className="info-points"><article><span><Icon name="zap"/></span><h3>Hızlı</h3><p>Sonuçlar alanları değiştirirken anında güncellenir.</p></article><article><span><Icon name="shield"/></span><h3>Gizli</h3><p>Girdiğiniz değerler hesaplama için tarayıcıda işlenir.</p></article><article><span><Icon name="sparkles"/></span><h3>Anlaşılır</h3><p>Ana sonuç, fark ve detaylar ayrı katmanlarda gösterilir.</p></article></div></section>
    </div>
  </div>
}
