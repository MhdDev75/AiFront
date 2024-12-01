"use client";

import slide1 from "@/assets/images/welcome/slide-1.gif";
import slide2 from "@/assets/images/welcome/slide-2.gif";
import slide3 from "@/assets/images/welcome/slide-3.gif";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
// import { Icon } from "lucide-react";

const WelcomePage = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const welcome = [
    {
      id: 1,
      title: "هوش مصنوعی",
      description:
        "استقاده از تمامی قابلیت های هوش مصنوعی متل چت جی پی تی و کانورتور های عکس و ویدیو و جزو کامل ترین پکیح ها",
      url: slide1,
    },
    {
      id: 2,
      title: "سرعت بالا",
      description:
        "کیفیت حرف اول رو میزنه پس با ما همراه باشه تا بتونیم کیفیت رو به نمایش بزاریم ",
      url: slide2,
    },
    {
      id: 3,
      title: "بخش رایگان",
      description:
        "برای اینکه بتونی حس خوبی داشته باشی یه سری از بخش ها به صورت رایگام میتونی استفاده کنی پس میتونی با زدن دکمه زیر با مه همراه باشی ",
      url: slide3,
    },
  ];
  return (
    <div className="h-screen  flex items-center">
      <Carousel dir="ltr" setApi={setApi}>
        <CarouselContent className="-ml-2 md:-ml-4">
          {welcome.map((item, index) => (
            <CarouselItem className="h-full w-full p-0" key={item.id}>
                <div className="flex flex-col gap-2 items-center justify-center ">
                  <Image  src={item.url} alt={item.title} />
                  <span className="text-3xl font-semibold text-black">
                    {item.title}
                  </span>
                  <p className="text-md text-center p-6 text-gray-500 font-semibold">
                    {item.description}
                  </p>
                  {welcome.length == index + 1 && (
                    <Button size={"lg"} className=" rounded">
                      بزن بریم
                    </Button>
                  )}
                </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="py-2 w-full text-center absolute bottom-20 left-auto  text-sm text-muted-foreground">
        صفحه {current} از {count}
        {/* {Array(count).map((item)=>{
            
            <Icon className={current == item ? '':} />
        })} */}
      </div>
    </div>
  );
};

export default WelcomePage;
