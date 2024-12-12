"use client";
import {
  Home,
  ListTodo,
  User,
  Users,
  WalletMinimal,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("i18n")

  const footerButton = [
    { id: 1, name: "Home", icon: <Home size={26} />, pathName: "/panel/home" },
    { id: 2, name: "Tasks", icon: <ListTodo size={26} />, pathName: "/panel/tasks" },
    {
      id: 3,
      name: "Wallet",
      icon: <WalletMinimal size={26} />,
      pathName: "/panel/wallet",
    },
    { id: 4, name: "Friends", icon: <Users size={26} />, pathName: "/panel/friends" },
    { id: 5, name: "Setting", icon: <User size={26} />, pathName: "/panel/profile" },
  ];

  function handelClickRoute(path: string) {
    console.log(path);
    router.push(path);
  }

  return (
    <>
      {pathname !== "/" && pathname !== "/welcome" && (
        <footer className="h-16 bg-base-300 ">
          <div className="grid grid-cols-5   rounded-md  z-10 bg-opacity-50 shadow-sm   text-center">
            {footerButton.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  handelClickRoute(item.pathName);
                }}
                className={`btn btn-lg ${item.pathName === pathname && " text-primary"
                  } rounded-none`}
              >
                <div className="flex flex-col gap-1 items-center justify-center">
                  {item.icon}
                  <h3 className="text-xs text-nowrap">{t(`Footer.${item.name}`)}</h3>
                </div>
              </button>
            ))}
          </div>
        </footer>
      )}
    </>
  );
}

export default Footer;
