import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import Navbar from '../components/Navbar';

const MentorMenteeMatching = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(""); 
  const [pairings, setPairings] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setMessage(`File ${acceptedFiles[0].name} ready for upload.`);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    }
  });

  const handleFileUpload = async () => {
    if (!file) {
      setMessage("Please select a file first!");
      return;
    }

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
    }
  };

  return (
    <div>
      <Navbar pageStyles="" />
      <div className="mentor-mentee-matching">
        <h1>Mentor-Mentee Matching</h1>
        <p>Welcome to the Mentor-Mentee Matching page. Please upload your Excel file to get started.</p>
        
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <div className="dropzone-content">
            <CloudUploadIcon style={{ fontSize: '4rem', color: '#007bff' }} />
            {isDragActive ? (
              <p>Drop the file here...</p>
            ) : (
              <p>Drag & Drop to Upload File<br />OR<br /><button>Browse File</button></p>
            )}
          </div>
        </div>
        
        <button className="upload-button" onClick={handleFileUpload}>Upload File</button>
        {message && <p>{message}</p>}
        {pairings.length > 0 && (
          <div className="pairings">
            <h2>Generated Pairings</h2>
            <ul>
              {pairings.map((pair, index) => (
                <li key={index} className="pairing-item">
                  {pair}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <style jsx>{`
          .mentor-mentee-matching {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 2rem;
            background-color: #f5f5f5;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            margin-top: 2rem;
          }
          .dropzone {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 400px;
            height: 200px;
            border: 2px dashed #007bff;
            border-radius: 8px;
            background-color: #e6f7ff;
            cursor: pointer;
            margin-top: 2rem;
          }
          .dropzone-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .dropzone-content p {
            margin: 0.5rem 0;
          }
          .dropzone-content button {
            padding: 0.5rem 1rem;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }
          .dropzone-content button:hover {
            background-color: #0056b3;
          }
          .upload-button {
            padding: 0.5rem 1rem;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 1rem;
          }
          .upload-button:hover {
            background-color: #0056b3;
          }
          .pairings {
            margin-top: 2rem;
            background-color: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 800px;
            font-size: 1rem;
            font-family: Arial, sans-serif;
            overflow: auto;
            max-height: 400px;
          }
          .pairings h2 {
            margin-bottom: 1rem;
            text-align: center;
            color: #333;
          }
          .pairings ul {
            list-style-type: none;
            padding: 0;
          }
          .pairing-item {
            padding: 0.5rem 0;
            border-bottom: 1px solid #ddd;
          }
          .pairing-item:last-child {
            border-bottom: none;
          }
        `}</style>
      </div>
    </div>
  );
};

export default MentorMenteeMatching;
