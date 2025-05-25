import { IoSearch } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Pages/PrivateRoute/AuthProvider";
import { useContext } from "react";


const SearchBar = () => {
  const { user } = useContext(AuthContext)

  return (
    <div className=" md:mt-0 mt-16 bg-white lg:py-5 py-8 px-10  flex gap-5 justify-between items-center lg:flex-row flex-col border-b border-zinc-400">

      <div className="lg:w-7/12  flex items-center gap-2 relative">
        <input className=" text-lg border placeholder:text-zinc-600 border-zinc-300 py-2 pl-4 pr-10 w-full rounded-full outline-zinc-300" type="text" placeholder="Search for friends, groups, pages" />
        <IoSearch className="absolute right-3 text-2xl cursor-pointer text-zinc-600" />
      </div>

      <button className="text-center ">
        <Link to={`/profile/${user.email}`} className="lg:w-fit flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white text-center px-6 py-4 rounded-full cursor-pointer active:scale-95 transition-all">Add New Post <IoMdAdd className="text-2xl" /></Link>
      </button>

    </div>
  )
}

export default SearchBar