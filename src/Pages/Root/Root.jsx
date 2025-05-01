import { Outlet } from "react-router-dom"
import Navbar from "../../Components/Navbar/Navbar"

const Root = () => {
  return (
    <div className=" border-orange-500 grid lg:grid-cols-4 font-poppins relative ">

      <div className="lg:col-span-1 border-zinc-500 relative">
        <Navbar/>
      </div>

      <div className="lg:col-span-3">
        <Outlet />
      </div>
      
    </div>
  )
}

export default Root