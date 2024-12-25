"use client";
import { useBackButton } from "@/core/telegram/BackButtonProvider";
import { ILinkItems } from "@/lib/type";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const DownloaderConfirmPage = () => {
  const t = useTranslations("i18n");
  const params = useParams<{ id: string }>();
  const [downloadUrl, setDownloadUrl] = useState<ILinkItems>();
  const path = usePathname();
  const { setIsVisible } = useBackButton();
  useEffect(() => {
    setIsVisible(true); // دکمه بازگشت را فعال کنید
  }, []);
  // ss
  const downloader: ILinkItems[] = [
    {
      id: 1,
      title: "لینک دانلود فلان",
      linkList: [
        {
          id: 1,
          title: "کیقیت 320",
          url: "https://www.shutterstock.com/shutterstock/photos/2…-alphabet-small-letter-logo-design-2127237626.jpg",
        },
        {
          id: 2,
          title: "کیقیت 220",
          url: "https://www.shutterstock.com/shutterstock/photos/2…-alphabet-small-letter-logo-design-2127237626.jpg",
        },
      ],
    },
    {
      id: 2,
      title: "لینک دانلود فلان",
      linkList: [
        {
          id: 1,
          title: "کیقیت 320",
          url: "https://www.shutterstock.com/shutterstock/photos/2…-alphabet-small-letter-logo-design-2127237626.jpg",
        },
        {
          id: 2,
          title: "کیقیت 220",
          url: "https://www.shutterstock.com/shutterstock/photos/2…-alphabet-small-letter-logo-design-2127237626.jpg",
        },
      ],
    },
    {
      id: 3,
      title: "لینک دانلود فلان",
      linkList: [
        {
          id: 1,
          title: "کیقیت 320",
          url: "https://www.shutterstock.com/shutterstock/photos/2…-alphabet-small-letter-logo-design-2127237626.jpg",
        },
        {
          id: 2,
          title: "کیقیت 220",
          url: "https://www.shutterstock.com/shutterstock/photos/2…-alphabet-small-letter-logo-design-2127237626.jpg",
        },
      ],
    },
    {
      id: 4,
      title: "لینک دانلود فلان",
      linkList: [
        {
          id: 1,
          title: "کیقیت 320",
          url: "https://www.shutterstock.com/shutterstock/photos/2…-alphabet-small-letter-logo-design-2127237626.jpg",
        },
        {
          id: 2,
          title: "کیقیت 220",
          url: "https://www.shutterstock.com/shutterstock/photos/2…-alphabet-small-letter-logo-design-2127237626.jpg",
        },
      ],
    },
  ];

  const getLink = async (
    event: React.FormEvent<HTMLFormElement>,
    id: string
  ) => {
    const link: ILinkItems | undefined = await downloader.find(
      (x) => x.id == Number(id)
    );
    if (link) {
      setDownloadUrl(link);
    }
  };

  const handleSubmitWrapper =
    (additionalParam: string) => (event: React.FormEvent<HTMLFormElement>) => {
      getLink(event, additionalParam);
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
          <form onSubmit={() => handleSubmitWrapper(params.id)}>
            <div className="label">
              <span className="label-text-alt">{t("Downloader.Input")}</span>
            </div>
            <label className="input input-bordered rounded-3xl flex items-center gap-2">
              <input
                type="url"
                className="grow "
                placeholder={t("Downloader.Input")}
              />
              <button
                type="submit"
                className="btn btn-sm rounded-3xl btn-primary"
              >
                <Search size={15} />
              </button>
            </label>
          </form>
        </div>
      </div>
      {downloadUrl && (
        <div className="card bg-base-300 w-full shadow-xl">
          <div className="card-body ">
            <span>{downloadUrl.title}</span>
            <div className="grid grid-cols-2 gap-3">
              {downloadUrl.linkList.map((item) => (
                <button
                  className="btn btn-primary"
                  onClick={() => handelDownload(item.url)}
                  key={item.id}
                >
                  {item.title}
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
