import ApartmentModel from "../model/apartment.model.js";

export const addApartment = async (
  title,
  address,
  description,
  secure_urls,
  perks,
  extraInfo,
  checkIn,
  checkOut,
  maxGuests
) =>
  UploadModel.create({
    title,
    address,
    description,
    photos: secure_urls,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  });
