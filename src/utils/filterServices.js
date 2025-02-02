const filterServices = (services, selectedCategory, priceRange, searchTerm) => {
    return services.filter((service) => {
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
  };
  
  export default filterServices;
  