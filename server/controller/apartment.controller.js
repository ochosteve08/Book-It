import {
  addApartment,
  update,
  removeApartment,
  fetchApartment,
  fetchAllApartments,
  fetchUserApartments,
} from "../services/apartment.service.js";
import { bufferToDataURI } from "../utils/file.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { success, error } from "../lib-handler/index.js";
import UserModel from "../model/user.model.js";
import { errorHandler } from "../utils/error.js";

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
    const userId = req.user._id;
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
      userId
    );

    return success.handler({ apartment }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

export const getAllApartments = async (req, res, next) => {
  try {
    const apartments = await fetchAllApartments();
    if (!apartments?.length) {
      return res.status(404).json("No apartments found");
    }
    return success.handler({ apartments }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

export const getUserApartments = async (req, res, next) => {
  try {
     const userId = req.user._id;
    //  const {userId} = req.params;
    const apartments = await fetchUserApartments({userId});
    if (!apartments?.length) {
      return res.status(404).json("No user apartments found");
    }
    return success.handler({ apartments }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};


export const getApartment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const apartment = await fetchApartment({ id });
    if (!apartment) {
      return res.status(404).json("No apartment found");
    }
    return success.handler({ apartment }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

export const updateApartment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      address,
      description,
      secure_urls,
      parsedPerks,
      extraInfo,
      checkIn,
      checkOut,
      parsedMaxGuests,
    } = req.body;

    const userId = req.user._id;

    const User = await UserModel.findOne({ _id: userId });
    if (!User) {
      return next(errorHandler(401, "invalid user"));
    }
    const apartment = await update({
      id,
      title,
      address,
      description,
      secure_urls,
      parsedPerks,
      extraInfo,
      checkIn,
      checkOut,
      parsedMaxGuests,
    });

    return success.handler({ apartment }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

export const deleteApartment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const User = await UserModel.findOne({ _id: userId });
    if (!User) {
      return next(errorHandler(401, "invalid user"));
    }
    const apartment = await removeApartment({ id });
    return success.handler({ apartment }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};
