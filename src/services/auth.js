import axios from 'axios';
import environment from '@/config/environment';

const axiosInstance = axios.create({
    baseURL: environment.API_AUTH_URL ,
    headers: {
        'Content-Type': 'application/json',
    },
});


const authService = {
    register: (payload) => axiosInstance.post('/register', payload),
    login: (payload) => axiosInstance.post('/login', payload),
}

export default authService;