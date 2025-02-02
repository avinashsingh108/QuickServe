import jsPDF from "jspdf";

const downloadReceipt = (billingDetails, paymentType, pricePaid, cartItems) => {
  const doc = new jsPDF();

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
  doc.text(`Total Paid: $${pricePaid.toFixed(2)}`, 20, 110);

  doc.setFontSize(15);
  doc.setFont("helvetica", "bold");
  doc.text("Order Summary", 20, 130);
  doc.setFont("helvetica", "normal");

  cartItems.forEach((item, index) => {
    const yPosition = 140 + index * 30;

    doc.setFontSize(12);
    doc.text(`${item.name} (${item.category})`, 20, yPosition);

    const itemTotal = (item.price * item.quantity).toFixed(2);
    doc.text(
      `$${item.price} x ${item.quantity} = $${itemTotal}`,
      20,
      yPosition + 10
    );
  });

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Thank you for your purchase!", 20, 180);

  doc.save("Receipt.pdf");
};

export default downloadReceipt;
