"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const DownloaderPage = () => {
  const Downloader = [
    { id: 1, title: "You Tube" , imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/YouTube_full-color_icon_%282024%29.svg/220px-YouTube_full-color_icon_%282024%29.svg.png"},
    { id: 2, title: "Radio Javan", imageUrl:"https://upload.wikimedia.org/wikipedia/fa/thumb/7/77/Radio_javan_official_logo.png/220px-Radio_javan_official_logo.png" },
    { id: 3, title: "Udemy" , imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Udemy_logo.svg/250px-Udemy_logo.svg.png"},
    { id: 4, title: "Instagram" , imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/100px-Instagram_logo_2022.svg.png"},
    { id: 5, title: "Instagram" , imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/100px-Instagram_logo_2022.svg.png"},
    { id: 6, title: "Instagram" , imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/100px-Instagram_logo_2022.svg.png"},
  ];
  const router = useRouter()
  return (
    <section className="flex flex-col gap-3 pb-3">
      <div className="grid grid-cols-3 gap-3">
        {Downloader.map((item) => (
          <button
          onClick={()=>router.push(`/panel/downloader/${item.id}`)}
            className="btn btn-lg h-auto btn-neutral flex flex-col rounded-3xl gap-8 p-3"
            key={item.id}
          >
            <Image src={item.imageUrl} alt={item.title} width={80} height={80} className="rounded-3xl bg-slate-400 h-20 p-3 object-contain"/>
            <span className="font-bold">{item.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default DownloaderPage;
