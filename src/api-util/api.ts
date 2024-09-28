import axios, { AxiosError } from 'axios';
import { getLocalStorageItem, showToast } from '../helper/functions';

const axiosInstance = axios.create();

// Request interceptor
axiosInstance.interceptors.request.use((config) => {
  const accessToken = JSON.parse(getLocalStorageItem('user') ?? '').token;

  config.baseURL = import.meta.env.VITE_SERVER_PORT;

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  // @ts-expect-error no use of type check here
  config.headers = headers;

  return config;
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data?.message) {
      showToast(response.data.message, 'success');
    }
    return response;
  },
  async (error) => {
    const { response } = error as AxiosError;

    showToast((response as any).message, 'error');
    return await Promise.reject(response);
  }
);

export default axiosInstance;
