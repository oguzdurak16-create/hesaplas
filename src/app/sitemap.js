import { tools } from '@/data/tools'
import { SITE_URL } from '@/lib/seo'
import { isIndexableTool } from '@/lib/indexFocus'

const TECHNICAL_UPDATED = '2026-08-14'

function latestDate(value) {
  if (!value) return TECHNICAL_UPDATED
  return String(value) > TECHNICAL_UPDATED ? value : TECHNICAL_UPDATED
}

export default function sitemap() {
  const fixed = [
    { path: '/', priority: 1, changeFrequency: 'weekly' },
    { path: '/tum-araclar/', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/hakkimizda/', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/iletisim/', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/reklam-ve-isbirligi/', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/gizlilik-politikasi/', priority: 0.2, changeFrequency: 'yearly' },
    { path: '/cerez-politikasi/', priority: 0.2, changeFrequency: 'yearly' },
    { path: '/kullanim-kosullari/', priority: 0.2, changeFrequency: 'yearly' },
  ]

  return [
    ...fixed.map((item) => ({
      url: `${SITE_URL}${item.path}`,
      lastModified: TECHNICAL_UPDATED,
      changeFrequency: item.changeFrequency,
      priority: item.priority,
    })),
    ...tools
      .filter((tool) => isIndexableTool(tool.slug))
      .map((tool) => ({
        url: `${SITE_URL}/${tool.slug}/`,
        lastModified: latestDate(tool.updatedAt),
        changeFrequency: 'monthly',
        priority: tool.trend ? 0.9 : 0.7,
      })),
  ]
}
