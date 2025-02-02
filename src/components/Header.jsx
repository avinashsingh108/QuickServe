import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PiShoppingCart, PiShoppingCartFill } from "react-icons/pi";
import { selectCurrency, setCurrency } from "../redux/currencySlice";

function Header() {
  const cartItems = useSelector((state) => state.cart.cartItems.length);
  const selectedCurrency = useSelector(selectCurrency);
  const dispatch = useDispatch();
  const handleCurrencyChange = (event) => {
    dispatch(setCurrency(event.target.value));
  };
  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4 bg-white flex justify-between px-2 sm:px-4 md:px-10 lg:px-20 xl:px-36 shadow-md font-outfit">
      <h1 className="max-sm:text-[26px] text-2xl font-bold">
        <Link to="/">QuickServe</Link>
      </h1>
      <div className="flex gap-x-4 items-center justify-center">
        <select
          id="currency"
          value={selectedCurrency}
          onChange={handleCurrencyChange}
          className="p-1 border-b border-gray-300 text-lg cursor-pointer outline-none"
        >
          <option value="INR">INR</option>
          <option value="USD">USD</option>
        </select>
        <nav>
          <Link to="/cart" className="flex items-center text-lg">
            {cartItems > 0 ? (
              <PiShoppingCartFill className="mr-1 text-2xl" />
            ) : (
              <PiShoppingCart className="mr-1 text-2xl" />
            )}
            Cart
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
