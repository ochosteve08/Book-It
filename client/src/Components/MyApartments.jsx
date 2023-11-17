import { useEffect, useState } from "react";

import useRefresh from "../hooks/useRefresh";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { userDetails } from "../features/auth/UserSlice";
import { useSelector } from "react-redux";

const MyApartments = () => {
  const [apartments, setApartments] = useState("");
  const refresh = useRefresh();
  const axiosPrivate = useAxiosPrivate();
 
  const currentUser = useSelector(userDetails);
   const userId = currentUser._id;

  useEffect(() => {
    let isMounted = true;

    const controller = new AbortController();
    const getApartments = async () => {
      try {
       
        const response = await axiosPrivate.get(`/apartments/${userId}/apartments`, {
          signal: controller.signal,
        });
        const { apartments } = { ...response.data.data };
       
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
  }, [axiosPrivate]);

  return (
    <div>
      <h3 className="mt-6 text-center font-bold uppercase text-3xl">
        Apartment Lists
      </h3>
      <div className="">
        {/* {apartments.length > 0 && apartments.map((apartment)=>)

      } */}
      </div>
    </div>
  );
};

export default MyApartments;
