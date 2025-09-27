import express from "express";
import { 
  getFarmhouses, 
  getFarmhouseById, 
  addReview,
  getAllReviews
} from "../controllers/farmhouseController.js";

const router = express.Router();

// GET all farmhouses
router.get("/", getFarmhouses);

//Get all revies listed
router.get("/reviews/all", getAllReviews);

// GET single farmhouse by id
router.get("/:id", getFarmhouseById);

// POST review to farmhouse
router.post("/:id/reviews", addReview);



export default router;
