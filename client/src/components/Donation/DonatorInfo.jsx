import {CardContent, Typography, OutlinedInput, Box, Button, CircularProgress, Alert} from "@mui/material";
import * as React from 'react';

const DonatorInfo = ({handleFirstNameChange, handleLastNameChange, handleEmailChange, handleInfoSubmit, firstName, lastName, email, isLoading, error}) => {
    return (
        <CardContent>
            <form onSubmit={handleInfoSubmit}>
                <Typography className='text-white' align='center' variant='h4' sx={{my: 3, fontWeight: 'bold'}}>
                    Donator Information
                </Typography>
                <Typography className='text-white' align='center' variant='body1' sx={{mb: 5, fontWeight: 'regular'}}>
                    Please provide your details to continue with your donation.
                </Typography>
                <OutlinedInput
                    type="text"
                    placeholder='First Name'
                    value={firstName}
                    onChange= {handleFirstNameChange}
                    fullWidth
                    required
                    sx={{
                        backgroundColor:'#f0f0f0',
                        borderBottomLeftRadius: 0, 
                        borderBottomRightRadius: 0
                    }}
                />
                <OutlinedInput
                    type="text"
                    placeholder='Last Name'
                    value={lastName}
                    onChange= {handleLastNameChange}
                    fullWidth
                    required
                    sx={{
                        backgroundColor:'#f0f0f0',
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        mb: 3
                    }}
                />
                
                <OutlinedInput
                    type="email"
                    placeholder='Email Address'
                    value={email}
                    onChange={handleEmailChange}
                    fullWidth
                    required
                    sx={{
                        backgroundColor:'#f0f0f0',
                        mb: 5
                    }}
                />
                <Button fullWidth variant="contained" type="submit" disabled={isLoading}>
                    {isLoading ? <CircularProgress/> : 'Continue'}
                </Button>
            </form>
            {error && <Alert severity = "error" sx={{backgroundColor: "#FFD6D7"}}>Something went wrong</Alert>}
        </CardContent>
        );
    };

export default DonatorInfo