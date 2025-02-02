import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import checkoutReducer from "./checkoutSlice";
import currencyReducer from "./currencySlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    checkout: checkoutReducer,
    currency: currencyReducer,
  },
});
export default store;
