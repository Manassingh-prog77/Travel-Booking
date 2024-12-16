import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link className="text-2xl font-bold tracking-wide" to="/">TourApp</Link>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div className={`md:flex space-x-6 ${isOpen ? "block" : "hidden"} md:block`}>
          <Link
            to="/Table"
            className="block md:inline-block text-lg font-medium hover:text-gray-300 transition"
          >
           Package Booking 
          </Link>
          <Link
            to="/Invoice"
            className="block md:inline-block text-lg font-medium hover:text-gray-300 transition"
          >
            Invoice
          </Link>
          <Link
            to="/Admin"
            className="block md:inline-block text-lg font-medium hover:text-gray-300 transition"
          >
            Admin Panel
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
