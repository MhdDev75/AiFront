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
import { localesMap, regionsMap } from "@/core/i18n/config";
import { Flag, Languages, LetterText, LucideUserRoundCheck, Palette } from "lucide-react";

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

  return (
    <section className="flex flex-col gap-2 px-4">
      <div className="bg-muted bg-opacity-45 rounded-md p-3">
        {user && (
          <div className="flex flex-row gap-2">
            <Image src={user?.photo_url} width={70} height={70} className="rounded-md border-1 border-sky-400" alt="Avatar" />
            <div className="flex flex-col gap-2">
              <span className="font-bold text-xl">{user?.first_name + " " + user?.last_name}</span>
              <span className="text-muted">{user?.username}</span>
            </div>
          </div>
        )}
      </div>
      <div className="bg-muted bg-opacity-45 rounded-md px-3">
        <Accordion type="single" className="w-full" collapsible >
          <AccordionItem value="item-1" className="border-none py-0">
            <AccordionTrigger><span className="flex flex-row gap-2 items-center border-none">
              <div className="p-2 rounded-md bg-primary bg-opacity-35">
                <LucideUserRoundCheck size={20} />
              </div>
              {t("Profile.UserInfo")}</span></AccordionTrigger>
            <AccordionContent className="bg-slate-800 bg-opacity-60 rounded-md p-3">
              <div className="flex flex-col gap-3">
                <div className="flex flex-row justify-between">
                  <div>{t("Profile.Name")}</div>
                  <div>{user?.first_name}</div>
                </div>
                <div className="flex flex-row justify-between">
                  <div>{t("Profile.LastName")}</div>
                  <div>{user?.last_name}</div>
                </div>
                <div className="flex flex-row justify-between">
                  <div>{t("Profile.PhoneNumber")}</div>
                  <div>**********</div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-none  py-0">
            <AccordionTrigger><span className="flex flex-row gap-2 items-center">
              <div className="p-2 rounded-md bg-primary bg-opacity-35">
                <Languages size={20} />
              </div>
              {t("Profile.Language")}</span></AccordionTrigger>
            <AccordionContent className="bg-slate-800 bg-opacity-60 rounded-md p-3">
              <div className="flex flex-row gap-2">
                {localesMap.map((item) => (
                  <Button className={`${hasLocale != item.key ? "bg-gray-500" : "bg-sky-500"} bg-opacity-35 `} onClick={() => onChange(item.key)} key={item.key}>{t(`Profile.${item.title}`)}{ }</Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-none  py-0">
            <AccordionTrigger><span className="flex flex-row gap-2 items-center">
              <div className="p-2 rounded-md bg-primary bg-opacity-35">
                <Flag size={20} />
              </div>
              {t("Profile.Region")}</span></AccordionTrigger>
            <AccordionContent className="bg-slate-800 bg-opacity-60 rounded-md p-3">
              <div className="flex flex-row gap-2">
                {regionsMap.map((item) => (
                  <Button onClick={() => onChange(item.key)} className="bg-sky-500 rounded-md" key={item.key}>{t(`Profile.${item.title}`)}{ }</Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem disabled value="item-4" className="border-none py-0">
            <AccordionTrigger>
              <span className="flex flex-row gap-2 items-center">
                <div className="p-2 rounded-md bg-secondary bg-opacity-35">
                  <Palette size={20} />
                </div>
                {t("Profile.Theme")}
                <span className="bg-primary p-1 rounded-md bg-opacity-50 text-xs ">بزودی</span>
              </span>
            </AccordionTrigger>
          </AccordionItem>
          <AccordionItem disabled value="item-5" className="border-none  py-0">
            <AccordionTrigger disabled>
              <span className="flex flex-row disabled:text-secondary gap-2 items-center">
                <div className="p-2 rounded-md bg-secondary bg-opacity-35">
                  <LetterText size={20} />
                </div>
                {t("Profile.FontSize")}
                <span className="bg-primary p-1 rounded-md bg-opacity-50 text-xs ">بزودی</span>
              </span>
            </AccordionTrigger>
          </AccordionItem>
          <AccordionItem value="item-6" className="flex justify-center items-center p-3 border-none">
            <Button className="bg-red-600 bg-opacity-70 rounded-md" variant="destructive">{t("Profile.DeleteAccount")}</Button>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default ProfilePage;
