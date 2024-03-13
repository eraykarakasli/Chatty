import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quickMessage: [],
  quickRender: false,
};

export const quickMessageSlice = createSlice({
  name: "quickMessage",
  initialState,
  reducers: {
    setQuickMessage: (state, action) => {
      state.quickMessage = [...state.quickMessage, action.payload];
    },
    setQuickRender: (state, action) => {
      state.quickRender = action.payload
    },
    removeQuickMessage: (state, action) => {
      const idToRemove = action.payload;
      state.quickMessage = state.quickMessage.filter(
        (item) => item.id !== idToRemove
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { setQuickMessage, removeQuickMessage, setQuickRender } =
  quickMessageSlice.actions;

export default quickMessageSlice.reducer;
