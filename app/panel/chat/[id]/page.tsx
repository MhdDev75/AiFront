/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useRef, useState } from "react";
import { Mic, Star } from "lucide-react";
import { useBackButton } from "@/core/telegram/BackButtonProvider";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { IMessage } from "@/lib/type";
import { useParams } from "next/navigation";

const ChatPage = () => {
  const { setIsVisible } = useBackButton();
 const params = useParams<{ id: string }>();

  useEffect(() => {
    setIsVisible(true); // دکمه بازگشت را فعال کنید
  }, []);

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [connection, setConnection] = useState<HubConnection | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const connect = new HubConnectionBuilder()
        .withUrl("http://64.44.167.150:7001/hubs/openai", {
          accessTokenFactory: () => token,
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();
      setConnection(connect);
      connect
        .start()
        .then(() => {
          connect.on("ReceiveMessage", (sender,message) => {
            setMessages((prev) => [...prev, { sender, message }]);
          });
          connect.invoke("RetrieveMessageHistory");
        })

        .catch((err) =>
          console.error("Error while connecting to SignalR Hub:", err)
        );
    }

    return () => {
      if (connection) {
        connection.off("ReceiveMessage");
      }
    };
  }, []);

  const sendMessage = async (message: string) => {
    if (connection) {
      try {
        await connection.invoke("SendMessage", message);
        console.log("Message sent: ", message);
        setChatInput("");
      } catch (err) {
        console.error("Failed to send message: ", err);
      }
    }
  };

  const [chatInput, setChatInput] = useState<string>();
  
  // const [recording, setRecording] = useState(false);
  // const [audioURL, setAudioURL] = useState<string | null>(null);
  // const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  // const audioChunks = useRef<BlobPart[]>([]);
  // const startRecording = async () => {
  //   setRecording(true);
  //   const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  //   mediaRecorderRef.current = new MediaRecorder(stream);
  //   mediaRecorderRef.current.ondataavailable = (event) => {
  //     audioChunks.current.push(event.data);
  //   };
  //   mediaRecorderRef.current.onstop = () => {
  //     const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
  //     const audioUrl = URL.createObjectURL(audioBlob);
  //     setAudioURL(audioUrl);
  //     chatMessage.unshift({
  //       id: chatMessage.length + 1,
  //       message: audioUrl,
  //       type: "َaudio",
  //       sender: "user",
  //     });
  //     audioChunks.current = [];
  //   };
  //   mediaRecorderRef.current.start();
  // };
  // const stopRecording = () => {
  //   if (mediaRecorderRef.current) {
  //     mediaRecorderRef.current.stop();
  //     setRecording(false);
  //   }
  // };

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
        <div className="messages bg-base-300 h-full  rounded-3xl p-3 scroll overflow-y-auto  flex flex-col-reverse ">
          {/* Messages will be displayed here */}
          {messages &&
            messages.map((message, index) => (
              <div
                key={index}
                className={`chat  ${
                  message.sender === "user" ? "chat-start" : "chat-end"
                }`}
              >
                <div
                  className={`chat-bubble ${
                    message.sender === "user"
                      ? "chat-bubble-primary"
                      : " chat-bubble-info"
                  } `}
                >
                  {"text" == "text" ? (
                    message.message
                  ) : (
                    <audio src={message.message} controls />
                  )}
                </div>
              </div>
            ))}
        </div>
        <div className="flex absolute w-full bottom-0 start-0 flex-row gap-2 mt-2 h-auto">
          <input
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
            onClick={() => sendMessage}
            className="btn z-10 btn-primary btn-sm h-10"
          >
            Send
          </button>
        </div>
      </div>
    </section>
  );
};

export default ChatPage;
