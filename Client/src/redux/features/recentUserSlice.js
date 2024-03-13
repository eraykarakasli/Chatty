import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    startChat: false,
    loading: false,
}

export const recentUserSlice = createSlice({
  name: 'recentUser',
  initialState,
  reducers: {
    setStartChat: (state, action) => {
        state.startChat = action.payload
      },
      setLoading: (state, action) => {
        state.loading = action.payload;
      },
    },
})


export const { setStartChat, setLoading} = recentUserSlice.actions

export default recentUserSlice.reducer