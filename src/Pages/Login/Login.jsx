import { Link, useNavigate } from "react-router-dom"


const Login = () => {
  const navigate = useNavigate()
  const submitHandler = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const formData = { email, password }
    console.log("formData", formData)
    
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      console.log(result);
      navigate("/profile")
    }
    catch (err) {
      console.error('Error:', err);
    }
  }

  return (
    <div className="w-full h-screen md:p-0 p-5 font-poppins flex items-center  md:flex-row flex-col">
      <div className="w-full  flex justify-center items-center flex-col">
        <h1 className="md:text-8xl text-4xl text-blue-500 font-semibold">XENON MEDIA</h1>
        <p>Wellcome to our social media platform</p>
      </div>

      <div className=" w-full flex justify-center items-center flex-col">

        <div className="flex justify-center items-center">
          <Link to="/" className="text-green-500 text-center hover:text-green-600 transition-all mb-5">--Back to home</Link>
        </div>

        <div className="border md:w-fit w-full hover:shadow-lg transition-all border-zinc-700 p-5 rounded-md">
          <form action="/login" onSubmit={submitHandler} className="space-y-4 md:min-w-96 grid">
            <h1 className="text-3xl ">Log In</h1>

            <input required className="border border-zinc-700 outline-none md:px-4 px-2 md:py-3 py-2 w-full rounded-md" type="email"
              name="email" placeholder="email" />

            <input required className="border border-zinc-700 outline-none md:px-4 px-2 md:py-3 py-2 w-full rounded-md" type="password"
              name="password" placeholder="password" />

            <input
              className="bg-blue-500 text-white cursor-pointer hover:bg-blue-400 active:scale-95 transition-all  py-3 rounded-md"
              type="submit" value="Login" />
          </form>

          <h1 className="mt-5">
            Create new account
            <Link to={"/signup"} className="text-green-500  hover:text-green-600 transition-all"> Sign Up</Link>
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Login