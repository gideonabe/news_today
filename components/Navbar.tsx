"use client";

import React, { useState, useEffect } from "react";
import { Bell, CalendarRange, Moon, Sun, Search, Menu, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, setDebouncedQuery } from "@/app/store/searchSlice";
import { setSelectedCategory } from "@/app/store/categorySlice";
import { RootState } from "@/app/store";

const Navbar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  
  const { query, debouncedQuery } = useSelector((state: RootState) => state.search);
  const { selectedCategory } = useSelector((state: RootState) => state.category);
  
  // Local state for navbar search input to make it independent
  const [navbarSearchQuery, setNavbarSearchQuery] = useState("");
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [theme, setTheme] = useState("light");

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
    // Also set navbar search query
    setNavbarSearchQuery(searchFromQuery);
  }, [searchParams, dispatch]);

  useEffect(() => {
    // Debounce search query
    const handler = setTimeout(() => {
      dispatch(setDebouncedQuery(query.trim()));
    }, 600);

    return () => clearTimeout(handler);
  }, [query, dispatch]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.classList.toggle("dark", newTheme === "dark");
  };

  // Handle search input change for navbar
  const handleNavbarSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNavbarSearchQuery(e.target.value);
  };

  // Handle search key down (Enter) for navbar
  const handleNavbarSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
      // Clear the navbar search input
      setNavbarSearchQuery("");
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
    // Also clear navbar search
    setNavbarSearchQuery("");

    router.replace(`/?${params.toString()}`);
  };

  return (
    // Updated with nav-border and container-main classes
    <nav className="relative pb-3 pt-3 nav-border">
      {/* Updated with nav-container and container-main classes */}
      <div className="nav-container container-main">

        {/* Left: section */}
        <div className="flex gap-10 item-center">
          <div className="flex items-center gap-1">
            <CalendarRange color="blue" />
            {/* Updated with text-heading class */}
            <h1 className="text-heading">NewsToday</h1>
          </div>
          {/* Desktop menu links */}
          <ul className="hidden lg:flex items-center gap-6 nav-item-inactive">
            <li 
              className={`cursor-pointer ${selectedCategory === "All" ? "nav-item-active" : "nav-item-inactive"}`}
              onClick={() => handleCategoryClick("All")}
            >
              Top Stories
            </li>
            <li 
              className={`cursor-pointer ${selectedCategory === "World" ? "nav-item-active" : "nav-item-inactive"}`}
              onClick={() => handleCategoryClick("World")}
            >
              World
            </li>
            <li 
              className={`cursor-pointer ${selectedCategory === "Politics" ? "nav-item-active" : "nav-item-inactive"}`}
              onClick={() => handleCategoryClick("Politics")}
            >
              Politics
            </li>
            <li 
              className={`cursor-pointer ${selectedCategory === "Business" ? "nav-item-active" : "nav-item-inactive"}`}
              onClick={() => handleCategoryClick("Business")}
            >
              Business
            </li>
            <li 
              className={`cursor-pointer ${selectedCategory === "Tech" ? "nav-item-active" : "nav-item-inactive"}`}
              onClick={() => handleCategoryClick("Tech")}
            >
              Tech
            </li>
            <li 
              className={`cursor-pointer ${selectedCategory === "Culture" ? "nav-item-active" : "nav-item-inactive"}`}
              onClick={() => handleCategoryClick("Culture")}
            >
              Culture
            </li>
          </ul>
        </div>

        {/* Centered Search for tablet only */}
        <div className="hidden md:flex lg:hidden flex-1 justify-center px-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute-center text-gray-600 dark:text-gray-300" />
            <input
              type="text"
              value={navbarSearchQuery}
              onChange={handleNavbarSearchChange}
              onKeyDown={handleNavbarSearchKeyDown}
              placeholder="Search news..."
              className="tablet-nav-search"
            />
          </div>
        </div>

        {/* Right section: theme, bell, hamburger, desktop search */}
        <div className="flex items-center gap-3 md:gap-4">
          
          {/* Desktop search for lg+ */}
          <div className="hidden lg:flex relative mr-4">
            <Search className="absolute-center text-gray-300" />
            <input
              type="text"
              value={navbarSearchQuery}
              onChange={handleNavbarSearchChange}
              onKeyDown={handleNavbarSearchKeyDown}
              placeholder="Search news..."
              className="desktop-nav-search"
            />
          </div>

          {/* Theme toggle */}
          {/* Updated with btn-icon class */}
          <button onClick={toggleTheme} className="btn-icon">
            {theme === "light" ? <Moon /> : <Sun />}
          </button>

          {/* Bell icon */}
          {/* Updated with btn-icon class */}
          <Bell className="cursor-pointer btn-icon" />

          {/* Hamburger menu for mobile & tablet */}
          {/* Updated with btn-nav class */}
          <button
            className="md:flex lg:hidden btn-nav"
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
            <Search className="absolute-center text-gray-600 dark:text-gray-300" />
            <input
              type="text"
              value={navbarSearchQuery}
              onChange={handleNavbarSearchChange}
              onKeyDown={handleNavbarSearchKeyDown}
              placeholder="Search news..."
              // Updated with input-mobile-search class
              className="input-mobile-search"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Mobile & tablet Menu */}
      {menuOpen && (
        <div className="md:flex md:flex-col lg:hidden absolute top-full left-0 w-full mt-0 bg-gray-200 dark:bg-gray-800 rounded-b-lg overflow-hidden z-50">
          <ul className="flex flex-col font-medium text-center divider divide-y divide-gray-300 dark:text-gray-100">
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

export default Navbar;