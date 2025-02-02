import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa";
import { toast } from "sonner";
import EmptyCart from "../components/EmptyCart";
import { selectCurrency } from "../redux/currencySlice";
import convertPrice from "../utils/convertPrice";

const CartPage = () => {
  const cart = useSelector((state) => state.cart.cartItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const selectedCurrency = useSelector(selectCurrency);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeFromCart({ id }));

    toast.success("Removed from cart successfully!");
  };
  return (
    <div className="bg-blue-50 min-h-svh sm:min-h-screen pb-20">
      <div className="mx-auto p-6 font-outfit max-w-3xl pt-24">
        <h1 className="text-3xl sm:text-4xl font-bold py-2 border-b border-gray-300 mb-10">
          Cart
        </h1>

        {cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <div className="bg-white p-6 rounded-2xl shadow-lg shadow-blue-100">
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between "
                  >
                    <div>
                      <h2 className="text-xl font-semibold">{item.name}</h2>
                      <p className="text-gray-500">{item.category}</p>
                      <p className="text-gray-700">
                        {selectedCurrency === "INR" ? "₹" : "$"}{" "}
                        {convertPrice(selectedCurrency, item.price)} x{" "}
                        {item.quantity}
                      </p>
                    </div>

                    <div className="flex flex-col max-sm:gap-y-4 py-2 sm:flex-row">
                      <div className="flex gap-x-1 sm:gap-x-3 items-center justify-center">
                        <button
                          className="bg-gray-200 p-2 sm:p-3 text-xs max-sm:text-[8px] hover:bg-gray-300 rounded-full cursor-pointer"
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                quantity: item.quantity - 1,
                              })
                            )
                          }
                          disabled={item.quantity <= 1}
                        >
                          <FaMinus />
                        </button>
                        <span className="font-semibold w-6 text-center sm:text-lg">
                          {item.quantity}
                        </span>
                        <button
                          className="bg-gray-200 p-2 sm:p-3 text-xs max-sm:text-[8px] hover:bg-gray-300 rounded-full cursor-pointer"
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                quantity: item.quantity + 1,
                              })
                            )
                          }
                        >
                          <FaPlus />
                        </button>
                      </div>

                      <button
                        className="text-red-500 hover:text-red-600 font-semibold ml-4 cursor-pointer"
                        onClick={() => handleRemove(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-lg shadow-blue-100 mt-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>
                  {" "}
                  {selectedCurrency === "INR" ? "₹" : "$"}{" "}
                  {convertPrice(selectedCurrency, totalPrice)}
                </span>
              </div>

              <button
                className="mt-4 w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 cursor-pointer"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
