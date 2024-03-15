import { setFilterStatus } from "../redux/features/categoryFilterSlice";
import BottomOption from "./navbar/BottomOption";
import MidOption from "./navbar/MidOption";
import RecentChats from "./sidebar/RecentChats"
import SideChats from "./sidebar/SideChats"
import { useDispatch, useSelector } from "react-redux";
import { MdGroupAdd } from "react-icons/md";
import { openGroup } from "../redux/features/navbarSlice";
import CreateGroup from "./groupChat/CreateGroup";
import { useState } from "react";

const Sidebar = () => {
  const dispatch = useDispatch()
  const { theme } = useSelector((state) => state.theme);
  const me = JSON.parse(localStorage.getItem("userInfo"));
  const groupChat = useSelector((state) => state.navbar.groupCreate)
 
  
  return (
    <div className={`${theme ? "text-slate-200" : "bg-[#F5F7FB] text-gray-600"} min-w-[400px] max-w-[400px] h-screen border-r border-gray-500 hidden lg:block`}>
      {me.role !== "user" &&
        <>
          <div className="text-2xl font-bold  h-[8%]  flex items-center px-4 border-b border-gray-500">Sohbet</div>
          <div className="h-[12%] items-center flex min-h-[110px] pt-2">
            <SideChats  />
          </div>
        </>
      }
      <div className="flex justify-between pr-6 pt-[2px] h-[7%]">
        <div className="text-xl font-bold h-[5%] flex items-center px-4 py-3">En Son</div>
        <div onClick={() => dispatch(openGroup(!groupChat))} className={`${theme ? "hover:text-[#F5F7FB]" : "hover:text-gray-700"} text-[#7269EF]   cursor-pointer rounded-full h-8 w-8 flex items-center justify-center p-1`}>
          <MdGroupAdd size={24} />
        </div>
      </div>
      <div className=" overflow-y-scroll">
        <RecentChats /> 
      </div>

      <div className={`absolute w-[400px] h-[70px] bottom-0 ${theme ? "bg-gray-700" : "bg-[#F5F7FB]"} `}>
        <div className="flex items-center justify-between border-t border-r border-gray-500 h-full ">
      
          <div className="w-[50%]"><MidOption /></div>
          <div className="w-[50%]"><BottomOption /></div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar