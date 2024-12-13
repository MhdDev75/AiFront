"use client"
import { locales } from '@/core/i18n/config';
import { useBackButton } from '@/core/telegram/BackButtonProvider';
import { useTelegram } from '@/core/telegram/TelegramProvider';
import { ArrowUpLeft, ArrowUpRight, Earth, Image, Speaker, Tent, Text, ToyBrickIcon, Video } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'


function HomePage() {
    const { setIsVisible } = useBackButton();
    const t = useTranslations("i18n");
    const locale = useLocale();
    const isIr = locale == locales[0] ? true : false;
    const { user } = useTelegram();

    useEffect(() => {
        setIsVisible(false); // دکمه بازگشت را فعال کنید
    }, []);

    const router = useRouter()

    const feature = [
        { id: 1, title: "One", icon: <ToyBrickIcon size={20} />, url: "/Game", color: "bg-primary" },
        { id: 2, title: "Two", icon: <Earth size={20} />, url: "/fff", color: "bg-amber-500" },
        { id: 3, title: "Three", icon: <Tent size={20} />, url: "/other", color: "bg-red-600" },
        { id: 4, title: "Four", icon: <ToyBrickIcon size={20} />, url: "/Game", color: "bg-green-500" },
        { id: 5, title: "Five", icon: <Earth size={20} />, url: "/fff", color: "bg-purple-500" },
        { id: 6, title: "Six", icon: <Tent size={20} />, url: "/other", color: "bg-sky-500" },
    ]
    return (
        <section className="flex flex-col gap-2">
            <div className="text-start flex flex-wrap text-3xl mb-6 p-3">{isIr && (<span className="text-primary font-bold"> {user?.first_name + " " + user?.last_name + " " + t("Home.Dear")} </span>)}  {t("Home.How")}   {!isIr && (<span className="text-primary font-bold"> {t("Home.Dear") + " " + user?.first_name + " " + user?.last_name + '?'}</span>)}   </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:col-span-4 gap-2">
                <button onClick={() => router.push("category/1")} className="btn btn-lg btn-primary h-auto rounded-3xl flex flex-col gap-4 justify-between w-full p-3 shadow-md">
                    <div className='flex flex-col gap-4 justify-between  w-full'>

                        <div className="flex flex-row justify-between w-full">
                            <div className="p-2 rounded-full bg-slate-800 bg-opacity-35">
                                <Text size={20} />
                            </div>
                            {isIr ? <ArrowUpLeft size={30} /> : <ArrowUpRight size={30} />}
                        </div>
                        <span className="text-xl text-start">{t("Home.Chat")}</span>
                    </div>
                </button>
                <button onClick={() => router.push("category/2")} className="btn btn-lg btn-secondary h-auto rounded-3xl flex flex-col gap-4 justify-between  p-3 shadow-md">
                    <div className='flex flex-col gap-4 justify-between  w-full'>
                        <div className="flex flex-row justify-between">
                            <div className="p-2 rounded-full bg-slate-800 bg-opacity-35">
                                <Image size={20} />
                            </div>
                            {isIr ? <ArrowUpLeft size={30} /> : <ArrowUpRight size={30} />}
                        </div>
                        <span className="text-xl text-start"> {t("Home.Image")}</span>
                    </div>
                </button>
                <button onClick={() => router.push("category/3")} className="btn btn-lg btn-accent h-auto rounded-3xl flex flex-col gap-4 justify-between  w-full p-3 shadow-md">
                    <div className='flex flex-col gap-4 justify-between  w-full'>
                        <div className="flex flex-row justify-between">
                            <div className="p-2 rounded-full bg-slate-800 bg-opacity-35">
                                <Video size={20} />
                            </div>
                            {isIr ? <ArrowUpLeft size={30} /> : <ArrowUpRight size={30} />}
                        </div>
                        <span className="text-xl text-start">{t("Home.Video")} </span>
                    </div>
                </button>
                <button onClick={() => router.push("category/4")} className="btn btn-lg btn-warning h-auto rounded-3xl  shadow-md">
                    <div className='flex flex-col gap-4 justify-between  w-full'>
                        <div className="flex flex-row justify-between">
                            <div className="p-2 rounded-full bg-slate-800 bg-opacity-35">
                                <Speaker size={20} />
                            </div>
                            {isIr ? <ArrowUpLeft size={30} /> : <ArrowUpRight size={30} />}
                        </div>
                        <span className="text-xl text-start">{t("Home.Sound")} </span>
                    </div>
                </button>
            </div>
            <div className="text-start">{t("Home.HotFeatures")} </div>
            <div className="grid grid-cols-3  md:grid-cols-6 lg:col-span-6 gap-2">
                {feature.map((item) => (
                    <div onClick={() => router.push(item.url)} className="btn btn-lg h-auto  bg-base-200  rounded-2xl p-0 shadow-md" key={item.id}>
                        <div className='flex flex-col gap-3 w-full p-3'>
                            <div className="flex self-start">
                                <div className=" bg-slate-600 bg-opacity-35 p-2 rounded-full">
                                    {item.icon}
                                </div>
                            </div>
                            <span className='self-end'>{t(`Home.${item.title}`)}</span>
                        </div>
                    </div>
                ))}

            </div>
            <div className="text-start">{t("Home.QuickPrompts")}</div>
            <div className="grid grid-cols-1  md:grid-cols-3 lg:col-span-3 gap-2">
                {feature.map((item) => (
                    <div onClick={() => router.push(item.url)} className="btn btn-lg flex flex-row justify-between  items-center  gap-3 bg-base-200 p-2 rounded-full shadow-md" key={item.id}>
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
        </section>
    )
}

export default HomePage