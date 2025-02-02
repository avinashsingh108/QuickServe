import jsPDF from "jspdf";
import convertPrice from "./convertPrice";

const downloadReceipt = (billingDetails, paymentType, pricePaid, cartItems, selectedCurrency) => {
  const doc = new jsPDF();
  const currencySymbol = selectedCurrency === "INR" ? "Rs " : "$";
  const price = convertPrice(selectedCurrency, pricePaid)
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Payment Receipt", 20, 20);

  doc.setFontSize(15);
  doc.setFont("helvetica", "bold");
  doc.text("Billing Information", 20, 40);
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Name: ${billingDetails.name}`, 20, 50);
  doc.text(`Email: ${billingDetails.email}`, 20, 60);
  doc.text(`Phone: ${billingDetails.number}`, 20, 70);

  doc.setFontSize(15);
  doc.setFont("helvetica", "bold");
  doc.text("Payment Details", 20, 90);
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Payment Method: ${paymentType}`, 20, 100);
  doc.text(`Total Paid: ${currencySymbol}${price}`, 20, 110);

  doc.setFontSize(15);
  doc.setFont("helvetica", "bold");
  doc.text("Order Summary", 20, 130);
  doc.setFont("helvetica", "normal");

  cartItems.forEach((item, index) => {
    const yPosition = 140 + index * 30;

    doc.setFontSize(12);
    doc.text(`${item.name} (${item.category})`, 20, yPosition);
    const price = convertPrice(selectedCurrency, item.price)
    const itemTotal = (price * item.quantity).toFixed(2);
    doc.text(
      `${currencySymbol}${price} x ${item.quantity} = ${currencySymbol}${itemTotal}`,
      20,
      yPosition + 10
    );
  });

  doc.save("Receipt.pdf");
};

export default downloadReceipt;
