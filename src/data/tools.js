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
import { searchRecovery } from './search-recovery.js'
import { indexRecovery } from './index-recovery.js'
import { currentEditorial } from './current-editorial.js'
import { applyRegulatoryFieldOverrides } from './regulatory.js'

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

function mergeEditorial(tool, editorial) {
  if (!editorial) return

  const { guide, faqs, sources, fieldOverrides, replaceSources = false, ...plain } = editorial
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
    const sourceRows = replaceSources ? sources : [...(tool.sources || []), ...sources]
    tool.sources = sourceRows.filter((source) => {
      if (seen.has(source.url)) return false
      seen.add(source.url)
      return true
    })
  }

  if (fieldOverrides) {
    tool.fields = tool.fields.map((field) => fieldOverrides[field.key] ? { ...field, ...fieldOverrides[field.key] } : field)
  }
}

tools.forEach((tool) => {
  mergeEditorial(tool, focusEditorial[tool.slug])
  mergeEditorial(tool, searchRecovery[tool.slug])
  mergeEditorial(tool, indexRecovery[tool.slug])
  mergeEditorial(tool, currentEditorial[tool.slug])

  // Regulation-sensitive defaults are applied last so one verified config
  // remains authoritative even when legacy tool definitions still carry
  // fallback values.
  applyRegulatoryFieldOverrides(tool)

  if (tool.slug === 'kira-artis-hesaplama') {
    const calculate = tool.calculate
    tool.calculate = (values) => ({
      ...calculate(values),
      note: 'Eylül 2026 yenilemeleri için TÜİK Ağustos 2026 on iki aylık ortalama TÜFE değişimi %31,79’dur. Farklı bir yenileme ayı için o aya karşılık gelen güncel TÜİK oranını kontrol edip alana girin.',
    })
  }

  if (tool.slug === 'kredi-karti-borc') {
    const calculate = tool.calculate
    tool.calculate = (values) => ({
      ...calculate(values),
      note: '29 Ocak 2026 tarihli 11366 sayılı BDDK kararının özel başvuru süresi sona ermiştir. Bu sonuç mevcut bir banka teklifini veya devam eden yapılandırma planını karşılaştırmak içindir. Karar kapsamındaki yapılandırmalarda aylık akdi faiz TCMB referans oranı olan %3,11’i aşamaz; bankanızın gerçek teklif oranı ve ek yükleri farklı olabilir.',
    })
  }

  if (!tool.updatedAt) tool.updatedAt = DEFAULT_UPDATED_AT
})

export const toolMap = Object.fromEntries(tools.map((tool) => [tool.slug, tool]))
export const trendingTools = tools.filter((tool) => tool.trend).sort((a, b) => (a.trendRank ?? 999) - (b.trendRank ?? 999))
export const toolsByCategory = (category) => tools.filter((tool) => tool.category === category)
