
import { Link, useNavigate } from "react-router-dom"

const Signup = () => {

    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault();
        const firstName = e.target.firstName.value;
        const lastName = e.target.lastName.value;
        const username = e.target.username.value;
        const phone = e.target.phone.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const formData = { firstName, lastName, username, phone, email, password }
        console.log("formData", formData)
        navigate("/login")
        try {
            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            console.log(result);
        }
        catch (err) {
            console.error('Error:', err);
        }

    };


    return (
        <div className="w-full h-screen md:p-0 p-5 font-poppins flex items-center  md:flex-row flex-col">
            <div className="w-full  flex justify-center items-center flex-col">
                <h1 className="md:text-8xl text-4xl text-blue-500 font-semibold">XENON MEDIA</h1>
                <p>Wellcome to our social media platform</p>
            </div>

            <div className=" w-full flex flex-col justify-center items-center ">

                <div className="flex justify-center items-center">
                    <Link to="/" className="text-green-500 text-center hover:text-green-600 transition-all mb-5">--Back to home</Link>
                </div>

                <div className="border w-fit border-zinc-700 p-5 rounded-md hover:shadow-lg transition-all">

                    <form onSubmit={submitHandler} className="space-y-4 w-full md:w-96 grid">
                        <h1 className="text-3xl ">Sign Up</h1>

                        <div className="grid grid-cols-2 gap-2">
                            <input required className="border border-zinc-700 outline-none md:px-4 px-2 md:py-3 py-2 rounded-md" type="text"
                                name="firstName" placeholder="First Name" />

                            <input required className="border border-zinc-700 outline-none md:px-4 px-2 md:py-3 py-2 rounded-md" type="text"
                                name="lastName" placeholder="Last Name" />
                        </div>

                        <input required className="border border-zinc-700 outline-none md:px-4 px-2 md:py-3 py-2 rounded-md" type="text"
                            name="username" placeholder="username" />

                        {/* <input required  className="border border-zinc-700 outline-none md:px-4 px-2 md:py-3 py-2 rounded-md cursor-pointer" type="file"
                            name="image" /> */}

                        <input required className="border border-zinc-700 outline-none md:px-4 px-2 md:py-3 py-2 rounded-md" type="number"
                            name="phone" placeholder="phone" />

                        <input required className="border border-zinc-700 outline-none md:px-4 px-2 md:py-3 py-2 rounded-md" type="email"
                            name="email" placeholder="email" />

                        <input required className="border border-zinc-700 outline-none md:px-4 px-2 md:py-3 py-2 rounded-md" type="password"
                            name="password" placeholder="password" />


                        <input required
                            className="bg-blue-500 text-white cursor-pointer hover:bg-blue-400 active:scale-95 transition-all  py-3 rounded-md"
                            type="submit" value="Signup" />

                    </form>

                    <h1 className="mt-5">
                        Already Have an account
                        <Link to={"/login"} className="text-green-500  hover:text-green-600 transition-all"> Log In</Link>
                    </h1>

                </div>
            </div>
        </div>
    )
}

export default Signup