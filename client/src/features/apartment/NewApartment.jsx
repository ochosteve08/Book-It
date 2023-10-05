import { MdOutlineCloudUpload } from "react-icons/md";

const NewApartment = () => {
  return (
    <div className="mx-auto max-w-xl w-full  p-4">
      <form className="flex flex-col space-y-6">
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
            className="w-full  text-lg text-gray-700 bg-slate-200   py-2 px-4 outline-primary hover:outline-primary/50 rounded transition duration-150 ease-in-out "
            required
          ></textarea>
        </div>
        <div className="flex flex-col ">
          <label htmlFor="photos" className="text-xl font-semibold">
            Photos
          </label>
          <p className="text-gray-500 text-sm">more is better</p>
          {/* <input
            type="file"
            id="photo"
            name="photo"
            required
            accept=".jpeg, .png, .jpg"
            className="   rounded-md  outline-primary hover:outline-primary/50  w-full px-4 py-2 mb-6 focus:text-gray-700
               focus:bg-white focus:border-slate-500 text-lg
               text-gray-700 bg-white border border-gray-300
             transition duration-150 ease-in-out "
            multiple
          /> */}
          <div className="flex space-x-4 items-start  ">
            <input
              type="text"
              placeholder="Add using a link...jpg"
              className="   rounded-md  outline-primary hover:outline-primary/50   px-4 py-2  focus:text-gray-700
               focus:bg-white focus:border-slate-500 text-lg grow
               text-gray-700 bg-white border border-gray-300
             transition duration-150 ease-in-out "
            />
            <button className="bg-slate-300   rounded-2xl font-semibold px-4 py-2">
              Add Photos
            </button>
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
            required
          ></textarea>
        </div>
        <button className="bg-primary flex justify-center items-center py-2 rounded-full gap-6 font-semibold text-white uppercase hover:opacity-70">
          <MdOutlineCloudUpload className="text-2xl" /> Upload
        </button>
      </form>
    </div>
  );
};

export default NewApartment;
