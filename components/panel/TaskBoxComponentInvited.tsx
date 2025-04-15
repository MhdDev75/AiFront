"use client";
import { getImageFile, postCheckInvite } from "@/api/TaskActions";
import { CopyCheckIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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
  invited:number;
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
  invited
}: inlineBoxProps, ) => {
  const t = useTranslations("i18n");
  const [loading, setLoading] = useState(false);
  const [confirmStatus, setConfirmStatus] = useState(false);
  const [img, setImg] = useState<string>();
  const [loadingImg, setloadingImg] = useState(false);

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

  useEffect(() => {
    getImage(image);
  }, []);

  

  const getImage = async (imageId: string) => {
    setloadingImg(true);
    const imageBase64 = await getImageFile(imageId);
    setImg(imageBase64);
    setloadingImg(false);
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
              className={`flex bg-gradient-to-b from-warning to-info rounded-full justify-center self-center items-center shadow-md shadow-neutral`}
            >
              {!loadingImg ? (
                <Image
                  src={`data:image/jpeg;base64,${img}`}
                  alt={title}
                  width={30}
                  height={30}
                  unoptimized
                  className="h-12 w-12 object-cover  rounded-full"
                ></Image>
              ) : img ? (
                <CopyCheckIcon color="gray" size={30} />
              ) : (
                <span className="loading h-12 w-12 flex  rounded-full  justify-center self-center">
                </span>
              )}
            </div>
            <div className="flex flex-col items-start ">
              <span className="text-sm">{title}</span>
              <span className="text-xs text-opacity-70">{description}</span>
              <span className="text-[0.6rem] text-opacity-70 text-primary">
                {t("Task.Count") + count + "/" + invited}
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
