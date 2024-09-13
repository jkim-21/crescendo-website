import React, { useState, useEffect } from 'react';
import { MatchedPairsContainer, UnmatchedPairsContainer} from '../components';


const SavedMentorMenteeTable = ({userId, sessionName }) => {
    const baseURL = import.meta.env.VITE_HEROKU_BASE_URL || "";

    const [matchedData, setMatchedData] = useState([]);
    const [unmatchedData, setUnmatchedData] = useState([]);
    const [tableError, setTableError] = useState(null);

    const jsonToXLSX = (data, filename) => {
        const worksheet = utils.json_to_sheet(data);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        writeFile(workbook, filename);
    };

    const fetchSessionData = async () => {
        try {
            const response = await fetch (`${baseURL}/upload/get-sessions-data/${userId}/${encodeURIComponent(sessionName)}`);
            const data = await response.json();


            if (response.ok) {
                setMatchedData(data.matchedData);
                setUnmatchedData(data.unmatchedData);
            }
            else {
                setTableError('Failed to fetch session data');
            }
        }
        catch (err) { 
            setTableError('An error occurred while fetching session data')
        }
    }

    useEffect(() => {
        fetchSessionData();
    }, [sessionName]);
        
    return (
        <div className='flex flex-col gap-[2rem] w-full'>
            <MatchedPairsContainer 
                pairings={matchedData} 
                jsonToXLSX={jsonToXLSX}
            />
            <UnmatchedPairsContainer 
                unmatchedIndividuals = {unmatchedData}
                jsonToXLSX={jsonToXLSX}
            />
        </div>
    );
};
export default SavedMentorMenteeTable;