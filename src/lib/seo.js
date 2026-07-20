export const SITE_NAME = 'Hesaplas.com'
export const SITE_URL = 'https://hesaplas.com'
export const DEFAULT_OG_IMAGE = '/logo-512.png'

export function absoluteUrl(path = '') {
  if (!path || path === '/') return SITE_URL
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export function createMetadata({ title, description, path = '/', keywords = [], noIndex = false }) {
  const url = absoluteUrl(path)
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`
  return {
    title: { absolute: fullTitle },
    description,
    keywords,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: 'website', locale: 'tr_TR', url, title: fullTitle, description, siteName: SITE_NAME,
      images: [{ url: absoluteUrl(DEFAULT_OG_IMAGE), width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [absoluteUrl(DEFAULT_OG_IMAGE)] },
  }
}
