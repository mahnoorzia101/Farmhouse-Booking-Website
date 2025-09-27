import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    farmhouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farmhouse",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // from your MongoDB user collection
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
export default Review;
