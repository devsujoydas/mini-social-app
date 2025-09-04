import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import { useContext } from "react";
import Loading from "../Components/Loading/Loading";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  const { loading } = useContext(AuthContext);

  return (
    <div>
      <Toaster position="bottom-center" reverseOrder={false} />

      {loading ? (
        <Loading />
      ) : (
        <div className=" border-orange-500 bg-white grid lg:grid-cols-4 font-family-primary relative ">
          <div className="lg:col-span-1 border-zinc-500 relative">
            <Navbar />
          </div>

          <div className="lg:col-span-3">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
