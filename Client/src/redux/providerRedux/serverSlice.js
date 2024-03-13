import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 user: null,
 selectedChat: null,
 selectedChatId: "",
 chats: [],
 notification: [],
}

export const serverSlice = createSlice({
  name: 'server',
  initialState,
  reducers: {
    setUser: (state, action) => {
        state.user = action.payload;
      },
      setSelectedChat: (state, action) => {
        state.selectedChat = action.payload;
      },
      setChats: (state, action) => {
        // Eğer yeni sohbet zaten varsa, eklemeyin
        const isChatExist = state.chats.some(chat => chat._id === action.payload._id);
        if (!isChatExist) {
          // Yeni sohbeti mevcut sohbetlerin başına ekleyin
          state.chats = action.payload;
        }
      },
      setNotification: (state, action) => {
        state.notification = action.payload;
      },
      setSelectedChatId: (state, action) => {
        state.selectedChatId = action.payload;
      },
    },
})

export const { setUser, setSelectedChat, setChats, setNotification, setSelectedChatId } = serverSlice.actions

export default serverSlice.reducer