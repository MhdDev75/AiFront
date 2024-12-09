"use client"
import { Copy, Stars, UserCircle2Icon } from 'lucide-react'
import React from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import friends from "@/assets/friends/friends.png"
import Image from 'next/image'
import { locales } from '@/core/i18n/config'
import { useLocale } from 'next-intl'

const today = new Date();
const dd = today.getDate() + 1;
const mm = today.getMonth() + 1;
const yyyy = today.getFullYear();


const friendList = [
  { id: 1, datetime: dd + '/' + mm + '/' + yyyy, name: "Ahmad Nori", gift: 50000 },
  { id: 2, datetime: dd + '/' + mm + '/' + yyyy, name: "Nazanin Shams", gift: 50000 },
  { id: 3, datetime: dd + '/' + mm + '/' + yyyy, name: "Mina Kaviyani", gift: 50000 },
  { id: 4, datetime: dd + '/' + mm + '/' + yyyy, name: "Goli Zarbaf", gift: 50000 },
  { id: 5, datetime: dd + '/' + mm + '/' + yyyy, name: "Hassan Kargar", gift: 50000 },
  { id: 6, datetime: dd + '/' + mm + '/' + yyyy, name: "Mohsen Nekoei", gift: 50000 }
]


 function  FriendsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const app = (window as any).Telegram?.WebApp;
  const locale =  useLocale();
  return (
    <section className='mx-5 flex flex-col gap-5 relative h-full '>

      <Tabs  dir={locale == locales[0] ? "rtl" : "ltr"} defaultValue="Referrals">
        <TabsList className="grid w-full grid-cols-3 h-12 text-foreground rounded-md bg-muted mb-3">
          <TabsTrigger className="rounded-md h-10" value="Referrals">Your Referrals</TabsTrigger>
          <TabsTrigger className="rounded-md h-10" value="Friends">Invited Friends</TabsTrigger>
          <TabsTrigger className="rounded-md h-10" disabled value="Leader">Leader Board</TabsTrigger>
        </TabsList>
        <TabsContent value="Referrals">
          <div className='grid grid-cols-1 bg-slate-600 bg-opacity-40 items-center justify-center gap-3 p-3 rounded-2xl'>
            <div className='flex flex-col gap-4 justify-center'>
              <div className='self-center'>
                <Image src={friends} alt='friends' width={250} height={250} />
              </div>
              <div className=' text-center fa-n'>
                با دعوت از دوستان خود به ازای هر دعوت مقدار {(50000).toLocaleString()} تومان جایزه نقدی دریافت کنید
              </div>
              <div className='flex flex-col justify-center items-center  self-center bg-secondary rounded-md w-2/3 p-1 pt-2'>
                <div className='text-xs'>کد دعوت شما</div>
                <div className='flex flex-row gap-2 items-center justify-center font-bold text-2xl text-primary'>WEEssty
                  <button className='p-3 rounded-custom animate-pulse'>
                    <Copy size={20} />
                  </button>
                </div>

              </div>

              <div className='flex flex-col gap-1'>
                <span className='font-bold flex gap-1 items-center'>
                  <Stars color='yellow' size={15} />
                  دعوت از دوستان
                </span>
                <span className='font-bold text-xs'>
                  کد دعوت خود را با دوستانتان به اشتراک بگزارید
                </span>
              </div>
              <div className='flex flex-col gap-1'>
                <span className='font-bold flex gap-1 items-center'>
                  <Stars color='yellow' size={15} />
                  امتیاز رایگان بگیرید
                </span>
                <span className='font-bold text-xs'>
                  وقتی که دوستانتان عضو شدند میتوانید امتیاز رایگان دریافت کنید
                </span>
              </div>
            </div>
          </div>
          <div className='w-full flex gap-1 rounded-custom'>


          </div>
        </TabsContent>
        <TabsContent value="Friends">
          <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3 overflow-y-scroll'>
            {friendList.map((item) => (
              <div className='grid grid-cols-4 items-center rounded-custom gap-3 w-full rounded-md bg-slate-600 bg-opacity-40 p-2' key={item.id}>
                <div className='col-span-3 flex flex-row gap-2 items-center'>
                  <div className=' bg-slate-800 rounded-custom flex items-end justify-center py-3 h-14 w-14 rounded-md'>
                    <UserCircle2Icon size={35} />
                  </div>
                  <div className=' flex flex-col gap-1'>
                    <span>
                      {item.name}
                    </span>
                    <span className='text-sm text-slate-400'>
                      {item.datetime}
                    </span>
                  </div>
                </div>

                <div className='col-span-1 flex justify-end'>
                  {item.gift.toLocaleString()} ت
                </div>

              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="Leader">

        </TabsContent>
      </Tabs>
      <button onClick={() => app.switchInlineQuery('share', ["users", "bots", "groups", "channels"])} className='bg-primary w-full p-3 rounded-2xl text-lg font-bold '>
        اشتراک گزاری کد دعوت
      </button>




    </section>
  )
}

export default FriendsPage

