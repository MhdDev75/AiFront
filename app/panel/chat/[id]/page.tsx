/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { useBackButton } from "@/core/telegram/BackButtonProvider";
import { IApplication, IMessage, Message } from "@/lib/type";
import { useParams } from "next/navigation";
import { getApplicationRate, getFollowing, getOpenAiChat, getOpenAiChatHistory, postApplicationRate, postFollowing, postUnFollowing } from "@/api/chatAction";
import Prism from "prismjs";
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-python';
import { GetAiApplicationById } from "@/api/categoryActions";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

const ChatPage = () => {
  const { setIsVisible } = useBackButton();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  useEffect(() => {
    setIsVisible(true); // دکمه بازگشت را فعال کنید
    getAiChatHistory()
    getAiApplication()
    getFollowingClient()
    getApplicationRateClient()
  }, []);

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [chatInput, setChatInput] = useState<string>();
  const [rateValue, setRateValue] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const [application, setApplication] = useState<IApplication>();
  const [uuid, setUuid] = useState("3fa85f64-5717-4562-b3fc-2c963f66afa6");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = useTranslations("i18n");



  useEffect(() => {
    scrollToBottom(); // همیشه وقتی کامپوننت رندر شد، به پایین اسکرول کن
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const getAiApplication = async () => {
    try {
      const response = await GetAiApplicationById(params.id);
      if (response.isSuccess) {
        setApplication(response.value[0]);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const getFollowingClient = async () => {
    try {
      const response = await getFollowing(params.id);
      if (response.isSuccess) {
        setIsFollowing(response.value.isFollowed);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err.message);
    }
  };
  const getRating = async () => {
    try {
      const response = await GetAiApplicationById(params.id);
      if (response.isSuccess) {
        setApplication(response.value[0]);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const postFollowingClient = async () => {
    try {
      const response = await postFollowing(params.id);
      if (response.isSuccess) {
        setIsFollowing(true);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const postUnFollowingClient = async () => {
    try {
      const response = await postUnFollowing(params.id);
      if (response.isSuccess) {
        setIsFollowing(false);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const getApplicationRateClient = async () => {
    try {
      const response = await getApplicationRate(params.id);
      if (response.isSuccess) {
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const postApplicationRateClient = async () => {
    try {
      if (rateValue == undefined) {
        toast.error(t("chat.selectRate"))
        return;
      }
      const response = await postApplicationRate(params.id, rateValue.toString());
      if (response.isSuccess) {
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err.message);
    }
  };




  const getAiChatHistory = async () => {
    try {
      const response = await getOpenAiChatHistory();
      if (response.isSuccess) {
        response.value.map((item: any) => {
          item.conversations.map((child: any) => {
            const newMessage = { user: "user", message: parseResponse(child.question) };
            setMessages((prevMessages) => [...prevMessages, newMessage])
            const assistance = { user: "sender", message: parseResponse(child.answer) };
            setMessages((prevMessages) => [...prevMessages, assistance])
          })
        })
        setUuid(response.value[response.value.length - 1].sessionId)
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
    }
  };

  const isRTLText = (text: string) => {
    const rtlRegex = /[\u0600-\u06FF\u0750-\u077F\u0590-\u05FF]/; // محدوده‌های یونیکد برای زبان‌های راست‌چین
    return rtlRegex.test(text);
  }

  const sendMessage = async () => {
    if (chatInput) {
      try {
        setLoading(true)
        const newMessage = { user: "user", message: parseResponse(chatInput) };
        setMessages((prevMessages) => [...prevMessages, newMessage])
        const response = await getOpenAiChat(chatInput, uuid, Number(params.id));
        const inputMessage = response.value.output
        const parsedMessages = parseResponse(inputMessage);
        const assistance = { user: "sender", message: parsedMessages };
        setMessages((prevMessages) => [...prevMessages, assistance])
        setChatInput("");
        setLoading(false)

      } catch (err: any) {
        if (!err?.response?.data?.isSuccess) {
          if (err?.response?.data?.errors == "Account balance not enough") {
            const error = { user: "error", message: parseResponse(t("wallet.NotBalance")) };
            setMessages((prevMessages) => [...prevMessages, error])
            setChatInput("");

          }
        }
        setLoading(false)
        console.error("Failed to send message: ", err);
      }
    }
  };


  const parseResponse = (input: string): Message[] => {
    const regex = /```(\w+)?\n([\s\S]*?)```|### (.+)|\*\*(.+?)\*\*|-\s(.+)|([^\n]+)/g;
    const result: Message[] = [];
    let match;

    while ((match = regex.exec(input)) !== null) {
      if (match[1] && match[2]) {
        // بلوک‌های کد
        result.push({ type: "code", content: match[2].trim(), language: match[1], isRtl: isRTLText(match[2].trim()) });
      } else if (match[3]) {
        // عناوین (Headers)
        result.push({ type: "header", content: match[3].trim(), isRtl: isRTLText(match[3].trim()) });
      } else if (match[4]) {
        // متن‌های بولد
        result.push({ type: "bold", content: match[4].trim(), isRtl: isRTLText(match[4].trim()) });
      } else if (match[5]) {
        // موارد لیست
        result.push({ type: "list-item", content: match[5].trim(), isRtl: isRTLText(match[5].trim()) });
        if (match[4]) {
          // متن‌های بولد
          result.push({ type: "bold", content: match[4].trim(), isRtl: isRTLText(match[4].trim()) });
        }
      } else if (match[6]) {
        // متن عادی
        result.push({ type: "text", content: match[6].trim(), isRtl: isRTLText(match[6].trim()) });
      }


    }
    return result;
  }


  return (
    <section className="h-full pb-3 flex flex-col gap-2 overflow-hidden">
      {application && (
        <div className="card w-full bg-base-300 shadow-xl">
          <div className="card-body">
            <h2 className="card-title flex flex-row flex-nowrap gap-3">
              <Image
                src={application?.imageUrl}
                width={40}
                height={40}
                className="rounded-2xl"
                alt={application?.name}
              />
              {application?.name}</h2>
            <p>{application?.description}</p>

            <div className="drawer gap-3 drawer-bottom ">
              <input id="my-drawer" type="checkbox" className="drawer-toggle " />
              <div className="drawer-content">
                <label htmlFor="my-drawer" className="btn btn-sm btn-primary btn-outline">
                  <Star size={15} color="orange" />
                </label>
              </div>
              <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <div className="p-4 w-full text-center bg-base-100 text-base-content">
                  <h2 className="text-lg font-bold">{t("chat.rate")}</h2>
                  <div className="rating">
                    <input
                      type="radio"
                      name="rating-2"
                      onClick={() => setRateValue(1)}
                      className="mask mask-star-2 bg-orange-400"
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      onClick={() => setRateValue(2)}
                      className="mask mask-star-2 bg-orange-400"
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      onClick={() => setRateValue(3)}
                      className="mask mask-star-2 bg-orange-400"
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      onClick={() => setRateValue(4)}
                      className="mask mask-star-2 bg-orange-400"
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      onClick={() => setRateValue(5)}
                      className="mask mask-star-2 bg-orange-400"
                    />
                  </div>
                  <div className="row">

                  <button onClick={() => postApplicationRateClient()} className="btn btn-sm mt-3 btn-primary mx-auto">{t("chat.send")}</button>
                  </div>
                </div>
              </div>
              <button onClick={() => isFollowing ? postUnFollowingClient() : postFollowingClient()} className={`btn btn-sm ${isFollowing ? "btn-error btn-outline" : "btn-primary btn-outline"} `}>{isFollowing ? t("chat.unfollow") : t("chat.following")}</button>
            </div>
          </div>
        </div>
      )}
      <div className="chat-box w-full h-full overflow-y-auto pb-12 relative">
        <div className="messages bg-base-300 h-full  rounded-3xl p-3 scroll overflow-y-auto  flex flex-col gap-3  ">
          {messages &&
            messages.map((message, index) => (
              <div
                key={index}
                className={` text-dark dark:text-white  ${message.user === "user" ? "chat chat-start" : ""
                  }`}
              >
                <div
                  className={` ${message.user === "user"
                    ? "chat-bubble chat-bubble-primary"
                    : message.user === "error" ? "chat-bubble bg-error" : ""
                    }  text-dark dark:text-white `}
                >
                  {message.message.map((item, index) => {
                    if (item.type === "header") return <h3 dir={item.isRtl ? "rtl" : "ltr"} key={index} className="text-primary leading-relaxed">{item.content}</h3>;
                    if (item.type === "bold") return <strong dir={item.isRtl ? "rtl" : "ltr"} className="leading-relaxed" key={index}>{item.content}</strong>;
                    if (item.type === "text") return <p dir={item.isRtl ? "rtl" : "ltr"} className="leading-relaxed" key={index}>{item.content}</p>;
                    if (item.type === "list-item") return <li dir={item.isRtl ? "rtl" : "ltr"} className="leading-relaxed" key={index}>{item.content}</li>;
                    if (item.type === "code")
                      return (
                        <div className="mockup-code bg-base-200 p-4 rounded-xl" key={index}>
                          <pre dir="ltr" className="overflow-x-auto">
                            <code className={`language-${item.language} text-accent`} >
                              {item.content}
                            </code>
                          </pre>
                        </div>
                      );
                    return null;
                  })}
                </div>
              </div>
            ))}
          <div ref={messagesEndRef} /> {/* مرجع به انتهای لیست */}
        </div>
        <div className="flex absolute w-full bottom-0 start-0 flex-row gap-2 mt-2 h-auto">
          <input
            disabled={loading}
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder={t("chat.Typing")}
            className="input h-10 input-bordered w-full"
          />
          <button
            onClick={() => sendMessage()}
            className="btn z-10 btn-primary btn-sm h-10"
          >
            {loading ?
              (<span className="loading loading-spinner"></span>) : t("chat.send")}

          </button>
        </div>
      </div>
    </section>
  );
};

export default ChatPage;
