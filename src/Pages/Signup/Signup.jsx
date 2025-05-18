
const Signup = () => {
    return (
        <div class="w-full bg-zinc-900 text-white p-10 font-poppins h-screen flex justify-center items-center flex-col">

            <a href="/" class="text-green-500  hover:text-green-600 transition-all mb-5">--Back to home</a>

            <div class="border border-zinc-700 p-5 rounded-md">
                <form action="/register" method="post" class="space-y-4 w-96 grid">
                    <h1 class="text-3xl ">Sign Up</h1>

                    <div class="grid grid-cols-2 gap-2">
                        <input required class="border border-zinc-700 outline-none px-4 py-3 rounded-md" type="text"
                            name="firstName" placeholder="First Name" />

                        <input required class="border border-zinc-700 outline-none px-4 py-3 rounded-md" type="text"
                            name="lastName" placeholder="Last Name" />
                    </div>

                    <input required class="border border-zinc-700 outline-none px-4 py-3 rounded-md" type="text"
                        name="username" placeholder="username" />

                    <input required class="border border-zinc-700 outline-none px-4 py-3 rounded-md" type="file"
                        name="image" />

                    <input required class="border border-zinc-700 outline-none px-4 py-3 rounded-md" type="number"
                        name="phone" placeholder="phone" />

                    <input required class="border border-zinc-700 outline-none px-4 py-3 rounded-md" type="email"
                        name="email" placeholder="email" />

                    <input required class="border border-zinc-700 outline-none px-4 py-3 rounded-md" type="password"
                        name="password" placeholder="password" />


                    <input
                        class="bg-blue-500 cursor-pointer hover:bg-blue-400 active:scale-95 transition-all  py-3 rounded-md"
                        type="submit" value="Signup" />

                </form>

                <h1 class="mt-5">
                    Already Have an account
                    <a href="/login" class="text-green-500  hover:text-green-600 transition-all"> Log In</a>
                </h1>

            </div>
        </div>
    )
}

export default Signup