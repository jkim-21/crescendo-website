import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const InfoPopUp = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <IconButton onClick={handleOpen}>
                <HelpOutlineIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>What what how?!</DialogTitle>
                <DialogContent>
                    <p>
                        This email finder system allows you to search for email addresses based on location. 
                        You must be in Maine, Massachusetts, or Illinois to use the current location feature. 
                        You can enter an address manually or use your current location if you're in one of these states.
                    </p>
                    <p>
                        When searching by radius all other filters are required, otherwise use only the filters you need.
                    </p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default InfoPopUp;