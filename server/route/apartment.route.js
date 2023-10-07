import { createApartment } from "../controller/apartment.controller.js";

import express from "express";
import { upload } from "../utils/cloudinary.js";
const router = express.Router();

router.post("/", upload.array("images", 6), createApartment);

export default router;
