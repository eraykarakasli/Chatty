import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    temporary: "",
}

export const temporarySlice = createSlice({
  name: 'temporary',
  initialState,
  reducers: {
    setTemporary: (state,action)=>{
        state.temporary = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setTemporary } = temporarySlice.actions

export default temporarySlice.reducer