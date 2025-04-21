"use client";
import React, { useEffect, useState } from "react";
import {
  ChartBarBig,
  Check,
  CircleUserIcon,
  Gift,
  ListTodoIcon,
  MessageCircleQuestionIcon,
  X,
} from "lucide-react";
import { convertLocalizeDate } from "@/utils/helperClinet";
// import { useTranslations } from 'next-intl'
export interface inlineBoxProps {
  title: string;
  date: Date;
  icon: string;
  price: number;
  type: string;
  status: string;
  currency: string;
}

const getIcon = (icon: string) => {
  switch (icon) {
    case "X":
      return <X />;
    case "Check":
      return <Check />;
    case "CircleUser":
      return <CircleUserIcon />;
    case "GIFT":
      return <Gift />;
    case "CHAT":
      return <ChartBarBig />;
    case "USER_TASK":
      return <ListTodoIcon />;
    default:
      return <MessageCircleQuestionIcon />;
  }
};

const InlineBoxComponent = ({
  title,
  date,
  icon,
  price,
  type,
  status,
  currency,
}: inlineBoxProps) => {
  // const t = useTranslations("i18n")
  const [convertDate, setConvertDate] = useState<string>();
  const [string, setString] = useState<{ symbol: string; color: string }>();
  useEffect(() => {
    const res = convertLocalizeDate(date);
    setConvertDate(res.toString());
    getTypeColorAndStatus(type);
  }, []);

  const getTypeColorAndStatus = (type: string) => {
    console.log(type);

    switch (type) {
      case "X":
        setString({ symbol: "-", color: "text-error" });
        break;
      case "GIFT":
        setString({ symbol: "+", color: "text-success" });
        break;
      case "CHAT":
        console.log("ss");
        setString({ symbol: "-", color: "text-error" });
        break;
      case "USER_TASK":
        setString({ symbol: "+", color: "text-success" });
        break;
      default:
        setString({ symbol: "+", color: "text-success" });
        break;
    }
  };

  return (
    <div className="card bg-base-300 shadow flex flex-row flex-nowrap justify-between items-center p-2 rounded-full">
      <div className="flex gap-2">
        <div
          className={`${
            status == "ADVICE" ? "bg-success" : "bg-error"
          } h-14 w-14 rounded-full  flex justify-center items-center`}
        >
          {getIcon(icon)}
        </div>
        <div className="flex flex-col gap-2">
          <span>{title}</span>
          <span className="text-sm text-secondary">{convertDate}</span>
        </div>
      </div>
      <div>
        <span
          className={`${
            string && string.color
          } text-md text-nowrap font-bold px-3 `}
        >
          {}
          {string &&
            string.symbol + " " + price.toLocaleString()}{" "}
          {currency}
        </span>
      </div>
    </div>
  );
};

export default InlineBoxComponent;
