import vue from '@vitejs/plugin-vue';
// 自动导入组件
import Components from 'unplugin-vue-components/vite';
// 自动导入插件
import AutoImport from 'unplugin-auto-import/vite';
// UI框架按需加载
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
// 打包分析
// 压缩文件
import VitePluginCompression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';
import { VitePWA } from 'vite-plugin-pwa';
import eslintPlugin from 'vite-plugin-eslint';
// 按需导入样式
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import';
import UnoCSS from 'unocss/vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
export default [
  vueJsx(),
  eslintPlugin({
    include: ['src/'],
  }),
  UnoCSS(),
  vue(),
  visualizer({ open: true }),
  createStyleImportPlugin({
    resolves: [ElementPlusResolve()],
    libs: [
      {
        libraryName: 'element-plus',
        esModule: true,
        resolveStyle(name: string) {
          return `element-plus/theme-chalk/${name}.css`;
        }
      }
    ]
  }),
  Components({
    dirs: './src/components/',
    resolvers: [ElementPlusResolver()]
  }),
  AutoImport({
    dirs: ['./src/utils/', './src/store/*'],
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue$/,
      /\.vue\?vue/, // .vue
      /\.md$/ // .md
    ],
    imports: [
      'vue',
      'pinia',
      '@vueuse/core',
      {
        pinia: ['createPinia', 'PiniaVuePlugin', 'defineStore'],
        axios: [
          // default imports
          ['default', 'axios'] // import { default as axios } from 'axios',
        ],
        'vue-router': [
          'createRouter',
          'createWebHistory',
          'useRoute', 'createWebHashHistory',
          'useRouter'
        ]
      }
    ],
    resolvers: [ElementPlusResolver()]
  }),

  VitePluginCompression({
    deleteOriginFile: false,
    threshold: 10240,
    algorithm: 'gzip',
    ext: '.gz',
  }),
  VitePWA(),
];
