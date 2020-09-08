import axios from 'axios';

// const token = localStorage.getItem('token');
// console.log(token.access_token)
// axios.defaults.headers.common['Authorization'] = token ? token.access_token:'';


const ax = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
});

ax.interceptors.request.use(function (config) {     // Перехватчик axios
    // Do something before request is sent
    const token = localStorage.getItem('token');
    if(token){
        config.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export default ax;
