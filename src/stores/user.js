import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('token',()=>{
    const token = computed(() => localStorage.getItem('token'));
    const username = computed(() => localStorage.getItem('userInfo.username'));

    const setUsername = (username) =>{
        localStorage.setItem('userInfo.username',username);
    }
    const setToken = (token) => {
        localStorage.setItem('token',token);
    };
    const delToken = () => {
        localStorage.removeItem('token');
    };

    const logout = () => {
        delToken();
        localStorage.removeItem('userInfo');
    };

    return {token,username,setToken,delToken,logout,setUsername};
});
