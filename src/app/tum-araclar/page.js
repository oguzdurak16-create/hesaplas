import Link from 'next/link'
import ToolExplorer from '@/components/ToolExplorer'
import { categories, tools } from '@/data/tools'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Tüm Hesaplama Araçları',
  description: 'Finans, maaş, vergi, ev, sağlık, eğitim, teknoloji ve pratik kategorilerindeki tüm ücretsiz hesaplama araçlarını keşfedin.',
  path: '/tum-araclar/',
  keywords: ['tüm hesaplama araçları', 'ücretsiz online araçlar', 'hesaplama kategorileri'],
})

export default function AllToolsPage() {
  return (
    <div className="page-bg">
      <div className="container page-container">
        <header className="page-hero compact">
          <span className="eyebrow">Araç kütüphanesi</span>
          <h1>Tüm hesaplama araçları</h1>
          <p>İhtiyacınız olan hesabı arayın veya kategoriye göre seçin.</p>
        </header>
        <nav className="category-switch" aria-label="Hesaplama kategorileri" style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:28}}>
          {categories.map((category) => (
            <Link key={category.id} href={`/kategori/${category.id}/`} style={{padding:'9px 12px',border:'1px solid #dde5ef',borderRadius:999,background:'#fff',fontSize:'.78rem',fontWeight:750}}>
              {category.name} · {tools.filter((tool) => tool.category === category.id).length}
            </Link>
          ))}
        </nav>
        <ToolExplorer initialLimit={100} showHeading={false} />
      </div>
    </div>
  )
}
