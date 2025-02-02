const convertPrice = (currency, price) => {
  if (currency === "USD") {
    return (price / 86).toFixed(2);
  }
  return price.toFixed(2);
};

export default convertPrice;
