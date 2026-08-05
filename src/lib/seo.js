export const SITE_NAME = 'Hesaplas.com'
export const SITE_URL = 'https://www.hesaplas.com'
export const DEFAULT_OG_IMAGE = '/logo-512.png'

export function absoluteUrl(path = '') {
  if (!path || path === '/') return `${SITE_URL}/`
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalizedPath}`
}

export function createMetadata({ title, description, path = '/', keywords = [], noIndex = false }) {
  const url = absoluteUrl(path)
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`
  const robots = noIndex
    ? { index: false, follow: false }
    : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-snippet': -1,
          'max-image-preview': 'large',
          'max-video-preview': -1,
        },
      }

  return {
    title: { absolute: fullTitle },
    description,
    keywords,
    alternates: { canonical: url },
    robots,
    openGraph: {
      type: 'website',
      locale: 'tr_TR',
      url,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      images: [{ url: absoluteUrl(DEFAULT_OG_IMAGE), width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [absoluteUrl(DEFAULT_OG_IMAGE)],
    },
  }
}
