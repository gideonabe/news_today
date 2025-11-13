import React from 'react'

const Footer = () => {
  return (
    <footer className='max-w-full bg-gray-100 flex flex-col justify-center items-center gap-4 pt-10 pb-12 text-gray-400 text-lg'>
      <div className='flex gap-8 items-center'>
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