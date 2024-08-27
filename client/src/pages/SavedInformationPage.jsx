// SavedSchoolsPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Footer, Sidebar, SavedSchoolsTable, UserHeading } from '../components';
import useBodyBackgroundColor from '../hooks/useBodyBackgroundColor';
import {styles} from '../style';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { usePreviousUrlKeyword } from '../context/PrevUrlKeyword'

const SavedSchoolsPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    useBodyBackgroundColor('#f6f8fe');
    const { setPreviousUrlKeyword } = usePreviousUrlKeyword();

    const [savedSchools, setSavedSchools] = useState([]);
    const [schoolLoading, setSchoolLoading] = useState(true);
    const [schoolError, setSchoolError] = useState(null);
    
    const [savedSchoolDropdown, setSavedSchoolDropdown] = useState(true);
    const [mentorMenteeDropdown, setMentorMenteeDropdown] = useState(true);

    // Handle Dropdown
    const handleDropdown = (dropdownType) => {
        if (dropdownType === 'school') {
            setSavedSchoolDropdown(!savedSchoolDropdown)
        }
        if (dropdownType === 'mentor') {
            setMentorMenteeDropdown(!mentorMenteeDropdown)
        }
    }

    // Fetch School Data
    useEffect(() => {
        const fetchSavedSchools = async () => {
            if (!user || !user.uid) return;

            try {
                const response = await fetch(`/api/saved-schools?uid=${encodeURIComponent(user.uid)}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch saved schools');
                }
                const data = await response.json();
                setSavedSchools(data);
            } catch (err) {
                console.error('Error fetching saved schools:', err);
                setSchoolError(err.message);
            } finally {
                setSchoolLoading(false);
            }
        };
        fetchSavedSchools();
    }, [user]);

    
    // Button Actions 
    const handleSchoolClick = (schoolName) => {
        navigate(`/tools/email-finder-system/school/${encodeURIComponent(schoolName)}`);
        setPreviousUrlKeyword('save')
    };

    return (
        <div className='flex'>
            <Sidebar structure='lightest-blue-bg basis-[18%]' />
            <div className='m-auto basis-[82%] z-[50]'>
                <div className='my-[1rem] mx-[1rem] m-auto min-h-[100vh]
                                xl:max-w-[1280px]'>
                    <UserHeading structure='mb-[3rem]'/>
                    <div className='mb-[2rem]'>
                        <h4
                        onClick = {() => handleDropdown('school')}
                        className={`py-[0.5rem] mb-[0.5rem] ${styles.heading4} font-[700] w-full rounded-[0.5rem] hover:bg-[#e0e0e4] cursor-pointer`}>
                            {savedSchoolDropdown ? <KeyboardArrowDownIcon sx={{fontSize:'2.25rem', mb:'0.1rem'}}/> : <KeyboardArrowRightIcon sx={{fontSize:'2.25rem', mb:'0.3rem'}}/>}
                            Saved Schools
                        </h4>
                        <div className='ml-[0.5rem]'>
                            {savedSchoolDropdown && (
                                <SavedSchoolsTable savedSchools = {savedSchools}/>
                            )}
                        </div>
                    </div>
                    <div>
                        <h4
                        onClick = {() => handleDropdown('mentor')}
                        className={`py-[0.5rem] mb-[0.5rem] ${styles.heading4} font-[700] w-full rounded-[0.75rem] hover:bg-[#e0e0e4] cursor-pointer`}>
                            {mentorMenteeDropdown ? <KeyboardArrowDownIcon sx={{fontSize:'2.25rem', mb:'0.1rem'}}/> : <KeyboardArrowRightIcon sx={{fontSize:'2.25rem', mb:'0.3rem'}}/>}
                            Mentor-Mentee Tables
                        </h4>
                        {!schoolError && !schoolLoading && mentorMenteeDropdown && (
                            <ul className='w-full'>
                                {savedSchools.map((school) => (
                                    <li
                                        key={school.INDEX_NUMBER}
                                        className="p-4 border-b cursor-pointer rounded-[0.5rem] hover:bg-[#f3f4f6]"
                                        onClick={() => handleSchoolClick(school.INDEX_NUMBER)}
                                    >
                                        {school.SCH_NAME}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )};

export default SavedSchoolsPage;