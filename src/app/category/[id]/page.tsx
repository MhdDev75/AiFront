/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { useTranslations } from "next-intl";
import { useBackButton } from "@/core/telegram/BackButtonProvider";
import { ICategoryProps } from "@/lib/type";
import seed from "@/seeds/mockdata.json"
import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { useLocale } from "next-intl";
import { locales } from "@/core/i18n/config";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CategoryPage = ({ params: { id } }: any) => {
    const router = useRouter();
    const locale = useLocale();
    const isIr = locale == locales[0] ? true : false;
    console.log(router);
    // const t = useTranslations("i18n");
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
            {data?.items.title}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6  gap-2">
                {data?.items.itemList.map((item: any) => (
                    <div key={item.id} className="bg-secondary flex flex-col gap-2 rounded-custom">
                        <div className="flex flex-row justify-between">
                            <div className="p-2 rounded-full bg-slate-800 bg-opacity-35">
                                <Image src={item.imgUrl} width={40} height={40} className="rounded-custom" alt={item.title} />
                            </div>
                            {isIr ? <ArrowUpLeft size={20} /> : <ArrowUpRight size={20} />}
                        </div>
                        <span className="font-bold">{item.title}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategoryPage;
