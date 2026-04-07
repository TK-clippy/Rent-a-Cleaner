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
    // app boot file (/src/boot)
    boot: ['i18n', 'axios'],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-file#css
    css: ['app.scss'],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: ['roboto-font', 'material-icons'],

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-file#build
    build: {
      target: {
        browser: 'baseline-widely-available',
        node: 'node22',
      },

      env: {
        APP_MODE: process.env.APP_MODE || 'client',
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
      config: {},
      plugins: ['Notify',],
    },

    animations: [],

    // https://v2.quasar.dev/quasar-cli-vite/developing-ssr/configuring-ssr
    ssr: {
      prodPort: 3000,
      middlewares: ['render'],
      pwa: false,
    },

    // https://v2.quasar.dev/quasar-cli-vite/developing-pwa/configuring-pwa
    pwa: {
      workboxMode: 'GenerateSW',
    },

    cordova: {},

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true,
      // --- Dinamički ID za odvojene APK datoteke ---
      appId:
        process.env.APP_MODE === 'cleaner' ? 'com.rentacleaner.cleaner' : 'com.rentacleaner.client',
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/configuring-electron
    electron: {
      preloadScripts: ['electron-preload'],
      inspectPort: 5858,
      bundler: 'packager',
      packager: {},
      builder: {
        appId: 'rent-a-cleaner',
      },
    },

    bex: {
      extraScripts: [],
    },
  }
})
