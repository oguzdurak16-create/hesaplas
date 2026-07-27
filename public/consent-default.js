window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function gtag(){ window.dataLayer.push(arguments); };
var analytics = 'denied';
var ads = 'denied';
try {
  var saved = JSON.parse(localStorage.getItem('hesaplas_cookie_consent_v3') || 'null');
  analytics = saved && saved.analytics ? 'granted' : 'denied';
  ads = saved && saved.ads ? 'granted' : 'denied';
} catch (error) {}
window.gtag('consent', 'default', {
  analytics_storage: analytics,
  ad_storage: ads,
  ad_user_data: ads,
  ad_personalization: ads,
  functionality_storage: 'granted',
  security_storage: 'granted',
  wait_for_update: 500
});
window.gtag('set', 'ads_data_redaction', true);
window.gtag('set', 'url_passthrough', true);
