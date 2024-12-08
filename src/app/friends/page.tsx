"use client"
import { Copy, Gift, Rocket } from 'lucide-react'
import React from 'react'
import {switchInlineQuery } from '@telegram-apps/sdk-react';


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

  return (
    <section className='mx-5 flex flex-col gap-5 relative h-full '>
      <div className='grid grid-cols-3 bg-slate-600 bg-opacity-40 items-center justify-center gap-3 p-3 rounded-2xl'>
        <div className='col-span-1 flex items-center justify-center h-full bg-slate-800 rounded-2xl'>
          <Gift size={56} />
        </div>
        <div className='col-span-2 text-justify fa-n'>
          با دعوت از دوستان خود به ازای هر دعوت مقدار {(50000).toLocaleString()} تومان جایزه نقدی دریافت کنید
        </div>
      </div>
      <div>
        دوستان شما
      </div>
      <div className='flex flex-col gap-3 overflow-y-scroll'>
        {friendList.map((item) => (
          <div className='grid grid-cols-4 items-center rounded-2xl gap-3 w-full bg-slate-600 bg-opacity-40 p-2' key={item.id}>
            <div className='col-span-1'>
              <div className=' bg-slate-800 rounded-2xl flex items-end justify-center py-3'>
                <Rocket size={35} />

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
      <div className='absolute bottom-0 w-full flex gap-1'>
        <button onClick={() => switchInlineQuery('share', ["users", "bots", "groups", "channels"])} className='bg-cyan-800 w-full p-3 rounded-2xl text-2xl font-bold  animate-bounce'>
          دعوت دوستان
        </button>
        <button className='bg-cyan-800  p-3 rounded-2xl animate-pulse'>
          <Copy size={38} />
        </button>
      </div>

    </section>
  )
}

export default FriendsPage