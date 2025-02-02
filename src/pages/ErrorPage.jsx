import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100 text-gray-700 px-4 font-outfit">
      <h1 className="text-7xl font-bold text-red-600 mb-6">404</h1>
      <p className="text-xl text-center mb-8 max-w-md">
        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
      </p>
      <Link
        to="/"
        className="bg-blue-500 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-300"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
