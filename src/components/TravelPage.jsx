import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TourPackagesPage = () => {
  // State to store tour packages fetched from the API
  const [tourPackages, setTourPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tour packages from the backend when the component mounts
  useEffect(() => {
    const fetchTourPackages = async () => {
      try {
        // Make an API call to fetch the tour packages
        const response = await fetch("http://localhost:5000/api/tourPackages/packages");
        
        // If the response is successful
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
      {/* Hero Section */}
      <section
        className="w-full h-[60vh] bg-cover bg-center flex items-center justify-center relative"
        style={{
          backgroundImage: "url('https://www.cleantechloops.com/wp-content/uploads/2019/10/top-travel-agencies-to-work-for.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-white z-10 px-4 sm:px-8 py-4">
          Explore Our Tour Packages
        </h1>
      </section>

      {/* Tour Packages Section */}
      <section className="flex-1 py-10 px-6 sm:px-12 lg:px-20">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-8 text-center">Available Tours</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tourPackages.map((tour) => (
            <div
              key={tour._id}  // Assuming MongoDB uses _id as the primary key
              className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform ease-in-out duration-300"
            >
              {/* Image */}
              <img
                src={tour.image}
                alt={tour.title}
                className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform ease-in-out duration-300"
              />

              {/* Details */}
              <div className="p-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{tour.title}</h3>
                <p className="text-gray-300 mb-4">{tour.description}</p>
                <p className="text-lg font-semibold mb-1 text-white">Price: ${tour.price}</p>
                <p className="text-sm text-gray-500 mb-4">
                  Available Dates: {tour.availableDates.join(", ")}
                </p>
                <Link
                  to={`/PackageDetail/${tour._id}`}
                  className="w-full py-2 px-4 bg-orange-500 text-white font-medium rounded hover:bg-orange-400 transition duration-200"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TourPackagesPage;
