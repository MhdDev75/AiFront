// src/api/actions/userActions.js
import apiClient from "./apiClient";

// ورود کاربر
export const loginWithTelegram = async (initData: string) => {
  try {
    const response = await apiClient.get(`/User/login?${initData}`);
    console.log(response);
    
    return response.data;
  } catch (error) {
    console.log(error);
    console.error("Error login user:", error);
    throw error;
  }
};

// گرفتن اطلاعات کاربر
export const getUser = async () => {
  try {
    const response = await apiClient.get(`/User/Get`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};