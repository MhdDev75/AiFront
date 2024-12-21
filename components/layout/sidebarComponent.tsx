"use client";
import { Home, ListTodo, User, Users, WalletMinimal } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

function SidebarComponent() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("i18n");

  const footerButton = [
    { id: 1, name: "Home", icon: <Home size={26} />, pathName: "/panel/home" },
    {
      id: 2,
      name: "Tasks",
      icon: <ListTodo size={26} />,
      pathName: "/panel/tasks",
    },
    {
      id: 3,
      name: "Wallet",
      icon: <WalletMinimal size={26} />,
      pathName: "/panel/wallet",
    },
    {
      id: 4,
      name: "Friends",
      icon: <Users size={26} />,
      pathName: "/panel/friends",
    },
    {
      id: 5,
      name: "Setting",
      icon: <User size={26} />,
      pathName: "/panel/profile",
    },
  ];

  function handelClickRoute(path: string) {
    router.push(path);
  }

  return (
    <div className="drawer-side h-full hidden">
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        {/* Sidebar content here */}
        {footerButton.map((item) => (
          <li className="flex justify-start " key={item.id}>
            <button
              onClick={() => {
                handelClickRoute(item.pathName);
              }}
              className={`btn w-full  text-start btn-lg ${
                item.pathName === pathname && " text-primary"
              } rounded-none`}
            >
              <div className="flex flex-row gap-1 items-center justify-center">
                {item.icon}
                <h3 className="text-xs text-nowrap">
                  {t(`Footer.${item.name}`)}
                </h3>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SidebarComponent;
