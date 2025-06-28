import { IoSearch } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";

const SearchBar = () => {
  return (
    <div className=" lg:mt-0 mt-16 bg-white lg:py-6 py-5 md:px-10 px-5  flex md:gap-5 gap-3 justify-between items-center  border-b border-zinc-400">

      <div className="lg:w-8/12 md:w-10/12 w-9/12 flex items-center gap-2 relative">
        <input className=" lg:text-lg text-xs border placeholder:text-zinc-600 border-zinc-300 py-2 pl-4 pr-10 w-full rounded-full outline-zinc-300" type="text" placeholder="Search for friends, groups, pages" />
        <IoSearch className="absolute right-3 md:text-2xl cursor-pointer text-zinc-600" />
      </div>


      <div className="lg:w-fit md:w-4/12 w-6/12 flex justify-end">

        <button className="">
          <Link to={`/profile`} className="lg:w-fit flex items-center md:gap-2 gap-1 bg-blue-700 hover:bg-blue-600 text-white lg:text-sm text-xs text-center md:px-6 px-4 py-2 lg:py-3 rounded-full cursor-pointer active:scale-95 transition-all">Create Post <IoMdAdd className="md:text-2xl text-sm" /></Link>
        </button>
      </div>

    </div>
  )
}

export default SearchBar