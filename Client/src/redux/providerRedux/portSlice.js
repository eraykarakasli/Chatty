import { createSlice } from '@reduxjs/toolkit'

//http://2.59.117.152:5000
//http://2.59.117.152:5000
const initialState = {
    PORT:"http://2.59.117.152:5000" ,
}

export const portSlice = createSlice({
  name: 'port',
  initialState,
})



export default portSlice.reducer