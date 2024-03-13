import { setFilterStatus } from "../../redux/features/categoryFilterSlice";
import RecentChats from "./RecentChats"
import SideChats from "./SideChats"
import CreateGroup from "../groupChat/CreateGroup"
import { useDispatch, useSelector } from "react-redux";
import { MdGroupAdd } from "react-icons/md";
import { openGroup } from "../../redux/features/navbarSlice";


const FullSideChats = () => {
  const dispatch = useDispatch()
  const groupChat = useSelector((state) => state.navbar.groupCreate)
  const { theme } = useSelector((state) => state.theme);
  const status = [
    "devam ediyor",
    "beklemede",
    "tamamlandı",
  ]
  return (
    <div className="h-full overflow-y-scroll p-2 lg:px-6 w-full">
      {!groupChat &&
        <>
          <div className="">
            <SideChats />
          </div>
          <div className="flex justify-between p-2  items-center">
            <div className="text-xl font-bold  h-[5%]  items-center lg:px-4 py-1 pl-2 sm:flex  ">En Son</div>
            <div className="flex gap-1 overflow-x-scroll overflow-y-hidden justify-center items-center  ">
              <div onClick={() => dispatch(openGroup(!groupChat))} className={`${theme ? "hover:text-[#F5F7FB]" : "hover:text-gray-700"} text-[#7269EF]   cursor-pointer rounded-full h-8 w-8 flex items-center justify-center p-1`}>
                <MdGroupAdd size={24} />
              </div>
            </div>
          </div>
        </>}
      <div className="">
        {!groupChat ? <RecentChats /> : <CreateGroup />}
      </div>
    </div>
  )
}

export default FullSideChats