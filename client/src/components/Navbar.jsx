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

  if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

  return (
    <nav className='w-full flex py-3 justify-between items-center z-50 px-14 sm:px-20 bg-dark sticky shadow-md top-0'>
      <HashLink to={`/#home`}>
        <img src={logo} alt='Crescendo for a Cause logo' className={`w-[auto] h-[75px] ${pageStyles}`} />
      </HashLink>
      <ul className={`list-none sm:flex hidden justify-end flex-1 items-center`}>
        {navLinks.map((nav, i) => (
          <li 
          key={nav.id}
          id={`nav-item-${nav.id}`} // Assigning a unique ID based on nav.id
          onMouseEnter={() => showDropdown(nav)}
          onMouseLeave={hideDropdown}
          className={`font-normal cursor-pointer text-[16px] ${i === navLinks.length - 1 ? 'mr-0' : 'mr-5'} min-w-[max-content] text-white px-3 py-1 ${!nav.dropdown && 'navlink'} ${nav.dropdown && 'mt-3'}`}>
            <div className={`${pageStyles} ${nav.dropdown && 'pb-3'}`}>
              <HashLink 
              to={`/#${nav.id}`}
              scroll={(el) => setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30)}>
                {nav.title}
              </HashLink>
              {nav.dropdown && <ExpandMoreIcon/>}
            </div>
            <div className={`${activeDropdownId === nav.id ? 'block' : 'hidden'} absolute bg-slate-300 dark-color rounded p-4  cursor-default dropdown shadow-2xl border-[1px] border-[solid] border-[black] mr-10`}>
              {chapters.map((chapter) => (
                    <Link className='chapterLink' key={chapter.id} to={`/${chapter.link}`}>{chapter.name}</Link>
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
