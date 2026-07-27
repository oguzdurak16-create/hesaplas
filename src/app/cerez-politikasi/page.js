import Link from 'next/link'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Çerez Politikası',
  description: 'Hesaplas.com zorunlu, analitik ve Google AdSense reklam çerezlerinin kullanım esasları.',
  path: '/cerez-politikasi/',
})

export default function Page(){
  return <div className="page-bg"><div className="container page-container"><article className="legal-card">
    <span className="eyebrow">Yasal · Son güncelleme: 27 Temmuz 2026</span>
    <h1>Çerez Politikası</h1>
    <p>Çerezler ve yerel depolama kayıtları; web sitesinin çalışması, tercihlerin hatırlanması, izin verilmesi halinde kullanım ölçümü ve reklam hizmetlerinin sunulması için kullanılan küçük veri kayıtlarıdır.</p>

    <h2>Zorunlu kayıtlar</h2>
    <p>Site güvenliği, temel işlevler ve çerez tercihinizin saklanması için kullanılır. Bu kayıtlar pazarlama amacıyla kullanılmaz ve temel hizmet kapsamında kapatılamaz.</p>

    <h2>Analitik</h2>
    <p>Google Analytics tarafından kullanılabilecek <code>_ga</code>, <code>_ga_*</code>, <code>_gid</code> ve benzeri kayıtlar ziyaret ve performans ölçümüne yardımcı olur. Analitik depolama varsayılan olarak kapalıdır ve yalnızca analitik izni verdiğinizde etkinleşir.</p>

    <h2>Reklam ve pazarlama</h2>
    <p>Google AdSense ve Google reklam hizmetleri; <code>__gads</code>, <code>__gpi</code>, <code>IDE</code>, <code>DSID</code> veya benzeri teknolojileri reklam sunumu, sıklık kontrolü, sahtekârlığın önlenmesi, ölçüm ve izin verilmesi halinde kişiselleştirme için kullanabilir. Reklam depolaması ve kişiselleştirme sinyalleri varsayılan olarak reddedilir.</p>
    <p>AdSense etiketi site sahipliğinin doğrulanması ve Consent Mode desteği için sınırlı modda yüklenebilir; reklam çerezleri ve kişiselleştirme izniniz olmadan etkinleştirilmez.</p>

    <h2>Tercih seçenekleri</h2>
    <p>Çerez panelinde “Tümünü reddet”, “Ayarlar”, “Seçimleri kaydet” ve “Tümünü kabul et” seçenekleri sunulur. Zorunlu olmayan kategorileri reddetmeniz hesaplama araçlarının çalışmasını engellemez. Sayfanın altındaki “Çerezler” düğmesiyle tercihlerinizi istediğiniz zaman yeniden açabilirsiniz.</p>

    <h2>Üçüncü taraflar</h2>
    <p>Google hizmetlerinin saklama süreleri ve kullanılan kayıtlar hizmete, bölgeye ve hesap ayarlarına göre değişebilir. Google reklam kişiselleştirme tercihleri ayrıca Google Reklam Ayarları üzerinden yönetilebilir.</p>

    <h2>Diğer bilgiler</h2>
    <p>Verilerin işlenmesi ve iletişim haklarınız hakkında ayrıntı için <Link className="text-link" href="/gizlilik-politikasi/">Gizlilik Politikası</Link> sayfasını inceleyin.</p>
  </article></div></div>
}
