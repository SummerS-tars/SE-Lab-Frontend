// ! 这是调试工具！！！
// ! 请勿在生产环境中使用！！！
// ! 仅用于开发和调试目的，可能会影响性能和安全性。

import { config } from '../config/websocket';

/**
 * WebSocket 连接调试工具
 * @param {Object} options 连接选项
 * @param {boolean} options.autoReconnect 是否自动重连
 * @param {number} options.reconnectInterval 重连间隔(毫秒)
 * @param {number} options.maxReconnectAttempts 最大重连尝试次数
 */
export function debugWebSocketConnection(options = {}) {
  const {
    autoReconnect = true,
    reconnectInterval = 3000,
    maxReconnectAttempts = 5
  } = options;
  
  const wsUrl = `${config.baseUrl}${config.notifyPath}`;
  console.log('[WebSocket Debug] 尝试连接到:', wsUrl);
  
  let ws = new WebSocket(wsUrl);
  let reconnectCount = 0;
  let reconnectTimer = null;
  
  ws.onopen = () => {
    console.log('[WebSocket Debug] 连接成功!');
    reconnectCount = 0; // 重置重连计数
  };
  
  ws.onclose = (event) => {
    console.log('[WebSocket Debug] 连接关闭:', event);
    
    if (autoReconnect && reconnectCount < maxReconnectAttempts) {
      console.log(`[WebSocket Debug] 将在 ${reconnectInterval/1000} 秒后尝试重连...`);
      reconnectTimer = setTimeout(() => {
        reconnectCount++;
        console.log(`[WebSocket Debug] 尝试重连 (${reconnectCount}/${maxReconnectAttempts})...`);
        ws = debugWebSocketConnection(options);
      }, reconnectInterval);
    }
  };
  
  ws.onerror = (error) => {
    console.error('[WebSocket Debug] 连接错误:', error);
  };
  
  ws.onmessage = (message) => {
    console.log('[WebSocket Debug] 收到消息:', message.data);
    try {
      const data = JSON.parse(message.data);
      console.log('[WebSocket Debug] 解析后的消息数据:', data);
    } catch (e) {
      // 如果消息不是JSON格式，保持原样显示
    }
  };
  
  // 返回增强的WebSocket对象，添加清理方法
  const enhancedWs = ws;
  enhancedWs.cleanup = () => {
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
    }
    ws.close();
  };
  
  return enhancedWs;
}

// 在浏览器控制台中公开调试函数
if (typeof window !== 'undefined') {
  window.debugWebSocket = debugWebSocketConnection;
}