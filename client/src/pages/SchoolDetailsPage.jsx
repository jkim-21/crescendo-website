import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useBodyBackgroundColor from '../hooks/useBodyBackgroundColor';
import {Sidebar} from '../components';
import { styles } from '../style';

const SchoolDetailsPage = () => {

  const [schoolData, setSchoolData] = useState(null);
  const [emails, setEmails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportMessage, setReportMessage] = useState('');
  const { schoolName } = useParams();
  const [isSaved, setIsSaved] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [schoolIndex, setSchoolIndex] = useState(null);
  useBodyBackgroundColor('#f6f8fe');

  //Fetching page data: useeffect: fetchData
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [schoolResponse, emailsResponse] = await Promise.all([
          fetch(`/api/school-data/${encodeURIComponent(schoolName)}`),
          fetch(`/api/school-emails/${encodeURIComponent(schoolName)}`)
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
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [schoolName]);

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
      const response = await fetch(`/api/report-school/${encodeURIComponent(schoolName)}`, {
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;



  return (

    <div className='flex'>
      <Sidebar 
        structure='light-blue-bg basis-[18%]'
        schoolName={schoolName}
        schoolUrl = {encodeURIComponent(schoolName)}
      />
      <div className={`${styles.boxWidth} basis-[82%] z-50 m-auto flex flex-col h-screen bg-gray-100`}>
        <div className="flex items-center justify-between p-4 bg-white shadow">
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Back
          </button>
          <button
            onClick={handleSave}
            className={`px-4 py-2 ${isSaved ? 'bg-green-500' : 'bg-blue-500'} text-white rounded hover:bg-opacity-80 text-sm`}
          >
            {isSaved ? 'Unsave' : 'Save'}
          </button>
          <button
            onClick={() => setShowReportModal(true)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
          >
            Report
          </button>
        </div>
        <h1 className="text-2xl font-bold mb-4 border-2 border-blue-300 p-4 bg-blue-200 text-center pb-8">Emails for {schoolName}</h1>
        <div className="flex h-4/5">
      
          <div className="w-full flex flex-col">
            <div className="overflow-y-auto flex-1 px-2">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2">Email</th>
                    <th className="border border-gray-300 p-2">Link</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(emails || {}).map(([email, link], index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border border-gray-300 p-2">{email}</td>
                      <td className="border border-gray-300 p-2">
                        <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                          {link}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='border border-gray-300 w-full h-full p-2'>
        <div className='border border-gray-300 w-full h-full p-2'>
        <div className="border border-blue-300 w-full h-full p-4 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4 w-full bg-blue-200 p-3">School Details</h1>
      {schoolData && (
        <div className='flex flex-col'>
          <p className='p-1'><strong className='border bg-blue-300 rounded-md p-1'>School Name:</strong> {schoolData.SCH_NAME}</p>
          <p className='p-1'><strong className='border bg-blue-300 rounded-md p-1'>Level:</strong> {schoolData.LEVEL}</p>
          <p className='p-1'><strong className='border bg-blue-300 rounded-md p-1'>School Type:</strong> {schoolData.SCH_TYPE_TEXT}</p>
          <p className='p-1'><strong className='border bg-blue-300 rounded-md p-1'>Street:</strong> {schoolData.LSTREET1}</p>
          <p className='p-1'><strong className='border bg-blue-300 rounded-md p-1'>City:</strong> {schoolData.LCITY}</p>
          <p className='p-1'><strong className='border bg-blue-300 rounded-md p-1'>State:</strong> {schoolData.STATENAME}</p>
          <p className='p-1'><strong className='border bg-blue-300 rounded-md p-1'>Zip:</strong> {schoolData.LZIP}</p>
          <p className='p-1'><strong className='border bg-blue-300 rounded-md p-1'>Latitude:</strong> {schoolData.LAT}</p>
          <p className='p-1'><strong className='border bg-blue-300 rounded-md p-1'>Longitude:</strong> {schoolData.LON}</p>
        </div>
      )}
        </div>
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