import {
  createApartment,
  getAllApartments,
  getApartment,
  updateApartment,
  deleteApartment,
  getUserApartments
} from "../controller/apartment.controller.js";
import express from "express";
import { upload } from "../utils/cloudinary.js";
import { verifyToken } from "../middleware/verify.user.js";


const router = express.Router();

router.post("/",verifyToken, upload.array("images", 6), createApartment);
router.get("/", getAllApartments);
router.get("/:id", getApartment);
router.patch("/:id",verifyToken, updateApartment);
router.delete("/:id",verifyToken, deleteApartment);
router.get("/:userId/apartments",verifyToken, getUserApartments);

export default router;












