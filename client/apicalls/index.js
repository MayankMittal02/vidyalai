import axios from 'axios';

const axiosInstance = axios.create({
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
    }
});

export default axiosInstance;