import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdChevronLeft } from "react-icons/md";
import { setFullSidebar } from "../../redux/features/fullNavbar";
import { Select } from '@chakra-ui/react'
import axios from "axios";
import { increment } from "../../redux/features/counterSlice";
import { IoSettingsOutline } from "react-icons/io5";
import { openGroupMembers } from "../../redux/features/navbarSlice";
import { setSelectedChat } from "../../redux/providerRedux/serverSlice";
import { setClickButton, setLastSelectedChat } from "../../redux/providerRedux/messagesSlice";

const ChatUser = () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const dispatch = useDispatch()
    const { theme } = useSelector((state) => state.theme);
    const { groupMembers } = useSelector((state) => state.navbar);
    const { selectedChat } = useSelector((state) => state.server);
    const [findUser, setFindUser] = useState(null)
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedChat2, setSelectedChat2] = useState(
        {
            chatName: "default",
            createdAt: "2024-03-13T12:53:01.834Z",
            groupAdmin: {
                category: "Yok",
                createdAt: "2024-03-07T10:51:10.762Z",
                email: "default@default.com",
                name: "default",
                pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
                role: "user",
                status: "Tanımsız",
                updatedAt: "2024-03-07T10:51:10.762Z",
                _id: "00e99c1eeed2fd7f6a29be83",
            },
            isGroupChat: true,
            latestMessage: {
                chat: "00f1a1ad2f87e80a04c29a2b",
                content: "default message",
                createdAt: "2024-04-14T09:21:07.322Z",
                sender: {
                    email: "default@default.com",
                    name: "default",
                    pic: "https://slang.net/img/slang/lg/pp_4215.jpg",
                    _id: "001ba003df42805328bc03af",
                },
            },
            updatedAt: "2024-04-14T09:21:07.331Z",
            users: [
                {
                    category: "Yok",
                    createdAt: "2024-02-26T09:10:27.166Z",
                    email: "default@default.com",
                    name: "default",
                    pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
                    role: "user",
                    status: "Tanımsız",
                    updatedAt: "2024-03-04T09:23:38.213Z",
                    _id: "00dc5583ac14a811a639b92e",
                }
            ],
            _id: "00f1a1ad2f87e80a04c29a2b",
        }
    );

    
    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };
    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    };

    useEffect(() => {
        if (selectedChat) {
            if (!selectedChat.isGroupChat) {
                const selectedUser = selectedChat.users.find(users => users._id !== user._id)
                setFindUser(selectedUser)
            } else {
                setFindUser(selectedChat)
            }
        }

    }, [selectedChat])

    useEffect(() => {
        setSelectedStatus("");
        setSelectedCategory("");
        setSelectedRole("");
    }, [findUser]);

    const capitalizeFirstLetter = (string) => {
        if (!string) return string;
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const selectTheme = {
        cursor: "pointer",
        bg: theme ? "transparent" : "transparent",
        color: theme ? "white" : "black",
        _hover: {
            bg: theme ? "gray.700" : "gray.100",
        },
        option: {
            bg: theme ? "gray.700" : "gray.100",
            color: theme ? "white" : "black",
        },
    };
    console.log()
    const handleClick=()=>{
        dispatch(setLastSelectedChat(selectedChat));
        dispatch(setClickButton())
        //dispatch(setSelectedChat(selectedChat2));
    }
    return (
        <div className={`${theme ? "" : "text-gray-500"} h-full border-b  border-gray-500 flex justify-between items-center pl-3`}>
            <div className="flex items-center w-full justify-between">
                <div className="flex items-center">
                    <div onClick={() => { dispatch(setFullSidebar(true)); dispatch(openGroupMembers(false)) }} className="block cursor-pointer lg:hidden ">
                        <MdChevronLeft size={24} />
                    </div>
                    {findUser && (
                        <div className="px-3 flex items-center gap-3 font-semibold text-lg">

                            <div className="">
                                <div>{findUser.name || findUser.chatName} </div>
                                <div className="pb-1">
                                    {
                                        findUser.isGroupChat &&
                                        <div className="flex truncate gap-1 text-xs font-normal">
                                            {
                                                findUser.users.slice(0, 3).map((user, i) => (
                                                    <div key={i} >
                                                        <div>{user.name},</div>
                                                    </div>
                                                ))
                                            }
                                            {findUser.users.length > 3 && <div>...</div>}
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {findUser?.isGroupChat && <div onClick={() => dispatch(openGroupMembers(!groupMembers))} className="pr-3 cursor-pointer">
                    <IoSettingsOutline size={16} />
                </div>}
            </div>
            {(user.role === "admin" || user.role === "supporter") &&
                <div className={`px-6 flex gap-2  ${theme ? "" : "text-gray-500"}`}>
                    {user.role === "admin" &&
                        <Select sx={selectTheme} borderColor={`${theme ? "" : "black"}`} color={`${theme ? "" : "black"}`} placeholder={findUser ? capitalizeFirstLetter(findUser.role) : "Role"} value={selectedRole} onChange={handleRoleChange}>
                            <option value='admin'>Admin</option>
                            <option value='supporter'>Supporter</option>
                            <option value='user'>User</option>
                        </Select>}
                </div>}
        </div>
    );
}

export default ChatUser;
