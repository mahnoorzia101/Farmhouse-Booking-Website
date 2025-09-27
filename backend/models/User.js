import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true }, // Clerk User ID
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  bookings: [
    {
      farmhouseId: { type: mongoose.Schema.Types.ObjectId, ref: "Farmhouse" },
      date: Date,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
