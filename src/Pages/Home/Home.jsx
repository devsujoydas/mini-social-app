import FriendSuggested from "../../Components/FriendSuggested/FriendSuggested"
import Posts from "../../Components/Posts/Posts"
import ProfileActivity from "../../Components/ProfileActivity/ProfileActivity"
import SearchBar from "../../Components/SearchBar/SearchBar"
import Sidebar from "../../Components/Sidebar/Sidebar"
import SideNavbar from "../../Components/SideNavbar/SideNavbar"
import Storybox from "../../Components/Storybox/Storybox"
import UpcommingEvents from "../../Components/UpcommingEvents/UpcommingEvents"

const Home = () => {
  return (
    <div>
      <div>
        <SearchBar />
        <Storybox />
        <Posts />
      </div>


      <div>
        <Sidebar/>
      </div>
    </div>
  )
}

export default Home