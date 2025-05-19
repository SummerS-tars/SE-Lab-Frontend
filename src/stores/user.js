import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useNotifyStore } from './notify';
import { ElMessage } from 'element-plus';

const jwtparse = (token) => {
    const parts =token.split('.');

    const payloadBase64Url = parts[1];
    const payloadBase64 = payloadBase64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payloadJson = decodeURIComponent(atob(payloadBase64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const payload = JSON.parse(payloadJson);
    return payload;
}

export const useUserStore = defineStore('user',() => {
    const token = () => localStorage.getItem('user-tn');
    const isLogin = () => {
        if(!!token()){
            if(isTimeout()){
                ElMessage.error('登录超时，请重新登录');
                delToken();
                return false;
            }
            return true;
        }
        return false;
    }
    const username = computed(() => {
        return jwtparse(token()).sub;
    });
    const id = computed(() => {
        return jwtparse(token()).id;
    });
    const isadmin = computed(() => {
        return jwtparse(token()).roles[0].authority==='ROLE_ADMIN';
    });
    const isTimeout = () => {
        return jwtparse(token()).exp<Date.now()/1000;
    }
    const login = (user_tn) => {
        localStorage.setItem('user-tn',user_tn);
        useNotifyStore().connect(id.value);
    };
    const delToken = () => {
        localStorage.removeItem('user-tn');
    };

    const logout = () => {
        delToken();
    };

    if(isLogin()){
        if(isTimeout())delToken();
        useNotifyStore().connect(id.value);
    }

    return {token,isLogin,username,id,isadmin,login,logout};
});
