const ServiceCard = ({ service, onAdd }) => {
  return (
    <div className=" max-sm:mx-2 sm:max-w-xs bg-white rounded-3xl shadow-xl shadow-blue-100 overflow-hidden flex flex-col"> 
      <img
        src={service.image}
        alt={service.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex-1"> 
          <h2 className="text-xl font-semibold">{service.name}</h2>
          <p className="text-sm text-gray-700">{service.description}</p>
          <p className="text-sm text-gray-600">Duration: {service.duration}</p>
          <p className="font-semibold text-lg text-blue-600">${service.price}</p>
        </div>
        
        <div className="mt-auto"> 
          <button
            onClick={onAdd}
            className="mt-2 cursor-pointer w-full bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
export default ServiceCard;