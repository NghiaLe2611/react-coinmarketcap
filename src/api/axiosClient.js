import axios from 'axios';
import queryString from 'query-string';

// axios.defaults.withCredentials = true; 

const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
        'Content-Type': 'application/json',
	},
	paramsSerializer: (params) => queryString.stringify(params)
});

// Add a request interceptor
axiosClient.interceptors.request.use(async (config) => {
    return config;
});

export default axiosClient;
