import { useEffect, useState } from "react"

import useRefresh from "../hooks/useRefresh"
import useAxiosPrivate from "../hooks/useAxiosPrivate"

const MyApartments = () => {
   const [apartments, setApartments] = useState("");
   const refresh = useRefresh();
   const axiosPrivate = useAxiosPrivate();

  useEffect(()=>{
let isMounted = true;

const controller = new AbortController();
const getApartments = async () => {
  try {
    const response = await axiosPrivate.get("/apartments", {
      signal: controller.signal,
    });
console.log(response)
    isMounted && setUsers(response.data);
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

      </div>
    </div>
  )
}

export default MyApartments