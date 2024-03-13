import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  profilePop: false,
  setting: false,
}

export const profilePopSlice = createSlice({
  name: 'profilePop',
  initialState,
  reducers: {
    setProfilePop: (state, action) => {
        state.profilePop = action.payload;
      },
    setSetting: (state, action) => {
        state.setting = action.payload;
      },
    },
})

// Action creators are generated for each case reducer function
export const { setProfilePop, setSetting } = profilePopSlice.actions

export default profilePopSlice.reducer