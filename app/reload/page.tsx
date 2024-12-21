"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const ReloadPage = () => {
  const t= useTranslations("i18n");
  const router = useRouter();
  return (
    <div className="flex flex-col h-screen main-div">
      <main className="container  mx-auto relative flex-1 overflow-y-auto px-4">
        <div className="flex flex-col gap-3   overflow-hidden h-full justify-center items-center">
          <h1 className="text-2xl">{t("ReloadError")}</h1>
          <button onClick={() => router.push("/")} className="btn btn-primary">
            {t("Reload")}
          </button>
        </div>
      </main>
    </div>
  );
};

export default ReloadPage;
