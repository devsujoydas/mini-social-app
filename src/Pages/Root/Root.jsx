import Navbar from "../../Components/Navbar/Navbar" 
import { Outlet } from "react-router-dom" 

const Root = () => {

 
  return (
    <div className=" border-orange-500 bg-white grid lg:grid-cols-4 font-family-primary relative ">
      <div className="lg:col-span-1 border-zinc-500 relative">
        <Navbar />
      </div>

      <div className="lg:col-span-3">
        <Outlet />
      </div>
    </div>
  )
}

export default Root