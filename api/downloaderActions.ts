// src/api/actions/userActions.js
import apiClient from "./apiClient";

// ورود کاربر
export const radioJavanDownloader = async (url: string) => {
  try {
    const response = await apiClient.post(
      `https://flydownloader.com/wp-json/aio-dl/video-data/`,
      {
        url: url,
        token:
          "e378cc7c022e18b2d32f984cd3fa25daa32828d18695ec7c7693a0f0ce495093",
      }
    );
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
