import { AxiosError } from "axios";
import apiClient from "./apiClient";

// دریافت لیست ماموریت ها
export const getTaskList = async () => {
  try {
    const response = await apiClient.get(`/UserTask/MyTask`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

// تایید لیمک های خارجی
export const postExternalLink = async (taskId: number) => {
  try {
    const response = await apiClient.post(`/UserTask/UserExternalLink`, {
      userTaskId: taskId,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return error;
  }
};

// چک کردن اعضای دعوتی
export const postCheckInvite = async (taskId: number) => {
  try {
    const response = await apiClient.post(`/UserTask/InviteUser`, {
      userTaskId: taskId,
    });
    return response.data;
  } catch (error) {
    console.error("Error Post Invited:", error);
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return error;
  }
};

// تایید عضویت چنل تلگرام
export const postTelegramChannel = async (taskId: number) => {
  try {
    const response = await apiClient.post(`/UserTask/TelegramChannel`, {
      userTaskId: taskId,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return error;
  }
};


export const getImageFile = async (imageId: string) => {
  try {
    const response = await apiClient.get(`/FileStorage/${encodeURIComponent(imageId)}/Download`, {
      responseType: 'arraybuffer', // تعیین نوع پاسخ به باینری
    });
    const base64String = btoa(
      new Uint8Array(response.data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    );
    return base64String;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
