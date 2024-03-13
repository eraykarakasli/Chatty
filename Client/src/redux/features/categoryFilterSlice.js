import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filterCat: "Hepsi",
  loadingFilter: true,
  filterStatus: "Hepsi",
  searchFilter: ""
}

export const categoryFilterSlice = createSlice({
  name: 'categoryFilter',
  initialState,
  reducers: {
    setFilterCat: (state, action) => {
        state.filterCat = action.payload;
      },
    setFilterStatus: (state, action) => {
        state.filterStatus = action.payload;
      },
      setLoadingFilter: (state, action) => {
        state.loadingFilter = action.payload;
      },
      setSearchFilter: (state, action) => {
        state.searchFilter = action.payload;
      },
    },
})

export const { setFilterCat, setLoadingFilter, setFilterStatus, setSearchFilter } = categoryFilterSlice.actions

export default categoryFilterSlice.reducer