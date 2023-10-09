import ApartmentModel from "../model/apartment.model.js";

export const addApartment = async (
  title,
  address,
  description,
  secure_urls,
  parsedPerks,
  extraInfo,
  checkIn,
  checkOut,
  parsedMaxGuests
) =>
  ApartmentModel.create({
    title,
    address,
    description,
    photos: secure_urls,
    perks: parsedPerks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests: parsedMaxGuests,
  });
