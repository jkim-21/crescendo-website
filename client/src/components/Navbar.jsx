import React, { useState } from 'react';
import { close, menu } from '../assets/index.js';
import { navLinks } from '../data/home-page.js';
import { HashLink } from 'react-router-hash-link';
import styles from '../style.js';

import logo2 from '../assets/logo2.webp';

const Navbar = ({pageStyles}) => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className='w-full flex py-6 justify-between items-center navbar fixed top-0 left-0 z-50 px-4 sm:px-8 shadow-md'>
      <HashLink to={`/#home`}>
        <img src={logo2} alt='Crescendo for a Cause logo' className={`w-[124px] h-[auto] ${pageStyles}`} />
      </HashLink>
      <ul className={`list-none sm:flex hidden justify-end items-center flex-1`}>
        {navLinks.map((nav, i) => (
          <li 
            key={nav.id}
            id={`nav-item-${nav.id}`} // Assigning a unique ID based on nav.id
            className={`font-poppins font-normal cursor-pointer text-[16px] ${pageStyles} ${i === navLinks.length - 1 ? 'mr-0' : 'mr-10'} text-white`}
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
        {/* Mobile menu and content unchanged */}
      </div>
    </nav>
  );
};

export default Navbar;
