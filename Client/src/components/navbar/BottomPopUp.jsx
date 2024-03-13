import { IoSettingsOutline } from "react-icons/io5";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authService from "../../utils/authService";
import { setProfilePop, setSetting } from "../../redux/features/profilePopSlice";
import { setUserValue } from "../../redux/userSlice";
import { openSetting } from "../../redux/features/navbarSlice";
import { setFullSetting } from "../../redux/features/fullNavbar";

const BottomPopUp = () => {
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);
  const { settingOpen } = useSelector((state) => state.navbar);
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      localStorage.removeItem("userInfo");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error('Çıkış işlemi sırasında bir hata oluştu:', error);
    }
  };

  const handleSetting = () => {
    dispatch(openSetting(!settingOpen))
    dispatch(setFullSetting(true))
    dispatch(setProfilePop(false))
  }

  return (
    <div className={`${theme ? "bg-gray-800 text-slate-200" : "bg-white border text-gray-600"}  w-28 h-22   p-2 rounded-md`}>
      <div onClick={handleSetting} className="flex items-center justify-between  mb-1  cursor-pointer border-gray-600 p-2 hover:bg-gray-500 hover:bg-opacity-10 rounded-md ">
        <div className="text-sm ">Hesabım</div>
        <IoSettingsOutline size={16} />
      </div>
      <div className="w-full border-[1px] border-gray-500"></div>
      <div onClick={handleLogout} className="flex items-center justify-between cursor-pointer  hover:bg-gray-500 hover:bg-opacity-10 rounded-md mt-1 p-2">
        <div className="text-sm ">Çıkış Yap</div>
        <RiLogoutCircleRLine size={16} />
      </div>
    </div>
  )
}

export default BottomPopUp;
