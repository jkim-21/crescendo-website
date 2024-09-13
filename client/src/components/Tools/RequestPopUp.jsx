import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import {styles} from '../../style';
import {ErrorButton} from '../../components'

const RequestPopUp = ({ onClose }) => {
    const baseURL = import.meta.env.VITE_HEROKU_BASE_URL || "";
    const { user } = useAuth();
    const [requestMessage, setRequestMessage] = useState('');
    const [requestReason, setRequestReason] = useState('');
    const [error, setError] = useState('');

    const handleAddRequest = async () => {
        if (!user || !user.uid) {
          setError('You must be logged in to add a request');
          return;
        }
      
        if (!requestMessage) {
          setError('Please enter your request');
          return;
        }
      
        try {
          setError(null)

            if (!user.uid) {
                console.log("email is missing");
            }

          const response = await fetch(`${baseURL}/api/add-request`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: user.uid, requestReason: requestReason, requestMessage: requestMessage }),
          });
      
          if (!response.ok) {
            setError(error.message);
          }
      
          const data = await response.json();
          
          if (data.success) {
            setRequestMessage('');
            setRequestReason('');
            onClose();
            setError('')
          }
        } catch (error) {
          console.error('Error adding request:', error);
        }
      };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[50]">
            <div className="p-[1.5rem] rounded-[0.5rem] bg-white">
                <h2 className={`${styles.heading4} mb-[1rem]`}>
                  Request
                </h2>
                <div className='flex flex-col items-stretch min-w-[25rem]'>
                  <Select
                      displayEmpty
                      value={requestReason}
                      onChange={(e) => setRequestReason(e.target.value)}
                      required
                      className="mb-[1rem]"
                  >
                      <MenuItem value="" disabled>
                        Select a reason
                      </MenuItem>
                      <MenuItem value="Request for specific school">Request for specific school</MenuItem>
                      <MenuItem value="Request for specific city">Request for specific city</MenuItem>
                      <MenuItem value="Request for specific state">Request for specific state</MenuItem>
                      <MenuItem value="Request for future tools">Request for future tools</MenuItem>
                      <MenuItem value="General feedback/ideas">Give general feedback / ideas</MenuItem>
                  </Select>
                  <TextField
                      value={requestMessage}
                      onChange={(e) => setRequestMessage(e.target.value)}
                      placeholder="Enter your request here..."
                      multiline
                      rows={4}
                      required
                      className="rounded"
                      sx={{mb:'2rem'}}
                  
                  />
                  {error && 
                    <ErrorButton 
                    errorMessage={error}
                    format='mb-[2rem]'/>
                  }
                </div>
                <div className="flex justify-end gap-[0.75rem]">
                    <button
                        onClick={onClose}
                        className="px-[1rem] py-[0.5rem] text-black rounded lighter-gray-bg hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <Button
                        variant='contained'
                        onClick={handleAddRequest}
                        sx={{boxShadow:1}}
                    >
                        Submit Request
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RequestPopUp;