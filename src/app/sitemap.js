import { tools } from '@/data/tools'
import { SITE_URL } from '@/lib/seo'

const CONTENT_UPDATED = '2026-07-17'

export default function sitemap() {
  const fixed = ['', '/tum-araclar/', '/hakkimizda/', '/iletisim/', '/gizlilik-politikasi/', '/cerez-politikasi/', '/kullanim-kosullari/']
  return [
    ...fixed.map((path) => ({ url: `${SITE_URL}${path}`, lastModified: CONTENT_UPDATED })),
    ...tools.map((tool) => ({ url: `${SITE_URL}/${tool.slug}/`, lastModified: tool.updatedAt || CONTENT_UPDATED })),
  ]
}
