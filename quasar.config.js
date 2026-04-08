// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-file

import { defineConfig } from '#q-app/wrappers'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import path from 'node:path'

// Učitavamo specifičnu .env datoteku na temelju BUILD_TARGET varijable iz terminala
dotenv.config({
  path: path.resolve(process.cwd(), `.env.${process.env.BUILD_TARGET || 'client'}`),
})
// ------------------------------------
export default defineConfig((ctx) => {
  return {
    boot: ['i18n', 'axios'],

    css: ['app.scss'],

    extras: ['roboto-font', 'material-icons'],
    bin: {
      linuxAndroidStudio: '/var/lib/flatpak/exports/bin/com.google.AndroidStudio'
    },

    build: {
      target: {
        browser: 'baseline-widely-available',
        node: 'node22',
      },

      // Osiguravamo da su i APP_MODE i BUILD_TARGET sinkronizirani
      env: {
        APP_MODE: process.env.BUILD_TARGET || 'client',
        BUILD_TARGET: process.env.BUILD_TARGET || 'client',
      },

      vueRouterMode: 'hash',

      vitePlugins: [
        [
          '@intlify/unplugin-vue-i18n/vite',
          {
            ssr: ctx.modeName === 'ssr',
            include: [fileURLToPath(new URL('./src/i18n', import.meta.url))],
          },
        ],
      ],
    },

    devServer: {
      open: true,
    },

    framework: {
      plugins: [
        'Notify',
        'Dialog',
        'LocalStorage'
      ],
      config: {
        notify: { /* opcije */ },
        brand: {
          // Dinamički mijenjamo primarnu boju ovisno o buildu radi lakšeg prepoznavanja
          primary: process.env.BUILD_TARGET === 'admin' ? '#1D1D1D' : '#1976D2',
          secondary: '#26A69A',
          accent: '#9C27B0',
          dark: '#1D1D1D',
          positive: '#21BA45',
          negative: '#C10015',
          info: '#31CCEC',
          warning: '#F2C037'
        }
      }
    },

    // ... SSR i PWA ostaju isti ...

    capacitor: {
      hideSplashscreen: true,
      // Dinamički ID za tri različite mobilne aplikacije (ako zatreba)
      appId: (function () {
        if (process.env.BUILD_TARGET === 'admin') return 'com.rentacleaner.admin';
        if (process.env.BUILD_TARGET === 'cleaner') return 'com.rentacleaner.cleaner';
        return 'com.rentacleaner.client';
      })(),
    },

    electron: {
      builder: {
        appId: `rent-a-cleaner-${process.env.BUILD_TARGET || 'client'}`,
      },
    },

    bex: {
      extraScripts: [],
    },
  }
})
