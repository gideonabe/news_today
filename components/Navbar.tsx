"use client"

import React, { useState, useEffect } from 'react'
import { Bell, CalendarRange, Moon, Sun, Search, Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  // Load theme from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
    document.body.classList.toggle('dark', storedTheme === 'dark');
  }, []);

  // Toggle between light and dark
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <nav className='pb-3 pt-3 border-b border-gray-400 dark:border-gray-600'>
      <div className='flex justify-between items-center max-w-[95%] mx-auto'>

        <div className='flex items-center gap-14'>
          {/* Logo */}
          <div className='flex items-center gap-1'>
            <CalendarRange color='blue'/>
            <h1 className='font-semibold text-xl md:text-2xl dark:text-gray-100'>NewsToday</h1>
          </div>

          {/* Desktop Nav menus */}
          <ul className='hidden md:flex items-center gap-6 text-gray-500 font-medium dark:text-gray-200'>
            <li>Top Stories</li>
            <li>World</li>
            <li>Politics</li>
            <li>Business</li>
            <li>Tech</li>
            <li>Culture</li>
          </ul>

        </div>


        {/* Right Section */}
        <div className='flex items-center gap-3 md:gap-4 relative'>

          {/* Desktop Search Bar */}
          <div className='hidden md:block relative'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300'/>
            <input
              type="text"
              placeholder="Search..."
              className='bg-gray-200 dark:bg-gray-700 dark:text-gray-100 py-2 pl-10 rounded-full focus:outline-none'
            />
          </div>

          {/* Mobile Icons */}
          <div className='flex items-center gap-3 md:hidden'>
            {/* Mobile Search Icon */}
            {/* <button
              className='p-2 text-gray-700 dark:text-gray-200'
              onClick={() => {
                setSearchOpen(!searchOpen);
                setMenuOpen(false);
              }}
            >
              <Search />
            </button> */}

            {/* Theme Toggle */}
            <button onClick={toggleTheme} className='p-2 text-gray-700 dark:text-gray-200 cursor-pointer'>
              {theme === 'light' ? <Moon /> : <Sun />}
            </button>

            {/* Notification */}
            <Bell className='cursor-pointer text-gray-700 dark:text-gray-200'/>

            {/* Hamburger */}
            <button
              className='p-2 text-gray-700 dark:text-gray-200'
              onClick={() => {
                setMenuOpen(!menuOpen);
                setSearchOpen(false);
              }}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Desktop Theme Toggle & Bell */}
          <div className='hidden md:flex items-center gap-4'>
            <button onClick={toggleTheme} className='text-gray-700 dark:text-gray-200'>
              {theme === 'light' ? <Moon /> : <Sun />}
            </button>
            <Bell className='cursor-pointer text-gray-700 dark:text-gray-200'/>
          </div>
        </div>
      </div>

      {/* Mobile Search Dropdown */}
      {searchOpen && (
        <div className='absolute right-4 left-4 md:hidden mt-3 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-3'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300'/>
            <input
              type="text"
              placeholder="Search news..."
              className='w-full bg-gray-200 dark:bg-gray-700 dark:text-gray-100 py-2 pl-10 rounded-full focus:outline-none'
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div className='md:hidden mt-3 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden'>
          <ul className='flex flex-col font-medium text-center dark:text-gray-100'>
            <li className='py-3'>Top Stories</li>
            <li className='py-3'>World</li>
            <li className='py-3'>Politics</li>
            <li className='py-3'>Business</li>
            <li className='py-3'>Tech</li>
            <li className='py-3'>Culture</li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar
