import Booking from "../models/Booking.js";
import Farmhouse from "../models/Farmhouse.js";
import User from "../models/User.js";

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { farmhouseId } = req.params;
    const { userId, bookingDate, name, phone } = req.body;

    const farmhouse = await Farmhouse.findById(farmhouseId);
    if (!farmhouse) return res.status(404).json({ message: "Farmhouse not found" });

    const user = await User.findOne({ clerkId: userId });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if date already booked
    const existingBooking = await Booking.findOne({
      farmhouse: farmhouse._id,
      bookingDate: new Date(bookingDate),
    });

    if (existingBooking) {
      return res.status(400).json({ message: "This date is already booked!" });
    }

    const booking = new Booking({
      farmhouse: farmhouse._id,
      user: user._id,
      bookingDate,
      name,
      phone,
    });

    await booking.save();
    res.status(201).json({ message: "Booking confirmed!", booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all bookings for a farmhouse
export const getBookings = async (req, res) => {
  try {
    const { farmhouseId } = req.params;
    const bookings = await Booking.find({ farmhouse: farmhouseId }).select("bookingDate");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
