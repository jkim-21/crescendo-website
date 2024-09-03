// SavedSchoolsPage.jsx
import React, { useState, useEffect, Suspense } from 'react';
import { useAuth } from '../context/AuthContext';
import { Footer, Sidebar, SavedSchoolsTable, UserHeading} from '../components';
import useBodyBackgroundColor from '../hooks/useBodyBackgroundColor';
import {styles} from '../style';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const MatchedPairsContainer = React.lazy(() => import('../components/Tools/MentorMenteeMatching/MatchedPairsContainer'));
const UnmatchedPairsContainer = React.lazy(() => import('../components/Tools/MentorMenteeMatching/UnmatchedPairsContainer'));

const SavedSchoolsPage = () => {
    const { user } = useAuth();
    useBodyBackgroundColor('#f6f8fe');

    const [savedSchools, setSavedSchools] = useState([]);
    const [schoolError, setSchoolError] = useState(null);
    
    const [savedSchoolDropdown, setSavedSchoolDropdown] = useState(true);
    const [mentorMenteeDropdown, setMentorMenteeDropdown] = useState(true);

    const [userSessions, setUserSessions] = useState('');
    const [sessionData, setSessionData] = useState('');
    const [mentorMenteeError, setMentorMenteeError] = useState('');
    const [mentorMenteeLoading, setMentorMenteeLoading] = useState(false);

    const [openDropdowns, setOpenDropdowns] = useState({});


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
            }
        };
        fetchSavedSchools();
    }, [user]);

    // Fetching User Sessions for Mentor Mentee Matching Tables'
    useEffect(() => {
        const fetchUserSessions = async (userId) => {
            try {
                const response = await fetch(`/upload/get-user-sessions/${encodeURIComponent(userId)}`);
                const data = await response.json();

                if (!response.ok) {
                    setMentorMenteeError(data.error);
                }
                else if (data.sessions.length === 0) {
                    setSessionNames([]);
                }
                else {
                    const sessions = data.sessions;
                    setUserSessions(sessions);
                }
            }
            catch(err) {
                setMentorMenteeError('An error occurred while fetching user sessions.')
            }
        };
        fetchUserSessions(user.uid);
    }, [user.uid]);


    // Fetching Mentor Mentee Matching Saved Tables 
    const transformPairedKeys = (obj) => {
        return {
            id: obj.id,
            SESSION_NAME: obj.SESSION_NAME,
            USER_ID: obj.USER_ID,
            mentorName: obj.MENTOR_NAME,
            mentorContact: obj.MENTOR_CONTACT,
            mentorInstrument: obj.MENTOR_INSTRUMENT,
            menteeName: obj.MENTEE_NAME,
            menteeContact: obj.MENTEE_CONTACT,
            menteeInstrument: obj.MENTEE_INSTRUMENT,
            timeOfLesson: obj.TIME_OF_LESSON,
            inPersonOrOnline: obj.IN_PERSON_OR_ONLINE,
            CREATED_AT: obj.created_at,
        };
    };

    const transformUnpairedKeys = (obj) => {
        return {
            id: obj.id,
            SESSION_NAME: obj.SESSION_NAME,
            USER_ID: obj.USER_ID,
            name: obj.PERSON_NAME,
            type: obj.PERSON_TYPE,
            contact: obj.CONTACT,
            instrument: obj.INSTRUMENT,
            lessonType: obj.LESSON_TYPE,
            mondayAvailability: obj.MONDAY_AVAILABILITY,
            tuesdayAvailability: obj.TUESDAY_AVAILABILITY,
            wednesdayAvailability: obj.WEDNESDAY_AVAILABILITY,
            thursdayAvailability: obj.THURSDAY_AVAILABILITY,
            fridayAvailability: obj.FRIDAY_AVAILABILITY,
            saturdayAvailability: obj.SATURDAY_AVAILABILITY,
            sundayAvailability: obj.SUNDAY_AVAILABILITY,
            availabilityLeft: obj.AVAILABILITY_LEFT,
            CREATED_AT: obj.CREATED_AT,
        };
    };

    const jsonToXLSX = (data, filename) => {
        const worksheet = utils.json_to_sheet(data);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        writeFile(workbook, filename);
    };

    const fetchSavedSessions = async (userId, sessionName) => {
        if (!userId || !sessionName) return;
      
        try {
            setMentorMenteeLoading(true);
            const response = await fetch(`/upload/get-session-data?userId=${encodeURIComponent(userId)}&sessionName=${encodeURIComponent(sessionName)}`);
        
            if (!response.ok) {
                throw new Error('Failed to fetch saved sessions');
            }
        
            const data = await response.json();
            const pairedInfo = data.pairedInfo.map(transformPairedKeys);
            const unpairedInfo = data.unpairedInfo.map(transformUnpairedKeys);
            
            return { pairedInfo, unpairedInfo };
            } catch (err) {
            console.error('Error fetching saved sessions:', err);
            setSchoolError(err.message); 
            }
            finally {
                setMentorMenteeLoading(false);
            }
      };

    useEffect(() => {
        const fetchAllSavedSessions = async () => {
            if (!user.uid || !userSessions) return;

            const fetchedSessions = await Promise.all(
                userSessions.map(async (session) => {
                    const {pairedInfo, unpairedInfo} = await fetchSavedSessions(user.uid, session.SESSION_NAME);
                    
                    return {sessionName: session.SESSION_NAME, pairedInfo, unpairedInfo};
                })
            );
            setSessionData(fetchedSessions);
        }
        fetchAllSavedSessions();
    }, [user.uid, userSessions]);

    // Toggling the dropdown for the correct school

    const toggleDropdown = (sessionName) => {
        setOpenDropdowns((prevState) => ({
          ...prevState,
          [sessionName]: !prevState[sessionName],
        }));
      };

    useEffect(() => {
        if (sessionData) {
            const initialDropdownState = sessionData.reduce((acc, session) => {
                acc[session.sessionName] = false;
                return acc;
            }, {});

            setOpenDropdowns(initialDropdownState);
        }
    }, [sessionData]);


    // Deleting Saved School Information as necessary
    const unsaveMentorMenteeTable = async (sessionName) => {
        try {
            console.log(sessionName)
            const response = await fetch(`/upload/delete-table?sessionName=${encodeURIComponent(sessionName)}`, {
                method:'DELETE',
            });
            const data = await response.json();

            if (!response.ok) {
                setErrorMessage(data.error);
                console.log(data.error)
            }
            else {
                setSessionData((prevSessions) =>
                    prevSessions.filter((session) => session.sessionName !== sessionName)
                );

                setOpenDropdowns((prevState) => {
                    const updatedState = { ...prevState };
                    delete updatedState[sessionName];
                    return updatedState;
                  });
            }
        }
        catch (err) {
            setErrorMessage('An error occurred while deleting the table.');
        }
    }

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
                            {(savedSchoolDropdown) ? 
                                <KeyboardArrowDownIcon sx={{fontSize:'2.25rem', mb:'0.1rem'}}/> : 
                                <KeyboardArrowRightIcon sx={{fontSize:'2.25rem', mb:'0.3rem'}}/>}
                            Saved Schools
                        </h4>
                        <div className='px-[1rem]'>
                            {savedSchoolDropdown && !schoolError && (
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
                        {!mentorMenteeError && mentorMenteeDropdown && (
                            <ul className='w-full px-[1rem] '>
                                {sessionData ? sessionData.map((session, index) => (
                                    <div key={index}>
                                        <div
                                            onClick={() => toggleDropdown(session.sessionName)}
                                            className={`${styles.heading5} flex justify-between items-center p-[0.5rem] mb-[0.5rem] mx-[1rem] cursor-pointer rounded-[0.75rem] hover:bg-[#e0e0e4]`}
                                        >
                                            <div>
                                                {openDropdowns[session.sessionName] ? <KeyboardArrowDownIcon sx={{fontSize:'1.5rem', mb:'0.1rem'}}/> : <KeyboardArrowRightIcon sx={{fontSize:'1.5rem', mb:'0.3rem'}}/>}
                                                Saved Mentor Mentee Table {index + 1}
                                            </div>
                                            <DeleteOutlineIcon
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                unsaveMentorMenteeTable(session.sessionName)}}
                                            sx={{
                                                backgroundColor:'red',
                                                color:'white',
                                                fontSize:'1.75rem',
                                                borderRadius:'0.2rem',
                                                '&:hover': {
                                                    backgroundColor: '#A52A2A'
                                                },
                                            }}
                                            />
                                        </div>
                                        {mentorMenteeLoading && openDropdowns[session.sessionName] ? (
                                            <div className="spinner m-auto"></div>
                                        ) : (
                                            openDropdowns[session.sessionName] && (
                                                <Suspense fallback={<div className="spinner m-auto"></div>}>
                                                    <div
                                                        key={index}
                                                        className='flex flex-col gap-[2rem] mr-[1rem] ml-[2.5rem] mb-[2rem]'
                                                    >
                                                        <MatchedPairsContainer
                                                            pairings={session.pairedInfo}
                                                            jsonToXLSX={jsonToXLSX}
                                                            textFormat = 'font-[500] text-[1rem] lg:text-[1rem]'
                                                            buttonFormat = 'font-[400] text-[1rem] lg:text-[1rem] px-[0.75rem] py-[0.25rem]'
                                                        />
                                                        <UnmatchedPairsContainer
                                                            unmatchedIndividuals = {session.unpairedInfo}
                                                            jsonToXLSX={jsonToXLSX}
                                                            textFormat = 'font-[500] text-[1rem] lg:text-[1rem]'
                                                            buttonFormat = 'font-[400] text-[1rem] lg:text-[1rem] px-[0.75rem] py-[0.25rem]'
                                                        />
                                                    </div>
                                                </Suspense>
                                            )
                                        )}
                                    </div>
                                )) : (
                                    <div className='gray-text italic text-center my-[1rem]'>
                                        No records to display
                                    </div>)
                                }
                            </ul>
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )};

export default SavedSchoolsPage;