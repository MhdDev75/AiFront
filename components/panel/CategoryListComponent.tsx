"use client"
import React from "react";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import { locales } from "../../core/i18n/config";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { IApplication, ISubCategoryWithApplication } from "../../lib/type";
import { ArrowUpLeft, ArrowUpRight, BadgePlus, StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";



const CategoryListComponent: React.FC<ISubCategoryWithApplication> = ({
  id,
  aiApplications,
  title
}: ISubCategoryWithApplication) => {
  const t = useTranslations("i18n");
  const locale = useLocale();
  const isIr = locale == locales[0] ? true : false;
  const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      rtl: isIr,
      mode: "snap",
      slides: { origin: "auto", perView: 1.5, spacing: 10 },
      loop: false,
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
          {title}
        </span>
        <button className="btn btn-ghost btn-sm text-primary" onClick={() => router.push(`/panel/application/${id}/${encodeURIComponent(title)}`)}>
          {t("see-all")}
        </button>
      </div>
      <div ref={sliderRef} className="keen-slider">
        {aiApplications && aiApplications.map((item: IApplication) => (
          <div
            onClick={() => router.push(`/panel/chat/${item.id}`)}
            key={item.id}
            className="keen-slider__slide btn h-auto items-start  bg-base-300 rounded-3xl flex flex-col gap-2  p-3"
          >
            <div className="flex flex-row justify-between w-full">
              <div className="flex flex-row gap-2">
                <Image
                  src={item.imageUrl}
                  width={40}
                  height={40}
                  className="rounded-2xl"
                  alt={item.name}
                />
                <div className="flex flex-col flex-nowrap justify-center items-start gap-1">
                  <div className="bg-gray-500 bg-opacity-70 rounded-md flex flex-row gap-1 flex-nowrap px-1 items-center">
                    <StarIcon color="yellow" size={12} />
                    <span className="font-bold text-xs text-gray-300">{Number(item.rate).toFixed(2)}</span>
                  </div>
                  <div className="bg-gray-500 bg-opacity-70 rounded-md flex flex-row gap-1 flex-nowrap px-1 items-center">
                    <BadgePlus color="blue" size={12} />
                    <span className=" text-xs text-gray-300">
                      {(Number(item.followerCount)).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              {isIr ? (
                <ArrowUpLeft size={20} />
              ) : (
                <ArrowUpRight size={20} />
              )}
            </div>
            <span className="font-bold text-foreground">
              {item.name.substring(0, 12)}{" "}
              {item.name.length > 12 && "..."}
            </span>

            <p className="text-sm text-start text-primary-foreground text-pretty">
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