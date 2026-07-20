import Link from 'next/link'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Sayfa Bulunamadı',
  description: 'Aradığınız Hesaplas.com sayfası bulunamadı.',
  path: '/404/',
  noIndex: true,
})

export default function NotFound() {
  return <div className="page-bg"><div className="container page-container"><div className="legal-card"><span className="eyebrow">404</span><h1>Sayfa bulunamadı</h1><p>Aradığınız araç taşınmış veya adres yanlış yazılmış olabilir.</p><p><Link className="button primary" href="/tum-araclar/">Tüm araçlara dön</Link></p></div></div></div>
}
