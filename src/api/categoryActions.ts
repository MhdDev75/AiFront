// src/api/actions/userActions.js
import seeds from "@/seeds/mockData.json";
import { ICategory, ICategoryItems, IResponseCategoryItems } from "@/lib/type";

export const getCategoryById = async (categoryId: string) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const category :ICategory | any = seeds.categoryList.find(
      (x) => x.id === Number(categoryId)
    );

    return category;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const getCategoryItemListById = async (categoryId: string) => {
  try {

    
    const categoryItems: ICategoryItems[] = seeds.category.filter(
      (x) => x.category_Id === Number(categoryId)
    );

    const category = seeds.categoryList
    const response = new Array<IResponseCategoryItems>();

    if (categoryItems !== undefined && categoryItems && category) {
      categoryItems.forEach(({ id, category_Id, itemList }: ICategoryItems) => {
        console.log(category_Id);
        const parent = response.find(
          (x) => x.id === Number(categoryId)
        );
        response.push({ id, title: parent?.title, itemList });
      });
    }

    return response;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
