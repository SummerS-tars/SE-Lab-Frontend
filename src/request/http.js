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
        const token= useUserStore().token();
        if(token) {
            config.headers.Authorization=`Bearer ${token}`;
        }
        return config;
    },
    error =>{
        return Promise.reject(error);
    }
);

request.interceptors.response.use(
    response => {
        return response.data.data;
    },
    error => {
        ElMessage.error(error.response.data.message);
        return Promise.reject(error);
    },
);
export default request;