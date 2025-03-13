/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { useBackButton } from "@/core/telegram/BackButtonProvider";
import { IMessage, Message } from "@/lib/type";
import { useParams } from "next/navigation";
import { getOpenAiChat } from "@/api/chatAction";
import Prism from "prismjs";
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-python';

const ChatPage = () => {
  const { setIsVisible } = useBackButton();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  useEffect(() => {
    setIsVisible(true); // دکمه بازگشت را فعال کنید
  }, []);

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [chatInput, setChatInput] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollToBottom(); // همیشه وقتی کامپوننت رندر شد، به پایین اسکرول کن
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    if (chatInput) {
      try {
        setLoading(true)
        const newMessage = { user: "user", message: parseResponse(chatInput) };
        setMessages((prevMessages) => [...prevMessages, newMessage])
        const response = await getOpenAiChat(chatInput);
        const inputMessage = response[0].output
        const parsedMessages = parseResponse(inputMessage);
        console.log(parsedMessages);
        const assistance = { user: "sender", message: parsedMessages };
        setMessages((prevMessages) => [...prevMessages, assistance])
        setChatInput("");
        setLoading(false)
      } catch (err) {
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
        result.push({ type: "code", content: match[2].trim(), language: match[1] });
      } else if (match[3]) {
        // عناوین (Headers)
        result.push({ type: "header", content: match[3].trim() });
      } else if (match[4]) {
        // متن‌های بولد
        result.push({ type: "bold", content: match[4].trim() });
      } else if (match[5]) {
        // موارد لیست
        result.push({ type: "list-item", content: match[5].trim() });
        if (match[4]) {
          // متن‌های بولد
          result.push({ type: "bold", content: match[4].trim() });
        }
      } else if (match[6]) {
        // متن عادی
        result.push({ type: "text", content: match[6].trim() });
      }

    }
    return result;
  }


  return (
    <section className="h-full pb-3 flex flex-col gap-2 overflow-hidden">
      <div className="card w-full bg-base-300 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Chat Card</h2>
          <p>Welcome to the chat!</p>
          <div className="drawer drawer-bottom">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <label htmlFor="my-drawer" className="btn btn-primary btn-ghost">
                <Star size={20} color="yellow" />
              </label>
            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer" className="drawer-overlay"></label>
              <div className="p-4 w-full text-center bg-base-100 text-base-content">
                <h2 className="text-lg font-bold">Rate this Chat</h2>
                <div className="rating">
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="chat-box w-full h-full overflow-y-auto pb-12 relative">
        <div className="messages bg-base-300 h-full  rounded-3xl p-3 scroll overflow-y-auto  flex flex-col ">
          {messages &&
            messages.map((message, index) => (
              <div
                key={index}
                className={`  ${message.user === "user" ? "chat chat-start" : "text-white"
                  }`}
              >
                <div
                  className={` ${message.user === "user"
                    ? "chat-bubble chat-bubble-primary"
                    : ""
                    } `}
                >
                  {message.message.map((item, index) => {
                    if (item.type === "header") return <h3 key={index} className="text-primary">{item.content}</h3>;
                    if (item.type === "bold") return <strong key={index}>{item.content}</strong>;
                    if (item.type === "text") return <p key={index}>{item.content}</p>;
                    if (item.type === "list-item") return <li key={index}>{item.content}</li>;
                    if (item.type === "code")
                      return (
                        <pre dir="ltr" key={index}>
                          <code className={`language-${item.language}`}>{item.content}</code>
                        </pre>
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
            placeholder="Type a message..."
            className="input h-10 input-bordered w-full"
          />
          {/* {!recording ? (
            <button onClick={startRecording} disabled={recording}>
              <Mic size={30} />
            </button>
          ) : (
            <button onClick={stopRecording} disabled={!recording}>
              <Mic color="red" className="animate-pulse" size={30} />
            </button>
          )} */}

          <button
            onClick={() => sendMessage()}
            className="btn z-10 btn-primary btn-sm h-10"
          >
            {loading ?
              (<span className="loading loading-spinner"></span>) : "Send"}

          </button>
        </div>
      </div>
    </section>
  );
};

export default ChatPage;
