import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:`http://localhost:5000`,
    
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWRmNTZlZDUxODdjMzZhZWEwZmFkMzAiLCJuYW1lIjoibWF5YW5rIiwiaWF0IjoxNzA5MTM1NTk3LCJleHAiOjE3MTE3Mjc1OTd9.CzPN9BaovggYyVw_IPhslWa07LCq7meHiGNyswW6E4U`,
        'Content-Type': 'multipart/form-data',
    }
});

export default axiosInstance;