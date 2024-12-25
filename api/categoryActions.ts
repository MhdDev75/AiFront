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
    const response = await apiClient.get(`/AiApp/GetAllAiCategoriesQuery?aiCategoryId=${categoryId}`);
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




// export const getCategoryById = async (categoryId: string) => {
//   try {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const category: ICategory | any = seeds.categoryList.find(
//       (x) => x.id === Number(categoryId)
//     );

//     return category;
//   } catch (error) {
//     console.error("Error creating user:", error);
//     throw error;
//   }
// };

// export const mergeLists = (list1: ICategory[], list2: ICategoryItems[]): IResponseCategoryItems[] => 
//   { return list2.reduce<IResponseCategoryItems[]>((acc, item2) => { 
//     const match = list1.find(item1 => item2.category_Id === item1.id); 
//     if (match) { acc.push({ id: item2.id, title: match.titleEn, itemList: item2.itemList }); 
//   } return acc; }, 
//     []);
//   }

// export const getCategoryItemListById = async (categoryId: string) => {
//   try {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const category: ICategory[] | any = seeds.categoryList.filter(
//       (x) => x.id === Number(categoryId)
//     );

//     if (category && category != undefined) {
//       const categoryItems = mergeLists(category , seeds.category)
//       return categoryItems;
//     }

//     return null;
//   } catch (error) {
//     console.error("Error creating user:", error);
//     throw error;
//   }
// };
