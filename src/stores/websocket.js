import { defineStore } from "pinia";

export const useWebSocketStore = defineStore('websocket',()=>{
    let socket=null;
    let isConnected=false;
    let messages=[];
    let error=null;

    const connect=(url)=>{
        if(isConnected)return;
        socket=new WebSocket(url);

        socket.onopen = () => {
            console.log('websocket connected');
            isConnected=true;
            error=null;
        };

        socket.onmessage = (event) => {
            console.log('Message received:', event.data);
            messages.push(event.data); // 将消息添加到消息列表
        };

        socket.onerror = (msg) => {
            console.error('WebSocket error:', msg);
            error = msg;
        };

        socket.onclose = () => {
            console.log('WebSocket disconnected');
            isConnected = false;
            socket = null;
        };
    }

    const send=(message)=> {
        if (!isConnected) {
          console.error('WebSocket is not connected');
          return;
        }
        socket.send(message);
    }
  
    const disconnect=()=> {
        if (socket) {
            socket.close();
        }
    }

    const clear=()=>{
        messages.clear()
    }

    return { connect,send, disconnect, clear };
})