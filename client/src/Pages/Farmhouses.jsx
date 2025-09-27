// Farmhouses.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../api";

const Farmhouses = () => {
  const location = useLocation();
  const incoming = location.state?.results || null;

  const [list, setList] = useState(incoming || []);
  const [loading, setLoading] = useState(!incoming);

  useEffect(() => {
    if (incoming) return; // already got search results
    const fetchAll = async () => {
      setLoading(true);
      try {
        const { data } = await API.get("/farmhouses");
        setList(data || []);
      } catch (err) {
        console.error("Error fetching farmhouses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [incoming]);

  if (loading) {
    return <div className="text-center py-20">Loading farmhouses...</div>;
  }

  if (list.length === 0) {
    return <div className="text-center py-20">No farmhouses found.</div>;
  }

  return (
    <section className="px-6 md:px-16 lg:px-24 xl:px-32 pt-28 pb-20 bg-gray-50">
      <h2 className="text-3xl font-bold mb-10 text-gray-800 text-center">
        {location.state?.searched ? "Search Results" : "All Farmhouses"}
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map((house) => (
          <div
            key={house._id}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            
              <img
                src={`http://localhost:5000${house.image}`}
                alt={house.name}
                className="w-full h-48 object-cover"
              />
            <h3 className="text-lg font-semibold text-gray-700">
              {house.name}
            </h3>
            <p className="text-gray-500 text-sm">{house.location}</p>
            <p className="text-green-600 font-medium mt-2">
              Rs {house.price}/night
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Farmhouses;
