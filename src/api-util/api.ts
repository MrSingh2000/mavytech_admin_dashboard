import axios, { AxiosError, AxiosHeaders } from 'axios';
import { getLocalStorageItem, showToast } from '../helper/functions';
import endpoints from './endpoints';

const axiosInstance = axios.create();

// Request interceptor
axiosInstance.interceptors.request.use((config: any) => {
  const localUser = getLocalStorageItem('user');
  const accessToken = localUser ? JSON.parse(localUser).token : null;

  config.baseURL = import.meta.env.VITE_SERVER_PORT;

  const excludedEndpoints = [endpoints.auth.login];

  if (!excludedEndpoints.includes(config.url || '')) {
    // Add Authorization header if the endpoint is not excluded
    if (accessToken) {
      config.headers = {
        ...(config.headers as AxiosHeaders),
        Authorization: `Bearer ${accessToken}`,
        'Cache-Control': 'no-cache',
      };
    }
  }

  return config;
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    if (response?.data?.message) {
      showToast(response.data.message, 'success');
    }
    return response;
  },
  async (error) => {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      // Error response from the server
      const errorMessage =
        (axiosError.response.data as any)?.message || 'An error occurred';
      showToast(errorMessage, 'error');
    } else if (axiosError.request) {
      // No response received from the server
      showToast('No response from the server', 'error');
    } else {
      // Error in setting up the request
      showToast(axiosError.message || 'Request setup error', 'error');
    }
    return await Promise.reject(axiosError.response);
  }
);

export default axiosInstance;
