import axios from "axios";

const instance = axios.create({
    baseURL: 'https://spend-smart-backend-zcr7.onrender.com'
    // baseURL: 'http://localhost:4444'
    // withCredentials: true
});


export default instance;