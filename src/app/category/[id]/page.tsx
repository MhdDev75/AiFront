"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
// import { useTranslations } from "next-intl";
import { useBackButton } from "@/core/telegram/BackButtonProvider";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CategoryPage = ({ params: { id } }: any) => {
    console.log(id);


    const router = useRouter();

    console.log(router);

    // const t = useTranslations("i18n");
    const { setIsVisible } = useBackButton();

    useEffect(() => {
        setIsVisible(true); // دکمه بازگشت را فعال کنید
    }, []);

    return (
        <section className="px-5 h-full bg-gradient-to-b from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
            {/* <div className="h-full flex flex-col justify-center  items-center gap-1 backdrop-blur-sm text-center">
                <span className="relative flex justify-center items-center h-52 w-52">
                    <Image src={icon} alt="welcome" width={120} />
                    <span className=" absolute -z-20 shadow-lg  m-auto left-0 right-0 top-0 bottom-0 h-3/4 w-3/4 rounded-full bg-white opacity-25"></span>
                    <span className=" absolute -z-30 shadow-lg  m-auto left-0 right-0 top-0 bottom-0 h-4/4 w-4/4 rounded-full bg-white opacity-35"></span>
                    <span className="animate-ping absolute -z-30 shadow-lg  m-auto left-0 right-0 top-0 bottom-0  h-3/4 w-3/4  rounded-full bg-white opacity-35"></span>
                </span>
                <h1 className="text-2xl text-white font-extrabold text-center">
                    {t("welcome")}
                </h1>

                <div className="flex flex-col items-center justify-center w-full gap-3 absolute bottom-24 ">
                    <div style={styles.progressBarContainer}>
                        <div
                            className="bg-primary "
                            style={{ ...styles.progressBar, width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div> */}
        </section>
    );
};

export default CategoryPage;
