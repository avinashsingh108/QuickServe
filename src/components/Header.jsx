import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { PiShoppingCart, PiShoppingCartFill } from "react-icons/pi";

function Header() {
  const cartItems = useSelector((state) => state.cart.cartItems.length);

  return (
    <header className="fixed top-0 left-0 right-0 p-4 bg-white flex justify-between px-36 shadow-md font-outfit">
      <h1 className="text-2xl font-bold">
        <Link to="/">QuickServe</Link>
      </h1>
      <nav>
        <Link to="/cart" className="flex items-center text-lg w-28">
          {cartItems > 0 ? (
            <PiShoppingCartFill className="mr-2 text-2xl" />
          ) : (
            <PiShoppingCart className="mr-2 text-2xl" />
          )}
          Cart ({cartItems})
        </Link>
      </nav>
    </header>
  );
}

export default Header;
