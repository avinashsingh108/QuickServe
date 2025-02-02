import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmptyCart from "../components/EmptyCart";
import downloadReceipt from "../utils/downloadReceipt";
import { HiDownload } from "react-icons/hi";

const ReceiptPage = () => {
  const navigate = useNavigate();

  const { cartItems, billingDetails, paymentType, pricePaid } = useSelector(
    (state) => state.checkout
  );

  return (
    <div className="bg-blue-50 min-h-screen pb-20">
      <div className="min-h-screen bg-blue-50 pt-24 pb-12 font-outfit max-w-3xl mx-auto">
        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className=" mx-auto p-6">
            <div className="flex justify-between items-center  border-b border-gray-200 mb-6 sm:mb-10 pb-1">
              <h1 className="text-3xl sm:text-4xl font-bold">
                Payment Receipt
              </h1>
              <button
                onClick={() =>
                  downloadReceipt(
                    billingDetails,
                    paymentType,
                    pricePaid,
                    cartItems
                  )
                }
                className=" rounded-md text-lg  cursor-pointer bg-blue-500 px-2 py-1.5"
              >
                <HiDownload className="text-white" />
              </button>
            </div>
            <div className="bg-white p-8 rounded-2xl">
              <div className="mb-6 border-b border-gray-200 pb-4">
                <h2 className="text-2xl font-semibold mb-2">
                  Billing Information
                </h2>
                <p>
                  <strong>Name:</strong> {billingDetails.name}
                </p>
                <p>
                  <strong>Email:</strong> {billingDetails.email}
                </p>
                <p>
                  <strong>Phone:</strong> {billingDetails.number}
                </p>
              </div>

              <div className="mb-6 border-b border-gray-200 pb-4">
                <h2 className="text-2xl font-semibold mb-2">Payment Details</h2>
                <p>
                  <strong>Payment Method:</strong> {paymentType}
                </p>
                <p>
                  <strong>Total Paid:</strong> ${pricePaid.toFixed(2)}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center mb-3 border-b border-gray-200 pb-2"
                  >
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.category}</p>
                      <p className="text-sm text-gray-600">
                        ${item.price} x {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate("/")}
                className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 cursor-pointer"
              >
                Back to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceiptPage;
