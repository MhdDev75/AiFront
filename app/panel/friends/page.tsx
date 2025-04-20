"use client";
import { Copy, Stars } from "lucide-react";
import React, { useEffect, useState } from "react";
import friends from "@/assets/friends/friends.png";
import Image from "next/image";
import InvitedBoxComponent from "@/components/panel/InvitedBoxComponent";
import { useBackButton } from "@/core/telegram/BackButtonProvider";
import { useTranslations } from "next-intl";
import {
  getAffiliate,
  getInvitedList,
  postAffiliate,
} from "@/api/affiliateActions";
import { IAffiliateCode, IAffiliateUrl, IInvitedFriend } from "@/lib/type";
import { toast } from "react-toastify";
import { convertLocalizeDate } from "@/utils/helperClinet";

const FriendsPage = () => {
  const [tab, setTab] = useState(1);
  const { setIsVisible } = useBackButton();
  const t = useTranslations("i18n");
  const [affiliateUrl, setAffiliateUrl] = useState<IAffiliateUrl>();
  const [affiliateCode, setAffiliateCode] = useState<IAffiliateCode>();
  const [invitedFriend, setInvitedFriend] = useState<IInvitedFriend[]>();

  useEffect(() => {
    setIsVisible(true); // دکمه بازگشت را فعال کنید
    getAffiliateServer();
    postAffiliateServer();
    getInvitedServer();
  }, []);

  const shareLink = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const app = (window as any).Telegram?.WebApp;
    if (app) {
      app.openTelegramLink(`https://t.me/share/url?url=${affiliateUrl?.url}`);
    }
  };

  const copyToClipboard = (text: string | undefined) => {
    const tempInput = document.createElement("textarea");
    tempInput.value = text ? text : "";
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  };

  const handelCopy = async (value: string | undefined) => {
    try {
      copyToClipboard(value);
      toast.success("Copied!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to copy!");
    }
  };

  const getAffiliateServer = async () => {
    try {
      const response = await getAffiliate();
      setAffiliateUrl(response as IAffiliateUrl);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const getInvitedServer = async () => {
    try {
      const response = await getInvitedList();
      response.value.forEach((item: IInvitedFriend) => {
        item.dateString = convertLocalizeDate(item.date).toString();
      });
      console.log(response.value);

      setInvitedFriend(response.value as IInvitedFriend[]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const postAffiliateServer = async () => {
    try {
      const response = await postAffiliate();
      setAffiliateCode(response.value as IAffiliateCode);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err.message);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const app = (window as any).Telegram?.WebApp;

  const tablist = [
    { id: 1, title: "YourReferrals", status: true },
    { id: 2, title: "InvitedFriends", status: true },
    { id: 3, title: "LeaderBoard", status: false },
  ];

  return (
    <section className="flex flex-col h-full gap-2">
      <div className="grid grid-cols-3 h-12 gap-2 p-2 bg-base-300 rounded-full">
        {tablist.map((item) => (
          <button
            onClick={() => setTab(item.id)}
            disabled={!item.status}
            key={item.id}
            className={`btn btn-sm ${tab == item.id && "btn-primary"} 
            ${
              tab != item.id
                ? item.status == true
                  ? "bg-base-300"
                  : "bg-base-200"
                : ""
            } 
            rounded-full text-nowrap px-1`}
          >
            {t(`Friend.${item.title}`)}
          </button>
        ))}
      </div>
      {tab == tablist[0].id && (
        <div className="grid grid-cols-1 bg-base-300  items-center justify-center gap-3 p-3  h-[100%-3rem] overflow-y-auto rounded-2xl">
          <div className="flex flex-col gap-4 justify-center pb-4">
            <div className="self-center">
              <Image src={friends} alt="friends" width={250} height={250} />
            </div>
            <div className=" text-center fa-n">{t("Friend.description")}</div>
            <div className="flex flex-col justify-center items-center  self-center bg-base-100 rounded-md w-2/3 p-1 pt-2">
              <div className="text-xs">{t("Friend.InvitationCode")}</div>
              <div className="flex flex-row gap-2 items-center justify-center font-bold text-2xl text-primary">
                {affiliateCode?.code}
                <button className="p-3 rounded-custom animate-pulse">
                  <Copy
                    onClick={() => handelCopy(affiliateUrl?.url)}
                    size={20}
                  />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bold flex gap-1 items-center">
                <Stars color="yellow" size={15} />
                {t("Friend.InviteFriends")}
              </span>
              <span className="font-bold text-xs">
                {t("Friend.InviteFriendsDesc")}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bold flex gap-1 items-center">
                <Stars color="yellow" size={15} />
                {t("Friend.FreePoints")}
              </span>
              <span className="font-bold text-xs">
                {t("Friend.FreePointsDesc")}
              </span>
            </div>
          </div>
        </div>
      )}

      {tab == tablist[1].id && (
        <div className="flex flex-col gap-2 h-[100%-3rem] overflow-y-auto">
          {invitedFriend &&
            invitedFriend.map((item, index) => (
              <InvitedBoxComponent
                key={index}
                date={item.dateString}
                price={item.amount}
                title={item.firstName}
                status="موفق"
                image={item.image}
                currency={item.currency}
              />
            ))}
        </div>
      )}

      <button
        onClick={() => shareLink()}
        className="btn btn-primary w-full p-3 rounded-full animate-pulse"
      >
        {t("Friend.Share")}
      </button>
    </section>
  );
};

export default FriendsPage;
