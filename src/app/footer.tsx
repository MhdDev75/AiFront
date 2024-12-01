"use client";
import {
  Home,
  ListTodo,
  Settings,
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
    { id: 1, name: "Home", icon: <Home size={26} />, pathName: "/home" },
    { id: 2, name: "Task", icon: <ListTodo size={26} />, pathName: "/task" },
    { id: 3, name: "Setting", icon: <Settings size={26} />, pathName: "/profile" },
    { id: 4, name: "Friends", icon: <Users size={26} />, pathName: "/friends" },
    {
      id: 5,
      name: "Wallet",
      icon: <WalletMinimal size={26} />,
      pathName: "/wallet",
    },
  ];

  function handelClickRoute(path: string) {
    router.push(path);
  }

  return (
    <>
      {pathname !== "/" && pathname !== "/welcome" && (
        <footer className="p-2">
          <div className="grid grid-cols-5 text-gray-500  rounded-custom m-2 z-10 bg-slate-900 bg-opacity-50 shadow-sm shadow-gray-500/45  text-center">
            {footerButton.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  handelClickRoute(item.pathName);
                }}
                className={`${item.pathName === pathname && "bg-slate-900 text-white"
                  } p-1 py-2 rounded-custom flex flex-col gap-1 items-center justify-center`}
              >
                {item.icon}
                <h3 className="text-sm">{t(`Footer.${item.name}`)}</h3>
              </button>
            ))}
          </div>
        </footer>
      )}
    </>
  );
}

export default Footer;
