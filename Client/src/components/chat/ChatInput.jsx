import { useEffect, useState } from 'react';
import { IoSendSharp } from "react-icons/io5";
import InputEmoji from "react-input-emoji";
import { RiAttachment2 } from "react-icons/ri";
import { TiPlus } from 'react-icons/ti';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import io from "socket.io-client";
import { setFetchAgain, setListeLoading, setListeMessage, setNotification } from '../../redux/providerRedux/messagesSlice';
import { setTemporary } from '../../redux/features/temporarySlice';
import FileUpload from '../FileUpload';
import { setFile } from '../../redux/providerRedux/fileSlice';
const ENDPOINT = "http://2.59.117.152:5000";
var socket, selectedChatCompare;

const ChatInput = () => {
  const dispatch = useDispatch()
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [quickMessages, setQuickMessages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [inputFile, setInputFile] = useState(false);
  const [box, setBox] = useState(false);
  // const { quickMessage } = useSelector((state) => state.quickMessage)
  const { theme } = useSelector((state) => state.theme)
  const { quickRender } = useSelector((state) => state.quickMessage)
  const { selectedChat } = useSelector((state) => state.server)
  const { notification, fetchAgain } = useSelector((state) => state.messages)
  const [isFileJustUploaded, setIsFileJustUploaded] = useState(false);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { file } = useSelector(state => state.file)

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      dispatch(setListeLoading(true))
      setLoading(true);

      const { data } = await axios.get(
        `http://2.59.117.152:5000/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Mesjlar yüklenemedi!",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    dispatch(setListeMessage(messages))
    dispatch(setListeLoading(false))
  }, [messages]);
 
  const sendMessage = async (autoMessageContent) => {
    const messageToSend = autoMessageContent || newMessage;

    if (messageToSend) {
      dispatch(setTemporary(messageToSend))
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "http://2.59.117.152:5000/api/message",
          {
            content: messageToSend,
            chatId: selectedChat._id,
          },
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Mesaj gönderilemedi!",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
      }
    }
  };

  useEffect(() => {
    if (isFileJustUploaded && file) {
      sendMessage(file.fileUrl);
      dispatch(setFile(null));
      setIsFileJustUploaded(false); // Mesaj gönderildikten sonra bayrağı sıfırla
    }
  }, [isFileJustUploaded, file]);



  useEffect(() => {
    socket = io(ENDPOINT);
    if (user && user._id) {
      socket.emit("setup", user);
      socket.on("connected", () => setSocketConnected(true));
      socket.on("typing", () => setIsTyping(true));
      socket.on("stop typing", () => setIsTyping(false));
    }

    return () => {
      socket.disconnect();
    }
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);


  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (!newMessageRecieved || !newMessageRecieved.chat || !newMessageRecieved.chat.users) {
        console.log("Geçersiz mesaj alındı");
        return;
      }
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          dispatch(setNotification(newMessageRecieved));
          //dispatch(setFetchAgain(!fetchAgain));
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const handleQuickBox = () => {
    if (quickMessages.length > 0) {
      setBox(!box)
    } else {
      setBox(false)
    }
  }

  useEffect(() => {
    const fetchQuickMessages = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const response = await axios.get('http://2.59.117.152:5000/api/quick', config);
        if (response.data.length > 0) {
          const newQuick = response.data.filter(quick => quick.userId == user._id)
          setQuickMessages(newQuick);
        }

      } catch (error) {
        console.error('Quick mesajları alınırken hata:', error);
      }
    };

    fetchQuickMessages();
  }, [setQuickMessages, quickRender]);


  const handleFile = () => {
    setInputFile(!inputFile)

  }
  useEffect(() => {
    if (isFileJustUploaded) {
      setInputFile(false)
    }
  }, [isFileJustUploaded])

  return (
    <div className={`flex w-full  items-center h-full px-2 py-1 justify-center ${theme ? "text-slate-200 bg-gray-700" : "bg-[#F5F7FB] text-gray-500"}`}>
      {/* quickMessage table */}
      {box && <div className={`${theme ? "bg-black bg-opacity-80" : "bg-slate-400 text-black bg-opacity-60"}  absolute bottom-20 p-3 w-[90%]  h-[300px] rounded-md break-all overflow-scroll overflow-x-hidden `}>
        {quickMessages.map((message) => (
          <div
            className='my-3 border rounded-md p-2 cursor-pointer'
            onClick={() => { setNewMessage(message.content); setBox(false) }}
            key={message._id}>
            {message.content}
          </div>
        ))}
      </div>}
      {inputFile &&
        <div className={`${theme ? "bg-black bg-opacity-90" : "bg-slate-400 text-black  bg-opacity-80"}  absolute bottom-20 p-3 w-[80%] md:w-[30%]  rounded-md break-all overflow-scroll overflow-x-hidden `}>
          <FileUpload setIsFileJustUploaded={setIsFileJustUploaded} />
          {/* <FileDisplay /> */}
        </div>}
      {/* quick message button */}
      <div className='flex justify-between gap-3'>
        <div onClick={handleQuickBox}
          className={`p-1 rounded-md cursor-pointer  duration-200 ${theme ? "hover:bg-white hover:bg-opacity-10 text-slate-300" : "hover:bg-black hover:bg-opacity-10  text-gray-600"}`}>
          <TiPlus size={28} />
        </div>
        <button onClick={handleFile} className='text-3xl font-semibold p-1 px-2 rounded-md hover:bg-white hover:bg-opacity-10 text-[#7269EF]'><RiAttachment2 size={24} /></button>
      </div>
      <div className='w-[85%]'>
        <InputEmoji
          type="text"
          value={newMessage}
          onChange={setNewMessage}
          placeholder='Bir mesaj yazın'
          onEnter={() => sendMessage(newMessage)}
          theme='auto'
          maxLength={500}
          borderRadius={6}
        />
      </div>
      <div className='gap-2 md:flex  hidden pr-3'>
        <button onClick={() => sendMessage(newMessage)} className='flex text-white items-center justify-center  p-3 rounded-md bg-[#7269EF] hover:bg-opacity-70'><IoSendSharp size={20} /></button>
      </div>
    </div>
  )
}

export default ChatInput