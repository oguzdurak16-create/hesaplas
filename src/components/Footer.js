import Link from 'next/link'
import Icon from './Icon'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-intro">
          <Link href="/" className="brand footer-brand"><span className="brand-mark"><Icon name="calculator" size="sm" /></span><span>hesaplas<strong>.com</strong></span></Link>
          <p>Günlük kararlar için hızlı, anlaşılır ve ücretsiz hesaplama araçları.</p>
          <span className="footer-trust"><Icon name="shield" size="sm" /> Girdileriniz cihazınızda işlenir.</span>
        </div>
        <div className="footer-links"><h3>Finans</h3><Link href="/kredi-hesaplama/">Kredi hesaplama</Link><Link href="/mevduat-faiz-hesaplama/">Mevduat faizi</Link><Link href="/kar-marji-hesaplama/">Kâr marjı</Link><Link href="/enflasyon-satin-alma-gucu/">Satın alma gücü</Link></div>
        <div className="footer-links"><h3>Yeni teknoloji</h3><Link href="/yapay-zeka-token-maliyeti/">AI token maliyeti</Link><Link href="/elektrikli-arac-sarj-maliyeti/">EV şarj maliyeti</Link><Link href="/gunes-paneli-geri-donus-hesaplama/">Güneş paneli dönüşü</Link><Link href="/saas-mrr-churn-ltv-hesaplama/">SaaS metrikleri</Link></div>
        <div className="footer-links"><h3>Hesaplas</h3><Link href="/tum-araclar/">Tüm araçlar</Link><Link href="/reklam-ve-isbirligi/">Reklam ve iş birliği</Link><Link href="/hakkimizda/">Hakkımızda</Link><Link href="/iletisim/">İletişim</Link><Link href="/gizlilik-politikasi/">Gizlilik</Link></div>
      </div>
      <div className="container footer-bottom"><span>© 2026 Hesaplas.com</span><div><Link href="/cerez-politikasi/">Çerezler</Link><Link href="/kullanim-kosullari/">Kullanım koşulları</Link></div><span>Sonuçlar bilgilendirme amaçlıdır.</span></div>
    </footer>
  )
}
