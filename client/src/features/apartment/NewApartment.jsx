import { MdWifi, MdLaptop, MdIron } from "react-icons/md";
import {
  FaCar,
  FaBath,
  FaTv,
  FaNotesMedical,
  FaSwimmingPool,
  FaEthernet,
  FaAudioDescription,
  FaTable,
  FaCloudUploadAlt,
  FaTimes,
} from "react-icons/fa";
import { TbToolsKitchen2 } from "react-icons/tb";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../../app/api/axios";

const NewApartment = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);
  const [perks, setPerks] = useState([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [extraInfo, setExtraInfo] = useState("");
  const fileRef = useRef(null);

  const handlePerkChange = (event) => {
    const { name, checked } = event.target;

    setPerks((prevPerks) => {
      if (checked && !prevPerks.includes(name)) {
        return [...prevPerks, name];
      }

      if (!checked && prevPerks.includes(name)) {
        return prevPerks.filter((perk) => perk !== name);
      }

      return prevPerks;
    });
  };

  const handleFileChange = (event) => {
    if (photos.length === 6) return;
    const selectedPhotos = Array.from(event.target.files);

    const uniquePhotos = selectedPhotos.filter(
      (selectedPhoto) =>
        !photos.some(
          (existingPhoto) =>
            existingPhoto.name === selectedPhoto.name &&
            existingPhoto.size === selectedPhoto.size &&
            existingPhoto.lastModified === selectedPhoto.lastModified
        )
    );

    setPhotos((prevPhotos) => [...prevPhotos, ...uniquePhotos]);
  };

  const deleteImage = (event, photoURLToDelete) => {
    event.stopPropagation();

    setPhotos((prevPhotos) =>
      prevPhotos.filter((photoURL) => photoURL !== photoURLToDelete)
    );
  };

  const handleCheckInChange = (event) => {
    const newCheckIn = new Date(event.target.value);
    const existingCheckOut = new Date(checkOut);

    if (newCheckIn >= existingCheckOut) {
      toast.error("Check-in time should be before check-out time!");
      return;
    }

    setCheckIn(event.target.value);
  };

  const handleCheckOutChange = (event) => {
    const newCheckOut = new Date(event.target.value);
    const existingCheckIn = new Date(checkIn);

    if (newCheckOut <= existingCheckIn) {
      toast.error("Check-out time should be after check-in time!");
      return;
    }

    setCheckOut(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      // Handle File Data from the state Before Sending
      const data = new FormData();

      data.append("title", title);
      data.append("address", address);
      data.append("description", description);
      data.append("perks", perks);
      data.append("checkIn", checkIn);
      data.append("checkOut", checkOut);
      data.append("extraInfo", extraInfo);
      data.append("maxGuests", maxGuests);

      photos.forEach((photo, index) => {
        data.append(`photo_${index}`, photo);
      });

      const response = await fetch(`${BASE_URL}/apartment`, {
        method: "POST",
        body: data,
      });
      if (!response.ok) {
        throw new Error("Failed to upload file");
      }
      const result = await response.json();

      console.log(result.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="mx-auto max-w-4xl w-full  p-4">
      <form className="flex flex-col space-y-6" onSubmit={onSubmitHandler}>
        <div className="flex flex-col ">
          <label htmlFor="title" className="text-xl  mt-6 font-semibold">
            Title
          </label>
          <p className="text-gray-500 text-sm">
            Title for your place should be short and attractive as in
            Advertisement
          </p>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className=" bg-slate-200  rounded-md py-2 px-4 outline-primary hover:outline-primary/50"
            placeholder="title, for example: my lovely apartment"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="address" className="text-xl font-semibold">
            Address
          </label>
          <p className="text-gray-500 text-sm">Address to this place</p>
          <textarea
            name="address"
            id="address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            className="w-full  text-lg text-gray-700 bg-slate-200   py-2 px-4 outline-primary hover:outline-primary/50 rounded transition duration-150 ease-in-out "
            required
          ></textarea>
        </div>
        <div className="flex flex-col ">
          <label htmlFor="photos" className="text-xl font-semibold">
            Photos
          </label>
          <p className="text-gray-500 text-sm">
            more is better (maximum of 6 photos)
          </p>
          <input
            type="file"
            id="photo"
            name="photo"
            ref={fileRef}
            hidden
            onChange={handleFileChange}
            required
            accept=".jpeg, .png, .jpg"
            className="   rounded-md  outline-primary hover:outline-primary/50  w-full px-4 py-2 mb-6 focus:text-gray-700
               focus:bg-white focus:border-slate-500 text-lg
               text-gray-700 bg-white border border-gray-300
             transition duration-150 ease-in-out "
            multiple
          />
          <button
            type="button"
            className="bg-primary text-white px-4 py-2 rounded-full mt-3 w-2/5 flex justify-center items-center gap-3 "
            onClick={(event) => {
              event.preventDefault();
              fileRef.current.click();
            }}
          >
            <FaCloudUploadAlt className="text-2xl" /> upload
          </button>
          <div className="mt-3 grid grid-cols-2 md:grid-cols-4  gap-4 ">
            {photos.length > 0 &&
              photos.map((photo, index) => (
                <div
                  key={index}
                  style={{ height: "200px" }}
                  className="relative inline-block"
                >
                  <img
                    className="rounded-2xl object-cover h-full w-full"
                    src={URL.createObjectURL(photo)}
                    alt="uploaded-pic"
                  />
                  <div className="text-primary font-semibold  text-2xl absolute top-3 right-3 cursor-pointer">
                    <FaTimes onClick={(event) => deleteImage(event, photo)} />
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="text-xl font-semibold">
            Description
          </label>
          <p className="text-gray-500 text-sm">description of the apartment</p>
          <textarea
            name="description"
            id="description"
            className="w-full  text-lg text-gray-700 bg-slate-200   py-2 px-4 outline-primary hover:outline-primary/50 rounded transition duration-150 ease-in-out "
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          ></textarea>
        </div>
        <div className="flex flex-col ">
          <label htmlFor="perks" className="text-xl font-semibold">
            Perks
          </label>
          <p className="text-gray-500 text-sm">
            select all the perks for your apartment
          </p>
          <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
            <label
              htmlFor="wifi"
              className="flex gap-3 items-center border  rounded-xl p-3 cursor-pointer"
            >
              <input type="checkbox" name="wifi" onChange={handlePerkChange} />
              <MdWifi className="text-2xl" /> <span>wifi</span>
            </label>
            <label
              htmlFor="parking"
              className="flex gap-3 items-center border p-3 rounded-xl cursor-pointer"
            >
              <input
                type="checkbox"
                name="parking"
                onChange={handlePerkChange}
              />
              <FaCar className="text-2xl" />
              <span className="lg:mt-6">Free parking on premises</span>
            </label>
            <label
              htmlFor="bathub"
              className="flex gap-3 items-center border p-3 rounded-xl cursor-pointer"
            >
              <input
                type="checkbox"
                name="bathub"
                onChange={handlePerkChange}
              />
              <FaBath className="text-2xl" />
              <span>Bathub</span>
            </label>
            <label
              htmlFor="kitchen"
              className="flex gap-3 items-center border p-3 rounded-xl cursor-pointer"
            >
              <input
                type="checkbox"
                name="kitchen"
                onChange={handlePerkChange}
              />
              <TbToolsKitchen2 className="text-2xl" />
              <span> Kitchen</span>
            </label>
            <label
              htmlFor="television"
              className="flex gap-3 items-center border p-3 rounded-xl cursor-pointer"
            >
              <input
                type="checkbox"
                name="television"
                onChange={handlePerkChange}
              />
              <FaTv className="text-2xl" />
              <span className="lg:mt-6">TV with standard cable</span>
            </label>
            <label
              htmlFor="first-aid"
              className="flex gap-3 items-center border p-3 rounded-xl  cursor-pointer"
            >
              <input
                type="checkbox"
                name="first-aid"
                onChange={handlePerkChange}
              />
              <FaNotesMedical className="text-2xl" />
              <span>First aid kit</span>
            </label>
            <label
              htmlFor="pool"
              className="flex gap-3 items-center border p-3 rounded-xl cursor-pointer"
            >
              <input type="checkbox" name="pool" onChange={handlePerkChange} />
              <FaSwimmingPool className="text-2xl" />
              <span>Swimming Pool</span>
            </label>
            <label
              htmlFor="workspace"
              className="flex gap-3 items-center border p-3  rounded-xl cursor-pointer"
            >
              <input
                type="checkbox"
                name="workspace"
                onChange={handlePerkChange}
              />
              <MdLaptop className="text-2xl" />
              <span>Dedicated workspace</span>
            </label>
            <label
              htmlFor="iron"
              className="flex gap-3 items-center border p-3  rounded-xl cursor-pointer"
            >
              <input type="checkbox" name="iron" onChange={handlePerkChange} />
              <MdIron className="text-2xl" />
              <span>Pressing Iron</span>
            </label>
            <label
              htmlFor="ethernet"
              className="flex gap-3 items-center border p-3  rounded-xl cursor-pointer"
            >
              <input
                type="checkbox"
                name="ethernet"
                onChange={handlePerkChange}
              />
              <FaEthernet className="text-2xl" />
              <span>Ethernet Connection</span>
            </label>
            <label
              htmlFor="radio"
              className="flex gap-3 items-center border p-3  rounded-xl cursor-pointer"
            >
              <input type="checkbox" name="radio" onChange={handlePerkChange} />
              <FaAudioDescription className="text-2xl" />
              <span>Bluetooth sound system</span>
            </label>
            <label
              htmlFor="dining"
              className="flex gap-3 items-center border p-3  rounded-xl cursor-pointer"
            >
              <input
                type="checkbox"
                name="dining"
                onChange={handlePerkChange}
              />
              <FaTable className="text-2xl" />
              <span>Dining Table</span>
            </label>
          </div>
        </div>
        <div>{JSON.stringify(perks)}</div>
        <div className="flex flex-col">
          <label htmlFor="information" className="text-xl font-semibold">
            Extra Information
          </label>
          <p className="text-gray-500 text-sm">house rules etc.</p>
          <textarea
            name="description"
            id="description"
            value={extraInfo}
            onChange={(event) => setExtraInfo(event.target.value)}
            className="w-full  text-lg text-gray-700 bg-slate-200   py-2 px-4 outline-primary hover:outline-primary/50 rounded transition duration-150 ease-in-out "
            required
          ></textarea>
        </div>
        <div className="flex flex-col mb-6 ">
          <label htmlFor="check-time" className="text-xl font-semibold">
            Check in&out time, maxGuests
          </label>
          <p className="text-gray-500 text-sm">
            add check in and out times, remember to add some window for cleaning
            the room between guests.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mt-4">
            <div>
              <h3 className="font-semibold">checkIn Time</h3>
              <input
                type="datetime-local"
                value={checkIn}
                onChange={handleCheckInChange}
                className=" rounded-md  outline-primary hover:outline-primary/50   px-4 py-2  focus:text-gray-700
               focus:bg-white focus:border-slate-500 text-lg grow
               text-gray-700 bg-white border border-gray-300
             transition duration-150 ease-in-out"
              />
            </div>
            <div>
              <h3 className="font-semibold">checkOut Time</h3>
              <input
                type="datetime-local"
                value={checkOut}
                onChange={handleCheckOutChange}
                className=" rounded-md  outline-primary hover:outline-primary/50   px-4 py-2  focus:text-gray-700
               focus:bg-white focus:border-slate-500 text-lg grow
               text-gray-700 bg-white border border-gray-300
             transition duration-150 ease-in-out"
              />
            </div>
            <div>
              <h3 className="font-semibold">Max number of Guests</h3>
              <input
                type="number"
                min={1}
                value={maxGuests}
                onChange={(event) => setMaxGuests(event.target.value)}
                className=" rounded-md  outline-primary hover:outline-primary/50   px-4 py-2  focus:text-gray-700
               focus:bg-white focus:border-slate-500 text-lg grow
               text-gray-700 bg-white border border-gray-300
             transition duration-150 ease-in-out"
              />
            </div>
          </div>
        </div>
        <button className="bg-primary flex justify-center items-center py-2 rounded-full  font-semibold text-white uppercase hover:opacity-70 md:w-2/5 md:mx-auto">
          Save
        </button>
      </form>
    </div>
  );
};

export default NewApartment;
