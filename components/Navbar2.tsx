import React from 'react'
import { Bell, CalendarRange, Moon, Search } from "lucide-react";

const Navbar2 = () => {
  return (
    <nav className='pb-3 mt-3 border-b border-gray-400'>
      <div className='flex justify-between max-w-[95%] mx-auto'>
        <div className='flex gap-18'>
          {/* Logo */}
          <div className='flex items-center gap-0.1'>
            <CalendarRange color='blue'/>
            <h1 className='font-semibold text-2xl'>NewsToday</h1>
          </div>

          {/* Nav menus */}
          <ul className='flex items-center gap-6 font-medium'>
            <li>Top Stories</li>
            <li>World</li>
            <li>Politics</li>
            <li>Business</li>
            <li>Tech</li>
            <li>Culture</li>
          </ul>
        </div>

        <div className='flex items-center gap-4'>
          {/* Search bar */}
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-600'/>
            <input type="text" className='bg-gray-200 py-2 pl-10 rounded-full focus:outline-none' placeholder='Search'/>
          </div>


          {/* notification */}
          <Bell />

          {/* Profile Avatar */}
          <a href="#">
            <img src="https://images.unsplash.com/photo-1740252117013-4fb21771e7ca?w=500&auto=format&fit=crop&q=60" alt="" className='rounded-full w-7 h-7'/>
          </a>

        </div>
      </div>
    </nav>
  )

}

export default Navbar2