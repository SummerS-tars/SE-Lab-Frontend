/**
 * WebSocket配置
 * 优先顺序：
 * 1. import.meta.env.VITE_WEBSOCKET_URL (通过Vite注入)
 * 2. 自动检测当前环境构建URL
 */
const getWebSocketUrl = () => {
  // 如果有通过环境变量定义的WebSocket URL，优先使用
  if (import.meta.env.VITE_WEBSOCKET_URL) {
    return import.meta.env.VITE_WEBSOCKET_URL;
  }
  
  // 否则根据当前环境动态构建
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const host = import.meta.env.PROD ? window.location.host : 'localhost:8080';
  
  return `${protocol}//${host}`;
};

export const config = {
  baseUrl: getWebSocketUrl(),
  notifyPath: '/notify/count'
};

export default config;
