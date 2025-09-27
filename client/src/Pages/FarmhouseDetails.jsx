// FarmhouseDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import API from "../api";

const FarmhouseDetails = () => {
  const { id } = useParams();
  const { user } = useUser();
  const [farmhouse, setFarmhouse] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // Booking states
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [bookedDates, setBookedDates] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Fetch farmhouse & reviews
  useEffect(() => {
    const fetchFarmhouse = async () => {
      try {
        const { data } = await API.get(`/farmhouses/${id}`);
        setFarmhouse(data);
        setReviews(data.reviews || []);
      } catch (error) {
        console.error("Error fetching farmhouse:", error);
      }
    };
    fetchFarmhouse();
  }, [id]);

  // Fetch booked dates
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await API.get(`/bookings/${id}`);
        setBookedDates(
          data.map((b) =>
            new Date(b.bookingDate).toISOString().split("T")[0]
          )
        );
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, [id]);

  // Submit review
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please login to add review.");
    if (rating < 1) return alert("Please select a rating.");

    try {
      const { data } = await API.post(`/farmhouses/${id}/reviews`, {
        userId: user.id,
        userName: user.fullName || user.email,
        rating,
        comment,
      });

      setReviews(data.reviews);
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  // Submit booking
  const handleBooking = async () => {
    if (!user) return alert("Please login to book.");
    if (!bookingDate) return alert("Please select a date.");
    if (bookedDates.includes(bookingDate))
      return alert("This date is already booked.");

    try {
      await API.post(`/bookings/${id}`, {
        userId: user.id,
        bookingDate,
        name,
        phone,
      });
      alert("Booking Confirmed!");
      setShowBookingForm(false);
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  if (!farmhouse) return <div className="p-8 text-center">Loading...</div>;

  return (
    <section className="px-6 md:px-16 lg:px-24 xl:px-32 py-28">
      <div className="grid md:grid-cols-2 gap-12 mb-12">
        <img
          src={`http://localhost:5000${farmhouse.image}`}
          alt={farmhouse.name}
          className="rounded-xl w-full h-96 object-cover shadow-lg"
        />
        <div>
          <h2 className="text-3xl font-bold mb-2">{farmhouse.name}</h2>
          <p className="text-gray-600 mb-2">{farmhouse.location}</p>
          <p className="text-lg text-gray-700 mb-4">{farmhouse.description}</p>
          <p className="text-xl font-bold text-green-700 mb-6">
            PKR {farmhouse.price}/day
          </p>
          <button
            onClick={() => setShowBookingForm(true)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              Book {farmhouse.name}
            </h3>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg p-2 mb-3"
              required
            />
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-lg p-2 mb-3"
              required
            />
            <input
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full border rounded-lg p-2 mb-3"
              required
            />
            {bookedDates.includes(bookingDate) && (
              <p className="text-red-600 text-sm mb-2">
                This date is already booked!
              </p>
            )}
            <div className="flex justify-between">
              <button
                onClick={handleBooking}
                disabled={bookedDates.includes(bookingDate)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowBookingForm(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reviews Section */}
      <div>
        <h3 className="text-2xl font-semibold mb-6">Reviews</h3>

        <div className="space-y-4 mb-8">
          {reviews.map((r, i) => (
            <div key={i} className="border p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2">
                <span className="font-semibold">
                  {r.userName || "Anonymous"}
                </span>
                <span className="text-yellow-500">
                  {"⭐".repeat(r.rating)}
                </span>
              </div>
              <p className="text-gray-700">{r.comment}</p>
            </div>
          ))}
        </div>

        {user ? (
          <form
            onSubmit={handleSubmit}
            className="border p-6 rounded-lg shadow-md"
          >
            <h4 className="text-lg font-semibold mb-4">Leave a Review</h4>
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl ${
                    rating >= star ? "text-yellow-500" : "text-gray-400"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review..."
              className="w-full border rounded-lg p-3 mb-4"
              required
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
            >
              Submit Review
            </button>
          </form>
        ) : (
          <p className="text-gray-600">Login to leave a review.</p>
        )}
      </div>
    </section>
  );
};

export default FarmhouseDetails;
