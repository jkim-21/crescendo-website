import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../index.css'; // Ensure to import the CSS

const MentorMenteeMatching = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [pairings, setPairings] = useState([]);
  const [unmatchedMentees, setUnmatchedMentees] = useState([]);
  const [unmatchedMentors, setUnmatchedMentors] = useState([]);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setMessage("");
    console.log("File dropped: ", acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    noClick: true, // Prevents default click behavior to open file dialog
    noKeyboard: true // Prevents default keyboard behavior to open file dialog
  });

  const handleFileUpload = async () => {
    if (!file) {
      setMessage("Please select a file first!");
      console.log("No file selected");
      return;
    }

    setUploading(true);
    console.log("Uploading file...");

    const formData = new FormData();
    formData.append('file', file);
    console.log("FormData: ", formData);

    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("Response: ", response.data);
      if (response.data.pairings && response.data.unmatchedMentees && response.data.unmatchedMentors) {
        setPairings(response.data.pairings);
        setUnmatchedMentees(response.data.unmatchedMentees);
        setUnmatchedMentors(response.data.unmatchedMentors);
        setMessage("File uploaded successfully!");
      } else {
        setMessage("Unexpected response structure");
        console.log("Unexpected response structure:", response.data);
      }
    } catch (error) {
      console.error("Error uploading file: ", error);
      setMessage("An error occurred while uploading the file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Navbar pageStyles="" />
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
                      <p>Drag & Drop a .xlsx (excel) file containing your Mentors and Mentees</p>
                      <p><span className="or">OR</span></p>
                      <button className="text-white" onClick={open}>Click to Browse File</button>
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
          <div className="pairings">
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
                  {pairings.map((pair, index) => (
                    <tr key={index}>
                      <td>{pair.mentorName}</td>
                      <td>{pair.mentorContact}</td>
                      <td>{pair.menteeName}</td>
                      <td>{pair.menteeContact}</td>
                      <td>{pair.mentorInstrument}</td>
                      <td>{pair.menteeInstrument}</td>
                      <td>{pair.timeOfLesson}</td>
                      <td>{pair.inPersonOrOnline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No pairings found.</p>
            )}
            <h2>Unmatched Mentees</h2>
            <ul>
              {unmatchedMentees.length > 0 ? (
                unmatchedMentees.map((mentee, index) => (
                  <li key={index}>{mentee}</li>
                ))
              ) : (
                <p>No unmatched mentees.</p>
              )}
            </ul>
            <h2>Unmatched Mentors</h2>
            <ul>
              {unmatchedMentors.length > 0 ? (
                unmatchedMentors.map((mentor, index) => (
                  <li key={index}>{mentor}</li>
                ))
              ) : (
                <p>No unmatched mentors.</p>
              )}
            </ul>
          </div>
        )}
        {message && <p className="message">{message}</p>}
      </div>
    </>
  );
};

export default MentorMenteeMatching;
