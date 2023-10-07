import { addApartment } from "../services/apartment.service.js";
import { bufferToDataURI } from "../utils/file.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { errorHandler } from "../utils/error.js";

export const createApartment = async (req, res, next) => {
  try {
    const { files } = req;
    const {
      title,
      address,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    } = req.body;

    let secure_urls = [];
    for (let file of files) {
      const fileFormat = file.mimetype.split("/")[1];
      const { base64 } = bufferToDataURI(fileFormat, file.buffer);
      const imageDetails = await uploadToCloudinary(base64, fileFormat);

      if (!imageDetails) {
        return next(errorHandler(412, "Server Issue! failed to upload"));
      }

      secure_urls.push(imageDetails.secure_url);
    }
    const apartment = await addApartment(
      title,
      address,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      secure_urls
    );
    console.log(apartment);
    return res.status(200).json(apartment);
  } catch (err) {
    next(error);
  }
};
