import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import Navbar from './Navbar';
import { utils, writeFile } from 'xlsx';
import '../index.css'; // Ensure to import the CSS

const MentorMenteePairing = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [pairings, setPairings] = useState([]);
  const [unmatchedMentees, setUnmatchedMentees] = useState([]);
  const [unmatchedMentors, setUnmatchedMentors] = useState([]);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setMessage("");
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    noClick: true,
    noKeyboard: true
  });

  const handleFileUpload = async () => {
    if (!file) {
      setMessage("Please select a file first!");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.pairings && response.data.unmatchedMentees && response.data.unmatchedMentors) {
        setPairings(response.data.pairings);
        setUnmatchedMentees(response.data.unmatchedMentees);
        setUnmatchedMentors(response.data.unmatchedMentors);
        if (response.data.pairings.length === 0) {
          setMessage("There are no perfect mentor-mentee pairs, please manually review your responses.");
        } else {
          setMessage("");
        }
      } else {
        setMessage("Unexpected response structure");
      }
    } catch (error) {
      setMessage("An error occurred while uploading the file.");
    } finally {
      setUploading(false);
    }
  };

  const jsonToXLSX = (data, filename) => {
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    writeFile(workbook, filename);
  };

  const renderTableRows = (data, isPairing = false, type = '', showSpots = true) => {
    return data.map((item, index) => (
      <tr key={index}>
        <td>{isPairing ? item.mentorName : item["Name (First, Last)"]}</td>
        <td>{isPairing ? item.mentorContact : item["Phone Number or Preferred Method of Contact Info"]}</td>
        <td>{isPairing ? item.menteeName : item.Instrument}</td>
        <td>{isPairing ? item.menteeContact : item["Online or In-Person"]}</td>
        {isPairing && <td>{item.mentorInstrument}</td>}
        {isPairing && <td>{item.menteeInstrument}</td>}
        {isPairing && <td>{item.timeOfLesson}</td>}
        {isPairing && <td>{item.inPersonOrOnline}</td>}
        {!isPairing && <td>{type}</td>}
        {!isPairing && (
          <td>
            {[
              'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
            ].map(day => item[`When are you available for lessons (EST)? Please select times that work for you!  [${day}]`])
              .filter(Boolean)
              .join(', ')}
          </td>
        )}
        {!isPairing && showSpots && type === 'Mentor' && <td>{item["How many Lessons can you give a week? (For Mentors Only)"]}</td>}
        {!isPairing && showSpots && type === 'Mentee' && <td></td>}
      </tr>
    ));
  };

  return (
    <>
      <Navbar pageStyles="" />
      <div className="page-container">
        <div className="mentor-mentee-matching">
          {pairings.length === 0 ? (
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <div className="dropzone-content text-white">
                <CloudUploadIcon style={{ fontSize: '4rem', color: 'white' }} />
                {isDragActive ? (
                  <p>Drop the file here...</p>
                ) : (
                  <>
                    {!file && !uploading && (
                      <div>
                        <p>Generate a .xslx file from your google form Mentor/Mentee responses and drop that file here!</p>
                        <p><span className="or">OR</span></p>
                        <button className="text-button-white" onClick={open}>Click to Browse File</button>
                      </div>
                    )}
                    {file && !uploading && (
                      <>
                        <p>{file.name}</p>
                        <button className="upload-button" onClick={handleFileUpload}>Upload File</button>
                        <button 
                          className="choose-different-file-button" 
                          onClick={() => setFile(null)}
                          style={{ background: 'none', border: 'none', color: 'gray', marginTop: '20px' }}
                        >
                          Choose a Different File
                        </button>
                      </>
                    )}
                    {uploading && (
                      <div className="uploading text-white" style={{ textAlign: 'center' }}>
                        <p>Uploading...</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="pairings">
                <div className="header-container">
                  <h2 className="table-title">Matched Mentor-Mentee Pairs</h2>
                  <button className="download-button" onClick={() => jsonToXLSX(pairings, 'pairings.xlsx')}>Download Matched Pairs as XLSX</button>
                </div>
                {pairings.length > 0 ? (
                  <table className="pairings-table">
                    <thead>
                      <tr>
                        <th>Mentor Name</th>
                        <th>Mentor Contact</th>
                        <th>Mentee Name</th>
                        <th>Mentee Contact</th>
                        <th>Mentor Instrument</th>
                        <th>Mentee Instrument</th>
                        <th>Time of Lesson (day, time)</th>
                        <th>In-Person or Online</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderTableRows(pairings, true)}
                    </tbody>
                  </table>
                ) : (
                  <p>No pairings found.</p>
                )}
              </div>
              <div className="unmatched">
                <div className="header-container">
                  <h2 className="table-title">Unmatched Mentors and Mentees</h2>
                  <button className="download-button" onClick={() => jsonToXLSX([...unmatchedMentees, ...unmatchedMentors], 'unmatched.xlsx')}>Download Unmatched as XLSX</button>
                </div>
                {unmatchedMentees.length > 0 || unmatchedMentors.length > 0 ? (
                  <table className="pairings-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Contact Info</th>
                        <th>Instrument</th>
                        <th>Preferred Lesson Mode</th>
                        <th>Type</th>
                        <th>Available Times</th>
                        <th>Available Spots</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderTableRows(unmatchedMentees, false, 'Mentee', true)}
                      {renderTableRows(unmatchedMentors, false, 'Mentor', true)}
                    </tbody>
                  </table>
                ) : (
                  <p>No unmatched mentors or mentees.</p>
                )}
              </div>
            </>
          )}
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </>
  );
};

export default MentorMenteePairing;

