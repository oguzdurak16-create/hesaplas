// Search-quality focus: every calculator stays usable, while only the
// strongest reviewed pages are exposed to search engines for now.
export const INDEXABLE_TOOL_SLUGS = new Set([
  'kredi-karti-borc',
  'kredi-yapilandirma-hesaplama',
  'kredi-hesaplama',
  'maas-hesaplama',
  'vergi-hesaplama',
  'kidem-tazminati',
  'emeklilik-hesaplama',
  'yapay-zeka-token-maliyeti',
  'elektrikli-arac-sarj-maliyeti',
  'gunes-paneli-geri-donus-hesaplama',
]);

export function isIndexableTool(slug) {
  return INDEXABLE_TOOL_SLUGS.has(slug);
}
