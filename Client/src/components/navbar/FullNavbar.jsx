import { useDispatch, useSelector } from "react-redux";
import { IoSettingsOutline } from "react-icons/io5";
import { BiMessageRoundedAdd, BiMessageRoundedDetail } from "react-icons/bi";
import { openChat, openProfile } from "../../redux/features/navbarSlice";
import { setTeheme } from "../../redux/features/themeSlice";
import { MdLightMode, MdOutlineDarkMode } from "react-icons/md";
import { setFullChat, setFullQuick, setFullSetting } from "../../redux/features/fullNavbar";
import { setProfilePop } from "../../redux/features/profilePopSlice";


const FullNavbar = () => {
    const dispatch = useDispatch()
    const { theme } = useSelector((state) => state.theme);
    const { profilePop } = useSelector((state) => state.profilePop);
    const nav = useSelector((state) => state.navbar.chatOpen)
    const groupOpen = useSelector((state) => state.navbar.groupCreate)
    return (
        <div className={`h-full  ${theme ? "text-slate-200 bg-gray-600" : " text-gray-600"}`}>
            <div className={`w-full h-full `}>

                <div className={`w-full h-full flex justify-between items-center px-6`}>
                    <div onClick={() => dispatch(setFullChat(true))} className="">
                        <div onClick={() => dispatch(openChat())} className="w-full flex justify-center">
                            <BiMessageRoundedDetail className={`hover:bg-gray-500  p-2 rounded-md hover:bg-opacity-10 cursor-pointer duration-500   ${(nav || groupOpen) ? "bg-white bg-opacity-10 text-[#7269EF]" : "text-gray-400 "} `} size={48} />
                        </div>
                    </div>
                    <div onClick={() => dispatch(setFullQuick(true))}>
                        <div onClick={() => dispatch(openProfile())} className="w-full flex justify-center">
                            <BiMessageRoundedAdd className={`hover:bg-gray-500  p-2 rounded-md hover:bg-opacity-10 cursor-pointer duration-500 text-gray-400`} size={48} />
                        </div>
                    </div>
                    
                    <div >
                        <div onClick={() => dispatch(setTeheme(!theme))} className="w-full flex justify-center cursor-pointer text-gray-400 ">
                            {theme && <MdOutlineDarkMode className=" bg-white bg-opacity-20 rounded-full p-[6px]  duration-300 text-white" size={40} />}
                            {!theme && <MdLightMode className=" bg-yellow-300 bg-opacity-20 rounded-full p-[6px]  duration-300 text-yellow-400 " size={40} />}
                        </div>
                    </div>

                    <div className="cursor-pointer text-gray-400" onClick={() => dispatch(setProfilePop(!profilePop))}>
                        <IoSettingsOutline size={28} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default FullNavbar