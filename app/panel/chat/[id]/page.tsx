/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useRef, useState } from "react";
import { Mic, Star } from "lucide-react";


const ChatPage = () => {

    const [chatInput, setChatInput] = useState<string>();
    const [chatMessage, setChatMessage] = useState([
        { id: 1, message: "wwww", type: "text", sender: "user" },
        { id: 2, message: "wwwww", type: "text", sender: "ai" },
    ])
    const [recording, setRecording] = useState(false);
    const [audioURL, setAudioURL] = useState<string | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunks = useRef<BlobPart[]>([]);
    const startRecording = async () => {
        setRecording(true);
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (event) => {
            audioChunks.current.push(event.data);
        };
        mediaRecorderRef.current.onstop = () => {
            const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob); setAudioURL(audioUrl);
            chatMessage.unshift({ id: chatMessage.length + 1, message: audioUrl, type: "َaudio", sender: "user" })
            audioChunks.current = [];
        };
        mediaRecorderRef.current.start();
    };
    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setRecording(false);
        }
    }
    const sendMessage = () => {
        chatMessage.unshift({ id: chatMessage.length + 1, message: String(chatInput), type: "text", sender: "user" })
        setChatInput("")
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
                            <label htmlFor="my-drawer" className="btn btn-primary btn-ghost"><Star size={20} color='yellow' /></label>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer" className="drawer-overlay"></label>
                            <div className="p-4 w-full text-center bg-base-100 text-base-content">
                                <h2 className="text-lg font-bold">Rate this Chat</h2>
                                <div className="rating">
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="chat-box w-full h-full overflow-y-auto pb-12 relative">
                <div className="messages bg-base-300 h-full  rounded-3xl p-3 scroll overflow-y-auto  flex flex-col-reverse ">
                    {/* Messages will be displayed here */}
                    {chatMessage && chatMessage.map((message) => (
                        <div key={message.id} className={`chat  ${message.sender === "user" ? "chat-start" : "chat-end"}`}>
                            <div className={`chat-bubble ${message.sender === "user" ? "chat-bubble-primary" : " chat-bubble-info"} `}>

                                {message.type == "text" ? message.message : <audio src={message.message} controls />}</div>
                        </div>
                    ))}

                </div>
                <div className="flex absolute w-full bottom-0 start-0 flex-row gap-2 mt-2 h-auto">
                    <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Type a message..." className="input h-10 input-bordered w-full" />


                    {!recording ?
                        <button onClick={startRecording} disabled={recording}>
                            <Mic size={30} />
                        </button> :
                        <button onClick={stopRecording} disabled={!recording}><Mic color="red" className="animate-pulse" size={30} /></button>}
                    <button onClick={sendMessage} className="btn z-10 btn-primary btn-sm h-10">Send</button>
                </div>
            </div>

        </section>
    )
}

export default ChatPage