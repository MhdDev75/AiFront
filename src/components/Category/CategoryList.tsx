'use client';

import React from "react";

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

import { Button } from "../ui/button";
import { locales } from "@/core/i18n/config";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

export interface CategoryItemsProps {
  id: number,
  title: string,
  description: string,
  imgUrl:string
}

export interface CategoryProps {
  items: category[]
}

export interface category {
  id: number,
  title: string,
  itemList: CategoryItemsProps[]
}
export const CategoryList: React.FC<category> = ({ id, itemList, title }: category) => {


  const t =useTranslations("i18n")
  const locale = useLocale();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      rtl: locale == locales[0] ? true : false,
      mode: "snap",
      slides: { origin: "auto", perView: 1.5, spacing: 10 },
      loop: true,
      slideChanged() {
        console.log('slide changed')
      },
    },
    [
      // add plugins here
    ]
  )

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <span className="font-bold" key={id}>
          {t(title)}
        </span>
        <Button variant={"link"} onClick={() => console.log(id)}>
         {t("see-all")}
        </Button>
      </div>
      <div ref={sliderRef} className="keen-slider">
        {itemList.map((item) => (
          <div key={item.id} className="keen-slider__slide bg-muted-foreground rounded-custom">
            <div className="flex flex-row gap-2 p-2 w-full">
              <div>
              <Image src={item.imgUrl} width={120}  height={120} className="rounded-custom" alt={item.title} />
              </div>
              <div className="flex flex-col ga-2">
                <span className="font-bold text-foreground">
                  {item.title.substring(0, 12)} {item.title.length > 12 && '...'}
                </span>
                <p className="text-sm text-primary-foreground text-pretty">
                  {item.description.substring(0, 50)} {item.description.length > 50 && '...'}
                </p>
              </div>
            </div>

          </div>
        ))}
      </div>
    </>
  )
};
