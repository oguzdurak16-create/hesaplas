// Runtime source of truth for regulation-sensitive calculator defaults.
// Keep values here tied to an explicit period and primary-source URL.
// Calculator part files may contain legacy fallback defaults, but tools.js
// reapplies these values last so the verified configuration wins at runtime.

export const REGULATORY_VERIFIED_AT = '2026-08-14'

export const regulatoryValues = Object.freeze({
  sgk2026: Object.freeze({
    employeeSgkRatePercent: 14,
    employeeUnemploymentRatePercent: 1,
    monthlyPeKCeiling: 297270,
    validFrom: '2026-01-01',
    validTo: '2026-12-31',
    sourceLabel: 'SGK — 2026 prime esas kazanç miktarları',
    sourceUrl: 'https://www.sgk.gov.tr/Content/Post/2e0c9e1a-2cfe-4456-af10-49d3de0c58ba/Prime-Esas-Kazanc-Miktarlari-2026-01-14-10-35-39',
  }),
  severance2026H2: Object.freeze({
    cap: 73729.87,
    validFrom: '2026-07-01',
    validTo: '2026-12-31',
    sourceLabel: 'ÇSGB — 2026 ikinci yarı kıdem tazminatı tavanı',
    sourceUrl: 'https://www.csgb.gov.tr/yayinlar/calisma-hayati-istatistikleri-e-bulteni/temmuz-2026/ucret-ve-sendikal-istatistikler.html',
  }),
  stampTax: Object.freeze({
    ratePercent: 0.759,
    sourceLabel: 'GİB — Damga Vergisi Kanunu ve 71 Seri No.lu Genel Tebliğ',
    sourceUrl: 'https://www.gib.gov.tr/mevzuat/kanun/438/teblig/11858',
  }),
})

export const regulatedToolFieldOverrides = Object.freeze({
  'maas-hesaplama': Object.freeze({
    sgk: Object.freeze({ default: regulatoryValues.sgk2026.employeeSgkRatePercent }),
    unemployment: Object.freeze({ default: regulatoryValues.sgk2026.employeeUnemploymentRatePercent }),
    sgkCeiling: Object.freeze({
      default: regulatoryValues.sgk2026.monthlyPeKCeiling,
      help: '2026 özel sektör aylık prime esas kazanç üst sınırı; doğrulama tarihi 14 Ağustos 2026.',
    }),
    stampRate: Object.freeze({ default: regulatoryValues.stampTax.ratePercent }),
  }),
  'kidem-tazminati': Object.freeze({
    cap: Object.freeze({
      default: regulatoryValues.severance2026H2.cap,
      help: '1 Temmuz–31 Aralık 2026 dönemi resmî tavanı; doğrulama tarihi 14 Ağustos 2026.',
    }),
    stampRate: Object.freeze({ default: regulatoryValues.stampTax.ratePercent }),
  }),
})

export function applyRegulatoryFieldOverrides(tool) {
  const overrides = regulatedToolFieldOverrides[tool.slug]
  if (!overrides) return tool

  tool.fields = tool.fields.map((field) => (
    overrides[field.key] ? { ...field, ...overrides[field.key] } : field
  ))
  return tool
}
