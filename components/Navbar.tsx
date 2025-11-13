"use client";

import React, { useState, useEffect } from "react";
import { Bell, CalendarRange, Moon, Sun, Search, Menu, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.body.classList.toggle("dark", storedTheme === "dark");
    
    // Set initial category from URL
    const categoryFromQuery = searchParams?.get("category") || "All";
    const formatted = categoryFromQuery.charAt(0).toUpperCase() + categoryFromQuery.slice(1);
    setSelectedCategory(formatted);
  }, [searchParams]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.classList.toggle("dark", newTheme === "dark");
  };

  // Handle category click
  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    setMenuOpen(false); // Close mobile menu when category is selected

    const params = new URLSearchParams(searchParams.toString());
    if (cat === "All") {
      params.delete("category");
    } else {
      params.set("category", cat.toLowerCase());
    }

    router.replace(`/?${params.toString()}`);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const query = e.currentTarget.value.trim();
      const params = new URLSearchParams(searchParams.toString());
  
      if (query) {
        params.set("search", query);
      } else {
        params.delete("search");
      }
  
      router.replace(`/?${params.toString()}`);
      e.currentTarget.blur();
      e.currentTarget.value = ""
    }
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
            {/* <input
              type="text"
              placeholder="Search news..."
              className="w-full bg-gray-200 dark:bg-gray-700 dark:text-gray-100 py-2 pl-10 rounded-full focus:outline-none"
            /> */}
            <input
              type="text"
              placeholder="Search news..."
              className="w-full bg-gray-200 dark:bg-gray-700 dark:text-gray-100 py-2 pl-10 rounded-full focus:outline-none"
              onKeyDown={handleSearchKeyDown}
              defaultValue={searchParams?.get("search") || ""}
            />
          </div>
        </div>

        {/* Desktop menu links */}
        <ul className="hidden lg:flex items-center gap-6 text-gray-500 font-medium dark:text-gray-200">
          <li 
            className={`cursor-pointer ${selectedCategory === "All" ? "text-blue font-semibold" : ""}`}
            onClick={() => handleCategoryClick("All")}
          >
            Top Stories
          </li>
          <li 
            className={`cursor-pointer ${selectedCategory === "World" ? "text-blue font-semibold" : ""}`}
            onClick={() => handleCategoryClick("World")}
          >
            World
          </li>
          <li 
            className={`cursor-pointer ${selectedCategory === "Politics" ? "text-blue font-semibold" : ""}`}
            onClick={() => handleCategoryClick("Politics")}
          >
            Politics
          </li>
          <li 
            className={`cursor-pointer ${selectedCategory === "Business" ? "text-blue font-semibold" : ""}`}
            onClick={() => handleCategoryClick("Business")}
          >
            Business
          </li>
          <li 
            className={`cursor-pointer ${selectedCategory === "Tech" ? "text-blue font-semibold" : ""}`}
            onClick={() => handleCategoryClick("Tech")}
          >
            Tech
          </li>
          <li 
            className={`cursor-pointer ${selectedCategory === "Culture" ? "text-blue font-semibold" : ""}`}
            onClick={() => handleCategoryClick("Culture")}
          >
            Culture
          </li>
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
              onKeyDown={handleSearchKeyDown}
              defaultValue={searchParams?.get("search") || ""}
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
      {/* {searchOpen && (
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
      )} */}

      {/* Mobile & tablet Menu */}
      {menuOpen && (
        <div className="md:flex md:flex-col lg:hidden absolute top-full left-0 w-full mt-0 bg-gray-200 dark:bg-gray-800 rounded-b-lg overflow-hidden z-50">
          <ul className="flex flex-col font-medium text-center divider divide-y divide-gray-300 dark:text-gray-100">
            <li 
              className={`py-3 cursor-pointer ${selectedCategory === "All" ? "text-blue font-semibold" : ""}`}
              onClick={() => handleCategoryClick("All")}
            >
              Top Stories
            </li>
            <li 
              className={`py-3 cursor-pointer ${selectedCategory === "World" ? "text-blue font-semibold" : ""}`}
              onClick={() => handleCategoryClick("World")}
            >
              World
            </li>
            <li 
              className={`py-3 cursor-pointer ${selectedCategory === "Politics" ? "text-blue font-semibold" : ""}`}
              onClick={() => handleCategoryClick("Politics")}
            >
              Politics
            </li>
            <li 
              className={`py-3 cursor-pointer ${selectedCategory === "Business" ? "text-blue font-semibold" : ""}`}
              onClick={() => handleCategoryClick("Business")}
            >
              Business
            </li>
            <li 
              className={`py-3 cursor-pointer ${selectedCategory === "Tech" ? "text-blue font-semibold" : ""}`}
              onClick={() => handleCategoryClick("Tech")}
            >
              Tech
            </li>
            <li 
              className={`py-3 cursor-pointer ${selectedCategory === "Culture" ? "text-blue font-semibold" : ""}`}
              onClick={() => handleCategoryClick("Culture")}
            >
              Culture
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;