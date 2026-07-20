import Link from 'next/link'
import Icon from '@/components/Icon'

export const metadata = { title: 'Çevrimdışı', robots: { index: false, follow: false } }

export default function OfflinePage() {
  return <div className="page-bg"><div className="container page-container"><section className="legal-card offline-card"><span className="tool-hero-icon"><Icon name="shield" size="lg" /></span><h1>Bağlantı yok</h1><p>İnternet bağlantınız şu anda kullanılamıyor. Daha önce ziyaret ettiğiniz hesaplama araçları çevrimdışı çalışmaya devam edebilir.</p><Link className="button primary" href="/">Ana sayfayı tekrar dene</Link></section></div></div>
}
