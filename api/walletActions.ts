// src/api/actions/userActions.js
import apiClient from "./apiClient";

// ورود کاربر
export const getBalance = async () => {
  try {
    const response = await apiClient.get(`/Account/Balance`);
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

// گرفتن ملیت
export const getRegion = async () => {
  try {
    const response = await apiClient.get(`/Region/Region`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

// گرفتن اطلاعات ملیت کاربر
export const getUserRegion = async () => {
  try {
    const response = await apiClient.get(`/Region/UserRegion`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }

};

// افزودن ملیت کاربر
export const postUserRegion = async (region: number) => {
  try {
    const response = await apiClient.post(`/Region/AddUserRegion`, {
      regionId: region
    },
      {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": region,
        },
      });
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }

}
