import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { toast } from "sonner";

const CartPage = () => {
  const cart = useSelector((state) => state.cart.cartItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeFromCart({id}));

    toast.success("Removed from cart successfully!");
  };
  return (
    <div className="bg-blue-100 min-h-screen pb-20">
      <div className="mx-auto p-6 font-outfit bg-blue-100 max-w-3xl pt-28">
        <h1 className="text-4xl font-bold py-2 border-b border-gray-400 mb-10">
          Your Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="text-center mt-20 flex flex-col items-center">
            <AiOutlineShoppingCart className="text-7xl" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Your cart is empty.
            </h2>
            <p className="mt-2 text-gray-600">
              It looks like you haven't added any services yet. Browse and pick
              the services you love!
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 cursor-pointer transition"
            >
              Browse Services
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white p-4 rounded-lg shadow-2xl shadow-blue-200"
                >
                  <div>
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="text-gray-500">{item.category}</p>
                    <p className="text-gray-700">
                      ${item.price} x {item.quantity}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      className="bg-gray-200 p-3 text-xs hover:bg-gray-300 rounded-full cursor-pointer"
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
                    <span className="font-semibold w-6 text-center text-lg">
                      {item.quantity}
                    </span>
                    <button
                      className="bg-gray-200 p-3 text-xs hover:bg-gray-300 rounded-full cursor-pointer"
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

            <div className="mt-6 flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <button
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
