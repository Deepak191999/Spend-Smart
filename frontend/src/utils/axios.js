import axios from "axios";

const instance = axios.create({
    baseURL: 'https://spend-smart-te5l.onrender.com'
    // baseURL: 'http://localhost:4444'
    // withCredentials: true
});


export default instance;