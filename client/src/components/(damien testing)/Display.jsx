import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Display() {
  const [emails, setEmails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { schoolName } = useParams();

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch(`/api/school-emails/${encodeURIComponent(schoolName)}`);

        if (!response.ok) {
          throw new Error('Failed to fetch emails');
        }

        const data = await response.json();
        setEmails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, [schoolName]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Emails for {schoolName}</h1>
      <div>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th>Email</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(emails || {}).map(([email, link], index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td>{email}</td>
                <td>
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    {link}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
}

export default Display;