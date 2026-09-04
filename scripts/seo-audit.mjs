import fs from 'node:fs'
import path from 'node:path'

const OUT_DIR = path.join(process.cwd(), 'out')
const SITEMAP_PATH = path.join(OUT_DIR, 'sitemap.xml')
const EXPECTED_ORIGIN = 'https://www.hesaplas.com'
const CURRENT_YEAR = '2026'
const errors = []
const warnings = []

const fixedNonCalculatorPaths = new Set([
  '/', '/tum-araclar/', '/hakkimizda/', '/iletisim/', '/reklam-ve-isbirligi/',
  '/gizlilik-politikasi/', '/cerez-politikasi/', '/kullanim-kosullari/',
])

function error(message) { errors.push(message) }
function warn(message) { warnings.push(message) }

function extractTag(html, tagName, attributeName, attributeValue) {
  const tags = html.match(new RegExp(`<${tagName}\\b[^>]*>`, 'gi')) || []
  return tags.find((tag) => {
    const match = tag.match(new RegExp(`${attributeName}=["']([^"']+)["']`, 'i'))
    return match?.[1]?.toLowerCase() === attributeValue.toLowerCase()
  }) || null
}

function getAttribute(tag, name) {
  if (!tag) return null
  return tag.match(new RegExp(`${name}=["']([^"']*)["']`, 'i'))?.[1] ?? null
}

function getHtmlForUrl(urlString) {
  const url = new URL(urlString)
  const cleanPath = decodeURIComponent(url.pathname).replace(/^\/+|\/+$/g, '')
  return cleanPath ? path.join(OUT_DIR, ...cleanPath.split('/'), 'index.html') : path.join(OUT_DIR, 'index.html')
}

function walkHtml(dir) {
  if (!fs.existsSync(dir)) return []
  const found = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) found.push(...walkHtml(full))
    else if (entry.isFile() && entry.name === 'index.html') found.push(full)
  }
  return found
}

function isCalculatorPath(pathname) {
  return !fixedNonCalculatorPaths.has(pathname) && !pathname.startsWith('/kategori/')
}

function requireSchemaType(html, schemaType, urlString, label) {
  if (!html.includes(schemaType)) error(`${label} has no ${schemaType} schema: ${urlString}`)
}

if (!fs.existsSync(OUT_DIR)) error('Static export directory "out" is missing.')
else if (!fs.existsSync(SITEMAP_PATH)) error('out/sitemap.xml is missing.')

let sitemapUrls = []
if (errors.length === 0) {
  const sitemap = fs.readFileSync(SITEMAP_PATH, 'utf8')
  sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim())
  if (sitemapUrls.length === 0) error('Sitemap contains no URLs.')

  const duplicateUrls = sitemapUrls.filter((url, index) => sitemapUrls.indexOf(url) !== index)
  for (const url of new Set(duplicateUrls)) error(`Duplicate sitemap URL: ${url}`)

  for (const urlString of sitemapUrls) {
    let url
    try { url = new URL(urlString) } catch { error(`Invalid sitemap URL: ${urlString}`); continue }
    if (url.origin !== EXPECTED_ORIGIN) { error(`Sitemap URL uses wrong origin: ${urlString}`); continue }

    const htmlPath = getHtmlForUrl(urlString)
    if (!fs.existsSync(htmlPath)) { error(`Sitemap URL has no exported HTML: ${urlString}`); continue }

    const html = fs.readFileSync(htmlPath, 'utf8')
    const canonical = getAttribute(extractTag(html, 'link', 'rel', 'canonical'), 'href')
    const robots = (getAttribute(extractTag(html, 'meta', 'name', 'robots'), 'content') || '').toLowerCase()
    const title = html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() || ''
    const description = getAttribute(extractTag(html, 'meta', 'name', 'description'), 'content') || ''

    if (!canonical) error(`Missing canonical: ${urlString}`)
    else if (canonical !== urlString) error(`Canonical mismatch: ${urlString} -> ${canonical}`)
    if (!robots.includes('index') || robots.includes('noindex')) error(`Sitemap URL is not indexable: ${urlString} (${robots || 'robots missing'})`)
    if (!title) error(`Missing title: ${urlString}`)
    if (!description) error(`Missing meta description: ${urlString}`)
    if (description && description.length < 70) warn(`Short meta description (${description.length} chars): ${urlString}`)
    if (title.includes('2025') && !title.includes(CURRENT_YEAR)) warn(`Possibly stale year in title: ${urlString} -> ${title}`)

    if (isCalculatorPath(url.pathname)) {
      requireSchemaType(html, 'WebApplication', urlString, 'Indexable calculator')
      requireSchemaType(html, 'BreadcrumbList', urlString, 'Indexable calculator')
      requireSchemaType(html, 'FAQPage', urlString, 'Indexable calculator')
      if (!html.includes('dateModified')) error(`Indexable calculator has no dateModified schema: ${urlString}`)
    }

    if (url.pathname.startsWith('/kategori/')) {
      requireSchemaType(html, 'CollectionPage', urlString, 'Category hub')
      requireSchemaType(html, 'ItemList', urlString, 'Category hub')
    }
  }

  const sitemapSet = new Set(sitemapUrls)
  const canonicalOwners = new Map()
  for (const htmlPath of walkHtml(OUT_DIR)) {
    const html = fs.readFileSync(htmlPath, 'utf8')
    const canonical = getAttribute(extractTag(html, 'link', 'rel', 'canonical'), 'href')
    const robots = (getAttribute(extractTag(html, 'meta', 'name', 'robots'), 'content') || '').toLowerCase()

    if (canonical?.startsWith(EXPECTED_ORIGIN)) {
      if (canonicalOwners.has(canonical)) error(`Duplicate canonical in exported HTML: ${canonical}`)
      else canonicalOwners.set(canonical, htmlPath)
    }

    const indexable = robots.includes('index') && !robots.includes('noindex')
    if (indexable && canonical?.startsWith(EXPECTED_ORIGIN) && !sitemapSet.has(canonical)) error(`Indexable page is missing from sitemap: ${canonical}`)
  }
}

for (const message of warnings) console.warn(`[SEO warning] ${message}`)
if (errors.length > 0) {
  for (const message of errors) console.error(`[SEO error] ${message}`)
  console.error(`SEO audit failed with ${errors.length} error(s) and ${warnings.length} warning(s).`)
  process.exit(1)
}

console.log(`SEO audit passed: ${sitemapUrls.length} sitemap URLs, ${warnings.length} warning(s).`)
