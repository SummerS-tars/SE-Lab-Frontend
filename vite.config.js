import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';
  
  return {
    plugins: [
      vue(),
      vueJsx(),
      isDev ? vueDevTools() : null,
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: true,
      allowedHosts: true,
      port: 3001,
      cors: true,
      strictPort: false,
      proxy: {
          '/api': {
              // target: 'http://120.46.150.163:18080',
              target: 'http://127.0.0.1:4523/m1/5923172-5610251-default',
              changeOrigin: true
          },
          '/notify': {
              target: 'ws://120.46.150.163:18080',
              // target: 'ws://localhost:8080',
              changeOrigin: true,
              ws: true
          }
      },
    },
    // 环境变量配置 - 只在开发模式下设置WebSocket URL
    define: isDev 
      ? {'import.meta.env.VITE_WEBSOCKET_URL': JSON.stringify('ws://120.46.150.163:18080')}
      : {'import.meta.env.VITE_WEBSOCKET_URL': JSON.stringify('')}
  };
});
