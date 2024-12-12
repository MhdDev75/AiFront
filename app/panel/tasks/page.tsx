import Image from 'next/image'
import React from 'react'
import coins from "@/assets/tasks/coins.png"
import { Coins, Flag, Medal, PopcornIcon } from 'lucide-react'
import TaskBoxComponent from '@/components/panel/TaskBoxComponent'


const TasksPage = () => {
  const taskList = [
    {
      id: 1, title: "Daily Task", icon: <Flag />, list:
        [
          { id: 1, title: "تسک اول", description: "تسکی که اولین تسک است", image: "https://cdn.iconscout.com/icon/free/png-512/free-youtube-logo-icon-download-in-svg-png-gif-file-formats--social-media-70-flat-icons-color-pack-logos-432560.png?f=webp&w=256", price: 1000, status: false },
          { id: 2, title: "تسک دوم", description: "تسکی که دومین تسک است", image: "https://cdn.iconscout.com/icon/free/png-512/free-youtube-logo-icon-download-in-svg-png-gif-file-formats--social-media-70-flat-icons-color-pack-logos-432560.png?f=webp&w=256", price: 1000, status: false },
          { id: 3, title: "تسک سوم", description: "تسکی که سومین تسک است", image: "https://cdn.iconscout.com/icon/free/png-512/free-youtube-logo-icon-download-in-svg-png-gif-file-formats--social-media-70-flat-icons-color-pack-logos-432560.png?f=webp&w=256", price: 1000, status: false },
          { id: 4, title: "تسک چهارم", description: "تسکی که چهارمین تسک است", image: "https://cdn.iconscout.com/icon/free/png-512/free-youtube-logo-icon-download-in-svg-png-gif-file-formats--social-media-70-flat-icons-color-pack-logos-432560.png?f=webp&w=256", price: 1000, status: true },
        ]
    },
    {
      id: 2, title: "One-Time Task", icon: <PopcornIcon />, list:
        [
          { id: 1, title: "تسک اول", description: "تسکی که اولین تسک است", image: "https://cdn.iconscout.com/icon/free/png-512/free-youtube-logo-icon-download-in-svg-png-gif-file-formats--social-media-70-flat-icons-color-pack-logos-432560.png?f=webp&w=256", price: 1000, status: true },
          { id: 2, title: "تسک دوم", description: "تسکی که دومین تسک است", image: "https://cdn.iconscout.com/icon/free/png-512/free-youtube-logo-icon-download-in-svg-png-gif-file-formats--social-media-70-flat-icons-color-pack-logos-432560.png?f=webp&w=256", price: 1000, status: false },
          { id: 3, title: "تسک سوم", description: "تسکی که سومین تسک است", image: "https://cdn.iconscout.com/icon/free/png-512/free-youtube-logo-icon-download-in-svg-png-gif-file-formats--social-media-70-flat-icons-color-pack-logos-432560.png?f=webp&w=256", price: 1000, status: false },
          { id: 4, title: "تسک چهارم", description: "تسکی که چهارمین تسک است", image: "https://cdn.iconscout.com/icon/free/png-512/free-youtube-logo-icon-download-in-svg-png-gif-file-formats--social-media-70-flat-icons-color-pack-logos-432560.png?f=webp&w=256", price: 1000, status: false },
        ]
    },
    {
      id: 3, title: "Sponsor Task", icon: <Coins />, list:
        [
          { id: 1, title: "تسک اول", description: "تسکی که اولین تسک است", image: "https://cdn.iconscout.com/icon/free/png-512/free-youtube-logo-icon-download-in-svg-png-gif-file-formats--social-media-70-flat-icons-color-pack-logos-432560.png?f=webp&w=256", price: 1000, status: true },
          { id: 2, title: "تسک دوم", description: "تسکی که دومین تسک است", image: "https://cdn.iconscout.com/icon/free/png-512/free-youtube-logo-icon-download-in-svg-png-gif-file-formats--social-media-70-flat-icons-color-pack-logos-432560.png?f=webp&w=256", price: 1000, status: false },
          { id: 3, title: "تسک سوم", description: "تسکی که سومین تسک است", image: "https://cdn.iconscout.com/icon/free/png-512/free-youtube-logo-icon-download-in-svg-png-gif-file-formats--social-media-70-flat-icons-color-pack-logos-432560.png?f=webp&w=256", price: 1000, status: false },
          { id: 4, title: "تسک چهارم", description: "تسکی که چهارمین تسک است", image: "https://cdn.iconscout.com/icon/free/png-512/free-youtube-logo-icon-download-in-svg-png-gif-file-formats--social-media-70-flat-icons-color-pack-logos-432560.png?f=webp&w=256", price: 1000, status: false },
        ]
    },
    { id: 4, title: "Vip Task", icon: <Medal />, list: [] }
  ]

  return (
    <div className='flex flex-col h-full gap-4'>
      <div className='flex flex-row justify-between items-center h-40'>
        <span className='font-extrabold text-3xl text-wrap'>Increase <br /> Your Rate</span>
        <Image src={coins} width={150} height={150} alt='coins' />
      </div>
      <div className='flex flex-col bg-base-200 rounded-md p-3 h-[100%-14rem] overflow-y-auto gap-5'>
        {taskList.map((item) => (
          <div key={item.id} className='flex flex-col gap-2'>
            <div className='flex flex-row justify-between'>
              <div className='flex flex-row gap-2'>
                {item.icon}
                <span className='font-bold'>{item.title}</span>
              </div>
              <span className='font-bold'>{ item.list.filter(x => x.status == true).length+ "/" + item.list.length}</span>
            </div>
            {item.list.length > 0 ? (
              item.list.map((child) => (
                <TaskBoxComponent
                  key={child.id}
                  title={child.title}
                  description={child.description}
                  image={child.image}
                  price={child.price}
                  status={child.status} />
              ))
            ) : (
              <div className='flex justify-center items-center p-3 bg-base-100 rounded-md'>تسکی برای نمایش وجود ندارد</div>
            )}

          </div>
        ))}
      </div>
    </div>
  )
}

export default TasksPage