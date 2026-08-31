import './styles/base.css'
import './styles/layout.css'
import './styles/components.css'
import './styles/responsive.css'
import './styles/hotfix.css'
import './styles/modern.css'
import './styles/premium.css'
import './styles/light-only.css'
import './styles/platform-v7.css'
import './styles/mobile-fit.css'
import Script from 'next/script'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieConsent from '@/components/CookieConsent'
import MobileDock from '@/components/MobileDock'
import ModernWebFeatures from '@/components/ModernWebFeatures'
import AdSlot from '@/components/AdSlot'
import AnalyticsTracker from '@/components/AnalyticsTracker'
import { SITE_NAME, SITE_URL } from '@/lib/seo'

const GA_ID = 'G-BDVJ5W4E3E'
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''
const withBase = (path) => `${BASE_PATH}${path}`
const speculationRules = {
  prerender: [{
    source: 'list',
    urls: ['/tum-araclar/', '/yapay-zeka-token-maliyeti/', '/elektrikli-arac-sarj-maliyeti/', '/gunes-paneli-geri-donus-hesaplama/'].map(withBase),
    eagerness: 'moderate',
  }],
}

export const metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: { default: 'Hesaplas.com - Ücretsiz Online Hesaplama Araçları', template: '%s | Hesaplas.com' },
  description: 'Finans, maaş, vergi, ev, yaşam, sağlık, eğitim ve teknoloji için hızlı ve ücretsiz online hesaplama araçları.',
  verification: { google: 'F7GLVRoGq5iKNUxcXUWmGMmVXqZVgn439DybOGu-ITM' },
  icons: { icon: withBase('/logo-192.png'), shortcut: withBase('/logo-192.png'), apple: withBase('/apple-touch-icon.png') },
  manifest: withBase('/manifest.webmanifest'),
}

export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#ffffff' }

export default function RootLayout({ children }) {
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'tr-TR',
  }
  return (
    <html lang="tr" data-theme="light">
      <head>
        <script id="consent-default" src={withBase('/consent-default.js')} />
        <script
          id="adsense-loader"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4491868887846507"
          crossOrigin="anonymous"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <script type="speculationrules" dangerouslySetInnerHTML={{ __html: JSON.stringify(speculationRules) }} />
      </head>
      <body>
        <Script id="website-schema" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
        <Script id="ga-library" src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script
          id="ga-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};window.gtag('js',new Date());window.gtag('config','${GA_ID}',{anonymize_ip:true,send_page_view:false});`,
          }}
        />
        <AnalyticsTracker gaId={GA_ID} />
        <Header />
        <main>{children}</main>
        <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_CONTENT_SLOT} afterSelector=".calculator-layout" />
        <Footer />
        <CookieConsent />
        <MobileDock />
        <ModernWebFeatures />
      </body>
    </html>
  )
}
