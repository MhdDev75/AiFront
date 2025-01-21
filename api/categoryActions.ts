import apiClient from "./apiClient";


// گرفتن اطلاعات کتگوری
export const getMainCategory = async () => {
  try {
    const response = await apiClient.get(`/AiApp/GetAiCategory`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
// گرفتن اطلاعات ساب کتگوری 
export const getSubCategory = async (categoryId :string) => {
  try {
    const response = await apiClient.get(`/AiApp/GetAiSubCategory?aiCategoryId=${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

// گرفتن اطلاعات ساب کتگوری 
export const getCategoryApplication = async (subCategoryId :string) => {
  try {
    const response = await apiClient.get(`/AiApp/GetAiApplication?aiSubCategoryId=${subCategoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

// گرفتن اطلاعات کتگوری با زیر مجموعه هاش 
export const GetAllAiCategoriesQuery = async (categoryId :string) => {
  try {
    const response = await apiClient.get(`/AiApp/GetAll?aiCategoryId=${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

// گرفتن اطلاعات اپلیکیشن های ساب کتگوری 
export const GetAiApplication = async (subCategoryId :string) => {
  try {
    const response = await apiClient.get(`/AiApp/GetAiApplication?aiSubCategoryId=${subCategoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

