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
      parsedMaxGuests
    );

    return success.handler({ apartment }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};


export const getAllApartments = async (req, res, next) => {
  try {
    const employees = await fetchAllEmployees();
    if (!employees?.length) {
      next(errorHandler(204, "No employee found"));
    }
    res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
};

export const getEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const employee = await fetchEmployee({ id });
    if (!employee) {
      next(errorHandler(400, "No employee found"));
    }
    res.status(200).json(employee);
  } catch (error) {
    next(error);
  }
};



export const updateEmployee = async (req, res, next) => {
  const { id } = req.params;
  const { firstName, lastName } = req.body;

  if (!id) {
    return next(errorHandler(401, "kindly login"));
  }
  try {
    const updatedUser = await update({
      id,
      firstName,
      lastName,
    });

    res.status(200).json(User);
  } catch (error) {
    next(error);
  }
};

export const deleteEmployee = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(errorHandler(401, "kindly login"));
  }
  try {
    await removeEmployee({ id });
    res.status(204).json("Employee has been deleted...");
  } catch (error) {
    next(error);
  }
};
