import express from "express";
import { syncUser, getUserData } from "../controllers/userController.js";

const router = express.Router();

// Sync Clerk user → MongoDB
router.post("/sync", syncUser);

// Get MongoDB user data by clerkId
router.get("/:clerkId", getUserData);

export default router;
