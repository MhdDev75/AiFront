"use client";
import { locales } from "@/core/i18n/config";
import { useBackButton } from "@/core/telegram/BackButtonProvider";
import {
  ArrowUpLeft,
  ArrowUpRight,
  ChevronDown,
  DotIcon,
  DownloadCloud,
  Earth,
  Factory,
  Hammer,
  Image,
  LucideBatteryWarning,
  Mic,
  Tent,
  Text,
  ToyBrickIcon,
  Video,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Images from "next/image";
import { getMainCategory } from "@/api/categoryActions";
import { IApiUser, ICategory } from "@/lib/type";
import { getUser } from "@/api/userActions";

function HomePage() {
  const { setIsVisible } = useBackButton();
  const t = useTranslations("i18n");
  const locale = useLocale();
  const isIr = locale == locales[0] ? true : false;
  const [category, setCategory] = useState<ICategory[]>();
  const [user, setUser] = useState<IApiUser>();

  useEffect(() => {
    getUserInfo();
    getCategoryList();
    setIsVisible(false); // دکمه بازگشت را فعال کنید
  }, []);

  const getCategoryList = async () => {
    try {
      const response = await getMainCategory();
      if (response.isSuccess) {
        setCategory(response.value as ICategory[]);
      } else {
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const getUserInfo = async () => {
    try {
      const response = await getUser();
      if (response.isSuccess) {
        setUser(response.value as IApiUser);
      } else {
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const getIcon = (id: string) => {
    switch (id) {
      case "Text":
        return <Text size={20} />;

      case "Image":
        return <Image size={20} />;

      case "Video":
        return <Video size={20} />;

      case "Mic":
        return <Mic size={20} />;

      default:
        return <LucideBatteryWarning size={20} />;
    }
  };

  
  const getColor = (id: string) => {
    switch (id) {
      case "btn-primary":
        return "btn-primary";

      case "btn-secondary":
        return "btn-secondary";

      case "btn-accent":
        return "btn-accent";

      case "btn-neutral":
        return "btn-neutral";

      default:
        return "btn-warning";
    }
  };

  const router = useRouter();

  const feature = [
    {
      id: 1,
      title: "One",
      icon: <ToyBrickIcon size={20} />,
      url: "/Game",
      color: "bg-primary",
    },
    {
      id: 2,
      title: "Two",
      icon: <Earth size={20} />,
      url: "/fff",
      color: "bg-amber-500",
    },
  ];

  const tools = [
    {
      id: 1,
      title: "Downloader",
      icon: <DownloadCloud size={20} />,
      url: "/panel/downloader",
      color: "bg-red-500",
    },
    {
      id: 2,
      title: "Convertor",
      icon: <Factory size={20} />,
      url: "/panel/convertor",
      color: "bg-lime-500",
    },
  ];

  const prompts = [
    {
      id: 1,
      title: "One",
      icon: <ToyBrickIcon size={20} />,
      url: "/Game",
      color: "bg-primary",
      imgList: [
        {
          id: 1,
          imageUrl:
            "https://qph.cf2.poecdn.net/main-thumb-pb-3015-200-ivodfqemfvztmvgafhdouijhknthkvmp.jpeg",
        },
        {
          id: 2,
          imageUrl:
            "https://qph.cf2.poecdn.net/main-thumb-pb-1019-200-ecyfizaydihfkxfwhwjlruyjdyoxengr.jpeg",
        },
        {
          id: 3,
          imageUrl:
            "https://qph.cf2.poecdn.net/main-thumb-pb-3025-200-hhrrqrzhtikatlbwhnxhygqyraobsyer.jpeg",
        },
        {
          id: 4,
          imageUrl:
            "https://qph.cf2.poecdn.net/main-thumb-pb-5124424-200-yqognbewbacsiadtjfzhgsrgntziokle.jpeg",
        },
      ],
    },
    {
      id: 2,
      title: "Two",
      icon: <Earth size={20} />,
      url: "/fff",
      color: "bg-amber-500",
      imgList: [
        {
          id: 1,
          imageUrl:
            "https://qph.cf2.poecdn.net/main-thumb-pb-3015-200-ivodfqemfvztmvgafhdouijhknthkvmp.jpeg",
        },
        {
          id: 2,
          imageUrl:
            "https://qph.cf2.poecdn.net/main-thumb-pb-1019-200-ecyfizaydihfkxfwhwjlruyjdyoxengr.jpeg",
        },
        {
          id: 3,
          imageUrl:
            "https://qph.cf2.poecdn.net/main-thumb-pb-3025-200-hhrrqrzhtikatlbwhnxhygqyraobsyer.jpeg",
        },
        {
          id: 4,
          imageUrl:
            "https://qph.cf2.poecdn.net/main-thumb-pb-5124424-200-yqognbewbacsiadtjfzhgsrgntziokle.jpeg",
        },
      ],
    },
    {
      id: 3,
      title: "Three",
      icon: <Tent size={20} />,
      url: "/other",
      color: "bg-red-600",
      imgList: [
        {
          id: 1,
          imageUrl:
            "https://qph.cf2.poecdn.net/main-thumb-pb-3015-200-ivodfqemfvztmvgafhdouijhknthkvmp.jpeg",
        },
        {
          id: 2,
          imageUrl:
            "https://qph.cf2.poecdn.net/main-thumb-pb-1019-200-ecyfizaydihfkxfwhwjlruyjdyoxengr.jpeg",
        },
        {
          id: 3,
          imageUrl:
            "https://qph.cf2.poecdn.net/main-thumb-pb-3025-200-hhrrqrzhtikatlbwhnxhygqyraobsyer.jpeg",
        },
        {
          id: 4,
          imageUrl:
            "https://qph.cf2.poecdn.net/main-thumb-pb-5124424-200-yqognbewbacsiadtjfzhgsrgntziokle.jpeg",
        },
      ],
    },
    {
      id: 4,
      title: "Four",
      icon: <ToyBrickIcon size={20} />,
      url: "/Game",
      color: "bg-green-500",
      imgList: [
        {
          id: 1,
          imageUrl:
            "https://qph.cf2.poecdn.net/main-thumb-pb-3015-200-ivodfqemfvztmvgafhdouijhknthkvmp.jpeg",
        },
        {
          id: 2,
          imageUrl:
            "https://qph.cf2.poecdn.net/main-thumb-pb-1019-200-ecyfizaydihfkxfwhwjlruyjdyoxengr.jpeg",
        },
        {
          id: 3,
          imageUrl:
            "https://qph.cf2.poecdn.net/main-thumb-pb-3025-200-hhrrqrzhtikatlbwhnxhygqyraobsyer.jpeg",
        },
        {
          id: 4,
          imageUrl:
            "https://qph.cf2.poecdn.net/main-thumb-pb-5124424-200-yqognbewbacsiadtjfzhgsrgntziokle.jpeg",
        },
      ],
    },
  ];
  return (
    <section className="flex flex-col gap-3 pb-3">
      <div className="text-start flex flex-wrap text-3xl mb-6 p-3">
        {user && isIr && (
          <span className="text-primary font-bold">
            {user?.firstName + " " + user?.lastName + " " + t("Home.Dear")}{" "}
          </span>
        )}{" "}
        {t("Home.How")}{" "}
        {user && !isIr && (
          <span className="text-primary font-bold">
            {" "}
            {t("Home.Dear") +
              " " +
              user?.firstName +
              " " +
              user?.lastName +
              "?"}
          </span>
        )}{" "}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:col-span-4 gap-2 ">
        {category &&
          category.map((item) => (
            <button
              key={item.id}
              onClick={() => router.push(`/panel/category/${item.id}`)}
              className={`btn btn-lg ${getColor(item.color)} h-auto rounded-3xl flex flex-col gap-4 justify-between w-full p-3 shadow-md`}
            >
              <div className="flex flex-col gap-4 justify-between  w-full">
                <div className="flex flex-row justify-between w-full">
                  <div className="p-2 rounded-full bg-slate-800 bg-opacity-35">
                    {getIcon(item.icon)}
                  </div>
                  {isIr ? (
                    <ArrowUpLeft size={30} />
                  ) : (
                    <ArrowUpRight size={30} />
                  )}
                </div>
                <span className="text-xl text-start">{item.title}</span>
              </div>
            </button>
          ))}
      </div>
      <div className="text-start">{t("Home.HotFeatures")} </div>
      <div className="grid grid-cols-3  md:grid-cols-6 lg:col-span-6 gap-2">
        {feature.map((item) => (
          <div
            onClick={() => router.push(item.url)}
            className="btn btn-lg h-auto  bg-base-200  rounded-2xl p-0 shadow-md"
            key={item.id}
          >
            <div className="flex flex-col gap-3 w-full p-3">
              <div className="flex flex-row justify-between items-start w-full">
                <div className={`${item.color} bg-opacity-35 p-2 rounded-full`}>
                  {item.icon}
                </div>
                <div className="relative">
                  <DotIcon
                    color="red"
                    size={20}
                    className="absolute mx-auto animate-ping"
                  />
                  <DotIcon color="red" size={20} className="" />
                </div>
              </div>
              <span className="self-end">{t(`Home.${item.title}`)}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="text-start">{t("Home.Tools")} </div>
      <div className="grid grid-cols-2  md:grid-cols-6 lg:col-span-6 gap-2">
        {tools.map((item) => (
          <div
            onClick={() => router.push(item.url)}
            className="btn btn-lg h-auto  bg-base-200  rounded-2xl p-0 shadow-md"
            key={item.id}
          >
            <div className="flex flex-col gap-3 w-full p-3">
              <div className="flex flex-row justify-between w-full">
                <div className={`${item.color} bg-opacity-35 p-2 rounded-full`}>
                  {item.icon}
                </div>
                <Hammer color="purple" size={15} className="animate-pulse" />
              </div>

              <span className="self-end">{t(`Home.${item.title}`)}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="text-start">{t("Home.QuickPrompts")}</div>
      <div className="grid grid-cols-1  md:grid-cols-3 lg:col-span-3 gap-2">
        {prompts.map((item, index) => (
          <div key={item.id} className="dropdown dropdown-top">
            <div
              tabIndex={index}
              role="button"
              className="btn  h-auto px-3 py-2 w-full flex justify-between rounded-full"
            >
              <div className="flex flex-row gap-3 justify-start items-center">
                <div>
                  <div
                    className={`${item.color} bg-opacity-35 p-2 rounded-full`}
                  >
                    {item.icon}
                  </div>
                </div>
                <span> {t(`Home.${item.title}`)} </span>
              </div>
              <div className="flex justify-end items-center">
                {isIr ? <ArrowUpLeft size={20} /> : <ArrowUpRight size={20} />}
              </div>
            </div>
            <ul
              tabIndex={index}
              className="menu dropdown-content bg-base-300 rounded-full flex flex-row items-center gap-3  z-[1] w-auto p-2 shadow"
            >
              {item.imgList.map((child) => (
                <li key={child.id}>
                  <div className="rounded-full bg-accent h-10 w-10 p-0">
                    <Images
                      className="rounded-full"
                      src={child.imageUrl}
                      alt={item.title}
                      width={40}
                      height={40}
                    />
                  </div>
                </li>
              ))}
              <li>
                <div className="bg-base-100 text-base-content rounded-full p-0 h-10 w-10 flex justify-center items-center">
                  <ChevronDown size={30} />
                </div>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HomePage;
