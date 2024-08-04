import React, {} from 'react';
import {useLocation} from 'react-router-dom';
import '../../index.css';
import {logos} from '../../data/global';
import {toolLinks} from '../../data/tools-pages';
import { useAuth } from '../../context/AuthContext';
import { Link } from "react-router-dom";

const Sidebar = ({structure}) => {

    const location = useLocation();
    const { logout } = useAuth();

    const isActive = (path) => location.pathname === path;

    const handleLogout = async () => {
        try {
            await logout();
        }
        catch (error) {
            alert(error);
        }
    }
    
    return (
        <div className={`${structure} pt-[2rem] sticky top-0`}>
            <div className='fixed'>
                <a 
                href='/'
                className='flex items-center ml-[1em] gap-[0.5rem] w-[20%] mb-[3rem] top-7'>
                    <div className='basis-[30%]'>
                        <img
                        src={logos.sidebarLogo2}
                        alt="C4C Logo"/>
                    </div>
                    <div className='basis-[40%]'>
                        <img
                        src = {logos.logoTitle}
                        alt="C4C Title"/>
                    </div>
                </a>
                <nav className='flex flex-col items-stretch gap-[0.75rem] ml-[1.25rem] mr-[2.25rem] w-[15%]'>
                    {toolLinks.map((toolLink, index) => (
                        <Link
                        key={toolLink.id}
                        to={toolLink.pageLink}
                        onClick = {() => toolLinks.length - 1 === index ? handleLogout() : null}
                        className={`${isActive(toolLink.pageLink) ? 'active-link' : null} ${toolLinks.length - 2 === index ? 'mb-[15rem]' : null} tool-links rounded-[0.4rem] font-[500] px-[0.5rem] py-[0.5rem]`}>
                            {toolLink.name}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    )};

export default Sidebar;