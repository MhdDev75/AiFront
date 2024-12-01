"use client";
import {
  Coins,
  Gamepad,
  Home,
  ListTodo,
  Users,
  WalletMinimal,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  const footerButton = [
    { id: 1, name: "خانه", icon: <Home size={26} />, pathName: "/" },
    { id: 2, name: "ماموریت", icon: <ListTodo size={26} />, pathName: "/task" },
    { id: 3, name: "بازی‌ها", icon: <Gamepad size={26} />, pathName: "/games" },
    { id: 4, name: "دوستان", icon: <Users size={26} />, pathName: "/friends" },
    {
      id: 5,
      name: "کیف پول",
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
          <div className="grid grid-cols-5 text-gray-500  rounded-2xl m-2 z-10 bg-slate-900 bg-opacity-50 shadow-sm shadow-gray-500/45  text-center">
            {footerButton.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  handelClickRoute(item.pathName);
                }}
                className={`${
                  item.pathName === pathname && "bg-slate-900 text-white"
                } p-1 py-2 rounded-2xl flex flex-col gap-1 items-center justify-center`}
              >
                {item.icon}
                <h3 className="text-sm">{item.name}</h3>
              </button>
            ))}
          </div>
        </footer>
      )}
    </>
  );
}

export default Footer;