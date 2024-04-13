import Chat from "../components/Chat"
import Navbar from "../components/Navbar"
import Profile from "../components/Profile"
import Sidebar from "../components/Sidebar"
import { useSelector, useDispatch } from 'react-redux'
import BottomPopUp from "../components/navbar/BottomPopUp"
import FullHome from "./FullHome"
import Setting from "../components/Setting"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { setUser } from "../redux/providerRedux/serverSlice"
import CreateGroup from "../components/groupChat/CreateGroup"

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { chatOpen, profileOpen, groupCreate } = useSelector(state => state.navbar)
  const { profilePop } = useSelector((state) => state.profilePop);
  const setting = useSelector((state) => state.navbar.settingOpen);
  const { theme } = useSelector((state) => state.theme);
  
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === 'loginSuccess') {
        localStorage.setItem('userInfo', JSON.stringify(event.data.userInfo));
      }
    };
    window.addEventListener('message', handleMessage, false);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    const user = userInfo ? JSON.parse(userInfo) : null;

    

    dispatch(setUser(user));

    if (user) {
      navigate("/chats");
    } else {
      navigate("/");
    }
  }, [dispatch, navigate]);


  return (
    <>
      <div className={`${theme ? "bg-gray-700" : "bg-white text-gray-600"}  w-full h-screen overflow-hidden relative hidden lg:flex`}>
        <div className="w-[90px]">
          <Navbar />
        </div>
        {profilePop && <div className={`absolute bottom-20 left-[350px] z-50`}><BottomPopUp /></div>}
        {chatOpen && <Sidebar />}
        {profileOpen && <Profile />}
        {setting && <Setting />}
        {groupCreate && <CreateGroup />}
        <Chat />
      </div>
      <div className="block lg:hidden w-full">
        <FullHome />
      </div>
    </>
  )
}

export default Home