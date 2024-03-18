import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spinner, useToast } from '@chakra-ui/react'
import axios from "axios";
import { setTemporary } from "../../redux/features/temporarySlice";
import { MdDownload } from "react-icons/md";
import { GrDocumentPdf, GrDocumentTxt } from "react-icons/gr";
import { PiMicrosoftExcelLogoFill, PiMicrosoftPowerpointLogoFill, PiMicrosoftWordLogoFill } from "react-icons/pi";
import { FaFileDownload } from "react-icons/fa";
import { FaRegFileZipper } from "react-icons/fa6";


const ChatContent = () => {
  const toast = useToast();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const { loading } = useSelector((state) => state.messages);
  const { temporary } = useSelector((state) => state.temporary);
  const [messages, setMessages] = useState([])
  const { theme } = useSelector((state) => state.theme);
  const endOfMessagesRef = useRef(null);
  const isMessagesArray = Array.isArray(messages);
  const { selectedChat } = useSelector((state) => state.server)
  const [lastFetchedMessages, setLastFetchedMessages] = useState([]);
  const dispatch = useDispatch()

  const tempMessage = {
    chat: {
      chatName: "sender",
      createdAt: "2023-12-25T12:20:36.868Z",
      isGroupChat: false,
      latestMessage: "658d596371ec55a2da87848e",
      updatedAt: "2023-12-28T11:17:55.764Z",
      users: [user?._id, selectedChat?.users[1]._id]
    },
    content: temporary,
    chatId: selectedChat?._id,
    sender: {
      email: user?.email,
      name: user?.name,
      pic: user?.pic,
      _id: user?._id || "156151515186151984"
    },
    updatedAt: "2023-12-28T11:17:55.764Z",
    createdAt: "2023-12-28T11:17:55.764Z",
    __v: 0,
    _id: `id-${Date.now()}-${Math.random()}`
  };

  const areMessagesSame = (messages1, messages2) => {
    if (messages1.length !== messages2.length) return false;
    for (let i = 0; i < messages1.length; i++) {
      if (messages1[i]._id !== messages2[i]._id) return false;
    }
    return true;
  };

  useEffect(() => {
    const handleMessage = async () => {
      if (!selectedChat) return;
      try {
        if (user && temporary) {
          messages.push(tempMessage)
        }
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(
          `http://2.59.117.152:5000/api/message/${selectedChat._id}`,
          config
        );

        if (!areMessagesSame(data, lastFetchedMessages)) {
          setMessages(data);
          dispatch(setTemporary(""))
          setLastFetchedMessages(data);
        }

      } catch (error) {
        toast({
          title: "Mesajlar yüklenemedi!",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
      }
    };
    handleMessage();
  }, [selectedChat, user.token, user]);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      const behavior = loading ? "auto" : "smooth";
      endOfMessagesRef.current.scrollIntoView({ behavior });
    }
  }, [messages, loading]);

  function formatTimeShort(isoString) {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function formatName(name) {
    const spaceIndex = name.indexOf(' ');
    let formattedName;
    if (spaceIndex === -1) {
      formattedName = name;
    } else {
      formattedName = name.slice(0, spaceIndex + 2);
    }
    return formattedName;
  }

  function formatContent(content) {

    if (content && content.includes(".png") || content.includes(".gif") || content.includes(".jpg") || content.includes(".jpeg") || content.includes(".svg")) {
   
      return <img className="w-[100px] md:w-[200px] sm:w-[150px]" src={content} alt="Yüklenen Resim" />

    } else if (content && (content.includes(".mp4") || content.includes(".ogg") || content.includes(".avi") || content.includes(".mov") || content.includes(".mpeg"))) {
      let videoType = "video/mp4";
      if (content.includes(".ogg")) {
        videoType = "video/ogg";
      } else if (content.includes(".avi")) {
        videoType = "video/avi";
      } else if (content.includes(".mov")) {
        videoType = "video/quicktime";
      } else if (content.includes(".mpeg")) {
        videoType = "video/mpeg";
      }
      return (
        <video width="320" height="240" controls>
          <source src={content} type={videoType} />
          Desteklenmeyen Video
        </video>
      );

    } else if (content && (content.includes("localhost" || "http" || "www.") || content.includes("http"))) {
      const lastSlashIndex = content.lastIndexOf('/');
      const lastDotIndex = content.lastIndexOf('.');
      if (lastSlashIndex === -1) {
        return '';
      }
      const filename = content.substring(lastSlashIndex + 1);
      const beforeName = content.substring(lastDotIndex + 1)
      let icon;
      if (beforeName === "pdf") {
        icon = <GrDocumentPdf className="text-red-600" size={20} />
      } else if (beforeName === "doc" || beforeName === "docx") {
        icon = <PiMicrosoftWordLogoFill className="text-blue-600" size={24} />
      } else if (beforeName === "xlsx" || beforeName === "xls") {
        icon = <PiMicrosoftExcelLogoFill className="text-green-600" size={24} />
      } else if (beforeName === "pptx" || beforeName === "ppt") {
        icon = <PiMicrosoftPowerpointLogoFill className="text-orange-700" size={24} />
      } else if (beforeName === "txt") {
        icon = <GrDocumentTxt className="text-black" size={20} />
      } else if (beforeName === "zip" || beforeName === "rar") {
        icon = <FaRegFileZipper className="text-yellow-600" size={20} />
      } else {
        icon = <FaFileDownload className="text-black" size={20} />
      }

      return <a target="_blank"  className="text-black flex items-center gap-1 w-full justify-between break-all cursor-pointer" download href={content}><span className="flex items-center gap-1">{icon}{filename}</span><MdDownload className="text-green-600 pt-1" size={24} /></a>

    } else {
      const parts = content.split('/');
      const fileName = parts[parts.length - 1];
      return fileName;
    }
  }

  useEffect(() => {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div id="chat-container" className={` h-full p-10 overflow-y-scroll overflow-x-hidden space-y-1 ${theme ? "" : "text-gray-500"}`}>
      {isMessagesArray && !loading ? (
        messages.map((msg) => {
          const isSender = msg.sender?._id === user._id;
          return (
            <div key={msg._id} className="w-full  mt-1">
              {isSender ? (
                // Mesaj gönderici tarafından gönderildiyse
                <div className="flex  gap-3 w-full items-end justify-end">
                  <div className="lg:w-[41%] w-[70%]  rounded-md p-2 text-gray-900 bg-[#c6c5d2]">
                    {formatContent(msg.content)}
                  </div>
                  <img className="w-10 h-10 rounded-full" src={user.pic} alt={user.name} />
                </div>
              ) : (
                // Mesaj alıcı tarafından gönderildiyse
                <div className="flex gap-3  items-end">
                  <img className="w-10 h-10 rounded-full" src={msg.sender.pic} alt={msg.sender.name} />
                  <div className="lg:w-[40%] w-[70%] rounded-md p-2 text-slate-100 bg-[#7269EF] truncate">
                    {formatContent(msg.content)}
                  </div>
                </div>
              )}
              {isSender ?
                //  Sender
                <div className="flex items-center justify-end mt-1">
                  <div className="flex justify-end text-xs font-semibold lg:w-[40%] w-[70%] px-14">{formatTimeShort(msg.createdAt)}</div>
                </div> :
                // receiver
                <div className={`flex items-center gap-14`}>
                  <div className={` text-sm   mt-1 w-[19%] `}>{isSender ? formatName(user.name) : formatName(msg.sender.name)}</div>
                  <div className={`flex justify-end text-xs font-semibold lg:w-[22%] w-[53%] px-6`}>{formatTimeShort(msg.createdAt)}</div>
                </div>
              }
            </div>
          );
        })
      ) : (
        <div className="h-full w-full flex items-center justify-center">  <Spinner size='xl' /></div>
      )}
      {/* <div ref={endOfMessagesRef} />  */}
    </div>
  )
}

export default ChatContent