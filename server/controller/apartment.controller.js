import { addApartment } from "../services/apartment.service.js";
import { bufferToDataURI } from "../utils/file.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { success, error } from "../lib-handler/index.js";

export const createApartment = async (req, res, next) => {
  try {
    const { files } = req;
    const {
      title,
      address,
      description,
      extraInfo,
      perks,
      checkIn,
      checkOut,
      maxGuests,
    } = req.body;

  const parsedMaxGuests = Number(maxGuests);
  const parsedPerks = perks[0].split(",");


    let secure_urls = [];
    for (let file of files) {
      const fileFormat = file.mimetype.split("/")[1];
      const { base64 } = bufferToDataURI(fileFormat, file.buffer);
      const imageDetails = await uploadToCloudinary(base64, fileFormat);

      if (!imageDetails) {
        throw error.throwPreconditionFailed({
          message: "Server Issue! failed to upload",
        });
      }

      secure_urls.push(imageDetails.secure_url);
      
    }

    
    const apartment = await addApartment(
       title,
      address,
      description,
      secure_urls,
      parsedPerks,
      extraInfo,
      checkIn,
      checkOut,
      parsedMaxGuests,
    );
   

    return success.handler({apartment}, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};
