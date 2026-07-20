import { n, money, number, integer, percent, daysBetween, addDays, formatDate, payment, result, item, examNet } from '../tool-utils'

export const toolsPart06 = [
{
    slug: 'dgs-net-hesaplama', title: 'DGS Net Hesaplama', shortTitle: 'DGS Net', category: 'egitim', icon: 'stairs', badge: 'Sınav Dönemi', trend: true, trendRank: 9,
    description: 'DGS sayısal ve sözel bölüm doğru-yanlış sayılarına göre bölüm netlerini ve toplam ham netinizi hesaplayın.',
    keywords: ['DGS net hesaplama', '2026 DGS net', 'DGS doğru yanlış hesaplama', 'DGS sayısal sözel net'],
    formula: 'DGS ham net hesabında her bölüm için doğru cevap sayısından yanlış cevap sayısının dörtte biri çıkarılır.',
    guide: {
      intro: 'DGS net aracı sayısal ve sözel bölüm performansını ayrı hesaplar. Ön lisans başarı puanı ve standart puanlar hesaba katılmadığı için yerleştirme puanı üretmez.',
      evaluate: 'Sayısal ve sözel netleri hedeflediğiniz puan türüne göre ayrı takip edin. Deneme karşılaştırmalarında toplam net yanında bölüm dengesine de bakın.',
    },
    faqs: [
      { q: 'DGS’de dört yanlış bir doğruyu götürür mü?', a: 'Ham puan hesabında yanlış cevapların dörtte biri doğru cevap sayısından çıkarılır.' },
      { q: 'Ön lisans başarı puanı bu hesapta var mı?', a: 'Hayır. Araç yalnızca sınavdaki doğru ve yanlışlardan ham neti hesaplar.' },
    ],
    fields: [
      { key: 'numericCorrect', label: 'Sayısal doğru', type: 'number', default: 35, min: 0, max: 50, suffix: 'doğru' },
      { key: 'numericWrong', label: 'Sayısal yanlış', type: 'number', default: 10, min: 0, max: 50, suffix: 'yanlış' },
      { key: 'verbalCorrect', label: 'Sözel doğru', type: 'number', default: 32, min: 0, max: 50, suffix: 'doğru' },
      { key: 'verbalWrong', label: 'Sözel yanlış', type: 'number', default: 12, min: 0, max: 50, suffix: 'yanlış' },
    ],
    constraints: [{ keys: ['numericCorrect', 'numericWrong'], max: 50, message: 'Sayısal bölüm toplamı 50 soruyu aşamaz.' }, { keys: ['verbalCorrect', 'verbalWrong'], max: 50, message: 'Sözel bölüm toplamı 50 soruyu aşamaz.' }],
    calculate: (v) => {
      const numeric = examNet(v.numericCorrect, v.numericWrong), verbal = examNet(v.verbalCorrect, v.verbalWrong), total = numeric + verbal
      return result([item('Toplam DGS neti', number(total), 'primary'), item('Sayısal net', number(numeric)), item('Sözel net', number(verbal))], [item('Toplam doğru', integer(n(v.numericCorrect) + n(v.verbalCorrect))), item('Toplam yanlış', integer(n(v.numericWrong) + n(v.verbalWrong)))], 'Ham net hesabıdır; DGS yerleştirme puanı değildir.')
    },
  },
{
    slug: 'obp-hesaplama', title: 'OBP Hesaplama', shortTitle: 'OBP', category: 'egitim', icon: 'award', badge: 'YKS Tercih', trend: true, trendRank: 1,
    description: 'Diploma notunuza göre ortaöğretim başarı puanını, normal ve yarıya düşürülmüş yerleştirme katkısını hesaplayın.',
    keywords: ['OBP hesaplama', 'diploma notu OBP', 'YKS okul puanı', 'yerleştirme puanı katkısı'],
    updatedAt: '2026-07-17',
    formula: 'Yüzlük diploma notu 5 ile çarpılarak OBP bulunur. Normal yerleştirme katkısı OBP × 0,12; önceki yıl bir programa yerleşen adaylarda yarıya düşürülmüş katkı OBP × 0,06 olarak gösterilir.',
    guide: {
      intro: 'OBP, lise diploma notunun YKS yerleştirme puanına dönüştürülen bölümüdür. Bu araç sınav puanı üretmez; yalnızca diploma notundan gelen katkıyı ayrı gösterir.',
      evaluate: 'Katkı puanını TYT veya AYT ham netiyle doğrudan toplamayın. Resmî yerleştirme puanında sınav puanı ve adayın yerleşme durumu birlikte değerlendirilir.',
    },
    faqs: [
      { q: 'Diploma notu OBP’ye nasıl çevrilir?', a: 'Yüzlük diploma notu 5 ile çarpılır. 50 diploma notu 250, 100 diploma notu 500 OBP eder.' },
      { q: 'OBP yerleştirme puanına kaç puan ekler?', a: 'Normal durumda OBP 0,12 ile çarpılır. Bu nedenle katkı 30 ile 60 puan arasında olur.' },
    ],
    sources: [{ label: 'ÖSYM OBP açıklaması', url: 'https://www.osym.gov.tr/TR,8832/hakkinda.html' }],
    fields: [
      { key: 'diploma', label: 'Diploma notu', type: 'number', default: 80, min: 0, max: 100, step: 0.01, suffix: '/100' },
      { key: 'placed', label: 'Önceki yıl yerleşme durumu', type: 'select', default: 'no', options: [{ value: 'no', label: 'Yerleşmedim / kesinti yok' }, { value: 'yes', label: 'Yerleştim / katkı yarıya düşsün' }] },
    ],
    calculate: (v) => {
      const diploma = Math.min(100, Math.max(50, n(v.diploma))), obp = diploma * 5, normal = obp * 0.12, reduced = obp * 0.06, contribution = v.placed === 'yes' ? reduced : normal
      return result([item('Yerleştirme katkısı', number(contribution), 'primary'), item('OBP', number(obp)), item('Normal katkı', number(normal))], [item('Hesaba alınan diploma notu', number(diploma)), item('Yarıya düşürülmüş katkı', number(reduced)), item('Uygulanan katsayı', v.placed === 'yes' ? '0,06' : '0,12')], 'Diploma notu 50’nin altındaysa OBP hesabında 50 kabul edilmiştir.')
    },
  },
{
    slug: 'ayt-net-hesaplama', title: 'AYT Net Hesaplama', shortTitle: 'AYT Net', category: 'egitim', icon: 'book', badge: 'YKS Tercih', trend: true, trendRank: 2,
    description: 'AYT Matematik, Fen Bilimleri, Türk Dili ve Edebiyatı-Sosyal Bilimler-1 ile Sosyal Bilimler-2 testlerindeki ham netlerinizi hesaplayın.',
    keywords: ['AYT net hesaplama', '2026 AYT net', 'AYT sayısal net', 'AYT eşit ağırlık net'],
    updatedAt: '2026-07-17',
    formula: 'Her AYT testinde ham net, doğru sayısından yanlış sayısının dörtte biri çıkarılarak hesaplanır.',
    guide: { intro: 'AYT net aracı dört ana test grubunu ayrı hesaplar. Hedef puan türünüze dahil olmayan testleri sıfır bırakabilirsiniz.', evaluate: 'SAY, EA ve SÖZ puan türlerinde test ağırlıkları farklıdır. Bu nedenle yalnızca toplam net yerine hedef alanınızdaki test dağılımını takip edin.' },
    faqs: [{ q: 'AYT’de dört yanlış bir doğruyu götürür mü?', a: 'Her test için yanlış cevapların dörtte biri doğru sayısından çıkarılarak ham net bulunur.' }, { q: 'Bu araç AYT puanı verir mi?', a: 'Hayır. Standart puanlar ve OBP bilinmeden kesin yerleştirme puanı hesaplanamaz.' }],
    sources: [{ label: '2026 YKS kılavuzu', url: 'https://www.osym.gov.tr/TR,33851/2026-yuksekogretim-kurumlari-sinavi-yks-kilavuzu.html' }],
    fields: [
      { key: 'mathC', label: 'Matematik doğru', type: 'number', default: 25, min: 0, max: 40, suffix: 'doğru' },
      { key: 'mathW', label: 'Matematik yanlış', type: 'number', default: 8, min: 0, max: 40, suffix: 'yanlış' },
      { key: 'scienceC', label: 'Fen doğru', type: 'number', default: 20, min: 0, max: 40, suffix: 'doğru' },
      { key: 'scienceW', label: 'Fen yanlış', type: 'number', default: 10, min: 0, max: 40, suffix: 'yanlış' },
      { key: 'literatureC', label: 'Edebiyat-Sosyal 1 doğru', type: 'number', default: 24, min: 0, max: 40, suffix: 'doğru' },
      { key: 'literatureW', label: 'Edebiyat-Sosyal 1 yanlış', type: 'number', default: 8, min: 0, max: 40, suffix: 'yanlış' },
      { key: 'socialC', label: 'Sosyal Bilimler 2 doğru', type: 'number', default: 20, min: 0, max: 40, suffix: 'doğru' },
      { key: 'socialW', label: 'Sosyal Bilimler 2 yanlış', type: 'number', default: 8, min: 0, max: 40, suffix: 'yanlış' },
    ],
    constraints: [
      { keys: ['mathC', 'mathW'], max: 40, message: 'Matematik doğru ve yanlış toplamı 40 soruyu aşamaz.' },
      { keys: ['scienceC', 'scienceW'], max: 40, message: 'Fen doğru ve yanlış toplamı 40 soruyu aşamaz.' },
      { keys: ['literatureC', 'literatureW'], max: 40, message: 'Edebiyat-Sosyal 1 toplamı 40 soruyu aşamaz.' },
      { keys: ['socialC', 'socialW'], max: 40, message: 'Sosyal Bilimler 2 toplamı 40 soruyu aşamaz.' },
    ],
    calculate: (v) => {
      const math = examNet(v.mathC, v.mathW), science = examNet(v.scienceC, v.scienceW), literature = examNet(v.literatureC, v.literatureW), social = examNet(v.socialC, v.socialW), total = math + science + literature + social
      return result([item('Toplam AYT neti', number(total), 'primary'), item('Matematik neti', number(math)), item('Fen neti', number(science))], [item('Edebiyat-Sosyal 1', number(literature)), item('Sosyal Bilimler 2', number(social)), item('Sayısal test toplamı', number(math + science)), item('Sözel test toplamı', number(literature + social))], 'Ham net hesabıdır; yerleştirme puanı değildir.')
    },
  }
]
