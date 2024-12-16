import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Package{
  _id: string;
  customerName: string;
  packageId: string;
  totalPrice: number;
  createdAt: string;
}

const InvoiceDownloader = () => {
    
  const [packages, setPackages] = useState<Package[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch packages data from API
    const fetchPackages = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/packages');
        if (!response.ok) throw new Error('Failed to fetch packages');
        const data = await response.json();

        if (data.packages) {
          setPackages(data.packages);
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    fetchPackages();
  }, []);

  // Function to handle downloading the invoice
  const handleDownloadInvoice = (_id:string) => {
    // Redirect to the invoice download page with the package ID
    console.log(_id)
    navigate(`/download-invoice/${_id}`);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center text-gray-800">Packages</h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Available Packages</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div key={pkg._id} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all">
              <img
                src={`https://thumbs.dreamstime.com/b/invoice-typographic-stamp-invoice-typographic-stamp-typographic-sign-badge-logo-110247148.jpg`} // Placeholder image for demonstration
                alt={pkg.customerName}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{pkg.customerName}</h3>
                <p className="text-gray-600">Package ID: {pkg.packageId}</p>
                <p className="text-gray-800 font-bold mt-2">${pkg.totalPrice}</p>
                <div className="mt-4">
                  <button
                    onClick={() => handleDownloadInvoice(pkg._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    Download Invoice
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvoiceDownloader;
