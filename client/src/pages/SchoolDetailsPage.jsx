import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useBodyBackgroundColor from '../hooks/useBodyBackgroundColor';
import {Sidebar, SchoolDetailSearchTable, AnimationLayout, Footer, UserHeading, ErrorButton} from '../components';
import { styles } from '../style';
import { schoolDetails } from '../data/tools-pages';
import { usePreviousUrlKeyword } from '../context/PrevUrlKeyword'
import { MenuItem, Select, TextField, Button } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';


const SchoolDetailsPage = () => {
  const baseURL = import.meta.env.HEROKU_BASE_URL || '';

  useBodyBackgroundColor('#f6f8fe');
  const { user } = useAuth();
  const navigate = useNavigate();
  const { previousUrlKeyword } = usePreviousUrlKeyword();

  const [schoolData, setSchoolData] = useState(null);
  const [emails, setEmails] = useState({});

  const { indexNumber } = useParams();
  const [schoolIndex, setSchoolIndex] = useState(null);
  const [schoolName, setSchoolName] = useState('');
  const [level, setLevel] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [generalWebsite, setGeneralWebsite] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [loading, setLoading] = useState(true);

  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportMessage, setReportMessage] = useState('');
  const [reportError, setReportError] = useState(false);
  const [sortedEmails, setSortedEmails] = useState([]);

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sortAndGroupEmails = (emailsData) => {
  
    if (!emailsData || typeof emailsData !== 'object') {
      console.error("Invalid emailsData:", emailsData);
      return {};
    }
  
    const groupedByLinks = {};
    Object.entries(emailsData).forEach(([email, links]) => {
      links.forEach(link => {
        if (!groupedByLinks[link]) {
          groupedByLinks[link] = [];
        }
        groupedByLinks[link].push(email);
      });
    });
  
    const sortedLinks = Object.keys(groupedByLinks);//.sort();
  
    const sortedAndGroupedEmails = {};
    sortedLinks.forEach(link => {
      const sortedEmails = groupedByLinks[link].sort((a, b) => 
        a.toLowerCase().localeCompare(b.toLowerCase())
      );
      sortedEmails.forEach(email => {
        if (!sortedAndGroupedEmails[email]) {
          sortedAndGroupedEmails[email] = [];
        }
        sortedAndGroupedEmails[email].push(link);
      });
    });
  
    //console.log("Sorted output here:", sortedAndGroupedEmails);
    return sortedAndGroupedEmails;
  };

  const toTitleCase = (str) => {
    if (typeof str !== 'string' || str.includes('https://') || str.includes('http://')) {
      return str
    }
    const lowerCasedStr = str.toLowerCase();
    const lowerCasedWords = lowerCasedStr.split(' ');

    const titleCasedWords = lowerCasedWords.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    const titleCasedStr = titleCasedWords.join(' ');
    return titleCasedStr;
  }


  const formatPhoneNumber = (phoneNumber) => {
    let closingParenthesisIndex = phoneNumber.indexOf(')');

    let formattedPhoneNumber = phoneNumber.substring(0, closingParenthesisIndex + 1) + (' ') + phoneNumber.substring(closingParenthesisIndex + 1)

    return formattedPhoneNumber;
  }


  const handleBack = () => {
    console.log(previousUrlKeyword);
    if (previousUrlKeyword === 'school') {
      navigate('/tools/email-finder-system');
    }
    else if (previousUrlKeyword === 'save') {
      navigate('/tools/saved-information');
    }

  };

  //Fetching page data: useeffect: fetchData

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [schoolResponse, emailsResponse] = await Promise.all([
          fetch(`${baseURL}/api/school-data/${encodeURIComponent(indexNumber)}`),
          fetch(`${baseURL}/api/school-emails/${encodeURIComponent(indexNumber)}`)
        ]);
  
        if (!schoolResponse.ok || !emailsResponse.ok) {
          throw new Error('Failed to fetch data');
        }
  
        const [schoolData, emailsData] = await Promise.all([
          schoolResponse.json(),
          emailsResponse.json()
        ]);
  
        setSchoolData(schoolData);
        setEmails(emailsData);
  
        const sortedAndGroupedEmails = sortAndGroupEmails(emailsData);
        setSortedEmails(sortedAndGroupedEmails);

        setSchoolIndex(schoolData.INDEX_NUMBER);
        setSchoolName(schoolData.SCH_NAME);
        setLevel(schoolData.LEVEL);
        setStreet(schoolData.LSTREET1);
        setCity(schoolData.LCITY);
        setState(schoolData.STATENAME);
        setZip(schoolData.LZIP);
        setPhoneNumber(schoolData.PHONE);
        setGeneralWebsite(schoolData.SCRAPED_WEBSITE);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [indexNumber]);


  // Render links and formatting for phone number and website information
  const renderSchoolDetails = (schoolDetail) => {
    if (schoolDetail.id === 'general-website-detail') {
      return (
        <a
          href={generalWebsite}
          className="sea-blue-text text-left hover:underline break-words"
        >
          {toTitleCase(generalWebsite)}
        </a>
      );
    }
    else if (schoolDetail.id === 'phone-number-detail') {
      return (
        <a
          href={`tel:${phoneNumber}`}
          className="sea-blue-text text-left hover:underline break-words"
        >
          {formatPhoneNumber(phoneNumber)}
        </a>
      );
    }
    else {
      return toTitleCase(schoolData[schoolDetail.key])
    }
  };

  //hooks saving schools: useEffect:checksavedstatus handlesave

  useEffect(() => {
    const checkSavedStatus = async () => {
      if (!user || !user.uid || !schoolIndex) return;

      try {
        const response = await fetch(`${baseURL}/api/check-saved-school?uid=${user.uid}&schoolIndex=${schoolIndex}`);

        if (!response.ok) {
          throw new Error('Failed to check saved status');
        }

        const data = await response.json();
        setIsSaved(data.isSaved);
      } catch (err) {
        console.error('Error checking saved status:', err);
        alert(err.message);
      }
    };

    checkSavedStatus();
  }, [user, schoolIndex]);

  const handleSave = async () => {
    if (!user || !user.uid || !schoolIndex) return;

    try {
      const response = await fetch(`${baseURL}/api/save-school`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: user.uid,
          schoolIndex: schoolIndex
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        console.log(response)
        throw new Error(data.error || 'Failed to save school')
      }
      if (data.success) {
        setIsSaved(data.isSaved);
      }

    } catch (err) {
      console.error('Error saving school:', err.message);
    }
  };

  //Reporting the school information

  useEffect(() => {
    if (!showReportModal) {
      setReportReason('');
      setReportMessage('');
      setReportError('')
    }
  }, [showReportModal]);

  const handleReport = async () => {
    if (!reportReason || !reportMessage) {
      setReportError('Please select a reason and enter a message for reporting');
      return;
    }

    try {
      const response = await fetch(`${baseURL}/api/report-school/${encodeURIComponent(indexNumber)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.uid,
          reason: reportReason,
          message: reportMessage
        }),
      });
      if (!response.ok) {
        setReportError('Failed to report school');
      }
      const data = await response.json();

      if (data.success) {
        setReportReason('');
        setReportMessage('');
        setShowReportModal(false);
      }

    } catch (err) {
      setReportError('Failed to report school');
    }
  };

  if (loading) return (<AnimationLayout><div></div></AnimationLayout>);

  return (

    <>
      <div className='flex'>
        <Sidebar
          structure='lightest-blue-bg basis-[18%]'
          schoolName={schoolName}
          schoolIndex={encodeURIComponent(indexNumber)}
        />
        <div className={`basis-[82%] m-auto z-50`}>
          <div className='mx-[0.5rem] my-[1rem]'>
            <UserHeading structure='mb-[1rem] xl:max-w-[1280px]' />
            <div className='m-auto py-[1rem] min-h-[88vh] dark-white-bg three-d-box-shadow-1 lighter-gray-border border-[1px] rounded-[0.75rem]
                            xl:max-w-[1280px]'>
              <div className={`${styles.subparagraph} flex items-center gap-[1rem] px-[1rem] pb-[1rem] border-b-[1px] lighter-gray-border text-white`}>
                <div className='flex-grow'>
                  <button
                    onClick={handleBack}
                    className='sea-blue-bg px-4 py-2 rounded hover:bg-blue-600'
                  >
                    Back
                  </button>
                </div>
                <button
                  onClick={handleSave}
                >
                  {isSaved ? (
                    <BookmarkIcon sx={{ color: '#006fff', fontSize:'3rem' }} />
                  ) : (
                    <BookmarkBorderIcon sx={{ color: '#006fff', fontSize:'3rem' }} />
                  )}
                </button>
                <button
                  onClick={() => setShowReportModal(true)}
                  className="red-bg hover:bg-red-600 px-4 py-2 rounded"
                >
                  Report
                </button>
              </div>
              <div className='flex justify-between items-stretch px-[1rem] pt-[1rem]'>
                <div className='basis-[67%]'>
                  <h4 className={`${styles.heading4} mb-[1rem] ml-[0.5rem]`}>
                    {schoolName} Emails
                  </h4>
                  <div className='overflow-y-auto'>
                    <SchoolDetailSearchTable
                      jsonData={sortedEmails} //also works with "emails" as well
                      height='25rem'
                    />
                  </div>
                </div>
                <div className="basis-[30%] flex flex-col">
                  <h4 className={`${styles.heading4} mb-[1rem] w-full ml-[0.5rem]`}>
                    School Details
                  </h4>
                  {schoolData && (
                    <div className='flex flex-col justify-between p-[1rem] flex-grow border-[1px] white-bg lighter-gray-border rounded-[0.75rem]'>
                      {schoolDetails.map((schoolDetail) => (
                        <p
                          key={schoolDetail.id}
                        >
                          <strong className='font-[600]'>
                            {schoolDetail.title}
                          </strong> {' '}
                          {renderSchoolDetails(schoolDetail)}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>


      {showReportModal && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-[50]">
          <div className="p-[1.5rem] rounded-[0.5rem] bg-white min-w-[25rem]">
            <h2 className={`${styles.heading4} mb-[1rem]`}>
              Report School
            </h2>
            <div className='flex flex-col item-stretch'>
              <Select
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                required
                displayEmpty
                className="mb-[1rem]"
              >
                <MenuItem value="" disabled>
                  Select reason for reporting
                </MenuItem>
                <MenuItem value="Incorrect information">Incorrect information</MenuItem>
                <MenuItem value="Outdated information">Outdated information</MenuItem>
                <MenuItem value="Duplicate entry">Duplicate entry</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
              <TextField
                value={reportMessage}
                onChange={(e) => setReportMessage(e.target.value)}
                placeholder="Enter your report message here..."
                multiline
                rows={4}
                required
                className="rounded"
                sx={{ mb: '2rem' }}
              />
              {reportError && 
                <ErrorButton 
                  errorMessage={reportError}
                  format='mb-[2rem]'
                />}
            </div>
            <div className="flex justify-end gap-[0.75rem]">
              <button
                onClick={() => setShowReportModal(false)}
                className="px-[1rem] py-[0.5rem] text-black rounded lighter-gray-bg hover:bg-gray-300"
              >
                Cancel
              </button>
              <Button
                onClick={handleReport}
                className=""
                sx={{
                  backgroundColor: '#ef4444', color: 'white', boxShadow: 1,
                  '&:hover': {
                    color: 'white',
                    backgroundColor: '#dc2626',
                    boxShadow: 3
                  },
                }}
              >
                Submit Report
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SchoolDetailsPage;