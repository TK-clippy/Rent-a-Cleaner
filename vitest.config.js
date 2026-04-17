import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom', // Omogućava testiranje Vue komponenti kao da su u browseru
    globals: true, // Da ne moramo importirati describe/it/expect u svakom fileu
  },
  resolve: {
    alias: {
      'src': fileURLToPath(new URL('./src', import.meta.url)) // Da rade importi poput 'src/components/...'
    }
  }
})
