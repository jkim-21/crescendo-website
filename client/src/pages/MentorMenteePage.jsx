import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import {FileUpload, MatchedPairsContainer, UnmatchedPairsContainer, Sidebar, Footer, UserHeading} from '../components' 
import { utils, writeFile } from 'xlsx';
import useBodyBackgroundColor from '../hooks/useBodyBackgroundColor';
import { useAuth } from '../context/AuthContext';
import {v4 as uuidv4} from 'uuid';

const MentorMenteeMatchingPage = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [file, setFile] = useState(null);
    const [sessionId, setSessionId] = useState('');

    const [uploading, setUploading] = useState(false);

    const [pairings, setPairings] = useState([]);
    const [unmatchedIndividuals, setUnmatchedIndividuals] = useState([]);
    
    const [isSaved, setIsSaved] = useState(false);

    const baseURL = import.meta.env.VITE_HEROKU_BASE_URL || '';
    const { user } = useAuth();
    
    useBodyBackgroundColor('#f6f8fe');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const onDrop = (acceptedFiles) => {
        setFile(acceptedFiles[0]);
        setErrorMessage("");
    };

    const jsonToXLSX = (data, filename) => {
        const worksheet = utils.json_to_sheet(data);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        writeFile(workbook, filename);
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

    const saveMentorMenteeTable = async (userId) => {

        const newSessionId = uuidv4();
        setSessionId(newSessionId)

        try {
            const response = await fetch(`${baseURL}/upload/create-pair-table`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, sessionName:newSessionId, pairings, unmatchedIndividuals })
            });

            const data = await response.json();

            if (!response.ok) {
                setErrorMessage(data.error);
            }

            if (data.success) {
                setIsSaved(true);
            }
        }
        catch(err) {
            setErrorMessage('An error occurred while saving the Data Tables.')
        }
    }
    
    const unsaveMentorMenteeTable = async (sessionName) => {
        try {
            console.log(sessionName)
            const response = await fetch(`/upload/delete-table?sessionName=${encodeURIComponent(sessionName)}`, {
                method:'DELETE',
            });
            const data = await response.json();

            if (!response.ok) {
                setErrorMessage(data.error);
                console.log(data.error)
            }
            else {
                setIsSaved(false)
            }
        }
        catch (err) {
            setErrorMessage('An error occurred while deleting the table.');
        }
    }

    return (
    <div className='flex'>
        <Sidebar
        structure='basis-[18%]'/>
        <div className= {`basis-[82%] m-auto z-50`}>
            <div className='mx-[0.5rem] mb-[1rem] min-h-[100vh] my-[1rem]
                            xl:max-w-[1280px]'>
                <UserHeading structure={`${pairings.length === 0 ? 'mb-[5rem]' : 'mb-[2rem]'} px-[0.5rem]`}/>
                <div className={`${pairings.length === 0 ? '' : 'dark-white-bg three-d-box-shadow-1 lighter-gray-border border-[1px'} flex flex-col items-center justify-center m-auto p-[2rem] rounded-[0.75rem]`}>
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
                            <div className='flex items-center gap-[1rem]'>
                                <button
                                    onClick={() => {
                                        if (isSaved) {
                                            unsaveMentorMenteeTable(sessionId)
                                        }
                                        else {
                                            saveMentorMenteeTable(user.uid)
                                        }
                                    }}
                                    className={`${isSaved ? 'green-bg hover:bg-green-600' : 'sea-blue-bg hover:bg-blue-600'} text-end max-w-fit px-[1.5rem] py-[0.75rem] rounded-[0.5rem] text-white`}
                                >
                                    {isSaved ? 'Unsave' : 'Save'}
                                </button>
                                {errorMessage && <p className="max-w-fit py-[0.5rem] px-[1rem] text-center rounded error-red-bg text-white">{errorMessage}</p>}
                            </div>
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
                </div>
            </div>
        <Footer/>
        </div>
    </div>
  );
};

export default MentorMenteeMatchingPage;
