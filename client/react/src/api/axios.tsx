import axios from 'axios';
import { api_URL } from '../constantx';

export const axiosInstance = axios.create({
    baseURL: api_URL,
    headers: {
        'Content-type': 'application/json'
    },
    withCredentials: true
});

axiosInstance.interceptors.request.use((config) => {
    const idToken = getIdToken();
    if (idToken) {
      config.headers['Authorization'] = `Bearer ${idToken}`;
    }
    return config;
});

const getIdToken = () => {
    const idToken = localStorage.getItem('idToken');
    if(!idToken) {
        console.log('there is no id token');
    }
    return idToken;
}

// Add an interceptor to handle token expiration and request a new token
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response.status === 401 &&
        !originalRequest._retry &&
        localStorage.getItem('refreshToken')
      ) {
        originalRequest._retry = true;
  
        try {
          const response = await axios.post('/token/refresh', {
            refreshToken: localStorage.getItem('refreshToken'),
          });
  
          // Update the tokens in storage
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('refreshToken', response.data.refreshToken);
  
          // Retry the original request with the new token
          originalRequest.headers['Authorization'] = `Bearer ${response.data.idToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // Handle refresh token error
          console.error(refreshError);
          // Redirect to login page or perform necessary actions
        }
      }
      return Promise.reject(error);
    }
);
