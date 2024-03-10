import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const selectSearch = (state) => state.search.search;
export const { updateSearch } = searchSlice.actions;
export default searchSlice.reducer;
