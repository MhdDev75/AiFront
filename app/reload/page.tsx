"use client";
import React from "react";
import { useRouter } from "next/navigation";

const ReloadPage = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col h-screen main-div">
      <main className="container  mx-auto relative flex-1 overflow-y-auto px-4">
        <div className="flex flex-col gap-3   overflow-hidden h-full justify-center items-center">
          <h1 className="text-2xl">اطلاعات شما بازیابی نشد </h1>
          <button onClick={() => router.push("/")} className="btn btn-primary">
            بارگزاری مجدد
          </button>
        </div>
      </main>
    </div>
  );
};

export default ReloadPage;
