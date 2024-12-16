import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PackageBookingPage = () => {
  const { id } = useParams(); // Get the tour package id from the URL params
  const [tourPackage, setTourPackage] = useState(null);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    numberOfTravelers: 1,
    specialRequests: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch the tour package details using the package ID
  useEffect(() => {
    const fetchTourPackage = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/tourPackages/packages"
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data.packages); // Log the array of packages

          // Find the package based on the given ID
          const selectedPackage = data.packages.find((pkg) => pkg._id === id);
          setTourPackage(selectedPackage); // Set the selected package to state
          console.log(selectedPackage); // Log the selected package
        } else {
          throw new Error("Failed to fetch tour package details.");
        }
      } catch (error) {
        setError(error.message); // Set error message if fetch fails
      } finally {
        setLoading(false); // Set loading to false when fetch is complete
      }
    };

    fetchTourPackage(); // Call the fetch function
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        packageId: id,
        totalPrice: formData.numberOfTravelers * tourPackage.price,
      }),
    });

    const result = await response.json();
    if (result.message === "Booking created successfully") {
      alert("Booking successful!");
      navigate(-1); // Navigate back to the previous page
    } else {
      alert("Error: " + result.error);
    }
  };

  if (loading) {
    return <div className="text-center text-black py-20">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-black py-20">{error}</div>;
  }

  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col">
      {/* Hero Section */}
      <section
        className="w-full h-[60vh] bg-cover bg-center flex items-center justify-center relative mt-8 rounded-lg shadow-lg overflow-hidden"
        style={{ backgroundImage: `url(${tourPackage?.image})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-center text-white z-10 px-4 sm:px-8 py-4">
          Book Your Tour Package
        </h1>
      </section>

      {/* Booking Form Section */}
      <section className="flex-1 py-12 px-6 sm:px-12 lg:px-20">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-8 text-center text-black">
          Booking Form
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-8 rounded-lg shadow-xl border border-gray-200"
        >
          <div>
            <label
              htmlFor="customerName"
              className="block text-lg font-medium text-gray-800"
            >
              Name
            </label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label
              htmlFor="customerEmail"
              className="block text-lg font-medium text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              id="customerEmail"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email address"
            />
          </div>

          <div>
            <label
              htmlFor="customerPhone"
              className="block text-lg font-medium text-gray-800"
            >
              Phone
            </label>
            <input
              type="tel"
              id="customerPhone"
              name="customerPhone"
              value={formData.customerPhone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label
              htmlFor="numberOfTravelers"
              className="block text-lg font-medium text-gray-800"
            >
              Number of Travelers
            </label>
            <input
              type="number"
              id="numberOfTravelers"
              name="numberOfTravelers"
              value={formData.numberOfTravelers}
              onChange={handleInputChange}
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="specialRequests"
              className="block text-lg font-medium text-gray-800"
            >
              Special Requests
            </label>
            <textarea
              id="specialRequests"
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter any special requests or preferences"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition"
          >
            Book Now
          </button>
        </form>
      </section>
    </div>
  );
};

export default PackageBookingPage;
