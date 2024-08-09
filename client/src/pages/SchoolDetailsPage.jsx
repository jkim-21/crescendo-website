import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useBodyBackgroundColor from '../hooks/useBodyBackgroundColor';
import {Sidebar, SchoolDetailSearchTable, AnimationLayout} from '../components';
import { styles } from '../style';
import { schoolDetails } from '../data/tools-pages';


const SchoolDetailsPage = () => {

  const [schoolData, setSchoolData] = useState(null);
  const [emails, setEmails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportMessage, setReportMessage] = useState('');
  const { indexNumber } = useParams();
  const [ school, setSchool ] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [schoolIndex, setSchoolIndex] = useState(null);
  const [schoolName, setSchoolName] = useState('');

  
  useBodyBackgroundColor('#f6f8fe');

  useEffect(() => {
    setSchool(schoolName);
  }, []);

  //Fetching page data: useeffect: fetchData
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [schoolResponse, emailsResponse] = await Promise.all([
          fetch(`/api/school-data/${encodeURIComponent(indexNumber)}`),
          fetch(`/api/school-emails/${encodeURIComponent(indexNumber)}`)
        ]);
  
        if (!schoolResponse.ok || !emailsResponse.ok) {
          throw new Error('Failed to fetch data');
        }
  
        const [schoolData, emailsData] = await Promise.all([
          schoolResponse.json(),
          emailsResponse.json()
        ]);
  
        console.log('School Data:', schoolData);
        console.log('Emails Data:', emailsData);
  
        setSchoolData(schoolData);
        setEmails(emailsData);
        setSchoolIndex(schoolData.INDEX_NUMBER);
        setSchoolName(schoolData.SCH_NAME);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [indexNumber]);

  //hooks saving schools: useeffect:checksavedstatus handlesave

  useEffect(() => {
    const checkSavedStatus = async () => {
      if (!user || !user.email || !schoolIndex) return;
  
      try {
        const response = await fetch('/api/check-saved-school', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.email,
            schoolIndex: schoolIndex
          }),
        });
        const data = await response.json();
        setIsSaved(data.isSaved);
      } catch (err) {
        console.error('Error checking saved status:', err);
      }
    };
  
    checkSavedStatus();
  }, [user, schoolIndex]);

  const handleSave = async () => {
    if (!user || !user.email || !schoolIndex) return;
  
    try {
      const response = await fetch(`/api/save-school`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          schoolIndex: schoolIndex
        }),
      });
      const data = await response.json();
      if (data.success) {
        setIsSaved(data.isSaved);
      }
    } catch (err) {
      console.error('Error saving school:', err);
      alert('Failed to save school');
    }
  };

  //Reporting the school information

  const handleReport = async () => {
    if (!reportReason || !reportMessage) {
      alert('Please select a reason and enter a message for reporting');
      return;
    }

    try {
      const response = await fetch(`/api/report-school/${encodeURIComponent(indexNumber)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason: reportReason, message: reportMessage }),
      });
      if (!response.ok) {
        throw new Error('Failed to report school');
      }
      const data = await response.json();
      alert(data.message);
      setReportReason('');
      setReportMessage('');
      setShowReportModal(false);
    } catch (err) {
      console.error('Error reporting school:', err);
      alert('Failed to report school');
    }
  };


  const handleBack = () => {
    navigate(`/tools/email-finder-system${location.search}`);
  };

  if (loading) return (<AnimationLayout><div></div></AnimationLayout>);

  return (

    <div className='flex'>
      <Sidebar 
        structure='lightest-blue-bg basis-[18%]'
        schoolName={schoolName}
        schoolUrl = {encodeURIComponent(indexNumber)}
      />
      <div className={`${styles.boxWidth} basis-[82%] z-50 m-auto px-[1rem] py-[1rem] flex flex-col`}>
          <div className='three-d-box-shadow-1 px-[0.5rem] py-[1rem] white-bg lightest-gray lighter-gray-border border-[1px] rounded-[0.75rem]'>
            <div className={`${styles.subparagraph} flex items-center gap-[1rem] p-4 mb-[2rem] lightest-box-shadow text-white rounded-[0.75rem]`}>
              <button
                onClick={handleBack}
                className='sea-blue-bg px-4 py-2 rounded hover:bg-blue-600'
              >
                Back
              </button>
              <button
                onClick={handleSave}
                className={`${isSaved ? 'green-bg hover:bg-green-600' : 'sea-blue-bg hover:bg-blue-600'} px-4 py-2 rounded`}
              >
                {isSaved ? 'Unsave' : 'Save'}
              </button>
              <button
                onClick={() => setShowReportModal(true)}
                className="red-bg hover:bg-red-600 px-4 py-2 rounded"
              >
                Report
              </button>
            </div>
            
            <div>
              <h1 className={`${styles.heading3} light-blue-bg mb-[1rem] p-[1rem] border-[2px] text-center border-blue-400`}>
                Emails for {schoolName}
              </h1>
                <div className="w-full">
                  <SchoolDetailSearchTable
                      data = {emails}
                  />
                </div>
            </div>


            <div className="w-full h-full p-4 overflow-y-auto">
                  <h1 className="text-2xl font-bold mb-4 w-full bg-blue-200 p-3">School Details</h1>
                  {schoolData && (
            <div className='flex flex-col'>
              {schoolDetails.map((schoolDetail) => (
                <p
                  key={schoolDetail.id}
                  className='p-1'>
                  <strong className='border bg-blue-300 rounded-md p-1'>
                    {schoolDetail.title}
                  </strong> {' '}
                  {schoolData[schoolDetail.key]}
                </p>
              ))}
            </div>
                  )}
            </div>
          </div>

















        {showReportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-xl font-bold mb-4">Report School</h2>
              <select
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
              >
                <option value="">Select reason for reporting</option>
                <option value="Incorrect information">Incorrect information</option>
                <option value="Outdated information">Outdated information</option>
                <option value="Duplicate entry">Duplicate entry</option>
                <option value="Other">Other</option>
              </select>
              <textarea
                value={reportMessage}
                onChange={(e) => setReportMessage(e.target.value)}
                placeholder="Enter your report message"
                className="w-full p-2 mb-4 border rounded h-32"
              />
              <div className="flex justify-end">
                <button
                  onClick={() => setShowReportModal(false)}
                  className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReport}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Submit Report
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SchoolDetailsPage;