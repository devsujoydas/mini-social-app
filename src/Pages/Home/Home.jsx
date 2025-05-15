
import Posts from "../../Components/Posts/Posts"
import SearchBar from "../../Components/SearchBar/SearchBar"
import Sidebar from "../../Components/Sidebar/Sidebar"
import Storybox from "../../Components/Storybox/Storybox"
import SideNavbar from "../../Components/SideNavbar/SideNavbar"
const Home = () => {
  return (
    <div className="grid  grid-cols-1 lg:grid-cols-9 bg-[#f1f5fa] ">

      <div className="lg:col-span-6 relative">

        <div className="md:sticky top-0 z-10">
          <SearchBar />
        </div>

        <div className=" py-5 lg:px-10 px-5 space-y-5">
          <Storybox />
          <Posts />
        </div>
      </div>

      <div className="lg:col-span-3 bg-white border-l border-zinc-300 ">
        <SideNavbar />
        <Sidebar />
      </div>

    </div>
  )
}

export default Home