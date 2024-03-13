import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setChats, setSelectedChat } from "../../redux/providerRedux/serverSlice";
import { useToast } from "@chakra-ui/toast";
import { Skeleton, SkeletonCircle, SkeletonText, Stack } from '@chakra-ui/react'
import { increment } from "../../redux/features/counterSlice";

const OnlineMembers = () => {
    const [users, setUsers] = useState([]);
    const { theme } = useSelector((state) => state.theme);
    const { chats } = useSelector((state) => state.server);
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const dispatch = useDispatch()
    const toast = useToast()

    useEffect(() => {
        const fetchUsers = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
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


    const accessChat = async (userId) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post(`http://localhost:5000/api/chat`, { userId }, config);

            if (chats === null) {
                setChats(data);
            } else {
                if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
            }

            dispatch(setSelectedChat(data));
            dispatch(increment());
            
        } catch (error) {
            toast({
                title: "Error fetching the chat",
                status: "error",
                duration: 4000,
                isClosable: true,
                position: "top-right",
            });
        }
    };

    return (
        <div className="w-full font-semibold h-[100%] overflow-scroll overflow-x-hidden p-[1px] mx-1 space-y-2 sm:text-[9px] 2xl:text-xs">
            {users.length > 0 ? users.map((user) => (
                <div onClick={() => accessChat(user._id)} className="relative cursor-pointer bg-[#5c7dbd] p-1 px- rounded-md bg-opacity-10 hover:bg-opacity-20" key={user._id}>
                    <div className="relative flex justify-center">
                        <img className="w-10 rounded-full " src={user.pic} alt={user.name} />
                    </div>
                    <div className={`${theme ? "text-slate-200" : "text-gray-600"} flex justify-center overflow-hidden pb-1 truncate `}>
                        {user.name.substring(0, 7)}
                    </div>
                </div>
            )) :
                <div className="w-full h-full flex justify-center ">
                    <div>
                        <SkeletonCircle className="mt-1" size='12' />
                        <SkeletonCircle className="mt-1" size='12' />
                        <SkeletonCircle className="mt-1" size='12' />
                        <SkeletonCircle className="mt-1" size='12' />
                        <SkeletonCircle className="mt-1" size='12' />
                        <SkeletonCircle className="mt-1" size='12' />
                        <SkeletonCircle className="mt-1" size='12' />
                        <SkeletonCircle className="mt-1" size='12' />
                        <SkeletonCircle className="mt-1" size='12' />
                    </div>
                </div>
            }
        </div>
    )
}

export default OnlineMembers;
