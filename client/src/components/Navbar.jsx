import React, { useState } from 'react';
import { close, menu, logo } from '../assets';
import { navLinks } from '../data/home-page.js';
import { HashLink } from 'react-router-hash-link';

const Navbar = ({pageStyles}) => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className='w-full flex py-6 justify-between items-center z-50 px-4 sm:px-8'>
      <HashLink to={`/#home`}>
        <img src={logo} alt='Crescendo for a Cause logo' className={`w-[124px] h-[auto] ${pageStyles}`} />
      </HashLink>
      <ul className={`list-none sm:flex hidden justify-end items-center flex-1`}>
        {navLinks.map((nav, i) => (
          <li 
            key={nav.id}
            id={`nav-item-${nav.id}`} // Assigning a unique ID based on nav.id
            className={`font-normal cursor-pointer text-[16px] ${pageStyles} ${i === navLinks.length - 1 ? 'mr-0' : 'mr-10'} text-white`}
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
                className={`font-normal cursor-pointer text-[16px] ${i === navLinks.length - 1 ? 'mr-0' : 'mb-4'} ${pageStyles} text-white mr-10`}
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
  );
};

export default Navbar;
