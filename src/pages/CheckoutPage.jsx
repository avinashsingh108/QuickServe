import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleCheckout } from "../utils/checkout";
import EmptyCart from "../components/EmptyCart";
import {
  FaCreditCard,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGooglePay,
} from "react-icons/fa";
import { SiPaytm } from "react-icons/si";
import { LiaAmazonPay } from "react-icons/lia";
import { selectCurrency } from "../redux/currencySlice";
import convertPrice from "../utils/convertPrice";

const CheckoutPage = () => {
  const selectedCurrency = useSelector(selectCurrency);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("Credit_Card");
  const [billingDetails, setBillingDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    paymentInfo: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-blue-50 min-h-screen pb-20">
      <div className="max-w-3xl mx-auto p-6 font-outfit pt-24">
        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="space-y-8">
            <h1 className="text-3xl sm:text-4xl font-bold py-2 border-b border-gray-300 mb-4">
              Secure Checkout
            </h1>
            <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg shadow-md shadow-yellow-200 mb-4 text-center">
              <p className="text-sm sm:text-base font-medium">
                <strong>Note:</strong> This is a mock payment. Please enter
                random data for billing details and payment information.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg shadow-blue-100">
              <h2 className="text-xl pb-2 border-b border-gray-200 font-semibold mb-4">
                Order Summary
              </h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <p className="text-gray-500">{item.category}</p>
                      <p className="text-gray-700">
                        {selectedCurrency === "INR" ? "₹" : "$"}{" "}
                        {convertPrice(selectedCurrency, item.price)} x{" "}
                        {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold py-2">
                      {selectedCurrency === "INR" ? "₹" : "$"}{" "}
                      {(
                        convertPrice(selectedCurrency, item.price) *
                        item.quantity
                      ).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-between text-lg font-semibold border-t border-gray-200 pt-3">
                <span>Total:</span>
                <span>
                  {" "}
                  {selectedCurrency === "INR" ? "₹" : "$"}{" "}
                  {convertPrice(selectedCurrency, totalPrice)}
                </span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg shadow-blue-100">
              <h2 className="text-xl font-semibold mb-4">Billing Details</h2>
              <form>
                <div className="flex flex-col space-y-4">
                  <div className="relative">
                    <FaUser className="absolute left-3 top-4 text-gray-400" />
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      value={billingDetails.fullName}
                      onChange={handleInputChange}
                      className="pl-10 p-3 border border-gray-200 rounded-lg w-full focus:border-gray-400 outline-none"
                    />
                  </div>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-4 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={billingDetails.email}
                      onChange={handleInputChange}
                      className="pl-10 p-3 border border-gray-200 rounded-lg w-full focus:border-gray-400 outline-none"
                    />
                  </div>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-4 text-gray-400" />
                    <input
                      type="number"
                      name="phone"
                      placeholder="Phone Number"
                      max={10}
                      value={billingDetails.phone}
                      onChange={handleInputChange}
                      className="pl-10 p-3 border border-gray-200 rounded-lg w-full focus:border-gray-400 outline-none"
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg shadow-blue-100">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <div className="flex space-x-4">
                <button
                  type="button"
                  className={`flex items-center justify-center w-1/2 p-3 rounded-lg border cursor-pointer ${
                    paymentMethod === "Credit_Card"
                      ? "bg-blue-50 border-gray-300"
                      : "border-gray-200"
                  }`}
                  onClick={() => {
                    setPaymentMethod("Credit_Card");
                    setBillingDetails((prev) => ({ ...prev, paymentInfo: "" }));
                  }}
                >
                  <FaCreditCard className="mr-2" />
                </button>

                <button
                  type="button"
                  className={`flex items-center justify-center w-1/2 p-3 rounded-lg border cursor-pointer ${
                    paymentMethod === "UPI"
                      ? "bg-blue-50 border-gray-300"
                      : "border-gray-200"
                  }`}
                  onClick={() => {
                    setPaymentMethod("UPI");
                    setBillingDetails((prev) => ({ ...prev, paymentInfo: "" }));
                  }}
                >
                  <div className="flex text-sm gap-x-2 justify-center items-center">
                    <FaGooglePay className="text-3xl" />/
                    <SiPaytm className="text-3xl" />/
                    <LiaAmazonPay className="text-2xl" />
                  </div>
                </button>
              </div>

              {paymentMethod === "Credit_Card" && (
                <div className="mt-4 space-y-4">
                  <input
                    type="number"
                    name="paymentInfo"
                    placeholder="Card Number"
                    value={billingDetails.paymentInfo}
                    onChange={handleInputChange}
                    className="p-3 border border-gray-200 rounded-lg w-full outline-none focus:border-gray-400"
                  />
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="p-3 border border-gray-200 rounded-lg w-1/2 outline-none focus:border-gray-400"
                    />
                    <input
                      type="number"
                      placeholder="CVV"
                      className="p-3 border border-gray-200 rounded-lg w-1/2 outline-none focus:border-gray-400 "
                    />
                  </div>
                </div>
              )}

              {paymentMethod === "UPI" && (
                <div className="mt-4">
                  <input
                    type="text"
                    name="paymentInfo"
                    placeholder="Enter UPI ID (e.g., yourname@upi)"
                    value={billingDetails.paymentInfo}
                    onChange={handleInputChange}
                    className="p-3 border border-gray-300 rounded-lg w-full focus:border-gray-400 outline-none"
                  />
                </div>
              )}
            </div>

            <button
              className=" w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 cursor-pointer"
              onClick={() =>
                handleCheckout({
                  dispatch,
                  navigate,
                  billingDetails,
                  cartItems,
                  totalPrice,
                  paymentMethod,
                })
              }
            >
              Complete Purchase
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
