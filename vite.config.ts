import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      include: [
        /\.[tj]sx?$/,
        /\.vue$/,
      ],
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        {
          pinia: [
            'defineStore',
            'storeToRefs',
          ],
        },
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: [
        './src/constants/**',
        './src/composables/**',
        './src/store/**',
        './src/shared/**',
        // {
        //   glob: './src/shared/**',
        //   types: false,
        // },
        {
          glob: './src/types',
          types: true,
        },
      ],
      vueTemplate: true,
      dumpUnimportItems: true,
      viteOptimizeDeps: true,
    }),

    Components({
      dts: 'src/components.d.ts',
    }),

    Inspect(),
  ],
  resolve: {
    alias: [
      { find: '@/', replacement: `${resolve(__dirname, 'src')}/`,
      },
    ],
  },
})
