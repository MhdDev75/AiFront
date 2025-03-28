import apiClient from "./apiClient";

// دریافت کد دعوت
export const getAffiliate = async () => {
  try {
    const response = await apiClient.get(`/Affiliate`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const postAffiliate = async () => {
  try {
    const response = await apiClient.post(`/Affiliate`, {});
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const getInvitedList = async () => {
  try {
    const response = await apiClient.get(`/Affiliate/Invited`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
