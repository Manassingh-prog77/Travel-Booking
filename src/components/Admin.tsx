import React, { useEffect, useState } from 'react';

interface Package {
  _id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  numberOfTravelers: number;
  specialRequests: string;
  packageId: string;
  totalPrice: number;
  bookingDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Booking {
  id: string;
  customerName: string;
  packageName: string;
  status: 'Confirmed' | 'Pending';
}


interface PackageDetails {
  _id: string;
  title: string;
  description: string;
  price: number;
  availableDates: string[];
  image: string;
  date: string;
}

const Dashboard = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [packageDetails, setPackageDetails] = useState<PackageDetails | null>(null);

  useEffect(() => {
    // Fetch initial package data
    const fetchPackages = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/packages');
        if (!response.ok) throw new Error('Failed to fetch packages');
        const data = await response.json();

        if (data.packages) {
          setPackages(data.packages);
          const bookingData = data.packages.map((pkg: Package) => ({
            id: pkg._id,
            customerName: pkg.customerName,
            packageName: pkg.packageId,
            status: pkg.totalPrice > 0 ? 'Confirmed' : 'Pending',
          }));
          setBookings(bookingData);
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    fetchPackages();
  }, []);

  // Function to handle the cancellation of a booking
  const handleCancelBooking = async (packageId: string) => {
    try {
      // Call API to delete the package
      const response = await fetch(`http://localhost:5000/api/packages/${packageId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete package');
      }

      // If successful, remove the package from the state
      setPackages((prevPackages) => prevPackages.filter((pkg) => pkg._id !== packageId));
      setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== packageId));

      alert('Package booking has been canceled successfully.');
    } catch (error) {
      console.error('Error canceling booking:', error);
      alert('Failed to cancel booking.');
    }
  };

  const handleViewDetails = async (packageId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tourPackages/packages/${packageId}`);
      if (!response.ok) throw new Error('Failed to fetch package details');
      const data = await response.json();
      if (data.success) {
        setPackageDetails(data.data);
        setIsModalOpen(true); // Open the modal
      }
    } catch (error) {
      console.error('Error fetching package details:', error);
    }
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setPackageDetails(null);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center text-gray-800">Admin Dashboard</h1>

      {/* User Profile Section */}
      <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
          <span className="text-white text-2xl">JD</span>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">John Doe</h2>
          <p className="text-gray-600">Admin</p>
        </div>
      </div>

      {/* Packages Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Packages</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div key={pkg._id} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all">
              <img
                src={`https://tse4.mm.bing.net/th?id=OIP.EGneFD4pC9V7aoo_eNKd1QHaEK&pid=Api&P=0&h=180`}
                alt={pkg.customerName}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{pkg.customerName}</h3>
                <p className="text-gray-600">Package ID: {pkg.packageId}</p>
                <p className="text-gray-800 font-bold mt-2">${pkg.totalPrice}</p>
                <div className="mt-4 space-x-2">
                  <button
                    onClick={() => handleCancelBooking(pkg._id)} // Pass packageId to the function
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    Cancel Booking
                  </button>
                  <button
                    onClick={() => handleViewDetails(pkg.packageId)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

       {/* Modal for Viewing Package Details */}
       {isModalOpen && packageDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-2xl font-semibold text-gray-800">{packageDetails.title}</h2>
            <img
              src={packageDetails.image}
              alt={packageDetails.title}
              className="w-full h-60 object-cover my-4"
            />
            <p className="text-gray-600">{packageDetails.description}</p>
            <p className="text-gray-800 font-bold mt-4">Price: ${packageDetails.price}</p>
            <p className="text-gray-600 mt-2">Available Dates:</p>
            <ul className="list-disc pl-5">
              {packageDetails.availableDates.map((date, index) => (
                <li key={index}>{new Date(date).toLocaleDateString()}</li>
              ))}
            </ul>
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bookings Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Bookings History</h2>
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li key={booking.id} className="border-b border-gray-200 py-4 flex justify-between items-center">
              <div>
                <p className="text-gray-800 font-semibold">{booking.customerName}</p>
                <p className="text-gray-600">Package ID: {booking.packageName}</p>
              </div>
              <p
                className={`text-sm font-bold ${
                  booking.status === 'Confirmed' ? 'text-green-500' : 'text-yellow-500'
                }`}
              >
                Status: {booking.status}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
