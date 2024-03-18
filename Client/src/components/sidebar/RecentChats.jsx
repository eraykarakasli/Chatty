import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setLoadingFilter, setSearchFilter } from "../../redux/features/categoryFilterSlice";
import { setFullChat } from "../../redux/features/fullNavbar";
import { setSelectedChat } from "../../redux/providerRedux/serverSlice";
import axios from "axios";
import { setStartChat } from "../../redux/features/recentUserSlice";
import { Skeleton, Stack } from '@chakra-ui/react'
import { removeNotification } from "../../redux/providerRedux/messagesSlice";

const RecentChats = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [recent, setRecent] = useState([])
    const [recentId, setRecentId] = useState()
    const [deneme, setDeneme] = useState([])
    const { filterCat, filterStatus, searchFilter } = useSelector((state) => state.filterCategory);
    const { theme } = useSelector((state) => state.theme);
    const { selectedChat } = useSelector((state) => state.server);
    const render = useSelector((state) => state.counter.value);
    const me = JSON.parse(localStorage.getItem("userInfo"));
    const { notification, messages } = useSelector((state) => state.messages);
    const [activeItems, setActiveItems] = useState();
    const [list, setList] = useState();
    const [mesaj, setMesaj] = useState();
    const [fetch, setFetch] = useState(false);
    const [recent2, setRecent2] = useState();
    const [notifi, setNotifi] = useState([]);
    const [notifi2, setNotifi2] = useState([]);
    const { temporary } = useSelector((state) => state.temporary);
    const [count, setCount] = useState(0);
    const {filterChat} = useSelector((state) => state.navbar);

    useEffect(() => {
        if (recentId) {
            notification.forEach(notif => {
                if (notif.chat._id === recentId) {
                    dispatch(removeNotification(notif._id));
                }
            });
        }
    }, [notification, recentId, dispatch]);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${me.token}`,
                    },
                };
                const { data } = await axios.get("http://2.59.117.152:5000/api/chat", config);
                setRecent(data)
            } catch (error) {
                console.log(error)
            }
        };
        fetchChats();
    }, [dispatch, me.token, filterCat, selectedChat, notification, render, notifi, filterChat])

    useEffect(() => {
        if (recent && recent.length > 0) {
            let allUsers = [];
            recent.forEach((rec) => {
                rec.users.forEach((user) => {
                    if (user.name !== me.name) {
                        allUsers.push(user);
                    } else {
                        return
                    }
                })
                if (rec.isGroupChat) {
                    allUsers.push(rec)
                }
            });
            setDeneme(allUsers);
        }
    }, [recent, notification]);

    useEffect(() => {
        const newArray = [];
        recent.forEach(item => {
            if (item.isGroupChat === false) {
                const user = item.users.find(u => u._id !== me._id);
                if (user) {
                    newArray.push(user);
                }
            } else {
                newArray.push(item);
            }
        });
        setList(newArray)
    }, [filterCat, deneme, filterStatus, searchFilter, notification, count]);


    const handleUserClick = (user, id) => {
        dispatch(setStartChat(true))
        dispatch(setFullChat(true));
        const matchedChat = recent.find(rec => {
            if (!rec.isGroupChat) {
                return rec.users.find(u => u._id === user._id);
            }
            return false;
        });
        if (matchedChat) {
            if (matchedChat.isGroupChat == false) {
                dispatch(setSelectedChat(matchedChat))
                setRecentId(id);
            }
        } else {
            dispatch(setSelectedChat(user))
            setRecentId(id);
        }

    }

    const deleteNotify = (messageId, userId) => {
        if (selectedChat && me && me.token && messageId && userId) {
            const config = {
                headers: {
                    Authorization: `Bearer ${me.token}`,
                },
            };
            axios.delete(
                `http://2.59.117.152:5000/api/notify/delete/`,
                {
                    data: { messageId: messageId, userId: userId },
                    headers: {
                        Authorization: `Bearer ${me.token}`,
                    },
                }
            ).then(response => {
                // console.log("delete işlemi çalıştı");
                //setNotifi([]);
            }).catch(error => {
                //console.log("delete hatası alıyorsun", error);
                // Kullanıcıya bir hata bildirimi göster
                // alert("Bir hata oluştu, lütfen daha sonra tekrar deneyin.");
            });
        } else {
            // Kullanıcıya bir hata bildirimi göster
            // alert("Bir hata oluştu, lütfen daha sonra tekrar deneyin.");
        }
    }

    useEffect(() => {
        const postNotify = async () => {
            if (!me) return;
            const config = {
                headers: {
                    Authorization: `Bearer ${me.token}`,
                },
            };
            const { data } = await axios.get(
                `http://2.59.117.152:5000/api/message/${selectedChat._id}`,
                config
            );
            setMesaj(data)
        };
        postNotify();
    }, [])

   // create notifi  => recent2 render için ekle 
    useEffect(() => {
        const createNotify = async () => {
            if (!me || !recent2) return;
            const config = {
                headers: {
                    Authorization: `Bearer ${me.token}`,
                },
            };
            try {
                for (const notifyItem of notifi) {
                    const { chatName, _id, createdAt, latestMessage, users, isGroupChat } = notifyItem;
                    const notifyData = {
                        chatName,
                        _id,
                        createdAt,
                        latestMessage,
                        isGroupChat,
                        users,
                    };
                    try {
                        await axios.post(`http://2.59.117.152:5000/api/notify`, notifyData, config);
                        // console.log('Başarıyla gönderildi:', notifyData);

                    } catch (error) {
                        console.error('Hata:', error);
                    }
                }
                setNotifi([])
            } catch (error) {
                console.error('Hata:', error);
            }
        };
        createNotify()
    }, [loading,recent2 ])

    ///get notifi
    useEffect(() => {
        const getNotifi = async () => {
            try {
                if (!me) return;
                const config = {
                    headers: {
                        Authorization: `Bearer ${me.token}`,
                    },
                };
                const userId = me._id;
                const response = await axios.get(`http://2.59.117.152:5000/api/notify/${userId}`, config);
                setNotifi2(response.data);

            } catch (error) {
                console.error('Hata:', error);
            }
        };

        getNotifi()
    }, [messages, selectedChat, fetch, recent2, count]);

    ///reder counter 
    useEffect(() => {
        const interval = setInterval(() => {
            setCount(count + 1);
           // console.log(count)
        }, 5000); // 5 saniyede bir çalışacak

        return () => clearInterval(interval); // Component unmount olduğunda interval'ı temizler
    }, []); // useEffect'in sadece bir kere çalışmasını sağlar, bu yüzden bağımlılıklar array içinde boş bırakılır


    ///get messages
    useEffect(() => {
        const handleMessage = async () => {
            if (!me) return;
            const config = {
                headers: {
                    Authorization: `Bearer ${me.token}`,
                },
            };
            const { data } = await axios.get(
                `http://2.59.117.152:5000/api/message/${selectedChat._id}`,
                config
            );
            setMesaj(data)
        };
        handleMessage();
    }, [selectedChat, fetch]);

    useEffect(() => {
        const findIndicesWithNewMessages = () => {
            if (!recent || !recent2) {
                return [];
            }

            const indicesWithNewMessages = [];
            for (let i = 0; i < recent.length; i++) {
                const latestMessage1 = recent[i]?.latestMessage;
                const latestMessage2 = recent2[i]?.latestMessage;

                if (!latestMessage1 || !latestMessage2) {
                    //  console.log("latest mesaj içeriği ulaşılamıyor");
                    continue;
                }

                const id1 = latestMessage1._id;
                const id2 = latestMessage2._id;

                if (id1 !== id2) {
                    indicesWithNewMessages.push({
                        index: i,
                        newMessage: recent[0] // latestMessage1 veya latestMessage2 kullanabilirsiniz
                    });
                }
            }
            return indicesWithNewMessages;
        };

        const indices = findIndicesWithNewMessages();
        if (indices.length > 0) {
           // console.log("Yeni mesajların bulunduğu indeksler:");
            indices.forEach(indexData => {
               // console.log(`Index ${indexData.index} için yeni mesaj objesi:`, indexData.newMessage);
                if (!notifi?.some(item => item._id === indexData.newMessage._id)) {
                    setNotifi(prev => [...prev, indexData.newMessage]);
                }
            });
        } else {
            //console.log("Yeni mesaj yok");
        }
        setRecent2(recent)
    }, [recent, mesaj]);

    useEffect(() => {
        setRecent2(recent)
    }, [selectedChat, mesaj, messages, temporary])

    function formatName(name) {
        const spaceIndex = name.indexOf(' ');
        let formattedName;
        if (spaceIndex === -1) {
            formattedName = name;
        } else {
            formattedName = name.slice(0, spaceIndex + 5) + ".";

        }
        return formattedName;
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3500);
        return () => clearTimeout(timer);
    }, []);

    const toggleColor = (userId) => {
        setActiveItems(userId);
    };


    const renderUserList = () => {
        return list.map((user) => {
            var groupNotifi;
            let singleNotifi;
            // Her kullanıcı için bildirim kontrolü
            
            if (user.isGroupChat == true) {
                groupNotifi = notifi2?.find(notif => notif.latestMessage.chat === user._id);
                
            }

            // notifi2 dizisindeki her bir öğeyi döngüye al
            for (const item of notifi2) {
                // item.latestMessage içindeki sender nesnesinin _id değerini al
                const senderId = item.latestMessage.sender._id;

                // Dışarıdan verilen kullanıcının _id değeri ile gönderenin _id'si eşleşiyorsa ve isGroupChat değeri false ise
                if (user._id === senderId && item.isGroupChat === false) {
                    singleNotifi = item
                }
            }

            return (<>
                {
                    <div onClick={() => {dispatch(setSearchFilter("")); handleUserClick(user, user._id); toggleColor(user._id); setFetch(!fetch); deleteNotify(singleNotifi?.messageId || groupNotifi?.messageId, me._id) }}
                        className={`${activeItems === user._id && `${theme ? "bg-white bg-opacity-20 ": "bg-gray-200"}  rounded`} justify-between border-b border-gray-500 flex gap-3 items-center rounded-t-md ${theme ? "hover:bg-white": "hover:bg-gray-700"}  hover:bg-opacity-10 p-1 px-3 cursor-pointer`}
                        key={user._id}>
                        <div className="flex gap-3 items-center">
                            <div className="relative w-10">
                                <img className="w-10 h-10 rounded-full" src={user.pic || "https://cdn1.iconfinder.com/data/icons/rounded-black-basic-ui/139/Profile_GroupFriend-RoundedBlack-512.png"} alt="img" />
                            </div>
                            <div className="h-12">
                                <div className="flex justify-between gap-3 items-center h-full  w-full truncate  font-semibold">
                                    {user.chatName || user.name}
                                    {/* {user._id} */}
                                </div>
                            </div>
                        </div>

                        {(groupNotifi || singleNotifi) && <>
                            <div className="text-xs font-semibold bg-red-500 h-2 w-2 rounded-full  animate-pulse"></div>
                        </>}

                        <div className="text-xs font font-semibold flex items-center h-full  text-slate-400"></div>
                    </div>}
            </>
            )
        })
    }

    return (
        <div className={`lg:px-6 ${theme ? "text-slate-200" : "text-gray-600"} `}>
            {list ? renderUserList() :
                <div className="">
                    {loading ? <Stack>
                        <Skeleton height='50px' />
                        <Skeleton height='50px' />
                        <Skeleton height='50px' />
                        <Skeleton height='50px' />
                        <Skeleton height='50px' />
                        <Skeleton height='50px' />
                        <Skeleton height='50px' />
                        <Skeleton height='50px' />
                        <Skeleton height='50px' />
                        <Skeleton height='50px' />
                        <Skeleton height='50px' />
                        <Skeleton height='50px' />
                        <Skeleton height='50px' />
                    </Stack> :
                        <div className="flex justify-center w-full pt-6 font-semibold">
                            Bir Sohbet Başlatın.
                        </div>}

                </div>
            }
        </div>
    )
}

export default RecentChats


