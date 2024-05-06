import React, { useState, useEffect, useRef } from 'react';
import { close, menu, logo } from '../assets';
import { navLinks, chapters } from '../data/home-page.js';
import { HashLink } from 'react-router-hash-link';
import { Link } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styles } from '../style.js'

const Navbar = ({pageStyles}) => {
  const [toggle, setToggle] = useState(false);
  const [activeDropdownId, setActiveDropdownId] = useState(null);

  const showDropdown = (nav) => {
    if (nav.dropdown) {
      setActiveDropdownId(nav.id);
    }
  }

  const hideDropdown = () => {
    setActiveDropdownId(null);
  }

  if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

  return (
    <nav className='sticky top-0 z-50 flex justify-between items-center bg-dark shadow-md py-[0.75rem]'>
      <div className={`${styles.boxWidth} flex justify-between m-auto`}>
        <HashLink to={`/#home`}>
          <img src={logo} alt='Crescendo for a Cause logo' className={`${pageStyles} w-[auto] h-[4.75rem]`} />
        </HashLink>
        <ul className={`hidden justify-end items-center list-none relative
                      md:flex`}>
          {navLinks.map((nav, i) => (
            <li 
            key={nav.id}
            id={`nav-item-${nav.id}`} // Assigning a unique ID based on nav.id
            onMouseEnter={() => showDropdown(nav)}
            onMouseLeave={hideDropdown}
            className={`${i === navLinks.length - 1 ? 'mr-0' : 'mr-1 lg:mr-5'} ${!nav.dropdown && 'navlink'} ${nav.dropdown && 'mt-3'} font-normal cursor-pointer text-[1rem] min-w-[max-content] text-white px-3 py-1`}>
              <div className={`${pageStyles} ${nav.dropdown && 'pb-3'}`}>
                <HashLink 
                to={`/#${nav.id}`}
                scroll={(el) => setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30)}
                className={`${nav.dropdown && 'pointer-events-none lg:pointer-events-auto'}`}>
                  {nav.title}
                </HashLink>
                {nav.dropdown && <ExpandMoreIcon/>}
              </div>
              <div className={`${activeDropdownId === nav.id ? 'block' : 'hidden'} dropdown-animation dropdown-background dropdown absolute dark-color rounded py-[1rem] px-[0.5rem] cursor-default  shadow-2xl  
                              lg:px-[1rem]`}>
                {chapters.map((chapter) => (
                      <Link 
                      key={chapter.id} 
                      to={`/${chapter.link}`}
                      className='dropdown-link'>
                        {chapter.name}
                      </Link>
                      ))}
              </div>
            </li>
          ))}
        </ul>
        <div className='flex flex-1 justify-end items-center
                        md:hidden'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className={`${pageStyles} w-[2rem] [aspect-ratio:1/1] object-contain z-50`}
            onClick={() => setToggle((previous) => !previous)}
          />
          {toggle && 
            <div
            onClick={() => setToggle((previous) => !previous)}
            className='fixed inset-0 bg-black bg-opacity-50 z-1'>
            </div>}
          <div className={`${toggle ? 'flex' : 'hidden'} sidebar absolute top-20 right-0 min-w-[8.75rem] dropdown-background border-[black] border-[1px] shadow-2xl rounded-xl py-[1.5rem] px-[1rem] mx-[1rem]`}>
            <ul className='list-none flex flex-col w-full'>
              {navLinks.map((nav, i) => (
                <li 
                  key={nav.id}
                  className={`${i === navLinks.length - 1 ? 'mb-0' : 'mb-[0.25rem]'} sidebar-link dark-color`}
                >
                  <HashLink 
                  to={`/#${nav.id}`}
                  onClick={() => setToggle((previous) => !previous)}>
                    {nav.title}
                  </HashLink>
                </li>        
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
