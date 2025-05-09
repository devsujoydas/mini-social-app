import React from 'react'

const Login = () => {
  return (
    <div className='grid grid-cols-2'>
      <div className='min-h-screen bg-blue-600'></div>
      <div className='min-h-screen flex justify-center items-center'>
        <form action="" className='border border-zinc-300 p-10 rounded-md shadow-lg'>
          <h1 className='text-2xl text-blue-700 font-semibold'>Login</h1>
          
          <div className='grid'>
            <label htmlFor="email">Email</label>
            <input className='border border-zinc-500 rounded-sm' type="email" />
          </div>


          <div className='grid'>
            <label htmlFor="password">Password</label>
            <input className='border border-zinc-500 rounded-sm' type="password" />
          </div>

          <div>

            <input type="submit" value={"Login"} />
          </div>


        </form>
      </div>
    </div>
  )
}

export default Login