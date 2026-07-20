import Link from 'next/link'
import Icon from '@/components/Icon'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Reklam ve Marka İş Birliği',
  description: 'Hesaplas.com araç sponsorluğu, kategori iş birliği ve performans odaklı reklam seçenekleri.',
  path: '/reklam-ve-isbirligi/',
  keywords: ['hesaplas reklam', 'hesaplama sitesi sponsorluğu', 'marka iş birliği'],
})

const options = [
  { icon: 'sparkles', title: 'Araç sponsorluğu', text: 'Markanıza doğrudan bağlı hesaplama aracında sponsor etiketi, bağlantı ve açıklama.' },
  { icon: 'grid', title: 'Kategori görünürlüğü', text: 'Finans, enerji, eğitim veya teknoloji kategorilerinde hedefli marka konumlandırması.' },
  { icon: 'chart', title: 'Performans iş birliği', text: 'UTM ve dönüşüm bağlantılarıyla ölçülebilir affiliate veya lead çalışması.' },
]

export default function AdvertisePage() {
  return <div className="page-bg"><div className="container page-container">
    <header className="page-hero"><span className="eyebrow">Markalar için</span><h1>Reklam ve iş birliği</h1><p>Hesaplama niyeti yüksek kullanıcılara, aradıkları karar anında ulaşın. Tüm ticari yerleşimler açık biçimde “Sponsorlu” olarak işaretlenir.</p></header>
    <section className="advertise-grid">{options.map((option)=><article key={option.title}><span><Icon name={option.icon}/></span><h2>{option.title}</h2><p>{option.text}</p></article>)}</section>
    <section className="legal-card partnership-card"><span className="eyebrow">Teklif isteyin</span><h2>Uygun sektörler</h2><p>Finans teknolojileri, bankacılık, sigorta, eğitim, elektrikli araç, güneş enerjisi, hosting, SaaS ve üretkenlik yazılımları öncelikli iş birliği alanlarıdır.</p><h2>Teklifte bulunması gerekenler</h2><ul><li>Marka ve ürün bilgisi</li><li>Hedeflenen araç veya kategori</li><li>Kampanya süresi ve bütçe aralığı</li><li>İstenen ölçüm modeli: gösterim, tıklama, lead veya satış</li></ul><a className="button primary" href="mailto:oguzdurak16@gmail.com?subject=Hesaplas.com%20Reklam%20ve%20%C4%B0%C5%9F%20Birli%C4%9Fi">E-posta gönder <Icon name="arrow" size="sm" /></a><Link className="button ghost" href="/iletisim/">İletişim sayfası</Link></section>
  </div></div>
}
