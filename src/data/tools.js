import { toolsPart01 } from './tools-parts/part-01.js'
import { toolsPart02 } from './tools-parts/part-02.js'
import { toolsPart03 } from './tools-parts/part-03.js'
import { toolsPart04 } from './tools-parts/part-04.js'
import { toolsPart05 } from './tools-parts/part-05.js'
import { toolsPart06 } from './tools-parts/part-06.js'
import { toolsPart07 } from './tools-parts/part-07.js'
import { toolsPart08 } from './tools-parts/part-08.js'

export const categories = [
  { id: 'finans', name: 'Finans', icon: 'wallet', description: 'Kredi, faiz, yatırım ve borç araçları' },
  { id: 'maas-vergi', name: 'Maaş ve Vergi', icon: 'briefcase', description: 'Ücret, tazminat, vergi ve çalışma hesapları' },
  { id: 'ev-yasam', name: 'Ev ve Yaşam', icon: 'home', description: 'Kira, enerji, yakıt ve günlük gider araçları' },
  { id: 'saglik', name: 'Sağlık', icon: 'heart', description: 'BMI, kalori, su ve gebelik hesapları' },
  { id: 'pratik', name: 'Pratik', icon: 'calculator', description: 'Yüzde, tarih, ölçü ve alışveriş araçları' },
  { id: 'egitim', name: 'Eğitim', icon: 'graduation', description: 'Sınav neti, puan öncesi analiz ve öğrenci araçları' },
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
]


const DEFAULT_UPDATED_AT = '2026-07-17'
tools.forEach((tool) => { if (!tool.updatedAt) tool.updatedAt = DEFAULT_UPDATED_AT })

export const toolMap = Object.fromEntries(tools.map((tool) => [tool.slug, tool]))
export const trendingTools = tools.filter((tool) => tool.trend).sort((a, b) => (a.trendRank ?? 999) - (b.trendRank ?? 999))
export const toolsByCategory = (category) => tools.filter((tool) => tool.category === category)
