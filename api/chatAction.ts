import apiClient from "./apiClient";

// ارسال و گرفتن چت 
export const getOpenAiChat = async (message : string) => {
  try {
    const response = await apiClient.get(`/Chat/Text/OpenAi?message=${message}`);
    return response.data;
  } catch (error) {
    console.error("Error Get Balance:", error);
    throw error;
  }
};


