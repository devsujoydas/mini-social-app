import PostForm from "../../Components/PostForm/PostForm"
import Posts from "../../Components/Posts/Posts"
import ProfileSidebar from "../../Components/ProfileSidebar/ProfileSidebar"

const Profile = () => {
  return (
    <div>
      <div>
        <PostForm />
        <Posts />
      </div>


      <div>
        <ProfileSidebar />
      </div>
    </div>
  )
}

export default Profile