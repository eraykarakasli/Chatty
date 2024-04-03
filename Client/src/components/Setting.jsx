import { MdChevronLeft } from "react-icons/md"
import { useDispatch, useSelector } from 'react-redux'
import { setFullSidebar } from "../redux/features/fullNavbar"
import MidOption from "./navbar/MidOption"
import BottomOption from "./navbar/BottomOption"
import FullNavbar from "./navbar/FullNavbar"

const Setting = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.server);
  const { theme } = useSelector((state) => state.theme);

  return (
    <div className={`${theme ? "text-slate-200" : "bg-[#F5F7FB] text-gray-600"} min-w-[400px]  h-screen border-r border-gray-500  lg:block`}>
      <div className="text-2xl font-bold  h-[8%]  flex items-center px-4 gap-1 border-b border-gray-500">
        <div onClick={() => dispatch(setFullSidebar(true))} className="block lg:hidden cursor-pointer"><MdChevronLeft size={24} /></div>
        Hesabım
      </div>
      <div className="flex justify-between p-6 h-[84%] ">
        <div className="flex gap-2 overflow-x-scroll overflow-y-hidden">
          <img className="w-20 h-20 rounded-full" src={user?.pic} alt="fotoğraf bulunamadı" />
          <div>
            <div><span className="font-semibold"> ID: </span>{user?._id}</div>
            <div><span className="font-semibold">E-posta: </span> {user?.email}</div>
            <div><span className="font-semibold">Kullanıcı Adı: </span>{user?.name}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Setting