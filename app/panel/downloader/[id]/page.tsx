"use client";
import { radioJavanDownloader } from "@/api/downloaderActions";
import { useBackButton } from "@/core/telegram/BackButtonProvider";
import { ILinkItems } from "@/lib/type";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const DownloaderConfirmPage = () => {
  const t = useTranslations("i18n");
  const [inputChange, setInputChange] = useState<string>("");
  const params = useParams<{ id: string }>();
  const [downloadUrl, setDownloadUrl] = useState<ILinkItems>();
  const path = usePathname();
  const { setIsVisible } = useBackButton();
  useEffect(() => {
    setIsVisible(true); // دکمه بازگشت را فعال کنید
  }, []);
  // ss

  const getLink = async (
    event: React.FormEvent<HTMLFormElement>,
    url: string
  ) => {
    event.preventDefault();
    if (!inputChange) {
      toast.error("آدرس اجباری مباشد");
      return;
    }
    console.log();
    switch (params.id) {
      case "1":
        return;
        break;
      case "2":
        const response = await radioJavanDownloader(url);
        if (response) {
          setDownloadUrl(response as ILinkItems);
        }
        break;
    }
  };

  const handelDownload = (url: string) => {
    console.log(window);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const app = (window as any).Telegram?.WebApp;
    console.log(app);
    app.downloadFile({ url: url }, path);
  };
  return (
    <section className="flex flex-col gap-3 pb-3">
      <div className="card bg-base-300 w-full shadow-xl">
        <div className="card-body ">
          <div className="label">
            <span className="label-text-alt">{t("Downloader.Input")}</span>
          </div>
          <label className="input input-bordered rounded-3xl flex items-center gap-2">
            <input
              type="url"
              className="grow "
              placeholder={t("Downloader.Input")}
              onChange={(e) => setInputChange(e.target.value)}
            />
            <button
              onClick={() => getLink}
              type="submit"
              className="btn btn-sm rounded-3xl btn-primary"
            >
              <Search size={15} />
            </button>
          </label>
        </div>
      </div>
      {downloadUrl && (
        <div className="card bg-base-300 w-full shadow-xl">
          <div className="card-body ">
            <span>{downloadUrl.title}</span>
            <div className="grid grid-cols-2 gap-3">
              {downloadUrl.media.map((item, index) => (
                <button
                  className="btn btn-primary"
                  onClick={() => handelDownload(item.url)}
                  key={index}
                >
                  {item.quality}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DownloaderConfirmPage;
