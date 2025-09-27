import React, { useEffect, useState } from "react";
import API from "../api";
import Footer from '../components/Footer';

const Experience = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        const { data } = await API.get("/farmhouses/reviews/all");
        setReviews(data || []);
      } catch (err) {
        console.error("Error fetching all reviews:", err);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAllReviews();
  }, []);

  if (loading)
    return (
      <div className="p-10 text-center text-lg font-medium text-gray-600">
        Loading reviews...
      </div>
    );

  if (reviews.length === 0)
    return (
      <div className="flex flex-col min-h-screen bg-green-50">
        <div className="flex-1 p-10 text-center text-lg font-medium text-gray-600">
          No reviews yet.
        </div>
        <Footer />
      </div>
    );

  // group reviews by farmhouse
  const grouped = reviews.reduce((acc, r) => {
    acc[r.farmhouseName] = acc[r.farmhouseName] || [];
    acc[r.farmhouseName].push(r);
    return acc;
  }, {});

  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <section className="flex-1 px-6 md:px-16 lg:px-24 xl:px-32 pt-32 pb-20">
        <h2 className="text-4xl font-extrabold mb-12 text-center text-gray-800">
          Guest Experiences
        </h2>

        <div className="space-y-12">
          {Object.entries(grouped).map(([farmhouseName, items]) => (
            <div key={farmhouseName}>
              {/* Farmhouse heading */}
              <h3 className="text-2xl font-bold mb-6 text-gray-700 border-l-4 border-green-500 pl-3">
                {farmhouseName}
              </h3>

              {/* Review cards */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {items.map((r, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    {/* User and rating */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-semibold text-gray-900">
                        {r.userName}
                      </div>
                      <div className="flex text-yellow-400 text-lg">
                        {"★".repeat(Math.round(r.rating || 0))}
                        {"☆".repeat(5 - Math.round(r.rating || 0))}
                      </div>
                    </div>

                    {/* Comment */}
                    <p className="text-gray-700 mb-4 italic">“{r.comment}”</p>

                    {/* Date */}
                    <div className="text-sm text-gray-500 text-right">
                      {r.createdAt
                        ? new Date(r.createdAt).toLocaleDateString()
                        : ""}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Experience;
