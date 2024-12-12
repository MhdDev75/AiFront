"use client"
import { Copy, Stars } from 'lucide-react'
import React, { useState } from 'react'
import friends from "@/assets/friends/friends.png"
import Image from 'next/image'
import InlineBoxComponent from '@/components/panel/InlineBoxComponent'

const FriendsPage = () => {

  const [tab, setTab] = useState(1)

  const today = new Date();
  const dd = today.getDate() + 1;
  const mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();

  const tablist = [
    { id: 1, title: "Your Referrals", status: true },
    { id: 2, title: "Invited Friends", status: true },
    { id: 3, title: "Leader Board", status: false },
  ]

  const friendList = [
    { id: 1, datetime: dd + '/' + mm + '/' + yyyy, name: "Ahmad Nori", gift: 50000, icons: "CircleUser", type: true },
    { id: 2, datetime: dd + '/' + mm + '/' + yyyy, name: "Nazanin Shams", gift: 50000, icons: "CircleUser", type: true },
    { id: 3, datetime: dd + '/' + mm + '/' + yyyy, name: "Mina Kaviyani", gift: 50000, icons: "CircleUser", type: true },
    { id: 4, datetime: dd + '/' + mm + '/' + yyyy, name: "Goli Zarbaf", gift: 50000, icons: "CircleUser", type: true },
    { id: 5, datetime: dd + '/' + mm + '/' + yyyy, name: "Hassan Kargar", gift: 50000, icons: "CircleUser", type: true },
    { id: 6, datetime: dd + '/' + mm + '/' + yyyy, name: "Mohsen Nekoei", gift: 50000, icons: "CircleUser", type: true },
    { id: 7, datetime: dd + '/' + mm + '/' + yyyy, name: "Ahmad Nori", gift: 50000, icons: "CircleUser", type: true },
    { id: 8, datetime: dd + '/' + mm + '/' + yyyy, name: "Nazanin Shams", gift: 50000, icons: "CircleUser", type: true },
    { id: 9, datetime: dd + '/' + mm + '/' + yyyy, name: "Mina Kaviyani", gift: 50000, icons: "CircleUser", type: true },
    { id: 10, datetime: dd + '/' + mm + '/' + yyyy, name: "Goli Zarbaf", gift: 50000, icons: "CircleUser", type: true },
    { id: 11, datetime: dd + '/' + mm + '/' + yyyy, name: "Hassan Kargar", gift: 50000, icons: "CircleUser", type: true },
    { id: 12, datetime: dd + '/' + mm + '/' + yyyy, name: "Mohsen Nekoei", gift: 50000, icons: "CircleUser", type: true }
  ]

  return (
    <section className="flex flex-col h-full gap-2">

      <div className='grid grid-cols-3 h-12 gap-2 p-2 bg-base-300 rounded-full'>
        {tablist.map((item) => (
          <button onClick={() => setTab(item.id)} disabled={!item.status} key={item.id} className={`btn btn-sm ${tab == item.id && 'btn-primary'} ${tab != item.id ? item.status == true ? 'bg-base-300' : 'bg-base-200' : ''} rounded-full px-1`}>Your Referrals</button>
        ))}
      </div>
      {tab == tablist[0].id && (

        <div className='grid grid-cols-1 bg-base-300  items-center justify-center gap-3 p-3  h-[100%-3rem] overflow-y-auto rounded-2xl'>
          <div className='flex flex-col gap-4 justify-center'>
            <div className='self-center'>
              <Image src={friends} alt='friends' width={250} height={250} />
            </div>
            <div className=' text-center fa-n'>
              با دعوت از دوستان خود به ازای هر دعوت مقدار {(50000).toLocaleString()} تومان جایزه نقدی دریافت کنید
            </div>
            <div className='flex flex-col justify-center items-center  self-center bg-base-100 rounded-md w-2/3 p-1 pt-2'>
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

      )}

      {tab == tablist[1].id && (
        <div className='flex flex-col gap-2 h-[100%-3rem] overflow-y-auto'>
          {friendList.map((item) => (
            <InlineBoxComponent
              key={item.id}
              date={item.datetime}
              price={item.gift}
              title={item.name}
              type={item.type}
              icon={item.icons} />
          ))}
        </div>
      )}
      
      <button onClick={() => app.switchInlineQuery('share', ["users", "bots", "groups", "channels"])} className='btn btn-primary w-full p-3 rounded-full animate-pulse'>
        اشتراک گزاری کد دعوت
      </button>
    </section>
  )
}

export default FriendsPage
