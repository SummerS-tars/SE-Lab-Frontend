import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const jwtparse = (token)=>{
    const parts =token.split('.');

    const payloadBase64Url = parts[1];
    const payloadBase64 = payloadBase64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payloadJson = decodeURIComponent(atob(payloadBase64).split('').map((c)=>{
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const payload = JSON.parse(payloadJson);
    return payload;
}

export const useUserStore = defineStore('user',()=>{
    const token = computed(() => localStorage.getItem('user-tn'));
    const username = computed(() => {
        return jwtparse(token.value).sub;
    });
    const id = computed(()=>{
        return jwtparse(token.value).id;
    });
    const isadmin = computed(()=>{
        return jwtparse(token.value).roles[0].authority==='ROLE_ADMIN';
    });
    const setToken = (user_tn) => {
        localStorage.setItem('user-tn',user_tn);
    };
    const delToken = () => {
        localStorage.removeItem('user-tn');
    };

    const logout = () => {
        delToken();
    };

    return {token,username,id,isadmin,setToken,delToken,logout};
});
