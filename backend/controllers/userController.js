import User from "../models/User.js";

// Create or update user after Clerk signup
export const syncUser = async (req, res) => {
  try {
    const { clerkId, name, email, phone } = req.body;

    let user = await User.findOne({ clerkId });

    if (!user) {
      user = new User({ clerkId, name, email, phone });
      await user.save();
    } else {
      user.name = name || user.name;
      user.email = email || user.email;
      user.phone = phone || user.phone;
      await user.save();
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error syncing user", error });
  }
};

// Fetch logged-in user's data
export const getUserData = async (req, res) => {
  try {
    const { clerkId } = req.params;
    const user = await User.findOne({ clerkId }).populate("bookings.farmhouseId");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data", error });
  }
};
