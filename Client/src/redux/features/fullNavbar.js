import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullChat: false,
  fullSidebar: true,
  fullSetting: false,
  fullQuick: false,
};

export const fullNavbarSlice = createSlice({
  name: "fullnavbar",
  initialState,
  reducers: {
    setFullChat: (state, action) => {
      state.fullChat = action.payload;
      state.fullSidebar = false;
      state.fullSetting = false;
      state.fullQuick = false;
    },
    setFullSidebar: (state, action) => {
      state.fullSidebar = action.payload;
      state.fullChat = false;
      state.fullSetting = false;
      state.fullQuick = false;
    },
    setFullSetting: (state, action) => {
      state.fullSetting = action.payload;
      state.fullSidebar = false;
      state.fullChat = false;
      state.fullQuick = false;
    },
    setFullQuick: (state, action) => {
      state.fullQuick = action.payload;
      state.fullSetting = false;
      state.fullSidebar = false;
      state.fullChat = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFullChat, setFullSidebar, setFullSetting, setFullQuick } =
  fullNavbarSlice.actions;

export default fullNavbarSlice.reducer;
