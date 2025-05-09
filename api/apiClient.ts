// src/api/apiClient.js
import { getLocale } from "@/core/i18n/locale";
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.BASE_URL || "https://api.the-ai.studio/", // آدرس پایه API
  timeout: 30000, // زمان انتظار درخواست‌ها
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// افزودن یک اینترسپتور برای مدیریت توکن (در صورت نیاز)
apiClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token"); // یا هر مکان دیگری که توکن را ذخیره می‌کنی
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  const locale = await getLocale(); // یا هر مکان دیگری که زبان را ذخیره می‌کنی
  if (locale) {
    config.headers["Accept-Language"] = locale.toUpperCase();
  } else {
    config.headers["Accept-Language"] = "FA";
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response, // اگر درخواست موفق بود، پاسخ را برگردان
  (error) => {
    if (error.response && error.response.status === 500) {
      console.log(error.response);
      console.error("Error 500: internal Error");
    }
    if (error.response && error.response.status === 400) {
      console.log(error.response);
      console.error("Error 400: bad request");
    }
    if (error.response && error.response.status === 403) {
      console.error("Error 403: Access forbidden. Redirecting to login...");
      window.location.href = "/reload/1";
      // مثلا کاربر را به صفحه لاگین هدایت کن
    }
    if (error.response && error.response.status === 401) {
      console.error("Error 401: Access forbidden. Redirecting to login...");
      window.location.href = "/reload/1";
      // مثلا کاربر را به صفحه لاگین هدایت کن
    }
    return Promise.reject(error); // خطا را به درخواست‌کننده برگردان
  }
);

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getDomain = () => {
  return process.env.BASE_URL || "https://api.the-ai.studio/";
};

export default apiClient;
