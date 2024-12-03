/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { useTranslations } from "next-intl";
import { useBackButton } from "@/core/telegram/BackButtonProvider";
import { ICategoryProps } from "@/lib/type";
import seed from "@/seeds/mockdata.json"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CategoryPage = ({ params: { id } }: any) => {
    console.log(id);


    const router = useRouter();

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
        <section className="px-5 h-full bg-gradient-to-b from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
            {data?.items.title}
            {data?.items.itemList.map((item: any) => (
                <div key={item.id}>{item.title}</div>
            ))}
        </section>
    );
};

export default CategoryPage;
