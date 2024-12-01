"use client";
import { ArrowLeft, ChevronLeft, WalletCards } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect } from "react";

// import { getUser } from "@/api/actions/userActions";
function Header() {
  const pathName = usePathname();
  const route = useRouter();
  // const [userData, setUserData] = useState<any>();

  useEffect(()=>{
    const fetchUser = async () => {
      // try {
      //   // const responseUser = await getUser(); 
      //   // setUserData(responseUser)
      //   // console.log(responseUser);
      // } catch (err: any) {
      //   console.log(err.message);
      // }
    };

    fetchUser();
  },[])

  return (
    <>
   { pathName !== "/" && pathName !== "/welcome" && (
    <header className="p-2">
      <nav className="flex justify-between w-full">
        <ul className="flex justify-between items-center w-full gap-8">
          {pathName === "/home" && (
            <li>
              <motion.div
                initial={{ width: 40, height: 3, opacity: 0 }}
                animate={{ width: "auto", height: "auto", opacity: 1 }}
                transition={{ ease: "easeInOut", duration: 1 }}
                className=" bg-gray-500 bg-opacity-60 rounded-2xl"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                >
                  <Link
                    className="flex flex-nowrap items-center justify-center text-sm rounded-2xl gap-2 bg-gray-500 bg-opacity-60 py-2"
                    href={"/wallet"}
                  >
                    <div className="flex flex-nowrap gap-1 px-2">
                      <WalletCards size={16} />
                      <h4>موجودی</h4>
                    </div>
                    <div className="px-2 fa-n flex flex-nowrap gap-1">
                      ت 0
                      <ChevronLeft size={16} />
                    </div>
                  </Link>
                </motion.div>
              </motion.div>
            </li>
          )}
          {pathName !== "/home" && (
            <li>
              <motion.div
                initial={{ width: 120, opacity: 0 }}
                animate={{ width: 35, opacity: 1 }}
                transition={{ ease: "easeInOut", duration: 1 }}
                onClick={() => {
                  route.back();
                }}
                className="bg-gray-600 rounded-2xl p-2  text-center"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ ease: "easeInOut", duration: 1, delay: 1 }}
                >
                  <ArrowLeft
                    size={18}
                  />
                </motion.div>
              </motion.div>
            </li>
          )}
          {pathName !== "/profile" &&
          <motion.li
           initial={{  opacity: 0 }}
           animate={{  opacity: 1 }}
           transition={{ ease: "easeInOut", duration: 1 }}
           
          >
            <Link className="w-full" href={"/profile"}>
             
            </Link>
          </motion.li>
          }
        </ul>
      </nav>
    </header>
    ) }
    </>

  );
}

export default Header;
