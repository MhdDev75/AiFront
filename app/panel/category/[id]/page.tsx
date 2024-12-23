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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CategoryPage = () => {

  // const t = useTranslations("i18n");
  const { setIsVisible } = useBackButton();
  const [loading, setLoading] = useState(false);
  const [categoryWithApplication, setCategoryWithApplication] = useState<ICategoryWithQuery>();
  // const [data, setData] = useState<IResponseCategoryItems[] | null | undefined>(
  //   null
  // );
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
      setCategoryWithApplication(response as ICategoryWithQuery);
      setLoading(false)
    }

    // const response: ICategory = await getCategoryById(paramId);
    // setCategory(response);

    // const responseItem = await getCategoryItemListById(paramId);
    // setData(responseItem);
  };

  return (
    <section className="h-full">
      {loading ?
        <>
          <div className="flex flex-row justify-between items-center">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-20"></div>
          </div>
          <div className="keen-slider">

            <div
              className="keen-slider__slide  bg-base-300 rounded-2xl flex flex-col gap-2 p-3"
            >
              <div className="flex flex-row justify-between">
                <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                {/* <Image
                  src={item.imgUrl}
                  width={40}
                  height={40}
                  className="rounded-2xl"
                  alt={item.title}
                /> */}
                <div className="flex flex-col flex-nowrap justify-center items-start gap-1">
                  <div className="bg-gray-500 bg-opacity-70 rounded-md flex flex-row gap-1 flex-nowrap px-1 items-center">
                    <div className="skeleton h-4 w-20"></div>
                  </div>
                  <div className="bg-gray-500 bg-opacity-70 rounded-md flex flex-row gap-1 flex-nowrap px-1 items-center">
                    <div className="skeleton h-4 w-20"></div>
                  </div>
                </div>
                {/* {isIr ? (
                  <ArrowUpLeft size={20} />
                ) : (
                  <ArrowUpRight size={20} />
                )} */}
              </div>
              <span className="font-bold text-foreground">
                <div className="skeleton h-4 w-20"></div>

              </span>

              <p className="text-sm text-primary-foreground text-pretty">
                <div className="skeleton h-8 w-20"></div>

              </p>
            </div>
          </div>
        </>
        : <div>Loaded</div>}
      <h1 className="text-lg">{categoryWithApplication?.titleEn}</h1>
      <div className="grid gap-2">
        {categoryWithApplication?.aiSubCategories?.map((category: ISubCategoryWithApplication) => (
          <CategoryListComponent
            id={category.id}
            aiApplications={category.aiApplications}
            title={category.title}
            key={category.id}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoryPage;
