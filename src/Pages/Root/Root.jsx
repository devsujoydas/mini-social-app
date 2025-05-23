import { Outlet } from "react-router-dom"
import Navbar from "../../Components/Navbar/Navbar"
import { useContext } from "react"
import { AuthContext } from "../PrivateRoute/AuthProvider"
import Loader from "../../Components/Loader/Loader"

const Root = () => {
  const { loading } = useContext(AuthContext)
  return (
    <div>
      {
        loading ?
          <Loader />
          :
          <div className=" border-orange-500 grid lg:grid-cols-4 font-family-primary relative ">

            <div className="lg:col-span-1 border-zinc-500 relative">
              <Navbar />
            </div>

            <div className="lg:col-span-3">
              <Outlet />
            </div>

          </div>
      }
    </div>
  )
}

export default Root