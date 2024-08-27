import React, { useState, useEffect, useRef } from 'react';
import {useLocation} from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx';
import {RequestPopUp} from '..';
import {styles} from '../../style.js'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {timeData} from '../..//data/tools-pages'

const UserHeading = ({structure}) => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const dropdownRef = useRef(null)

    const [showRequestModal, setShowRequestModal] = useState(false);
    const [day, setDay] = useState(null);
    const [time, setTime] = useState(null);
    const [greeting, setGreeting] = useState('');

    const [toggleUserOptions, setToggleUserOptions] = useState(false)

    // Retrieving Heading Data

    useEffect(() => {
        const updateTime = () => {
            const currentTime = new Date();

            const year = String(currentTime.getFullYear());

            const month = currentTime.getMonth();
            const monthName = timeData.monthNames[month]

            const date = currentTime.getDate();

            const day = currentTime.getDay()
            const dayName = timeData.dayNames[day]

            const militaryHours = currentTime.getHours();
            let period = ''
            let regularHours = ''
            if (militaryHours >= 12) {
                period = 'PM'
                regularHours = String(militaryHours - 12).padStart(2, '0')
            }
            else {
                period = 'AM'
                regularHours = militaryHours
            }

            const minutes = String(currentTime.getMinutes()).padStart(2, '0');

            const formattedDate = `${dayName}, ${monthName} ${date}, ${year}`
            const formattedTime = `${regularHours}:${minutes} ${period}`
            setDay(formattedDate)
            setTime(formattedTime)
        };
        updateTime();
        const intervalId = setInterval(updateTime, 60000);
        return () => clearInterval(intervalId);
    }, []);

    const getSeparateNames = () => {
        const nameParts = user.displayName.split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.length > 1 ? nameParts[1] : '';
        return {firstName, lastName}
    }

    useEffect(() => {
        const getGreeting = () => {
            const {firstName, lastName} = getSeparateNames()
            
            switch (location.pathname) {
                case '/tools/saved-information':
                    setGreeting(`${user.displayName}'s Dashboard`);
                    break;
                case '/tools/email-finder-system':
                case '/tools/mentor-mentee-matching-system':
                    setGreeting(`Hey ${firstName}!`);
                    break;
                default:
                    setGreeting(`Welcome ${firstName}!`);
                    break;
            }
        }
        getGreeting();
    }, [])

    

    useEffect(() => {
        const handleClickOutsideUserOptions = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setToggleUserOptions(false);
            }
        }

        if (toggleUserOptions) {
            document.addEventListener('mousedown', handleClickOutsideUserOptions);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideUserOptions);
          };
    }, [toggleUserOptions, dropdownRef]);

    const openRequestModal = () => {
        setShowRequestModal(true);
        setToggleUserOptions(false);
    };

    const closeRequestModal = () => {
        setShowRequestModal(false);
    }

    const renderUserProfile = () => {
        return (
            toggleUserOptions ?
                <>
                    <div className={`absolute top-[5rem] right-[0.5rem] white-bg dropdown-animation lighter-gray-border border-[1px] standard-box-shadow rounded-xl`}>
                        <ul className='flex flex-col items-stretch min-w-[8rem] m-[0.5rem] list-none cursor-pointer'>
                            <li className= 'pl-[0.5rem] py-[0.5rem] rounded hover:bg-[#f5f5f5]'>
                                <button
                                    variant='contained'
                                    onClick={openRequestModal}
                                >
                                    My Requests
                                </button>
                            </li>
                            <li className='pl-[0.5rem] py-[0.5rem] rounded hover:bg-[#f5f5f5] cursor-pointer'>
                                <button
                                    variant='contained'
                                    onClick={logout}
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </> 
            : null
        )
    }

    return (
        <>
            <nav
                className={`${structure} flex items-center justify-between m-auto w-full`}
            >
                <div>
                    <h4 className={`${styles.heading4} dark-text mb-[0.2rem]`}>
                        {greeting}
                    </h4>
                    <time className='gray-text'>
                    {day}
                    </time>
                </div>
                <div 
                    ref={dropdownRef}
                    className='flex gap-[1rem]'
                >
                    <button 
                    onClick={() => {
                        setToggleUserOptions((previous) => !previous);
                    }}
                    className='flex items-center'>
                        <img
                            src={user.photoURL}
                            alt = 'User profile'
                            className='justify-top max-w-[2.5rem] ml-auto rounded-[50%]'
                        
                        />
                        <KeyboardArrowDownIcon sx={{fontSize:'2rem'}}/>
                    </button>
                    {renderUserProfile()}
                    {showRequestModal ? <RequestPopUp onClose={closeRequestModal}/> : null}
                </div>
            </nav>
        </>
    );
};

export default UserHeading;