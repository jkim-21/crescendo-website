import React, { useState } from 'react';
import { close, menu, logo } from '../assets';
import { navLinks, chapters } from '../data/home-page.js';
import { HashLink } from 'react-router-hash-link';
import { Link } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Navbar = ({pageStyles}) => {
  const [toggle, setToggle] = useState(false);
  const [activeDropdownId, setActiveDropdownId] = useState(null);

  const showDropdown = (nav) => {
    if (nav.dropdown) {
      setActiveDropdownId(nav.id);
    }
  }

  const hideDropdown = (nav) => {
    setActiveDropdownId(null);
  }

  return (
    <nav className='w-full flex py-3 justify-between items-center z-50 px-14 sm:px-20 bg-dark sticky shadow-md top-0'>
      <HashLink to={`/#home`}>
        <img src={logo} alt='Crescendo for a Cause logo' className={`w-[auto] h-[75px] ${pageStyles}`} />
      </HashLink>
      <ul className={`list-none sm:flex hidden justify-end flex-1 items-center mt-3`}>
        {navLinks.map((nav, i) => (
          <li 
          key={nav.id}
          id={`nav-item-${nav.id}`} // Assigning a unique ID based on nav.id
          onMouseEnter={() => showDropdown(nav)}
          onMouseLeave={hideDropdown}
          className={`font-normal cursor-pointer text-[16px] ${i === navLinks.length - 1 ? 'mr-0' : 'mr-10'} text-white`}>
            <div className={`pb-3 ${pageStyles}`}>
              <HashLink to={`/#${nav.id}`}>
                {nav.title}
              </HashLink>
              {nav.dropdown && <ExpandMoreIcon/>}
            </div>
            <div className={`${activeDropdownId === nav.id ? 'block' : 'hidden'} absolute bg-slate-300 dark-color rounded space-y-2 p-4 flex flex-wrap cursor-default dropdown shadow-2xl border-[1px] border-[solid] border-[black] mr-2`}>
              {chapters.map((chapter) => (
                    <Link key={chapter.id} to={`/${chapter.link}`}>{chapter.name}</Link>
                    ))}
            </div>
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
        <div className={`${toggle ? 'flex' : 'hidden'} p-6 bg-dark absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}>
          <ul className='list-none flex flex-col justify-end items-center flex-1'>
            {navLinks.map((nav, i) => (
              <li 
                key={nav.id}
                className={`font-normal cursor-pointer text-[16px] text-white mr-10 ${i === navLinks.length - 1 ? 'mr-0' : 'mb-4'} ${pageStyles}`}
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
