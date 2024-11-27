// src/api/apiClient.js
import axios from 'axios';
import { toast } from 'sonner';

const apiClient = axios.create({
  baseURL: process.env.BASE_URL || 'https://api.toolix.app/api', // آدرس پایه API
  timeout: 20000, // زمان انتظار درخواست‌ها
  headers: {
    'Content-Type': 'application/json',
  },
});

// افزودن یک اینترسپتور برای مدیریت توکن (در صورت نیاز)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // یا هر مکان دیگری که توکن را ذخیره می‌کنی
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response, // اگر درخواست موفق بود، پاسخ را برگردان
  (error) => {
    if (error.response && error.response.status === 500) {
      console.log(error.response);
      toast.error(error.response.data.detail)
    }
    if (error.response && error.response.status === 400) {
      toast.error(error.response.data.detail)
    }
    if (error.response && error.response.status === 403) {
      console.error('Error 403: Access forbidden. Redirecting to login...');
      // مثلا کاربر را به صفحه لاگین هدایت کن
    
    }
    return Promise.reject(error); // خطا را به درخواست‌کننده برگردان
  }
);

export default apiClient;