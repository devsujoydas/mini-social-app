import { Outlet } from "react-router-dom"
import Navbar from "../../Components/Navbar/Navbar"

const Root = () => {
  return (
    <div className="border border-orange-500 grid grid-cols-4 gap-10 font-poppins">

      <div className="col-span-1 border border-zinc-500">
        <Navbar />
      </div>

      <div className="col-span-3">
        <Outlet />
      </div>
      
    </div>
  )
}

export default Root