import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  loading: false,
  notification: [],
  fetchAgain: false,
};

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setListeMessage: (state, action) => {
      state.messages = action.payload;
    },
    addListeMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setListeLoading: (state, action) => {
      state.loading = action.payload;
    },
    setNotification: (state, action) => {
      // Eğer bu bildirim zaten mevcut değilse, kontrol et ve ekle
      const isAlreadyPresent = state.notification.some(
        (notif) => notif._id === action.payload._id
      );

      if (!isAlreadyPresent) {
        state.notification.push(action.payload);
      }
    },
    removeNotification: (state, action) => {
      state.notification = state.notification.filter(notif => notif._id !== action.payload);
    },

    setFetchAgain: (state, action) => {
      state.fetchAgain = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setListeMessage,
  setListeLoading,
  addListeMessage,
  setNotification,
  setFetchAgain,
  removeNotification,
} = messagesSlice.actions;

export default messagesSlice.reducer;
