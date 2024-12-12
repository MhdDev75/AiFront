/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useBackButton } from "@/core/telegram/BackButtonProvider";
import {
  ICategory,
  IResponseCategoryItems,
} from "@/lib/type";
import {
  getCategoryById,
  getCategoryItemListById,
} from "@/api/categoryActions";
import { useParams } from "next/navigation";
import CategoryListComponent from "@/components/panel/CategoryListComponent";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CategoryPage = () => {

  const t = useTranslations("i18n");
  const { setIsVisible } = useBackButton();
  const [category, setCategory] = useState<ICategory | null | undefined>(null);
  const [data, setData] = useState<IResponseCategoryItems[] | null | undefined>(
    null
  );
  const params = useParams<{ id: string }>();
  useEffect(() => {
    if (params) {
      getData(params.id);
    }
    setIsVisible(true); // دکمه بازگشت را فعال کنید
  }, []);

  const getData = async (paramId: string) => {
    const response: ICategory = await getCategoryById(paramId);
    setCategory(response);

    const responseItem = await getCategoryItemListById(paramId);
    setData(responseItem);
  };

  return (
    <section className="h-full">
      <h1 className="text-lg">{t(category?.title)}</h1>
      <div className="grid gap-2">
        {data?.map((category: IResponseCategoryItems) => (
          <CategoryListComponent
            id={category.id}
            itemList={category.itemList}
            title={category.title}
            key={category.id}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoryPage;
