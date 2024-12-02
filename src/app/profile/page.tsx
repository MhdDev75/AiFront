"use client";

import { LocaleSwitcher } from "@/components/LocaleSwitcher/LocaleSwitcher";
import { changeTheme } from "@/utils/helper";
import { useTranslations } from "next-intl";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useTelegram } from "@/core/telegram/TelegramProvider";

const ProfilePage = () => {

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
  const { user, webApp } = useTelegram();
  console.log(user);
  
  return (
    <div className=" grid grid-rows-4 place-items-center ">
      <div>
        {user ? (
          <div>
            <h1>Welcome {user?.username}</h1>
            User data:
            <pre>{JSON.stringify(user, null, 2)}</pre>
            Eniter Web App data:
            <pre>{JSON.stringify(webApp, null, 2)}</pre>
          </div>
        ) : (
          <div>Make sure web app is opened from telegram client</div>
        )}
      </div>

      <h1>تنظیمات</h1>
      <p>صفحه ای برای تنظیم کردن اپ</p>
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="bg-primary rounded">انتخاب تم</Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>انتخاب تم</DrawerTitle>
              <DrawerDescription>
                هر رنگی رو که دوست دارید انتخاب کنید
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <div className="grid grid-cols-3 gap-3">
                {theme.map((item) => (
                  <Button
                    key={item.value}
                    className="rounded"
                    variant={"secondary"}
                    onClick={() => changeTheme(item.name.toLowerCase())}
                  >
                    {t(`Theme.${item.name}`)}
                  </Button>
                ))}
              </div>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button className="bg-red-500 rounded">{t("Cancel")}</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
      <LocaleSwitcher />
    </div>
  );
};

export default ProfilePage;
