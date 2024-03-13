import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  file: "",
  fileUploaded: null,
}

export const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setFile: (state, action)=>{
        state.file = action.payload
    },
    setFileUpload: (state, action)=>{
        state.fileUploaded = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setFile, setFileUpload } = fileSlice.actions

export default fileSlice.reducer