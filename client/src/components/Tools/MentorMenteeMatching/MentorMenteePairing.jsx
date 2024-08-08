import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import FileUpload from './FileUpload';
import MatchedPairsTable from './MatchedPairsTable';
import UnmatchedTable from './UnmatchedTable';
import Sidebar from '../Sidebar';
import Footer from '../../Footer'
import { utils, writeFile } from 'xlsx';
import {styles} from '../../../style'
import useBodyBackgroundColor from '../../../hooks/useBodyBackgroundColor';


const MentorMenteePairing = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [pairings, setPairings] = useState([]);
  const [unmatchedMentees, setUnmatchedMentees] = useState([]);
  const [unmatchedMentors, setUnmatchedMentors] = useState([]);
  const [uploading, setUploading] = useState(false);
  const baseURL = import.meta.env.VITE_DONATION_BASE_URL || ''
  useBodyBackgroundColor('#f6f8fe')

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      const response = await fetch(`${baseURL}/upload`, {
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
    <div className='flex lightest-blue-bg'>
      <Sidebar
        structure='lightest-blue-bg basis-[18%]'/>
      <div className= 'basis-[82%] z-50 m-auto'>
        <div className={`${styles.boxWidth} min-h-[100vh] flex flex-col items-center justify-center m-auto lightest-blue-bg bg-center px-[2rem]`}>
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
        <Footer/>
      </div>
    </div>
  );
};

export default MentorMenteePairing;
