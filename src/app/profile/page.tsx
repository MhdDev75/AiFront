"use client";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useTelegram } from "@/core/telegram/TelegramProvider";
import { useBackButton } from "@/core/telegram/BackButtonProvider";
import { useEffect } from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Locale } from "@/core/i18n/types";
import { setLocale } from "@/core/i18n/locale";
import {  localesMap, regionsMap } from "@/core/i18n/config";

const ProfilePage = () => {


  const hasLocale = useLocale();
  const t = useTranslations("i18n");
  const { user } = useTelegram();
  const { setIsVisible } = useBackButton();

  const onChange = (value: string) => {
    const locale = value as Locale;
    setLocale(locale);
  };

  useEffect(() => {
    setIsVisible(true); // دکمه بازگشت را فعال کنید
  }, []);

  console.log(user);

  return (
    <section className="flex flex-col gap-2 px-4">
      <div>
        {user && (
          <div className="flex flex-col gap-2">
             <Image src={user?.photo_url} width={70} height={70} className="rounded-full" alt="Avatar" />
             <span>{t("profile.Welcome")} </span>
            <span className="font-bold text-xl">{user?.first_name + " " + user?.last_name}</span>
            <span className="text-muted">{user?.username}</span>
         

          </div>
        ) }
      </div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>{t("profile.UserInfo")}اطلاعات فردی</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-1">
              <div className="flex flex-row justify-between">
                <div>{t("profile.Name")}</div>
                <div>{user?.first_name}</div>
              </div>
              <div className="flex flex-row justify-between">
                <div>{t("profile.LastName")}</div>
                <div>{user?.last_name}</div>
              </div>
              <div className="flex flex-row justify-between">
                <div>{t("profile.PhoneNumber")}</div>
                <div>**********</div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>{t("profile.Language")}</AccordionTrigger>
          <AccordionContent>
           {localesMap.map((item)=>(
            <Button variant={hasLocale == item.key ? "destructive" :"ghost"} onClick={()=>onChange(item.key)}  key={item.key}>{t(`profile.${item.title}`)}{}</Button>
           ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>{t("profile.Region")}</AccordionTrigger>
          <AccordionContent>
           {regionsMap.map((item)=>(
            <Button onClick={()=>onChange(item.key)} variant={"default"} key={item.key}>{t(`profile.${item.title}`)}{}</Button>
           ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <Button variant="destructive">حذف حساب کاربری</Button>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default ProfilePage;
