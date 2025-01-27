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
    return error.response.data;
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
    return error.response.data;
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
    return error.response.data;
  }
};
