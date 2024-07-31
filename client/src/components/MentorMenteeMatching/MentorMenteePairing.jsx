import React, { useState, useCallback } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import { useDropzone } from 'react-dropzone';
import FileUpload from './FileUpload';
import MatchedPairsTable from './MatchedPairsTable';
import UnmatchedTable from './UnmatchedTable';
import { utils, writeFile } from 'xlsx';

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
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.pairings && data.unmatchedMentees && data.unmatchedMentors) {
        setPairings(data.pairings);
        setUnmatchedMentees(data.unmatchedMentees);
        setUnmatchedMentors(data.unmatchedMentors);
        if (data.pairings.length === 0) {
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

  return (
    <>
      <Navbar/>
      <div className="mentor-mentee-matching flex flex-col items-center justify-center bg-blue-900">
        {pairings.length === 0 ? (
          <FileUpload
            onDrop={onDrop}
            file={file}
            uploading={uploading}
            open={open}
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            isDragActive={isDragActive}
            setFile={setFile}
            handleFileUpload={handleFileUpload}
          />
        ) : (
          <>
            <MatchedPairsTable pairings={pairings} />
            <UnmatchedTable unmatchedMentees={unmatchedMentees} unmatchedMentors={unmatchedMentors} />
          </>
        )}
        {message && <p className="message text-white mt-4">{message}</p>}
      </div>

    </>
  );
};

export default MentorMenteePairing;
