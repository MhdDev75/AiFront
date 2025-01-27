"use client";
import { postExternalLink } from "@/api/TaskActions";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";
export interface inlineBoxProps {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  status: boolean;
  currency: string;
  url: string;
  platformType: string;
}

const TaskBoxComponentExternal = ({
  id,
  title,
  description,
  image,
  price,
  status,
  currency,
  url,
}: inlineBoxProps) => {
  const t = useTranslations("i18n");

  const [loading, setLoading] = useState(false);
  const [confirmStatus, setConfirmStatus] = useState(false);

  const goToLink = async (url: string, id: number) => {
    setLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const app = (window as any).Telegram?.WebApp;
    if (app) {
      app.openLink(url);

      const response = await postExternalLink(id);
      if (response.isSuccess) {
        setConfirmStatus(true);
        toast.success(response.successes[0]);
        setLoading(false);
      } else {
        toast.error(response.errors[0]);
        setLoading(false);
      }
    }
  };

  return (
    <button
      onClick={() => goToLink(url, id)}
      disabled={!status || loading || confirmStatus}
      className="card btn btn-lg shadow-2xl  bg-base-100  flex flex-row flex-nowrap justify-between items-center p-2 rounded-full"
    >
      {loading ? (
        <span className="loading flex justify-center self-center"> </span>
      ) : (
        <>
          <div className="flex gap-3">
            <div
              className={`flex bg-gradient-to-b from-warning to-info rounded-full p-2 justify-center self-center items-center shadow-md shadow-neutral`}
            >
              <Image src={image} alt={title} width={30} height={30}></Image>
            </div>
            <div className="flex flex-col items-start gap-2">
              <span className="text-sm">{title}</span>
              <span className="text-xs text-opacity-70">{description}</span>
            </div>
          </div>
          <div>
            <span
              className={`btn btn-xs border-yellow-500 bg-base-100 text-xs text-nowrap  rounded-full`}
            >
              + {price.toLocaleString()} {t(currency)}
            </span>
          </div>
        </>
      )}
    </button>
  );
};

export default TaskBoxComponentExternal;
