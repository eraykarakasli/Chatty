import { useState, useEffect } from 'react';
import InputEmoji from "react-input-emoji";
import { LiaTimesSolid } from "react-icons/lia";
import { useSelector } from "react-redux";
import { MdChevronLeft } from 'react-icons/md';
import { useDispatch } from 'react-redux'
import { setFullSidebar } from '../redux/features/fullNavbar';
import { TiPlus } from "react-icons/ti";
import axios from 'axios';
import { setQuickRender } from '../redux/features/quickMessageSlice';
import { useToast } from "@chakra-ui/react";
import MidOption from './navbar/MidOption';
import BottomOption from './navbar/BottomOption';

const Profile = () => {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const { theme } = useSelector((state) => state.theme)
  const { quickRender } = useSelector((state) => state.quickMessage)
  const [quickMessages, setQuickMessages] = useState([]);
  const [render, setRender] = useState(false);
  const [text, setText] = useState('');
  const [inp, setInp] = useState(false);
  const toast = useToast()

  useEffect(() => {
    const fetchQuickMessages = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const response = await axios.get('http://localhost:5000/api/quick', config);
        if (response.data.length > 0) {
          const newQuick = response.data.filter(quick => quick.userId == user._id)
          setQuickMessages(newQuick);
        }


      } catch (error) {
        toast({
          title: "Quick mesajları alınırken hata oluştu!",
          status: "error",
          duration: "2000",
          isClosable: true,
          position: "top-right",
        })
        console.error('Quick mesajları alınırken hata:', error);
      }
    };

    fetchQuickMessages();
  }, [setQuickMessages]);

  const handleOnEnter = async (text) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.post('http://localhost:5000/api/quick', { userId: user._id, content: text }, config);
      setQuickMessages([...quickMessages, response.data]);
      setText("");
      setInp(false);
      if (quickRender) {
        dispatch(setQuickRender(false))
      } else {
        dispatch(setQuickRender(true))
      }
      toast({
        title: "Quick mesaj eklendi.",
        status: "success",
        duration: "1000",
        isClosable: true,
        position: "top-right",
      })
    } catch (error) {
      toast({
        title: "Quick mesaj eklenirken hata oluştu!",
        status: "error",
        duration: "2000",
        isClosable: true,
        position: "top-right",
      })
      console.error('Mesaj gönderilirken hata:', error);
    }
  };


  const handleRemoveMessage = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.post('http://localhost:5000/api/quick/delete', { id }, config);
      setQuickMessages(quickMessages.filter(msg => msg._id !== id));
      setRender(!render)
      if (quickRender) {
        dispatch(setQuickRender(false))
      } else {
        dispatch(setQuickRender(true))
      }
      toast({
        title: "Quick mesaj kaldırıldı.",
        status: "success",
        duration: "1000",
        isClosable: true,
        position: "top-right",
      })
    } catch (error) {
      toast({
        title: "Quick mesaj silinirken hata oluştu!",
        status: "error",
        duration: "2000",
        isClosable: true,
        position: "top-right",
      })
      console.error('Mesaj silinirken hata:', error);
    }
  };


  return (
    <div className={`${theme ? "text-slate-200" : "text-gray-600"} lg:min-w-[400px] lg:max-w-[400px] w-full h-screen border-r border-gray-500`}>
      <div className='h-[83%] w-full overflow-auto'>
        <div className='h-[9.6%] w-full border-b border-gray-500 flex items-center px-4 text-2xl font-bold '>
          <div onClick={() => dispatch(setFullSidebar(true))} className='pr-2 block lg:hidden cursor-pointer'>
            <MdChevronLeft size={24} />
          </div>
          Hızlı Mesaj
        </div>
        <div className='w-[87%] mx-auto h-[89%] mt-2 space-y-2 overflow-y-scroll'>
          {quickMessages.map((msg) => (
            <div className='text-slate-200 w-full h-auto flex justify-between gap-1 border rounded-md bg-[#7269EF] p-2' key={msg._id}>
              <div className='w-[92%] h-auto  break-all'>{msg.content}</div>
              <button className='w-[8%]' >
                <LiaTimesSolid onClick={() => handleRemoveMessage(msg._id)} size={18} className='hover:text-red-500 duration-300' />
              </button>
            </div>
          ))}
        </div>
      </div>

      {inp ? <div className='h-[8%]  border-gray-500 flex items-center pb-10'>
        <InputEmoji
          type="text"
          value={text}
          onChange={setText}
          placeholder='Bir mesaj yazın'
          onEnter={handleOnEnter}
          theme='auto'
          borderRadius={6}
          maxLength={250}
        />
      </div> :
        <div onClick={() => setInp(true)} className='w-full h-[8%] items-center pb-8  flex justify-center cursor-pointer hover:text-[#7269EF] duration-300'>
          <TiPlus size={40} />
        </div>
      }
      <div className="absolute w-[400px] h-[70px] bottom-0 ">
        <div className={` flex items-center justify-between border-t border-r border-gray-500 h-full `}>
          <div className="w-[50%]"> <MidOption /></div>
          <div className="w-[50%]"> <BottomOption /> </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
