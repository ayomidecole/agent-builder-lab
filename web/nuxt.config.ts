export default defineNuxtConfig({
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  ssr: true,
  compatibilityDate: '2026-06-20',
  runtimeConfig: {
    public: {
      apiBase:
        process.env.NUXT_PUBLIC_API_BASE ??
        (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '')
    }
  },
  nitro: {
    prerender: {
      routes: ['/']
    }
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    storageKey: 'agent-builder-color-mode'
  },
  ui: {
    fonts: false,
    theme: {
      colors: ['primary', 'neutral', 'success', 'warning', 'error']
    }
  }
});
