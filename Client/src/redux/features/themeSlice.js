import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  theme: true,
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTeheme: (state, action) => {
        state.theme = action.payload;
      },
      
    },
})

export const { setTeheme} = themeSlice.actions

export default themeSlice.reducer