"use client";
import { IMeasures } from "@/lib/type";
import { Logs } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import configureMeasurements from "convert-units";
import allMeasures from "convert-units/definitions/all";
import { useTranslations } from "next-intl";
import { useBackButton } from "@/core/telegram/BackButtonProvider";
const ConvertorPage = () => {
  const t = useTranslations("i18n");
  const convert = configureMeasurements(allMeasures);
  const measures = convert().measures();
  const measureList: IMeasures[] = [];
  measures.map((item, index) => {
    const measure: IMeasures = {
      id: index + 1,
      name: item,
      icon: <Logs />,
    };
    measureList.push(measure);
  });

  const { setIsVisible } = useBackButton();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const router = useRouter();
  return (
    <section className="flex flex-col gap-2 pb-3">
      {measureList.map((item) => (
        <button
          onClick={() => router.push(`/panel/convertor/${item.name}`)}
          className="btn btn-primary flex justify-between rounded-3xl"
          key={item.id}
        >
          {t(`Convertor.${item.name}`)}
          {item.icon}
        </button>
      ))}
    </section>
  );
};

export default ConvertorPage;
