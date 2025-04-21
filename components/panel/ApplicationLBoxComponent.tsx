"use client"
import React from "react";


import { locales } from "../../core/i18n/config";
import Image from "next/image";
import { useLocale } from "next-intl";
import { IApplication } from "../../lib/type";
import { ArrowUpLeft, ArrowUpRight, BadgePlus, StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";



const ApplicationLBoxComponent: React.FC<IApplication> = ({
  id,
  rate,
  description,
  followerCount,
  imageUrl,
  name
}: IApplication) => {
  const locale = useLocale();
  const isIr = locale == locales[0] ? true : false;
  const router = useRouter()
  return (
    <div
      onClick={() => router.push(`/panel/chat/${id}`)}

      key={id}
      className="btn h-auto  bg-base-300 rounded-3xl flex flex-col items-start gap-2  p-3"
    >
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row gap-2">
          <Image
            src={imageUrl}
            width={40}
            height={40}
            className="rounded-2xl"
            alt={name}
          />
          <div className="flex flex-col flex-nowrap justify-center items-start gap-1">
            <div className="bg-gray-500 bg-opacity-70 rounded-md flex flex-row gap-1 flex-nowrap px-1 items-center">
              <StarIcon color="yellow" size={12} />
              <span className="font-bold text-xs">{Number(rate).toFixed(2)}</span>
            </div>
            <div className="bg-gray-500 bg-opacity-70 rounded-md flex flex-row gap-1 flex-nowrap px-1 items-center">
              <BadgePlus color="blue" size={12} />
              <span className=" text-xs text-gray-300">
                {(Number(followerCount)).toLocaleString()}
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
        {name.substring(0, 12)}{" "}
        {name.length > 12 && "..."}
      </span>

      <p className="text-sm text-start text-primary-foreground text-pretty">
        {description.substring(0, 50)}{" "}
        {description.length > 50 && "..."}
      </p>
    </div>
  );
}

export default ApplicationLBoxComponent;