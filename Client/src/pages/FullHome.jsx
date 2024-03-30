import { useSelector } from "react-redux";
import FullSideChats from "../components/sidebar/FullSideChats"
import FullNavbar from "../components/navbar/FullNavbar";
import FullChat from "../components/chat/FullChat";
import FullQuick from "../components/FullQuick";
import FullSetting from "../components/FullSetting";
import BottomPopUp from "../components/navbar/BottomPopUp";

const FullHome = () => {
    const { theme } = useSelector((state) => state.theme);
    const fullSidebar = useSelector((state) => state.fullnavbar.fullSidebar);
    const fullChat = useSelector((state) => state.fullnavbar.fullChat);
    const fullQuick = useSelector((state) => state.fullnavbar.fullQuick);
    const fullSetting = useSelector((state) => state.fullnavbar.fullSetting);
    const { profilePop } = useSelector((state) => state.profilePop);
    const groupChat = useSelector((state) => state.navbar.groupCreate)
    return (
        <div className={`h-screen w-full  block lg:hidden ${theme ? "text-slate-200 bg-gray-600" : "bg-[#F5F7FB] text-gray-500"}`}>
            {
                fullSidebar &&
                <div className="h-full">
                    <div className="h-[92%]">
                        {!groupChat && <div className="text-2xl font-bold  h-[8%]  flex items-center px-8 ">Sohbet</div>}
                        <div className="h-[92%] w-full">
                            <FullSideChats />
                        </div>
                    </div>
                    {!groupChat &&
                        <div className="h-[8%] border-t border-gray-400">
                            <FullNavbar />
                        </div>
                    }
                </div>
            }
            {
                fullChat && <FullChat />
            }
            {
                fullQuick && <FullQuick />
            }
            {
                fullSetting && <FullSetting />
            }
            {
                profilePop && <div className="absolute bottom-16 right-32"><BottomPopUp /></div>
            }
                
        </div>
    )
}

export default FullHome