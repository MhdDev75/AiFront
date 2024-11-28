"use client";

import { LocaleSwitcher } from "@/components/LocaleSwitcher/LocaleSwitcher";
import { changeTheme } from "@/utils/helper";
import { useTranslations } from "next-intl";

const HomePage = () => {

    interface cmb {
        value: number,
        name: string
    }
    const theme: cmb[] = [
        { value: 1, name: "Light", },
        { value: 2, name: "Dark", },
        { value: 3, name: "Colorize", },
        { value: 4, name: "Minimalist", },
        { value: 5, name: "Winter", },
        { value: 6, name: "Summer", },
        { value: 7, name: "Autumn", },
        { value: 8, name: "Spring", },
    ]

    const t = useTranslations("i18n");

    return (
        <div className="h-screen grid place-items-center ">
            <h1>Home Page</h1>
            <p>This is the main content of the website.</p>
            <div className="flex flex-col gap-2">
                <h4>انتخاب تم</h4>
                <div className="grid grid-cols-3 gap-3">
                    {theme.map((item) => (
                        <button
                            key={item.value}
                            className="bg-primary rounded-md"
                            onClick={() => changeTheme(item.name.toLowerCase())}
                        >
                            {t(`Theme.${item.name}`)}
                        </button>
                    ))}
                </div>
            </div>
            <LocaleSwitcher />
        </div>
    );
};

export default HomePage;
