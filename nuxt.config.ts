// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2025-01-16',

  modules: [
    '@nuxtjs/i18n',
    '@nuxt/image',
  ],

  // Component auto-import configuration
  components: {
    dirs: [
      { path: '~/components/global', pathPrefix: false },
      { path: '~/components/home', pathPrefix: false },
      { path: '~/components/map', pathPrefix: false },
      { path: '~/components/ui', pathPrefix: false },
    ]
  },

  // SCSS Configuration
  css: ['~/assets/scss/main.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/_variables" as *;'
        }
      }
    }
  },

  // i18n Configuration (English only initially, ready for expansion)
  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.json',
        dir: 'ltr'
      },
      // Future languages:
      // { code: 'ru', name: 'Русский', file: 'ru.json', dir: 'ltr' },
      // { code: 'zh', name: '中文', file: 'zh.json', dir: 'ltr' },
      // { code: 'tr', name: 'Türkçe', file: 'tr.json', dir: 'ltr' },
      // { code: 'ar', name: 'العربية', file: 'ar.json', dir: 'rtl' },
    ],
    defaultLocale: 'en',
    lazy: false,
    langDir: 'locales',
    strategy: 'prefix_except_default',
    bundle: {
      optimizeTranslationDirective: false
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      redirectOn: 'root',
    },
  },

  // Image optimization
  image: {
    quality: 80,
    formats: ['webp', 'avif', 'jpg'],
  },

  // App head configuration
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: '20,000KM | Planetary Neighborhood Run',
      meta: [
        { name: 'description', content: 'One woman. 20,000 kilometers. Vladivostok to Lisbon. A Planetary Neighborhood Run.' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Noto+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap'
        },
      ],
      script: [
        { src: 'https://t.contentsquare.net/uxa/fb2e8ed854e38.js', async: true }
      ]
    },
  },

  // Netlify deployment
  nitro: {
    preset: 'netlify'
  },

  // Generate static routes
  generate: {
    routes: ['/', '/live-updates', '/planetary-run-club', '/about', '/contact']
  }
})
