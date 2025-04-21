"use client";
import { getRegion, postUserRegion } from "@/api/userActions";
import { locales } from "@/core/i18n/config";
import { setLocale } from "@/core/i18n/locale";
import { IRegion } from "@/lib/type";
import { setRegion } from "@/utils/helper";
import { CheckCircle, Circle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const RegionPage = () => {
  const router = useRouter();

  useEffect(() => {
    getRegionClient();
  }, []);

  const [isActive, setIsActive] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [regionServer, setRegionServer] = useState<IRegion[]>();
  const t = useTranslations("i18n");
  const handleRegion = () => {
    if (regionServer) {
      const regionName = isActive == 1 ? locales[0] : locales[1];

      if (regionName) {
        postRegion(regionName);
      }
    }
  };

  const getRegionClient = async () => {
    setLoading(true);
    const response = await getRegion();
    if (response.isSuccess) {
      setRegionServer(response.value);
      setLoading(false);
    } else {
      toast.error(response.message);
      setLoading(false);
    }
  };
  const postRegion = async (region: string) => {
    setLoading(true);
    if (isActive) {
      const response = await postUserRegion(isActive);
      if (response.isSuccess) {
        setRegion(region);
        setLocale(region);
        toast.success(response.successes);
        router.push("/welcome");
        setLoading(false);
      } else {
        toast.error(response.message);
        setLoading(false);
      }
    } else {
      toast.error(t("Required"));
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen main-div">
      <main className="container flex flex-col gap-3 justify-center items-center mx-auto relative flex-1 overflow-y-auto px-4">
        <div className="flex flex-col gap-3 w-full">
          <span className="text-lg"> {t("SelectedRegion")}</span>
          {regionServer &&
            regionServer.map((item) => (
              <button
                onClick={() => setIsActive(item.id)}
                className={`btn w-full flex flex-row justify-between items-center text-lg ${
                  item.id === isActive ? " btn-success" : "btn-outline"
                } `}
                key={item.id}
              >
                {item.id === isActive ? (
                  <CheckCircle size={22} />
                ) : (
                  <Circle size={22} />
                )}
                {item.name}
              </button>
            ))}
        </div>
        <div className="absolute bottom-10 px-4 w-full">
          <button
            disabled={loading}
            onClick={() => handleRegion()}
            className="btn btn-primary w-full "
          >
            {loading ? <span className="loading loading-spinner"></span> : ""}
            {t("Confirm")}
          </button>
        </div>
      </main>
    </div>
  );
};

export default RegionPage;
