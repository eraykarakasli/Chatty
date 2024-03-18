import { useDispatch,useSelector } from "react-redux";
import { openChat, openProfile } from "../../redux/features/navbarSlice";
import { BiMessageRoundedDetail, BiMessageRoundedAdd } from "react-icons/bi";
import { setFullSidebar } from "../../redux/features/fullNavbar";

const MidOption = () => {
    const dispatch = useDispatch()
    const nav = useSelector((state)=> state.navbar.chatOpen)
    const groupOpen = useSelector((state)=> state.navbar.groupCreate)
    return (
        <div className="flex justify-between w-full ">
            <div onClick={() => {dispatch(openChat()); dispatch(setFullSidebar(true))}} className="w-full flex justify-center">
                <BiMessageRoundedDetail className={`hover:bg-gray-500  p-2 rounded-md hover:bg-opacity-10 cursor-pointer duration-500   ${(nav || groupOpen) ? "bg-white bg-opacity-10 text-[#7269EF]" : "text-gray-400 "}`}size={48} />
            </div>
            <div onClick={() => dispatch(openProfile())} className="w-full flex justify-center ">
                <BiMessageRoundedAdd className={`hover:bg-gray-500  p-2 rounded-md hover:bg-opacity-10 cursor-pointer duration-500  ${(!nav && !groupOpen) ? "bg-white bg-opacity-10 text-[#7269EF]" : "text-gray-400 " }`} size={48} />
            </div>
        </div>
    )
}

export default MidOption