import Loader from "../../Components/Loading/Loading"
import Navbar from "../../Components/Navbar/Navbar"
import { AuthContext } from "../PrivateRoute/AuthProvider"
import { Outlet, useLoaderData } from "react-router-dom"
import { useContext, useEffect } from "react"

const Root = () => {
  const { loading } = useContext(AuthContext)
  
  return (
    <div>
      <div className=" border-orange-500 grid lg:grid-cols-4 font-family-primary relative ">
        <div className="lg:col-span-1 border-zinc-500 relative">
          <Navbar />
        </div>

        <div className="lg:col-span-3">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Root