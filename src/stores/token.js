import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTokenStore = defineStore('token',()=>{
    const token = computed(() => localStorage.getItem('token')?localStorage.getItem('token'):'');
    const setToken = (token) => {
        localStorage.setItem('token',token);
    };
    const delToken = () => {
        localStorage.removeItem('token');
    };
    return {token,setToken,delToken};
});
