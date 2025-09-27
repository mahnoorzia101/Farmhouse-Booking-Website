import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  farmhouse: { type: mongoose.Schema.Types.ObjectId, ref: "Farmhouse", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bookingDate: { type: Date, required: true, unique: false }, // We'll validate uniqueness in code
  name: { type: String, required: true },   // User-provided info
  phone: { type: String, required: true },  // User-provided info
  createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
