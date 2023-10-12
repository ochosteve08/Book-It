import {
  createApartment,
  getAllApartments,
  getApartment,
  updateApartment,
  deleteApartment
} from "../controller/apartment.controller.js";

import express from "express";
import { upload } from "../utils/cloudinary.js";
const router = express.Router();

router.post("/", upload.array("images", 6), createApartment);
router.get("/", getAllApartments);
router.get("/:id", getApartment);
router.patch("/:id", updateApartment);
router.delete("/:id", deleteApartment);

export default router;












