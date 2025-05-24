import Posts from "../../Components/Posts/Posts"
import SearchBar from "../../Components/SearchBar/SearchBar"
import Sidebar from "../../Components/Sidebar/Sidebar"
import Storybox from "../../Components/Storybox/Storybox"
import SideNavbar from "../../Components/SideNavbar/SideNavbar"
import { AuthContext } from "../PrivateRoute/AuthProvider"
import { useContext } from "react"

const Home = () => {

  const { userData } = useContext(AuthContext)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-9 bg-[#f1f5fa]  ">

      <div className="lg:col-span-6 relative">

        <div className="md:sticky top-0 z-10">
          <SearchBar />
        </div>

        <div className="md:py-5 py-3 lg:px-5 px-3 space-y-5">
          <Storybox />

          <div>
            <Posts />
          </div>
          
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