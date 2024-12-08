"use client"
import { Copy, Gift, UserCircle2Icon } from 'lucide-react'
import React from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

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




function FriendsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const app = (window as any).Telegram?.WebApp;
  return (
    <section className='mx-5 flex flex-col gap-5 relative h-full '>

<Tabs defaultValue="Referrals">
      <TabsList className="grid w-full grid-cols-3 bg-slate-700 bg-opacity-70 mb-3">
        <TabsTrigger value="Referrals">Your Referrals</TabsTrigger>
        <TabsTrigger value="Friends">Invited Friends</TabsTrigger>
        <TabsTrigger disabled value="Leader">Leader Board</TabsTrigger>
      </TabsList>
      <TabsContent value="Referrals">
      <div className='grid grid-cols-3 bg-slate-600 bg-opacity-40 items-center justify-center gap-3 p-3 rounded-2xl'>
        <div className='col-span-1 flex items-center justify-center h-full bg-slate-800 rounded-2xl'>
          <Gift size={56} />
        </div>
        <div className='col-span-2 text-justify fa-n'>
          با دعوت از دوستان خود به ازای هر دعوت مقدار {(50000).toLocaleString()} تومان جایزه نقدی دریافت کنید
        </div>
      </div>
      <div className='w-full flex gap-1 rounded-custom'>
        <button onClick={() => app.switchInlineQuery('share', ["users", "bots", "groups", "channels"])} className='bg-cyan-800 w-full p-3 rounded-2xl text-2xl font-bold '>
          دعوت دوستان
        </button>
        <button className='bg-cyan-800  p-3 rounded-custom animate-pulse'>
          <Copy size={38} />
        </button>
      </div>
      </TabsContent>
      <TabsContent value="Friends">
      <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3 overflow-y-scroll'>
        {friendList.map((item) => (
          <div className='grid grid-cols-4 items-center rounded-custom gap-3 w-full bg-slate-600 bg-opacity-40 p-2' key={item.id}>
            <div className='col-span-1'>
              <div className=' bg-slate-800 rounded-custom flex items-end justify-center py-3'>
                <UserCircle2Icon size={35} />
              </div>
            </div>
            <div className='col-span-2 flex flex-col gap-1'>
              <span>
                {item.name}
              </span>
              <span className='text-sm text-slate-400'>
                {item.datetime}
              </span>
            </div>
            <div className='col-span-1 flex justify-end'>
              {item.gift.toLocaleString()} ت
            </div>

          </div>
        ))}
        <div className='w-full h py-10 p-2'>

        </div>
      </div>
      </TabsContent>
      <TabsContent value="Leader">
        
        </TabsContent>
    </Tabs>

     
    

    </section>
  )
}

export default FriendsPage

