import apiClient from "./apiClient";

// ارسال و گرفتن چت 
export const getOpenAiChat = async (message : string, sessionId : string , applicationId : number) => {
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


