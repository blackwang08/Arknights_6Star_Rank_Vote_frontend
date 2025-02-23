import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import { viteMockServe } from 'vite-plugin-mock'

// https://vite.dev/config/
export default defineConfig((env) => {
  return {
    define: {
      __DEV__: JSON.stringify(env.command === 'serve'),
    },
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

      viteMockServe({
        mockPath: './src/mocks',
        enable: env.command === 'serve',
      }),
    ],
    resolve: {
      alias: [
        {
          find: '@/',
          replacement: `${resolve(__dirname, 'src')}/`,
        },
      ],
    },
    server: {
      proxy: {
        //   '/new_compare': {
        //     target: 'https://vote.ltsc.vip',
        //     changeOrigin: true,
        //   },
        //   '/save_score': {
        //     target: 'https://vote.ltsc.vip',
        //     changeOrigin: true,
        //   },
        //   '/view_final_order': {
        //     target: 'https://vote.ltsc.vip',
        //     changeOrigin: true,
        //   },
      },
    },
  }
})
