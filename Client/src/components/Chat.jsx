import { HiChatBubbleLeftEllipsis } from "react-icons/hi2";
import ChatContent from "./chat/ChatContent"
import ChatInput from "./chat/ChatInput"
import ChatUser from "./chat/ChatUser"
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import CreateGroup from "./groupChat/CreateGroup";

const Chat = () => {
  const { theme } = useSelector((state) => state.theme);
  const { startChat } = useSelector((state) => state.recentUser);
  const endOfMessagesRef = useRef(null);
  const { loading } = useSelector((state) => state.messages);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      const behavior = loading ? "auto" : "smooth";
      endOfMessagesRef.current.scrollIntoView({ behavior });
    }
  }, [loading]);

  return (
    <>
      {startChat ?
        <div className={`w-[calc(100%-463px)] h-screen`}>
          <div className={`${theme ? "bg-black bg-opacity-40 " : "text-gray-600"} w-full text-slate-300 h-full`}>
            <div className=" h-[8%] ">
              <ChatUser />
            </div>
            <div className="h-[84%] ">
              <ChatContent />
              
            </div>
            <div className=" border-t border-gray-500 absolute bottom-0 md:w-[calc(100%-455px)] 2xl:w-[calc(100%-464px)] xl:w-[calc(100%-460px)] h-[70px]">
              <ChatInput />
            </div>
          </div>
        </div> :
        <div className="h-full w-full flex justify-center items-center">
          <HiChatBubbleLeftEllipsis className="text-[#7269EF]" size={140} />
        </div>
      }
     {/* <div ref={endOfMessagesRef} />  */}
    </>
  )
}

export default Chat