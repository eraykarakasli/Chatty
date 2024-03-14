import { createSlice } from "@reduxjs/toolkit";
import GroupMembers from "../../components/groupChat/GroupMembers";

const initialState = {
  chatOpen: true,
  profileOpen: false,
  navbarOpen: false,
  host: false,
  settingOpen: false,
  groupCreate: false,
  groupMembers: false,
};

export const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    openChat: (state) => {
      state.chatOpen = true;
      state.profileOpen = false;
      state.settingOpen = false;
      state.groupCreate = false;
    },
    openProfile: (state) => {
      state.chatOpen = false;
      state.profileOpen = true;
      state.settingOpen = false;
      state.groupCreate = false;
    },
    openSetting: (state, action) => {
      state.settingOpen = action.payload;
      if (state.settingOpen) {
        state.chatOpen = false;
        state.profileOpen = false;
        state.groupCreate = false;
      } else {
        state.chatOpen = true;
        state.profileOpen = false;
      }
    },
    openNavbar: (state, action) => {
      state.navbarOpen = action.payload;
    },
    openHost: (state, action) => {
      state.host = action.payload;
    },
    openGroup: (state, action) => {
      state.groupCreate = action.payload;
      state.chatOpen = false;
      state.profileOpen = false;
      state.settingOpen = false;
    },
    openGroupMembers: (state, action) =>{
      state.groupMembers = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { openChat, openProfile, openNavbar, openHost, openSetting , openGroup, openGroupMembers} =
  navbarSlice.actions;

export default navbarSlice.reducer;
