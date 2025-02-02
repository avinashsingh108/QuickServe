import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    cartItems: [],
    billingDetails: {
      name: "",
      email: "",
      number: "",
    },
    paymentType: "",
    pricePaid: 0,
  },
  reducers: {
    addToCheckout: (state, action) => {
      state.cartItems = action.payload.cartItems;
      state.billingDetails.name = action.payload.name;
      state.billingDetails.email = action.payload.email;
      state.billingDetails.number = action.payload.number;
      state.paymentType = action.payload.paymentType;
      state.pricePaid = action.payload.pricePaid;
    },
    clearCheckout: (state) => {
      state.cartItems = [];
      state.billingDetails = { name: "", email: "", number: "" };
      state.paymentType = "";
      state.pricePaid = 0;
    }
  }
});

export const { addToCheckout, clearCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
