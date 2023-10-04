import { Outlet } from "react-router-dom";


const ApartmentLayout = () => {
  return (
    <div className="p-4 max-w-8xl">
    
      <Outlet />
    </div>
  );
};

export default ApartmentLayout;
