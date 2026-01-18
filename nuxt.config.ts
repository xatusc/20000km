// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  // Compatibility date locks Nuxt behavior to a specific version
  // Update periodically to get latest features and fixes
  // Last updated: January 17, 2026
  compatibilityDate: '2026-01-17',

  modules: [
    '@nuxtjs/i18n',
    '@nuxt/image',
  ],

  // Component auto-import configuration
  components: {
    dirs: [
      { path: '~/components', pathPrefix: false },
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
      },
    },
    build: {
      // Ensure sharp binaries are properly externalized for SSR
      rollupOptions: {
        external: ['sharp'],
      },
    },
    optimizeDeps: {
      exclude: ['sharp'],
    },
  },

  // PostCSS configuration - disable SVGO optimization for data URIs
  postcss: {
    plugins: {
      'cssnano': {
        preset: ['default', {
          svgo: false, // Disable SVGO to prevent data URI parsing errors
        }],
      },
    },
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
  // Automatically optimizes images, creates responsive sizes, and uses modern formats
  image: {
    quality: 80,
    formats: ['webp', 'avif', 'jpg'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
    densities: [1, 2], // For retina displays
    provider: 'ipx', // Built-in image processor
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
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.svg' },
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

  // Netlify deployment (static for Netlify Forms support)
  nitro: {
    preset: 'netlify_static'
  },

  // Enable static site generation
  ssr: true,

  // Generate static routes
  generate: {
    routes: ['/', '/journey', '/planetary-run-club', '/about', '/contact', '/support']
  }
})
