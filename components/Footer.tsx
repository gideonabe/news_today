import React from 'react'

const Footer = () => {
  return (
    <footer className='max-w-full bg-gray-100 dark:bg-gray-300/10 flex flex-col justify-center items-center gap-4 pt-4 md:pt-10 pb-6 md:pb-12 text-foreground text-sm md:text-base'>
      <div className='flex flex-col md:flex-row gap-2 md:gap-8 items-center'>
        <a href="#">About Us</a>
        <a href="#">Contact</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
      </div>

      <p>&copy; {new Date().getFullYear()} News Today. All rights reserved</p>
    </footer>
  )
}

export default Footer