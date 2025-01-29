import apiClient from "./apiClient";

// ورود کاربر
export const loginWithTelegram = async (initData: string) => {
  try {
    const response = await apiClient.get(`/User/login?${initData}`);
    return response.data;
  } catch (error) {
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


// تغییر زبان کاربر
export const postUserLanguage = async (language: "EN" | "FA") => {
  try {
    const response = await apiClient.post(`/User/UpdateLanguage`, { "language": language });
    return response.data;
  } catch (error) {
    console.error("Error Get User Region:", error);
    throw error;
  }

};

// گرفتن ملیت
export const getRegion = async () => {
  try {
    const response = await apiClient.get(`/Region/Region`);
    return response.data;
  } catch (error) {
    console.error("Error Get Region:", error);
    throw error;
  }
};

// گرفتن اطلاعات ملیت کاربر
export const getUserRegion = async () => {
  try {
    const response = await apiClient.get(`/Region/UserRegion`);
    return response.data;
  } catch (error) {
    console.error("Error Get User Region:", error);
    throw error;
  }
};

// افزودن ملیت کاربر
export const postUserRegion = async (region: number) => {
  try {
    const response = await apiClient.post(
      `/Region/AddUserRegion`,
      {
        regionId: region,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": region,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error Post User Region:", error);
    throw error;
  }
};
