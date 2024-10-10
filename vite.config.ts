import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ['word', 'section', 'line', 'period'].includes(tag),
        },
      },
    }),
  ],
  server: {
    port: 5174,
    hmr: false,
  },
})
