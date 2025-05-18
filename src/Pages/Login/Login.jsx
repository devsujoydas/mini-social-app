import { Link } from "react-router-dom"


const Login = () => {
  return (
    <div className="w-full h-screen md:p-0 p-5 font-poppins flex items-center  md:flex-row flex-col">
      <div className="w-full  flex justify-center items-center flex-col">
        <h1 className="md:text-8xl text-4xl text-blue-500 font-semibold">XENON MEDIA</h1>
        <p>Wellcome to our social media platform</p>
      </div>

      <div className=" w-full flex justify-center items-center flex-col">
        
        <div className="flex justify-center items-center">
          <Link to="/" class="text-green-500 text-center hover:text-green-600 transition-all mb-5">--Back to home</Link>
        </div>

        <div class="border w-fit hover:shadow-lg transition-all border-zinc-700 p-5 rounded-md">
          <form action="/login" method="post" class="space-y-4 md:min-w-96 grid">
            <h1 class="text-3xl ">Log In</h1>

            <input required class="border border-zinc-700 outline-none md:px-4 px-2 md:py-3 py-2 w-full rounded-md" type="email"
              name="email" placeholder="email" />

            <input required class="border border-zinc-700 outline-none md:px-4 px-2 md:py-3 py-2 w-full rounded-md" type="password"
              name="password" placeholder="password" />

            <input
              class="bg-blue-500 text-white cursor-pointer hover:bg-blue-400 active:scale-95 transition-all  py-3 rounded-md"
              type="submit" value="Login" />
          </form>

          <h1 class="mt-5">
            Create new account
            <Link to={"/signup"} class="text-green-500  hover:text-green-600 transition-all"> Sign Up</Link>
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Login