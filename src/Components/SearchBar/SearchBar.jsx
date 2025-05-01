import { IoSearch } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";


const SearchBar = () => {
  return (
    <div className="bg-white py-5 px-10 w-full flex justify-between items-center border-b border-zinc-400">

      <div className="w-7/12 flex items-center gap-2 relative">
        <input className=" text-xl border placeholder:text-zinc-600 border-zinc-300 py-4 pl-4 pr-10 w-full rounded-full outline-zinc-300" type="text" placeholder="Search for friends, groups, pages" />
        <IoSearch className="absolute right-3 text-2xl cursor-pointer text-zinc-600" />
      </div>

      <div className="">
        <button className="flex items-center gap-2 text-xl bg-[#4F46E5] text-white px-6 py-4 rounded-full">Add New Post<IoMdAdd className="text-2xl" /></button>
      </div>
    </div>
  )
}

export default SearchBar