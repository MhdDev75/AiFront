"use client"
// import { category, CategoryList } from "@/components/Category/CategoryList";
import { useBackButton } from "@/core/telegram/BackButtonProvider";
import { locales } from "@/core/i18n/config";
import { useTelegram } from "@/core/telegram/TelegramProvider";
import { ArrowUpLeft, ArrowUpRight, Earth, Image, Speaker, Tent, Text, ToyBrickIcon, Video } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HomePage = () => {
  const { setIsVisible } = useBackButton();
  const t = useTranslations("i18n");
  const locale = useLocale();
  const isIr = locale == locales[0] ? true : false;
  const { user } = useTelegram();

  const router = useRouter()

  const feature = [
    { id: 1, title: "One", icon: <ToyBrickIcon size={20} />, url: "/Game", color: "bg-primary" },
    { id: 2, title: "Two", icon: <Earth size={20} />, url: "/fff", color: "bg-amber-500" },
    { id: 3, title: "Three", icon: <Tent size={20} />, url: "/other", color: "bg-red-600" },
    { id: 4, title: "Four", icon: <ToyBrickIcon size={20} />, url: "/Game", color: "bg-green-500" },
    { id: 5, title: "Five", icon: <Earth size={20} />, url: "/fff", color: "bg-purple-500" },
    { id: 6, title: "Six", icon: <Tent size={20} />, url: "/other", color: "bg-sky-500" },
  ]


  useEffect(() => {
    setIsVisible(false)
  });

  return (
    <section className="flex flex-col gap-2 px-4">
      <div className="text-start flex flex-wrap text-3xl mb-6 p-3">{isIr && (<span className="text-primary font-bold"> {user?.first_name + " " + user?.last_name + " " + t("Home.Dear")} </span>)}  {t("Home.How")}   {!isIr && (<span className="text-primary font-bold"> {t("Home.Dear") + " " + user?.first_name + " " + user?.last_name + '?'}</span>)}   </div>
      <div className="grid grid-rows-2 gap-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-primary rounded-custom flex flex-col gap-4 justify-between w-full p-3 shadow-md">
            <div className="flex flex-row justify-between">
              <div className="p-2 rounded-full bg-slate-800 bg-opacity-35">
                <Text size={20} />
              </div>
              {isIr ? <ArrowUpLeft size={20} /> : <ArrowUpRight size={20} />}
            </div>
            <span className="text-lg">{t("Home.Chat")} <br /> {t("Home.WithAi")}</span>
          </div>
          <div className="bg-slate-700 rounded-custom flex flex-col gap-4 justify-between  w-full p-3 shadow-md">
            <div className="flex flex-row justify-between">
              <div className="p-2 rounded-full bg-slate-800 bg-opacity-35">
                <Image size={20} />
              </div>
              {isIr ? <ArrowUpLeft size={20} /> : <ArrowUpRight size={20} />}
            </div>
            <span className="text-lg"> {t("Home.Image")} <br /> {t("Home.WithAi")}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-red-500 rounded-custom flex flex-col gap-4 justify-between  w-full p-3 shadow-md">
            <div className="flex flex-row justify-between">
              <div className="p-2 rounded-full bg-slate-800 bg-opacity-35">
                <Video size={20} />
              </div>
              {isIr ? <ArrowUpLeft size={20} /> : <ArrowUpRight size={20} />}
            </div>
            <span className="text-lg">{t("Home.Video")} <br /> {t("Home.WithAi")}</span>
          </div>
          <div className="bg-purple-600 rounded-custom flex flex-col gap-4 justify-between  w-full p-3 shadow-md">
            <div className="flex flex-row justify-between">
              <div className="p-2 rounded-full bg-slate-800 bg-opacity-35">
                <Speaker size={20} />
              </div>
              {isIr ? <ArrowUpLeft size={20} /> : <ArrowUpRight size={20} />}
            </div>
            <span className="text-lg">{t("Home.Sound")} <br /> {t("Home.WithAi")}</span>
          </div>
        </div>
      </div>
      <div className="text-start">{t("Home.HotFeatures")} </div>
      <div className="grid grid-cols-3 gap-2">
        {feature.map((item) => (
          <div onClick={() => router.push(item.url)} className="flex flex-col gap-3 bg-secondary p-3 rounded-custom shadow-md" key={item.id}>
            <div className="flex">
              <div className=" bg-slate-600 bg-opacity-35 p-2 rounded-full">
                {item.icon}
              </div>
            </div>
            <span>{t(`Home.${item.title}`)}</span>
          </div>
        ))}

      </div>
      <div className="text-start">{t("Home.QuickPrompts")}</div>
      <div className="grid grid-rows-3 gap-2">
        {feature.map((item) => (
          <div onClick={() => router.push(item.url)} className="flex flex-row justify-between  items-center  gap-3 bg-secondary p-3 rounded-custom shadow-md" key={item.id}>
            <div className="flex flex-row gap-3 justify-start items-center">
              <div>
                <div className={`${item.color} bg-opacity-35 p-2 rounded-full`}>
                  {item.icon}
                </div>
              </div>
              <span> {t(`Home.${item.title}`)} </span>
            </div>
            <div className="flex justify-end items-center">
              {isIr ? <ArrowUpLeft size={20} /> : <ArrowUpRight size={20} />}
            </div>
          </div>
        ))}

      </div>
      {/* {list.map((item) => (
          <CategoryList
            id={item.id}
            itemList={item.itemList}
            title={item.title}
            key={item.id}
          />
        ))} */}
    </section>
  );
};

export default HomePage;
