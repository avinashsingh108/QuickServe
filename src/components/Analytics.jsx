import { useSelector } from "react-redux";
import { selectCurrency } from "../redux/currencySlice";
import convertPrice from "../utils/convertPrice";

const analyticsData = {
  totalRevenue: 1156700,
  servicesSold: 125,
  totalCustomers: 75,
};

const AnalyticsCard = ({ title, value }) => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg shadow-blue-100 flex flex-col space-x-4 space-y-2">
      <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
      <span className="text-4xl font-bold text-blue-600">{value}</span>
    </div>
  );
};

const Analytics = () => {
  const selectedCurrency = useSelector(selectCurrency);
  return (
    <div className="max-sm:mx-2 max-w-4xl mx-auto  space-y-4 py-20">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 border-b border-gray-300 max-w-4xl mx-auto mb-12 pb-1">
        {" "}
        Analytics
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnalyticsCard
          title="Total Customers"
          value={analyticsData.totalCustomers}
        />
        <AnalyticsCard
          title="Services Sold"
          value={analyticsData.servicesSold}
        />
        <AnalyticsCard
          title="Total Revenue"
          value={`${selectedCurrency === "INR" ? "₹" : "$"} ${convertPrice(
            selectedCurrency,
            analyticsData.totalRevenue
          )}`}
        />
      </div>
    </div>
  );
};

export default Analytics;
