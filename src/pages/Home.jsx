import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import ServiceCard from "../components/ServiceCard";
import services from "../data/services";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import filterServices from "../utils/filterServices";
import { FaFilterCircleXmark } from "react-icons/fa6";
import Analytics from "../components/Analytics";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredServices, setFilteredServices] = useState(services);
  const servicesRef = useRef();
  const isFilterApplied = selectedCategory || searchTerm;

  const handleOnAdd = (service) => {
    dispatch(addToCart(service));
    toast("Added to cart successfully!", {
      action: {
        label: "View Cart",
        onClick: () => navigate("/cart"),
      },
    });
  };
  const scrollTo = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleApplyFilters = () => {
    const updatedFilteredServices = filterServices(
      services,
      selectedCategory,
      searchTerm
    );
    setFilteredServices(updatedFilteredServices);
    scrollTo(servicesRef);
  };

  const clearFilter = () => {
    setSelectedCategory("");
    setSearchTerm("");
    setFilteredServices(services);
  };
  return (
    <div className="font-outfit ">
      <section className="px-2 bg-gradient-to-b from-blue-400 flex flex-col max-sm:gap-y-2 justify-center items-center to-blue-50 pb-8 pt-20 md:pt-28 text-center h-screen">
        <h1 className="text-5xl sm:text-7xl max-w-3xl font-bold">
          Book Local Services Online with Ease
        </h1>
        <p className="mt-2 text-lg sm:text-xl max-w-2xl font-light">
          Quickly browse, select, and checkout services effortlessly for a
          smooth and hassle-free experience.
        </p>

        <div className="bg-gradient-to-r from-blue-300 mt-4 to-blue-100 p-1.5 rounded-3xl max-sm:mx-6 md:rounded-full filters">
          <div className="flex max-md:flex-wrap justify-between items-center bg-white rounded-2xl md:rounded-full">
            <select
              id="category"
              className={`w-full cursor-pointer pl-4 pr-10 sm:pl-6 max-md:mr-8 md:px-28 py-2 sm:py-5 max-sm:mr-4 md:border-r md:border-gray-100 md:hover:bg-gray-50 outline-none rounded-l-full ${
                selectedCategory === "" ? "text-gray-500" : "text-gray-900"
              }`}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Fitness">Fitness</option>
              <option value="Wellness">Wellness</option>
              <option value="Therapy">Therapy</option>
              <option value="Education">Education</option>
            </select>

            <input
              type="text"
              id="search"
              className="w-full pl-5 pr-10 sm:pl-7 max-md:mr-10 md:px-28 md:hover:bg-gray-50 md:rounded-2xl md:focus:bg-gray-50 py-2 sm:py-5 outline-none rounded-r-full"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <button
          className="bg-black mt-4 sm:mt-6 px-14 sm:px-20 py-2.5 sm:py-3 rounded-full font-medium text-white cursor-pointer"
          onClick={handleApplyFilters}
        >
          Search Services
        </button>
      </section>

      <section ref={servicesRef} className="pt-2 px-4 sm:px-6 bg-blue-50 pb-10">
        <div className="flex justify-between items-center border-b border-gray-300 max-w-4xl mx-auto mb-12 pb-1">
          <h2 className="text-4xl font-bold text-gray-800">Services</h2>

          {isFilterApplied && (
            <button
              onClick={clearFilter}
              className="bg-gray-800 cursor-pointer text-white p-2 rounded-lg hover:bg-gray-950 transition duration-200"
            >
              <FaFilterCircleXmark />
            </button>
          )}
        </div>

        {filteredServices.length === 0 ? (
          <div className="text-center py-8">
            <h3 className="text-2xl font-semibold text-gray-800">
              No services found matching your criteria.
            </h3>
            <p className="text-gray-700 mt-2">Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-lg:gap-x-14 gap-x-6 gap-y-10 max-w-4xl mx-auto">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onAdd={() => handleOnAdd(service)}
              />
            ))}
          </div>
        )}
        <Analytics />
      </section>
    </div>
  );
};

export default Home;
