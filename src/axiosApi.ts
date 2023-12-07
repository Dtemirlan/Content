import axios from 'axios';

const baseURL = 'https://dzhaparov-temirlan-js20-default-rtdb.europe-west1.firebasedatabase.app/';

const axiosInstance = axios.create({
    baseURL,
});

export default axiosInstance;
