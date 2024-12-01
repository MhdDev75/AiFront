"use client";

import slide1 from "@/assets/images/welcome/slide-1.gif";
import slide2 from "@/assets/images/welcome/slide-2.gif";
import slide3 from "@/assets/images/welcome/slide-3.gif";
import slide4 from "@/assets/images/welcome/slide-4.gif";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bolt, CirclePlay } from "lucide-react";
import { Page } from "@/components/telegram/Page";
// import { Icon } from "lucide-react";

const WelcomePage = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [count, setCount] = useState(0);

  const router = useRouter();
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
        "استقاده از تمامی قابلیت های هوش مصنوعی مثل چت جی پی تی و ویرایشگر های عکس و ویدیو و جزو کامل ترین پکیح ها",
      url: slide1,
      color: "bg-sky-400",
    },
    {
      id: 2,
      title: "سرعت بالا",
      description:
        "کیفیت حرف اول رو میزنه پس با ما همراه باشه تا بتونیم کیفیت رو به نمایش بزاریم ",
      url: slide2,
      color: "bg-purple-400",
    },
    {
      id: 3,
      title: "بخش رایگان",
      description:
        "برای اینکه بتونی حس خوبی داشته باشی یه سری از بخش ها به صورت رایگام میتونی استفاده کنی پس میتونی با زدن دکمه زیر با مه همراه باشی ",
      url: slide3,
      color: "bg-green-400",
    },
    {
      id: 4,
      title: "!بزن بریم",
      description: "دکمه زیر منتظر توئه ",
      url: slide4,
      color: "bg-pink-400",
    },
  ];
  return (
    <Page back={false}>
      <section
        className={`${
          welcome.find((x) => x.id === current)?.color
        }  flex-col justify-center content-center  items-center h-full`}
      >
        <Carousel dir="ltr" setApi={setApi}>
          <CarouselContent className="mx-0 md:-mx-0">
            {welcome.map((item, index) => (
              <CarouselItem className="h-full w-full p-0" key={item.id}>
                {welcome.length == index + 1 ? (
                  <div className="flex flex-col gap-2 items-center  justify-center ">
                    <span className="relative flex ">
                      <Image src={item.url} alt={item.title} />
                      <span className="absolute -z-10  shadow-lg  m-auto left-0 right-0 top-0 bottom-0 h-52 w-52 rounded-full bg-white opacity-35"></span>
                      <span className="absolute -z-20 shadow-lg  m-auto left-0 right-0 top-0 bottom-0 h-72 w-72 rounded-full bg-white opacity-25"></span>
                      <span className="absolute -z-30 shadow-lg  m-auto left-0 right-0 top-0 bottom-0 h-96 w-96 rounded-full bg-white opacity-35"></span>
                    </span>
                    <span className="text-3xl font-semibold text-white">
                      {item.title}
                    </span>
                    <p className="text-sm text-center p-6 text-white font-semibold">
                      {item.description}
                    </p>
                    <CirclePlay
                      color="white"
                      onClick={() => router.push("/home")}
                      className="flex justify-center items-center rounded-full drop-shadow-xl "
                      size={100}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 items-center justify-center ">
                    <span className="relative flex ">
                      <Image src={item.url} alt={item.title} />
                      <span className="absolute -z-10  shadow-lg  m-auto left-0 right-0 top-0 bottom-0 h-52 w-52 rounded-full bg-white opacity-35"></span>
                      <span className="absolute -z-20 shadow-lg  m-auto left-0 right-0 top-0 bottom-0 h-72 w-72 rounded-full bg-white opacity-25"></span>
                      <span className="absolute -z-30 shadow-lg  m-auto left-0 right-0 top-0 bottom-0 h-96 w-96 rounded-full bg-white opacity-35"></span>
                    </span>

                    <span className="text-3xl font-semibold text-white">
                      {item.title}
                    </span>
                    <p className="text-sm text-center p-6 text-white font-semibold">
                      {item.description}
                    </p>
                  </div>
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        {welcome.length !== current && (
          <div className="grid grid-cols-1 ">
            {/* <div className="w-full flex ps-5">
          <div
            className="bg-yellow-400 flex justify-center items-center h-20 w-20 rounded-full shadow-lg"
            onClick={() => api && setCurrent(api.selectedScrollSnap() + 1)}
          >
            <ChevronRight color="white" size={50} />
          </div>
        </div> */}
            <div className="flex flex-row-reverse items-center justify-center">
              {welcome.map((item, index) => (
                <Bolt
                  size={20}
                  color="white"
                  className={`${
                    item.id === current ? "opacity-100" : "opacity-50"
                  }`}
                  key={index}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </Page>
  );
};

export default WelcomePage;

<style></style>;
