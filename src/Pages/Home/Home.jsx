
import Posts from "../../Components/Posts/Posts"
import SearchBar from "../../Components/SearchBar/SearchBar"
import Sidebar from "../../Components/Sidebar/Sidebar"
import Storybox from "../../Components/Storybox/Storybox"

const Home = () => {
  return (
    <div className="grid grid-cols-3 gap-10">

      <div className=" border border-zinc-500 col-span-2">
        <SearchBar />

        <div className="border border-zinc-500">
          <Storybox />
          <Posts />
        </div>
      </div>

      <div className=" border border-zinc-500 col-span-1">
        <Sidebar />
      </div>

    </div>
  )
}

export default Home