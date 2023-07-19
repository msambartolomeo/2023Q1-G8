import axios from 'axios';
import { api_URL, doctorPool_tokenEndpoint, pacientPool_tokenEndpoint, pacientUserPool_id } from '../constantx';
import { accessTokenInfo, idTokenInfo } from '../components/CallBack';
import jwt_decode from 'jwt-decode';

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
  if (!idToken) {
    console.log('there is no id token');
  }
  return idToken;
}
const extractUPID = (id_token: string) => {
  var decodedToken = jwt_decode(id_token) as idTokenInfo;
  const parts = decodedToken.iss.split("/");
  const userPoolId = parts[parts.length - 1];
  return userPoolId;
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
        const userPoolId = extractUPID(localStorage.getItem('idToken')!);
        const access_token = localStorage.getItem('accessToken');
        const tokenInfo = jwt_decode(access_token!) as accessTokenInfo;
        const client_id = tokenInfo.client_id;
        const tokenEndpoint = userPoolId === pacientUserPool_id ? pacientPool_tokenEndpoint : doctorPool_tokenEndpoint;
        const response = await axios.post(tokenEndpoint,
          new URLSearchParams(
            {
              grant_type: 'refresh_token',
              client_id: client_id,
              refresh_token: localStorage.getItem('refreshToken')!
            }
          ).toString(),
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });

        // Update the tokens in storage

        localStorage.setItem('accessToken', response.data.access_token);
        localStorage.setItem('idToken', response.data.id_token)
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
