import axios, { AxiosError } from 'axios';
import { getLocalStorageItem, showToast } from '../helper/functions';

const axiosInstance = axios.create();

// Request interceptor
axiosInstance.interceptors.request.use((config) => {
  const accessToken = getLocalStorageItem('authToken');
  // const accessToken =
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmVkZTZkNzk0OTRiZjdkN2U2ZGRiOWYiLCJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImRvYiI6IjEwLTEwLTIwMDAiLCJwaG9uZSI6IjE5MjkyOTI5MjkiLCJpbWFnZVVybCI6IiIsInJvbGUiOiJhZG1pbiIsImNvdW50cnkiOiJJbmRpYSIsInN0YXRlIjoiSGFyeWFuYSIsImpvYkFwcGxpY2F0aW9ucyI6W10sImNyZWF0ZWRBdCI6IjIwMjQtMDktMjBUMjE6MTk6MTkuMjM0WiIsInVwZGF0ZWRBdCI6IjIwMjQtMDktMjBUMjE6MTk6MTkuMjM0WiIsIl9fdiI6MCwiaWF0IjoxNzI2OTA3MjQ5LCJleHAiOjE3Mjk0OTkyNDl9.zWtlS4UC66CycaA_SpLl029DExxjlUpJr8_RytrjH7g';

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
