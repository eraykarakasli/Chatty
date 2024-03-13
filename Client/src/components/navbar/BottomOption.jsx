import { MdOutlineDarkMode, MdLightMode } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { setProfilePop } from "../../redux/features/profilePopSlice";
import { setTeheme } from "../../redux/features/themeSlice";
import { IoSettingsOutline } from "react-icons/io5";

const BottomOption = () => {
  const dispatch = useDispatch()
  const {profilePop} = useSelector((state) => state.profilePop);
  const {theme} = useSelector((state) => state.theme);
  return (
    <div className="flex ">
      <div onClick={()=> dispatch(setTeheme(!theme))} className="w-full flex justify-center cursor-pointer text-gray-400 ">
       {theme ? <MdOutlineDarkMode className=" bg-white bg-opacity-20 rounded-full p-[6px]  duration-300 text-white" size={40} />
         :<MdLightMode  className=" bg-yellow-300 bg-opacity-20 rounded-full p-[6px]  duration-300 text-yellow-400" size={40} />}
      </div>
      <div onClick={()=>dispatch(setProfilePop(!profilePop))} className=" w-full flex justify-center items-center cursor-pointer text-gray-400">
      <IoSettingsOutline size={28} />
      </div>
    </div>
  )
}

export default BottomOption