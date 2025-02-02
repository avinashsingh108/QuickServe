import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ReceiptPage from "./pages/ReceiptPage";
import Header from "./components/Header";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./app.css";
import { Toaster } from "sonner";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <Provider store={store}>
      <Toaster richColors closeButton position="bottom-center" toastOptions={{className: "font-outfit"}}/>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/receipt" element={<ReceiptPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
