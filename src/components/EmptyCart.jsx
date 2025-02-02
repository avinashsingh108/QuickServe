import { AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <div className="text-center mt-20 flex flex-col items-center">
      <AiOutlineShoppingCart className="text-7xl" />
      <h2 className="text-2xl font-semibold text-gray-800">
        Your cart is empty.
      </h2>
      <p className="mt-2 text-gray-600">
        It looks like you haven't added any services yet. Browse and pick the
        services you love!
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 cursor-pointer transition"
      >
        Browse Services
      </button>
    </div>
  );
};

export default EmptyCart;
