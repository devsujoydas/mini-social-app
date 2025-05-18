import { Link } from "react-router-dom"

const Signup = () => {
    return (
        <div className="w-full h-screen md:p-0 p-5 font-poppins flex items-center  md:flex-row flex-col">
            <div className="w-full  flex justify-center items-center flex-col">
                <h1 className="md:text-8xl text-4xl text-blue-500 font-semibold">XENON MEDIA</h1>
                <p>Wellcome to our social media platform</p>
            </div>

            <div className=" w-full flex flex-col justify-center items-center ">

                <div className="flex justify-center items-center">
                    <Link to="/" class="text-green-500 text-center hover:text-green-600 transition-all mb-5">--Back to home</Link>
                </div>

                <div class="border w-fit border-zinc-700 p-5 rounded-md">
                    <form action="/register" method="post" class="space-y-4 w-full md:w-96 grid">
                        <h1 class="text-3xl ">Sign Up</h1>

                        <div class="grid grid-cols-2 gap-2">
                            <input required class="border border-zinc-700 outline-none md:px-4 px-2 md:py-3 py-2 rounded-md" type="text"
                                name="firstName" placeholder="First Name" />

                            <input required class="border border-zinc-700 outline-none md:px-4 px-2 md:py-3 py-2 rounded-md" type="text"
                                name="lastName" placeholder="Last Name" />
                        </div>

                        <input required class="border border-zinc-700 outline-none md:px-4 px-2 md:py-3 py-2 rounded-md" type="text"
                            name="username" placeholder="username" />

                        <input required class="border border-zinc-700 outline-none md:px-4 px-2 md:py-3 py-2 rounded-md cursor-pointer" type="file"
                            name="image" />

                        <input required class="border border-zinc-700 outline-none md:px-4 px-2 md:py-3 py-2 rounded-md" type="number"
                            name="phone" placeholder="phone" />

                        <input required class="border border-zinc-700 outline-none md:px-4 px-2 md:py-3 py-2 rounded-md" type="email"
                            name="email" placeholder="email" />

                        <input required class="border border-zinc-700 outline-none md:px-4 px-2 md:py-3 py-2 rounded-md" type="password"
                            name="password" placeholder="password" />


                        <input
                            class="bg-blue-500 cursor-pointer hover:bg-blue-400 active:scale-95 transition-all  py-3 rounded-md"
                            type="submit" value="Signup" />

                    </form>

                    <h1 class="mt-5">
                        Already Have an account
                        <Link to={"/login"} class="text-green-500  hover:text-green-600 transition-all"> Log In</Link>
                    </h1>

                </div>
            </div>
        </div>
    )
}

export default Signup