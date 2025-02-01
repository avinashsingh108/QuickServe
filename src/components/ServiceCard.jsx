import React from "react";

const ServiceCard = ({ service, onAdd }) => {
  return (
    <div className="max-w-xs bg-white rounded-2xl shadow-xl shadow-blue-100 overflow-hidden">
      <img
        src={service.image}
        alt={service.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{service.name}</h2>
        <p className="text-sm text-gray-500">{service.category}</p>
        <p className=" text-gray-700">{service.description}</p>
        <p className=" text-sm text-gray-600">Duration: {service.duration}</p>
        <p className=" font-semibold">${service.price}</p>
        <button
          onClick={onAdd}
          className="mt-2 cursor-pointer w-full bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 "
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
