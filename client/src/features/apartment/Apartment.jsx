import {Link} from 'react-router-dom'
import {FaPlus} from 'react-icons/fa'

const Apartment = () => {
  return (
    <div>
      <div className="text-center">
        <Link
          to="/profile/apartment/new"
          className="bg-primary px-6 py-2 rounded-full text-white inline-flex gap-3 items-center "
        >
        <FaPlus/>
          Add New Apartment
        </Link>
      </div>
      {/* list of apartments */}
    </div>
  );
}

export default Apartment