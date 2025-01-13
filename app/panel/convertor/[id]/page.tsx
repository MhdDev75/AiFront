"use client";
import { useBackButton } from "@/core/telegram/BackButtonProvider";
import { IMeasuresValue } from "@/lib/type";
import configureMeasurements from "convert-units";
import allMeasures from "convert-units/definitions/all";
import { Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ConvertorParamPage = () => {
  const t = useTranslations("i18n");
  const [selectedValue, setSelectedValue] = useState<string>("1");
  const [input, setInput] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const params = useParams<{ id: string }>();
  const convert = configureMeasurements(allMeasures);
  const cmb = convert().possibilities(params.id);

  const [list, setList] = useState<IMeasuresValue[]>();
  const handelClick = () => {
    setLoading(true);
    const filter = cmb.filter((item) => item !== selectedValue);
    const fillList: IMeasuresValue[] = [];
    filter.map((item, index) => {
      const i: IMeasuresValue = {
        id: index + 1,
        name: item,
        value: convert(input).from(selectedValue).to(item),
      };
      fillList.push(i);
    });
    setList(fillList);
    setLoading(false);
  };

  const { setIsVisible } = useBackButton();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const copyToClipboard = (text: string) => {
    const tempInput = document.createElement("textarea");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  };

  const handelCopy = async (value: string) => {
    try {
      copyToClipboard(value);
      toast.success("Copied!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to copy!");
    }
  };
  return (
    <section className="flex flex-col gap-3 pb-3">
      <h3 className="text-2xl font-bold pb-3">{t(`Convertor.${params.id}`)}</h3>
      <div className="card bg-base-300 flex flex-col gap-3  shadow-xl p-3">
        <div className="flex flex-row flex-nowrap gap-1 items-center w-full">
          <select
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
            className="select select-bordered border-primary w-full max-w-xs"
          >
            <option disabled value="1">
              واحد
            </option>
            {cmb.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <input
            type="number"
            onChange={(e) => setInput(Number(e.target.value))}
            inputMode="decimal"
            placeholder="مقدار را وارد نمایید"
            className="input input-bordered border-primary max-w-xs"
          />
        </div>
        <button
          onClick={() => handelClick()}
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? <span className="loading"> </span> : "تبدیل"}
        </button>
      </div>
      {list && list?.length > 0 && (
        <div className="card bg-base-300  shadow-xl p-3">
          {list.map((item) => (
            <label key={item.id} className="form-control w-full">
              <div className="label">
                <span className="label-text font-bold text-lg">
                  {item.name}
                </span>
              </div>
              <label className="input input-bordered flex items-center gap-2 border-secondary">
                <input
                  readOnly
                  type="text"
                  value={item.value.toLocaleString()}
                  className="grow"
                />
                <Copy
                  color="purple"
                  onClick={() => handelCopy(item.value.toString())}
                />
              </label>
            </label>
          ))}
        </div>
      )}
    </section>
  );
};

export default ConvertorParamPage;
