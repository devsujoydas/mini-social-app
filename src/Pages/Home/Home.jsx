import Posts from "../../Components/Posts/Posts"
import SearchBar from "../../Components/SearchBar/SearchBar"
import Sidebar from "../../Components/Sidebar/Sidebar"
import Storybox from "../../Components/Storybox/Storybox"
import SideNavbar from "../../Components/SideNavbar/SideNavbar"
import Loading from "../../Components/Loading/Loading"
import { useContext, useState } from "react"
import { AuthContext } from "../PrivateRoute/AuthProvider"

const Home = () => {



  const [loading, setLoading] = useState(true)

  setTimeout(() => {
    setLoading(false)
  }, 1000);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-9 bg-[#f1f5fa] relative  ">

      <div className="lg:col-span-6 ">
        <div className="md:sticky top-0 z-10">
          <SearchBar />
        </div>
        <div className="md:py-5 py-3 lg:px-5 px-3 space-y-5">

          {loading ? <Loading /> : <Storybox />}
          {loading ? <Loading /> : <Posts />}

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