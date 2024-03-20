import React, { useEffect, useState } from 'react';
import axios from "axios";
import { MdChevronLeft, MdClear } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import MidOption from '../navbar/MidOption';
import BottomOption from '../navbar/BottomOption';
import { useToast } from "@chakra-ui/react";
import { setFullSidebar } from '../../redux/features/fullNavbar';
import { openChat } from '../../redux/features/navbarSlice';

const CreateGroup = () => {
    const { theme } = useSelector((state) => state.theme);
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const dispatch = useDispatch()
    // Grup adını ve kullanıcı adlarını saklamak için state
    const [groupData, setGroupData] = useState({ groupName: '', userNames: [] });
    const [newGroup, setNewGroup] = useState({ name: '', users: "" });
    //Fetch users
    const [users, setUsers] = useState([]);
    // Kullanıcının girdiği metni saklayacak state
    const [searchTerm, setSearchTerm] = useState('');
    const toast = useToast()
    // Grup adı girdisini güncellemek için bir işlev
    const handleGroupNameChange = (event) => {
        setGroupData({ ...groupData, groupName: event.target.value });
    };
    // Kullanıcının girdiği metne göre users dizisini filtreleyecek fonksiyon
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    // Kullanıcı adı girdisini eklemek için bir işlev
    const handleAddUser = (userName) => {
        // Kullanıcı zaten listede değilse ekle
        if (!groupData.userNames.includes(userName)) {
            setGroupData({
                ...groupData,
                userNames: [...groupData.userNames, userName],
            });
        }
    };

    // Kullanıcının listeden kaldırılması işlevi
    const handleRemoveUser = (userName) => {
        setGroupData({
            ...groupData,
            userNames: groupData.userNames.filter(name => name !== userName),
        });
    };

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

    useEffect(() => {
        let userId = [];
        groupData.userNames.forEach(user => {
            userId.push(`${user._id}`)
        })
        setNewGroup({ name: groupData.groupName, users: userId })
    }, [groupData])

    const createGroup = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        const requestData = {
            name: newGroup.name,
            users: newGroup.users
        }
        console.log(requestData,"requestdata")
        try {
            await axios.post(`http://localhost:5000/api/chat/group`, requestData, config);
            toast({
                title: "Grup Başarıyla Oluşturuldu",
                status: "success",
                duration: "1000",
                isClosable: true,
                position: "top-right",
            })
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Grup Oluşturulurken hata oluştu.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });
        }
        dispatch(openChat())
    };





    console.log(newGroup, "new")
    return (
        <div className={`${theme ? "text-slate-200" : "text-gray-600"} lg:min-w-[400px] lg:max-w-[400px] w-full h-screen border-r border-gray-500`}>
            <div className='h-[83%] w-full'>
                <div className='h-[9.6%] w-full border-b border-gray-500 flex items-center px-4 text-2xl font-bold '>
                    <div onClick={() => dispatch(openChat())} className='pr-2 block lg:hidden'>
                        <MdChevronLeft size={24} />
                    </div>
                    Grup Oluştur
                </div>
                <div className='w-[87%] mx-auto h-[89%] mt-2 space-y-2 overflow-y-auto'>
                    <div>
                        <div className='w-full flex  justify-center py-2 '>
                            <input
                                className='h-10 px-2 outline-none  rounded-lg   w-full placeholder:font-semibold bg-transparent border-[#7269EF] border'
                                type="text"
                                placeholder='Grup adı yazın...'
                                value={groupData.groupName}
                                onChange={handleGroupNameChange}
                            />
                        </div>
                        <div className='w-full justify-center flex py-2'>
                            <input
                                className='h-10 px-2 outline-none  rounded-lg w-full placeholder:font-semibold bg-transparent border-[#7269EF] border'
                                type="text"
                                placeholder="Kullanıcı ekleyin..."
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>
                        {/* Filtrelenmiş kullanıcıları göster */}
                        {searchTerm && <div className='absolute overflow-y-auto overflow-x-hidden top-48 border bg-white max-h-40 h-auto w-[197px] px-2 text-black rounded-lg'>
                            {searchTerm && users
                                .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                .map((user) => (
                                    <div className='border-b flex gap-2 p-1 hover:bg-gray-200 cursor-pointer '
                                        key={user.id}
                                        onClick={() => { handleAddUser(user); setSearchTerm("") }}>
                                        <img className='w-6 h-6 rounded-full' src={user.pic} alt="" />
                                        {user.name}
                                    </div>
                                ))
                            }
                        </div>}
                    </div>
                    {/* Kullanıcı adlarını listeleme */}
                    <div>
                        <div>
                            <span className='text-xl'>Grup :</span>
                            <span className='font-semibold'> {groupData.groupName}</span>

                        </div>
                        <ul className='w-full h-auto pl-14 py-2'>
                            {groupData.userNames.map((userName, index) => (
                                <li key={index} className='flex items-center gap-2 py-1'>
                                    <img className='w-6 h-6 rounded-full' src={userName.pic} alt="" /> {userName.name}
                                    <MdClear className='cursor-pointer text-red-500' onClick={() => handleRemoveUser(userName)} />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <button onClick={createGroup} className={`${theme ? " " : "border-gray-700 hover:text-white hover:border-white"} hover:bg-[#7269EF] border rounded p-2 w-full`}>Oluştur</button>
                    </div>
                </div>
            </div>


            <div className="absolute w-full h-[70px] bottom-0 ">
                <div className="flex items-center justify-between border-t border-r border-gray-500 h-full">
                    <div className="w-[50%]"> <MidOption /></div>
                    <div className="w-[50%]"> <BottomOption /> </div>
                </div>
            </div>
        </div>
    );
};

export default CreateGroup;
