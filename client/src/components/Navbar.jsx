import React, { useState, useEffect } from 'react';
import { close, menu, logo } from '../assets';
import { navLinks, chapters, tools } from '../data/home-page.js';
import { HashLink } from 'react-router-hash-link';
import { Link, useNavigate } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styles } from '../style.js';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuth } from '../AuthContext';

const Navbar = ({ pageStyles }) => {
  const [toggle, setToggle] = useState(false);
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  const [error, setError] = useState(null);
  const { user, setUser, logout } = useAuth();
  const navigate = useNavigate();

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

  return (
    <nav className='sticky top-0 z-50 flex justify-between items-center bg-dark shadow-md py-[0.75rem]'>
      <div className={`${styles.boxWidth} flex justify-between m-auto navbar`}>
        <HashLink to={`/#home`}>
          <img src={logo} alt='Crescendo for a Cause logo' className={`${pageStyles} w-[auto] h-[4.75rem]`} />
        </HashLink>
        <ul className={`hidden justify-end items-center list-none relative navbar-custom:flex`}>
          {navLinks.map((nav, i) => (
            <li
              key={nav.id}
              id={`nav-item-${nav.id}`}
              onMouseEnter={() => showDropdown(nav)}
              onMouseLeave={hideDropdown}
              className={`navbar-item ${nav.dropdown ? 'dropdown-item' : 'navlink'} font-normal cursor-pointer text-[1rem] min-w-[max-content] text-white px-3 py-1`}>
              <div className={`${pageStyles} ${nav.dropdown && 'pb-3'}`}>
                <HashLink
                  to={`/#${nav.id}`}
                  scroll={(el) => setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30)}
                  className={`${nav.dropdown && 'pointer-events-none lg:pointer-events-auto'}`}>
                  {nav.title}
                </HashLink>
                {nav.dropdown && <ExpandMoreIcon />}
              </div>
              {nav.dropdown && (
                <div className={`${activeDropdownId === nav.id ? 'block' : 'hidden'} dropdown-animation dropdown-background dropdown absolute dark-color rounded py-[1rem] px-[0.5rem] cursor-default shadow-2xl lg:px-[1rem]`}>
                  {nav.id === 'tools' && (
                    <p className="text-blue-800 mb-2">Note: Tools can only be accessed by organization staff</p>
                  )}
                  {getDropdownItems(nav.id).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => nav.id === 'tools' ? handleToolClick(item.link) : navigate(item.link)}
                      className='dropdown-link'>
                      {item.name}
                    </button>
                  ))}
                </div>
              )}
            </li>
          ))}
          <li className='navbar-item font-normal cursor-pointer text-[1rem] min-w-[max-content] text-white px-3 py-1'>
            {user ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <button onClick={handleGoogleSignIn}>Login</button>
            )}
          </li>
        </ul>
        <div className='flex flex-1 justify-end items-center navbar-custom:hidden'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className={`${pageStyles} w-[2rem] [aspect-ratio:1/1] object-contain z-40`}
            onClick={() => setToggle((previous) => !previous)}
          />
          {toggle &&
            <div
              onClick={() => setToggle((previous) => !previous)}
              className='fixed inset-0 bg-black bg-opacity-50 z-1'>
            </div>}
          <div className={`${toggle ? 'flex' : 'hidden'} sidebar absolute top-20 right-0 min-w-[8.75rem] dropdown-background border-[black] border-[1px] shadow-2xl rounded-xl py-[1.5rem] px-[1rem] mx-[1rem]`}>
            <ul className='list-none flex flex-col w-full'>
              {navLinks.map((nav, i) => {
                if (nav.id === 'tools' && !user) return null; // Skip rendering the tools dropdown if the user is not logged in
                return (
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
                );
              })}
              <li className='sidebar-link dark-color'>
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