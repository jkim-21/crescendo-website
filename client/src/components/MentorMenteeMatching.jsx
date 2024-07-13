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
    noClick: true, // Prevents default click behavior to open file dialog
    noKeyboard: true // Prevents default keyboard behavior to open file dialog
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
      setPairings(response.data.pairings);
      setMessage("File uploaded successfully!");
    } catch (error) {
      console.error(error);
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
                    <p>
                      Drag & Drop a .xlsx (excel) file containing your Mentors and Mentees
                      <br />
                      <p><span className="or">OR</span></p>
                      <br />
                      <button className="text-white" onClick={open}>Click to Browse File</button>
                    </p>
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
                  <th>Rating</th>
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
                    <td>{pair.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default MentorMenteeMatching;
