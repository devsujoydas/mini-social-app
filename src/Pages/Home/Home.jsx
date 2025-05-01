
import Posts from "../../Components/Posts/Posts"
import SearchBar from "../../Components/SearchBar/SearchBar"
import Sidebar from "../../Components/Sidebar/Sidebar"
import Storybox from "../../Components/Storybox/Storybox"

const Home = () => {
  return (
    <div className="grid grid-cols-7 bg-[#f1f5fa]">

      <div className="col-span-5">

          <SearchBar />

        <div className=" py-5 px-10 space-y-5">
          <Storybox />
          <Posts />
        </div>
      </div>

      <div className="col-span-2 bg-white border-l border-zinc-300">
        <Sidebar />
      </div>

    </div>
  )
}

export default Home