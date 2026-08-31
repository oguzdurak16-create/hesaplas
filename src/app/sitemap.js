import { categories, tools } from '@/data/tools'
import { SITE_URL } from '@/lib/seo'
import { isIndexableTool } from '@/lib/indexFocus'

const SITE_UPDATED = '2026-09-01'
const FALLBACK_TOOL_UPDATED = '2026-07-17'

function toolUpdatedAt(tool) {
  return tool.updatedAt || FALLBACK_TOOL_UPDATED
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
      lastModified: SITE_UPDATED,
      changeFrequency: item.changeFrequency,
      priority: item.priority,
    })),
    ...categories.map((category) => ({
      url: `${SITE_URL}/kategori/${category.id}/`,
      lastModified: SITE_UPDATED,
      changeFrequency: 'weekly',
      priority: 0.85,
    })),
    ...tools
      .filter((tool) => isIndexableTool(tool.slug))
      .map((tool) => ({
        url: `${SITE_URL}/${tool.slug}/`,
        lastModified: toolUpdatedAt(tool),
        changeFrequency: 'monthly',
        priority: tool.trend ? 0.9 : 0.7,
      })),
  ]
}
