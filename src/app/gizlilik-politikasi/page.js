import Link from 'next/link'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Gizlilik Politikası',
  description: 'Hesaplas.com gizlilik, Google Analytics, Google AdSense, çerez ve veri işleme politikası.',
  path: '/gizlilik-politikasi/',
})

export default function Page(){
  return <div className="page-bg"><div className="container page-container"><article className="legal-card">
    <span className="eyebrow">Yasal · Son güncelleme: 27 Temmuz 2026</span>
    <h1>Gizlilik Politikası</h1>
    <p>Hesaplas.com, hesaplama araçlarını üyelik gerektirmeden sunar. Formlara yazılan tutar, tarih, oran ve benzeri hesaplama girdileri ağırlıklı olarak cihazınızdaki tarayıcıda işlenir; Hesaplas.com tarafından kullanıcı profiline dönüştürülmez veya satılmaz.</p>

    <h2>İşlenebilecek teknik veriler</h2>
    <p>Barındırma ve güvenlik hizmetleri; IP adresi, tarayıcı ve cihaz bilgisi, istenen sayfa, zaman damgası ve hata kaydı gibi standart teknik günlükleri işleyebilir. Bu veriler sitenin güvenliği, performansı ve kötüye kullanımın önlenmesi amacıyla sınırlı süre saklanabilir.</p>

    <h2>Google Analytics</h2>
    <p>Analitik izni verdiğinizde Google Analytics; sayfa görüntüleme, kullanılan araç, temel etkileşim ve performans bilgilerini ölçebilir. Google Consent Mode kapsamında analitik depolama varsayılan olarak reddedilir ve yalnızca seçiminizle açılır. IP anonimleştirme seçeneği kullanılır.</p>

    <h2>Google AdSense ve reklamlar</h2>
    <p>Hesaplas.com, reklam sunmak ve ücretsiz araçların sürdürülebilirliğini sağlamak için Google AdSense kullanabilir. Google ve yetkili üçüncü taraf reklam sağlayıcıları; reklam sunumu, sıklık kontrolü, sahtekârlığın önlenmesi, reklam ölçümü ve izin verdiğiniz bölgelerde kişiselleştirme için çerez veya benzer teknolojiler kullanabilir.</p>
    <p>Reklam depolaması, reklam kullanıcı verisi ve reklam kişiselleştirme sinyalleri varsayılan olarak reddedilir. Reklam izni vermediğinizde kişiselleştirilmiş reklam depolaması açılmaz; mevzuat ve Google ayarlarına göre sınırlı veya kişiselleştirilmemiş reklamlar gösterilebilir.</p>

    <h2>Çerezler ve yerel depolama</h2>
    <p>Çerez tercihiniz tarayıcınızın yerel depolama alanında tutulur. Zorunlu olmayan analitik ve reklam depolamasını çerez panelinden ayrı ayrı kabul edebilir, reddedebilir veya daha sonra değiştirebilirsiniz. Ayrıntılar için <Link className="text-link" href="/cerez-politikasi/">Çerez Politikası</Link> sayfasını inceleyin.</p>

    <h2>Hizmet sağlayıcılar ve yurt dışı aktarım</h2>
    <p>Vercel gibi barındırma sağlayıcıları ile Google Analytics ve Google AdSense gibi hizmetler farklı ülkelerde bulunan sunucular kullanabilir. Teknik veya izin temelli veriler, hizmetin sağlanması ve güvenliği ölçüsünde bu sağlayıcılar tarafından kendi gizlilik koşulları kapsamında işlenebilir.</p>

    <h2>Tercihleriniz ve haklarınız</h2>
    <p>Çerez panelinden seçimlerinizi değiştirebilir, tarayıcınızdan site verilerini silebilir ve Google reklam tercihlerinizi Google Reklam Ayarları üzerinden yönetebilirsiniz. Gizlilik, düzeltme veya silme talepleri için <a className="text-link" href="mailto:oguzdurak16@gmail.com">oguzdurak16@gmail.com</a> adresine yazabilirsiniz.</p>

    <h2>Çocukların gizliliği</h2>
    <p>Site çocuklardan bilerek kişisel veri toplamayı amaçlamaz. Bir çocuğa ait verinin yanlışlıkla işlendiğini düşünüyorsanız iletişim adresinden bildirimde bulunabilirsiniz.</p>
  </article></div></div>
}
