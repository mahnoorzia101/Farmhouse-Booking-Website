import express from "express";
import { createBooking, getBookings } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/:farmhouseId", createBooking);
router.get("/:farmhouseId", getBookings);

export default router;
