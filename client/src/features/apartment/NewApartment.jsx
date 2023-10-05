

const NewApartment = () => {
  return (
    <div className="mx-auto max-w-xl w-full  p-4">
      <form className="flex flex-col space-y-6">
        <div className="space-x-4 my-3">
          <label htmlFor="title" className="text-lg  mt-6">
            TItle
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className=" bg-slate-200  rounded-md py-2 px-4 outline-primary hover:outline-primary/50"
            placeholder="my lovely apartment"
          />
        </div>
        <div className="flex space-x-4 my-3">
          <label htmlFor="address">Address</label>
          <textarea
            name="address"
            id="address"
            className="w-full  text-lg text-gray-700 bg-slate-200   py-2 px-4 outline-primary hover:outline-primary/50 rounded transition duration-150 ease-in-out "
          ></textarea>
        </div>
        <div>
          <label htmlFor="photos">Photos</label>
        </div>
      </form>
    </div>
  );
}

export default NewApartment