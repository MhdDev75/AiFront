"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { ShieldAlert, Unplug } from "lucide-react";

const ReloadPage = () => {
  const t = useTranslations("i18n");
  const params = useParams<{ id: string }>();
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen main-div">
      <main className="container  mx-auto relative flex-1 overflow-y-auto px-4">
        <div className="flex flex-col gap-5   overflow-hidden h-full justify-center items-center">

          {params.id == "1" && (
            <Unplug size={80} />)}
          {params.id == "1" && (
            <h2 className="text-xl text-center">{t("Disconnected")}</h2>)}

          {params.id == "2" && (
            <ShieldAlert size={80} />)}
          {params.id == "2" &&
            (<h2 className="text-xl text-center">{t("SessionError")}</h2>)}

          <button onClick={() => router.push("/")} className="btn btn-primary">
            {t("Reload")}
          </button>
        </div>
      </main>
    </div>
  );
};

export default ReloadPage;
