import { useUserStore } from "@/stores/user";
import axios from "axios";


const upload = axios.create({
    baseURL: '',
})

upload.interceptors.request.use(
    config =>{
        const token= useUserStore().token();
        if(token){
            config.headers.Authorization=`Bearer ${token}`;
        }
        return config;
    },
    error =>{
        return Promise.reject(error);
    }
)

upload.interceptors.response.use(
    response => {
        console.log(response.data);
        return response.data.data;
    },
    error => {
        return Promise.reject(error);
    },
);

const uploadFile = (url,file) =>{
    let formData = new FormData();
    formData.append('file', file);
    return upload({
        url: url,
        method: 'post',
        data: formData
    });
}

export {uploadFile};