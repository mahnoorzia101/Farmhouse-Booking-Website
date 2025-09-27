import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

const FeaturedFarmhouses = () => {
  const [farmhouses, setFarmhouses] = useState([]);

  useEffect(() => {
    const fetchFarmhouses = async () => {
      try {
        const { data } = await API.get("/farmhouses");
        setFarmhouses(data.slice(0, 3)); // pick first 3
      } catch (error) {
        console.error("Error fetching featured farmhouses:", error);
      }
    };
    fetchFarmhouses();
  }, []);

  return (
    <section className="px-6 md:px-16 lg:px-24 xl:px-32 py-16 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-3">Featured Farmhouses</h2>
      <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
        Explore our top-rated farmhouses in Karachi.
      </p>

      <div className="grid gap-8 md:grid-cols-3">
        {farmhouses.map((house) => (
          <div
            key={house._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
          >
            <Link to={`/farmhouses/${house._id}`}>
              <img 
                src={`http://localhost:5000${house.image}`} 
                alt={house.name} 
                className="w-full h-48 object-cover" 
              />

            </Link>
            <div className="p-5 text-left">
              <h3 className="text-xl font-semibold">{house.name}</h3>
              <p className="text-gray-500 text-sm">{house.location}</p>

              <div className="flex items-center gap-2 mt-2">
                <span className="text-yellow-500">⭐</span>
                <span>{house.rating}</span>
              </div>

              <p className="mt-3 font-medium text-gray-700">
                Rs. {house.price} / shift
              </p>

              <Link
                to={`/farmhouses/${house._id}`}
                className="mt-4 block w-full bg-black text-white py-2 rounded-md text-center hover:bg-gray-800 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <Link
          to="/farmhouses"
          className="inline-block px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
        >
          View All Farmhouses
        </Link>
      </div>
    </section>
  );
};

export default FeaturedFarmhouses;
