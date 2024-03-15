import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { FaPencilAlt, FaCheck, FaUserPlus, FaAngleDown } from "react-icons/fa";
import axios from "axios";
import { IoCloseSharp } from "react-icons/io5";

const GroupMembers = () => {
    const { groupMembers } = useSelector((state) => state.navbar);
    const dispatch = useDispatch();
    const { selectedChat } = useSelector((state) => state.server);
    const { theme } = useSelector((state) => state.theme);
    const [changeName, setChangeName] = useState(selectedChat?.chatName); // Başlangıç değeri selectedChat.chatName
    const [handleName, setHandleName] = useState(false);
    const [addUser, setAddUser] = useState(false);
    const [openRemoveMenuForUser, setOpenRemoveMenuForUser] = useState(null);
    const me = JSON.parse(localStorage.getItem("userInfo"));
    const [users, setUsers] = useState([]);
    
    const handleInputChange = (e) => {
        setChangeName(e.target.value);
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
    }, []);

    const handlePostName = async () => {

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${me.token}`,
                },
            };
            const data = {
                chatId: selectedChat._id,
                chatName: changeName
            }
            await axios.put("http://localhost:5000/api/chat/rename", data, config);
            setHandleName(false)
        } catch (error) {
            console.log(error)
        }
    }
    const handleRemoveUser = async (id) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${me.token}`,
                },
            };
            const data = {
                chatId: selectedChat._id,
                userId: id
            }
            await axios.put("http://localhost:5000/api/chat/groupremove", data, config);

        } catch (error) {
            console.log(error)
        }
    }

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };
    const [searchTerm, setSearchTerm] = useState('');

    const handleAddUser = async (user) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${me.token}`,
                },
            };
            const data = {
                chatId: selectedChat._id,
                userId: user._id
            }
            await axios.put("http://localhost:5000/api/chat/groupadd", data, config);

        } catch (error) {
            console.log(error)
        }
    }
   
    const toggleRemoveMenuForUser = (userId) => {
        setOpenRemoveMenuForUser((prevUserId) => (prevUserId === userId ? null : userId));
    };

    return (
        <div className={`${!theme ? "text-black" : "text-white"} w-full flex justify-center pt-10`}>
            {selectedChat &&
                <div className="w-full">
                    <div className="w-full flex justify-center">
                        <img className="w-16" src="https://cdn1.iconfinder.com/data/icons/rounded-black-basic-ui/139/Profile_GroupFriend-RoundedBlack-512.png" alt="" />
                    </div>
                    {!handleName ?
                        <div className="w-full justify-center flex items-center gap-2">
                            {changeName ? changeName : selectedChat.chatName}
                            <div onClick={() => setHandleName(true)} className="cursor-pointer">
                                <FaPencilAlt />
                            </div>
                        </div> :
                        <div className="flex items-center justify-center">
                            <input className="bg-transparent border-[#7269EF] border-r-0 border rounded rounded-e-none p-1 outline-none h-9" onChange={handleInputChange} type="text" value={changeName} />
                            <div onClick={handlePostName} className="border-[#7269EF] cursor-pointer border h-9 flex items-center border-l-0 px-1 rounded-e">
                                <FaCheck />
                            </div>
                        </div>
                    }
                    <div className="w-full p-5 ">
                        <div className="text-sm border-b border-gray-400 p-1">
                            {selectedChat.users.length} üye
                        </div>

                        <div className="relative">
                            <div onClick={() => setAddUser(true)} className="flex items-center gap-2 p-2  cursor-pointer">
                                <div className="text-white rounded-full p-1 bg-[#7269EF]">
                                    <FaUserPlus />
                                </div>
                                <div className="">
                                    yeni üye ekle
                                </div>
                            </div>

                            {
                                addUser &&
                                <div className={` ${theme ? "bg-[#383e47]" : "bg-white"} absolute rounded z-50 w-full border border-[#7269EF] -mt-48 h-[400px] overflow-y-auto`}>
                                    <div className="flex items-center border-b border-[#7269EF] gap-2 p-2 cursor-pointer">
                                        <IoCloseSharp onClick={() => setAddUser(false)} size={20} /> Üye Ekle
                                    </div>
                                    <div className="p-2">
                                        <input
                                            className={`h-10 px-2 outline-none w-full ${theme ? "placeholder:text-white" : ""} placeholder:text-sm bg-transparent  border rounded-lg border-[#7269EF]`}
                                            type="text"
                                            placeholder="Kullanıcı ekleyin..."
                                            value={searchTerm}
                                            onChange={handleSearch}
                                        />
                                    </div>
                                    <div>
                                        {searchTerm && <div className=' overflow-y-auto overflow-x-hidden top-48 h-auto p-2  rounded-lg'>
                                            {searchTerm && users
                                                .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                                .map((user) => (
                                                    <div className='border-b flex gap-2 p-2 rounded hover:bg-gray-200 cursor-pointer hover:bg-opacity-20 '
                                                        key={user.id}
                                                        onClick={() => { handleAddUser(user); setSearchTerm("") ; setAddUser(false)}}>
                                                        <img className='w-6 h-6 rounded-full' src={user.pic} alt="" />
                                                        {user.name}
                                                    </div>
                                                ))
                                            }
                                        </div>}
                                    </div>
                                </div>
                            }

                            <div className="flex justify-between p-1 pt-2 px-2 items-center">
                                <div className="flex gap-2 items-center">
                                    <img className="w-6 rounded-full" src={selectedChat.groupAdmin.pic} alt="" />
                                    <div>{selectedChat.groupAdmin.name}</div>
                                </div>
                                <div className="text-[10px] h-5 rounded-lg flex items-center px-1 bg-[#7269EF] text-white">Grup Yöneticisi</div>
                            </div>
                            {
                                selectedChat.users && selectedChat.users.map((user, i) => (
                                    <div className="flex" key={i}>
                                        {(selectedChat.groupAdmin && selectedChat.groupAdmin._id !== user._id) && (
                                            <div className="p-2 items-center justify-between w-full flex">
                                                <div className="flex items-center gap-2">
                                                    <img className="w-6 rounded-full" src={user.pic} alt="img" />
                                                    <div>{user.name}</div>
                                                </div>
                                               {(me._id === selectedChat.groupAdmin._id) &&
                                                <div className="relative">
                                                    <div onClick={() => toggleRemoveMenuForUser(user._id)} className="cursor-pointer">
                                                        <FaAngleDown />
                                                    </div>
                                                    {openRemoveMenuForUser === user._id && (
                                                        <div className="cursor-pointer absolute right-6" onClick={() => handleRemoveUser(user._id)}>
                                                            <div className={`w-24  ${theme ? "bg-[#383f4b]": "bg-[#7269EF] text-white"} p-1 text-center text-sm hover:bg-red-700 rounded`}>
                                                                çıkar
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                }
                                            </div>
                                        )}
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                </div>
            }
        </div>
    )
}

export default GroupMembers;
