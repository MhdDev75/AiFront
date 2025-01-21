"use client"
import { GetAiApplication } from '@/api/categoryActions';
import ApplicationLBoxComponent from '@/components/panel/ApplicationLBoxComponent';
import { useBackButton } from '@/core/telegram/BackButtonProvider';
import { IApplication } from '@/lib/type';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const SubCategoryAppPage = () => {

    const { setIsVisible } = useBackButton();
    const [loading, setLoading] = useState(false);
    const [application, setApplication] = useState<IApplication[]>();
    const params = useParams<{ id: string , name :string  }>();
    useEffect(() => {
        if (params) {
            getData(params.id);
        }
        setIsVisible(true); // دکمه بازگشت را فعال کنید
    }, []);

    const getData = async (paramId: string) => {
        setLoading(true);
        const response = await GetAiApplication(paramId);
        if (response.isSuccess) {
            setApplication(response.value as IApplication[]);
            setLoading(false)
        }
    };

    return (
        <section className="h-full">
            {loading ?
                <>
                    <div className="flex flex-row justify-between items-center">
                        <div className="skeleton h-4 w-20"></div>
                        <div className="skeleton h-4 w-20"></div>
                    </div>
                    <div className="keen-slider">

                        <div
                            className="keen-slider__slide  bg-base-300 rounded-2xl flex flex-col gap-2 p-3"
                        >
                            <div className="flex flex-row justify-between">
                                <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                                <div className="flex flex-col flex-nowrap justify-center items-start gap-1">
                                    <div className="bg-gray-500 bg-opacity-70 rounded-md flex flex-row gap-1 flex-nowrap px-1 items-center">
                                        <div className="skeleton h-4 w-20"></div>
                                    </div>
                                    <div className="bg-gray-500 bg-opacity-70 rounded-md flex flex-row gap-1 flex-nowrap px-1 items-center">
                                        <div className="skeleton h-4 w-20"></div>
                                    </div>
                                </div>
                            </div>
                            <span className="font-bold text-foreground">
                                <div className="skeleton h-4 w-20"></div>
                            </span>
                            <div className="text-sm text-primary-foreground text-pretty">
                                <div className="skeleton h-8 w-20"></div>
                            </div>
                        </div>
                    </div>
                </>
                : <>
                    <h1 className="text-lg mb-3">{decodeURIComponent(params.name)}</h1>
                    <div className="grid grid-cols-2 gap-2">
                        {application && application?.map((item: IApplication, index) => (
                           <ApplicationLBoxComponent key={index} {...item} />
                        ))}
                    </div>
                </>}

        </section>
    );
};


export default SubCategoryAppPage