import React from 'react'

const Storybox = () => {
  const storyimgstyle = 'w-18 border-3 border-purple-500 hover:border-red-500 cursor-pointer transition-all rounded-full'

  return (
    <div className=' bg-white rounded-2xl shadow-xl p-5 flex gap-5 items-center'>
      <div>
        <img className={storyimgstyle} src="/Avatar (1).png" alt="" />
        <h1 className='text-xs text-center mt-1'>X_ae-23b</h1>
      </div>

      

      <div>
        <img className={storyimgstyle} src="/Avatar (1).png" alt="" />
        <h1 className='text-xs text-center mt-1'>X_ae-23b</h1>
      </div>

      <div>
        <img className={storyimgstyle} src="/Avatar (1).png" alt="" />
        <h1 className='text-xs text-center mt-1'>X_ae-23b</h1>
      </div>

  
      <div>
        <img className={storyimgstyle} src="/Avatar (1).png" alt="" />
        <h1 className='text-xs text-center mt-1'>X_ae-23b</h1>
      </div>

      <div>
        <img className={storyimgstyle} src="/Avatar (1).png" alt="" />
        <h1 className='text-xs text-center mt-1'>X_ae-23b</h1>
      </div>


    </div>
  )
}

export default Storybox