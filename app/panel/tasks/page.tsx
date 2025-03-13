/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import coins from "@/assets/tasks/coins.png";
import { Coins, Flag, PopcornIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useBackButton } from "@/core/telegram/BackButtonProvider";
import { getTaskList } from "@/api/TaskActions";
import { toast } from "react-toastify";
import { UserTask } from "@/lib/type";
import TaskBoxComponentExternal from "@/components/panel/TaskBoxComponentExternal";
import TaskBoxComponentTChanel from "@/components/panel/TaskBoxComponentTChanel";
import TaskBoxComponentInvited from "@/components/panel/TaskBoxComponentInvited";
// import { ITasks } from "@/lib/type";

const TasksPage = () => {
  const { setIsVisible } = useBackButton();
  const [loading, setLoading] = useState(false);
  const [categoryTask, setCategoryTask] = useState([]);

  interface sss {
    dailyUserTasks: any;
    staticUserTasks: any;
  }

  const [taskServer, setTaskServer] = useState<sss>();
  // const [taskList, setTaskList] = useState<ITasks[] | undefined>();

  useEffect(() => {
    setIsVisible(true);
    getTaskListClient();
  }, []);

  const getTaskListClient = async () => {
    setLoading(true);
    const response = await getTaskList();
    if (response.isSuccess) {
      setCategoryTask(response.value);
      const formattedTasks = {
        dailyUserTasks: response.value.dailyUserTasks.flatMap((task: any) => [
          ...task.externalLinkUser.map((item: any) => ({
            ...item,
            type: "externalLinkUser",
            status: true,
            currency: "USD",
            imageId:
              "https://cdn.iconscout.com/icon/free/png-512/free-youtube-logo-icon-download-in-svg-png-gif-file-formats--social-media-70-flat-icons-color-pack-logos-432560.png?f=webp&w=256",
          })),
          ...task.telegramChanel.map((item: any) => ({
            ...item,
            type: "telegramChanel",
            status: true,
            currency: "USD",
            imageId:
              "https://cdn.iconscout.com/icon/free/png-256/free-telegram-logo-icon-download-in-svg-png-gif-file-formats--social-media-brand-pack-logos-icons-3073750.png?f=webp&w=256",
          })),
        ]),

        staticUserTasks: response.value.staticUserTasks.flatMap((task: any) => [
          {
            ...task.userTaskInvitedUserTask,
            type: "userTaskInvitedUserTask",
            status: true,
            currency: "USD",
            imageId:
              "https://cdn.iconscout.com/icon/premium/png-256-thumb/user-1604300-1360571.png?f=webp&w=256",
          },
        ]),
      };

      setTaskServer(formattedTasks);
      setLoading(false);
    } else {
      toast.error(response.message);
      setLoading(false);
    }
  };

  const t = useTranslations("i18n");

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex flex-row justify-between items-center h-40">
        <span className="font-extrabold text-3xl text-wrap">
          {t("Task.Increase")} <br /> {t("Task.YourRate")}
        </span>
        <Image src={coins} width={150} height={150} alt="coins" />
      </div>
      <div className="flex flex-col bg-base-200 rounded-3xl p-3 h-[100%-14rem] overflow-y-auto gap-5">
        {!loading && categoryTask &&
          Object.keys(categoryTask).map((item, index) => {
            let list = [];
            if (item == "dailyUserTasks") {
              list = taskServer?.dailyUserTasks;
            }

            if (item == "staticUserTasks") {
              list = taskServer?.staticUserTasks;
            }

            return (
              <>
                <div key={index}>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-row gap-2">
                        {item == "dailyUserTasks" ? (
                          <Flag />
                        ) : item == "staticUserTasks" ? (
                          <PopcornIcon />
                        ) : (
                          <Coins />
                        )}
                        <span className="font-bold">{t(`Task.${item}`)}</span>
                      </div>
                      {}
                      <span className="font-bold">
                        {list.filter((x: any) => x.status == true).length +
                          "/" +
                          list.length}
                      </span>
                    </div>
                  </div>
                </div>
                {list.map((child: any) => {
                  if (child.type === UserTask.externalLinkUser) {
                    return (
                      <TaskBoxComponentExternal
                        key={child.id}
                        title={child.title}
                        description={child.description}
                        image={child.imageId}
                        price={child.price}
                        status={child.status}
                        currency={child.currency}
                        id={child.id}
                        url={child.url}
                        platformType={child.platformType}
                      />
                    );
                  }

                  if ( child.type === UserTask.telegramChanel) {
                    return (
                      <TaskBoxComponentTChanel
                        key={child.id}
                        title={child.title}
                        description={child.description}
                        image={child.imageId}
                        price={child.price}
                        status={child.status}
                        currency={child.currency}
                        id={child.id}
                        chanelName={child.chanelName}
                      />
                    );
                  }

                  if ( child.type === UserTask.userTaskInvitedUserTask) {
                    return (
                      <TaskBoxComponentInvited
                        key={child.id}
                        title={child.title}
                        description={child.description}
                        image={child.imageId}
                        price={child.price}
                        status={child.status}
                        currency={child.currency}
                        id={child.id}
                        count={child.count}
                      />
                    );
                  }
                })}
              </>
            );
          })}
      </div>
    </div>
  );
};

export default TasksPage;
