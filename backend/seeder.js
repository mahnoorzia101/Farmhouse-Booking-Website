import mongoose from "mongoose";
import dotenv from "dotenv";
import Farmhouse from "./models/Farmhouse.js";

dotenv.config();

const farmhouses = [
  {
    name: "Green Valley Farmhouse",
    image: "https://yourcdn.com/farmhouse1.jpg",
    rating: 4.7,
    location: "DHA, Karachi",
    price: 15000,
    description:
      "Beautiful farmhouse with lush green lawns and a swimming pool. Ideal for family gatherings.",
  },
  {
    name: "Sunset Villa",
    image: "https://yourcdn.com/farmhouse2.jpg",
    rating: 4.5,
    location: "Malir, Karachi",
    price: 18500,
    description:
      "Charming villa with a sunset view, BBQ area, and spacious rooms. Perfect for weddings and parties.",
  },
  {
    name: "Palm Garden Farmhouse",
    image: "https://yourcdn.com/farmhouse3.jpg",
    rating: 4.8,
    location: "Gadap Town, Karachi",
    price: 20000,
    description:
      "Palm tree surrounded farmhouse with large pool and garden. Great for events and relaxing weekends.",
  },
  {
    name: "Royal Paradise Farmhouse",
    image: "https://yourcdn.com/farmhouse4.jpg",
    rating: 4.6,
    location: "Scheme 33, Karachi",
    price: 22000,
    description:
      "Royal-themed farmhouse with elegant interiors, swimming pool, and outdoor stage area.",
  },
  {
    name: "Dreamland Villa",
    image: "https://yourcdn.com/farmhouse5.jpg",
    rating: 4.4,
    location: "Super Highway, Karachi",
    price: 17500,
    description:
      "Affordable farmhouse with wide open spaces, garden, and outdoor seating.",
  },
  {
    name: "Palm Springs Farmhouse",
    image: "https://yourcdn.com/farmhouse6.jpg",
    rating: 4.9,
    location: "Gharo, Karachi",
    price: 25000,
    description:
      "Luxury farmhouse with modern pool, indoor games, and green surroundings. Top-rated by guests.",
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear old data
    await Farmhouse.deleteMany();
    console.log("✅ Old farmhouse data removed");

    // Insert new data
    await Farmhouse.insertMany(farmhouses);
    console.log("🌿 Farmhouse data seeded successfully");

    process.exit();
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

seedDB();
