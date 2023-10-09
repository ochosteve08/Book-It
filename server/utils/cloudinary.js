import cloudinary from "cloudinary";
import multer from "multer";
const memoryStorage = multer.memoryStorage();
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_SECRET,
} from "../config/env.js";

export const upload = multer({
  storage: memoryStorage,
});



cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret:CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (fileString, format) => {
  try {
    const { uploader } = cloudinary;
    const res = await uploader.upload(
      `data:image/${format};base64,${fileString}`
    );

    return res;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteImageFromCloudinary = async (cloudinaryId) => {
  try {
    const { uploader } = cloudinary;
    const result = await uploader.destroy(cloudinaryId);
    // If the result contains the "result" field and its value is "ok", the image was successfully deleted
    if (result && result.result === "ok") {
      console.log("Image deleted successfully from Cloudinary");
    } else {
      throw new Error("Failed to delete image from Cloudinary");
    }
  } catch (error) {
    throw new Error(error.message || "Error deleting image from Cloudinary");
  }
};
