import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
function Display() {
  const [schoolData, setSchoolData] = useState(null);
  const [emails, setEmails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reportReason, setReportReason] = useState('');
  const { schoolName } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

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

        setSchoolData(schoolData);
        setEmails(emailsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [schoolName]);

  const handleReport = async () => {
    if (!reportReason) {
      alert('Please select a reason for reporting');
      return;
    }

    try {
      const response = await fetch(`/api/report-school/${encodeURIComponent(schoolName)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason: reportReason }),
      });
      if (!response.ok) {
        throw new Error('Failed to report school');
      }
      const data = await response.json();
      alert(data.message);
      setReportReason('');
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
    <div className="flex flex-col h-screen">
      <div className="flex items-center p-4 bg-gray-100">
        <button 
          onClick={handleBack}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          Back
        </button>
        <button 
          className="ml-4 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600 text-sm"
        >
          Save
        </button>
        <select
          value={reportReason}
          onChange={(e) => setReportReason(e.target.value)}
          className="ml-4 px-4 py-2 bg-white border border-gray-300 rounded text-sm"
        >
          <option value="">Select reason for reporting</option>
          <option value="Incorrect information">Incorrect information</option>
          <option value="Outdated information">Outdated information</option>
          <option value="Duplicate entry">SOme OthEr WaCkY ReeZOn!</option>
          <option value="Other">...</option>
        </select>
        <button 
          onClick={handleReport}
          disabled={!reportReason}
          className={`ml-4 px-4 py-2 text-white rounded text-sm ${
            reportReason ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Report
        </button>
      </div>
      
      <div className="flex flex-1 overflow-hidden bg-gray-400"> {/** do bg-white for a flash bang */}
        <div className="w-1/2 p-4 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-4">School Information</h1>
          {schoolData && (
            <div>
              <p><strong>Name:</strong> {schoolData.SCH_NAME}</p>
              <p><strong>City:</strong> {schoolData.LCITY}</p>
              <p><strong>State:</strong> {schoolData.STATENAME}</p>
              <p><strong>Street:</strong> {schoolData.LSTREET1}</p>
            </div>
          )}
        </div>
        
        <div className="w-1/2 p-4 flex flex-col">
          <h1 className="text-2xl font-bold mb-4">Emails for {schoolName}</h1>
          <div className="overflow-y-auto flex-1">
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
    </div>
  );
}

export default Display;