import apiClient from "./apiClient";

// ارسال و گرفتن چت 
export const getOpenAiChat = async (message: string, sessionId: string, applicationId: number) => {
  try {
    const response = await apiClient.get(`/Chat?Message=${message}&SessionId=${sessionId}&ApplicationId=${applicationId}`);
    return response.data;
  } catch (error) {
    console.error("Error Get Balance:", error);
    throw error;
  }
};

//  گرفتن تاریخچه چت 
export const getOpenAiChatHistory = async () => {
  try {
    const response = await apiClient.get(`/Chat/History`);
    return response.data;
  } catch (error) {
    console.error("Error Get Balance:", error);
    throw error;
  }
};

//  گرفتن تاریخچه چت 
export const getOpenAiChatHistoryConversaton = async (sesstionId:string) => {
  try {
    const response = await apiClient.get(`/Chat/HistoryDetail/${sesstionId}`);
    return response.data;
  } catch (error) {
    console.error("Error Get Balance:", error);
    throw error;
  }
};

//  گرفتن اطلاعات دنبالکننده ها 
export const getFollowing = async (applicationId: string) => {
  try {
    const response = await apiClient.get(`/ApplicationFollower?appllicationId=${applicationId}`);
    return response.data;
  } catch (error) {
    console.error("Error Get Balance:", error);
    throw error;
  }
};

//  دنبال کردن
export const postFollowing = async (applicationId: string) => {
  try {
    const response = await apiClient.post(`/ApplicationFollower/Follow`, {
      "applicationId": applicationId
    });
    return response.data;
  } catch (error) {
    console.error("Error Get Balance:", error);
    throw error;
  }
};


//  لغو دنبال کردن
export const postUnFollowing = async (applicationId: string) => {
  try {
    const response = await apiClient.post(`/ApplicationFollower/UnFollow`, {
      "applicationId": applicationId
    });
    return response.data;
  } catch (error) {
    console.error("Error Get Balance:", error);
    throw error;
  }
};

//  اراسال بازخورد
export const postApplicationRate = async (applicationId: string, rate: string) => {
  try {
    const response = await apiClient.post(`/ApplicationRate`, {
      "applicationId": applicationId,
      "rate": rate
    });
    return response.data;
  } catch (error) {
    console.error("Error Get Balance:", error);
    throw error;
  }
};

//  گرفتن اطلاعات بازخورد
export const getApplicationRate = async (applicationId: string) => {
  try {
    const response = await apiClient.get(`/ApplicationRate?applicationId=${applicationId}`);
    return response.data;
  } catch (error) {
    console.error("Error Get Balance:", error);
    throw error;
  }
};





