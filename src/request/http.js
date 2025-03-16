import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { ElMessage } from 'element-plus';

const request = axios.create({
    baseURL: '',
    timeout: 80000, 
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',

    },
});
request.defaults.withCredentials = true;

request.interceptors.request.use(
    config =>{
        const token= useUserStore().token;
        if(token)config.headers['Authorization']=`Bearer ${token}`;
        return config;
    },
    error =>{
        return Promise.reject(error);
    }
)

request.interceptors.response.use(
    response => {
        return response.data.data;
    },
    error => {
        console.log(error.response);
        ElMessage.error(error)
        // if(error.response.status==='401'){
        //     useUserStore().logout();
        //     window.location.reload();
        // }
        return Promise.reject(error);
    },
);
export default request;