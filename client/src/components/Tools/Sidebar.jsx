import React, {useState} from 'react';
import '../../index.css';
import {logos} from '../../data/global';
import {toolLinks} from '../../data/tools-pages';

const Sidebar = ({structure}) => {
    return (
        <div className={`${structure} pt-[2rem]`}>
            <a 
            href='/'
            className='flex items-center ml-[1rem] gap-[0.5rem] w-full mb-[3rem]'>
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
            <nav className='flex flex-col items-stretch gap-[1rem] mx-[1rem]'>
                {toolLinks.map((toolLink, index) => (
                    <a
                    href={toolLink.pageLink}
                    className='font-[500] p-[0.5rem]'>
                        {toolLink.name}
                    </a>
                ))}
            </nav>
        </div>
    )}

export default Sidebar;