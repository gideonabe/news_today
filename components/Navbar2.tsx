"use client";

import React, { useState, useEffect } from "react";
import {
  Bell,
  CalendarRange,
  Moon,
  Sun,
  Search,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  // Load theme from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.body.classList.toggle("dark", storedTheme === "dark");
  }, []);

  // Toggle light/dark theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <nav className="pb-3 pt-3 border-b border-gray-400 dark:border-gray-600 relative">
      <div className="flex justify-between items-center max-w-[95%] mx-auto">

        {/* Left: Logo */}
        <Link href="/">
          <div className="flex items-center gap-1">
            <CalendarRange color="blue" />
            <h1 className="font-semibold text-xl md:text-2xl dark:text-gray-100">
              NewsToday
            </h1>
          </div>
        </Link>

        {/* Center: Search input for tablet/iPad */}
        <div className="hidden sm:flex md:hidden flex-1 justify-center px-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300"/>
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-200 dark:bg-gray-700 dark:text-gray-100 py-2 pl-10 rounded-full focus:outline-none"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Desktop search (kept for md+) */}
          <div className="hidden md:block relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300"/>
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-200 dark:bg-gray-700 dark:text-gray-100 py-2 pl-10 rounded-full focus:outline-none"
            />
          </div>

          {/* Bell */}
          <Bell className="cursor-pointer text-gray-700 dark:text-gray-200"/>

          {/* Theme toggle */}
          <button onClick={toggleTheme} className="text-gray-700 dark:text-gray-200">
            {theme === "light" ? <Moon /> : <Sun />}
          </button>

          {/* Profile avatar */}
          <a href="#" className="cursor-pointer hidden sm:flex md:flex">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdmvH7dnlgLKKhHQGzku44nvGWNSwsA1xuL3_1O7bwiJfZ1uh8fIa5kLnFbnAWP5emjo4&usqp=CAU"
              alt="Profile Avatar"
              className="rounded-full w-10 h-10 object-cover"
            />
          </a>

          {/* Hamburger (mobile + tablet) */}
          <button
            className="p-2 text-gray-700 dark:text-gray-200 sm:block md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Nav Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full mt-0 bg-gray-100 dark:bg-gray-800 rounded-b-lg shadow-lg z-50 md:hidden">
          <ul className="flex flex-col font-medium text-center divide-y divide-gray-300 dark:divide-gray-700 dark:text-gray-100">
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
