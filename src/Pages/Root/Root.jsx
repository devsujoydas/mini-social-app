import { Outlet } from "react-router-dom"
import Navbar from "../../Components/Navbar/Navbar"

const Root = () => {
  return (
    <div className=" border-orange-500 grid md:grid-cols-10 font-poppins">

      <div className="md:col-span-2 border-zinc-500 ">
        <Navbar />
      </div>

      <div className="md:col-span-8">
        <Outlet />
      </div>
      
    </div>
  )
}

export default Root