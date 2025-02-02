import { createSlice } from "@reduxjs/toolkit";

const currencySlice = createSlice({
  name: "currency",
  initialState: {
    selectedCurrency: "INR",
  },
  reducers: {
    setCurrency: (state, action) => {
      state.selectedCurrency = action.payload;
    },
  },
});

export const { setCurrency } = currencySlice.actions;

export const selectCurrency = (state) => state.currency.selectedCurrency;

export default currencySlice.reducer;
