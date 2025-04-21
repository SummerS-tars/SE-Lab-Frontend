/**
 * WebSocket配置
 * 优先顺序：
 * 1. import.meta.env.VITE_WEBSOCKET_URL (通过Vite注入，只在开发环境使用)
 * 2. 自动检测当前环境构建URL
 */
const getWebSocketUrl = () => {
  // 检查是否是开发环境，且有明确配置的WebSocket URL
  if (import.meta.env.DEV && import.meta.env.VITE_WEBSOCKET_URL) {
    return import.meta.env.VITE_WEBSOCKET_URL;
  }
  
  // 生产环境或Docker环境，始终使用相对路径
  // 这样会通过Nginx代理连接到后端，而不是直接连接
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${protocol}//${window.location.host}`;
};

export const config = {
  baseUrl: getWebSocketUrl(),
  notifyPath: '/notify/count',
  // 生产环境中禁用调试
  debug: import.meta.env.DEV
};

export default config;
