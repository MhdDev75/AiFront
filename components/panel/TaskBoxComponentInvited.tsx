"use client";
import { postCheckInvite } from "@/api/TaskActions";
import { CopyCheckIcon } from "lucide-react";
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
  status: string;
  currency: string;
  count: number;
}

const TaskBoxComponentInvited = ({
  id,
  title,
  description,
  image,
  price,
  status,
  currency,
  count,
}: inlineBoxProps) => {
  const t = useTranslations("i18n");
  const [loading, setLoading] = useState(false);
  const [confirmStatus, setConfirmStatus] = useState(false);
  const checkStatus = async (id: number) => {
    setLoading(true);
    const response = await postCheckInvite(id);
    if (response.isSuccess) {
      setConfirmStatus(true);
      toast.success(response.successes[0]);
      setLoading(false);
    } else {
      toast.error(response.errors[0]);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={() => checkStatus(id)}
      disabled={status == "DONE" || loading || confirmStatus}
      className="card btn btn-lg h-auto shadow-2xl  bg-base-100  flex flex-row flex-nowrap justify-between items-center p-2 rounded-full"
    >
      {loading ? (
        <span className="loading flex justify-center self-center"> </span>
      ) : (
        <>
          <div className="flex gap-3">
            <div
              className={`flex bg-gradient-to-b from-warning to-info rounded-full p-2 justify-center self-center items-center shadow-md shadow-neutral`}
            >
              {image ? (
                <Image
                  src={`data:image/jpeg;base64,${image}`}
                  alt="T"
                  width={30}
                  height={30}
                  unoptimized
                ></Image>
              ) : (
                <CopyCheckIcon color="gray" size={30} />
              )}
            </div>
            <div className="flex flex-col items-start ">
              <span className="text-sm">{title}</span>
              <span className="text-xs text-opacity-70">{description}</span>
              <span className="text-[0.6rem] text-opacity-70 text-primary">
                {t("Task.Count") + count}
              </span>
            </div>
          </div>
          <div>
            <span
              className={`btn btn-xs border-yellow-500 self-center  flex items-center  bg-base-100 text-xs text-nowrap  rounded-full`}
            >
              &#43; {price?.toLocaleString()} {t(currency)}
            </span>
          </div>
        </>
      )}
    </button>
  );
};

export default TaskBoxComponentInvited;
