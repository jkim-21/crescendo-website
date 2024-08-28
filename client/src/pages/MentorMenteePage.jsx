import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import {FileUpload, MatchedPairsContainer, UnmatchedPairsContainer, Sidebar, Footer, UserHeading} from '../components' 
import { utils, writeFile } from 'xlsx';
import useBodyBackgroundColor from '../hooks/useBodyBackgroundColor';

const MentorMenteeMatchingPage = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [file, setFile] = useState(null);

    const [uploading, setUploading] = useState(false);

    const [pairings, setPairings] = useState([]);
    const [unmatchedMentees, setUnmatchedMentees] = useState([]);
    const [unmatchedMentors, setUnmatchedMentors] = useState([]);
    const [unmatchedIndividuals, setUnmatchedIndividuals] = useState([]);

    const baseURL = import.meta.env.VITE_DONATION_BASE_URL || '';
    
    useBodyBackgroundColor('#f6f8fe');

    useEffect(() => {
    window.scrollTo(0, 0);
    }, []);

    const onDrop = (acceptedFiles) => {
        setFile(acceptedFiles[0]);
        setErrorMessage("");
    };

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
            setErrorMessage("Please select a file first!");
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
                setErrorMessage('Can not upload this file.');
            }

            const data = await response.json();
            
            if (data.pairings.length === 0) {
                setErrorMessage("There are no perfect mentor-mentee pairs, please manually review your responses.");
            }
            else if (data.pairings && data.unmatchedMentees && data.unmatchedMentors) {
                setPairings(data.pairings);
                setUnmatchedMentees(data.unmatchedMentees);
                setUnmatchedMentors(data.unmatchedMentors);
                setUnmatchedIndividuals(data.unmatchedIndvidiuals);
            } 
            else {
                setErrorMessage("Unexpected response structure");
            }
        }
        catch (error) {
            setErrorMessage("An error occurred while uploading the file.");
        }
        finally {
            setUploading(false);
        };
    };

    const jsonToXLSX = (data, filename) => {
        const worksheet = utils.json_to_sheet(data);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        writeFile(workbook, filename);
    };

    return (
    <div className='flex'>
        <Sidebar
        structure='basis-[18%]'/>
        <div className= {`basis-[82%] m-auto z-50`}>
        <div className='m-auto min-h-[100vh] my-[1rem]
                        xl:max-w-[1280px]'>
            <UserHeading structure='px-[0.5rem] mb-[5rem]'/>
            <div className={`flex flex-col items-center justify-center m-auto mx-[2rem] mb-[1rem] dark-white-bg`}>
                {pairings.length === 0 ? (
                    <FileUpload
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
                    <div className='flex flex-col gap-[2rem] w-full'>
                        <MatchedPairsContainer 
                            pairings={pairings} 
                            jsonToXLSX={jsonToXLSX}
                        />
                        <UnmatchedPairsContainer 
                            unmatchedIndividuals = {unmatchedIndividuals}
                            jsonToXLSX={jsonToXLSX}
                        />
                    </div>
                )}
                {errorMessage && <p className="message text-white mb-[1rem]">{errorMessage}</p>}
            </div>
        </div>
        <Footer/>
        </div>
    </div>
  );
};

export default MentorMenteeMatchingPage;
