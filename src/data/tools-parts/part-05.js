import { n, money, number, integer, percent, daysBetween, addDays, formatDate, payment, result, item, examNet } from '../tool-utils'

export const toolsPart05 = [
{
    slug: 'yks-tyt-net-hesaplama', title: 'YKS TYT Net Hesaplama', shortTitle: 'TYT Net', category: 'egitim', icon: 'graduation', badge: 'Sınav Dönemi', trend: true, trendRank: 4,
    description: 'TYT Türkçe, Sosyal Bilimler, Temel Matematik ve Fen Bilimleri doğru-yanlış sayılarına göre ders ve toplam netinizi hesaplayın.',
    keywords: ['YKS net hesaplama', 'TYT net hesaplama', '2026 TYT net', 'TYT doğru yanlış hesaplama'],
    formula: 'Her test için net, doğru sayısından yanlış sayısının dörtte biri çıkarılarak hesaplanır. TYT puanı ise standart puanlar ve okul başarı puanı gibi ek değişkenlere bağlıdır.',
    guide: {
      intro: 'TYT neti, hangi testte güçlü olduğunuzu ve toplam ham performansınızı hızlıca görmenizi sağlar. Araç puan tahmini yapmaz; yalnızca doğru ve yanlışlardan test netlerini çıkarır.',
      evaluate: 'Toplam neti tek başına değerlendirmek yerine Türkçe ve Temel Matematik netlerini ayrı izleyin. Denemeler arasındaki artış veya düşüşü aynı soru sayısı ve benzer zorluk düzeyiyle karşılaştırın.',
    },
    faqs: [
      { q: 'TYT’de dört yanlış bir doğruyu götürür mü?', a: 'Net hesabında her test için yanlış cevapların dörtte biri doğru cevap sayısından çıkarılır.' },
      { q: 'Bu araç YKS puanını hesaplar mı?', a: 'Hayır. Standart sapma, test ortalamaları ve okul başarı puanı bilinmeden kesin YKS puanı hesaplanamaz.' },
    ],
    fields: [
      { key: 'turkishCorrect', label: 'Türkçe doğru', type: 'number', default: 30, min: 0, max: 40, suffix: 'doğru' },
      { key: 'turkishWrong', label: 'Türkçe yanlış', type: 'number', default: 8, min: 0, max: 40, suffix: 'yanlış' },
      { key: 'socialCorrect', label: 'Sosyal doğru', type: 'number', default: 14, min: 0, max: 20, suffix: 'doğru' },
      { key: 'socialWrong', label: 'Sosyal yanlış', type: 'number', default: 4, min: 0, max: 20, suffix: 'yanlış' },
      { key: 'mathCorrect', label: 'Matematik doğru', type: 'number', default: 24, min: 0, max: 40, suffix: 'doğru' },
      { key: 'mathWrong', label: 'Matematik yanlış', type: 'number', default: 10, min: 0, max: 40, suffix: 'yanlış' },
      { key: 'scienceCorrect', label: 'Fen doğru', type: 'number', default: 13, min: 0, max: 20, suffix: 'doğru' },
      { key: 'scienceWrong', label: 'Fen yanlış', type: 'number', default: 5, min: 0, max: 20, suffix: 'yanlış' },
    ],
    constraints: [{ keys: ['turkishCorrect', 'turkishWrong'], max: 40, message: 'Türkçe doğru ve yanlış toplamı 40 soruyu aşamaz.' }, { keys: ['socialCorrect', 'socialWrong'], max: 20, message: 'Sosyal doğru ve yanlış toplamı 20 soruyu aşamaz.' }, { keys: ['mathCorrect', 'mathWrong'], max: 40, message: 'Matematik doğru ve yanlış toplamı 40 soruyu aşamaz.' }, { keys: ['scienceCorrect', 'scienceWrong'], max: 20, message: 'Fen doğru ve yanlış toplamı 20 soruyu aşamaz.' }],
    calculate: (v) => {
      const turkish = examNet(v.turkishCorrect, v.turkishWrong), social = examNet(v.socialCorrect, v.socialWrong), math = examNet(v.mathCorrect, v.mathWrong), science = examNet(v.scienceCorrect, v.scienceWrong)
      const total = turkish + social + math + science, correct = n(v.turkishCorrect) + n(v.socialCorrect) + n(v.mathCorrect) + n(v.scienceCorrect), wrong = n(v.turkishWrong) + n(v.socialWrong) + n(v.mathWrong) + n(v.scienceWrong)
      return result([item('Toplam TYT neti', number(total), 'primary'), item('Türkçe neti', number(turkish)), item('Matematik neti', number(math))], [item('Sosyal Bilimler neti', number(social)), item('Fen Bilimleri neti', number(science)), item('Toplam doğru', integer(correct)), item('Toplam yanlış', integer(wrong))], 'Bu sonuç ham net hesabıdır; yerleştirme puanı değildir.')
    },
  },
{
    slug: 'lgs-net-hesaplama', title: 'LGS Net Hesaplama', shortTitle: 'LGS Net', category: 'egitim', icon: 'book', badge: 'Sınav Dönemi', trend: true, trendRank: 5,
    description: 'LGS alt testlerindeki doğru ve yanlış sayılarına göre ders netlerini, sözel-sayısal toplamları ve genel neti hesaplayın.',
    keywords: ['LGS net hesaplama', '2026 LGS net', 'LGS doğru yanlış hesaplama', 'LGS puan öncesi net'],
    formula: 'LGS’de her alt testin ham neti, doğru cevap sayısından yanlış cevap sayısının üçte biri çıkarılarak bulunur. Resmî sınav puanı standartlaştırma ve test ağırlıklarıyla ayrıca hesaplanır.',
    guide: {
      intro: 'LGS net hesabı, alt testlerdeki ham performansı gösterir. Türkçe, Matematik ve Fen Bilimleri yirmişer; diğer alt testler onar soru sınırıyla girilebilir.',
      evaluate: 'Sözel ve sayısal toplamları ayrı takip edin. Resmî LGS puanı yalnızca toplam netten oluşmadığı için bu sonucu puan veya yüzdelik dilim olarak yorumlamayın.',
    },
    faqs: [
      { q: 'LGS’de yanlışlar neti nasıl etkiler?', a: 'Her alt testte üç yanlış cevap bir doğru cevabı götürecek şekilde ham net hesabı yapılır.' },
      { q: 'Netten kesin LGS puanı bulunur mu?', a: 'Hayır. Testlerin standart puanları ve ağırlıkları sınav sonuçlarıyla birlikte oluştuğu için kesin puan yalnızca resmî sonuçta belirlenir.' },
    ],
    fields: [
      { key: 'trC', label: 'Türkçe doğru', type: 'number', default: 16, min: 0, max: 20, suffix: 'doğru' },
      { key: 'trW', label: 'Türkçe yanlış', type: 'number', default: 3, min: 0, max: 20, suffix: 'yanlış' },
      { key: 'mathC', label: 'Matematik doğru', type: 'number', default: 14, min: 0, max: 20, suffix: 'doğru' },
      { key: 'mathW', label: 'Matematik yanlış', type: 'number', default: 4, min: 0, max: 20, suffix: 'yanlış' },
      { key: 'scienceC', label: 'Fen doğru', type: 'number', default: 16, min: 0, max: 20, suffix: 'doğru' },
      { key: 'scienceW', label: 'Fen yanlış', type: 'number', default: 3, min: 0, max: 20, suffix: 'yanlış' },
      { key: 'historyC', label: 'İnkılap doğru', type: 'number', default: 8, min: 0, max: 10, suffix: 'doğru' },
      { key: 'historyW', label: 'İnkılap yanlış', type: 'number', default: 1, min: 0, max: 10, suffix: 'yanlış' },
      { key: 'religionC', label: 'Din doğru', type: 'number', default: 9, min: 0, max: 10, suffix: 'doğru' },
      { key: 'religionW', label: 'Din yanlış', type: 'number', default: 1, min: 0, max: 10, suffix: 'yanlış' },
      { key: 'englishC', label: 'İngilizce doğru', type: 'number', default: 8, min: 0, max: 10, suffix: 'doğru' },
      { key: 'englishW', label: 'İngilizce yanlış', type: 'number', default: 2, min: 0, max: 10, suffix: 'yanlış' },
    ],
    constraints: [{ keys: ['trC', 'trW'], max: 20, message: 'Türkçe toplamı 20 soruyu aşamaz.' }, { keys: ['mathC', 'mathW'], max: 20, message: 'Matematik toplamı 20 soruyu aşamaz.' }, { keys: ['scienceC', 'scienceW'], max: 20, message: 'Fen toplamı 20 soruyu aşamaz.' }, { keys: ['historyC', 'historyW'], max: 10, message: 'İnkılap Tarihi toplamı 10 soruyu aşamaz.' }, { keys: ['religionC', 'religionW'], max: 10, message: 'Din Kültürü toplamı 10 soruyu aşamaz.' }, { keys: ['englishC', 'englishW'], max: 10, message: 'İngilizce toplamı 10 soruyu aşamaz.' }],
    calculate: (v) => {
      const tr = examNet(v.trC, v.trW, 3), math = examNet(v.mathC, v.mathW, 3), science = examNet(v.scienceC, v.scienceW, 3), history = examNet(v.historyC, v.historyW, 3), religion = examNet(v.religionC, v.religionW, 3), english = examNet(v.englishC, v.englishW, 3)
      const verbal = tr + history + religion + english, numeric = math + science, total = verbal + numeric
      return result([item('Toplam LGS neti', number(total), 'primary'), item('Sözel toplam', number(verbal)), item('Sayısal toplam', number(numeric))], [item('Türkçe', number(tr)), item('Matematik', number(math)), item('Fen Bilimleri', number(science)), item('İnkılap Tarihi', number(history)), item('Din Kültürü', number(religion)), item('İngilizce', number(english))], 'Ham net hesabıdır; resmî LGS puanı ve yüzdelik dilim değildir.')
    },
  },
{
    slug: 'kpss-net-hesaplama', title: 'KPSS Net Hesaplama', shortTitle: 'KPSS Net', category: 'egitim', icon: 'clipboard', badge: '2026', trend: true, trendRank: 7,
    description: 'KPSS Genel Yetenek ve Genel Kültür doğru-yanlış sayılarına göre test netlerini ve toplam ham netinizi hesaplayın.',
    keywords: ['KPSS net hesaplama', '2026 KPSS net', 'KPSS lisans net', 'KPSS önlisans net hesaplama'],
    formula: 'Genel Yetenek ve Genel Kültür testlerinde net, doğru cevap sayısından yanlış cevap sayısının dörtte biri çıkarılarak hesaplanır.',
    guide: {
      intro: 'KPSS net aracı lisans, ön lisans ve ortaöğretim düzeylerinde kullanılan doğru-yanlış ham net mantığını uygular. Puan türü tahmini yapmaz.',
      evaluate: 'Genel Yetenek ve Genel Kültür netlerini ayrı izleyin. KPSS puanları aday grubunun ortalama ve standart sapma değerlerine göre oluştuğu için aynı net farklı sınavlarda farklı puana dönüşebilir.',
    },
    faqs: [
      { q: 'KPSS’de kaç yanlış bir doğruyu götürür?', a: 'Her testte dört yanlış cevap bir doğru cevabı götürecek şekilde ham net hesaplanır.' },
      { q: 'Toplam netten P3 puanı bulunur mu?', a: 'Kesin P3 puanı yalnızca ÖSYM tarafından standart puanlar hesaplandıktan sonra belirlenebilir.' },
    ],
    fields: [
      { key: 'abilityCorrect', label: 'Genel Yetenek doğru', type: 'number', default: 45, min: 0, max: 60, suffix: 'doğru' },
      { key: 'abilityWrong', label: 'Genel Yetenek yanlış', type: 'number', default: 10, min: 0, max: 60, suffix: 'yanlış' },
      { key: 'cultureCorrect', label: 'Genel Kültür doğru', type: 'number', default: 40, min: 0, max: 60, suffix: 'doğru' },
      { key: 'cultureWrong', label: 'Genel Kültür yanlış', type: 'number', default: 15, min: 0, max: 60, suffix: 'yanlış' },
    ],
    constraints: [{ keys: ['abilityCorrect', 'abilityWrong'], max: 60, message: 'Genel Yetenek toplamı 60 soruyu aşamaz.' }, { keys: ['cultureCorrect', 'cultureWrong'], max: 60, message: 'Genel Kültür toplamı 60 soruyu aşamaz.' }],
    calculate: (v) => {
      const ability = examNet(v.abilityCorrect, v.abilityWrong), culture = examNet(v.cultureCorrect, v.cultureWrong), total = ability + culture
      return result([item('Toplam KPSS neti', number(total), 'primary'), item('Genel Yetenek neti', number(ability)), item('Genel Kültür neti', number(culture))], [item('Toplam doğru', integer(n(v.abilityCorrect) + n(v.cultureCorrect))), item('Toplam yanlış', integer(n(v.abilityWrong) + n(v.cultureWrong)))], 'Ham net hesabıdır; KPSS puan türü sonucu değildir.')
    },
  }
]
