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
  useEffect(() => {
    const res = convertLocalizeDate(date);
    setConvertDate(res.toString());
  }, []);

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
            status == "ADVICE" ? "text-success" : "text-error"
          } text-md text-nowrap font-bold px-3 `}
        >
          {(type == "پرداختی" ||
          type == "GIFT" ||
          type == "USER_TASK" ||
          type == "CHAT"
            ? "+"
            : "-") +
            " " +
            price.toLocaleString()}{" "}
          {currency}
        </span>
      </div>
    </div>
  );
};

export default InlineBoxComponent;
