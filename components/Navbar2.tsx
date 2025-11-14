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
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, setDebouncedQuery } from "@/app/store/searchSlice";
import { setSelectedCategory } from "@/app/store/categorySlice";
import { RootState } from "@/app/store";

const Navbar2 = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  
  const { query, debouncedQuery } = useSelector((state: RootState) => state.search);
  const { selectedCategory } = useSelector((state: RootState) => state.category);
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  // Load theme from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.body.classList.toggle("dark", storedTheme === "dark");
    
    // Set initial category from URL
    const categoryFromQuery = searchParams?.get("category") || "All";
    const formatted = categoryFromQuery.charAt(0).toUpperCase() + categoryFromQuery.slice(1);
    dispatch(setSelectedCategory(formatted));
    
    // Set initial search from URL
    const searchFromQuery = searchParams?.get("search") || "";
    dispatch(setSearchQuery(searchFromQuery));
    dispatch(setDebouncedQuery(searchFromQuery));
  }, [searchParams, dispatch]);

  useEffect(() => {
    // Debounce search query
    const handler = setTimeout(() => {
      dispatch(setDebouncedQuery(query.trim()));
    }, 600);

    return () => clearTimeout(handler);
  }, [query, dispatch]);

  // Toggle light/dark theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.classList.toggle("dark", newTheme === "dark");
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  // Handle search key down (Enter)
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const queryValue = e.currentTarget.value.trim();
      const params = new URLSearchParams(searchParams.toString());

      if (queryValue) {
        params.set("search", queryValue);
        params.delete("category"); // Clear category when searching
      } else {
        params.delete("search");
      }

      router.replace(`/?${params.toString()}`);
      e.currentTarget.blur();
    }
  };

  // Handle category click
  const handleCategoryClick = (cat: string) => {
    dispatch(setSelectedCategory(cat));
    setMenuOpen(false); // Close mobile menu when category is selected

    const params = new URLSearchParams(searchParams.toString());
    if (cat === "All") {
      params.delete("category");
    } else {
      params.set("category", cat.toLowerCase());
    }
    // Clear search when selecting category
    params.delete("search");
    dispatch(setSearchQuery(""));
    dispatch(setDebouncedQuery(""));

    router.replace(`/?${params.toString()}`);
  };

  return (
    <nav className="pb-3 pt-3 nav-border">
      <div className="nav-container container-main">

        {/* Left: Logo */}
        <Link href="/">
          <div className="flex items-center gap-1">
            <CalendarRange color="blue" />
            <h1 className="text-heading">
              NewsToday
            </h1>
          </div>
        </Link>

        {/* Center: Search input for tablet/iPad */}
        <div className="hidden sm:flex md:hidden flex-1 justify-center px-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute-center text-gray-600 dark:text-gray-300"/>
            <input
              type="text"
              value={query}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search..."
              className="tablet-nav-search"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Desktop search (kept for md+) */}
          <div className="hidden md:block relative">
            <Search className="absolute-center text-gray-600 dark:text-gray-300"/>
            <input
              type="text"
              value={query}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search..."
              className="desktop-nav-search"
            />
          </div>

          {/* Bell */}
          <Bell className="cursor-pointer btn-icon"/>

          {/* Theme toggle */}
          <button onClick={toggleTheme} className="btn-icon">
            {theme === "light" ? <Moon /> : <Sun />}
          </button>

          {/* Profile avatar */}
          <a href="#" className="cursor-pointer hidden sm:flex md:flex">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdmvH7dnlgLKKhHQGzku44nvGWNSwsA1xuL3_1O7bwiJfZ1uh8fIa5kLnFbnAWP5emjo4&usqp=CAU"
              alt="Profile Avatar"
              className="img-avatar"
            />
          </a>

          {/* Hamburger (mobile + tablet) */}
          <button
            className="btn-nav sm:block md:hidden"
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
            <li 
              className={`py-3 cursor-pointer ${selectedCategory === "All" ? "nav-item-active" : ""}`}
              onClick={() => handleCategoryClick("All")}
            >
              Top Stories
            </li>
            <li 
              className={`py-3 cursor-pointer ${selectedCategory === "World" ? "nav-item-active" : ""}`}
              onClick={() => handleCategoryClick("World")}
            >
              World
            </li>
            <li 
              className={`py-3 cursor-pointer ${selectedCategory === "Politics" ? "nav-item-active" : ""}`}
              onClick={() => handleCategoryClick("Politics")}
            >
              Politics
            </li>
            <li 
              className={`py-3 cursor-pointer ${selectedCategory === "Business" ? "nav-item-active" : ""}`}
              onClick={() => handleCategoryClick("Business")}
            >
              Business
            </li>
            <li 
              className={`py-3 cursor-pointer ${selectedCategory === "Tech" ? "nav-item-active" : ""}`}
              onClick={() => handleCategoryClick("Tech")}
            >
              Tech
            </li>
            <li 
              className={`py-3 cursor-pointer ${selectedCategory === "Culture" ? "nav-item-active" : ""}`}
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

export default Navbar2;