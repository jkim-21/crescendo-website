import React, {useState} from 'react';
import {useLocation, Link} from 'react-router-dom';
import '../../index.css';
import {logos} from '../../data/global';
import {dynamicToolLinks, toolLinks} from '../../data/tools-pages';
import { useAuth } from '../../context/AuthContext';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Sidebar = ({structure, schoolName, schoolUrl}) => {

    // Sidebar piece
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    const linksToRender = schoolName ? dynamicToolLinks(schoolName, schoolUrl) : toolLinks;

    // Logout
    const { logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        }
        catch (error) {
            alert(error);
        }
    }

    return (
        <div className={`${structure} top-0 z-[0] border-r-2`}>
            <div className='fixed flex flex-col h-full pt-[2rem] pb-[2rem]'>
                <Link 
                to='/'
                className='flex items-center ml-[1em] gap-[0.5rem] w-[20%] mb-[3rem]'>
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
                </Link>
                <nav className='flex flex-col flex-grow items-stretch gap-[0.75rem] ml-[1.25rem] mr-[2.25rem] w-[15%]'>
                    {linksToRender.map((toolLink) => (
                        <Link
                        key={toolLink.id}
                        to={toolLink.pageLink}
                        className={`${isActive(toolLink.pageLink) ? 'active-link' : null} ${toolLink.dropdown ? 'ml-[1rem] text-[90%]' : null} tool-links rounded-[0.4rem] font-[500] p-[0.5rem]`}>
                            <div className='flex justify-between items-start'>
                                {toolLink.name}
                                {toolLink.dropdownParent && <ArrowDropDownIcon className='mr-[0.5rem]'/>}
                            </div>
                        </Link>
                    ))
                    }
                </nav>
                <div className='max-w-[15%] flex ml-[1.25rem] mr-[2.25rem]'>
                    <Link
                    to='/'
                    onClick={handleLogout}
                    className='tool-links rounded-[0.4rem] font-[500] w-full px-[0.5rem] py-[0.5rem]'
                    >
                        Logout
                    </Link>
                </div>
            </div>
        </div>
    )};

export default Sidebar;