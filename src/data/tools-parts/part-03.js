import { n, money, number, integer, percent, daysBetween, addDays, formatDate, payment, result, item, examNet } from '../tool-utils'

export const toolsPart03 = [
{
    slug: 'kira-artis-hesaplama', title: 'Kira Artış Hesaplama', shortTitle: 'Kira Artışı', category: 'ev-yasam', icon: 'house', badge: 'Gündem', trend: true,
    description: 'Mevcut kira ve uygulanacak artış oranıyla yeni kira tutarını, aylık ve yıllık farkı hesaplayın.',
    keywords: ['kira artış hesaplama', 'kira zammı', 'tüfe kira artışı'],
    fields: [
      { key: 'rent', label: 'Mevcut aylık kira', type: 'number', default: 20000, min: 0, suffix: 'TL' },
      { key: 'rate', label: 'Uygulanacak artış oranı', type: 'number', default: 32.03, min: 0, step: 0.01, suffix: '%', help: 'Sözleşme yenileme ayındaki resmi oranı kontrol ederek güncelleyin.' },
    ],
    calculate: (v) => {
      const rent = n(v.rent), rate = n(v.rate), increase = rent * rate / 100, next = rent + increase
      return result([item('Yeni aylık kira', money(next), 'primary'), item('Aylık artış', money(increase), 'warning'), item('Yıllık ek maliyet', money(increase * 12))], [item('Mevcut kira', money(rent)), item('Artış oranı', percent(rate)), item('Yeni yıllık kira', money(next * 12))], 'Resmi tavan oranı sözleşme yenileme ayına göre değişir.')
    },
  },
{
    slug: 'yakit-tuketimi-hesaplama', title: 'Yakıt Tüketimi Hesaplama', shortTitle: 'Yakıt', category: 'ev-yasam', icon: 'fuel', badge: 'Trend', trend: true,
    description: 'Gidilen mesafe, tüketilen yakıt ve litre fiyatına göre yüz kilometre tüketimini ve yol maliyetini hesaplayın.',
    keywords: ['yakıt tüketimi hesaplama', '100 km yakıt', 'yol masrafı'],
    fields: [
      { key: 'distance', label: 'Gidilen mesafe', type: 'number', default: 500, min: 0.1, suffix: 'km' },
      { key: 'liters', label: 'Tüketilen yakıt', type: 'number', default: 32, min: 0, step: 0.01, suffix: 'litre' },
      { key: 'price', label: 'Litre fiyatı', type: 'number', default: 50, min: 0, step: 0.01, suffix: 'TL' },
    ],
    calculate: (v) => {
      const km = Math.max(0.1, n(v.distance)), liters = n(v.liters), price = n(v.price), consumption = liters / km * 100, total = liters * price
      return result([item('100 km tüketim', `${number(consumption)} L`, 'primary'), item('Toplam yakıt maliyeti', money(total)), item('Kilometre maliyeti', money(total / km))], [item('Mesafe', `${number(km)} km`), item('Yakıt', `${number(liters)} litre`), item('100 km maliyeti', money(total / km * 100))])
    },
  },
{
    slug: 'elektrik-tuketimi-hesaplama', title: 'Elektrik Tüketimi Hesaplama', shortTitle: 'Elektrik', category: 'ev-yasam', icon: 'zap', badge: 'Tasarruf',
    description: 'Cihaz gücü, günlük kullanım ve birim fiyatla aylık elektrik tüketimini ve yaklaşık maliyeti hesaplayın.',
    keywords: ['elektrik tüketimi hesaplama', 'cihaz elektrik maliyeti', 'kwh hesaplama'],
    fields: [
      { key: 'watts', label: 'Cihaz gücü', type: 'number', default: 1500, min: 0, suffix: 'W' },
      { key: 'hours', label: 'Günlük kullanım', type: 'number', default: 4, min: 0, max: 24, step: 0.1, suffix: 'saat' },
      { key: 'days', label: 'Aylık kullanım günü', type: 'number', default: 30, min: 0, max: 31, suffix: 'gün' },
      { key: 'unitPrice', label: 'Birim enerji fiyatı', type: 'number', default: 3, min: 0, step: 0.01, suffix: 'TL/kWh' },
    ],
    calculate: (v) => {
      const watts = n(v.watts), hours = n(v.hours), days = n(v.days), price = n(v.unitPrice), kwh = watts / 1000 * hours * days, cost = kwh * price
      return result([item('Aylık tüketim', `${number(kwh)} kWh`, 'primary'), item('Aylık maliyet', money(cost), 'warning'), item('Yıllık tahmin', money(cost * 12))], [item('Günlük tüketim', `${number(watts / 1000 * hours)} kWh`), item('Günlük maliyet', money(cost / Math.max(1, days))), item('Kullanım', `${number(hours)} saat/gün`)], 'Tarife, vergi ve kademeli fiyatlama ayrıca etkileyebilir.')
    },
  },
{
    slug: 'desi-hesaplama', title: 'Kargo Desi Hesaplama', shortTitle: 'Desi', category: 'ev-yasam', icon: 'package', badge: 'E-ticaret',
    description: 'Paket en, boy ve yüksekliğine göre kargo desisini ve hacimsel ağırlığını hesaplayın.',
    keywords: ['desi hesaplama', 'kargo desi', 'hacimsel ağırlık'],
    fields: [
      { key: 'width', label: 'En', type: 'number', default: 40, min: 0, suffix: 'cm' },
      { key: 'length', label: 'Boy', type: 'number', default: 60, min: 0, suffix: 'cm' },
      { key: 'height', label: 'Yükseklik', type: 'number', default: 30, min: 0, suffix: 'cm' },
      { key: 'divisor', label: 'Desi böleni', type: 'select', default: 3000, options: [{ value: 3000, label: '3000 (yaygın)' }, { value: 5000, label: '5000' }, { value: 6000, label: '6000' }] },
    ],
    calculate: (v) => {
      const w = n(v.width), l = n(v.length), h = n(v.height), d = Math.max(1, n(v.divisor)), volume = w * l * h, desi = volume / d
      return result([item('Hacimsel ağırlık', `${number(desi)} desi`, 'primary'), item('Paket hacmi', `${integer(volume)} cm³`), item('Yuvarlanmış desi', `${Math.ceil(desi)} desi`)], [item('Ölçüler', `${number(w)} × ${number(l)} × ${number(h)} cm`), item('Bölen', integer(d))], 'Kargo şirketinin kullandığı böleni ve yuvarlama kuralını kontrol edin.')
    },
  },
{
    slug: 'bmi-hesaplama', title: 'BMI Vücut Kitle İndeksi', shortTitle: 'BMI', category: 'saglik', icon: 'activity', badge: 'Sağlık',
    description: 'Boy ve kilonuza göre vücut kitle indeksinizi ve genel BMI aralığınızı hesaplayın.',
    keywords: ['bmi hesaplama', 'vücut kitle indeksi', 'boy kilo oranı'],
    fields: [
      { key: 'weight', label: 'Kilo', type: 'number', default: 70, min: 1, step: 0.1, suffix: 'kg' },
      { key: 'height', label: 'Boy', type: 'number', default: 170, min: 50, max: 250, suffix: 'cm' },
    ],
    calculate: (v) => {
      const weight = n(v.weight), height = n(v.height) / 100, bmi = weight / (height * height)
      const label = bmi < 18.5 ? 'Düşük kilo' : bmi < 25 ? 'Normal aralık' : bmi < 30 ? 'Fazla kilo' : 'Yüksek BMI'
      return result([item('BMI sonucu', number(bmi), 'primary'), item('Genel sınıf', label), item('Normal kilo aralığı', `${number(18.5 * height * height)}–${number(24.9 * height * height)} kg`)], [item('Kilo', `${number(weight)} kg`), item('Boy', `${number(height * 100)} cm`)], 'BMI tek başına tanı koymaz; kas oranı, yaş ve diğer ölçümler de önemlidir.')
    },
  },
{
    slug: 'kalori-ihtiyaci-hesaplama', title: 'Günlük Kalori İhtiyacı', shortTitle: 'Kalori', category: 'saglik', icon: 'flame', badge: 'Popüler',
    description: 'Cinsiyet, yaş, boy, kilo ve aktivite düzeyine göre bazal metabolizma ve günlük enerji ihtiyacını hesaplayın.',
    keywords: ['kalori ihtiyacı hesaplama', 'bazal metabolizma', 'tdee'],
    fields: [
      { key: 'gender', label: 'Cinsiyet', type: 'select', default: 'female', options: [{ value: 'female', label: 'Kadın' }, { value: 'male', label: 'Erkek' }] },
      { key: 'age', label: 'Yaş', type: 'number', default: 30, min: 14, max: 100, suffix: 'yaş' },
      { key: 'weight', label: 'Kilo', type: 'number', default: 70, min: 1, step: 0.1, suffix: 'kg' },
      { key: 'height', label: 'Boy', type: 'number', default: 170, min: 50, max: 250, suffix: 'cm' },
      { key: 'activity', label: 'Aktivite', type: 'select', default: 1.375, options: [{ value: 1.2, label: 'Hareketsiz' }, { value: 1.375, label: 'Hafif aktif' }, { value: 1.55, label: 'Orta aktif' }, { value: 1.725, label: 'Çok aktif' }] },
    ],
    calculate: (v) => {
      const age = n(v.age), w = n(v.weight), h = n(v.height), act = n(v.activity), bmr = 10 * w + 6.25 * h - 5 * age + (v.gender === 'male' ? 5 : -161), tdee = bmr * act
      return result([item('Günlük koruma kalorisi', `${integer(tdee)} kcal`, 'primary'), item('Bazal metabolizma', `${integer(bmr)} kcal`), item('Hafif açık hedefi', `${integer(tdee - 300)} kcal`, 'success')], [item('Aktivite katsayısı', number(act)), item('Kilo', `${number(w)} kg`), item('Boy', `${number(h)} cm`)], 'Genel tahmindir; sağlık hedefleri için uzman değerlendirmesi gerekir.')
    },
  },
{
    slug: 'gunluk-su-ihtiyaci', title: 'Günlük Su İhtiyacı Hesaplama', shortTitle: 'Su İhtiyacı', category: 'saglik', icon: 'droplets', badge: 'Günlük',
    description: 'Kilo, egzersiz süresi ve sıcak hava etkisine göre günlük yaklaşık su ihtiyacınızı hesaplayın.',
    keywords: ['su ihtiyacı hesaplama', 'günde kaç litre su', 'kilo su oranı'],
    fields: [
      { key: 'weight', label: 'Kilo', type: 'number', default: 70, min: 1, suffix: 'kg' },
      { key: 'exercise', label: 'Günlük egzersiz', type: 'number', default: 30, min: 0, suffix: 'dakika' },
      { key: 'hot', label: 'Sıcak hava ekle', type: 'select', default: 0, options: [{ value: 0, label: 'Hayır' }, { value: 500, label: 'Evet (+500 ml)' }] },
    ],
    calculate: (v) => {
      const weight = n(v.weight), exercise = n(v.exercise), ml = weight * 35 + exercise / 30 * 350 + n(v.hot)
      return result([item('Günlük yaklaşık ihtiyaç', `${number(ml / 1000)} litre`, 'primary'), item('Bardak karşılığı', `${integer(ml / 250)} bardak`), item('Saatlik ortalama', `${integer(ml / 16)} ml`)], [item('Kilo bazlı miktar', `${integer(weight * 35)} ml`), item('Aktivite eklemesi', `${integer(exercise / 30 * 350)} ml`)], 'Böbrek, kalp ve benzeri sağlık durumlarında sıvı hedefi doktor tarafından belirlenmelidir.')
    },
  },
{
    slug: 'ideal-kilo-hesaplama', title: 'İdeal Kilo Hesaplama', shortTitle: 'İdeal Kilo', category: 'saglik', icon: 'scale', badge: 'Sağlık',
    description: 'Boy ve cinsiyete göre farklı formüllerin ortalamasıyla genel ideal kilo tahmini oluşturun.',
    keywords: ['ideal kilo hesaplama', 'boya göre kilo', 'sağlıklı kilo'],
    fields: [
      { key: 'gender', label: 'Cinsiyet', type: 'select', default: 'female', options: [{ value: 'female', label: 'Kadın' }, { value: 'male', label: 'Erkek' }] },
      { key: 'height', label: 'Boy', type: 'number', default: 170, min: 130, max: 230, suffix: 'cm' },
    ],
    calculate: (v) => {
      const h = n(v.height), inchesOver5 = Math.max(0, h / 2.54 - 60), devine = (v.gender === 'male' ? 50 : 45.5) + 2.3 * inchesOver5, robinson = (v.gender === 'male' ? 52 : 49) + (v.gender === 'male' ? 1.9 : 1.7) * inchesOver5, avg = (devine + robinson) / 2
      return result([item('Ortalama tahmin', `${number(avg)} kg`, 'primary'), item('Genel aralık', `${number(avg * 0.9)}–${number(avg * 1.1)} kg`), item('Boy', `${number(h)} cm`)], [item('Devine formülü', `${number(devine)} kg`), item('Robinson formülü', `${number(robinson)} kg`)], 'Vücut yapısı ve kas oranı hesaba katılmadığı için genel referanstır.')
    },
  }
]
