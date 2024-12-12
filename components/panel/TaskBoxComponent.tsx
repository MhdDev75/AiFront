import Image from 'next/image'
import React from 'react'
export interface inlineBoxProps {
    title: string,
    description: string,
    image: string,
    price: number,
    status: boolean,

}

const TaskBoxComponent = ({ title, description, image, price, status }: inlineBoxProps) => {
    return (
        <button disabled={status} className='card btn btn-lg shadow-2xl  bg-base-300  flex flex-row justify-between items-center p-2 rounded-full'>
            <div className='flex gap-3'>
                <div className={`flex bg-gradient-to-b from-neutral-content to-neutral rounded-full p-2 justify-center items-center shadow-md shadow-neutral`}>
                    <Image src={image} alt={title} width={30} height={30}></Image>
                </div>
                <div className='flex flex-col items-start gap-2'>
                    <span>{title}</span>
                    <span className='text-sm text-primary'>{description}</span>
                </div>
            </div>
            <div>
                <span className={`btn btn-xs  btn-primary text-sm  rounded-full`}>+ {price.toLocaleString()}</span>
            </div>
        </button>
    )
}

export default TaskBoxComponent