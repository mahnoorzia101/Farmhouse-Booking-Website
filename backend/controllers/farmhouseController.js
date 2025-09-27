import Farmhouse from "../models/Farmhouse.js";

// Get all farmhouses
export const getFarmhouses = async (req, res) => {
  try {
    const farmhouses = await Farmhouse.find();
    res.json(farmhouses);
  } catch (error) {
    console.error("Error fetching farmhouses:", error);
    res.status(500).json({ message: "Error fetching farmhouses", error: error.message });
  }
};

// Get single farmhouse by id
export const getFarmhouseById = async (req, res) => {
  try {
    const { id } = req.params; // use req.params.id
    const farmhouse = await Farmhouse.findById(id);
    if (!farmhouse) {
      return res.status(404).json({ message: "Farmhouse not found" });
    }
    res.json(farmhouse);
  } catch (error) {
    console.error("Error fetching farmhouse by id:", error);
    res.status(500).json({ message: "Error fetching farmhouse", error: error.message });
  }
};

// Add review to a farmhouse (embedded)
export const addReview = async (req, res) => {
  try {
    const { id } = req.params; // route uses :id
    const { userId, userName, rating, comment } = req.body;

    // minimal sanity checks (frontend already checks rating)
    if (!userId || !rating || !comment) {
      return res.status(400).json({ message: "Missing review fields" });
    }

    const farmhouse = await Farmhouse.findById(id);
    if (!farmhouse) return res.status(404).json({ message: "Farmhouse not found" });

    const newReview = {
      userId,
      userName: userName || "Anonymous",
      rating,
      comment,
      createdAt: new Date(),
    };

    farmhouse.reviews.push(newReview);
    await farmhouse.save();

    // return updated reviews for frontend to update state
    res.status(201).json({ reviews: farmhouse.reviews });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Error adding review", error: error.message });
  }
};

// Get all reviews from all farmhouses
export const getAllReviews = async (req, res) => {
  try {
    // fetch only name and reviews for efficiency
    const farmhouses = await Farmhouse.find().select("name reviews").lean();

    // flatten reviews and attach farmhouseName
    const allReviews = farmhouses.flatMap((fh) =>
      (fh.reviews || []).map((r) => ({
        farmhouseId: fh._id,
        farmhouseName: fh.name,
        userName: r.userName || "Anonymous",
        rating: r.rating,
        comment: r.comment,
        createdAt: r.createdAt || r.createdAt === 0 ? r.createdAt : undefined,
      }))
    );

    res.json(allReviews);
  } catch (err) {
    console.error("Error getting all reviews:", err);
    res.status(500).json({ error: err.message });
  }
};

