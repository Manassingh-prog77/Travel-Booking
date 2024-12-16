import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TourPackagesTablePage = () => {
  const [tourPackages, setTourPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of packages to display per page

  // Fetch tour packages from the backend when the component mounts
  useEffect(() => {
    const fetchTourPackages = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/tourPackages/packages");
        if (response.ok) {
          const data = await response.json();
          setTourPackages(data.packages);
        } else {
          throw new Error("Failed to fetch tour packages");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTourPackages();
  }, []);

  // Pagination logic
  const indexOfLastPackage = currentPage * itemsPerPage;
  const indexOfFirstPackage = indexOfLastPackage - itemsPerPage;
  const currentPackages = tourPackages.slice(indexOfFirstPackage, indexOfLastPackage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Helper function to format the date into a more readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="text-center text-white py-20">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-white py-20">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">

      {/* Tour Packages Table Section */}
      <section className="flex-1 py-10 px-6 sm:px-12 lg:px-20">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-8 text-center">Available Tour Packages</h2>

        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Available Dates</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentPackages.map((tour) => (
                <tr key={tour._id} className="border-b border-gray-200">
                  <td className="py-3 px-4 text-center">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  </td>
                  <td className="py-3 px-4 text-black">{tour.title}</td>
                  <td className="py-3 px-4 text-gray-700">{tour.description}</td>
                  <td className="py-3 px-4 font-semibold text-black">${tour.price}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">
                    {tour.availableDates
                      .map((date) => formatDate(date)) // Format each date
                      .join(", ")}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Link
                      to={`/PackageDetail/${tour._id}`}
                      className="inline-block py-2 px-4 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-400 transition duration-200"
                    >
                      Book Now
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-orange-500 text-white rounded-l-lg hover:bg-orange-400 transition duration-200"
            >
              Prev
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastPackage >= tourPackages.length}
              className="px-4 py-2 bg-orange-500 text-white rounded-r-lg hover:bg-orange-400 transition duration-200"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TourPackagesTablePage;
