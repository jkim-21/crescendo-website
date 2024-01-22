import React, { useState } from 'react'
import { close, menu } from '../assets'
import { navLinks } from '../data/home-page-info'
import { HashLink } from 'react-router-hash-link';

import logo2 from '../assets/logo2.webp';

const Navbar = ({pageStyles}) => {

  const [toggle, setToggle] = useState(false)

  return (
    <nav className='w-full flex py-6 justify-between items-center navbar'>
    <HashLink to={`/#home`}>
      <img src={logo2} alt='Crescendo for Cause logo' className={`w-[124px] h-[auto] ${pageStyles}`}/>
    </HashLink>
    <ul className='list-none sm:flex hidden justify-end items-center flex-1'>
      {navLinks.map((nav, i) => (
            <li 
              key={nav.id}
              className={`font-poppins font-normal cursor-pointer text-[16px] ${pageStyles} ${i === navLinks.length - 1 ? 'mr-0' : 'mr-10'} text-white mr-10`}
            >
              <HashLink to={`/#${nav.id}`}>
                {nav.title}
              </HashLink>
            </li>
        ))}
      </ul>
      <div className='sm:hidden flex flex-1 justify-end items-center'>
        <img
          src={toggle ? close : menu}
          alt='menu'
          className='w-[28px] h-[28px] object-contain'
          onClick={() => setToggle((previous) => !previous)}
        />
        <div className={`${toggle ? 'flex' : 'hidden'} p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}>
          <ul className='list-none flex flex-col justify-end items-center flex-1'>
            {navLinks.map((nav, i) => (
              <li 
                key={nav.id}
                className={`font-poppins font-normal cursor-pointer text-[16px] ${i === navLinks.length - 1 ? 'mr-0' : 'mb-4'} ${pageStyles} text-white mr-10`}
              >
                <HashLink to={`/#${nav.id}`}>
                  {nav.title}
                </HashLink>
              </li>        
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
