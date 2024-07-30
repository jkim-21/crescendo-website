import React, { useState, useEffect } from 'react';
import { close, menu, logo } from '../assets';
import { navLinks, chapters, tools } from '../data/home-page.js';
import { HashLink } from 'react-router-hash-link';
import { Link, useNavigate } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styles } from '../style.js';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = ({ pageStyles }) => {
  const [toggle, setToggle] = useState(false);
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  const [error, setError] = useState(null);
  const { user, setUser, logout } = useAuth();
  const navigate = useNavigate();

  const filteredNavLinks = user ? navLinks : navLinks.filter(nav => nav.id !== 'tools');


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
    } else if (navId === 'tools') {
      return tools;
    }
    return [];
  };

  const handleToolClick = (link) => {
    if (!user) {
      handleGoogleSignIn();
    } else {
      navigate(link);
    }
  };

  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;
      if (email.endsWith('@crescendoforacause.com')) {
        setUser(result.user);
        navigate('/'); // Redirect to home after successful login
      } else {
        await auth.signOut();
        setError('You must use an @crescendoforacause.com email to access this page.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await logout();
      setUser(null);
      navigate('/'); // Redirect to home after logout
    } catch (error) {
      console.error("Logout error: ", error);
    }
  };


  useEffect(() => {
    if (error) {
      alert(error); // Simple error handling, you can improve this
    }
  }, [error]);

  return (
    <nav className='dark-bg sticky top-0 z-50 shadow-md py-[0.75rem]'>
      <div className={`${styles.boxWidth} flex justify-between m-auto`}>
        <HashLink to={`/#home`}>
          <img 
          src={logo} 
          alt='Crescendo for a Cause logo' 
          className={`${pageStyles} w-[auto] h-[4.75rem]`} />
        </HashLink>
        <ul className='hidden items-center list-none relative 
                      navbar-custom:flex'>
          {filteredNavLinks.map((nav, i) => (
            <li
              key={nav.id}
              id={`nav-item-${nav.id}`}
              onMouseEnter={() => showDropdown(nav)}
              onMouseLeave={hideDropdown}
              className={`${nav.dropdown ? 'dropdown-item' : 'nav-link'} navbar-item font-normal cursor-pointer text-[1rem] min-w-[max-content] text-white px-3 py-1`}>
                <div className={`${pageStyles} ${nav.dropdown ? 'pb-3' : null}`}>
                  {nav.id === 'tools' ? (
                    <Link
                    to ={`/${nav.id}`}>
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
                (<div className={
                  `${activeDropdownId === nav.id ? 'block' : 'hidden'} dropdown-animation dropdown-background dropdown absolute dark-text rounded py-[1rem] px-[0.5rem] cursor-default shadow-2xl
                  lg:px-[1rem]`}>
                  {nav.id === 'tools' ? (
                    <p className='text-blue-800 text-center mb-[0.5rem]'>
                      Note: Tools can only be accessed by organization staff
                    </p>
                  ) : null}
                  {getDropdownItems(nav.id).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => nav.id === 'tools' ? handleToolClick(item.link) : navigate(item.link)}
                      className={`${nav.id === 'tools' ? 'mb-[0.5rem]' : null} dropdown-link`}>
                      {item.name}
                    </button>
                  ))}
                </div>
                ) : null}
            </li>
          ))}
          <li className={`${pageStyles} navbar-item font-normal cursor-pointer text-[1rem] min-w-[max-content] text-white px-3 py-1`}>
            {user ? (
              <button 
              onClick={handleLogout}>Logout</button>
            ) : (
              <button onClick={handleGoogleSignIn}>Login</button>
            )}
          </li>
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
          <div className={`${toggle ? 'flex' : 'hidden'} sidebar absolute top-20 right-0 dropdown-background border-[black] border-[1px] shadow-2xl rounded-xl py-[1.5rem] px-[1.5rem] mx-[1rem]`}>
            <ul className='list-none flex flex-col w-full'>
              {filteredNavLinks.map((nav, i) => (
                <li
                  key={nav.id}
                  className={`${i === navLinks.length - 1 ? 'mb-0' : 'mb-[0.25rem]'} sidebar-link dark-text`}>
                     <HashLink
                    to={`/#${nav.id}`}
                    onClick={() => setToggle((previous) => !previous)}>
                        {nav.title}
                  </HashLink>
                </li>
              ))}
              <li className='sidebar-link dark-text'>
                {user ? (
                  <button onClick={handleLogout}>Logout</button>
                ) : (
                  <button onClick={handleGoogleSignIn}>Login</button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;