/**
 * WebSocket配置
 * 优先顺序：
 * 1. import.meta.env.VITE_WEBSOCKET_URL (通过Vite注入，只在开发环境使用)
 * 2. 自动检测当前环境构建URL
 */
const getWebSocketUrl = () => {
  // 检查是否是开发环境，且有明确配置的WebSocket URL
  if (import.meta.env.DEV && import.meta.env.VITE_WEBSOCKET_URL) {
    console.log('[WebSocket] 使用开发环境配置:', import.meta.env.VITE_WEBSOCKET_URL);
    return import.meta.env.VITE_WEBSOCKET_URL;
  }
  
  // 生产环境或Docker环境，始终使用相对路径
  // 这样会通过Nginx代理连接到后端，而不是直接连接
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const relativeUrl = `${protocol}//${window.location.host}`;
  console.log('[WebSocket] 使用相对路径配置:', relativeUrl);
  return relativeUrl;
};

export const config = {
  baseUrl: getWebSocketUrl(),
  notifyPath: '/notify/count',
  // 添加日志记录以便调试
  debug: true
};

// ! 调试信息，请勿用于生产环境

// 在控制台显示当前WebSocket URL以便调试
if (config.debug) {
  console.log(`[WebSocket] 最终WebSocket URL: ${config.baseUrl}${config.notifyPath}`);
  console.log('[WebSocket] 当前环境:', import.meta.env.MODE);
  console.log('[WebSocket] 是否生产环境:', import.meta.env.PROD);
  console.log('[WebSocket] 主机名:', window.location.hostname);
}

export default config;
