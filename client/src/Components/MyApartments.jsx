import { useEffect, useState } from "react"

import useRefresh from "../hooks/useRefresh"
import useAxiosPrivate from "../hooks/useAxiosPrivate"

const MyApartments = () => {
   const [apartments, setApartments] = useState("");
   const refresh = useRefresh();
   const axiosPrivate = useAxiosPrivate();
   console.log(apartments)

  useEffect(()=>{
let isMounted = true;

const controller = new AbortController();
const getApartments = async () => {
  try {
    const response = await axiosPrivate.get("/apartments", {
      signal: controller.signal,
    });
     const { apartments } = { ...response.data.data };
console.log(apartments)
    isMounted && setApartments(apartments);
  } catch (error) {
    console.log(error);
  }
};
getApartments();

return () => {
  isMounted = false;
  controller.abort();
};
  },[axiosPrivate])


  return (
    <div>
      <h3 className="mt-6 text-center font-bold uppercase text-3xl">Apartment Lists</h3>
      <div className="" >
      {/* {apartments.length > 0 && apartments.map((apartment)=>)

      } */}

      </div>
    </div>
  )
}

export default MyApartments