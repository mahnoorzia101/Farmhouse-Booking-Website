import mongoose from "mongoose";

const farmhouseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  reviews: [
    {
      userId: { type: String, required: true }, // Clerk ID
      userName: { type: String, required: true },
      rating: { type: Number, required: true, min: 1, max: 5 },
      comment: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

const Farmhouse = mongoose.model("Farmhouse", farmhouseSchema);

export default Farmhouse;
