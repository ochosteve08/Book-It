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

export const fetchAllApartments = async () => {
  return await ApartmentModel.find();
};

export const fetchApartment = async ({ id }) =>
  await ApartmentModel.findById({ _id: id });

export const update = async ({
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
}) => {
  return await ApartmentModel.findByIdAndUpdate(
    id,

    {
      title,
      address,
      description,
      photos: secure_urls,
      perks: parsedPerks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests: parsedMaxGuests,
    },

    { new: true }
  );
};

export const removeApartment = async ({ id }) =>
  await ApartmentModel.findOneAndDelete({ _id: id });

