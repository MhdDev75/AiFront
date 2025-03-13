/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
// import { useTranslations } from "next-intl";
import { useBackButton } from "@/core/telegram/BackButtonProvider";

import {
  GetAllAiCategoriesQuery,
  // getCategoryById,
  // getCategoryItemListById,
} from "@/api/categoryActions";
import { useParams } from "next/navigation";
import { ICategoryWithQuery, ISubCategoryWithApplication } from "@/lib/type";
import CategoryListComponent from "@/components/panel/CategoryListComponent";

const CategoryPage = () => {

  // const t = useTranslations("i18n");
  const { setIsVisible } = useBackButton();
  const [loading, setLoading] = useState(false);
  const [categoryWithApplication, setCategoryWithApplication] = useState<ICategoryWithQuery>();
  const params = useParams<{ id: string }>();
  useEffect(() => {
    if (params) {
      getData(params.id);
    }
    setIsVisible(true); // دکمه بازگشت را فعال کنید
  }, []);

  const getData = async (paramId: string) => {
    setLoading(true);
    const response = await GetAllAiCategoriesQuery(paramId);
    if (response.isSuccess) {
      setCategoryWithApplication(response.value[0] as ICategoryWithQuery);
      setLoading(false)
    }
  };

  return (
    <section className="h-full">
      {loading ?
        <>
          <div className="grid gap-5">
            <div className=" h-40 skeleton  bg-base-300 rounded-2xl flex flex-col gap-2 p-3" >
            </div>
            <div className=" h-40 skeleton  bg-base-300 rounded-2xl flex flex-col gap-2 p-3" >
            </div>
            <div className=" h-40 skeleton  bg-base-300 rounded-2xl flex flex-col gap-2 p-3" >
            </div>
          </div>
        </>
        : <>
          <h1 className="text-lg">{categoryWithApplication?.titleEn}</h1>
          <div className="grid gap-2">
            {categoryWithApplication?.aiSubCategories?.map((item: ISubCategoryWithApplication) => (
              <CategoryListComponent
                id={item.id}
                aiApplications={item.aiApplications}
                title={item.title}
                key={item.id}
              />
            ))}
          </div>
        </>}

    </section>
  );
};

export default CategoryPage;
