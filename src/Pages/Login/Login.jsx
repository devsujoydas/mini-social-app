

const Login = () => {
  return (
    <div className="w-full bg-zinc-900 text-white font-poppins min-h-screen flex "> 

            <div className="border  h-screen w-full bg-blue-500 flex justify-center items-center flex-col">
                <h1 className="text-4xl font-semibold">XENON MEDIA</h1>
            
                <p>Wellcome to our social media platform</p>

                <p>Log 
                  in Now</p>
            </div>

            <div class="  border h-screen w-full flex justify-center items-center flex-col">

      <a href="/" class="text-green-500  hover:text-green-600 transition-all mb-5">--Back to home</a>

      <div class="border border-zinc-700 p-5 rounded-md">
        <form action="/login" method="post" class="space-y-4 w-96 grid">
          <h1 class="text-3xl ">Log In</h1>

          <input required class="border border-zinc-700 outline-none px-4 py-3 rounded-md" type="email"
            name="email" placeholder="email" />

          <input required class="border border-zinc-700 outline-none px-4 py-3 rounded-md" type="password"
            name="password" placeholder="password" />

          <input
            class="bg-blue-500 cursor-pointer hover:bg-blue-400 active:scale-95 transition-all  py-3 rounded-md"
            type="submit" value="Login" />
        </form>

        <h1 class="mt-5">
          Create new account
          <a href="/signup" class="text-green-500  hover:text-green-600 transition-all"> Sign Up</a>
        </h1>
      </div>
    </div>
    </div>
  )
}

export default Login