import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf";

const InvoicePage = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);

  // Fetch booking details using the bookingId from URL params
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/booking/${bookingId}`);
        if (response.ok) {
          const data = await response.json();
          setBooking(data.data);
        } else {
          throw new Error("Failed to fetch booking data");
        }
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };
    fetchBooking();
  }, [bookingId]);

  // Generate PDF function using jsPDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Invoice", 14, 20);
    
    // Customer details
    doc.setFontSize(12);
    doc.text(`Customer Name: ${booking.customerName}`, 14, 30);
    doc.text(`Customer Email: ${booking.customerEmail}`, 14, 40);
    doc.text(`Customer Phone: ${booking.customerPhone}`, 14, 50);

    // Package details
    doc.text(`Package ID: ${booking.packageId}`, 14, 60);
    doc.text(`Total Price: $${booking.totalPrice}`, 14, 70);
    doc.text(`Number of Travelers: ${booking.numberOfTravelers}`, 14, 80);

    // Special Requests
    doc.text(`Special Requests: ${booking.specialRequests || "None"}`, 14, 90);

    // Footer
    const currentDate = new Date().toLocaleDateString();
    doc.text(`Date of Booking: ${currentDate}`, 14, 100);
    doc.text(`Total Amount: $${booking.totalPrice}`, 14, 110);

    // Save the PDF
    doc.save(`invoice_${bookingId}.pdf`);
  };

  if (!booking) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-black text-white min-h-screen py-10 px-6 sm:px-12 lg:px-20">
      <h2 className="text-3xl sm:text-4xl font-semibold mb-8 text-center">Booking Invoice</h2>

      {/* Invoice details in HTML format */}
      <div className="bg-white text-black p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-2xl font-semibold mb-4">Booking Details</h3>

        <div className="mb-4">
          <strong>Customer Name: </strong>
          {booking.customerName}
        </div>
        <div className="mb-4">
          <strong>Customer Email: </strong>
          {booking.customerEmail}
        </div>
        <div className="mb-4">
          <strong>Customer Phone: </strong>
          {booking.customerPhone}
        </div>
        <div className="mb-4">
          <strong>Package ID: </strong>
          {booking.packageId}
        </div>
        <div className="mb-4">
          <strong>Total Price: </strong>
          ${booking.totalPrice}
        </div>
        <div className="mb-4">
          <strong>Number of Travelers: </strong>
          {booking.numberOfTravelers}
        </div>
        <div className="mb-4">
          <strong>Special Requests: </strong>
          {booking.specialRequests || "None"}
        </div>
        <div className="mb-4">
          <strong>Date of Booking: </strong>
          {new Date(booking.bookingDate).toLocaleDateString()}
        </div>
        <div className="mb-4">
          <strong>Total Amount: </strong>
          ${booking.totalPrice}
        </div>
      </div>

      {/* Button to download the invoice as a PDF */}
      <div className="flex justify-center">
        <button
          onClick={generatePDF}
          className="py-2 px-6 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-400 transition duration-200"
        >
          Download Invoice as PDF
        </button>
      </div>
    </div>
  );
};

export default InvoicePage;
