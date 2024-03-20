import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { setSearchFilter } from "../../redux/features/categoryFilterSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import {openfilterChat} from "../../redux/features/navbarSlice"

const SideChats = () => {
    const dispatch = useDispatch()
    const me = JSON.parse(localStorage.getItem("userInfo"));
    const { theme } = useSelector((state) => state.theme);
    const searchFilter = useSelector((state) => state.filterCategory.searchFilter);
    const {filterChat} = useSelector((state) => state.navbar);
    const [filteredUsers, setFilteredUsers] = useState();
    const [users, setUsers] = useState();
    
    const handleInputChange = (event) => {
        dispatch(setSearchFilter(event.target.value.toLowerCase()));
    };
    
    useEffect(() => {
        const fetchUsers = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${me.token}`,
                },
            };
            try {
                const response = await axios.get(`http://localhost:5000/api/user?search=`, config);
                setUsers(response.data);
            } catch (error) {
                console.error("Veri alınırken hata oluştu:", error);
            }
        };
        fetchUsers();
    }, [searchFilter]);

    useEffect(() => {
        const filterUsers = () => {
            // Eğer arama filtresi boşsa, tüm kullanıcıları göster
            if (!searchFilter.trim()) {
                setFilteredUsers(users);
                return;
            }

            // Arama filtresine göre kullanıcıları filtrele
            const filtered = users.filter(user =>
                user.name.toLowerCase().includes(searchFilter.toLowerCase())
            );
            setFilteredUsers(filtered);
        };
        filterUsers()
       
    }, [searchFilter, users]);

    const accessChat = async (userId) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${me.token}`,
                },
            };
            const { data } = await axios.post(`http://localhost:5000/api/chat`, { userId }, config);

            
            
        } catch (error) {
            
        }
        dispatch(openfilterChat(!filterChat))
        dispatch(setSearchFilter(""));
       
    };

    return (
        <div className={`${theme ? "text-white " : " text-gray-600"} lg:px-6 space-y-4  font-semibold w-full relative`}>
            <div className="flex items-center border border-[#7269EF] gap-2 p-2 rounded-md">
                <CiSearch className="" size={22} />
                <input
                    className="bg-transparent outline-none text-sm  w-full "
                    onChange={handleInputChange}
                    type="text"
                    value={searchFilter}
                    placeholder="Aratın veya yeni sohbet başlatın..." />
            </div>
            {(searchFilter && filteredUsers) &&
                <div className={`absolute z-50 lg:w-[350px] w-full ${theme ? "bg-[#3f4552]" : "bg-[#7269EF] text-white"} p-3 rounded overflow-y-auto`}>
                    {
                        filteredUsers.map(user => (
                            <div onClick={()=> accessChat(user._id)} className="p-1 flex items-center gap-3 space-y-2 border-b border-gray-400 cursor-pointer hover:bg-white hover:bg-opacity-10 rounded-md">
                                <div >
                                    <img className="w-6 rounded-full" src={user.pic} alt="" />
                                </div>
                                <div>
                                    {user.name}
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default SideChats