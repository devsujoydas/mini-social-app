import FriendSuggested from "../FriendSuggested/FriendSuggested"
import ProfileActivity from "../ProfileActivity/ProfileActivity"
import SideNavbar from "../SideNavbar/SideNavbar"
import UpcommingEvents from "../UpcommingEvents/UpcommingEvents"

const Sidebar = () => {
  return (
    <div className="">
      <SideNavbar />

      <div className="p-5 space-y-7">
        <FriendSuggested />
        <ProfileActivity />
        <UpcommingEvents />
      </div>
    </div>
  )
}

export default Sidebar