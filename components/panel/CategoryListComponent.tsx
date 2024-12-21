"use client";

import React from "react";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import { locales } from "../../core/i18n/config";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { IResponseCategoryItems } from "../../lib/type";
import { ArrowUpLeft, ArrowUpRight, BadgePlus, StarIcon } from "lucide-react";



export interface CategoryItemsProps {
  id: number;
  title: string;
  description: string;
  imgUrl: string;
}

export interface CategoryProps {
  items: category[];
}

export interface category {
  id: number;
  title: string;
  itemList: CategoryItemsProps[];
}

const CategoryListComponent: React.FC<IResponseCategoryItems> = ({
  id,
  itemList,
  title,
}: IResponseCategoryItems) => {
  const t = useTranslations("i18n");
  const locale = useLocale();
  const isIr = locale == locales[0] ? true : false;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      rtl: isIr,
      mode: "snap",
      slides: { origin: "auto", perView: 1.5, spacing: 10 },
      loop: true,
      slideChanged() {
        console.log("slide changed");
      },
    },
    [
      // add plugins here
    ]
  );

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <span className="font-bold" key={id}>
          {t(title)}
        </span>
        <button className="btn btn-ghost btn-sm text-primary" onClick={() => console.log(id)}>
          {t("see-all")}
        </button>
      </div>
      <div ref={sliderRef} className="keen-slider">
        {itemList.map((item) => (
          <div
            key={item.id}
            className="keen-slider__slide  bg-base-300 rounded-2xl flex flex-col gap-2 rounded-md p-3"
          >
            <div className="flex flex-row justify-between">
              <Image
                src={item.imgUrl}
                width={40}
                height={40}
                className="rounded-2xl"
                alt={item.title}
              />
              <div className="flex flex-col flex-nowrap justify-center items-start gap-1">
                <div className="bg-gray-500 bg-opacity-70 rounded-md flex flex-row gap-1 flex-nowrap px-1 items-center">
                  <StarIcon color="yellow" size={12} />
                  <span className="font-bold text-xs">4.9</span>
                </div>
                <div className="bg-gray-500 bg-opacity-70 rounded-md flex flex-row gap-1 flex-nowrap px-1 items-center">
                  <BadgePlus color="blue" size={12} />
                  <span className=" text-xs text-gray-300">
                    {(10010).toLocaleString()}
                  </span>
                </div>
              </div>
              {isIr ? (
                <ArrowUpLeft size={20} />
              ) : (
                <ArrowUpRight size={20} />
              )}
            </div>
            <span className="font-bold text-foreground">
              {item.title.substring(0, 12)}{" "}
              {item.title.length > 12 && "..."}
            </span>

            <p className="text-sm text-primary-foreground text-pretty">
              {item.description.substring(0, 50)}{" "}
              {item.description.length > 50 && "..."}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default CategoryListComponent;