import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { Button, MenuItem, TextField } from '@mui/material';

const RequestPopUp = ({ onClose }) => {
    const { user } = useAuth();
    const [newRequest, setNewRequest] = useState('');
    const [requestReason, setRequestReason] = useState('');
    const [error, setError] = useState('');

    const handleAddRequest = async () => {
        if (!user || !user.email) {
          setError('You must be logged in to add a request');
          return;
        }
      
        if (!newRequest) {
          setError('Please enter your request');
          return;
        }
      
        try {

            if (!user.email) {
                console.log("email is missing");
            }

          const response = await fetch('/api/add-request', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: user.email, requestReason, requestMessage: newRequest }),
          });
      
          if (!response.ok) {
            throw new Error('Failed to add request');
          }
      
          const data = await response.json();
          if (data.success) {
            setNewRequest('');
            setRequestReason('');
            onClose();
          }
        } catch (error) {
          console.error('Error adding request:', error);
          setError(error.message);
        }
      };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[50]">
            <div className="bg-white p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Request</h2>
                <TextField
                    select
                    label="Reason"
                    value={requestReason}
                    onChange={(e) => setRequestReason(e.target.value)}
                    className="w-full mb-4"
                >
                    <MenuItem value="">Select a reason (optional)</MenuItem>
                    <MenuItem value="Request for specific school">Request for specific school</MenuItem>
                    <MenuItem value="Request for specific city">Request for specific city</MenuItem>
                    <MenuItem value="Request for specific state">Request for specific state</MenuItem>
                    <MenuItem value="Request for future tools">Request for future tools</MenuItem>
                    <MenuItem value="General feedback/ideas">Give general feedback / ideas</MenuItem>
                </TextField>
                <textarea
                    value={newRequest}
                    onChange={(e) => setNewRequest(e.target.value)}
                    className="w-full h-32 p-2 border rounded mb-4"
                    placeholder="Enter your request here..."
                />
                <div className="flex justify-end">
                    <Button
                        variant='outlined'
                        onClick={onClose}
                        className='mr-2'
                    >
                        Cancel
                    </Button>
                    <Button
                        variant='contained'
                        onClick={handleAddRequest}
                    >
                        Submit Request
                    </Button>
                </div>
                {error && <div className='bg-red-400 p-2 rounded mt-4'>{error}</div>}
            </div>
        </div>
    );
};

export default RequestPopUp;