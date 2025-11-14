import React from 'react'

const Footer = () => {
  return (
    <footer className='footer-main'>
      <div className='footer-links'>
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