import { toast } from 'react-toastify';
import noImage from '../assets/noImage.png';

export const getLocalStorageItem = (item: string): string | null => {
  return localStorage.getItem(item);
};

export const setLocalStorageItem = (item: string, value: string): void => {
  localStorage.setItem(item, value);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};

export const showToast = (
  message: string,
  type: 'error' | 'warn' | 'success' | 'info'
) => {
  switch (type) {
    case 'error':
      toast.error(message);
      break;

    case 'warn':
      toast.warn(message);
      break;

    case 'success':
      toast.success(message);
      break;

    case 'info':
      toast.info(message);
      break;

    default:
      break;
  }
};

export const createUrl = (baseUrl: string): string => {
  if (!baseUrl) return noImage;
  if (baseUrl.includes('http')) return baseUrl;
  return `${import.meta.env.VITE_SERVER_PORT}/api${baseUrl}`;
};

export const fetchLearningThumbnail = (id: string): string => {
  if (!id) return '';

  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
};
