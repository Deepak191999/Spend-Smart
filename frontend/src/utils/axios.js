import axios from "axios";

const instance = axios.create({
    baseURL: 'https://spend-smart-backend.vercel.app'
    // withCredentials: true
});


export default instance;