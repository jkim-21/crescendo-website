import React from 'react';
import {logos} from '../../data/global';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {toolLinks} from '../../data/tools-pages';

const Sidebar = ({structure}) => {

    return (
        <div className={`${structure} top-0 z-[0] border-r-2`}>
            <div className='fixed flex flex-col h-full pt-[2rem] pb-[2rem]'>
                <div 
                    className='flex items-center ml-[1em] gap-[0.5rem] w-[20%] mb-[3rem]'
                >
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
                </div>
                <nav className='flex flex-col flex-grow items-stretch gap-[0.75rem] ml-[1.25rem] w-[15%]'>
                    {toolLinks.map((toolLink) => (
                        <div
                        key={toolLink.id}
                        className={`${toolLink.name === 'Home' ? 'active-link' : null} tool-links rounded-[0.4rem] gray-text font-[500] p-[0.5rem]`}>
                            <div className='flex justify-between items-start'>
                                {toolLink.name}
                                {toolLink.dropdownParent && <ArrowDropDownIcon className='mr-[0.5rem]'/>}
                            </div>
                        </div>
                    ))
                    }
                </nav>
                <div className='max-w-[15%] flex ml-[1.25rem] mr-[2.25rem]'>
                    <div
                        className='tool-links w-full px-[0.5rem] py-[0.5rem] rounded-[0.4rem] font-[500] gray-text'
                    >
                        Logout
                    </div>
                </div>
            </div>
        </div>
    )};

export default Sidebar;