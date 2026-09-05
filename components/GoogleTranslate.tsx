'use client';

import Script from 'next/script';

export function GoogleTranslate() {
  return (
    <>
      <div id="google_translate_element" style={{ display: 'none', position: 'absolute', top: -9999, left: -9999 }} />
      <Script
        id="google-translate-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.googleTranslateElementInit = function() {
              if (window.google && window.google.translate) {
                new window.google.translate.TranslateElement({
                  pageLanguage: 'en',
                  includedLanguages: 'en,de,es,fr,zh-CN,it,ja,ar',
                  autoDisplay: false
                }, 'google_translate_element');
              }
            };
          `,
        }}
      />
      <Script
        id="google-translate-script"
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </>
  );
}
