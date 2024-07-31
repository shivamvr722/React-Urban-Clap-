import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import "./navbar.css"

// import {
//   Navbar,
//   MobileNav,
//   Typography,
//   Button,
//   IconButton,
//   Card,
// } from "@material-tailwind/react";


const NavigationBar = () => {
  const [nav, setNav] = useState(false);
  const currentUser = useSelector((state) => state.userProfileActions.user)
  const navigate = useNavigate()

  const handleNav = () => {
    setNav(!nav);
  };

  const accessToken = localStorage.getItem("access")

  const navItems = [
    { id: 1, text: 'Home', show:"/" },
  ];
  
  // updating navingation for admin, user and service provider
  if(currentUser.user_type.toLowerCase() === "superadmin"){
    navItems.push({ id:6, text: "Users", show:"/allusers" })
    navItems.push({ id:11, text: "Providers", show:"/providers" })
    navItems.push({ id:7, text: "Services", show:"/servicespage" })
    navItems.push({ id:9, text: "Location", show:"/locations" })
    navItems.push({ id:10, text: "Bookings", show:"/booking" })
    navItems.push({ id:8, text: "Reviews/Rating", show:"/reviewsrating" })
  } else if(currentUser.user_type.toLowerCase() === "serviceprovider") {
    navItems.push({ id:7, text: "Services", show:"/addservice" })
    navItems.push({ id:10, text: "Bookings", show:"/booking" })
    navItems.push({ id:8, text: "Reviews/Rating", show:"/reviewsrating" })
  } else {
    navItems.push({ id:8, text: "Reviews/Rating", show:"/reviewsrating" })
  }
  // for the login and logout logic
  if(!accessToken){
    navItems.push({ id: 3, text: 'SignUp', show:"/SignUp"})
    navItems.push({ id: 4, text: 'SignIn', show:"/"})
  } else {
    navItems.push({ id: 2, text: 'Profile', show:"/profile"})
    navItems.push({ id: 5, text: 'Logout', show:"/logout"})
  }




  return (
    <nav className="... sticky top-0">
    <div className='bg-black flex justify-between items-center h-24 max-w-[1940px] mx-auto px-4 text-white'>
      {/* Logo */}
      <h1 className='w-full text-3xl font-bold text-[#ffffff]'> <span className="text-6xl" > UC </span> &nbsp;&nbsp;<span className='align-center'> Urban Clap</span></h1>

      {/* Desktop Navigation */}
      <ul className='hidden md:flex'>
        {navItems.map(item => (
          <li className='p-4 hover:bg-[#ffffff] rounded-xl m-2 cursor-pointer duration-300 hover:text-black' key={item.id} onClick={() => navigate(item.show)}>
          {item.text}
          </li>
          
        ))}
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
        }
      >
        {/* Mobile Logo */}
        <h1 className='w-full text-3xl font-bold text-[#ffffff] m-4'>REACT.</h1>

        {/* Mobile Navigation Items */}
        {navItems.map(item => (
          <li
            key={item.id}
            className='p-4 border-b rounded-xl hover:bg-[#ffffff] duration-300 hover:text-black cursor-pointer border-gray-600'
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
    </nav>
  )
}
export default NavigationBar
