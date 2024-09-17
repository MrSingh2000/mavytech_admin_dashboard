import axios, { AxiosError } from 'axios';
import { getLocalStorageItem, showToast } from '../helper/functions';

const axiosInstance = axios.create();

// Request interceptor
axiosInstance.interceptors.request.use((config) => {
  // const accessToken = getLocalStorageItem('authToken');
  const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmUxZDA1MjQxNGZlNjViM2I3NWViMGIiLCJuYW1lIjoiZGVtbyBuYW1lIiwiZW1haWwiOiJkZW1vMUBnbWFpbC5jb20iLCJkb2IiOiIxMDAwMSA3Nzg4IiwicGhvbmUiOiIyMTMyMzIxMzIzMiIsImltYWdlVXJsIjoiIiwicm9sZSI6InVzZXIiLCJjcmVhdGVkQXQiOiIyMDI0LTA5LTExVDE3OjE2OjAyLjYwNVoiLCJ1cGRhdGVkQXQiOiIyMDI0LTA5LTExVDE3OjE2OjAyLjYwNVoiLCJfX3YiOjAsImlhdCI6MTcyNjE0OTM5MiwiZXhwIjoxNzI4NzQxMzkyfQ.1pkkISmfTRE1aY7Zjyzl2lO_ZwCDOYeOdM6fROrpQFU';

  config.baseURL = 'http://192.168.1.33:5000';
  
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