import ToolExplorer from '@/components/ToolExplorer'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Tüm Hesaplama Araçları',
  description: 'Finans, maaş, vergi, ev, sağlık, eğitim ve pratik kategorilerindeki tüm ücretsiz hesaplama araçlarını keşfedin.',
  path: '/tum-araclar/',
  keywords: ['tüm hesaplama araçları', 'ücretsiz online araçlar'],
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
        <ToolExplorer initialLimit={100} showHeading={false} />
      </div>
    </div>
  )
}
