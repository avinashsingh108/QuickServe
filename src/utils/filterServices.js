const filterServices = (services, selectedCategory, searchTerm) => {
    return services.filter((service) => {
      const isCategoryMatch = selectedCategory
        ? service.category === selectedCategory
        : true;
        const isSearchMatch = service.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
        console.log(isSearchMatch);
  
      return isCategoryMatch && isSearchMatch;
    });
  };
  
  export default filterServices;
  