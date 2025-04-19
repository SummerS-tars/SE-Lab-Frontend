import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "./user";

export const useNotifyStore = defineStore('Notify',()=>{
    let socket=null;
    let isConnected=false;
    let messageCount=ref(0);
    let error=null;

    const connect=(id)=>{
        if(isConnected)return;
        socket=new WebSocket(`ws://localhost:8080/notify/count/${id}`);

        socket.onopen = () => {
            console.log('websocket connected');
            isConnected=true;
            error=null;
        };

        socket.onmessage = (event) => {
            console.log('Message received:', event.data);
            messageCount.value=JSON.parse(event.data).count;
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
            isConnected=false;
        }
    }

    const clear=()=>{
        messageCount.value=0;
    }

    return { connect,send, messageCount ,disconnect, clear };
})