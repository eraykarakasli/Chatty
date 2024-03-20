import { createSlice } from '@reduxjs/toolkit'

//http://localhost:5000
//http://localhost:5000
const initialState = {
    PORT:"http://localhost:5000" ,
}

export const portSlice = createSlice({
  name: 'port',
  initialState,
})



export default portSlice.reducer