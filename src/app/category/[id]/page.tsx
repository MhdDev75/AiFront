/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useBackButton } from "@/core/telegram/BackButtonProvider";
import { ICategoryProps } from "@/lib/type";
import seed from "@/seeds/mockData.json"
import { ArrowUpLeft, ArrowUpRight, BadgePlus, StarIcon } from "lucide-react";
import { useLocale } from "next-intl";
import { locales } from "@/core/i18n/config";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CategoryPage = ({ params: { id } }: any) => {
    const router = useRouter();
    const locale = useLocale();
    const isIr = locale == locales[0] ? true : false;
    console.log(router);
    const t = useTranslations("i18n");
    const { setIsVisible } = useBackButton();
    const [data, setData] = useState<ICategoryProps | null | undefined>(null);

    useEffect(() => {
        if (id) {
            const seedData = seed.category.find(x => x.id == id)
            if (seedData != undefined && seedData) {
                setData({ items: seedData })
            }
        }
        setIsVisible(true); // دکمه بازگشت را فعال کنید
    }, []);

    return (
        <section className="px-5 h-full">
            <h1 className="text-lg">{t(data?.items.title)}</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6  gap-2">
                {data?.items.itemList.map((item: any) => (
                    <div key={item.id} className="bg-gray-600 bg-opacity-70 flex flex-col gap-2 rounded-custom p-3">
                        <div className="flex flex-row justify-between">
                            <Image src={item.imgUrl} width={40} height={40} className="rounded-custom" alt={item.title} />
                            <div className="flex flex-col flex-nowrap justify-center items-start gap-1">
                                <div className="bg-gray-500 bg-opacity-70 rounded-custom flex flex-row gap-1 flex-nowrap p-1 items-center">
                                    <StarIcon color="yellow" size={12} />
                                    <span className="font-bold text-xs">4.9</span>
                                </div>
                                <div className="bg-gray-500 bg-opacity-70 rounded-custom flex flex-row gap-1 flex-nowrap p-1 items-center">
                                    <BadgePlus color="primary" size={12} />
                                    <span className=" text-xs text-gray-300">{(10010).toLocaleString()}</span>
                                </div>


                            </div>
                            {isIr ? <ArrowUpLeft size={20} /> : <ArrowUpRight size={20} />}
                        </div>
                        <span className="font-bold text-foreground">
                            {item.title.substring(0, 12)} {item.title.length > 12 && '...'}
                        </span>

                        <p className="text-sm text-primary-foreground text-pretty">
                            {item.description.substring(0, 50)} {item.description.length > 50 && '...'}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategoryPage;
