import './styles/base.css'
import './styles/layout.css'
import './styles/components.css'
import './styles/responsive.css'
import Script from 'next/script'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieConsent from '@/components/CookieConsent'
import MobileDock from '@/components/MobileDock'
import { SITE_NAME, SITE_URL } from '@/lib/seo'

const GA_ID = 'G-BDVJ5W4E3E'
const COOKIE_KEY = 'hesaplas_cookie_consent_v3'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: { default: 'Hesaplas.com - Ücretsiz Online Hesaplama Araçları', template: '%s | Hesaplas.com' },
  description: 'Finans, maaş, vergi, ev, yaşam, sağlık, eğitim ve günlük ihtiyaçlar için hızlı ve ücretsiz online hesaplama araçları.',
  verification: { google: 'F7GLVRoGq5iKNUxcXUWmGMmVXqZVgn439DybOGu-ITM' },
  icons: { icon: '/logo-192.png', shortcut: '/logo-192.png', apple: '/apple-touch-icon.png' },
  manifest: '/manifest.webmanifest',
}

export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#2563eb' }

export default function RootLayout({ children }) {
  const website = {
    '@context': 'https://schema.org', '@type': 'WebSite', name: SITE_NAME, url: SITE_URL, inLanguage: 'tr-TR',
    potentialAction: { '@type': 'SearchAction', target: `${SITE_URL}/tum-araclar/?q={search_term_string}`, 'query-input': 'required name=search_term_string' },
  }
  return (
    <html lang="tr">
      <body>
        <Script id="theme-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('hesaplas_theme_v1');if(!t)t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t}catch(e){}` }} />
        <Script id="website-schema" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
        <Script id="consent-default" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)}
          window.gtag = window.gtag || gtag;
          var a='denied', d='denied';
          try { var c=JSON.parse(localStorage.getItem('${COOKIE_KEY}')||'null'); a=c&&c.analytics?'granted':'denied'; d=c&&c.ads?'granted':'denied'; } catch(e){}
          gtag('consent','default',{analytics_storage:a,ad_storage:d,ad_user_data:d,ad_personalization:d,wait_for_update:500});
        ` }} />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="ga-config" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});` }} />
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
        <MobileDock />
      </body>
    </html>
  )
}
