import { toast } from "sonner";
import { clearCart } from "../redux/cartSlice";
import { addToCheckout } from "../redux/checkoutSlice";

export const handleCheckout = ({ dispatch, navigate, billingDetails, cartItems, totalPrice, paymentMethod }) => {
  const { fullName, email, phone, paymentInfo } = billingDetails;
  if (!fullName || !email || !phone || !paymentInfo) {
    toast.error("Please fill in all billing and payment details.");
    return;
  }

  const paymentPromise = new Promise((resolve) => setTimeout(resolve, 2000));

  toast.promise(paymentPromise, {
    loading: "Processing Payment...",
    success: () => `Payment Successful! 🎉`,
    error: "Some error occurred. Please try again.",
  });

  paymentPromise.then(() => {
    dispatch(
      addToCheckout({
        cartItems: cartItems, 
        name: billingDetails.fullName,
        email: billingDetails.email,
        number: billingDetails.phone, 
        paymentType: paymentMethod,
        pricePaid: totalPrice,
      })
    );
    dispatch(clearCart());
    navigate("/receipt");
  });
};
