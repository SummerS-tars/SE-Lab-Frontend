import axios from 'axios';

const request = axios.create({
    baseURL: '',
    timeout: 80000, 
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',

    },
});
request.defaults.withCredentials = true;


request.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        return Promise.reject(error);
    },
);
export default request