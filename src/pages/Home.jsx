import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import ServiceCard from "../components/ServiceCard";
import services from "../data/services";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [searchTerm, setSearchTerm] = useState("");

  const priceRanges = [
    { label: "All Prices", value: [0, 100] },
    { label: "$0 - $25", value: [0, 25] },
    { label: "$25 - $50", value: [25, 50] },
    { label: "$50 - $75", value: [50, 75] },
    { label: "$75 - $100", value: [75, 100] },
  ];

  const filteredServices = services.filter((service) => {
    const isCategoryMatch = selectedCategory
      ? service.category === selectedCategory
      : true;
    const isPriceMatch =
      service.price >= priceRange[0] && service.price <= priceRange[1];
    const isSearchMatch = service.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return isCategoryMatch && isPriceMatch && isSearchMatch;
  });

  const handleOnAdd = (service) => {
    dispatch(addToCart(service));
    toast("Added to cart successfully!", {
      action: {
        label: "View Cart",
        onClick: () => navigate("/cart"),
      },
    });
  };
  return (
    <div className="font-outfit">
      <section className="bg-gradient-to-b from-blue-400 flex flex-col justify-center items-center to-blue-50 py-8 text-center h-screen">
        <h1 className="text-7xl max-w-3xl font-bold">
          Book Local Services Online with Ease
        </h1>
        <p className="mt-2 text-xl max-w-2xl font-light">
          Quickly browse, select, and checkout services effortlessly for a
          smooth and hassle-free experience.
        </p>

        <div className="bg-gradient-to-r from-blue-300 mt-2 to-blue-100 p-1.5 rounded-full filters">
          <div className="flex flex-wrap justify-between items-center bg-white rounded-full">
            <div>
              <select
                id="category"
                className="w-full px-20 py-5 border-r border-gray-100 hover:bg-gray-50 outline-none rounded-l-full "
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="Fitness">Fitness</option>
                <option value="Wellness">Wellness</option>
                <option value="Therapy">Therapy</option>
                <option value="Education">Education</option>
              </select>
            </div>

            <div>
              <select
                id="priceRange"
                className="w-full px-20 hover:bg-gray-50  py-5 border-r border-gray-100 outline-none"
                value={JSON.stringify(priceRange)}
                onChange={(e) => setPriceRange(JSON.parse(e.target.value))}
              >
                {priceRanges.map((range, index) => (
                  <option key={index} value={JSON.stringify(range.value)}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <input
                type="text"
                id="search"
                className="w-full px-8 hover:bg-gray-50 focus:bg-gray-50 py-5 outline-none rounded-r-full"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <button
          className="bg-black mt-6 px-24 py-3 rounded-full font-medium text-white cursor-pointer"
          onClick={() => {
            setSelectedCategory("");
            setPriceRange([0, 100]);
            setSearchTerm("");
          }}
        >
          See All Services
        </button>
      </section>

      <section className="py-6 px-4 bg-gradient-to-b from-blue-50 to-white pb-20">
        <h2 className="text-5xl font-bold text-center pb-16">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onAdd={() => handleOnAdd(service)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
