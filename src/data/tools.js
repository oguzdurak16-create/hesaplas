import { toolsPart01 } from './tools-parts/part-01.js'
import { toolsPart02 } from './tools-parts/part-02.js'
import { toolsPart03 } from './tools-parts/part-03.js'
import { toolsPart04 } from './tools-parts/part-04.js'
import { toolsPart05 } from './tools-parts/part-05.js'
import { toolsPart06 } from './tools-parts/part-06.js'
import { toolsPart07 } from './tools-parts/part-07.js'
import { toolsPart08 } from './tools-parts/part-08.js'
import { toolsPart09 } from './tools-parts/part-09.js'
import { focusEditorial } from './focus-editorial.js'

export const categories = [
  { id: 'finans', name: 'Finans', icon: 'wallet', description: 'Kredi, faiz, yatırım ve borç araçları' },
  { id: 'maas-vergi', name: 'Maaş ve Vergi', icon: 'briefcase', description: 'Ücret, tazminat, vergi ve çalışma hesapları' },
  { id: 'ev-yasam', name: 'Ev ve Yaşam', icon: 'home', description: 'Kira, enerji, yakıt ve günlük gider araçları' },
  { id: 'saglik', name: 'Sağlık', icon: 'heart', description: 'BMI, kalori, su ve gebelik hesapları' },
  { id: 'pratik', name: 'Pratik', icon: 'calculator', description: 'Yüzde, tarih, ölçü ve alışveriş araçları' },
  { id: 'egitim', name: 'Eğitim', icon: 'graduation', description: 'Sınav neti, puan öncesi analiz ve öğrenci araçları' },
  { id: 'teknoloji', name: 'Teknoloji', icon: 'command', description: 'Yapay zeka, API, SaaS ve dijital maliyet araçları' },
]

export const tools = [
  ...toolsPart01,
  ...toolsPart02,
  ...toolsPart03,
  ...toolsPart04,
  ...toolsPart05,
  ...toolsPart06,
  ...toolsPart07,
  ...toolsPart08,
  ...toolsPart09,
]

const DEFAULT_UPDATED_AT = '2026-07-17'

tools.forEach((tool) => {
  const editorial = focusEditorial[tool.slug]
  if (editorial) {
    const { guide, faqs, sources, fieldOverrides, ...plain } = editorial
    Object.assign(tool, plain)

    if (guide) tool.guide = { ...(tool.guide || {}), ...guide }

    if (faqs) {
      const seen = new Set()
      tool.faqs = [...faqs, ...(tool.faqs || [])].filter((row) => {
        if (seen.has(row.q)) return false
        seen.add(row.q)
        return true
      }).slice(0, 6)
    }

    if (sources) {
      const seen = new Set()
      tool.sources = [...(tool.sources || []), ...sources].filter((source) => {
        if (seen.has(source.url)) return false
        seen.add(source.url)
        return true
      })
    }

    if (fieldOverrides) {
      tool.fields = tool.fields.map((field) => fieldOverrides[field.key] ? { ...field, ...fieldOverrides[field.key] } : field)
    }
  }

  if (tool.slug === 'kira-artis-hesaplama') {
    const calculate = tool.calculate
    tool.calculate = (values) => ({
      ...calculate(values),
      note: 'Artış oranı otomatik güncellenmez. Yenileme ayınız için TÜİK tarafından yayımlanan 12 aylık ortalama oranını kontrol edip alana girin. Temmuz 2026 için %32,03 yalnızca örnek referanstır.',
    })
  }

  if (!tool.updatedAt) tool.updatedAt = DEFAULT_UPDATED_AT
})

export const toolMap = Object.fromEntries(tools.map((tool) => [tool.slug, tool]))
export const trendingTools = tools.filter((tool) => tool.trend).sort((a, b) => (a.trendRank ?? 999) - (b.trendRank ?? 999))
export const toolsByCategory = (category) => tools.filter((tool) => tool.category === category)
