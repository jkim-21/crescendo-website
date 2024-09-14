import React, { useState } from 'react';
import { navLinks, chapters, tools } from '../data/home-page.js';
import { HashLink } from 'react-router-hash-link';
import { Link, useNavigate } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { styles } from '../style.js';
import { close, menu } from '../assets';
import {logos} from '../data/global'

const Navbar = ({ pageStyles }) => {
  const [toggle, setToggle] = useState(false);
  const [activeDropdownId, setActiveDropdownId] = useState(null);

  const navigate = useNavigate();

  const showDropdown = (nav) => {
    if (nav.dropdown) {
      setActiveDropdownId(nav.id);
    }
  };

  const hideDropdown = () => {
    setActiveDropdownId(null);
  };

  const getDropdownItems = (navId) => {
    if (navId === 'chapters') {
      return chapters;
    } 
    return [];
  };

  return (
    <nav className='dark-bg sticky top-0 z-50 shadow-md py-[0.75rem]'>
      <div className={`${styles.boxWidth} flex justify-between m-auto`}>
        <HashLink to={`/#home`}>
          <img 
          src={logos.navbarLogo} 
          alt='Crescendo for a Cause logo' 
          className={`${pageStyles} w-[auto] h-[4.75rem]`} />
        </HashLink>
        <ul className='hidden items-center list-none relative
                      navbar-custom:flex'>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              id={`nav-item-${nav.id}`}
              onMouseEnter={() => showDropdown(nav)}
              onMouseLeave={hideDropdown}
              className={`${nav.dropdown ? 'mt-[0.9rem]' : nav.dashboard ? '' : 'nav-link'} mx-[0.7rem] font-normal cursor-pointer text-[1rem] min-w-[max-content] text-white px-3 py-1`}>
                <div className={`${pageStyles} ${nav.dropdown ? 'pb-3' : null}`}>
                  {nav.id === 'tools' ? (
                    <Link
                      to={`/${nav.id}`}
                      className='dashboard border rounded-[2rem] px-[1rem] py-[0.5rem] lighter-gray-border'
                    >
                      {nav.title}
                    </Link>
                  ) : (
                  <HashLink
                    to={`/#${nav.id}`}
                    scroll={(el) => 
                      setTimeout(() => 
                        el.scrollIntoView({ behavior: 'smooth', block: 'start'}), 60)}
                    className={`${nav.dropdown ? 'pointer-events-none lg:pointer-events-auto' : null}`}>
                    {nav.title}
                  </HashLink>
                  )}
                  {nav.dropdown ? <ExpandMoreIcon/> : null}
                </div>
                {nav.dropdown ? 
                (<div 
                  className={
                  `${activeDropdownId === nav.id ? 'block' : 'hidden'} ${nav.id === 'chapters' ? 'max-w-[12.5rem]': null} dropdown dropdown-animation dropdown-background absolute dark-text rounded cursor-default py-[1rem] px-[0.5rem]
                  lg:px-[1rem]`
                }>
                  {getDropdownItems(nav.id).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => nav.id === 'chapters' ? navigate(item.link) : 'null'}
                      className={`dropdown-link text-black`}>
                      {item.name}
                    </button>
                  ))}
                </div>
                ) : null}
            </li>
          ))}
        </ul>
        <div className='flex flex-1 justify-end items-center 
                        navbar-custom:hidden'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className={`${pageStyles} w-[2rem] [aspect-ratio:1/1] object-contain z-40`}
            onClick={() => setToggle((previous) => !previous)}
          />
          {toggle ?
            <div
              onClick={() => setToggle((previous) => !previous)}
              className='fixed inset-0 bg-black bg-opacity-50 z-1'>
            </div> : null}
          <div className={`${toggle ? 'flex' : 'hidden'} nav-sidebar absolute top-20 right-0 dropdown-background border-[black] border-[1px] shadow-2xl rounded-xl py-[1.5rem] px-[1.5rem] mx-[1rem]`}>
            <ul className='list-none flex flex-col w-full'>
              {navLinks.map((nav, i) => (
                <li
                  key={nav.id}
                  className={`${i === navLinks.length - 1 ? 'mb-0' : 'mb-[0.25rem]'} nav-sidebar-link dark-text`}>
                    {nav.id === 'tools' ? (
                    <Link
                      to={`/${nav.id}`}
                    >
                      {nav.title}
                    </Link>
                  ) : (
                    <HashLink
                      to={`/#${nav.id}`}
                      onClick={() => setToggle((previous) => !previous)}>
                          {nav.title}
                    </HashLink>
                  )}
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