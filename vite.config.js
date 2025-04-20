import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    /** 设置 host: true 才可以使用 Network 的形式，以 IP 访问项目 */
    host: true,
    allowedHosts: true,
    /** 端口号 */
    port: 3001,
    /** 是否自动打开浏览器 */
    // open: false,
    /** 跨域设置允许 */
    cors: true,
    /** 端口被占用时，是否直接退出 */
    strictPort: false,
    /** 接口代理 */
    proxy: {
        '/api': {
            target: 'http://localhost:8080',
            changeOrigin: true
        },
        '/notify': {
            target: 'ws://localhost:8080',
            changeOrigin: true,
            ws: true
        }
    },
  },
  // 开发环境变量配置
  define: {
    'import.meta.env.VITE_WEBSOCKET_URL': JSON.stringify(process.env.VITE_WEBSOCKET_URL || 'ws://localhost:8080')
  }
});
