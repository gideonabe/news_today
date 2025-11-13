"use client";

import React, { useState, useEffect } from "react";
import { Bell, CalendarRange, Moon, Sun, Search, Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.body.classList.toggle("dark", storedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <nav className="relative pb-3 pt-3 border-b border-gray-400 dark:border-gray-600">
      <div className="flex justify-between items-center max-w-[95%] mx-auto">

        {/* Left: Logo */}
        <div className="flex items-center gap-1">
          <CalendarRange color="blue" />
          <h1 className="font-semibold text-xl md:text-2xl dark:text-gray-100">NewsToday</h1>
        </div>

        {/* Centered Search for tablet only */}
        <div className="hidden md:flex lg:hidden flex-1 justify-center px-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300" />
            <input
              type="text"
              placeholder="Search news..."
              className="w-full bg-gray-200 dark:bg-gray-700 dark:text-gray-100 py-2 pl-10 rounded-full focus:outline-none"
            />
          </div>
        </div>

        {/* Desktop menu links */}
        <ul className="hidden lg:flex items-center gap-6 text-gray-500 font-medium dark:text-gray-200">
          <li>Top Stories</li>
          <li>World</li>
          <li>Politics</li>
          <li>Business</li>
          <li>Tech</li>
          <li>Culture</li>
        </ul>

        {/* Right section: theme, bell, hamburger, desktop search */}
        <div className="flex items-center gap-3 md:gap-4">
          
          {/* Desktop search for lg+ */}
          <div className="hidden lg:flex relative mr-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300" />
            <input
              type="text"
              placeholder="Search news..."
              className="w-full bg-gray-200 dark:bg-gray-700 dark:text-gray-100 py-2 pl-10 rounded-full focus:outline-none"
            />
          </div>

          {/* Theme toggle */}
          <button onClick={toggleTheme} className="text-gray-700 dark:text-gray-200">
            {theme === "light" ? <Moon /> : <Sun />}
          </button>

          {/* Bell icon */}
          <Bell className="cursor-pointer text-gray-700 dark:text-gray-200" />

          {/* Hamburger menu for mobile & tablet */}
          <button
            className="md:flex lg:hidden p-2 text-gray-700 dark:text-gray-200"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Search Dropdown */}
      {searchOpen && (
        <div className="absolute right-4 left-4 md:hidden mt-3 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300" />
            <input
              type="text"
              placeholder="Search news..."
              className="w-full bg-gray-200 dark:bg-gray-700 dark:text-gray-100 py-2 pl-10 rounded-full focus:outline-none"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Mobile & tablet Menu */}
      {menuOpen && (
        <div className="md:flex md:flex-col lg:hidden absolute top-full left-0 w-full mt-0 bg-gray-200 dark:bg-gray-800 rounded-b-lg overflow-hidden z-50">
          <ul className="flex flex-col font-medium text-center divider divide-y divide-gray-300 dark:text-gray-100">
            <li className="py-3">Top Stories</li>
            <li className="py-3">World</li>
            <li className="py-3">Politics</li>
            <li className="py-3">Business</li>
            <li className="py-3">Tech</li>
            <li className="py-3">Culture</li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
