import { n, money, number, integer, percent, daysBetween, addDays, formatDate, payment, result, item, examNet } from '../tool-utils'

export const toolsPart07 = [
{
    slug: 'lgs-yuzdelik-dilim-karsilastirma', title: 'LGS Yüzdelik Dilim Karşılaştırma', shortTitle: 'LGS Yüzdelik', category: 'egitim', icon: 'target', badge: 'Tercih Dönemi', trend: true, trendRank: 3,
    description: 'Kendi yüzdelik diliminizle hedef okulun önceki yıl yüzdelik dilimini karşılaştırarak farkı ve temkinli tercih aralığını görün.',
    keywords: ['LGS yüzdelik dilim karşılaştırma', 'LGS tercih hesaplama', 'hedef okul yüzdelik', 'LGS tercih dönemi'],
    updatedAt: '2026-07-17',
    formula: 'Daha küçük yüzdelik dilim daha yüksek sıralamayı gösterir. Araç, aday dilimi ile okulun geçmiş yıl dilimi arasındaki farkı ve kullanıcı tarafından belirlenen güven payını karşılaştırır.',
    guide: { intro: 'LGS tercihlerinde puan yerine yüzdelik dilim karşılaştırması, yıllar arası değişimi değerlendirmede daha kullanışlıdır. Araç yalnızca sayısal farkı sınıflandırır.', evaluate: 'Kontenjan, talep ve okul koşulları her yıl değişebilir. Hedef, dengeli ve daha güvenli seçeneklerden oluşan karma bir liste hazırlayın; resmî Rota Maarif ve e-Okul verilerini esas alın.' },
    faqs: [{ q: 'LGS’de küçük yüzdelik mi daha iyidir?', a: 'Evet. Yüzdelik dilimin küçülmesi adayın sınava girenler arasındaki konumunun yükseldiğini gösterir.' }, { q: 'Bu sonuç yerleşme garantisi verir mi?', a: 'Hayır. Geçmiş yıl dilimleri yalnızca karşılaştırma verisidir; kontenjan ve tercih yoğunluğu değişebilir.' }],
    sources: [{ label: 'MEB 2026 tercih bilgilendirmesi', url: 'https://www.meb.gov.tr/lgs-tercih-sureci-icin-ogrenci-ve-velilere-yonelik-kilavuz-yayimlandi/haber/41320/tr' }, { label: 'MEB Rota Maarif', url: 'https://rotamaarif.meb.gov.tr/Home/Lgs' }],
    fields: [
      { key: 'student', label: 'Öğrencinin yüzdelik dilimi', type: 'number', default: 5.2, min: 0.01, max: 100, step: 0.01, suffix: '%' },
      { key: 'school', label: 'Okulun geçmiş yıl dilimi', type: 'number', default: 5.8, min: 0.01, max: 100, step: 0.01, suffix: '%' },
      { key: 'margin', label: 'Temkin payı', type: 'number', default: 0.5, min: 0, max: 20, step: 0.1, suffix: 'puan' },
    ],
    calculate: (v) => {
      const student = n(v.student), school = n(v.school), margin = n(v.margin), diff = school - student
      const status = diff >= margin ? 'Daha güvenli aralık' : diff >= 0 ? 'Dengeli / yakın aralık' : Math.abs(diff) <= margin ? 'Hedef aralık' : 'Daha iddialı hedef'
      const tone = diff >= margin ? 'success' : diff >= 0 ? 'primary' : 'warning'
      return result([item('Karşılaştırma', status, tone), item('Dilime göre fark', `${diff >= 0 ? '+' : ''}${number(diff)} puan`), item('Aday yüzdelik dilimi', percent(student))], [item('Okul geçmiş yıl dilimi', percent(school)), item('Temkin payı', `${number(margin)} puan`), item('Konum yorumu', student <= school ? 'Adayın dilimi geçmiş yıl okul diliminden daha iyi' : 'Okulun geçmiş yıl dilimi adaydan daha iyi')], 'Bu araç tercih garantisi vermez. Tercih listenizi resmî veriler ve rehberlik desteğiyle oluşturun.')
    },
  },
{
    slug: 'emekli-maasi-zam-hesaplama', title: 'Emekli Maaşı Zam ve Kök Aylık Hesaplama', shortTitle: 'Emekli Zammı', category: 'maas-vergi', icon: 'banknote', badge: 'Temmuz Dönemi', trend: true, trendRank: 6,
    description: 'Kök aylık, zam oranı ve varsa taban ödeme tutarına göre zamlı kök aylığı ve tahmini ödenecek aylığı hesaplayın.',
    keywords: ['emekli maaşı zam hesaplama', 'kök maaş hesaplama', 'Temmuz emekli zammı', 'zamlı aylık'],
    updatedAt: '2026-07-17',
    formula: 'Zamlı kök aylık = kök aylık × (1 + zam oranı). Taban aylık uygulanıyorsa tahmini ödeme, zamlı kök aylık ile taban tutarın büyük olanıdır.',
    guide: { intro: 'Kök aylık ile hesaba yatan tutar aynı olmayabilir. Bu araç zam oranını kök aylığa uygular ve girilen taban ödeme ile karşılaştırır.', evaluate: 'Ek ödeme, dosya türü, aylık bağlama oranı ve resmî düzenlemeler gerçek ödemeyi değiştirebilir. E-Devlet ve SGK kaydını esas alın.' },
    faqs: [{ q: 'Kök maaş ile alınan maaş aynı mı?', a: 'Her zaman değil. Taban aylık uygulaması veya ek ödemeler nedeniyle hesaba yatan tutar kök aylıktan farklı olabilir.' }, { q: 'Zam taban aylığa mı kök aylığa mı uygulanır?', a: 'Genel karşılaştırma için zam kök aylığa uygulanır; ardından yürürlükteki taban ödeme koşulları ayrıca değerlendirilir.' }],
    fields: [
      { key: 'root', label: 'Mevcut kök aylık', type: 'number', default: 16000, min: 0, suffix: 'TL' },
      { key: 'rate', label: 'Zam oranı', type: 'number', default: 15, min: 0, max: 500, step: 0.01, suffix: '%' },
      { key: 'floor', label: 'Uygulanacak taban aylık', type: 'number', default: 0, min: 0, suffix: 'TL', help: 'Taban tutar bilinmiyorsa veya uygulanmayacaksa 0 bırakın.' },
      { key: 'extra', label: 'Ek ödeme oranı', type: 'number', default: 0, min: 0, max: 100, step: 0.01, suffix: '%' },
    ],
    calculate: (v) => {
      const root = n(v.root), rate = n(v.rate), floor = n(v.floor), extraRate = n(v.extra), increased = root * (1 + rate / 100), extra = increased * extraRate / 100, withExtra = increased + extra, payable = Math.max(withExtra, floor)
      return result([item('Tahmini ödenecek aylık', money(payable), 'primary'), item('Zamlı kök aylık', money(increased)), item('Kök aylık artışı', money(increased - root), 'success')], [item('Ek ödeme', money(extra)), item('Taban tamamlama farkı', money(Math.max(0, floor - withExtra))), item('Uygulanan zam', percent(rate))], 'Sonuç yaklaşık karşılaştırmadır; resmî aylık hesabı değildir.')
    },
  },
{
    slug: 'yillik-izin-hesaplama', title: 'Yıllık İzin Hakkı Hesaplama', shortTitle: 'Yıllık İzin', category: 'maas-vergi', icon: 'calendar-check', badge: 'Çalışan', trend: true, trendRank: 8,
    description: 'Aynı işverendeki hizmet süresi ve yaşa göre İş Kanunu kapsamındaki asgari yıllık ücretli izin gününü hesaplayın.',
    keywords: ['yıllık izin hesaplama', 'izin hakkı kaç gün', 'çalışma süresi izin', '14 20 26 gün izin'],
    updatedAt: '2026-07-17',
    formula: 'Bir yıldan beş yıla kadar 14 gün, beş yıldan fazla ve on beş yıldan az 20 gün, on beş yıl ve üzeri 26 gün asgari izin gösterilir. 18 yaş ve altı ile 50 yaş ve üzerindeki çalışanlarda asgari süre 20 gündür.',
    guide: { intro: 'Araç 4857 sayılı İş Kanunu kapsamındaki genel asgari yıllık izin sürelerini gösterir. Sözleşme veya toplu iş sözleşmesi daha uzun izin sağlayabilir.', evaluate: 'Hafta tatilleri ile ulusal bayram ve genel tatil günleri yıllık izin süresinden sayılmaz. İş kolu ve sözleşme türüne özel hükümleri ayrıca kontrol edin.' },
    faqs: [{ q: 'Bir yıl dolmadan yıllık izin hakkı doğar mı?', a: 'Genel İş Kanunu uygulamasında yıllık ücretli izne hak kazanmak için aynı işverende en az bir yıl çalışmak gerekir.' }, { q: 'Hafta sonu yıllık izinden düşer mi?', a: 'Hafta tatilleri ile ulusal bayram ve genel tatil günleri yıllık izin süresine dahil edilmez.' }],
    sources: [{ label: 'Çalışma Bakanlığı İş Kanunu SSS', url: 'https://www.csgb.gov.tr/sikca-sorulan-sorular/calisma-genel-mudurlugu/%C4%B1s-kanunu/' }],
    fields: [
      { key: 'years', label: 'Aynı işverendeki hizmet', type: 'number', default: 6, min: 0, max: 60, step: 0.1, suffix: 'yıl' },
      { key: 'age', label: 'Çalışanın yaşı', type: 'number', default: 30, min: 14, max: 100, suffix: 'yaş' },
    ],
    calculate: (v) => {
      const years = n(v.years), age = n(v.age)
      if (years < 1) return result([item('Yıllık izin hakkı', 'Henüz doğmadı', 'warning'), item('Kalan süre', `${number(1 - years)} yıl`)], [item('Hizmet süresi', `${number(years)} yıl`)], 'Genel kuralda aynı işverende bir yıl dolduğunda yıllık ücretli izin hakkı doğar.')
      let days = years <= 5 ? 14 : years < 15 ? 20 : 26
      if (age <= 18 || age >= 50) days = Math.max(days, 20)
      return result([item('Asgari yıllık izin', `${days} gün`, 'primary'), item('Hizmet grubu', years <= 5 ? '1-5 yıl' : years < 15 ? '5 yıldan fazla - 15 yıldan az' : '15 yıl ve üzeri')], [item('Yaş', `${integer(age)} yaş`), item('Yaşa bağlı asgari koruma', age <= 18 || age >= 50 ? 'En az 20 gün uygulanır' : 'Genel süre uygulanır')], 'Sözleşmeniz daha uzun izin hakkı verebilir.')
    },
  },
{
    slug: 'trafik-cezasi-indirim-hesaplama', title: 'Trafik Cezası İndirim Hesaplama', shortTitle: 'Ceza İndirimi', category: 'pratik', icon: 'receipt', badge: 'Hızlı',
    description: 'Trafik veya idari para cezası tutarı ile uygulanacak peşin ödeme indirim oranına göre ödenecek tutarı hesaplayın.',
    keywords: ['trafik cezası indirim hesaplama', 'erken ödeme ceza indirimi', 'yüzde 25 ceza indirimi'],
    updatedAt: '2026-07-17',
    formula: 'İndirimli ödeme = ceza tutarı × (1 − indirim oranı). Varsayılan oran değiştirilebilir; ödeme süresi ve güncel mevzuat ayrıca kontrol edilmelidir.',
    guide: { intro: 'Bu araç tebliğ edilen ceza tutarından seçtiğiniz oranı düşerek hızlı bir ödeme karşılaştırması yapar.', evaluate: 'İndirim hakkı, süre ve kapsam cezanın türüne göre değişebilir. Tebligat, e-Devlet ve yetkili kurum ekranındaki nihai tutarı esas alın.' },
    sources: [{ label: 'Adalet Bakanlığı Kabahatler Kanunu', url: 'https://mevzuat.adalet.gov.tr/mevzuat/103475' }],
    fields: [
      { key: 'fine', label: 'Ceza tutarı', type: 'number', default: 5000, min: 0, suffix: 'TL' },
      { key: 'discount', label: 'İndirim oranı', type: 'number', default: 25, min: 0, max: 100, step: 0.01, suffix: '%' },
    ],
    calculate: (v) => {
      const fine = n(v.fine), discount = n(v.discount), saving = fine * discount / 100, payable = fine - saving
      return result([item('İndirimli ödeme', money(payable), 'primary'), item('Kazanç', money(saving), 'success'), item('Normal tutar', money(fine))], [item('İndirim oranı', percent(discount))], 'Ödeme süresi ve indirim uygunluğunu resmî ceza kaydından kontrol edin.')
    },
  }
]
