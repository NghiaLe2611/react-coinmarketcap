import axios from 'axios';

// axios.defaults.withCredentials = true; 

const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
        'Content-Type': 'application/json',
	}
});

// Add a request interceptor
axiosClient.interceptors.request.use(async (config) => {
    return config;
});

export default axiosClient;
