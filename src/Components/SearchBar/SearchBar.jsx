import { IoSearch } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";


const SearchBar = () => {
  return (
    <div className="md:sticky md:mt-0 mt-26 left-0 top-0 bg-white lg:py-5 py-8 px-10 w-full flex gap-5 justify-between items-center lg:flex-row flex-col border-b border-zinc-400">

      <div className="lg:w-7/12 w-full flex items-center gap-2 relative">
        <input className=" text-lg border placeholder:text-zinc-600 border-zinc-300 py-2 pl-4 pr-10 w-full rounded-full outline-zinc-300" type="text" placeholder="Search for friends, groups, pages" />
        <IoSearch className="absolute right-3 text-2xl cursor-pointer text-zinc-600" />
      </div>

      <button className="text-center ">
        <a href="/profile" className="lg:w-fit w-full flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white text-center px-6 py-4 rounded-full cursor-pointer active:scale-95 transition-all">Add New Post <IoMdAdd className="text-2xl" /></a>
      </button>

    </div>
  )
}

export default SearchBar