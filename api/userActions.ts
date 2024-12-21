// src/api/actions/userActions.js
import seeds from "@/seeds/mockData.json";
import { ICategory, ICategoryItems, IResponseCategoryItems } from "@/lib/type";
import apiClient from "./apiClient";


// ورود کاربر
export const loginWithTelegram = async (initData: string) => {
  try {
      const response = await apiClient.get(`/User/login?${initData}`);
      return response.data;
  } catch (error) {
      console.error('Error login user:', error);
      throw error;
  }
};


// گرفتن اطلاعات کاربر
export const getUser = async () => {
  try {
      const response = await apiClient.get(`/users/info/`);
      return response.data;
  } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
  }
};

export const mergeLists = (list1: ICategory[], list2: ICategoryItems[]): IResponseCategoryItems[] => 
  { return list2.reduce<IResponseCategoryItems[]>((acc, item2) => { 
    const match = list1.find(item1 => item2.category_Id === item1.id); 
    if (match) { acc.push({ id: item2.id, title: match.title, itemList: item2.itemList }); 
  } return acc; }, 
    []);
  }

export const getCategoryItemListById = async (categoryId: string) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const category: ICategory[] | any = seeds.categoryList.filter(
      (x) => x.parent_id === Number(categoryId)
    );

    if (category && category != undefined) {
      const categoryItems = mergeLists(category , seeds.category)
      return categoryItems;
    }

    return null;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
