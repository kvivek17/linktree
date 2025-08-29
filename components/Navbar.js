"use client"
import React, { use } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
const Navbar = () => {
  const pathname = usePathname()
  const shownavbar = ['/','/generate'].includes(pathname)
  return (
    <>
    {shownavbar && 
    <nav className='bg-white flex fixed right-[10vw] justify-between my-10 items-center border border-black rounded-full mx-auto w-[80vw] p-3'>
       <div className='flex items-center gap-5'>
         <div className='logo  text-black text-2xl '>ProfileTree</div>
        <ul className='flex gap-5 text-gray-800 text-sm'>
           
        </ul>
       </div>
       <div className='flex gap-5'>
        <button className='bg-slate-500 text-white py-1 px-4  font-bold  rounded-lg'>Login</button>
        <button className='bg-black text-white font-bold py-2 px-8  rounded-4xl'>sign up</button>
       </div>
    </nav>
    }
    </>
  )
}


export default Navbar