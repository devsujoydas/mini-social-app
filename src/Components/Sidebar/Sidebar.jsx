import FriendSuggested from "../FriendSuggested/FriendSuggested"
import ProfileActivity from "../ProfileActivity/ProfileActivity"
import SideNavbar from "../SideNavbar/SideNavbar"
import UpcommingEvents from "../UpcommingEvents/UpcommingEvents"

const Sidebar = () => {
  return (
    <div className="">
        <SideNavbar />
        <FriendSuggested />
        <ProfileActivity />
        <UpcommingEvents />
    </div>
  )
}

export default Sidebar