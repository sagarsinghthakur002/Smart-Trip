import React from 'react'
import logo from "../../assets/images/Planner.png"
const Header = () => {
  return (
    <div className='flex justify-between items-center p-4 px-5'>
     <img className='w-44' src={logo}></img> 
     <div>
      <button>Sing In </button>
     </div>
    </div>
  )
}

export default Header